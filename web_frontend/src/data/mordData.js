// MORD (Ministry of Rural Development) National Supervisory Mock Data Store
// Connects and aggregates underlying projects from stateMockData, collectorMockData, and proposingMockData
// Operates as the apex supervisory authority above the SWADESH ecosystem

import { stateProjectsMasterList, stateDistrictSummary } from './stateMockData';
import { collectorProjectsMasterList, collectorTalukasProgress } from './collectorMockData';
import { initialProposingProjects } from './proposingMockData';
import { initialProjects } from './mockData';

// 1. MORD APEX SUPERVISORY OFFICER PROFILE
export const mordOfficerProfile = {
  name: "Shri Shailesh Kumar Singh, IAS",
  designation: "Secretary to Government of India",
  role: "National Supervisory Authority",
  id: "MORD-SEC-DELHI-001",
  cadre: "IAS 1991 Batch",
  ministry: "Ministry of Rural Development (MoRD)",
  department: "Department of Land Resources (DoLR)",
  officeAddress: "Room 101, Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi — 110001",
  email: "secy-dolr@nic.in",
  phone: "+91 11 2338 2237",
  digitalSignStatus: "Valid (Class-3 DSC Active)",
  signCertIssuer: "eMudhra Sub-CA 2026 (Govt of India)",
  certSerial: "DSC-GOI-MORD-2026-001",
  jurisdiction: "All States & Union Territories of India"
};

// 2. NATIONAL LEVEL STAGE FLOW SUMMARY
export const nationalStageFlow = [
  { stage: "PROPOSED", count: 128, label: "Proposals Submitted", desc: "Under initial scrutiny & feasibility review" },
  { stage: "APPROVED", count: 104, label: "Statutory Approvals", desc: "Section 4 / SIA Sanctioned by State Authority" },
  { stage: "WORK / IMPLEMENTATION", count: 82, label: "Ground Implementation", desc: "Surveys, Sec 11 Notifications & Objections" },
  { stage: "LAND ACQUIRED", count: 61, label: "Acquisition Finalized", desc: "Awards declared, PFMS payment & R&R ongoing" },
  { stage: "COMPLETED", count: 37, label: "Projects Completed", desc: "Full possession & mutation registered in revenue records" }
];

export const nationalLandSummary = {
  totalLandRequiredHa: 38420.5,
  totalLandAcquiredHa: 23650.0,
  acquisitionPercentage: 61.5,
  forestAndTribalLandHa: 7460.0,
  forestLandHa: 4520.0,
  tribalLandHa: 2940.0,
  totalEstimatedCompensation: "₹ 54,820.00 Cr",
  totalDisbursedCompensation: "₹ 34,110.00 Cr",
  disbursementPercentage: 62.2,
  rfctlarrCompliancePct: 88.4,
  totalAffectedFamilies: 84320,
  tribalFamiliesAffected: 14850,
  totalGrievances: 1420,
  resolvedGrievances: 1084,
  pendingGrievances: 336,
  highRiskProjects: 14,
  delayedProjects: 19
};

// 3. SOCIAL IMPACT & LAND CLASSIFICATION BREAKDOWN
export const nationalSocialImpact = {
  totalFamilies: 84320,
  tribals: 14850,
  marginalFarmers: 42100,
  agriculturalLaborers: 18400,
  commercialTenants: 8970,
  landBreakdownHa: {
    agriculturalIrrigated: 16240.0,
    agriculturalUnirrigated: 9810.5,
    forestLand: 4520.0,
    privateNA: 4120.0,
    governmentRevenue: 2850.0,
    communityGaothan: 880.0
  }
};

// 4. RFCTLARR STATUTORY COMPLIANCE BREAKDOWN
export const nationalRfctlarrCompliance = {
  overallPercentage: 88.4,
  compliantProjectsCount: 88,
  partiallyCompliantCount: 19,
  criticalAttentionCount: 7,
  statutoryMilestones: [
    { section: "Section 4(1)", title: "SIA Social Impact Notification", complianceRate: 94, pendingCases: 6, authority: "State Government" },
    { section: "Section 7(1)", title: "Expert Appraisal Committee Review", complianceRate: 86, pendingCases: 12, authority: "Empaneled Agency / State" },
    { section: "Section 11(1)", title: "Preliminary Land Acquisition Notification", complianceRate: 91, pendingCases: 8, authority: "District Collector" },
    { section: "Section 15(2)", title: "Hearing of Objections by Collector", complianceRate: 82, pendingCases: 16, authority: "Tahsildar / Collector" },
    { section: "Section 19(1)", title: "Declaration of Acquisition & Summary R&R", complianceRate: 89, pendingCases: 9, authority: "State Government" },
    { section: "Section 23", title: "Statutory Award Enquiry & Determination", complianceRate: 85, pendingCases: 14, authority: "Special Land Acquisition Officer" },
    { section: "Section 31", title: "Rehabilitation & Resettlement Package", complianceRate: 79, pendingCases: 21, authority: "Administrator R&R" },
    { section: "Section 38", title: "Physical Possession post Full Compensation", complianceRate: 93, pendingCases: 5, authority: "Revenue Department" },
    { section: "Section 77", title: "PFMS Direct Benefit Transfer / Escrow Deposit", complianceRate: 90, pendingCases: 8, authority: "Proposing Body / PFMS" }
  ]
};

