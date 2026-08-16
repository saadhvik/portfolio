// Single source of truth. Every string here traces to a line in the resume.
// Copy is first-person and quantified wherever the resume gives a number.

export const profile = {
  name: 'Venkata Krishna Saadhvik Muddana',
  shortName: 'Saadhvik Muddana',
  role: 'Data Scientist & ML Engineer',
  location: 'Cincinnati, OH · Open to relocation',
  availability: 'MS Computer Science @ University of Cincinnati · Available May 2026',
  valueProp:
    'I turn 8-hour physics simulations into sub-second predictions, and messy multi-source data into decisions people actually act on.',
  email: 'muddanvk@mail.uc.edu',
  phone: '513-349-6965',
  phoneHref: '+15133496965',
  linkedin: 'https://www.linkedin.com/in/saadhvik-muddana',
  github: 'https://github.com/saadhvik',
  resumePdf: '/Venkata-Krishna-Saadhvik-Muddana-Resume.pdf',
}

// Above-the-fold proof. Three numbers, nothing else competing.
export const heroMetrics = [
  { value: '8h → <1s', label: 'Physics simulation runtime, via PyTorch surrogate models', tone: 'cyan' },
  { value: '81%', label: 'Top-3 accuracy on RAG clinical-trial matching, 500 oncologist-reviewed cases', tone: 'violet' },
  { value: '3 + 2', label: 'Peer-reviewed publications and filed patents', tone: 'amber' },
]

export const about = {
  headline: 'I work at the point where raw signal becomes a decision.',
  body: [
    'Every job I have held has handed me the same problem in a different costume: a high-dimensional, noisy, multi-source dataset that nobody can act on yet. Hyperspectral satellite cubes over the Krishna River Basin. 200+ source tables behind a physics simulation. Procurement records scattered across 30+ APIs, flat files, and web scrapes.',
    'My job is to compress that into something a stakeholder can decide on — a screened design list, a governed KPI, a ranked trial match — and then to prove the compression was honest. That means SHAP, cross-validation, drift monitoring, and 73 dbt tests, not just a good-looking validation curve.',
  ],
  facts: [
    { k: 'Currently', v: 'Research Assistant, University of Cincinnati' },
    { k: 'Studying', v: 'MS Computer & Information Science (Aug 2025 – Apr 2027)' },
    { k: 'Prior', v: 'B.Tech CS (AI/ML), SRM University AP — GPA 3.57/4.0' },
    { k: 'Depth', v: 'Surrogate modeling, RAG systems, hyperspectral ML, analytics engineering' },
  ],
}

export const skillGroups = [
  {
    band: 'Modeling & Statistics',
    accent: 'cyan',
    items: ['Python', 'PyTorch', 'scikit-learn', 'XGBoost', 'TensorFlow', 'Statistical modeling', 'Hypothesis testing', 'A/B testing', 'Forecasting / time series', 'Classification', 'Clustering & segmentation', 'Optimization', 'Feature engineering', 'Cross-validation', 'SHAP'],
  },
  {
    band: 'Data & MLOps',
    accent: 'violet',
    items: ['SQL', 'R', 'ETL / ELT pipelines', 'dbt', 'Dagster', 'Great Expectations', 'Databricks', 'Spark', 'Snowflake', 'Azure Data Lake', 'Lakehouse architecture', 'AWS S3 & Lambda', 'PostgreSQL', 'MLflow', 'Model & data-drift monitoring', 'GitHub Actions CI/CD', 'Git'],
  },
  {
    band: 'NLP, GenAI & Communication',
    accent: 'amber',
    items: ['RAG', 'LangChain', 'GPT-4', 'Prompt engineering', 'Power BI', 'Tableau', 'matplotlib', 'Seaborn', 'Agile / Scrum', 'Stakeholder communication'],
  },
]

