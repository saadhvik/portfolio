/**
 * All site content. Single source of truth — no copy is hard-coded in a
 * component. Everything here traces to a line in the resume unless marked TODO.
 */

export const profile = {
  name: 'Venkata Krishna Saadhvik Muddana',
  shortName: 'Saadhvik Muddana',
  role: 'Data Scientist & ML Engineer',
  location: 'Cincinnati, OH',
  relocation: 'Open to relocation',
  availability: 'Available May 2026',
  // Display headline, split per line for the masked char reveal.
  headline: ['Turning raw signal', 'into decisions', 'people act on.'],
  subhead:
    'I build predictive models, production ML pipelines and stakeholder-ready analytics from large, multi-source data — and I prove the compression was honest.',
  bio: 'Data Scientist and MS Computer Science candidate. Every role I have held handed me the same problem in a different costume: a high-dimensional, noisy, multi-source dataset nobody can act on yet. Hyperspectral satellite cubes. 200+ source tables behind a physics simulation. Procurement records scattered across 30+ APIs. My job is to compress that into something a stakeholder can decide on, then prove the compression held.',
  email: 'muddanvk@mail.uc.edu',
  phone: '513-349-6965',
  phoneHref: '+15133496965',
  // TODO(saadhvik): verify these two resolve — inferred from the resume PDF.
  linkedin: 'https://www.linkedin.com/in/saadhvik-muddana',
  github: 'https://github.com/saadhvik',
  resume: '/Venkata-Krishna-Saadhvik-Muddana-Resume.pdf',
  siteUrl: 'https://portfolio-psi-ashen-75.vercel.app',
} as const

export const stats = [
  { value: 8, suffix: 'h → <1s', label: 'Physics simulation runtime', prefix: '' },
  { value: 81, suffix: '%', label: 'Top-3 RAG match accuracy', prefix: '' },
  { value: 60, suffix: '%', label: 'Redundant records removed', prefix: '−' },
  { value: 5, suffix: '', label: 'Publications & patents', prefix: '' },
] as const

export type Project = {
  slug: string
  name: string
  tagline: string
  year: string
  role: string
  category: 'ML Systems' | 'Data Platform' | 'Research'
  featured: boolean
  /** Bento span: how many of 12 columns this card occupies on desktop. */
  span: 4 | 6 | 8 | 12
  accentStat: { value: string; label: string }
  stats: { value: string; label: string }[]
  problem: string
  process: string[]
  outcome: string
  stack: string[]
}