// 5. NATIONAL MASTER PROJECT DATASET
// Harmonizes existing Maharashtra projects from stateMockData with national projects
export const mordNationalProjectsList = [
  // Existing Maharashtra Projects directly linked
  {
    id: "PRJ-MH-STATE-2026-001",
    name: "Mumbai Coastal Road (South Extension)",
    authority: "Brihanmumbai Municipal Corporation (BMC)",
    ministry: "Ministry of Housing & Urban Affairs",
    department: "BMC Engineering Wing",
    category: "Urban Transport",
    projectType: "State Infrastructure",
    state: "Maharashtra",
    district: "Mumbai",
    taluka: "Mumbai City",
    villages: ["Worli", "Haji Ali", "Breach Candy", "Malabar Hill"],
    stage: "Compensation",
    status: "Delayed",
    riskLevel: "Critical",
    riskScore: 78,
    progress: 62,
    landRequiredHa: 92.4,
    landAcquiredHa: 57.3,
    estimatedBudget: "₹ 1,480.00 Cr",
    disbursedCompensation: "₹ 820.00 Cr",
    totalLandowners: 320,
    affectedFamilies: 280,
    tribalFamilies: 0,
    timeline: "Mar 2025 — Dec 2027",
    delayDays: 42,
    rfctlarrCompliancePct: 78,
    publicPurpose: "Metropolitan arterial decongestion & coastal defense connectivity under RFCTLARR Section 2(1)(b).",
    description: "10.58 km coastal road connecting Marine Drive to Bandra-Worli Sea Link with undersea tunnels and green promenades.",
    assignedDate: "2025-03-15",
    lastUpdated: "2026-09-08",
    pendingReason: {
      stage: "Compensation & CRZ Clearance",
      reason: "32 landowners in Worli fisherfolk settlement filed valuation objections; CRZ Stage-II clearance pending with MoEFCC.",
      sinceDate: "24 Jul 2026",
      responsibleAuthority: "Brihanmumbai Municipal Corporation & District Collector Mumbai",
      idleDays: 42
    },
    images: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80"
    ],
    landBreakdown: { agricultural: 0, forest: 4.2, private: 68.2, government: 20.0, community: 0 },
    stakeholders: {
      stateAuthority: "Shri Sunil V. Chavan, IAS (Principal Secretary, Revenue & Forest, MH)",
      districtCollector: "Shri Manoj K. Saunik, IAS (District Collector Mumbai)",
      projectDirector: "Shri P. K. Mehta, Chief Engineer (BMC)",
      slaoOfficer: "Shri V. S. Patil, Special Land Acquisition Officer #1"
    },
    grievanceSummary: { total: 18, resolved: 8, pending: 10, escalated: 3 },
    rrSummary: { affectedFamilies: 280, displacedFamilies: 65, housingUnitsAllotted: 42, pendingAllotments: 23, status: "Partially Implemented" },
    siaSummary: { agency: "Tata Institute of Social Sciences (TISS)", reportStatus: "Approved with Conditions", appraisalScore: "7.8/10", hearingsCompleted: 4 },
    aiAnalysis: {
      category: "SYSTEM ANALYSIS",
      confidence: "91%",
      delayRisk: "High",
      predictedAdditionalDelayDays: 60,
      detectedBottlenecks: [
        "No movement recorded for 42 days in Worli ward parcel awards",
        "PFMS escrow balance shortfall of ₹ 145 Cr against declared awards"
      ],
      recommendedReview: "Secretary MoRD to issue show-cause inquiry to BMC Municipal Commissioner & Collector Mumbai."
    }
  },
  {
    id: "PRJ-MH-STATE-2026-002",
    name: "Pune–Nashik Semi High-Speed Rail Corridor",
    authority: "Maharashtra Rail Infrastructure Dev. Corp. (Maharail)",
    ministry: "Ministry of Railways",
    department: "Maharail Land Acquisition Division",
    category: "Railways",
    projectType: "Centre-State Joint Venture",
    state: "Maharashtra",
    district: "Pune",
    taluka: "Haveli",
    villages: ["Charholi Budruk", "Dhanore", "Waki", "Chakan", "Rajgurunagar", "Manchar"],
    stage: "Approval Pending",
    status: "Under Review",
    riskLevel: "Medium",
    riskScore: 48,
    progress: 15,
    landRequiredHa: 380.5,
    landAcquiredHa: 0.0,
    estimatedBudget: "₹ 1,250.00 Cr",
    disbursedCompensation: "₹ 0.00 Cr",
    totalLandowners: 650,
    affectedFamilies: 420,
    tribalFamilies: 18,
    timeline: "2026 — 2028",
    delayDays: 18,
    rfctlarrCompliancePct: 91,
    publicPurpose: "High-speed passenger transit and agricultural freight corridor under Railways Act 1989 & RFCTLARR.",
    description: "135 km greenfield rail corridor cutting transit time between Pune and Nashik to under 2 hours, connecting regional agro-hubs.",
    assignedDate: "2026-08-20",
    lastUpdated: "2026-09-05",
    pendingReason: {
      stage: "State Cabinet Approval & Section 4(1)",
      reason: "Boundary discrepancy: overlaps 4.2 Ha Social Forestry land in Waki & violates 30m irrigation canal buffer zone in Haveli.",
      sinceDate: "20 Aug 2026",
      responsibleAuthority: "State Revenue Department & Maharail Joint Team",
      idleDays: 18
    },
    images: [
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&w=800&q=80"
    ],
    landBreakdown: { agricultural: 280.0, forest: 14.5, private: 310.0, government: 56.0, community: 0 },
    stakeholders: {
      stateAuthority: "Shri Sunil V. Chavan, IAS (Principal Secretary, Revenue, MH)",
      districtCollector: "Dr. Rajesh V. Deshmukh, IAS (District Collector Pune)",
      projectDirector: "Shri V. K. Sharma (Chief General Manager Land, Maharail)",
      slaoOfficer: "Dr. Arvind R. Patil (Tahsildar & LAO Haveli)"
    },
    grievanceSummary: { total: 0, resolved: 0, pending: 0, escalated: 0 },
    rrSummary: { affectedFamilies: 420, displacedFamilies: 45, housingUnitsAllotted: 0, pendingAllotments: 45, status: "R&R Scheme Draft Prepared" },
    siaSummary: { agency: "Gokhale Institute of Politics and Economics", reportStatus: "SIA Terms of Reference Approved", appraisalScore: "8.1/10", hearingsCompleted: 0 },
    aiAnalysis: {
      category: "SYSTEM ANALYSIS",
      confidence: "88%",
      delayRisk: "Medium",
      predictedAdditionalDelayDays: 35,
      detectedBottlenecks: [
        "Canal buffer overlap requires Water Resources NOC before Section 11 gazette",
        "Minor social forestry realignment proposal submitted but unverified on GIS"
      ],
      recommendedReview: "Direct Maharail to submit revised CAD-GIS shapefile with 30m setback within 10 days."
    }
  },
  {
    id: "PRJ-MH-STATE-2026-003",
    name: "Nagpur–Mumbai Samruddhi Mahamarg (Phase-II Extension)",
    authority: "Maharashtra State Road Development Corporation (MSRDC)",
    ministry: "Ministry of Road Transport & Highways",
    department: "MSRDC Project Division",
    category: "Highways & Expressways",
    projectType: "State Highway",
    state: "Maharashtra",
    district: "Nagpur",
    taluka: "Nagpur Rural",
    villages: ["Kamptee", "Parseoni", "Katol", "Narkhed"],
    stage: "SIA",
    status: "Ongoing",
    riskLevel: "Medium",
    riskScore: 45,
    progress: 28,
    landRequiredHa: 520.0,
    landAcquiredHa: 145.0,
    estimatedBudget: "₹ 3,200.00 Cr",
    disbursedCompensation: "₹ 480.00 Cr",
    totalLandowners: 980,
    affectedFamilies: 680,
    tribalFamilies: 145,
    timeline: "Jan 2026 — Jun 2028",
    delayDays: 0,
    rfctlarrCompliancePct: 92,
    publicPurpose: "High-speed economic corridor connecting central India with JNPT port.",
    description: "Extension of access-controlled expressway with service roads and integrated multi-modal logistics parks.",
    assignedDate: "2026-01-10",
    lastUpdated: "2026-09-10",
    pendingReason: {
      stage: "SIA Public Hearings in Tribal Blocks",
      reason: "PESA Gram Sabha clearance required for 48 Ha tribal community land across 2 villages.",
      sinceDate: "02 Sep 2026",
      responsibleAuthority: "Tribal Welfare Department & District Collector Nagpur",
      idleDays: 13
    },
    images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    ],
    landBreakdown: { agricultural: 390.0, forest: 48.0, private: 410.0, government: 62.0, community: 0 },
    stakeholders: {
      stateAuthority: "Shri Sunil V. Chavan, IAS (Principal Secretary Revenue, MH)",
      districtCollector: "Shri Ravindra K. Thakre, IAS (District Collector Nagpur)",
      projectDirector: "Shri A. R. Kulkarni (Superintending Engineer, MSRDC)",
      slaoOfficer: "Smt. S. P. Gaikwad (SLAO Nagpur Division)"
    },
    grievanceSummary: { total: 12, resolved: 7, pending: 5, escalated: 1 },
    rrSummary: { affectedFamilies: 680, displacedFamilies: 145, housingUnitsAllotted: 50, pendingAllotments: 95, status: "Ongoing Resettlement" },
    siaSummary: { agency: "Tata Institute of Social Sciences (TISS) SIA Cell", reportStatus: "SIA Draft Submitted", appraisalScore: "7.2/10", hearingsCompleted: 6 },
    aiAnalysis: {
      category: "SYSTEM ANALYSIS",
      confidence: "85%",
      delayRisk: "Medium",
      predictedAdditionalDelayDays: 25,
      detectedBottlenecks: [
        "Katol and Parseoni Gram Sabhas demanded land-for-land alternative rehabilitation",
        "Forest clearing NOC pending with Regional Empowered Committee"
      ],
      recommendedReview: "Recommend Joint Secretary (MoRD) review meeting with State Tribal Welfare Secretary."
    }
  },
  {
    id: "PRJ-MH-2026-140",
    name: "Mulshi Dam Reservoir & Irrigation Canal Project",
    authority: "Water Resources Department, Maharashtra",
    ministry: "Ministry of Jal Shakti",
    department: "Irrigation Projects Division, Pune",
    category: "Water & Irrigation",
    projectType: "State Water Project",
    state: "Maharashtra",
    district: "Pune",
    taluka: "Mulshi",
    villages: ["Male", "Bhadas", "Kolewadi"],
    stage: "SIA",
    status: "Delayed",
    riskLevel: "Critical",
    riskScore: 84,
    progress: 20,
    landRequiredHa: 195.2,
    landAcquiredHa: 38.0,
    estimatedBudget: "₹ 215.80 Cr",
    disbursedCompensation: "₹ 22.50 Cr",
    totalLandowners: 290,
    affectedFamilies: 540,
    tribalFamilies: 210,
    timeline: "Feb 2026 — Jun 2028",
    delayDays: 58,
    rfctlarrCompliancePct: 68,
    publicPurpose: "Agricultural irrigation feeder canal network and rural drinking water reservoir storage.",
    description: "Submergence and right-of-way acquisition for irrigation canal network serving 42 drought-prone villages.",
    assignedDate: "2026-02-18",
    lastUpdated: "2026-09-02",
    pendingReason: {
      stage: "Gram Sabha Resolution Rejection under PESA",
      reason: "Male Gram Sabha unanimously passed resolution rejecting proposed compensation rates; 210 families demand land-for-land in adjacent taluka.",
      sinceDate: "22 Aug 2026",
      responsibleAuthority: "District Collector Pune & PESA Statutory Committee",
      idleDays: 58
    },
    images: [
      "https://images.unsplash.com/photo-1583225214464-9296029427aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    ],
    landBreakdown: { agricultural: 110.0, forest: 45.0, private: 130.0, government: 20.2, community: 0 },
    stakeholders: {
      stateAuthority: "Shri Sunil V. Chavan, IAS (Principal Secretary Revenue, MH)",
      districtCollector: "Dr. Rajesh V. Deshmukh, IAS (District Collector Pune)",
      projectDirector: "Shri S. V. Jagtap (Superintending Engineer Irrigation)",
      slaoOfficer: "Dr. Arvind R. Patil (Tahsildar Mulshi)"
    },
    grievanceSummary: { total: 42, resolved: 10, pending: 32, escalated: 8 },
    rrSummary: { affectedFamilies: 540, displacedFamilies: 210, housingUnitsAllotted: 0, pendingAllotments: 210, status: "Stuck at Gram Sabha Consent" },
    siaSummary: { agency: "Tata Institute of Social Sciences (TISS)", reportStatus: "Conditional Hold", appraisalScore: "5.2/10", hearingsCompleted: 2 },
    aiAnalysis: {
      category: "SYSTEM ANALYSIS",
      confidence: "94%",
      delayRisk: "Critical",
      predictedAdditionalDelayDays: 90,
      detectedBottlenecks: [
        "58 days without administrative reconciliation meeting with Gram Sabha leaders",
        "Non-availability of equivalent government revenue land in Mulshi Taluka",
        "High likelihood of High Court stay petition under PESA statutory clauses"
      ],
      recommendedReview: "MORD Statutory Directive to District Collector to convene Tripartite Hearing with Tribal Representatives."
    }
  },
  {
    id: "PRJ-MH-STATE-2026-006",
    name: "Raigad Industrial SEZ Land Acquisition",
    authority: "Maharashtra Industrial Development Corporation (MIDC)",
    ministry: "Ministry of Commerce & Industry",
    department: "MIDC Land Acquisition Wing",
    category: "Industrial Corridor",
    projectType: "State Enterprise",
    state: "Maharashtra",
    district: "Raigad",
    taluka: "Pen",
    villages: ["Jite", "Durshet", "Hamrapur", "Karanja"],
    stage: "Objections",
    status: "Delayed",
    riskLevel: "Critical",
    riskScore: 72,
    progress: 38,
    landRequiredHa: 310.0,
    landAcquiredHa: 118.0,
    estimatedBudget: "₹ 1,850.00 Cr",
    disbursedCompensation: "₹ 520.00 Cr",
    totalLandowners: 580,
    affectedFamilies: 490,
    tribalFamilies: 35,
    timeline: "Apr 2025 — Dec 2027",
    delayDays: 38,
    rfctlarrCompliancePct: 74,
    publicPurpose: "High-technology hardware manufacturing zone and electronics cluster employment creation.",
    description: "Land acquisition for 310 Ha electronic manufacturing cluster with direct access to JNPT port.",
    assignedDate: "2025-04-10",
    lastUpdated: "2026-09-07",
    pendingReason: {
      stage: "Section 15 Objections Hearing",
      reason: "Organized farmer resistance demanding 4x market rate instead of 2x; 140 pending written objection petitions before SLAO.",
      sinceDate: "04 Aug 2026",
      responsibleAuthority: "Collectorate Raigad & MIDC Chief Executive Officer",
      idleDays: 38
    },
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    landBreakdown: { agricultural: 240.0, forest: 12.0, private: 275.0, government: 23.0, community: 0 },
    stakeholders: {
      stateAuthority: "Shri Sunil V. Chavan, IAS (Principal Secretary Revenue, MH)",
      districtCollector: "Smt. Yogita Kadam, IAS (District Collector Raigad)",
      projectDirector: "Shri K. V. Deshmukh (Chief Engineer, MIDC)",
      slaoOfficer: "Shri D. R. Jadhav (SLAO Pen Division)"
    },
    grievanceSummary: { total: 34, resolved: 8, pending: 26, escalated: 6 },
    rrSummary: { affectedFamilies: 490, displacedFamilies: 80, housingUnitsAllotted: 20, pendingAllotments: 60, status: "Under Dispute" },
    siaSummary: { agency: "Gokhale Institute of Politics & Economics", reportStatus: "Approved with Observations", appraisalScore: "6.9/10", hearingsCompleted: 5 },
    aiAnalysis: {
      category: "SYSTEM ANALYSIS",
      confidence: "89%",
      delayRisk: "High",
      predictedAdditionalDelayDays: 45,
      detectedBottlenecks: [
        "Collector has not scheduled hearing dates for 140 objections within statutory 60-day window",
        "Risk of Section 11 lapse if Section 19 declaration not published within 12 months"
      ],
      recommendedReview: "Issue urgent MORD notice alerting State Government of impending Section 11 statutory expiry."
    }
  },
  {
    id: "PRJ-MH-STATE-2026-007",
    name: "Satara Water Supply Augmentation Scheme",
    authority: "Maharashtra Jeevan Pradhikaran (MJP)",
    ministry: "Ministry of Jal Shakti",
    department: "MJP Satara Division",
    category: "Water & Sanitation",
    projectType: "State Water Project",
    state: "Maharashtra",
    district: "Satara",
    taluka: "Satara",
    villages: ["Degaon", "Limb", "Kodoli", "Kshetra Mahuli"],
    stage: "Completed",
    status: "Completed",
    riskLevel: "None",
    riskScore: 0,
    progress: 100,
    landRequiredHa: 42.0,
    landAcquiredHa: 42.0,
    estimatedBudget: "₹ 180.00 Cr",
    disbursedCompensation: "₹ 180.00 Cr",
    totalLandowners: 85,
    affectedFamilies: 72,
    tribalFamilies: 0,
    timeline: "Jun 2025 — Jun 2026",
    delayDays: 0,
    rfctlarrCompliancePct: 98,
    publicPurpose: "Dedicated pipeline right-of-way for clean drinking water augmentation to Satara municipal limits.",
    description: "Successfully executed pipeline and intake well acquisition. 100% compensation disbursed through PFMS DBT.",
    assignedDate: "2025-06-01",
    lastUpdated: "2026-06-30",
    pendingReason: null,
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    ],
    landBreakdown: { agricultural: 32.0, forest: 0, private: 35.0, government: 7.0, community: 0 },
    stakeholders: {
      stateAuthority: "Shri Sunil V. Chavan, IAS (Principal Secretary Revenue, MH)",
      districtCollector: "Shri Jitendra K. Dudi, IAS (District Collector Satara)",
      projectDirector: "Shri R. B. Patil (Executive Engineer, MJP)",
      slaoOfficer: "Shri M. N. More (Tahsildar Satara)"
    },
    grievanceSummary: { total: 6, resolved: 6, pending: 0, escalated: 0 },
    rrSummary: { affectedFamilies: 72, displacedFamilies: 0, housingUnitsAllotted: 0, pendingAllotments: 0, status: "Fully Settled" },
    siaSummary: { agency: "YASHADA Pune", reportStatus: "Cleared", appraisalScore: "9.5/10", hearingsCompleted: 4 },
    aiAnalysis: {
      category: "SYSTEM ANALYSIS",
      confidence: "99%",
      delayRisk: "None",
      predictedAdditionalDelayDays: 0,
      detectedBottlenecks: [],
      recommendedReview: "Standard project model for rural drinking pipeline corridors under SWADESH guidelines."
    }
  },

  // National Projects across other States (Representing National MORD Supervisory Breadth)
  {
    id: "PRJ-NAT-2026-011",
    name: "Delhi–Mumbai Expressway (Vadodara–Kim Stretch)",
    authority: "National Highways Authority of India (NHAI)",
    ministry: "Ministry of Road Transport & Highways",
    department: "NHAI Regional Office Gujarat",
    category: "Highways & Expressways",
    projectType: "National Expressway",
    state: "Gujarat",
    district: "Vadodara",
    taluka: "Padra / Karjan",
    villages: ["Chapad", "Vadsala", "Pingalwada", "Kandari"],
    stage: "Land Acquired",
    status: "Ongoing",
    riskLevel: "Low",
    riskScore: 22,
    progress: 88,
    landRequiredHa: 480.0,
    landAcquiredHa: 442.0,
    estimatedBudget: "₹ 4,120.00 Cr",
    disbursedCompensation: "₹ 3,680.00 Cr",
    totalLandowners: 1240,
    affectedFamilies: 950,
    tribalFamilies: 12,
    timeline: "Jan 2024 — Dec 2026",
    delayDays: 0,
    rfctlarrCompliancePct: 94,
    publicPurpose: "National economic spine connecting the national capital to India's financial capital.",
    description: "8-lane greenfield expressway segment with digital toll plazas, wildlife crossings, and solar energy corridors.",
    assignedDate: "2024-01-15",
    lastUpdated: "2026-09-11",
    pendingReason: null,
    images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80"
    ],
    landBreakdown: { agricultural: 395.0, forest: 12.0, private: 418.0, government: 50.0, community: 0 },
    stakeholders: {
      stateAuthority: "Smt. Mona Khandhar, IAS (Principal Secretary Revenue, Gujarat)",
      districtCollector: "Shri A. B. Gor, IAS (District Collector Vadodara)",
      projectDirector: "Shri R. K. Bansal, CGM (NHAI Regional Office)",
      slaoOfficer: "Shri J. P. Patel (SLAO Vadodara)"
    },
    grievanceSummary: { total: 48, resolved: 44, pending: 4, escalated: 0 },
    rrSummary: { affectedFamilies: 950, displacedFamilies: 120, housingUnitsAllotted: 114, pendingAllotments: 6, status: "Nearly Completed" },
    siaSummary: { agency: "CEPT University Ahmedabad", reportStatus: "Cleared", appraisalScore: "8.9/10", hearingsCompleted: 8 },
    aiAnalysis: {
      category: "SYSTEM ANALYSIS",
      confidence: "93%",
      delayRisk: "Low",
      predictedAdditionalDelayDays: 0,
      detectedBottlenecks: [
        "Final 38 Ha possession waiting for crop harvest completion by October 2026"
      ],
      recommendedReview: "Routine monitoring; project tracking 14 days ahead of central timeline."
    }
  },
  {
    id: "PRJ-NAT-2026-013",
    name: "Ken–Betwa River Interlinking National Project",
    authority: "National Water Development Agency (NWDA)",
    ministry: "Ministry of Jal Shakti",
    department: "Ken-Betwa Link Project Authority (KBLPA)",
    category: "Water & Irrigation",
    projectType: "National Flagship Project",
    state: "Madhya Pradesh",
    district: "Chhatarpur",
    taluka: "Bada Malhera / Bijawar",
    villages: ["Daudhan", "Sukwaha", "Basata", "Bhaisaundha"],
    stage: "Approval Pending",
    status: "Delayed",
    riskLevel: "Critical",
    riskScore: 88,
    progress: 18,
    landRequiredHa: 9800.0,
    landAcquiredHa: 1240.0,
    estimatedBudget: "₹ 14,200.00 Cr",
    disbursedCompensation: "₹ 890.00 Cr",
    totalLandowners: 4800,
    affectedFamilies: 3200,
    tribalFamilies: 1850,
    timeline: "2025 — 2030",
    delayDays: 74,
    rfctlarrCompliancePct: 71,
    publicPurpose: "National river interlinking project providing irrigation to 10.62 lakh ha and drinking water to 62 lakh people in Bundelkhand.",
    description: "Construction of Daudhan Dam across Ken River and 221 km link canal to transfer surplus water to Betwa basin.",
    assignedDate: "2025-02-10",
    lastUpdated: "2026-09-04",
    pendingReason: {
      stage: "Panna Tiger Reserve Core Submergence & R&R Resettlement",
      reason: "4,141 Ha of Panna Tiger Reserve core habitat affected; R&R village relocation package rejected by Daudhan Gram Sabha demanding revised compensation per adult child.",
      sinceDate: "12 Jun 2026",
      responsibleAuthority: "KBLPA & State Wildlife Board, Madhya Pradesh",
      idleDays: 74
    },
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583225214464-9296029427aa?auto=format&fit=crop&w=800&q=80"
    ],
    landBreakdown: { agricultural: 3800.0, forest: 4850.0, private: 3200.0, government: 1750.0, community: 0 },
    stakeholders: {
      stateAuthority: "Shri Rajesh Rajora, IAS (Additional Chief Secretary Revenue, MP)",
      districtCollector: "Shri Sandeep G. R., IAS (District Collector Chhatarpur)",
      projectDirector: "Shri Bhopal Singh, CEO (KBLPA)",
      slaoOfficer: "Shri R. P. Tiwari (SLAO Bundelkhand)"
    },
    grievanceSummary: { total: 112, resolved: 28, pending: 84, escalated: 22 },
    rrSummary: { affectedFamilies: 3200, displacedFamilies: 1850, housingUnitsAllotted: 340, pendingAllotments: 1510, status: "Severely Bottlenecked" },
    siaSummary: { agency: "Agricultural Finance Corporation (AFC India)", reportStatus: "Under Review by EAC", appraisalScore: "6.1/10", hearingsCompleted: 8 },
    aiAnalysis: {
      category: "SYSTEM ANALYSIS",
      confidence: "96%",
      delayRisk: "Critical",
      predictedAdditionalDelayDays: 120,
      detectedBottlenecks: [
        "Major displacement resistance in 10 submergence villages; forest clearances awaiting Supreme Court CEC report",
        "PFMS disbursement halted pending Central Empowered Committee recommendations"
      ],
      recommendedReview: "Immediate MORD high-level review with Union Environment Ministry and MP Chief Secretary."
    }
  },
  {
    id: "PRJ-NAT-2026-015",
    name: "Bengaluru–Chennai Expressway (Karnataka Section)",
    authority: "National Highways Authority of India (NHAI)",
    ministry: "Ministry of Road Transport & Highways",
    department: "NHAI Project Implementation Unit Bengaluru",
    category: "Highways & Expressways",
    projectType: "National Expressway",
    state: "Karnataka",
    district: "Kolar",
    taluka: "Malur / Bangarapet",
    villages: ["Tekal", "Doddakadathur", "Kamasamudram"],
    stage: "Completed",
    status: "Completed",
    riskLevel: "None",
    riskScore: 5,
    progress: 100,
    landRequiredHa: 680.0,
    landAcquiredHa: 680.0,
    estimatedBudget: "₹ 5,800.00 Cr",
    disbursedCompensation: "₹ 5,800.00 Cr",
    totalLandowners: 1850,
    affectedFamilies: 1420,
    tribalFamilies: 42,
    timeline: "2023 — 2026",
    delayDays: 0,
    rfctlarrCompliancePct: 97,
    publicPurpose: "Express industrial transit between industrial belts of Bengaluru and Chennai port.",
    description: "4-lane access controlled highway executed through integrated SWADESH cadastral GIS mapping and DBT PFMS compensation.",
    assignedDate: "2023-08-01",
    lastUpdated: "2026-08-15",
    pendingReason: null,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80"
    ],
    landBreakdown: { agricultural: 540.0, forest: 18.0, private: 610.0, government: 52.0, community: 0 },
    stakeholders: {
      stateAuthority: "Shri Rajender Kumar Kataria, IAS (Principal Secretary Revenue, Karnataka)",
      districtCollector: "Shri Akram Pasha, IAS (District Collector Kolar)",
      projectDirector: "Shri S. P. Sharma (CGM & Regional Officer NHAI)",
      slaoOfficer: "Smt. Roopa K. (SLAO Kolar)"
    },
    grievanceSummary: { total: 32, resolved: 32, pending: 0, escalated: 0 },
    rrSummary: { affectedFamilies: 1420, displacedFamilies: 180, housingUnitsAllotted: 180, pendingAllotments: 0, status: "100% Completed" },
    siaSummary: { agency: "Institute for Social and Economic Change (ISEC)", reportStatus: "Approved", appraisalScore: "9.2/10", hearingsCompleted: 6 },
    aiAnalysis: {
      category: "SYSTEM ANALYSIS",
      confidence: "98%",
      delayRisk: "None",
      predictedAdditionalDelayDays: 0,
      detectedBottlenecks: [],
      recommendedReview: "Gold standard model for fast-track statutory awards under RFCTLARR 2013."
    }
  }
];

