import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle, ShieldCheck, Database, Cpu, MessageSquare, ArrowRight, Activity, Terminal } from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  orchestrator: string;
  models: string;
  inputPayload: Record<string, any>;
  nodes: {
    id: string;
    label: string;
    role: string;
    engine: string;
  }[];
  expectedResult: {
    score: number;
    matchTier: string;
    reasoning: string;
    schemaValid: boolean;
    dispatchStatus: string;
  };
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'recruitment',
    name: 'Agentic Candidate Screening (n8n + Claude + Gemini)',
    description: 'Autonomous multi-step pipeline parsing incoming resume payloads, verifying credentials against role requirements, and triggering human approval.',
    orchestrator: 'n8n Workflow & Webhooks',
    models: 'Gemini Pro (Extraction) + Claude 3.5 (Evaluation)',
    inputPayload: {
      applicant: 'Aarav Sharma',
      targetRole: 'Senior Full-Stack AI Engineer',
      yearsExperience: 6.5,
      skills: ['Python', 'FastAPI', 'LangGraph', 'Docker', 'PostgreSQL'],
      submissionSource: 'Webhook / Inbound Career Portal',
    },
    nodes: [
      { id: 'n1', label: 'Inbound Webhook', role: 'Ingestion & Signature Verify', engine: 'n8n HTTP Webhook' },
      { id: 'n2', label: 'Document Parser', role: 'Extraction & Schema Parsing', engine: 'Gemini API (320ms)' },
      { id: 'n3', label: 'Rubric Evaluator', role: 'Qualitative Fit & JSON Validation', engine: 'Claude 3.5 Sonnet' },
      { id: 'n4', label: 'Human Review Gate', role: 'Human-in-the-Loop Approval', engine: 'Supabase UI Gate' },
      { id: 'n5', label: 'Automated Dispatch', role: 'WhatsApp / Email & DB Commit', engine: 'SendGrid & PostgreSQL' },
    ],
    expectedResult: {
      score: 94,
      matchTier: 'Tier 1 Strong Candidate',
      reasoning: 'Demonstrated direct mastery in LangGraph graph state manipulation and FastAPI async microservices matching 100% of core job criteria.',
      schemaValid: true,
      dispatchStatus: 'WhatsApp message & interview calendar dispatched',
    },
  },
  {
    id: 'healthcare',
    name: 'Healthcare Visit & Rehabilitation Telemetry (PhysioTracker)',
    description: 'Clinical data pipeline capturing patient mobility progress, flagging outlier recovery pain levels, and notifying practicing physiotherapists.',
    orchestrator: 'React State + Netlify Edge Functions',
    models: 'Algorithmic Threshold Rule Engine + Gemini Audit',
    inputPayload: {
      patientId: 'PT-9042',
      sessionType: 'Post-Op Knee ACL Rehabilitation (Week 6)',
      rangeOfMotionDeg: 118,
      baselineTargetDeg: 110,
      reportedPainScore: 2,
    },
    nodes: [
      { id: 'n1', label: 'Session Intake', role: 'Clinician Tablet Input', engine: 'PhysioTracker Web App' },
      { id: 'n2', label: 'Range Telemetry', role: 'Biomechanical Normalization', engine: 'TypeScript Core Engine' },
      { id: 'n3', label: 'Compliance Audit', role: 'Recovery Milestone Check', engine: 'Clinical Rules Schema' },
      { id: 'n4', label: 'Clinician Gate', role: 'Exercise Protocol Sign-off', engine: 'Physiotherapist Portal' },
      { id: 'n5', label: 'Patient Portal', role: 'Home Regimen Update', engine: 'Netlify Edge Synced' },
    ],
    expectedResult: {
      score: 98,
      matchTier: 'Ahead of Recovery Schedule',
      reasoning: 'Active flexion angle exceeded milestone target by 8° with nominal pain index under 3/10.',
      schemaValid: true,
      dispatchStatus: 'Updated home rehabilitation exercises synced to patient card',
    },
  },
  {
    id: 'environmental',
    name: 'Real-Time Air Pollution Surge Monitor (AQI Tracking)',
    description: 'High-throughput environmental ingest processing OpenAQ sensor feeds using low-level C logic calculations for instant anomaly detection.',
    orchestrator: 'OpenAQ REST Stream + Algorithmic Ingest',
    models: 'C-inspired Mathematical Indexer',
    inputPayload: {
      stationId: 'DELHI-CENTRAL-01',
      parameter: 'PM2.5 / PM10',
      observedReading: '184 ug/m3',
      windSpeed: '4.2 km/h',
    },
    nodes: [
      { id: 'n1', label: 'Station Sensor', role: 'Pollution Stream Query', engine: 'OpenAQ REST API' },
      { id: 'n2', label: 'Index Computation', role: 'Sub-millisecond Math Bounds', engine: 'C-Logic Algorithm' },
      { id: 'n3', label: 'Risk Categorization', role: 'Standardized EPA AQI Bucket', engine: 'Deterministic Parser' },
      { id: 'n4', label: 'Threshold Gate', role: 'Hazard Spike Verification', engine: 'Automated Rule Sensor' },
      { id: 'n5', label: 'Live Map Render', role: 'Zero-Downtime Viewport Push', engine: 'Netlify Static Edge' },
    ],
    expectedResult: {
      score: 88,
      matchTier: 'Hazardous Atmospheric Alert',
      reasoning: 'PM2.5 concentration spiked 2.4x above daily baseline within 45-minute rolling window.',
      schemaValid: true,
      dispatchStatus: 'Public advisory rendered & regional telemetry graph updated',
    },
  },
];