export const projects: Project[] = [
  {
    slug: 'clinical-trial-match',
    name: 'Clinical Trial Match Engine',
    tagline: 'RAG over 50,000+ trials, cutting a 4-hour manual search to 90 seconds.',
    year: '2025',
    role: 'Sole engineer — retrieval, ranking, deployment',
    category: 'ML Systems',
    featured: true,
    span: 8,
    accentStat: { value: '4h → 90s', label: 'per-patient match time' },
    stats: [
      { value: '81%', label: 'top-3 accuracy, 500 cases' },
      { value: '+34%', label: 'retrieval precision vs BM25' },
      { value: '<3s', label: 'response at 300+ req/day' },
      { value: '50k+', label: 'trials indexed' },
    ],
    problem:
      'Matching one patient to a clinical trial took a coordinator roughly four hours of manual reading across ClinicalTrials.gov. The bottleneck was not search — it was that eligibility criteria are dense free text that keyword search cannot rank meaningfully.',
    process: [
      'Ingested 50,000+ ClinicalTrials.gov records and built a semantic vector index over eligibility criteria, with domain-specific medical chunking tuned to keep inclusion and exclusion clauses intact rather than splitting mid-criterion.',
      'Layered GPT-4 re-ranking over the top-k vector candidates, prompted to justify each ranking against the patient profile so the output was auditable rather than a bare score.',
      'Validated against oncologist-reviewed ground truth on 500 real cases, measuring top-3 accuracy rather than top-1 — three candidates is what a coordinator actually reviews.',
      'Deployed as a FastAPI microservice on AWS Lambda with async job tracking, PostgreSQL result caching and CloudWatch monitoring.',
    ],
    outcome:
      '90 seconds per patient instead of four hours, at 81% top-3 accuracy against oncologist-reviewed ground truth. Retrieval precision came in 34% above a BM25 baseline, and the service holds sub-3s response at 300+ requests/day.',
    stack: ['GPT-4', 'Vector search', 'FastAPI', 'AWS Lambda', 'PostgreSQL', 'CloudWatch', 'Python'],
  },
  {
    slug: 'northpeak-analytics',
    name: 'NorthPeak Analytics Platform',
    tagline: 'A governed warehouse over 3.3M records that ended the ad-hoc request queue.',
    year: '2025',
    role: 'Analytics engineer — modelling, quality, orchestration',
    category: 'Data Platform',
    featured: true,
    span: 4,
    accentStat: { value: '3.3M+', label: 'records modelled' },
    stats: [
      { value: '98', label: 'automated quality checks' },
      { value: '4/4', label: 'seeded anomalies caught' },
      { value: 'Daily', label: 'fail-closed refresh' },
    ],
    problem:
      'Finance and analysts disagreed on what revenue meant. Every KPI became an ad-hoc analyst request, and no two answers reconciled.',
    process: [
      'Built a dbt / Kimball star-schema warehouse over 3.3M+ e-commerce records with a governed single-source revenue ladder.',
      'Agreed a written metric dictionary with finance before modelling, so the definitions were settled upstream of the SQL rather than argued downstream of it.',
      'Enforced quality with 73 dbt tests and 25 Great Expectations checks, plus a daily Dagster refresh with fail-closed gating and alerting.',
      'Wired GitHub Actions CI on every PR so a definition change could not merge without passing the full suite.',
    ],
    outcome:
      'Ad-hoc requests replaced by self-serve KPIs on one agreed definition. The quality gate caught 4 of 4 seeded anomalies before they reached a dashboard.',
    stack: ['dbt', 'Dagster', 'Great Expectations', 'GitHub Actions', 'SQL', 'Kimball'],
  },
  {
    slug: 'physics-surrogate',
    name: 'Physics Simulation Surrogates',
    tagline: 'PyTorch surrogates replacing an 8-hour simulation with sub-second inference.',
    year: '2025—present',
    role: 'Research Assistant, University of Cincinnati',
    category: 'ML Systems',
    featured: true,
    span: 6,
    accentStat: { value: '8h → <1s', label: 'inference time' },
    stats: [
      { value: '85%', label: 'designs pre-screened' },
      { value: '−25%', label: 'out-of-spec records' },
      { value: '200+', label: 'source tables' },
    ],
    problem:
      'Evaluating a single candidate design required an 8-hour physics simulation. That runtime capped how much of the design space could be explored at all.',
    process: [
      'Built PyTorch and scikit-learn surrogate models trained on simulation outputs, targeting the screening decision rather than full-fidelity replacement.',
      'Constructed SQL and Python feature pipelines across 200+ source tables, with anomaly checks, schema-drift detection and data-quality rules.',
      'Documented model performance and — critically — its limitations in Power BI, so non-technical stakeholders knew where the surrogate should not be trusted.',
    ],
    outcome:
      'Sub-second predictions in place of 8-hour runs, screening 85% of candidate designs before full analysis. Data-quality rules cut out-of-specification records by 25%.',
    stack: ['PyTorch', 'scikit-learn', 'SQL', 'Python', 'Power BI'],
  },
  {
    slug: 'hyperspectral-classification',
    name: 'Hyperspectral Classification Pipeline',
    tagline: 'Automating four months of manual labelling on EO-1 Hyperion satellite imagery.',
    year: '2022—2024',
    role: 'Research Assistant, Hispec Lab',
    category: 'Research',
    featured: true,
    span: 6,
    accentStat: { value: '4 months → 0', label: 'manual annotation' },
    stats: [
      { value: '25', label: 'architectures evaluated' },
      { value: '8', label: 'feature methods benchmarked' },
      { value: '3', label: 'publications' },
    ],
    problem:
      'Hyperspectral classification of the Krishna River Basin was blocked on ground truth: labelling took over four months by hand, and nothing downstream could start without it.',
    process: [
      'Delivered a production-grade pipeline on EO-1 Hyperion imagery — ENVI bad-band removal, radiometric and atmospheric correction, then PPI / N-FINDR endmember detection to an analysis-ready dataset.',
      'Designed an unsupervised ground-truth generation system (LSTM + PCA) that replaced the manual annotation process entirely.',
      'Trained and rigorously evaluated 25 deep learning and ensemble architectures; the final Stacking LSTM-CNN decisively outperformed every standalone baseline.',
      'Benchmarked 8 feature engineering methods (CFS, RFE, LDA, MIFS against IPCA, PCA, QDA, NMF) across Fast-3D CNN and ResNet, identifying IPCA as optimal on Indian Pines and Salinas.',
      'Solved a zero-labelled-data problem in medical AI with a synthetic data pipeline built on Bilinear Mixing Models.',
    ],
    outcome:
      'A four-month manual bottleneck became a fully automated pipeline, with improved accuracy and AUC-ROC. The work produced three peer-reviewed publications and a filed patent on automated label generation.',
    stack: ['LSTM', 'PCA', 'ENVI', 'N-FINDR', 'ResNet', '3D CNN', 'Python'],
  },
]