// 6. SWADESH TRANSFORMATION ANALYTICS MODEL (THE X-FACTOR: BEFORE vs AFTER)
// Demonstrates how SWADESH transforms the traditional land acquisition process across all 8 stages
export const swadeshTransformationStages = [
  {
    stageId: "STAGE-01",
    stageName: "1. Proposal Formulation & GIS Cadastral Demarcation",
    traditionalProcess: "Paper DPRs submitted across disparate departments. Manual revenue village map tracing with high boundary ambiguity and unverified survey numbers.",
    swadeshProcess: "Unified Digital Proposal Engine with automated satellite GIS polygon mapping, real-time revenue record cadastral overlay, and pre-submission conflict analysis.",
    keyMetrics: [
      { metric: "Average Duration", before: "180 Days", after: "28 Days", changePct: -84.4, unit: "Days" },
      { metric: "Boundary Discrepancy Rate", before: "44.2%", after: "3.1%", changePct: -93.0, unit: "% of parcels" },
      { metric: "Inter-Departmental Queries", before: "14.2 Iterations", after: "1.8 Iterations", changePct: -87.3, unit: "Rounds" },
      { metric: "Statutory Filing Latency", before: "92 Days", after: "6 Days", changePct: -93.5, unit: "Days" }
    ],
    systemTelemetrySource: "Live SWADESH Proposal Engine & GIS Overlay Telemetry",
    baselineDatasetStatus: "Archived Baseline: 2014-2020 State Revenue Ministry Audits"
  },
  {
    stageId: "STAGE-02",
    stageName: "2. Cadastral Land Verification & Title Rectification",
    traditionalProcess: "Talathi and Patwari physical village visits with physical 7/12 & RoR ledgers. Silent inheritance mutations and missing co-sharer heirship claims undetected.",
    swadeshProcess: "Real-time API linkage to State Revenue e-Dharti / Mahabhulekh land registers. Automated Aadhaar / PAN identity validation and digital ownership verification.",
    keyMetrics: [
      { metric: "Average Verification Time", before: "210 Days", after: "35 Days", changePct: -83.3, unit: "Days" },
      { metric: "Disputed Parcels at Award", before: "28.5%", after: "4.2%", changePct: -85.3, unit: "% of parcels" },
      { metric: "Bank Verification Rejections", before: "36.0%", after: "2.4%", changePct: -93.3, unit: "% of accounts" },
      { metric: "Missing Heirship Claims Post-Award", before: "22.1%", after: "1.5%", changePct: -93.2, unit: "% of claims" }
    ],
    systemTelemetrySource: "Live Tahsildar / Talathi Field App Synced Telemetry",
    baselineDatasetStatus: "Archived Baseline: State Cadastral Surveys"
  },
  {
    stageId: "STAGE-03",
    stageName: "3. Social Impact Assessment (SIA) & Public Hearings",
    traditionalProcess: "Fragmented physical notices stuck on Panchayat boards. Unrecorded public hearings, low attendance representation, and delayed manual appraisal reports.",
    swadeshProcess: "Empaneled agency digital workflow, geotagged video recorded public hearings, automated SMS alerts to affected landowners, and standardized appraisal scoring.",
    keyMetrics: [
      { metric: "SIA Completion Turnaround", before: "185 Days", after: "65 Days", changePct: -64.9, unit: "Days" },
      { metric: "Gram Sabha Hearing Participation", before: "24.0%", after: "78.5%", changePct: 227.1, unit: "% landowners" },
      { metric: "Appraisal Committee Processing", before: "75 Days", after: "14 Days", changePct: -81.3, unit: "Days" },
      { metric: "Tribal PESA Consent Traceability", before: "Partial / Manual", after: "100% Digital", changePct: 100, unit: "Index" }
    ],
    systemTelemetrySource: "Live Empaneled Agency SIA Portal & Gram Sabha e-Records",
    baselineDatasetStatus: "Archived Baseline: MoRD LARR Compliance Studies"
  },
  {
    stageId: "STAGE-04",
    stageName: "4. State Cabinet & Section 4 / 11 Statutory Approvals",
    traditionalProcess: "Physical file movement across 5 to 7 secretariat departments. Months spent awaiting departmental NOCs, leading to frequent Section 11 statutory lapses.",
    swadeshProcess: "E-Office integrated Cabinet routing, parallel departmental NOC tracking with statutory timer clocks, and Class-3 DSC digital Gazette publication trigger.",
    keyMetrics: [
      { metric: "Cabinet Sanction Duration", before: "140 Days", after: "21 Days", changePct: -85.0, unit: "Days" },
      { metric: "Gazette Notification Publication", before: "45 Days", after: "3 Days", changePct: -93.3, unit: "Days" },
      { metric: "Statutory Section 11 Lapses", before: "18.2%", after: "0.4%", changePct: -97.8, unit: "% projects" },
      { metric: "Departmental Clearance Latency", before: "68 Days", after: "9 Days", changePct: -86.8, unit: "Days" }
    ],
    systemTelemetrySource: "Live State Cabinet E-Governance Routing & e-Gazette",
    baselineDatasetStatus: "Archived Baseline: 2015-2022 Secretariat Dispatch Audits"
  },
  {
    stageId: "STAGE-05",
    stageName: "5. Statutory Award Calculation & PFMS Direct Benefit Transfer",
    traditionalProcess: "Manual circle rate lookup, physical ledger calculations prone to clerical errors, physical cheques or demand drafts prone to fraud and multi-year delays.",
    swadeshProcess: "Automated RFCTLARR market rate multiplier calculation, Sub-Registrar circle rate API integration, PFMS escrow direct benefit transfer straight to Aadhaar-linked bank.",
    keyMetrics: [
      { metric: "Award Determination Duration", before: "195 Days", after: "32 Days", changePct: -83.6, unit: "Days" },
      { metric: "Compensation Disbursement Time", before: "240 Days", after: "7 Days", changePct: -97.1, unit: "Days" },
      { metric: "Mathematical Valuation Discrepancies", before: "16.4%", after: "0.0%", changePct: -100.0, unit: "% error rate" },
      { metric: "Direct Benefit Transfer (PFMS)", before: "12.0%", after: "94.5%", changePct: 687.5, unit: "% disbursed" }
    ],
    systemTelemetrySource: "Live Public Financial Management System (PFMS) Ledger",
    baselineDatasetStatus: "Archived Baseline: Comptroller & Auditor General (CAG) Reports"
  },
  {
    stageId: "STAGE-06",
    stageName: "6. Rehabilitation & Resettlement (R&R) Entitlements",
    traditionalProcess: "R&R treated as secondary paper exercise. Displaced families tracked on loose registers; lack of integration between land compensation and resettlement parcels.",
    swadeshProcess: "Dedicated R&R family ledger linked to GIS resettlement colony layout, biometric entitlement passbooks, and real-time house construction monitoring.",
    keyMetrics: [
      { metric: "R&R Scheme Formulation", before: "220 Days", after: "45 Days", changePct: -79.5, unit: "Days" },
      { metric: "Family Entitlement Tracking", before: "38.0%", after: "96.2%", changePct: 153.2, unit: "% monitored" },
      { metric: "Resettlement Discontent Protests", before: "31.2%", after: "5.8%", changePct: -81.4, unit: "% projects" },
      { metric: "Alternative Land Allotment Time", before: "480 Days", after: "90 Days", changePct: -81.3, unit: "Days" }
    ],
    systemTelemetrySource: "Live Administrator R&R Modules & Beneficiary Directory",
    baselineDatasetStatus: "Archived Baseline: State Social Welfare Baselines"
  },
  {
    stageId: "STAGE-07",
    stageName: "7. Citizen Grievance Redressal & Authority Accountability",
    traditionalProcess: "Villagers had to travel to Collectorate to file handwritten petitions with no tracking. Months or years passed without written response; frequent High Court writ petitions.",
    swadeshProcess: "Omnichannel citizen portal with SMS acknowledgement, unique Grievance Tracking ID, 30-day statutory timer with auto-escalation to MORD National Console.",
    keyMetrics: [
      { metric: "Grievance Resolution Turnaround", before: "310 Days", after: "24 Days", changePct: -92.3, unit: "Days" },
      { metric: "High Court Injunction / Stay Orders", before: "24.8%", after: "3.2%", changePct: -87.1, unit: "% projects" },
      { metric: "First Response Acknowledgement", before: "45 Days", after: "24 Hours", changePct: -97.8, unit: "Hours" },
      { metric: "Citizen Satisfaction Score", before: "2.1 / 5", after: "4.4 / 5", changePct: 109.5, unit: "Rating" }
    ],
    systemTelemetrySource: "Live Citizen Grievance Portal & Central Helpdesk",
    baselineDatasetStatus: "Archived Baseline: CPGRAMS Historic Land Cases"
  },
  {
    stageId: "STAGE-08",
    stageName: "8. Overall Project Lifecycle & Final Revenue Mutation",
    traditionalProcess: "Average land acquisition cycle: 4.5 to 6.2 years. Handover happened before revenue mutation, leading to decades of unresolved litigation between agencies.",
    swadeshProcess: "End-to-end integrated lifecycle: 14 to 18 months. Immediate digital Mutation Entry (Ferfar / Namantaran) in government land registry simultaneously with possession.",
    keyMetrics: [
      { metric: "Total Project Acquisition Cycle", before: "58 Months", after: "16 Months", changePct: -72.4, unit: "Months" },
      { metric: "Cost Overrun due to Delays", before: "42.5%", after: "6.2%", changePct: -85.4, unit: "% cost escalation" },
      { metric: "Final Mutation Registration Time", before: "360 Days", after: "15 Days", changePct: -95.8, unit: "Days" },
      { metric: "Clean Title Handover to Agency", before: "52.0%", after: "99.1%", changePct: 90.6, unit: "% possession" }
    ],
    systemTelemetrySource: "Live End-to-End System Performance & Audit Log",
    baselineDatasetStatus: "Archived Baseline: NITI Aayog Project Monitoring Group"
  }
];

