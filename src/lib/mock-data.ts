export interface Founder {
  name: string;
  title: string;
  avatar: string;
}

export interface MockRisk {
  id: string;
  startupId: string;
  protocolRobustness: number;
  liquidityCrunch: string | null;
  regulatoryPivot: string | null;
  ipOverlapAlert: string | null;
  auditedBy: string | null;
  auditDate: string | null;
}

export interface MockSignal {
  id: string;
  startupId: string;
  source: "GITHUB" | "HN" | "GOOGLE_TRENDS" | "PRODUCT_HUNT" | "YC";
  title: string;
  description: string;
  score: number;
  timestamp: Date;
}

export interface MockStartup {
  id: string;
  name: string;
  description: string;
  logoUrl: string | null;
  sector: string;
  stage: string;
  valuation: number;
  funding: number;
  website: string;
  location: string;
  founders: Founder[];
  githubStars: number;
  githubStarsWk: number;
  hnMentionsWk: number;
  productHuntRank: number;
  trendsScore: number;
  momentumScore: number;
  momentumStatus: "STRONG" | "STABLE" | "DECAY" | "NEUTRAL";
  createdAt: Date;
  updatedAt: Date;
  signals: MockSignal[];
  saved: boolean;
  riskAssessment: MockRisk | null;
}

