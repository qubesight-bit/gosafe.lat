import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Disclaimer } from '@/components/Disclaimer';
import { useIsabelApi, type AgeGroup, type Region, type Diagnosis, type DiagnosisResult, type KnowledgeGroup } from '@/hooks/use-isabel-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// Accordion no longer needed - diagnoses shown as cards
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Stethoscope, AlertCircle, CalendarIcon, X, Search, Loader2,
  AlertTriangle, BookOpen, ExternalLink, Shield, ChevronRight, Flag, Star,
  Phone, Clock, Building2, CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/i18n/LanguageContext';
const SymptomChecker = () => {
  const api = useIsabelApi();
  const { toast } = useToast();
  const { t } = useLanguage();

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
  const [triageData, setTriageData] = useState<Record<string, unknown> | null>(null);
  const [loadingTriage, setLoadingTriage] = useState(false);
  const [triageAnswers, setTriageAnswers] = useState<Record<string, string>>({});

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

  const handleTriage = async (answers?: Record<string, string>) => {
    const triageUrl = result?.diagnoses_checklist?.triage_api_url;
    if (!triageUrl) return;
    setLoadingTriage(true);
    try {
      const data = await api.getTriage(triageUrl, answers) as Record<string, unknown>;
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
      <SEO title={t('symptoms.title')} description={t('symptoms.subtitle')} path="/symptom-checker" />
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{t('symptoms.title')}</h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">{t('symptoms.subtitle')}</p>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer-box p-4 flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
          <p className="text-sm font-body text-foreground/80">
            <strong className="font-semibold">{t('symptoms.disclaimer_1')}</strong>
          </p>
        </div>
        <div className="disclaimer-box p-4 flex items-start gap-3 mb-8 border-amber-500/30 bg-amber-500/5">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm font-body text-foreground/80">
            <strong className="font-semibold">{t('symptoms.disclaimer_2')}</strong>
          </p>
        </div>

        {/* Symptom Input */}
        <div className="card-elevated p-6 mb-6">
          <Label className="font-display text-lg font-semibold text-foreground mb-3 block">
            <Search className="w-4 h-4 inline mr-2 text-primary" />
            {t('symptoms.label_symptoms')}
          </Label>
          <p className="text-sm text-muted-foreground mb-3">{t('symptoms.symptoms_help')}</p>

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
              placeholder={t('symptoms.input_placeholder')}
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
            {t('symptoms.demographics')}
          </Label>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* DOB */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dob ? format(dob, "PPP") : t('symptoms.select_date')}
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
              <Label className="text-sm font-medium text-foreground">{t('symptoms.sex')}</Label>
              <Select value={sex} onValueChange={setSex}>
                <SelectTrigger><SelectValue placeholder="Select sex" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="m">{t('symptoms.male')}</SelectItem>
                  <SelectItem value="f">{t('symptoms.female')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pregnancy (conditional) */}
            {showPregnancy && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">{t('symptoms.pregnancy')}</Label>
                <Select value={pregnant} onValueChange={setPregnant}>
                  <SelectTrigger><SelectValue placeholder="Not specified" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="n">{t('symptoms.not_pregnant')}</SelectItem>
                    <SelectItem value="y">{t('symptoms.pregnant')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Region */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">{t('symptoms.region')}</Label>
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
              <Label className="text-sm font-medium text-foreground">{t('symptoms.sort_by')}</Label>
              <Select value={sortFlag} onValueChange={setSortFlag}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sortbyRW_advanced">{t('symptoms.most_relevant')}</SelectItem>
                  <SelectItem value="red_flag">{t('symptoms.dont_miss')}</SelectItem>
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
              {t('symptoms.analyzing')}
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              {t('symptoms.get_diagnosis')}
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
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-primary" />
                    {t('symptoms.differential')} ({diagnoses.length} {t('symptoms.results')})
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium border">
                    <Shield className="w-3 h-3" />
                    Source: Isabel Healthcare · isabelhealthcare.com
                  </span>
                </div>

                <div className="space-y-3">
                  {diagnoses.map((dx, i) => (
                    <div
                      key={dx.diagnosis_id}
                      className={cn(
                        "card-elevated border rounded-xl p-5 transition-all",
                        dx.red_flag === 'true' && "border-destructive/30 bg-destructive/5"
                      )}
                    >
                      {/* Main diagnosis info - always visible */}
                      <div className="flex items-start gap-3">
                        <span className={cn(
                          "text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                          dx.red_flag === 'true' ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                        )}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-lg font-semibold text-foreground">{dx.diagnosis_name}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">{dx.specialty}</p>
                          
                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {dx.red_flag === 'true' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                                <Flag className="w-3 h-3" /> Don't Miss — Red Flag
                              </span>
                            )}
                            {dx.common_diagnosis === 'true' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                <Star className="w-3 h-3" /> Common Diagnosis
                              </span>
                            )}
                          </div>

                          {/* ICD / SNOMED codes */}
                          <div className="flex flex-wrap gap-2 mt-2 text-xs">
                            {dx.icd10_diagnosis_id && (
                              <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                                ICD-10: {dx.icd10_diagnosis_id.trim()}
                              </span>
                            )}
                            {dx.snomed_diagnosis_id && (
                              <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                                SNOMED: {dx.snomed_diagnosis_id.trim()}
                              </span>
                            )}
                          </div>

                          {/* Learn More button */}
                          <div className="mt-3">
                            {!knowledgeData[dx.diagnosis_id] && loadingKnowledge !== dx.diagnosis_id && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleKnowledge(dx)}
                                className="text-xs"
                              >
                                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                                Learn More — View Resources
                              </Button>
                            )}
                            {loadingKnowledge === dx.diagnosis_id && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="w-4 h-4 animate-spin" /> Loading resources...
                              </div>
                            )}
                            {knowledgeData[dx.diagnosis_id] && (
                              <div className="mt-2 space-y-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                  <BookOpen className="w-3 h-3" />
                                  Trusted Resources
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {knowledgeData[dx.diagnosis_id].flatMap(group =>
                                    group.links.map((link, li) => (
                                      <a
                                        key={li}
                                        href={link.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted/50 transition-colors text-xs"
                                      >
                                        {link.image_url && (
                                          <img src={link.image_url} alt="" className="w-4 h-4 object-contain" />
                                        )}
                                        <span className="font-body text-foreground">{link.name}</span>
                                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                      </a>
                                    ))
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Triage */}
            {triageUrl && (
              <div className="card-elevated p-6 space-y-4">
                <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  Triage — Where to Get Care?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Answer these questions to get an urgency assessment based on your symptoms.
                </p>

                {/* Triage Questions */}
                <div className="space-y-3">
                  {[
                    { key: "Q1", label: "Is the patient experiencing severe pain?" },
                    { key: "Q2", label: "Has there been a sudden onset of symptoms?" },
                    { key: "Q3", label: "Is the patient having difficulty breathing?" },
                    { key: "Q4", label: "Is the patient feeling confused or disoriented?" },
                    { key: "Q5", label: "Has the patient experienced loss of consciousness?" },
                    { key: "Q6", label: "Is the patient bleeding or has signs of bleeding?" },
                    { key: "Q7", label: "Has the patient had a seizure?" },
                  ].map(q => (
                    <div key={q.key} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50 border border-border">
                      <span className="text-sm font-body text-foreground">{q.label}</span>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setTriageAnswers(prev => ({ ...prev, [q.key]: "Y" }))}
                          className={cn(
                            "px-3 py-1 rounded-md text-xs font-semibold transition-colors border",
                            triageAnswers[q.key] === "Y"
                              ? "bg-destructive/10 border-destructive/30 text-destructive"
                              : "border-border text-muted-foreground hover:bg-muted"
                          )}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setTriageAnswers(prev => ({ ...prev, [q.key]: "N" }))}
                          className={cn(
                            "px-3 py-1 rounded-md text-xs font-semibold transition-colors border",
                            triageAnswers[q.key] === "N"
                              ? "bg-primary/10 border-primary/30 text-primary"
                              : "border-border text-muted-foreground hover:bg-muted"
                          )}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleTriage(triageAnswers)}
                  disabled={loadingTriage || Object.keys(triageAnswers).length < 7}
                  variant="outline"
                  className="w-full"
                >
                  {loadingTriage ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Analyzing urgency...</>
                  ) : (
                    <><ChevronRight className="w-4 h-4 mr-2" />Get Triage Score ({Object.keys(triageAnswers).length}/7 answered)</>
                  )}
                </Button>

                {/* Triage Result */}
                {triageData && (() => {
                  const score = (triageData as Record<string, Record<string, string>>)?.where_to_now?.triage_score || "";
                  const needsQuestions = score.toLowerCase().includes("please send");
                  
                  // Determine urgency level from score text
                  let urgency: "emergency" | "urgent" | "routine" | "info" = "info";
                  let urgencyLabel = "Information";
                  let urgencyDesc = score;
                  const scoreLower = score.toLowerCase();
                  
                  if (scoreLower.includes("emergency") || scoreLower.includes("911") || scoreLower.includes("immediately")) {
                    urgency = "emergency";
                    urgencyLabel = "Emergency — Call 911";
                    urgencyDesc = score;
                  } else if (scoreLower.includes("urgent") || scoreLower.includes("soon") || scoreLower.includes("today")) {
                    urgency = "urgent";
                    urgencyLabel = "Urgent — See a Doctor Today";
                    urgencyDesc = score;
                  } else if (scoreLower.includes("routine") || scoreLower.includes("appointment") || scoreLower.includes("schedule")) {
                    urgency = "routine";
                    urgencyLabel = "Routine — Schedule an Appointment";
                    urgencyDesc = score;
                  }
                  
                  if (needsQuestions) {
                    return (
                      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                        <p className="text-sm text-foreground">{score}</p>
                      </div>
                    );
                  }

                  const colorMap = {
                    emergency: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-600", icon: Phone },
                    urgent: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-600", icon: Clock },
                    routine: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-600", icon: Building2 },
                    info: { bg: "bg-primary/10", border: "border-primary/30", text: "text-primary", icon: CheckCircle2 },
                  };
                  const style = colorMap[urgency];
                  const Icon = style.icon;

                  return (
                    <div className={cn("p-5 rounded-xl border-2", style.bg, style.border)}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", style.bg)}>
                          <Icon className={cn("w-5 h-5", style.text)} />
                        </div>
                        <div>
                          <h3 className={cn("font-display font-bold text-lg", style.text)}>{urgencyLabel}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 font-body">{urgencyDesc}</p>
                    </div>
                  );
                })()}
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