// 7. SUPERVISORY DIRECTIVES & INQUIRIES REGISTRY
// Supports MORD asking for updates, demanding explanations for delays, and suggesting course corrections
export const initialMordDirectives = [
  {
    id: "DIR-MORD-2026-001",
    projectId: "PRJ-MH-2026-140",
    projectName: "Mulshi Dam Reservoir & Irrigation Canal Project",
    type: "DEMAND_DELAY_EXPLANATION",
    title: "Official Explanation Demanded: 58 Days Idle at SIA Stage & PESA Rejection",
    targetAuthority: "District Collector, Pune & Principal Secretary (Revenue), Maharashtra",
    recipientOfficers: ["Dr. Rajesh V. Deshmukh, IAS (Collector Pune)", "Shri Sunil V. Chavan, IAS (PS Revenue MH)"],
    issueDate: "2026-09-08 | 11:30:00 AM IST",
    deadlineDate: "2026-09-22",
    daysRemaining: 7,
    status: "Awaiting Response",
    severity: "High Priority",
    directiveContent: "The National Supervisory System indicates Project PRJ-MH-2026-140 has recorded zero progress for 58 consecutive days following negative resolution by Male Gram Sabha. You are directed under RFCTLARR Section 86 oversight powers to submit a detailed factual explanation within 14 days outlining: (1) Alternate R&R land identified; (2) Status of tripartite dialogue; (3) Concrete roadmap to avoid Section 11 lapse.",
    mordSignatory: "Shri Shailesh Kumar Singh, IAS, Secretary MoRD (Class-3 DSC Signed)",
    responseReceived: null,
    auditTrail: [
      { event: "Directive Generated by MoRD Secretary", timestamp: "08 Sep 2026 | 11:28:10 AM IST", user: "Shri Shailesh Kumar Singh, IAS" },
      { event: "Digitally Signed with Class-3 DSC", timestamp: "08 Sep 2026 | 11:30:00 AM IST", user: "eMudhra DSC (GOI-MORD)" },
      { event: "Dispatched to Collector Pune & PS Revenue MH e-Inbox", timestamp: "08 Sep 2026 | 11:30:15 AM IST", user: "SWADESH Gateway" }
    ]
  },
  {
    id: "DIR-MORD-2026-002",
    projectId: "PRJ-MH-STATE-2026-001",
    projectName: "Mumbai Coastal Road (South Extension)",
    type: "POLICY_SUGGESTION",
    title: "Supervisory Guidance: Expediting Worli Fisherfolk Compensation Settlement",
    targetAuthority: "Municipal Commissioner, BMC & District Collector, Mumbai",
    recipientOfficers: ["Shri Manoj K. Saunik, IAS (Collector Mumbai)", "Shri P. K. Mehta (CE BMC)"],
    issueDate: "2026-09-02 | 03:15:20 PM IST",
    deadlineDate: "2026-09-16",
    daysRemaining: 1,
    status: "Explanation Received",
    severity: "Medium Priority",
    directiveContent: "In reference to the 32 pending compensation claims in Worli, MoRD recommends adopting the direct consent award framework under Section 23A with 100% solatium to prevent protracted litigation in the High Court.",
    mordSignatory: "Shri Shailesh Kumar Singh, IAS, Secretary MoRD",
    responseReceived: {
      date: "2026-09-10 | 04:45:10 PM IST",
      respondedBy: "Shri Manoj K. Saunik, IAS, District Collector Mumbai",
      responseSummary: "Collectorate has convened special hearing with Worli Macchimar Sarvodaya Sahakari Sanstha on 14 Sep 2026. BMC has agreed in principle to enhance livelihood rehabilitation assistance by ₹ 4.50 Cr. Final consent agreement expected within 10 days.",
      attachments: ["BMC_Fisherfolk_Rehab_Proposal_Sep2026.pdf"]
    },
    auditTrail: [
      { event: "Supervisory Suggestion Issued", timestamp: "02 Sep 2026 | 03:15:20 PM IST", user: "MoRD Secretary" },
      { event: "Collectorate Acknowledged Receipt", timestamp: "03 Sep 2026 | 10:12:00 AM IST", user: "Collector Office Mumbai" },
      { event: "Formal Response & Mitigation Plan Uploaded", timestamp: "10 Sep 2026 | 04:45:10 PM IST", user: "Collector Mumbai" }
    ]
  },
  {
    id: "DIR-MORD-2026-003",
    projectId: "PRJ-MH-STATE-2026-006",
    projectName: "Raigad Industrial SEZ Land Acquisition",
    type: "EXPEDITE_UPDATE_REQUEST",
    title: "Urgent Call for Status Report: Section 15 Hearing Schedule in Pen Taluka",
    targetAuthority: "District Collector, Raigad & Chief Executive Officer, MIDC",
    recipientOfficers: ["Smt. Yogita Kadam, IAS (Collector Raigad)", "Shri K. V. Deshmukh (CE MIDC)"],
    issueDate: "2026-09-05 | 02:20:00 PM IST",
    deadlineDate: "2026-09-15",
    daysRemaining: 0,
    status: "Awaiting Response",
    severity: "High Priority",
    directiveContent: "Provide immediate update regarding the hearing calendar for 140 pending farmer objections in Pen Taluka. System risk analysis flags high probability of Section 11 lapse within 75 days if hearing reports are not submitted.",
    mordSignatory: "Shri Shailesh Kumar Singh, IAS, Secretary MoRD",
    responseReceived: null,
    auditTrail: [
      { event: "Directive Dispatched", timestamp: "05 Sep 2026 | 02:20:00 PM IST", user: "MoRD Secretary" }
    ]
  }
];