export const experience = [
  {
    org: 'University of Cincinnati',
    role: 'Research Assistant',
    period: 'Sep 2025 — Present',
    place: 'Cincinnati, OH',
    current: true,
    summary: 'Replaced an 8-hour simulation with a sub-second model.',
  },
  {
    org: 'Infosys',
    role: 'Data Scientist & Engineer, Analytics Platforms',
    period: 'May 2024 — Jul 2025',
    place: 'Remote',
    current: false,
    summary: 'Cut 60% of the redundancy out of enterprise procurement data.',
  },
  {
    org: 'Hispec Lab, SRM University AP',
    role: 'Research Assistant',
    period: 'Jun 2022 — Jan 2024',
    place: 'Andhra Pradesh, India',
    current: false,
    summary: 'Turned four months of manual labelling into an automated pipeline.',
  },
] as const

export const education = [
  {
    school: 'University of Cincinnati',
    degree: 'MS, Computer and Information Science',
    period: 'Aug 2025 — Apr 2027',
  },
  {
    school: 'SRM University AP',
    degree: 'B.Tech, Computer Science (AI/ML) — GPA 3.57/4.0',
    period: 'Aug 2021 — May 2025',
  },
] as const

export const skillGroups = [
  {
    title: 'Modelling & Statistics',
    items: [
      'Python', 'PyTorch', 'scikit-learn', 'XGBoost', 'TensorFlow', 'Statistical modelling',
      'Hypothesis testing', 'A/B testing', 'Forecasting', 'Classification', 'Clustering',
      'Optimisation', 'Feature engineering', 'Cross-validation', 'SHAP',
    ],
  },
  {
    title: 'Data & MLOps',
    items: [
      'SQL', 'R', 'ETL / ELT', 'dbt', 'Dagster', 'Great Expectations', 'Databricks', 'Spark',
      'Snowflake', 'Azure Data Lake', 'Lakehouse', 'AWS S3', 'AWS Lambda', 'PostgreSQL',
      'MLflow', 'Drift monitoring', 'GitHub Actions',
    ],
  },
  {
    title: 'NLP, GenAI & Delivery',
    items: [
      'RAG', 'LangChain', 'GPT-4', 'Prompt engineering', 'Power BI', 'Tableau', 'matplotlib',
      'Seaborn', 'Agile / Scrum', 'Stakeholder communication',
    ],
  },
] as const

/** Flat list for the infinite marquee. */
export const marqueeSkills = [
  'PyTorch', 'scikit-learn', 'Python', 'SQL', 'dbt', 'Dagster', 'Spark', 'Databricks',
  'Snowflake', 'AWS', 'PostgreSQL', 'MLflow', 'LangChain', 'GPT-4', 'RAG', 'XGBoost',
  'TensorFlow', 'Great Expectations', 'Power BI', 'GitHub Actions',
] as const

export const publications = [
  {
    title:
      'Efficient Hyperspectral Image Classification of the Krishna River Basin Using Hybrid Ensemble Learning Models',
    venue: 'Optica Imaging Congress 2025, Optica Publishing Group',
    year: '2025',
  },
  {
    title:
      'Hyperspectral Image Classification with Deep Learning: Unleashed by Feature Selection and Extraction',
    venue: 'Innovations in Computer Science and Engineering, Springer Nature',
    year: '2025',
  },
  {
    title: 'Non-Invasive Oral Cancer Detection Using Hyperspectral Imaging and Spectral Unmixing',
    venue: 'Peer-reviewed',
    year: '—',
  },
] as const

export const patents = [
  { title: 'Automated Label Generation', id: 'IN202641066945 A1' },
  { title: 'Real-Time Food Contamination Detection', id: 'IN202441100125' },
] as const

export const certifications = [
  'OCI 2025 Certified Data Science Professional',
  'OCI 2025 Certified Generative AI Professional',
] as const

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const