export const experience = [
  {
    id: 'uc',
    org: 'University of Cincinnati',
    role: 'Research Assistant',
    place: 'Cincinnati, OH',
    period: 'Sep 2025 — Present',
    current: true,
    headline: 'Replaced an 8-hour simulation with a sub-second model.',
    bullets: [
      'Developed PyTorch and scikit-learn surrogate models for large-scale physics simulations, cutting runtime from 8 hours to sub-second predictions and screening 85% of candidate designs before full analysis.',
      'Built SQL and Python pipelines for feature engineering and model validation across 200+ source tables, applying anomaly checks, schema-drift detection, and data-quality rules that reduced out-of-specification records by 25%.',
      'Documented model performance, limitations, and findings in Power BI for technical and non-technical stakeholders.',
    ],
    stats: [
      { v: '8h → <1s', l: 'inference time' },
      { v: '85%', l: 'designs pre-screened' },
      { v: '−25%', l: 'out-of-spec records' },
    ],
    stack: ['PyTorch', 'scikit-learn', 'SQL', 'Power BI'],
  },
  {
    id: 'infosys',
    org: 'Infosys',
    role: 'Data Scientist & Engineer, Analytics Platforms',
    place: 'Remote',
    period: 'May 2024 — Jul 2025',
    headline: 'Cut 60% of the redundancy out of enterprise procurement data.',
    bullets: [
      'Engineered ETL pipelines on AWS S3 and Parquet to ingest procurement, project, and vendor data from 30+ APIs, flat files, and web sources, standardizing schemas for downstream analytics and model development.',
      'Developed entity-resolution, deduplication, and data-profiling algorithms that reduced redundant records by 60% and improved data freshness by 40%, while surfacing trend, anomaly, and coverage insights for stakeholders.',
      'Developed GPT-4 / LangChain extraction workflows for unstructured procurement documents, converting free-text records into structured features and reusable reporting outputs while maintaining validation rules and version-controlled documentation.',
    ],
    stats: [
      { v: '−60%', l: 'redundant records' },
      { v: '+40%', l: 'data freshness' },
      { v: '30+', l: 'ingested sources' },
    ],
    stack: ['AWS S3', 'Parquet', 'GPT-4', 'LangChain', 'Python'],
  },
  {
    id: 'hispec',
    org: 'Hispec Lab, SRM University AP',
    role: 'Research Assistant',
    place: 'Andhra Pradesh, India',
    period: 'Jun 2022 — Jan 2024',
    headline: 'Turned 4 months of manual labeling into an automated pipeline.',
    bullets: [
      'Delivered a production-grade hyperspectral classification pipeline on EO-1 Hyperion satellite imagery — raw sensor data through ENVI bad-band removal, radiometric and atmospheric correction, to PPI / N-FINDR endmember detection — producing an analysis-ready dataset for the Krishna River Basin at scale.',
      'Eliminated a months-long manual labeling bottleneck by designing an unsupervised ground-truth generation system (LSTM + PCA), turning a 4+ month manual annotation process into a fully automated pipeline.',
      'Improved accuracy and AUC-ROC by training and rigorously evaluating 25 deep learning and ensemble architectures; the final Stacking LSTM-CNN model decisively outperformed all standalone baselines.',
      'Benchmarked 8 feature engineering methods (CFS, RFE, LDA, MIFS vs. IPCA, PCA, QDA, NMF) across Fast-3D CNN and ResNet, identifying IPCA as optimal on the Indian Pines and Salinas datasets.',
      'Solved a zero-labeled-data problem in medical AI by designing a synthetic data generation pipeline using Bilinear Mixing Models.',
    ],
    stats: [
      { v: '4 months → 0', l: 'manual annotation' },
      { v: '25', l: 'architectures evaluated' },
      { v: '8', l: 'feature methods benchmarked' },
    ],
    stack: ['LSTM + PCA', 'ENVI', 'N-FINDR', 'ResNet', '3D CNN'],
  },
]