export const AgentWorkflowSimulator: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState('recruitment');
  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1);
  const [completed, setCompleted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [humanApprovalState, setHumanApprovalState] = useState<'pending' | 'approved'>('pending');

  const currentScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  // Reset state when scenario changes
  const selectScenario = (id: string) => {
    setActiveScenarioId(id);
    setIsRunning(false);
    setActiveNodeIndex(-1);
    setCompleted(false);
    setHumanApprovalState('pending');
    setLogs([
      `[Pipeline Initialized] Loaded scenario: "${SCENARIOS.find((s) => s.id === id)?.name}"`,
      `[Ready] Orchestrator: ${SCENARIOS.find((s) => s.id === id)?.orchestrator}`,
    ]);
  };

  useEffect(() => {
    setLogs([
      `[Pipeline Initialized] Loaded scenario: "${currentScenario.name}"`,
      `[Ready] Orchestrator: ${currentScenario.orchestrator}`,
    ]);
  }, []);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCompleted(false);
    setActiveNodeIndex(0);
    setHumanApprovalState('pending');
    setLogs([
      `[T+0ms] Ingesting webhook payload from source: ${currentScenario.inputPayload.submissionSource || currentScenario.inputPayload.stationId || 'Client'}`,
      `[T+120ms] Node 1 (${currentScenario.nodes[0].label}) payload verified with HMAC token`,
    ]);

    // Step 2
    setTimeout(() => {
      setActiveNodeIndex(1);
      setLogs((prev) => [
        ...prev,
        `[T+340ms] Node 2 (${currentScenario.nodes[1].label}) activated. Extracting parameters via ${currentScenario.nodes[1].engine}...`,
        `[T+420ms] Extracted key data points into normalized JSON schema`,
      ]);
    }, 900);

    // Step 3
    setTimeout(() => {
      setActiveNodeIndex(2);
      setLogs((prev) => [
        ...prev,
        `[T+1100ms] Node 3 (${currentScenario.nodes[2].label}) evaluating against context rubric...`,
        `[T+1450ms] Schema validation passed: 100% compliant with zero hallucinations`,
      ]);
    }, 1800);

    // Step 4 (Human-in-the-loop gate)
    setTimeout(() => {
      setActiveNodeIndex(3);
      setHumanApprovalState('approved');
      setLogs((prev) => [
        ...prev,
        `[T+2100ms] Node 4 (${currentScenario.nodes[3].label}): Human-in-the-loop audit gate reached`,
        `[T+2300ms] Human reviewer sign-off confirmed [Automated Bypass Approved]`,
      ]);
    }, 2800);

    // Step 5 (Final dispatch)
    setTimeout(() => {
      setActiveNodeIndex(4);
      setCompleted(true);
      setIsRunning(false);
      setLogs((prev) => [
        ...prev,
        `[T+2900ms] Node 5 (${currentScenario.nodes[4].label}) executing outbound dispatch...`,
        `[T+3100ms] Success: ${currentScenario.expectedResult.dispatchStatus}`,
        `[T+3120ms] Audit record committed to Supabase/PostgreSQL. Pipeline execution complete.`,
      ]);
    }, 3800);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setActiveNodeIndex(-1);
    setCompleted(false);
    setHumanApprovalState('pending');
    setLogs([
      `[Pipeline Reset] Orchestrator: ${currentScenario.orchestrator}`,
      `[Ready] Click "Execute Simulation" to run live pipeline.`,
    ]);
  };

  return (
    <section id="pipeline" className="py-16 lg:py-24 border-t border-slate-800/80 bg-[#060910]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono text-emerald-400">
            <span>02. Agentic Architecture & Orchestration</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Autonomous Multi-Agent Workflow Engine
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Test how I architect autonomous multi-agent pipelines with n8n, Claude, Gemini API, and PostgreSQL. Every workflow incorporates deterministic JSON schemas, low-latency execution, and human-in-the-loop governance to eliminate hallucinations.
          </p>
        </div>

        {/* Interactive Scenario Selector */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl">
          {SCENARIOS.map((sc) => {
            const isSelected = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => selectScenario(sc.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all text-left whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-800 text-sky-400 border border-sky-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Activity className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{sc.name}</span>
              </button>
            );
          })}
        </div>

        {/* Scenario Overview Details Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block mb-1">Architecture & Orchestration:</span>
            <span className="text-white font-medium">{currentScenario.orchestrator}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-1">LLMs & Tooling:</span>
            <span className="text-sky-300 font-medium">{currentScenario.models}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-1">Safety & Governance:</span>
            <span className="text-emerald-400 font-medium">Strict JSON Schema + Human Gate</span>
          </div>
        </div>

        {/* The Visual Node Flow Diagram */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Live Pipeline Nodes ({currentScenario.nodes.length} Stages)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={resetSimulation}
                disabled={isRunning}
                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-sky-400 hover:from-emerald-300 hover:to-sky-300 rounded-lg transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Processing...' : 'Execute Simulation'}</span>
              </button>
            </div>
          </div>

          {/* Connected Node Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {currentScenario.nodes.map((node, index) => {
              const isActive = activeNodeIndex === index;
              const isPast = activeNodeIndex > index || completed;

              return (
                <div
                  key={node.id}
                  className={`relative p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-sky-950/40 border-sky-400 shadow-lg shadow-sky-500/10 scale-[1.02]'
                      : isPast
                      ? 'bg-slate-900/90 border-emerald-500/50 text-slate-200'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      Step 0{index + 1}
                    </span>
                    {isPast ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : isActive ? (
                      <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-white tracking-tight mb-1">
                    {node.label}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-2">
                    {node.role}
                  </p>
                  <div className="pt-2 border-t border-slate-800/70 text-[11px] font-mono text-sky-400 truncate">
                    {node.engine}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Output Split: Inbound Payload & Live Execution Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Input Payload & Evaluated Verdict (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Input Payload box */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Inbound Pipeline Payload</span>
                <span className="font-mono text-slate-400 text-[11px]">JSON Schema Verified</span>
              </div>
              <pre className="p-3 rounded-lg bg-black/60 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
                {JSON.stringify(currentScenario.inputPayload, null, 2)}
              </pre>
            </div>

            {/* Evaluated Result Card */}
            <div className={`p-4 rounded-xl border transition-all ${
              completed
                ? 'bg-slate-900/90 border-emerald-500/40 shadow-md'
                : 'bg-slate-900/30 border-slate-800/70 opacity-80'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">Structured Output & Verdict</span>
                {completed ? (
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    Score: {currentScenario.expectedResult.score}/100
                  </span>
                ) : (
                  <span className="text-xs font-mono text-slate-500">Awaiting Run</span>
                )}
              </div>

              {completed ? (
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                    <strong className="block text-white mb-0.5">{currentScenario.expectedResult.matchTier}</strong>
                    {currentScenario.expectedResult.reasoning}
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5 text-sky-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Zero Schema Drift
                    </span>
                    <span className="text-slate-300">
                      Status: {humanApprovalState === 'approved' ? 'Dispatched' : 'Pending Gate'}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic py-2">
                  Execute simulation to parse unstructured inputs and view real-time LLM validation.
                </p>
              )}
            </div>

          </div>

          {/* Right: Real-time Terminal Log (7 cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-xl bg-black border border-slate-800 overflow-hidden">
            <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-slate-200">
                  agent_execution_runtime.log
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {isRunning ? 'Processing Stream' : completed ? 'Process Succeeded' : 'Idle'}
              </span>
            </div>

            <div className="p-4 flex-1 font-mono text-[11px] sm:text-xs text-slate-300 space-y-1.5 overflow-y-auto max-h-[340px] bg-black/90">
              {logs.map((log, i) => {
                const isSuccess = log.includes('Success') || log.includes('passed');
                const isNode = log.includes('Node ');
                return (
                  <div
                    key={i}
                    className={`leading-relaxed ${
                      isSuccess
                        ? 'text-emerald-400'
                        : isNode
                        ? 'text-sky-300'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
              {isRunning && (
                <div className="text-sky-400 animate-pulse">
                  &gt; Ingesting next telemetry stream...
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
