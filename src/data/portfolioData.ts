export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Agentic AI' | 'Healthcare' | 'Environmental' | 'Knowledge & RAG';
  featured: boolean;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  summary: string;
  description: string;
  architectureHighlights: string[];
  keyOutcomes: string[];
  systemFlow: {
    step: string;
    description: string;
    tech: string;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
  technologies: string[];
  coreMetric: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    tools: string[];
  }[];
}

export interface Certification {
  title: string;
  issuer: string;
  type: string;
  badgeCode: string;
  description: string;
}

export const PERSONAL_DETAILS = {
  name: 'Rashmi Sondhi',
  title: 'Innovative AI Full-Stack & Agentic AI Developer',
  experienceYears: '7+',
  location: 'Durg, Chhattisgarh (Open to Remote)',
  phone: '+91 78695 15615',
  email: 'rashmisondhi456@gmail.com',
  whatsappUrl: 'https://wa.me/917869515615',
  portfolioSite: 'https://airpollutiontracking.netlify.app',
  summary:
    'Innovative AI Full-Stack & Agentic AI Developer with 7+ years of experience bridging scalable software engineering, multi-agent orchestration, and workflow automation. Hands-on expert in designing multi-agent system architectures, LLM integrations (OpenAI, Claude, Gemini API, Google AI Studio), and low-code/code automation pipelines (n8n, Webhooks, REST APIs, no code, Replit Agent, Gumloop, NotebookLM). Proven ability to build end-to-end full-stack web/app solutions using Python, FastAPI, React, Next.js, TypeScript, PostgreSQL, and Docker hosted on cloud platforms (Netlify, Vercel, Replit). Adept at converting complex business workflows into autonomous AI pipelines, specialized content generation systems, and human-in-the-loop approval platforms.',
};

export const KEY_METRICS = [
  { value: '7+', label: 'Years Experience', subtext: 'Full-stack & AI systems' },
  { value: '4', label: 'Flagship Systems', subtext: 'Live deployed solutions' },
  { value: '99.4%', label: 'Hallucination Defense', subtext: 'Strict JSON schema bounds' },
  { value: '100%', label: 'Open to Remote', subtext: 'Global team availability' },
];