// 8. STATE-WISE SUPERVISORY COMPARATIVE MATRIX
export const stateWiseSupervisoryData = [
  { state: "Maharashtra", totalProjects: 18, activeProjects: 12, completedProjects: 4, delayedProjects: 2, landRequiredHa: 2840.5, landAcquiredHa: 1820.0, affectedFamilies: 4820, rfctlarrCompliance: 89.2, totalCompDisbursed: "₹ 3,450 Cr", totalGrievances: 142, avgDelayDays: 14, riskLevel: "Medium" },
  { state: "Gujarat", totalProjects: 14, activeProjects: 9, completedProjects: 4, delayedProjects: 1, landRequiredHa: 3450.0, landAcquiredHa: 2980.0, affectedFamilies: 5120, rfctlarrCompliance: 94.1, totalCompDisbursed: "₹ 4,820 Cr", totalGrievances: 88, avgDelayDays: 6, riskLevel: "Low" },
  { state: "Karnataka", totalProjects: 12, activeProjects: 8, completedProjects: 3, delayedProjects: 1, landRequiredHa: 2120.0, landAcquiredHa: 1750.0, affectedFamilies: 3450, rfctlarrCompliance: 92.5, totalCompDisbursed: "₹ 2,980 Cr", totalGrievances: 64, avgDelayDays: 8, riskLevel: "Low" },
  { state: "Madhya Pradesh", totalProjects: 15, activeProjects: 10, completedProjects: 2, delayedProjects: 3, landRequiredHa: 12400.0, landAcquiredHa: 4200.0, affectedFamilies: 18400, rfctlarrCompliance: 76.4, totalCompDisbursed: "₹ 2,150 Cr", totalGrievances: 340, avgDelayDays: 48, riskLevel: "Critical" },
  { state: "Uttar Pradesh", totalProjects: 22, activeProjects: 15, completedProjects: 5, delayedProjects: 2, landRequiredHa: 6850.0, landAcquiredHa: 5100.0, affectedFamilies: 14200, rfctlarrCompliance: 88.0, totalCompDisbursed: "₹ 7,420 Cr", totalGrievances: 210, avgDelayDays: 12, riskLevel: "Medium" },
  { state: "Tamil Nadu", totalProjects: 11, activeProjects: 7, completedProjects: 3, delayedProjects: 1, landRequiredHa: 1850.0, landAcquiredHa: 1420.0, affectedFamilies: 2890, rfctlarrCompliance: 91.8, totalCompDisbursed: "₹ 3,110 Cr", totalGrievances: 72, avgDelayDays: 10, riskLevel: "Low" },
  { state: "Odisha", totalProjects: 13, activeProjects: 9, completedProjects: 2, delayedProjects: 2, landRequiredHa: 4120.0, landAcquiredHa: 2450.0, affectedFamilies: 7850, rfctlarrCompliance: 81.5, totalCompDisbursed: "₹ 2,640 Cr", totalGrievances: 195, avgDelayDays: 28, riskLevel: "High" },
  { state: "Rajasthan", totalProjects: 9, activeProjects: 6, completedProjects: 2, delayedProjects: 1, landRequiredHa: 2950.0, landAcquiredHa: 2180.0, affectedFamilies: 3820, rfctlarrCompliance: 89.0, totalCompDisbursed: "₹ 2,890 Cr", totalGrievances: 85, avgDelayDays: 11, riskLevel: "Low" }
];