export let MOCK_STARTUPS: MockStartup[] = [
  {
    id: "nebula-labs-uuid-1111",
    name: "Nebula Labs",
    description: "Decoupling compute from centralized hyper-scalers via a peer-to-peer latent GPU network. Nebula's orchestration layer reduces training costs by 70% with a proprietary proof-of-compute consensus.",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2FT9vB0ryOCGN6zPeaxTXEdBPARWN_JIUkkHBDltfzLI7d2QnD0U5kx3WquZvxpnTBTvWoArOsqUnHHd9Tly2UwZ3Ri3rkQxIjj9eZE7bW2E2MI68tP_zvfU5NJNAx1trXfJJ78M3gtLKVoDanNcfoYHBcfJ67fS5UtzsFhWJ59ATFMTWI5Z0ZdCv60CQvpw-xBA39mRkznFcCSEBL4iP1DBwtVT9_ZmeSIAAHiLN5_nvfZ4TLs9aD0mc3QFIySx7e8WDgDtgaA",
    sector: "Distributed Cloud Computing",
    stage: "SERIES B",
    valuation: 420.0,
    funding: 68.5,
    website: "https://nebula.network",
    location: "San Francisco, CA",
    founders: [
      { name: "Dr. Aris Thorne", title: "Ex-DeepMind, MIT PhD", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Ovqpxs43VmOvbshoSvyt7Onnth0A4BIi7aYrFqCuhMzdBfAI9wmV9-cr24Me_RTHxu-S-ymnsQbiqhxpERYPNdHrkApmRzCNbHJSui4p6NcKljbWhuW2TfU4xWy0r1uniuv0e21xPrRAeZXM6rcQ9RNU05SHG0-edGNSeOyjXdU66RXlaWqGVPhXBDbhSBk-EAtbO9GzUwyXqNc7GqbFKdgrDUKVPr0DyeHMr4Jx51cCcEcdOC3RLp-zvp6IDlCT9Hiu7disVA" },
      { name: "Sarah Jenkins", title: "Ex-Stripe Engineering", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtvHG6jAd8M5WERPAC2RFqVIYvr1yn_RjIrjOgRhwRTyRqDYdS109_ZaearEpusSNVxfFHQ6A1spCcyVUKNV46zfHRDYxnMJXjzehLtAzs-CPvoWw3XQyVASqEP9DBM8ZRPOI2EQxVjRDO7XwM94cIdf0s4tCKx7DymBdWcZW5WD5wy94uFDLpKkzT5IySb-tTFIP9atOJMgptjTAL4pxIC-xQLMbyS6Bqhhl6hSe9CZQ_I6VLdCrdx1pBAgOtwcoEmbSBHID2lg" }
    ],
    githubStars: 18400,
    githubStarsWk: 1200,
    hnMentionsWk: 45,
    productHuntRank: 2,
    trendsScore: 94.2,
    momentumScore: 94.2,
    momentumStatus: "STRONG",
    saved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    riskAssessment: {
      id: "nebula-risk-uuid",
      startupId: "nebula-labs-uuid-1111",
      protocolRobustness: 98,
      liquidityCrunch: null,
      regulatoryPivot: "EU GenAI Act phase 3 implementation accelerating. Risk parity shifting.",
      ipOverlapAlert: "Quantum-Safe cryptography patent filings showing 85% overlap with NIST standards.",
      auditedBy: "Trail of Bits",
      auditDate: "FEB 2024"
    },
    signals: [
      { id: "nebula-sig-1", startupId: "nebula-labs-uuid-1111", source: "GITHUB", title: "GitHub Intel Star velocity +400%", description: "Nebula core-js library star velocity surged on release of the edge client.", score: 95.0, timestamp: new Date(Date.now() - 14 * 60000) },
      { id: "nebula-sig-2", startupId: "nebula-labs-uuid-1111", source: "HN", title: "Show HN: Nebula Latent GPU client", description: "Reached #1 position on Hacker News front page, generating 842 points and 140 comments.", score: 92.0, timestamp: new Date(Date.now() - 8 * 3600000) },
      { id: "nebula-sig-3", startupId: "nebula-labs-uuid-1111", source: "GOOGLE_TRENDS", title: "Explosive interest in 'Decentralized GPU Network'", description: "Search query volume in North America and Western Europe up 320% weekly.", score: 88.0, timestamp: new Date(Date.now() - 18 * 3600000) }
    ]
  },
  {
    id: "lumina-ai-uuid-2222",
    name: "Lumina AI",
    description: "Decentralized training protocol for edge devices. Running models locally through model pruning and split-learning networks.",
    logoUrl: null,
    sector: "Generative AI Infra",
    stage: "SEED",
    valuation: 24.5,
    funding: 4.2,
    website: "https://lumina.ai",
    location: "New York, NY",
    founders: [
      { name: "Marcus Chen", title: "Ex-OpenAI Core", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Ovqpxs43VmOvbshoSvyt7Onnth0A4BIi7aYrFqCuhMzdBfAI9wmV9-cr24Me_RTHxu-S-ymnsQbiqhxpERYPNdHrkApmRzCNbHJSui4p6NcKljbWhuW2TfU4xWy0r1uniuv0e21xPrRAeZXM6rcQ9RNU05SHG0-edGNSeOyjXdU66RXlaWqGVPhXBDbhSBk-EAtbO9GzUwyXqNc7GqbFKdgrDUKVPr0DyeHMr4Jx51cCcEcdOC3RLp-zvp6IDlCT9Hiu7disVA" }
    ],
    githubStars: 8200,
    githubStarsWk: 2400,
    hnMentionsWk: 72,
    productHuntRank: 1,
    trendsScore: 98.4,
    momentumScore: 98.4,
    momentumStatus: "STRONG",
    saved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    riskAssessment: {
      id: "lumina-risk-uuid",
      startupId: "lumina-ai-uuid-2222",
      protocolRobustness: 92,
      liquidityCrunch: null,
      regulatoryPivot: null,
      ipOverlapAlert: null,
      auditedBy: "Quantstamp",
      auditDate: "APR 2026"
    },
    signals: [
      { id: "lumina-sig-1", startupId: "lumina-ai-uuid-2222", source: "GITHUB", title: "Star Velocity +600% on Core Repo", description: "Lumina-Core-JS repo starred by major open source AI contributors.", score: 99.0, timestamp: new Date(Date.now() - 5 * 60000) },
      { id: "lumina-sig-2", startupId: "lumina-ai-uuid-2222", source: "PRODUCT_HUNT", title: "Product of the Day #1", description: "Trending at #1 with massive developer signups.", score: 98.0, timestamp: new Date(Date.now() - 3 * 3600000) }
    ]
  },
  {
    id: "velox-bio-uuid-3333",
    name: "Velox Bio",
    description: "Computational drug design using diffusion models to map molecular foldings. Custom therapeutics targeting rare autoimmune mutations.",
    logoUrl: null,
    sector: "Bio-Longevity",
    stage: "SERIES A",
    valuation: 85.0,
    funding: 18.0,
    website: "https://velox.bio",
    location: "Boston, MA",
    founders: [
      { name: "Dr. Clara Harris", title: "Harvard MD/PhD", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtvHG6jAd8M5WERPAC2RFqVIYvr1yn_RjIrjOgRhwRTyRqDYdS109_ZaearEpusSNVxfFHQ6A1spCcyVUKNV46zfHRDYxnMJXjzehLtAzs-CPvoWw3XQyVASqEP9DBM8ZRPOI2EQxVjRDO7XwM94cIdf0s4tCKx7DymBdWcZW5WD5wy94uFDLpKkzT5IySb-tTFIP9atOJMgptjTAL4pxIC-xQLMbyS6Bqhhl6hSe9CZQ_I6VLdCrdx1pBAgOtwcoEmbSBHID2lg" }
    ],
    githubStars: 430,
    githubStarsWk: 12,
    hnMentionsWk: 19,
    productHuntRank: 12,
    trendsScore: 65.2,
    momentumScore: 86.1,
    momentumStatus: "STABLE",
    saved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    riskAssessment: {
      id: "velox-risk-uuid",
      startupId: "velox-bio-uuid-3333",
      protocolRobustness: 85,
      liquidityCrunch: "Series A extension round delayed due to FDA panel review rescheduling.",
      regulatoryPivot: "FDA tightening guidelines on AI-designed molecules.",
      ipOverlapAlert: null,
      auditedBy: "BioSecurity Labs",
      auditDate: "OCT 2025"
    },
    signals: [
      { id: "velox-sig-1", startupId: "velox-bio-uuid-3333", source: "HN", title: "Show HN: Diffusion-Fold open source model", description: "Trending for 12 hours with deep chemical engineering comments.", score: 87.0, timestamp: new Date(Date.now() - 24 * 3600000) }
    ]
  },
  {
    id: "nexus-ops-uuid-4444",
    name: "Nexus Ops",
    description: "WebAssembly-based infrastructure orchestrator. Blazing fast serverless cold starts (< 1ms) with full isolation security profiles.",
    logoUrl: null,
    sector: "DevTools",
    stage: "SEED",
    valuation: 12.0,
    funding: 2.1,
    website: "https://nexusops.dev",
    location: "Austin, TX",
    founders: [
      { name: "Jin-Woo Park", title: "Ex-Vercel Core Eng", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Ovqpxs43VmOvbshoSvyt7Onnth0A4BIi7aYrFqCuhMzdBfAI9wmV9-cr24Me_RTHxu-S-ymnsQbiqhxpERYPNdHrkApmRzCNbHJSui4p6NcKljbWhuW2TfU4xWy0r1uniuv0e21xPrRAeZXM6rcQ9RNU05SHG0-edGNSeOyjXdU66RESTORED-dGNSeOyjXdU66RXlaWqGVPhXBDbhSBk-EAtbO9GzUwyXqNc7GqbFKdgrDUKVPr0DyeHMr4Jx51cCcEcdOC3RLp-zvp6IDlCT9Hiu7disVA" }
    ],
    githubStars: 4200,
    githubStarsWk: 110,
    hnMentionsWk: 8,
    productHuntRank: 4,
    trendsScore: 54.0,
    momentumScore: 72.8,
    momentumStatus: "DECAY",
    saved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    riskAssessment: {
      id: "nexus-risk-uuid",
      startupId: "nexus-ops-uuid-4444",
      protocolRobustness: 90,
      liquidityCrunch: "Runway under 6 months; bridge round required by Q3.",
      regulatoryPivot: null,
      ipOverlapAlert: null,
      auditedBy: "SecOps Group",
      auditDate: "JAN 2026"
    },
    signals: [
      { id: "nexus-sig-1", startupId: "nexus-ops-uuid-4444", source: "GITHUB", title: "Commit velocity dropped -40%", description: "Activity core branch decreased due to focus on enterprise sales docs.", score: 60.0, timestamp: new Date(Date.now() - 3 * 86400000) }
    ]
  },
  {
    id: "solaris-grid-uuid-5555",
    name: "Solaris Grid",
    description: "Decentralized consensus protocol to load-balance solar and battery grids in local communities. Real-time arbitrage of household electricity production.",
    logoUrl: null,
    sector: "CleanTech",
    stage: "SEED",
    valuation: 9.5,
    funding: 1.8,
    website: "https://solarisgrid.io",
    location: "Berlin, Germany",
    founders: [
      { name: "Laura Schmidt", title: "Ex-Siemens Smart Grid Lead", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtvHG6jAd8M5WERPAC2RFqVIYvr1yn_RjIrjOgRhwRTyRqDYdS109_ZaearEpusSNVxfFHQ6A1spCcyVUKNV46zfHRDYxnMJXjzehLtAzs-CPvoWw3XQyVASqEP9DBM8ZRPOI2EQxVjRDO7XwM94cIdf0s4tCKx7DymBdWcZW5WD5wy94uFDLpKkzT5IySb-tTFIP9atOJMgptjTAL4pxIC-xQLMbyS6Bqhhl6hSe9CZQ_I6VLdCrdx1pBAgOtwcoEmbSBHID2lg" }
    ],
    githubStars: 1200,
    githubStarsWk: 50,
    hnMentionsWk: 12,
    productHuntRank: 8,
    trendsScore: 68.5,
    momentumScore: 68.5,
    momentumStatus: "NEUTRAL",
    saved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    riskAssessment: {
      id: "solaris-risk-uuid",
      startupId: "solaris-grid-uuid-5555",
      protocolRobustness: 78,
      liquidityCrunch: null,
      regulatoryPivot: "German energy grid provider registration takes up to 9 months.",
      ipOverlapAlert: "IP audit shows overlap with public battery management patents.",
      auditedBy: "TUV Sud",
      auditDate: "NOV 2025"
    },
    signals: [
      { id: "solaris-sig-1", startupId: "solaris-grid-uuid-5555", source: "GOOGLE_TRENDS", title: "Interest in 'Smart Grid Arbitrage' +200%", description: "Increasing search demand aligned with seasonal electricity pricing peaks.", score: 72.0, timestamp: new Date(Date.now() - 5 * 86400000) }
    ]
  },
  {
    id: "vector-flow-uuid-6666",
    name: "VectorFlow",
    description: "High-performance semantic pipeline that feeds real-time data to RAG clusters. Connectors for all corporate datastores built with security compliance filters.",
    logoUrl: null,
    sector: "Productivity",
    stage: "SERIES A",
    valuation: 110.0,
    funding: 22.0,
    website: "https://vectorflow.com",
    location: "Seattle, WA",
    founders: [
      { name: "David Miller", title: "Ex-Elasticsearch Engineer", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Ovqpxs43VmOvbshoSvyt7Onnth0A4BIi7aYrFqCuhMzdBfAI9wmV9-cr24Me_RTHxu-S-ymnsQbiqhxpERYPNdHrkApmRzCNbHJSui4p6NcKljbWhuW2TfU4xWy0r1uniuv0e21xPrRAeZXM6rcQ9RNU05SHG0-edGNSeOyjXdU66RXlaWqGVPhXBDbhSBk-EAtbO9GzUwyXqNc7GqbFKdgrDUKVPr0DyeHMr4Jx51cCcEcdOC3RLp-zvp6IDlCT9Hiu7disVA" }
    ],
    githubStars: 11200,
    githubStarsWk: 950,
    hnMentionsWk: 24,
    productHuntRank: 1,
    trendsScore: 82.3,
    momentumScore: 91.5,
    momentumStatus: "STRONG",
    saved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    riskAssessment: {
      id: "vectorflow-risk-uuid",
      startupId: "vector-flow-uuid-6666",
      protocolRobustness: 95,
      liquidityCrunch: null,
      regulatoryPivot: null,
      ipOverlapAlert: null,
      auditedBy: "NCC Group",
      auditDate: "MAR 2026"
    },
    signals: [
      { id: "vectorflow-sig-1", startupId: "vector-flow-uuid-6666", source: "PRODUCT_HUNT", title: "Product of the Day #1", description: "Launched with record-breaking upvotes and 14 enterprise trials.", score: 94.0, timestamp: new Date(Date.now() - 1 * 3600000) }
    ]
  },
  {
    id: "aetheric-ai-uuid-7777",
    name: "Aetheric AI",
    description: "Decentralized healthcare training platform. Clinicians supply anonymized diagnostics to build robust global oncology predictors using zero-knowledge validation.",
    logoUrl: null,
    sector: "HealthTech",
    stage: "SEED",
    valuation: 18.0,
    funding: 3.5,
    website: "https://aetheric.ai",
    location: "London, UK",
    founders: [
      { name: "Dr. Evelyn Vane", title: "Ex-EHR Architect", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtvHG6jAd8M5WERPAC2RFqVIYvr1yn_RjIrjOgRhwRTyRqDYdS109_ZaearEpusSNVxfFHQ6A1spCcyVUKNV46zfHRDYxnMJXjzehLtAzs-CPvoWw3XQyVASqEP9DBM8ZRPOI2EQxVjRDO7XwM94cIdf0s4tCKx7DymBdWcZW5WD5wy94uFDLpKkzT5IySb-tTFIP9atOJMgptjTAL4pxIC-xQLMbyS6Bqhhl6hSe9CZQ_I6VLdCrdx1pBAgOtwcoEmbSBHID2lg" }
    ],
    githubStars: 3100,
    githubStarsWk: 840,
    hnMentionsWk: 38,
    productHuntRank: 5,
    trendsScore: 78.4,
    momentumScore: 82.1,
    momentumStatus: "STRONG",
    saved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    riskAssessment: {
      id: "aetheric-risk-uuid",
      startupId: "aetheric-ai-uuid-7777",
      protocolRobustness: 91,
      liquidityCrunch: null,
      regulatoryPivot: "HIPAA and GDPR compliance certified.",
      ipOverlapAlert: null,
      auditedBy: "PwC Health Audit",
      auditDate: "DEC 2025"
    },
    signals: [
      { id: "aetheric-sig-1", startupId: "aetheric-ai-uuid-7777", source: "HN", title: "Decentralized Oncology Predictor", description: "Clinicians globally validation and federated learning setup.", score: 85.0, timestamp: new Date(Date.now() - 42 * 60000) }
    ]
  }
];

export function getMockStartups() {
  return [...MOCK_STARTUPS];
}

export function getMockStartupById(id: string) {
  return MOCK_STARTUPS.find((s) => s.id === id) || null;
}

export function searchMockStartups(query: string) {
  const q = query.toLowerCase();
  return MOCK_STARTUPS.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.sector.toLowerCase().includes(q)
  );
}

export function toggleSaveMockStartup(id: string) {
  const startup = MOCK_STARTUPS.find((s) => s.id === id);
  if (startup) {
    startup.saved = !startup.saved;
    return startup;
  }
  return null;
}