export const PROJECTS: Project[] = [
  {
    id: 'agentic-recruiter',
    title: 'Agentic AI Recruitment & Screening System',
    subtitle: 'Autonomous Multi-Agent Orchestration & Candidate Scoring Engine',
    category: 'Agentic AI',
    featured: true,
    image: '/src/assets/images/project_recruitment_agent_1793291884409.jpg',
    tags: ['n8n', 'Claude API', 'Gemini API', 'Webhooks', 'Supabase', 'PostgreSQL', 'LangGraph'],
    summary:
      'Autonomous multi-step AI agent pipeline that ingests unstructured candidate resumes via webhooks, performs context-aware semantic evaluation, scores eligibility against core job specs, and triggers automated email/WhatsApp updates with a human-in-the-loop review dashboard.',
    description:
      'Engineered an end-to-end autonomous candidate assessment pipeline connecting inbound webhook triggers directly to multi-model LLM nodes (Claude 3.5 Sonnet and Gemini Pro). Designed deterministic JSON schema constraints to extract candidate credentials without hallucinations, calculating precision match scores against strict job requirements.',
    architectureHighlights: [
      'Webhook listener ingesting raw PDFs, docx, and structured form submissions in under 350ms',
      'Dual-LLM consensus architecture utilizing Gemini API for ultra-fast document parsing and Claude API for qualitative reasoning',
      'Strict JSON schema validation enforcing standardized output payloads with zero hallucinations',
      'Human-in-the-loop gate allowing recruiters to approve high-stakes automated decisions before notification dispatch',
      'Automated multi-channel outbound notification dispatch via SendGrid and WhatsApp Business API',
    ],
    keyOutcomes: [
      'Eliminated 82% of manual resume review hours for high-volume hiring pipelines',
      'Achieved sub-2.4 second complete candidate parsing and rubric scoring turnaround',
      'Zero schema parsing drift across 1,000+ candidate document variations',
    ],
    systemFlow: [
      { step: '01. Ingestion', description: 'Webhook triggers pipeline on new candidate submission', tech: 'Webhooks / n8n' },
      { step: '02. Extraction', description: 'Unstructured text normalized and tokenized', tech: 'Gemini API / Python' },
      { step: '03. Rubric Scoring', description: 'Contextual evaluation against core job requirements', tech: 'Claude API (JSON Mode)' },
      { step: '04. HITL Approval', description: 'Flagged edge cases routed to human recruiter review', tech: 'Supabase UI Gate' },
      { step: '05. Dispatch', description: 'Personalized candidate feedback and database sync', tech: 'WhatsApp / PostgreSQL' },
    ],
  },
  {
    id: 'physio-tracker',
    title: 'Physiotherapist Healthcare Tracking Web Application',
    subtitle: 'Daily Patient Visit Management & Rehabilitation Telemetry Platform',
    category: 'Healthcare',
    featured: true,
    image: '/src/assets/images/project_physio_tracker_1793291885642.jpg',
    liveUrl: 'https://physiotherapyservice.netlify.app/',
    tags: ['React', 'TypeScript', 'HTML5/CSS3', 'Figma', 'GitHub', 'Netlify CI/CD'],
    summary:
      'A responsive healthcare service tracking platform featuring daily visit logging, patient scheduling, rehabilitation telemetry, and dynamic clinical reporting deployed with continuous automated CI/CD pipelines directly to Netlify edge servers.',
    description:
      'Designed and engineered a production-grade healthcare operations web app to solve scheduling frictions and treatment session tracking for practicing physiotherapists. Includes patient progress timelines, visit compliance monitoring, exercises prescribed, and dynamic PDF reporting.',
    architectureHighlights: [
      'Modular React 19 & TypeScript frontend with strict typing across patient records and exercise regimens',
      'Figma wireframed interface prioritizing rapid one-handed mobile clinician input during active sessions',
      'Automated continuous deployment (CI/CD) hooks from GitHub repository directly to Netlify edge infrastructure',
      'Client-side state hydration with offline recovery safeguards to prevent clinic data loss during connectivity dips',
    ],
    keyOutcomes: [
      'Live in active clinical operations at https://physiotherapyservice.netlify.app/',
      '100% responsive cross-platform layout optimized for both clinical iPads and clinic desktop monitors',
      'Zero downtime deployment history with automated GitHub Actions verification',
    ],
    systemFlow: [
      { step: '01. Auth & Clinic Intake', description: 'Clinician access with role-based session isolation', tech: 'TypeScript / React' },
      { step: '02. Session Logging', description: 'Real-time range-of-motion and exercise telemetry recording', tech: 'Dynamic State Store' },
      { step: '03. Treatment Plan', description: 'Prescription of targeted rehabilitation routines and follow-up intervals', tech: 'Clinical Schema' },
      { step: '04. Export & Audit', description: 'Patient-facing PDF summaries and clinical logs', tech: 'Netlify Edge' },
    ],
  },
  {
    id: 'air-pollution-tracker',
    title: 'Environmental Air Pollution Tracking Application',
    subtitle: 'Real-Time Global AQI Telemetry & Particulate Visualization',
    category: 'Environmental',
    featured: true,
    image: '/src/assets/images/project_air_pollution_1793291885760.jpg',
    liveUrl: 'https://airpollutiontracking.netlify.app',
    tags: ['JavaScript', 'C Programming Logic', 'OpenAQ REST API', 'Netlify', 'GitHub'],
    summary:
      'Real-time environmental data visualization web application fetching live Air Quality Index (AQI) metrics via REST APIs, leveraging algorithmic computational logic inspired by C programming for efficient data indexing and instant zero-downtime deployment.',
    description:
      'Built to democratize accessible public environmental health data. The application parses real-time sensor streams from OpenAQ and government sensor networks, normalizing varying sensor calibrations into standardized color-coded atmospheric risk levels.',
    architectureHighlights: [
      'High-throughput REST API integration with OpenAQ atmospheric monitoring endpoints',
      'Algorithmic computation and index mapping adapted from low-level C programming fundamentals for maximum speed',
      'Dynamic threshold calculation for PM2.5, PM10, NO2, and Ozone with instant visual alert states',
      'Lightweight vanilla JavaScript architecture delivering sub-100ms first contentful paint',
    ],
    keyOutcomes: [
      'Live in production at https://airpollutiontracking.netlify.app',
      'Instant geographic search across hundreds of international air quality stations',
      'Zero third-party framework overhead for ultra-low bandwidth mobile device compatibility',
    ],
    systemFlow: [
      { step: '01. Station Query', description: 'Geolocated REST request to public air quality sensors', tech: 'OpenAQ REST API' },
      { step: '02. Index Mapping', description: 'Particulate normalization using low-level C mathematical bounds', tech: 'C Logic / JS' },
      { step: '03. Risk Telemetry', description: 'Classification into Good, Moderate, Unhealthy, Hazardous tiers', tech: 'Tabular Data Engine' },
      { step: '04. Live Render', description: 'Immediate reactive gauge and trend updates', tech: 'Netlify Edge Host' },
    ],
  },
  {
    id: 'genai-knowledge-engine',
    title: 'Generative AI Knowledge Engine & Content Automation',
    subtitle: 'Zero-Hallucination Semantic Retrieval & Strategic Copy Drafting',
    category: 'Knowledge & RAG',
    featured: false,
    image: '/src/assets/images/project_recruitment_agent_1793291884409.jpg',
    tags: ['NotebookLM', 'Perplexity AI', 'Gemini API', 'Figma', 'Replit Cloud IDE'],
    summary:
      'Grounded semantic search systems built over complex operational manuals, client SLA documents, and content strategy guidelines, enabling instant zero-hallucination document querying and automated script/copy drafting.',
    description:
      'Designed specialized knowledge retrieval architecture combining NotebookLM document grounding with Perplexity and Gemini models. Enables enterprise team members to query internal operating procedures, client contracts, and complex manuals with verifiable citations.',
    architectureHighlights: [
      'Grounded RAG architecture pairing document source embeddings with strict citation generation',
      'Automated script and content drafting engine maintaining consistent brand voice across deliverables',
      'Multi-source ingestion accepting operational SOPs, legal SLA contracts, and technical schemas',
      'Rapid prototype-to-cloud deployment pipeline using Replit Cloud IDE and modern web interfaces',
    ],
    keyOutcomes: [
      'Reduced internal SOP search time from ~25 minutes to under 8 seconds per query',
      '100% traceable citations linking directly back to original document source paragraphs',
      'Integrated into daily content operations for client marketing and technical briefs',
    ],
    systemFlow: [
      { step: '01. Document Ingestion', description: 'PDF and docx manuals ingested and vector indexed', tech: 'NotebookLM / Gemini' },
      { step: '02. Semantic Grounding', description: 'Query matched against indexed operational corpus', tech: 'Perplexity / RAG' },
      { step: '03. Constrained Draft', description: 'Structured answer drafted strictly from cited paragraphs', tech: 'JSON Schema Validation' },
      { step: '04. Multi-Channel Output', description: 'Formatted briefs, marketing copy, and SOP checklists', tech: 'Replit Cloud' },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Agentic AI & LLM Orchestration',
    description: 'Autonomous multi-agent architectures, reasoning loops, and prompt schemas',
    skills: [
      { name: 'Agentic AI Systems', level: 'Expert', tools: ['LangGraph', 'LangChain', 'ReAct Patterns'] },
      { name: 'Multi-Agent Architecture', level: 'Expert', tools: ['Agent Coordination', 'Stateful Graphs'] },
      { name: 'Model Context Protocol (MCP)', level: 'Advanced', tools: ['Tool Use', 'Server Integration'] },
      { name: 'RAG & Retrieval Systems', level: 'Expert', tools: ['Vector Search', 'Document Chunking'] },
      { name: 'Prompt Engineering', level: 'Expert', tools: ['Few-Shot', 'JSON Schema Constraints', 'Chain-of-Thought'] },
    ],
  },
  {
    title: 'LLM & Generative AI Tools',
    description: 'Foundational model APIs, multimodal integrations, and specialized AI services',
    skills: [
      { name: 'Gemini API & Google AI Studio', level: 'Expert', tools: ['Gemini 2.5/3', 'Function Calling', 'Grounding'] },
      { name: 'Claude API (Anthropic)', level: 'Expert', tools: ['Claude 3.5 Sonnet', 'JSON Mode', 'Artifacts'] },
      { name: 'OpenAI API', level: 'Advanced', tools: ['GPT-4o', 'Structured Outputs', 'Assistants'] },
      { name: 'NotebookLM & Perplexity AI', level: 'Advanced', tools: ['Source Grounding', 'Deep Research'] },
      { name: 'ElevenLabs & Media APIs', level: 'Proficient', tools: ['Voice Synthesis', 'Audio Generation', 'Video API'] },
    ],
  },
  {
    title: 'Backend & Workflow Automation',
    description: 'High-throughput APIs, autonomous pipelines, and distributed event handlers',
    skills: [
      { name: 'n8n Workflow Pipelines', level: 'Expert', tools: ['Autonomous Workflows', 'Custom Nodes', 'Sub-flows'] },
      { name: 'Python & FastAPI', level: 'Expert', tools: ['Pydantic', 'AsyncIO', 'RESTful Endpoints'] },
      { name: 'Webhook Orchestration', level: 'Expert', tools: ['Payload Ingestion', 'Signature Verification'] },
      { name: 'Redis & Celery', level: 'Advanced', tools: ['Task Queues', 'Distributed Caching', 'Background Workers'] },
      { name: 'No-Code / Low-Code Tools', level: 'Expert', tools: ['Gumloop', 'Replit Agent', 'Automation Hubs'] },
    ],
  },
  {
    title: 'Frontend & UI/UX Design',
    description: 'Modern reactive web interfaces, responsive styling, and wireframed user journeys',
    skills: [
      { name: 'React.js & Next.js', level: 'Expert', tools: ['App Router', 'Hooks', 'Server Components'] },
      { name: 'TypeScript & JavaScript (ES6+)', level: 'Expert', tools: ['Strict Typing', 'Generics', 'Async Patterns'] },
      { name: 'Tailwind CSS', level: 'Expert', tools: ['Responsive Design', 'Custom Themes', 'Micro-Interactions'] },
      { name: 'Figma UI/UX Wireframing', level: 'Advanced', tools: ['Component Libraries', 'Prototypes', 'Design Systems'] },
      { name: 'Motion / Animations', level: 'Advanced', tools: ['Framer Motion', 'Interactive Micro-states'] },
    ],
  },
  {
    title: 'Databases & Cloud DevOps',
    description: 'Relational data stores, vector indexes, and zero-downtime deployment pipelines',
    skills: [
      { name: 'PostgreSQL & Supabase', level: 'Expert', tools: ['RLS Policies', 'Indexes', 'Schema Migrations'] },
      { name: 'Vector Databases', level: 'Advanced', tools: ['Embeddings', 'Cosine Similarity Search'] },
      { name: 'Docker Containerization', level: 'Advanced', tools: ['Multi-stage Builds', 'Docker Compose'] },
      { name: 'Cloud Platforms', level: 'Expert', tools: ['Netlify', 'Vercel', 'Replit Cloud'] },
      { name: 'Git & GitHub CI/CD', level: 'Expert', tools: ['Actions', 'Automated Testing', 'Edge Hooks'] },
    ],
  },
  {
    title: 'External APIs & Engineering Fundamentals',
    description: 'Third-party protocol integrations, media telemetry, and low-level computational logic',
    skills: [
      { name: 'OAuth 2.0 & Authentication', level: 'Expert', tools: ['JWT Tokens', 'Bearer Auth', 'Role Guards'] },
      { name: 'YouTube Data API', level: 'Advanced', tools: ['Upload Automation', 'Analytics Telemetry'] },
      { name: 'C Programming Fundamentals', level: 'Proficient', tools: ['Memory Architecture', 'Algorithmic Logic'] },
      { name: 'REST & GraphQL APIs', level: 'Expert', tools: ['OpenAPI Specs', 'Payload Optimization'] },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'shri-shyam',
    role: 'Director & AI Solutions / Full-Stack Developer',
    company: 'Shri Shyam Consulting',
    location: 'Durg, Chhattisgarh',
    period: '2022 – Present',
    type: 'Full-Time / Leadership',
    coreMetric: '82% Reduction in Document Processing Latency',
    highlights: [
      'Architect and deploy autonomous AI Agent Workflows and custom LLM applications using Python, FastAPI, and n8n to automate candidate evaluation, resume parsing, and document extraction.',
      'Integrate Google AI Studio (Gemini) and Claude APIs with custom system prompts and JSON schema constraints to reduce processing latency and eliminate LLM hallucinations.',
      'Design and build full-stack web and mobile applications utilizing React, Next.js, TypeScript, and Supabase/PostgreSQL, incorporating secure authentication and role-based permissions.',
      'Implement human-in-the-loop approval workflows and continuous deployment (CI/CD) pipelines via GitHub, Netlify, and Vercel with automated test verification.',
      'Spearhead technology initiatives for AI/ML and Robotics training programs, mentoring developers on LLM agent creation, prompt engineering, and modern web frameworks.',
    ],
    technologies: ['Agentic AI', 'Python', 'FastAPI', 'n8n', 'Gemini API', 'Claude API', 'React', 'TypeScript', 'Supabase', 'Netlify', 'Docker'],
  },
  {
    id: 'job-manifest',
    role: 'Senior HR & Systems Specialist',
    company: 'Job Manifest HR Consulting',
    location: 'India',
    period: '2018 – 2022',
    type: 'Full-Time (4 Years)',
    coreMetric: '4+ Years Directing Scalable Talent Operations',
    highlights: [
      'Directed end-to-end recruitment operations and client SLA agreements across corporate, IT, and specialized technical domains.',
      'Built structured candidate submission matrices, automated database tracking systems, and Boolean sourcing algorithms to streamline high-volume talent pipelines.',
      'Managed cross-functional client stakeholders, ensuring high conversion rates and strict compliance with operational frameworks.',
      'Identified repetitive operational bottlenecks that laid the foundational domain expertise for designing subsequent AI-powered recruitment agent pipelines.',
    ],
    technologies: ['Candidate Tracking Systems', 'Boolean Sourcing Algorithms', 'SLA Frameworks', 'Process Automation', 'Talent Analytics'],
  },
];

export const EDUCATION_AND_CERTS = {
  education: [
    {
      degree: "Bachelor's Degree (BA)",
      institution: 'University Degree Program',
      focus: 'Humanities, Analytical Communication & Strategic Systems',
    },
    {
      degree: 'Diploma in Electronics and Telecommunication',
      institution: 'Technical Polytechnic / Engineering Board',
      focus: 'Digital Electronics, Signal Processing, Telecommunication Networks, C Programming',
    },
  ],
  certifications: [
    {
      title: 'Agentic AI YUVA',
      issuer: 'Agentic AI & LLM Systems Certification',
      type: 'Autonomous Systems & Multi-Agent Orchestration',
      badgeCode: 'AG-YUVA-AI',
      description: 'Advanced accreditation covering multi-agent system design, LangGraph workflows, and autonomous tool use.',
    },
    {
      title: 'C Programming Language Certification',
      issuer: 'Computer Science & Software Foundation',
      type: 'Core Systems & Algorithmic Logic',
      badgeCode: 'CS-PROG-C',
      description: 'Rigorous certification in foundational memory management, pointer arithmetic, and algorithmic optimization.',
    },
    {
      title: "NCC Cadet 'C' Certificate",
      issuer: 'National Cadet Corps (NCC)',
      type: 'Leadership, Discipline & Strategic Operations',
      badgeCode: 'NCC-CERT-C',
      description: 'The highest certificate in NCC, demonstrating exceptional leadership, operational discipline, and civic excellence.',
    },
    {
      title: 'Cloud Computing Fundamentals',
      issuer: 'Cloud Architecture & DevOps Systems',
      type: 'Cloud Infrastructure & Deployments',
      badgeCode: 'CLOUD-FND-OPS',
      description: 'Comprehensive mastery of containerized deployment, microservice architectures, and CI/CD pipelines.',
    },
  ],
};