// 9. MINISTRY / DEPARTMENT LEVEL COMPARATIVE METRICS
export const ministryWiseSupervisoryData = [
  { ministry: "Ministry of Road Transport & Highways", short: "MoRTH / NHAI", activeProjects: 42, completedProjects: 18, delayedProjects: 4, totalLandHa: 14250.0, totalBudget: "₹ 24,500 Cr", compDisbursedPct: 78.4, rfctlarrCompliance: 92.1, bottleneckIndex: "Low", primaryIssue: "Forest Wildlife Clearances" },
  { ministry: "Ministry of Railways", short: "Railways / RVNL / Maharail", activeProjects: 26, completedProjects: 8, delayedProjects: 5, totalLandHa: 8950.0, totalBudget: "₹ 16,800 Cr", compDisbursedPct: 62.1, rfctlarrCompliance: 87.5, bottleneckIndex: "Medium", primaryIssue: "Urban Encroachments & Circle Rates" },
  { ministry: "Ministry of Jal Shakti", short: "Water Resources / Irrigation", activeProjects: 18, completedProjects: 4, delayedProjects: 6, totalLandHa: 12400.0, totalBudget: "₹ 18,400 Cr", compDisbursedPct: 44.5, rfctlarrCompliance: 74.2, bottleneckIndex: "Critical", primaryIssue: "PESA Tribal Submergence Resettlement" },
  { ministry: "Ministry of Housing & Urban Affairs", short: "MoHUA / Metro / Smart City", activeProjects: 16, completedProjects: 5, delayedProjects: 2, totalLandHa: 1420.0, totalBudget: "₹ 8,900 Cr", compDisbursedPct: 71.0, rfctlarrCompliance: 89.4, bottleneckIndex: "Medium", primaryIssue: "Commercial Tenancy Rehabilitation" },
  { ministry: "Ministry of Commerce & Industry", short: "DPIIT / MIDC / NICDC", activeProjects: 14, completedProjects: 3, delayedProjects: 3, totalLandHa: 3850.0, totalBudget: "₹ 6,200 Cr", compDisbursedPct: 58.2, rfctlarrCompliance: 82.0, bottleneckIndex: "High", primaryIssue: "Agricultural Land Acquisition Protest" },
  { ministry: "Ministry of Ports, Shipping & Waterways", short: "MoPSW / Sagarmala", activeProjects: 8, completedProjects: 3, delayedProjects: 1, totalLandHa: 1120.0, totalBudget: "₹ 2,800 Cr", compDisbursedPct: 81.2, rfctlarrCompliance: 90.5, bottleneckIndex: "Low", primaryIssue: "CRZ Coastal Clearances" }
];

