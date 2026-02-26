// Substance directory linking to PsychonautWiki experience/info pages
// PsychonautWiki content is available under Creative Commons Attribution-ShareAlike 4.0

export interface DirectorySubstance {
  name: string;
  urlSlug: string; // PsychonautWiki wiki slug
}

export interface SubstanceCategory {
  id: string;
  name: string;
  subcategories: {
    name: string;
    substances: DirectorySubstance[];
  }[];
}

function s(name: string, slug?: string): DirectorySubstance {
  return { name, urlSlug: slug || name.replace(/ /g, '_') };
}

export const substanceDirectory: SubstanceCategory[] = [
  {
    id: 'psychedelics',
    name: 'Novel Psychedelics',
    subcategories: [
      {
        name: '2C-x',
        substances: [s('2C-B'), s('2C-B-FLY'), s('2C-C'), s('2C-D'), s('2C-E'), s('2C-I'), s('2C-P'), s('2C-T-2'), s('2C-T-7')],
      },
      {
        name: 'DOx',
        substances: [s('DOB'), s('DOC'), s('DOI'), s('DOM'), s('MiPT'), s('MET')],
      },
      {
        name: 'Lysergamides',
        substances: [s('1P-LSD'), s('AL-LAD'), s('ETH-LAD'), s('LSA')],
      },
      {
        name: 'MDxx',
        substances: [s('MDA')],
      },
      {
        name: 'NBx',
        substances: [s('25B-NBOMe'), s('25C-NBOMe'), s('25I-NBOMe'), s('25N-NBOMe')],
      },
      {
        name: 'Substituted Phenethylamines',
        substances: [s('Bromo-DragonFLY')],
      },
      {
        name: 'Substituted Tryptamines',
        substances: [
          s('4-AcO-DET'), s('4-AcO-DMT'), s('4-HO-DiPT'), s('4-HO-DPT'),
          s('4-AcO-MET'), s('4-AcO-MiPT'), s('4-HO-MET'), s('4-HO-MiPT'),
          s('5-MeO-DALT'), s('5-MeO-DiBF'), s('5-MeO-DMT'), s('5-MeO-MiPT'),
          s('αMT', 'AMT'), s('DiPT'), s('Psilocin'),
        ],
      },
      {
        name: 'Miscellaneous',
        substances: [s('Efavirenz'), s('Ibogaine')],
      },
    ],
  },
  {
    id: 'cannabinoids',
    name: 'Cannabinoids',
    subcategories: [
      {
        name: 'Phytocannabinoids',
        substances: [
          s('Delta-8-THC', 'Delta-8-THC'), s('THC', 'THC'), s('Delta-10-THC', 'Delta-10-THC'),
          s('Delta-11-THC', 'Delta-11-THC'), s('THCB'), s('THCH'), s('THCP'),
        ],
      },
      {
        name: 'Semi-synthetic',
        substances: [s('HHC'), s('HHCH'), s('HHCP-O-acetate'), s('THC-O-acetate'), s('THCP-O-acetate')],
      },
      {
        name: 'Synthetic Cannabinoids',
        substances: [
          s('5F-AKB48'), s('5F-PB-22'), s('AB-FUBINACA'), s('APICA'),
          s('JWH-018'), s('JWH-073'), s('THJ-018'), s('THJ-2201'), s('STS-135'),
        ],
      },
    ],
  },
  {
    id: 'dissociatives',
    name: 'Dissociatives',
    subcategories: [
      {
        name: 'Adamantanes',
        substances: [s('Memantine')],
      },
      {
        name: 'Arylcyclohexylamines',
        substances: [
          s('2-FDCK'), s('3-MeO-PCE'), s('3-MeO-PCMo'), s('3-MeO-PCP'),
          s('4-MeO-PCP'), s('DCK', 'Deschloroketamine'), s('Ketamine'),
          s('Methoxetamine'), s('O-PCE'), s('PCP'),
        ],
      },
      {
        name: 'Diarylethylamines',
        substances: [s('Diphenidine'), s('Ephenidine'), s('Methoxphenidine')],
      },
      {
        name: 'Inhalants',
        substances: [s('Nitrous oxide', 'Nitrous_oxide')],
      },
      {
        name: 'Substituted Morphinans',
        substances: [s('DXM')],
      },
      {
        name: 'Terpenoids',
        substances: [s('Salvinorin A', 'Salvinorin_A')],
      },
    ],
  },
  {
    id: 'deliriants',
    name: 'Deliriants',
    subcategories: [
      {
        name: 'Anticholinergic Nightshades',
        substances: [
          s('Atropa belladonna', 'Atropa_belladonna'), s('Datura'),
          s('Hyoscyamus niger', 'Hyoscyamus_niger'), s('Mandragora officinarum', 'Mandragora_officinarum'),
        ],
      },
      {
        name: 'Other Deliriants',
        substances: [s('Benzydamine'), s('Diphenhydramine'), s('Mirtazapine'), s('Myristicin')],
      },
    ],
  },
  {
    id: 'depressants',
    name: 'Depressants',
    subcategories: [
      {
        name: 'Alcohols',
        substances: [s('Alcohol'), s('2M2B')],
      },
      {
        name: 'Barbiturates',
        substances: [s('Pentobarbital'), s('Phenobarbital'), s('Secobarbital')],
      },
      {
        name: 'Benzodiazepines',
        substances: [
          s('Alprazolam'), s('Clonazolam'), s('Clonazepam'), s('Deschloroetizolam'),
          s('Diazepam'), s('Diclazepam'), s('Etizolam'), s('Flubromazepam'),
          s('Flubromazolam'), s('Lorazepam'), s('Nifoxipam'), s('Pyrazolam'),
        ],
      },
      {
        name: 'GABA Analogues',
        substances: [s('F-Phenibut'), s('Phenibut')],
      },
      {
        name: 'Gabapentinoids',
        substances: [s('Gabapentin'), s('Pregabalin')],
      },
      {
        name: 'GHB & Related',
        substances: [s('1,4-Butanediol', '1,4-Butanediol'), s('GBL'), s('GHB')],
      },
      {
        name: 'Opioids',
        substances: [
          s('Acetylfentanyl'), s('Buprenorphine'), s('Codeine'), s('Desomorphine'),
          s('Dextropropoxyphene'), s('Dihydrocodeine'), s('Ethylmorphine'),
          s('Heroin'), s('Hydrocodone'), s('Methadone'), s('Morphine'),
          s('O-Desmethyltramadol'), s('Oxycodone'), s('Pethidine'),
          s('Sufentanil'), s('Tapentadol'), s('Tramadol'), s('U-47700'),
        ],
      },
      {
        name: 'Z-drugs',
        substances: [s('Zopiclone'), s('Zolpidem')],
      },
      {
        name: 'Miscellaneous Depressants',
        substances: [s('Kratom'), s('Methaqualone'), s('Quetiapine'), s('Tianeptine')],
      },
    ],
  },
  {
    id: 'nootropics',
    name: 'Nootropics',
    subcategories: [
      {
        name: 'Acetamides',
        substances: [s('Armodafinil'), s('Modafinil'), s('N-Methylbisfluoromodafinil')],
      },
      {
        name: 'Choline',
        substances: [
          s('Acetylcholine'), s('Alpha-GPC'), s('Choline bitartrate', 'Choline_bitartrate'),
          s('Citicoline'), s('Meclofenoxate'),
        ],
      },
      {
        name: 'Racetams',
        substances: [s('Coluracetam'), s('Omberacetam'), s('Oxiracetam'), s('Piracetam'), s('Pramiracetam')],
      },
      {
        name: 'Miscellaneous Nootropics',
        substances: [
          s('Bromantane'), s('Creatine'), s('L-Theanine'), s('N-Acetylcysteine'),
          s('S-Adenosyl methionine', 'S-Adenosyl_methionine'), s('Tianeptine'), s('Tyrosine'),
        ],
      },
    ],
  },
  {
    id: 'stimulants',
    name: 'Stimulants',
    subcategories: [
      {
        name: 'Beta-keto Amphetamines',
        substances: [s('5-APB'), s('6-APB'), s('6-APDB')],
      },
      {
        name: 'Cocaine & Related',
        substances: [s('Cocaine'), s('Dichloropane')],
      },
      {
        name: 'Miscellaneous Stimulants',
        substances: [s('Caffeine'), s('2-AI'), s('NM-2-AI')],
      },
      {
        name: 'Nicotine Alkaloids',
        substances: [s('Nicotine')],
      },
      {
        name: 'Phenidates',
        substances: [
          s('Desoxypipradrol'), s('Ethylphenidate'), s('Isopropylphenidate'),
          s('Methylnaphthidate'), s('Methylphenidate'),
        ],
      },
      {
        name: 'Substituted Amphetamines',
        substances: [s('2-FA'), s('2-FMA'), s('Amphetamine'), s('Lisdexamfetamine'), s('Methamphetamine')],
      },
      {
        name: 'Substituted Cathinones',
        substances: [
          s('3,4-CTMP', '3,4-CTMP'), s('3-FEA'), s('3-FPM'), s('4-FA'),
          s('Butylone'), s('Ethylone'), s('Hexedrone'), s('Hexen'),
          s('Mephedrone'), s('MDAI'), s('MDEA'), s('MDMA'), s('Methylone'),
          s('Mexedrone'), s('NEP'),
        ],
      },
      {
        name: 'Substituted Pyrrolidines',
        substances: [s('A-PHP', 'Alpha-PHP'), s('A-PVP', 'Alpha-PVP'), s('MDPV')],
      },
    ],
  },
  {
    id: 'botany',
    name: 'Botany & Mycology',
    subcategories: [
      {
        name: 'Plants & Fungi',
        substances: [
          s('Amanita muscaria', 'Amanita_muscaria'),
          s('Cannabis'),
          s('Coffea'),
          s('San Pedro', 'San_Pedro'),
          s('Nicotiana'),
          s('Peganum harmala', 'Peganum_harmala'),
          s('Psilocybe cubensis', 'Psilocybe_cubensis'),
          s('Psilocybe mexicana', 'Psilocybe_mexicana'),
          s('Salvia divinorum', 'Salvia_divinorum'),
        ],
      },
    ],
  },
];

export const PSYCHONAUTWIKI_BASE = 'https://psychonautwiki.org/wiki/';

export function getPsychonautWikiUrl(slug: string): string {
  return `${PSYCHONAUTWIKI_BASE}${encodeURIComponent(slug)}`;
}

// Count total substances
export const totalDirectorySubstances = substanceDirectory.reduce(
  (total, cat) => total + cat.subcategories.reduce(
    (sub, sc) => sub + sc.substances.length, 0
  ), 0
);