export const projects = [
  {
    id: 'clinical',
    name: 'AI-Powered Clinical Trial Match Engine',
    tag: 'RAG · Production service',
    problem: 'Matching one patient to a clinical trial took a coordinator about 4 hours of manual reading.',
    action:
      'Built an end-to-end RAG pipeline over 50,000+ ClinicalTrials.gov records using semantic vector search with GPT-4 re-ranking, plus domain-specific medical chunking. Deployed it as a FastAPI microservice on AWS Lambda with async job tracking, PostgreSQL result caching, and CloudWatch monitoring.',
    result:
      '90 seconds per patient instead of 4 hours, 81% top-3 accuracy validated against oncologist-reviewed ground truth on 500 cases, 34% better retrieval precision than a BM25 baseline, serving 300+ requests/day at sub-3s response time.',
    stats: [
      { v: '4h → 90s', l: 'per-patient match time' },
      { v: '81%', l: 'top-3 accuracy (500 cases)' },
      { v: '+34%', l: 'retrieval precision vs BM25' },
      { v: '<3s', l: 'p-latency at 300+ req/day' },
    ],
    stack: ['GPT-4', 'Vector search', 'FastAPI', 'AWS Lambda', 'PostgreSQL', 'CloudWatch'],
  },
  {
    id: 'northpeak',
    name: 'NorthPeak Self-Serve Analytics Platform',
    tag: 'Analytics engineering · Data quality',
    problem: 'Finance and analysts disagreed on revenue numbers, so every KPI became an ad-hoc analyst request.',
    action:
      'Built a dbt / Kimball star-schema warehouse over 3.3M+ e-commerce records (TheLook) with a governed single-source revenue ladder and a metric dictionary agreed with finance. Enforced quality with 73 dbt tests and 25 Great Expectations checks, a daily Dagster refresh with fail-closed gating and alerts, and GitHub Actions CI on every PR.',
    result:
      'Ad-hoc requests replaced with self-serve KPIs on one agreed definition; the quality gate caught 4 of 4 seeded anomalies before they reached a dashboard.',
    stats: [
      { v: '3.3M+', l: 'records modeled' },
      { v: '98', l: 'automated quality checks' },
      { v: '4/4', l: 'seeded anomalies caught' },
      { v: 'Daily', l: 'fail-closed refresh' },
    ],
    stack: ['dbt', 'Dagster', 'Great Expectations', 'GitHub Actions', 'SQL'],
  },
]

export const publications = [
  {
    title: 'Efficient Hyperspectral Image Classification of the Krishna River Basin in Andhra Pradesh Using Hybrid Ensemble Learning Models',
    venue: 'Optica Imaging Congress 2025, Optica Publishing Group',
    year: '2025',
  },
  {
    title: 'Hyperspectral Image Classification with Deep Learning: Unleashed by Feature Selection and Extraction',
    venue: 'Innovations in Computer Science and Engineering, Springer Nature',
    year: '2025',
  },
  {
    title: 'Non-Invasive Oral Cancer Detection Using Hyperspectral Imaging and Advanced Spectral Unmixing Models',
    venue: 'Peer-reviewed',
    year: '—',
  },
]

export const patents = [
  { title: 'Automated Label Generation', id: 'IN202641066945 A1' },
  { title: 'Real-Time Food Contamination Detection', id: 'IN202441100125' },
]

export const certifications = [
  'OCI 2025 Certified Data Science Professional',
  'OCI 2025 Certified Generative AI Professional',
]

export const education = [
  {
    school: 'University of Cincinnati',
    degree: 'MS, Computer and Information Science',
    period: 'Aug 2025 — Apr 2027',
    place: 'Cincinnati, OH',
  },
  {
    school: 'SRM University AP',
    degree: 'B.Tech, Computer Science (AI/ML) — GPA 3.57 / 4.0',
    period: 'Aug 2021 — May 2025',
    place: 'Andhra Pradesh, India',
  },
]

export const sections = [
  { id: 'hero', label: 'Top' },
  { id: 'proof', label: 'Proof' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]