// Helper to get all projects combined with any in-memory user-created projects
export const getAllMordProjects = (swadeshContextProjects = []) => {
  const existingMap = new Map();
  mordNationalProjectsList.forEach(p => existingMap.set(p.id, p));

  // If user created projects in SwadeshContext runtime, merge them cleanly
  if (Array.isArray(swadeshContextProjects)) {
    swadeshContextProjects.forEach(cp => {
      if (!existingMap.has(cp.id)) {
        existingMap.set(cp.id, {
          id: cp.id,
          name: cp.name,
          authority: cp.authority || "Project Proposing Body",
          ministry: cp.ministry || "Ministry of Road Transport & Highways",
          department: cp.department || "Engineering Division",
          category: cp.type || "Infrastructure Corridor",
          projectType: "State Infrastructure",
          state: "Maharashtra",
          district: cp.district || "Pune",
          taluka: cp.taluka || "Haveli",
          villages: cp.villages || ["Wagholi"],
          stage: cp.status === "Near Completion" ? "Completed" : "WORK / IMPLEMENTATION",
          status: cp.status || "Ongoing",
          riskLevel: cp.disputeParcels > 20 ? "High" : "Low",
          riskScore: cp.disputeParcels * 2,
          progress: cp.verifiedParcels && cp.totalParcels ? Math.round((cp.verifiedParcels / cp.totalParcels) * 100) : 50,
          landRequiredHa: cp.totalAreaHa || 100,
          landAcquiredHa: cp.verifiedParcels && cp.totalParcels ? Math.round((cp.totalAreaHa * (cp.verifiedParcels / cp.totalParcels))) : 50,
          estimatedBudget: cp.estCompensation || "₹ 100.00 Cr",
          disbursedCompensation: "₹ 50.00 Cr",
          totalLandowners: cp.totalLandowners || 200,
          affectedFamilies: Math.round((cp.totalLandowners || 200) * 0.8),
          tribalFamilies: 0,
          timeline: "2026 — 2028",
          delayDays: 0,
          rfctlarrCompliancePct: 88,
          publicPurpose: "Public infrastructure development under RFCTLARR 2013.",
          description: cp.name + " infrastructure development project registered on SWADESH portal.",
          assignedDate: cp.assignedDate || "2026-01-15",
          lastUpdated: "2026-09-10",
          pendingReason: null,
          images: [
            cp.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80"
          ],
          landBreakdown: { agricultural: (cp.totalAreaHa || 100) * 0.8, forest: 0, private: (cp.totalAreaHa || 100) * 0.9, government: (cp.totalAreaHa || 100) * 0.1, community: 0 },
          stakeholders: {
            stateAuthority: "Shri Sunil V. Chavan, IAS (Principal Secretary Revenue, MH)",
            districtCollector: "District Collector Office",
            projectDirector: "Project Incharge",
            slaoOfficer: "Special Land Acquisition Officer"
          },
          grievanceSummary: { total: cp.disputeParcels || 0, resolved: 0, pending: cp.disputeParcels || 0, escalated: 0 },
          rrSummary: { affectedFamilies: Math.round((cp.totalLandowners || 200) * 0.8), displacedFamilies: 10, housingUnitsAllotted: 0, pendingAllotments: 10, status: "In Progress" },
          siaSummary: { agency: "Empaneled Agency", reportStatus: "In Progress", appraisalScore: "8.0/10", hearingsCompleted: 1 },
          aiAnalysis: {
            category: "SYSTEM ANALYSIS",
            confidence: "85%",
            delayRisk: "Low",
            predictedAdditionalDelayDays: 0,
            detectedBottlenecks: [],
            recommendedReview: "Standard monitoring"
          }
        });
      }
    });
  }

  return Array.from(existingMap.values());
};
