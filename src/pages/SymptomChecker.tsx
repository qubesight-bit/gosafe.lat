import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { Disclaimer } from '@/components/Disclaimer';
import { useIsabelApi, type AgeGroup, type Region, type Diagnosis, type DiagnosisResult, type KnowledgeGroup } from '@/hooks/use-isabel-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Stethoscope, AlertCircle, CalendarIcon, X, Search, Loader2,
  AlertTriangle, BookOpen, ExternalLink, Shield, ChevronRight, Flag, Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SymptomChecker = () => {
  const api = useIsabelApi();
  const { toast } = useToast();

  // Metadata
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [predictiveTerms, setPredictiveTerms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dob, setDob] = useState<Date | undefined>();
  const [sex, setSex] = useState('');
  const [pregnant, setPregnant] = useState('');
  const [region, setRegion] = useState('');
  const [sortFlag, setSortFlag] = useState('sortbyRW_advanced');
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Results state
  const [diagnosing, setDiagnosing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [knowledgeData, setKnowledgeData] = useState<Record<number, KnowledgeGroup[]>>({});
  const [loadingKnowledge, setLoadingKnowledge] = useState<number | null>(null);
  const [triageData, setTriageData] = useState<unknown>(null);
  const [loadingTriage, setLoadingTriage] = useState(false);

  // Load metadata on mount
  useEffect(() => {
    const load = async () => {
      try {
        const [ag, rg, pt] = await Promise.all([
          api.getAgeGroups(),
          api.getRegions(),
          api.getPredictiveText(),
        ]);
        setAgeGroups(ag);
        setRegions(rg);
        setPredictiveTerms(pt);
      } catch (e: unknown) {
        toast({ title: "Error loading data", description: e instanceof Error ? e.message : "Unknown error", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Symptom autocomplete
  const filteredSuggestions = useMemo(() => {
    if (!symptomInput.trim() || symptomInput.trim().length < 2) return [];
    const lower = symptomInput.toLowerCase();
    return predictiveTerms
      .filter(t => t.toLowerCase().includes(lower) && !symptoms.includes(t))
      .slice(0, 8);
  }, [symptomInput, predictiveTerms, symptoms]);

  useEffect(() => {
    setSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0);
  }, [filteredSuggestions]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const addSymptom = useCallback((symptom: string) => {
    const trimmed = symptom.trim().toLowerCase();
    if (trimmed && !symptoms.includes(trimmed)) {
      setSymptoms(prev => [...prev, trimmed]);
    }
    setSymptomInput('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, [symptoms]);

  const removeSymptom = (s: string) => setSymptoms(prev => prev.filter(x => x !== s));

  const canSubmit = symptoms.length > 0 && dob && sex;

  const handleDiagnose = async () => {
    if (!canSubmit || !dob) return;
    setDiagnosing(true);
    setResult(null);
    setKnowledgeData({});
    setTriageData(null);
    try {
      const dobStr = format(dob, 'yyyyMMdd');
      const data = await api.getDiagnosis({
        querytext: symptoms.join(','),
        dob: dobStr,
        sex,
        pregnant: pregnant || undefined,
        region: region || undefined,
        flag: sortFlag,
      });
      setResult(data);
    } catch (e: unknown) {
      toast({ title: "Diagnosis error", description: e instanceof Error ? e.message : "Unknown error", variant: "destructive" });
    } finally {
      setDiagnosing(false);
    }
  };

  const handleKnowledge = async (diagnosis: Diagnosis) => {
    if (knowledgeData[diagnosis.diagnosis_id]) return;
    setLoadingKnowledge(diagnosis.diagnosis_id);
    try {
      const data = await api.getKnowledge(diagnosis.knowledge_window_api_url);
      setKnowledgeData(prev => ({ ...prev, [diagnosis.diagnosis_id]: data }));
    } catch {
      toast({ title: "Error loading resources", variant: "destructive" });
    } finally {
      setLoadingKnowledge(null);
    }
  };

  const handleTriage = async () => {
    const triageUrl = result?.diagnoses_checklist?.triage_api_url;
    if (!triageUrl) return;
    setLoadingTriage(true);
    try {
      const data = await api.getTriage(triageUrl);
      setTriageData(data);
    } catch {
      toast({ title: "Error loading triage", variant: "destructive" });
    } finally {
      setLoadingTriage(false);
    }
  };

  const diagnoses = result?.diagnoses_checklist?.diagnoses;
  const queryDetails = result?.diagnoses_checklist?.query_result_details;
  const pleaseNote = result?.diagnoses_checklist?.please_note;
  const noResult = result?.diagnoses_checklist?.no_result;
  const triageUrl = result?.diagnoses_checklist?.triage_api_url;

  const showPregnancy = useMemo(() => {
    if (!dob || !sex) return false;
    if (sex === 'f') {
      const ageGroup = ageGroups.find(ag => {
        const from = parseInt(ag.yr_from);
        const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        return age >= from;
      });
      return ageGroup?.can_conceive === 'true';
    }
    return false;
  }, [dob, sex, ageGroups]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Symptom Checker
          </h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Enter your symptoms for educational differential diagnosis information, triage scoring, and links to trusted medical knowledge.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer-box p-4 flex items-start gap-3 mb-8">
          <AlertCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
          <p className="text-sm font-body text-foreground/80">
            <strong className="font-semibold">Educational purposes only.</strong> This tool does not provide medical advice, diagnosis, or treatment recommendations. Always consult a licensed healthcare professional.
          </p>
        </div>

        {/* Symptom Input */}
        <div className="card-elevated p-6 mb-6">
          <Label className="font-display text-lg font-semibold text-foreground mb-3 block">
            <Search className="w-4 h-4 inline mr-2 text-primary" />
            Symptoms
          </Label>
          <p className="text-sm text-muted-foreground mb-3">Type symptoms and select from suggestions, or press Enter to add.</p>

          {/* Tags */}
          {symptoms.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {symptoms.map(s => (
                <Badge key={s} variant="secondary" className="gap-1 text-sm py-1 px-3">
                  {s}
                  <button onClick={() => removeSymptom(s)} className="ml-1 hover:text-destructive transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Input with autocomplete */}
          <div className="relative">
            <Input
              ref={inputRef}
              value={symptomInput}
              onChange={e => setSymptomInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && symptomInput.trim()) {
                  e.preventDefault();
                  addSymptom(symptomInput);
                }
              }}
              placeholder="e.g. headache, fever, nausea..."
              className="font-body"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-52 overflow-y-auto"
              >
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => addSymptom(s)}
                    className="w-full text-left px-4 py-2.5 text-sm font-body hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Demographics */}
        <div className="card-elevated p-6 mb-6">
          <Label className="font-display text-lg font-semibold text-foreground mb-4 block">
            Demographics
          </Label>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* DOB */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dob ? format(dob, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dob}
                    onSelect={setDob}
                    disabled={d => d > new Date() || d < new Date("1900-01-01")}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Sex */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Sex *</Label>
              <Select value={sex} onValueChange={setSex}>
                <SelectTrigger><SelectValue placeholder="Select sex" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="m">Male</SelectItem>
                  <SelectItem value="f">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pregnancy (conditional) */}
            {showPregnancy && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Pregnancy Status</Label>
                <Select value={pregnant} onValueChange={setPregnant}>
                  <SelectTrigger><SelectValue placeholder="Not specified" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="n">Not pregnant</SelectItem>
                    <SelectItem value="y">Pregnant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Region */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Region (optional)</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                <SelectContent>
                  {regions.map(r => (
                    <SelectItem key={r.region_id} value={r.region_id}>{r.region_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Flag */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Sort Results By</Label>
              <Select value={sortFlag} onValueChange={setSortFlag}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sortbyRW_advanced">Most Relevant</SelectItem>
                  <SelectItem value="red_flag">Don't Miss Diagnoses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handleDiagnose}
          disabled={!canSubmit || diagnosing}
          className="w-full h-12 text-base font-semibold mb-8"
          size="lg"
        >
          {diagnosing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing symptoms...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Get Differential Diagnosis
            </>
          )}
        </Button>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Query summary */}
            {queryDetails && (
              <div className="card-elevated p-4">
                <p className="text-sm text-muted-foreground font-body">
                  <span className="font-semibold text-foreground">Query:</span> {queryDetails.query_entered} · {queryDetails.age_group} · {queryDetails.gender} · {queryDetails.region}
                  {queryDetails.total_results_returned && (
                    <span> · <strong>{queryDetails.total_results_returned}</strong> results</span>
                  )}
                </p>
              </div>
            )}

            {/* Spelling note */}
            {pleaseNote && (
              <div className="disclaimer-box p-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <p className="text-sm text-foreground/80 font-body">{pleaseNote}</p>
              </div>
            )}

            {/* No result */}
            {noResult && (
              <div className="card-elevated p-8 text-center">
                <Shield className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground font-body">{noResult.information}</p>
              </div>
            )}

            {/* Diagnoses list */}
            {diagnoses && diagnoses.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-primary" />
                  Differential Diagnoses
                </h2>

                <Accordion type="multiple" className="space-y-2">
                  {diagnoses.map((dx, i) => (
                    <AccordionItem
                      key={dx.diagnosis_id}
                      value={String(dx.diagnosis_id)}
                      className="card-elevated border rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger
                        className="px-5 py-4 hover:no-underline hover:bg-muted/50"
                        onClick={() => handleKnowledge(dx)}
                      >
                        <div className="flex items-center gap-3 text-left flex-1 mr-4">
                          <span className="text-xs font-mono text-muted-foreground w-6 shrink-0">#{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground font-body">{dx.diagnosis_name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{dx.specialty}</p>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            {dx.red_flag === 'true' && (
                              <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1 text-xs">
                                <Flag className="w-3 h-3" /> Red Flag
                              </Badge>
                            )}
                            {dx.common_diagnosis === 'true' && (
                              <Badge variant="secondary" className="gap-1 text-xs">
                                <Star className="w-3 h-3" /> Common
                              </Badge>
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4">
                        <div className="border-t border-border pt-4 space-y-3">
                          {/* ICD codes */}
                          <div className="flex flex-wrap gap-2 text-xs">
                            {dx.icd10_diagnosis_id && (
                              <span className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono">
                                ICD-10: {dx.icd10_diagnosis_id.trim()}
                              </span>
                            )}
                            {dx.snomed_diagnosis_id && (
                              <span className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono">
                                SNOMED: {dx.snomed_diagnosis_id.trim()}
                              </span>
                            )}
                          </div>

                          {/* Knowledge links */}
                          {loadingKnowledge === dx.diagnosis_id && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Loader2 className="w-4 h-4 animate-spin" /> Loading resources...
                            </div>
                          )}
                          {knowledgeData[dx.diagnosis_id] && (
                            <div className="space-y-3">
                              {knowledgeData[dx.diagnosis_id].map((group, gi) => (
                                <div key={gi}>
                                  <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                                    {group.heading}
                                  </p>
                                  <div className="grid sm:grid-cols-2 gap-2">
                                    {group.links.map((link, li) => (
                                      <a
                                        key={li}
                                        href={link.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm"
                                      >
                                        {link.image_url && (
                                          <img src={link.image_url} alt="" className="w-5 h-5 object-contain" />
                                        )}
                                        <span className="font-body text-foreground flex-1">{link.name}</span>
                                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Triage */}
            {triageUrl && (
              <div className="card-elevated p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  Triage — Where to Get Care?
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Get an urgency assessment based on your symptoms and potential diagnoses.
                </p>
                {!triageData ? (
                  <Button onClick={handleTriage} disabled={loadingTriage} variant="outline">
                    {loadingTriage ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Loading triage...</>
                    ) : (
                      <><ChevronRight className="w-4 h-4 mr-2" />Get Triage Score</>
                    )}
                  </Button>
                ) : (
                  <div className="bg-muted rounded-lg p-4">
                    <pre className="text-sm font-body whitespace-pre-wrap text-foreground">
                      {JSON.stringify(triageData, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>
      <Disclaimer />
    </Layout>
  );
};

export default SymptomChecker;
