// Realistic Maharashtra Proposing Body / Project Authority Mock Data for SWADESH Platform
// Seamlessly links with existing State Government and Collector datasets using the same IDs

export const proposingOfficerProfile = {
  name: "Shri V. K. Sharma",
  designation: "Chief General Manager (Land Acquisition & Projects)",
  id: "PB-OFF-MAHARAIL-01",
  authority: "Maharashtra Rail Infrastructure Development Corporation (Maharail)",
  shortAuthority: "Maharail",
  ministry: "Transport & Infrastructure Department",
  department: "Land Acquisition & Right-of-Way Division",
  cadre: "IRSE (Indian Railway Service of Engineers) Cadre",
  govtId: "MH-MR-CGM-2006-019",
  email: "vksharma.cgm@maharail.com",
  phone: "+91 22 2288 3491",
  mobile: "+91 98201 44512",
  officeAddress: "Maharail HQ, 2nd Floor, Hoechst House, Nariman Point, Mumbai — 400021",
  digitalSignStatus: "Valid (Class-3 DSC Active)",
  signCertIssuer: "NIC CA Sub-CA 2026",
  certSerial: "DS-MH-MAHARAIL-2026-99214A",
  jurisdiction: "State of Maharashtra — Railway Corridors",
  organizations: [
    { id: "ORG-01", name: "Maharashtra Rail Infrastructure Development Corporation (Maharail)", short: "Maharail" },
    { id: "ORG-02", name: "Maharashtra State Road Development Corporation (MSRDC)", short: "MSRDC" },
    { id: "ORG-03", name: "Mumbai Metropolitan Region Development Authority (MMRDA)", short: "MMRDA" },
    { id: "ORG-04", name: "Maharashtra Industrial Development Corporation (MIDC)", short: "MIDC" },
    { id: "ORG-05", name: "National Highways Authority of India (NHAI)", short: "NHAI" },
    { id: "ORG-06", name: "Brihanmumbai Municipal Corporation (BMC)", short: "BMC" },
    { id: "ORG-07", name: "Maharashtra Maritime Board (MMB)", short: "MMB" }
  ]
};

export const proposingOverviewStats = {
  activeProjects: 12,
  proposalsUnderPreparation: 5,
  submittedProposals: 18,
  totalLandUnderAcquisitionHa: 4820.5,
  highRiskProposals: 3,
  totalBudget: "₹ 16,450.00 Cr",
  rfctlarrCompliancePct: 94
};

// SHARED PROJECT DATASET
// Reusing exact Project IDs from stateProjectsMasterList & collectorProjectsMasterList
export const initialProposingProjects = [
  {
    id: "PRJ-MH-STATE-2026-002",
    name: "Pune–Nashik Semi High-Speed Rail Corridor",
    authority: "Maharashtra Rail Infrastructure Dev. Corp. (Maharail)",
    shortAuthority: "Maharail",
    department: "Maharail Land Acquisition Division",
    ministry: "Transport Department",
    projectType: "Central / State Joint Venture",
    projectCategory: "Railway Transport Infrastructure",
    publicPurposeCategory: "Strategic Public Transport Corridor & Freight Connectivity",
    description: "135 km greenfield high-speed rail corridor connecting Pune to Nashik, reducing transit duration to 2 hours with dedicated agricultural freight logistics hubs.",
    district: "Pune",
    taluka: "Haveli",
    villages: ["Charholi Budruk", "Dhanore", "Waki", "Chakan", "Rajgurunagar", "Manchar"],
    stage: "Approval Pending",
    status: "Under Approval",
    riskLevel: "Medium",
    riskScore: 42,
    progress: 15,
    landRequiredHa: 380.5,
    landAcquiredHa: 0,
    estimatedBudget: "₹ 1,250.00 Cr",
    financialYear: "2026–27",
    proposalDate: "2026-08-20",
    creationTimestamp: "20 Aug 2026 | 11:30:15 AM IST",
    signedTimestamp: "20 Aug 2026 | 11:45:22 AM IST",
    digitalSignatureStatus: "Digitally Signed",
    signerName: "Shri V. K. Sharma, CGM (Land)",
    projectIncharge: "Shri V. K. Sharma, CGM (Land)",
    districtCollector: "Dr. Rajesh V. Deshmukh, IAS",
    timeline: "2026 — 2028 (24 Months)",
    delayDays: 0,
    lastUpdated: "2026-09-05",
    totalLandowners: 650,
    proposalsCount: 3,
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "PRJ-MH-STATE-2026-003",
    name: "Nagpur–Mumbai Samruddhi Mahamarg (Phase-II Extension)",
    authority: "Maharashtra State Road Development Corporation (MSRDC)",
    shortAuthority: "MSRDC",
    department: "MSRDC Project Division",
    ministry: "Public Works Department",
    projectType: "Single State",
    projectCategory: "Access-Controlled Expressway",
    publicPurposeCategory: "Industrial Corridor Connectivity",
    description: "Extension of Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Mahamarg with high-speed service roads and logistics park tie-ins.",
    district: "Nagpur",
    taluka: "Nagpur Rural",
    villages: ["Kamptee", "Parseoni", "Katol", "Narkhed"],
    stage: "SIA",
    status: "Acquisition Ongoing",
    riskLevel: "Medium",
    riskScore: 45,
    progress: 28,
    landRequiredHa: 520.0,
    landAcquiredHa: 145.0,
    estimatedBudget: "₹ 3,200.00 Cr",
    financialYear: "2025–26",
    proposalDate: "2026-01-10",
    creationTimestamp: "10 Jan 2026 | 09:00:00 AM IST",
    signedTimestamp: "10 Jan 2026 | 09:22:18 AM IST",
    digitalSignatureStatus: "Digitally Signed",
    signerName: "Shri A. R. Kulkarni, SE (LA)",
    projectIncharge: "Shri A. R. Kulkarni, SE (LA)",
    districtCollector: "Shri Ravindra K. Thakre, IAS",
    timeline: "Jan 2026 — Jun 2028",
    delayDays: 0,
    lastUpdated: "2026-09-10",
    totalLandowners: 980,
    proposalsCount: 2,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "PRJ-MH-STATE-2026-005",
    name: "Thane Creek Bridge & Connectivity Corridor",
    authority: "Mumbai Metropolitan Region Dev. Authority (MMRDA)",
    shortAuthority: "MMRDA",
    department: "MMRDA Projects Division",
    ministry: "Urban Development Department",
    projectType: "Single State",
    projectCategory: "Bridge & Urban Corridor",
    publicPurposeCategory: "Metropolitan Arterial Decongestion",
    description: "New 6-lane bridge across Thane Creek with approach roads connecting Thane to Navi Mumbai international airport arterial.",
    district: "Thane",
    taluka: "Thane",
    villages: ["Kopri", "Balkum", "Majiwada", "Wagle Estate"],
    stage: "Survey & Verification",
    status: "Acquisition Ongoing",
    riskLevel: "Low",
    riskScore: 22,
    progress: 55,
    landRequiredHa: 68.5,
    landAcquiredHa: 37.6,
    estimatedBudget: "₹ 890.00 Cr",
    financialYear: "2025–26",
    proposalDate: "2025-11-15",
    creationTimestamp: "15 Nov 2025 | 10:00:00 AM IST",
    signedTimestamp: "15 Nov 2025 | 10:30:12 AM IST",
    digitalSignatureStatus: "Digitally Signed",
    signerName: "Shri N. R. Patil, CE (MMRDA)",
    projectIncharge: "Shri N. R. Patil, CE (MMRDA)",
    districtCollector: "Shri Ashok B. Shingare, IAS",
    timeline: "Nov 2025 — Mar 2027",
    delayDays: 0,
    lastUpdated: "2026-09-09",
    totalLandowners: 145,
    proposalsCount: 1,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "PRJ-MH-STATE-2026-009",
    name: "Chh. Sambhajinagar Smart City Industrial Hub",
    authority: "Aurangabad Industrial City Ltd. (AURIC)",
    shortAuthority: "AURIC",
    department: "AURIC Land Division",
    ministry: "Industries & Mining Department",
    projectType: "Single State",
    projectCategory: "Industrial Township",
    publicPurposeCategory: "Industrial Park & Employment Generation",
    description: "Phase-II expansion of AURIC industrial township for global pharmaceutical and automobile manufacturing sectors.",
    district: "Chhatrapati Sambhajinagar",
    taluka: "Paithan",
    villages: ["Bidkin", "Shendra", "Karmad", "Satara"],
    stage: "SIA",
    status: "Under Approval",
    riskLevel: "High",
    riskScore: 62,
    progress: 22,
    landRequiredHa: 450.0,
    landAcquiredHa: 98.0,
    estimatedBudget: "₹ 2,100.00 Cr",
    financialYear: "2025–26",
    proposalDate: "2025-12-01",
    creationTimestamp: "01 Dec 2025 | 10:00:00 AM IST",
    signedTimestamp: "01 Dec 2025 | 10:24:19 AM IST",
    digitalSignatureStatus: "Digitally Signed",
    signerName: "Shri D. K. Patil, CEO",
    projectIncharge: "Shri D. K. Patil, CEO (AURIC)",
    districtCollector: "Shri Astik K. Pandey, IAS",
    timeline: "Dec 2025 — Dec 2028",
    delayDays: 8,
    lastUpdated: "2026-09-10",
    totalLandowners: 720,
    proposalsCount: 2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "PRJ-MH-STATE-2026-001",
    name: "Mumbai Coastal Road (South Extension)",
    authority: "Brihanmumbai Municipal Corporation (BMC)",
    shortAuthority: "BMC",
    department: "BMC Engineering Wing",
    ministry: "Urban Development Department",
    projectType: "Single State",
    projectCategory: "Urban Coastal Highway",
    publicPurposeCategory: "Public Road Transport & Coastal Protection",
    description: "10.58 km coastal road connecting Marine Drive to Bandra-Worli Sea Link with underground tunnels and green promenades.",
    district: "Mumbai",
    taluka: "Mumbai City",
    villages: ["Worli", "Haji Ali", "Breach Candy", "Malabar Hill"],
    stage: "Compensation",
    status: "Acquisition Ongoing",
    riskLevel: "Critical",
    riskScore: 78,
    progress: 62,
    landRequiredHa: 92.4,
    landAcquiredHa: 57.3,
    estimatedBudget: "₹ 1,480.00 Cr",
    financialYear: "2024–25",
    proposalDate: "2025-03-15",
    creationTimestamp: "15 Mar 2025 | 10:15:00 AM IST",
    signedTimestamp: "15 Mar 2025 | 10:35:40 AM IST",
    digitalSignatureStatus: "Digitally Signed",
    signerName: "Shri P. K. Mehta, CE",
    projectIncharge: "Shri P. K. Mehta, CE (Projects)",
    districtCollector: "Shri Manoj K. Saunik, IAS",
    timeline: "Mar 2025 — Dec 2027",
    delayDays: 21,
    lastUpdated: "2026-09-08",
    totalLandowners: 320,
    proposalsCount: 2,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "PRJ-MH-STATE-2026-010",
    name: "Pune Ring Road Expressway (East Corridor)",
    authority: "Maharashtra State Road Development Corporation (MSRDC)",
    shortAuthority: "MSRDC",
    department: "MSRDC Pune Division",
    ministry: "Public Works Department",
    projectType: "Single State",
    projectCategory: "Access Controlled Expressway",
    publicPurposeCategory: "Metropolitan Bypass Corridor",
    description: "110 km access controlled 8-lane expressway encircling Pune city connecting NH-48 to Pune-Solapur and Pune-Ahmednagar highways.",
    district: "Pune",
    taluka: "Haveli",
    villages: ["Wagholi", "Avalwadi", "Manjari Khurd", "Phursungi"],
    stage: "Compensation",
    status: "Acquisition Ongoing",
    riskLevel: "Low",
    riskScore: 28,
    progress: 72,
    landRequiredHa: 145.8,
    landAcquiredHa: 105.0,
    estimatedBudget: "₹ 850.00 Cr",
    financialYear: "2025–26",
    proposalDate: "2026-01-15",
    creationTimestamp: "15 Jan 2026 | 09:30:00 AM IST",
    signedTimestamp: "15 Jan 2026 | 10:12:00 AM IST",
    digitalSignatureStatus: "Digitally Signed",
    signerName: "Shri A. P. More, SE",
    projectIncharge: "Shri A. P. More, SE (LA)",
    districtCollector: "Dr. Rajesh V. Deshmukh, IAS",
    timeline: "Jan 2026 — Dec 2027",
    delayDays: 0,
    lastUpdated: "2026-09-08",
    totalLandowners: 410,
    proposalsCount: 1,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  }
];

// SHARED PROPOSALS / VARIANTS DATASET
export const initialProposingProposals = [
  {
    id: "PROP-2026-00418",
    projectId: "PRJ-MH-STATE-2026-002",
    projectName: "Pune–Nashik Semi High-Speed Rail Corridor",
    variant: "Package 2 — Haveli-Khed Main Line Alignment",
    name: "Package 2 — Haveli to Khed Rail Right-of-Way Land Acquisition",
    categoryRfctlarr: "Railways & Transport Infrastructure under Schedule 4",
    applicableLaws: "RFCTLARR Act 2013 (Section 4 to 8), Railways Act 1989",
    totalLandRequiredHa: 168.4,
    implementingAgency: "Maharashtra Rail Infrastructure Dev. Corp. (Maharail)",
    executingOrganization: "Maharail Land Acquisition Wing, Pune",
    startDate: "2026-09-01",
    targetDate: "2028-03-31",
    state: "Maharashtra",
    district: "Pune",
    talukas: ["Haveli", "Khed"],
    village: "Waki & Charholi Budruk",
    villages: ["Charholi Budruk", "Dhanore", "Waki"],
    surveyNumbers: ["142/1", "142/2", "188/3", "412/1", "412/2", "415"],
    landClassification: "Private Agricultural & Social Forestry",
    landTypeBreakdown: {
      private: 142.2,
      government: 22.0,
      community: 4.2
    },
    ownersTenantsCount: 420,
    estimatedCost: "₹ 540.00 Cr",
    advanceDeposit: "₹ 120.00 Cr",
    sanctionNumber: "MAHARAIL/LA/2026/SAN-8812",
    issuingAuthority: "Department of Transport & Finance, Govt. of Maharashtra",
    sanctionDate: "2026-08-14",
    isUrgent: true,
    urgencyReason: "Special Infrastructure Mission Fast-Track Corridor — Kumbh Mela 2027 regional transit milestone requirement",
    statutoryBasis: "Section 40(1) RFCTLARR Act 2013 — Urgency Clause for Rail Infrastructure",
    status: "Submitted",
    submissionStage: "Under Review by State Cabinet",
    submittedBy: "Shri V. K. Sharma, CGM (Land)",
    submissionTimestamp: "20 Aug 2026 | 11:30:15 AM IST",
    currentStageExplanation: "Proposal submitted to Principal Secretary (Revenue) for State-level Expert Appraisal Committee formation and Section 4 Notification clearance.",
    previousStages: [
      { name: "Draft Created", timestamp: "12 Aug 2026 | 10:14:00 AM IST", user: "Shri V. K. Sharma", status: "Completed" },
      { name: "SWADESH GIS Parcels Mapped", timestamp: "16 Aug 2026 | 03:22:45 PM IST", user: "Surveyor P. R. Shinde", status: "Completed" },
      { name: "Pre-Proposal AI Analysis Executed", timestamp: "18 Aug 2026 | 02:40:10 PM IST", user: "System / AI Model", status: "Completed" },
      { name: "Proposal Digitally Signed & Submitted", timestamp: "20 Aug 2026 | 11:30:15 AM IST", user: "Shri V. K. Sharma", status: "Completed" },
      { name: "State Cabinet Review", timestamp: "05 Sep 2026 | 10:18:42 AM IST", user: "Principal Secretary", status: "In Progress" }
    ],
    milestones: [
      { name: "Proposal Preparation & GIS Validation", plannedDate: "2026-08-15", actualDate: "2026-08-18", status: "Completed", remarks: "All 168.4 Ha surveyed on GIS." },
      { name: "Submission to State Authority", plannedDate: "2026-08-20", actualDate: "2026-08-20", status: "Completed", remarks: "Forwarded with Class-3 DSC." },
      { name: "SIA Notification & Public Hearings", plannedDate: "2026-10-15", actualDate: "-", status: "In Progress", remarks: "Empaneled agency allocation in progress." },
      { name: "Preliminary Notification (Sec 11)", plannedDate: "2026-12-30", actualDate: "-", status: "Pending", remarks: "Awaiting SIA clearance." },
      { name: "Land Survey & Objections (Sec 15)", plannedDate: "2027-03-31", actualDate: "-", status: "Pending", remarks: "-" },
      { name: "Statutory Award Declaration (Sec 23)", plannedDate: "2027-07-31", actualDate: "-", status: "Pending", remarks: "-" },
      { name: "Direct Benefit Transfer / Compensation", plannedDate: "2027-10-31", actualDate: "-", status: "Pending", remarks: "-" },
      { name: "R&R Resettlement Package", plannedDate: "2027-12-31", actualDate: "-", status: "Pending", remarks: "-" },
      { name: "Final Mutation & Possession", plannedDate: "2028-03-31", actualDate: "-", status: "Pending", remarks: "-" }
    ],
    financeSummary: {
      totalBudget: "₹ 540.00 Cr",
      disbursedToDate: "₹ 0.00 Cr",
      remainingBudget: "₹ 540.00 Cr",
      estimatedOverrun: "₹ 38.50 Cr",
      committedAmount: "₹ 482.00 Cr",
      paymentsLedger: [
        { id: "PFMS-TX-001", account: "Maharail SLAO Escrow", pfmsStatus: "PFMS Verified", date: "2026-08-18 | 03:10:00 PM IST", amount: "₹ 120.00 Cr", purpose: "Advance SLAO Deposit" }
      ]
    },
    riskAssessment: {
      overallRisk: "Medium",
      landRisk: "Medium",
      legalRisk: "High",
      environmentalRisk: "Medium",
      rrRisk: "Medium",
      delayPredictedDays: 75
    }
  },
  {
    id: "PROP-2026-00419",
    projectId: "PRJ-MH-STATE-2026-002",
    projectName: "Pune–Nashik Semi High-Speed Rail Corridor",
    variant: "Package 1 — Chakan Logistics & Station Yard",
    name: "Package 1 — Chakan Agro-Logistics Freight Yard & Terminal",
    categoryRfctlarr: "Industrial & Freight Infrastructure",
    applicableLaws: "RFCTLARR Act 2013",
    totalLandRequiredHa: 112.0,
    implementingAgency: "Maharail",
    executingOrganization: "Maharail Station Development Wing",
    startDate: "2026-11-01",
    targetDate: "2028-06-30",
    state: "Maharashtra",
    district: "Pune",
    talukas: ["Khed"],
    village: "Chakan & Nighoje",
    villages: ["Chakan", "Nighoje"],
    surveyNumbers: ["88/1", "88/2", "92/3", "104"],
    landClassification: "Private Industrial Buffer & Commercial NA",
    landTypeBreakdown: {
      private: 98.0,
      government: 14.0,
      community: 0.0
    },
    ownersTenantsCount: 145,
    estimatedCost: "₹ 410.00 Cr",
    advanceDeposit: "₹ 80.00 Cr",
    sanctionNumber: "MAHARAIL/STN/2026/092",
    issuingAuthority: "Railway Board & Govt. of Maharashtra",
    sanctionDate: "2026-08-25",
    isUrgent: false,
    status: "Draft",
    submissionStage: "Under Preparation",
    submittedBy: "Shri V. K. Sharma, CGM (Land)",
    submissionTimestamp: "Saved as Draft on 02 Sep 2026 | 04:12:10 PM IST",
    currentStageExplanation: "Draft proposal variant being prepared. Awaiting final Sub-Registrar circle valuation rates for MIDC Chakan fringe parcels before submitting for Pre-Proposal Analysis.",
    previousStages: [
      { name: "Draft Created", timestamp: "02 Sep 2026 | 04:12:10 PM IST", user: "Shri V. K. Sharma", status: "In Progress" }
    ],
    milestones: [
      { name: "Proposal Preparation", plannedDate: "2026-09-30", actualDate: "-", status: "In Progress", remarks: "Drafting parcel schedule." },
      { name: "Pre-Proposal AI Review", plannedDate: "2026-10-10", actualDate: "-", status: "Pending", remarks: "-" }
    ],
    financeSummary: {
      totalBudget: "₹ 410.00 Cr",
      disbursedToDate: "₹ 0.00 Cr",
      remainingBudget: "₹ 410.00 Cr",
      estimatedOverrun: "₹ 0.00 Cr",
      committedAmount: "₹ 365.00 Cr",
      paymentsLedger: []
    },
    riskAssessment: {
      overallRisk: "Low",
      landRisk: "Low",
      legalRisk: "Low",
      environmentalRisk: "Low",
      rrRisk: "Low",
      delayPredictedDays: 20
    }
  },
  {
    id: "PROP-2026-00420",
    projectId: "PRJ-MH-STATE-2026-002",
    projectName: "Pune–Nashik Semi High-Speed Rail Corridor",
    variant: "Package 3 — Junnar High-Speed Tunnel Right-of-Way",
    name: "Package 3 — Junnar Ghat Section High-Speed Tunnel Sub-Surface ROW",
    categoryRfctlarr: "Tunnels & Underground Infrastructure",
    applicableLaws: "RFCTLARR Act 2013 & Forest Conservation Act 1980",
    totalLandRequiredHa: 100.1,
    implementingAgency: "Maharail",
    executingOrganization: "Maharail Tunnel Division",
    startDate: "2027-01-01",
    targetDate: "2028-12-31",
    state: "Maharashtra",
    district: "Pune",
    talukas: ["Junnar"],
    village: "Rajgurunagar & Manchar",
    villages: ["Rajgurunagar", "Manchar"],
    surveyNumbers: ["301/A", "305/B", "310"],
    landClassification: "Forest Land & Reserved Mountain Ridge",
    landTypeBreakdown: {
      private: 24.1,
      government: 76.0,
      community: 0.0
    },
    ownersTenantsCount: 85,
    estimatedCost: "₹ 300.00 Cr",
    advanceDeposit: "₹ 60.00 Cr",
    sanctionNumber: "MAHARAIL/TUN/2026/044",
    issuingAuthority: "Forest Dept & Maharail",
    sanctionDate: "2026-08-10",
    isUrgent: false,
    status: "Pre-Proposal Analysis",
    submissionStage: "AI Preliminary Analysis Generated",
    submittedBy: "Shri V. K. Sharma, CGM (Land)",
    submissionTimestamp: "Submitted for Pre-Proposal on 06 Sep 2026 | 02:22:18 PM IST",
    currentStageExplanation: "Pre-Proposal Analysis generated by SWADESH analytical models. High forest clearance risk identified. Proposing officer can review and modify draft before final submission.",
    previousStages: [
      { name: "Draft Created", timestamp: "04 Sep 2026 | 11:00:00 AM IST", user: "Shri V. K. Sharma", status: "Completed" },
      { name: "Pre-Proposal Analysis Generated", timestamp: "06 Sep 2026 | 02:22:18 PM IST", user: "System / AI Model", status: "Completed" }
    ],
    milestones: [
      { name: "Pre-Proposal Analysis", plannedDate: "2026-09-06", actualDate: "2026-09-06", status: "Completed", remarks: "Report ready for review." }
    ],
    financeSummary: {
      totalBudget: "₹ 300.00 Cr",
      disbursedToDate: "₹ 0.00 Cr",
      remainingBudget: "₹ 300.00 Cr",
      estimatedOverrun: "₹ 42.00 Cr",
      committedAmount: "₹ 280.00 Cr",
      paymentsLedger: []
    },
    riskAssessment: {
      overallRisk: "High",
      landRisk: "High",
      legalRisk: "Critical",
      environmentalRisk: "High",
      rrRisk: "Low",
      delayPredictedDays: 95
    }
  }
];

// REAL HISTORICAL PROJECTS DATASET (FOR AI MATCHING & COMPARATIVE ANALYSIS)
export const swadeshHistoricalProjects = [
  {
    id: "HIST-MH-2022-004",
    name: "Konkan Railway Double-Line Capacity Augmentation (Roha-Veer Stretch)",
    authority: "Konkan Railway Corporation Ltd. (KRCL)",
    district: "Raigad",
    taluka: "Roha & Mangaon",
    sector: "Railway Transport Infrastructure",
    landAcquiredHa: 142.5,
    budgetEstimated: "₹ 480.00 Cr",
    budgetActual: "₹ 534.20 Cr",
    costVariancePct: 11.3,
    plannedDurationMonths: 24,
    actualDurationMonths: 31,
    actualDelayDays: 210,
    delayReasons: ["Forest clearance Stage-II delay (9 months)", "18 dispute petitions regarding heirship and compensation rate enhancement"],
    rrFamiliesAffected: 380,
    rrDisplacedFamilies: 65,
    entitlementsDisbursed: "₹ 42.50 Cr R&R Grant + 65 Housing Units",
    outcome: "Successfully Commissioned with 7-month delay and 11.3% cost escalation.",
    keyLesson: "Early forest clearance demarcation and pre-settled circle rate agreements prevent major civil disputes."
  },
  {
    id: "HIST-MH-2023-012",
    name: "Solapur–Bijapur National Highway 4-Laning (NH-52)",
    authority: "National Highways Authority of India (NHAI)",
    district: "Solapur",
    taluka: "Solapur South",
    sector: "National Highway Expansion",
    landAcquiredHa: 220.0,
    budgetEstimated: "₹ 620.00 Cr",
    budgetActual: "₹ 658.00 Cr",
    costVariancePct: 6.1,
    plannedDurationMonths: 18,
    actualDurationMonths: 21,
    actualDelayDays: 90,
    delayReasons: ["Irrigation canal bridge realignment", "PFMS bank account verification name mismatches for 42 landowners"],
    rrFamiliesAffected: 460,
    rrDisplacedFamilies: 32,
    entitlementsDisbursed: "₹ 28.00 Cr R&R Grant",
    outcome: "Completed successfully within 3 months of target buffer.",
    keyLesson: "Aadhaar-7/12 cross verification before Section 11 reduced payment disputes by 80%."
  },
  {
    id: "HIST-MH-2024-019",
    name: "Nagpur Metro Rail Phase-1 (Reach 3 & 4 Corridor)",
    authority: "Maharashtra Metro Rail Corp. (Maha-Metro)",
    district: "Nagpur",
    taluka: "Nagpur Urban & Rural",
    sector: "Railway / Metro Rail Transport",
    landAcquiredHa: 88.6,
    budgetEstimated: "₹ 890.00 Cr",
    budgetActual: "₹ 912.50 Cr",
    costVariancePct: 2.5,
    plannedDurationMonths: 24,
    actualDurationMonths: 26,
    actualDelayDays: 60,
    delayReasons: ["Gaothan market area relocation consensus delays"],
    rrFamiliesAffected: 290,
    rrDisplacedFamilies: 95,
    entitlementsDisbursed: "₹ 65.00 Cr Commercial & Residential Rehabilitation",
    outcome: "Exemplary urban R&R execution with minimum court litigation.",
    keyLesson: "Direct stakeholder townhall meetings in Gram Panchayats averted legal stays."
  },
  {
    id: "HIST-MH-2021-002",
    name: "Mumbai Trans Harbour Link (MTHL / Atal Setu) Chirle Interchange Land Package",
    authority: "Mumbai Metropolitan Region Dev. Authority (MMRDA)",
    district: "Raigad",
    taluka: "Uran",
    sector: "Bridge & Highway Interchange",
    landAcquiredHa: 110.4,
    budgetEstimated: "₹ 740.00 Cr",
    budgetActual: "₹ 835.00 Cr",
    costVariancePct: 12.8,
    plannedDurationMonths: 24,
    actualDurationMonths: 30,
    actualDelayDays: 180,
    delayReasons: ["Coastal CRZ clearance verification", "Mangrove compensation replantation permissions"],
    rrFamiliesAffected: 210,
    rrDisplacedFamilies: 40,
    entitlementsDisbursed: "₹ 35.00 Cr Coastal Community Compensatory Package",
    outcome: "Completed and operational with high regional transit impact.",
    keyLesson: "CRZ and salt-pan land parcels require 6-month buffer for environment clearances."
  }
];

// DYNAMIC AI PRE-PROPOSAL ANALYSIS GENERATOR
// Produces analytical decision-support based on proposal data and historical benchmarks
export function generatePreProposalAIAnalysis(proposal) {
  const isRail = (proposal.categoryRfctlarr || '').toLowerCase().includes('rail') || (proposal.name || '').toLowerCase().includes('rail');
  const isExpressway = (proposal.categoryRfctlarr || '').toLowerCase().includes('expressway') || (proposal.categoryRfctlarr || '').toLowerCase().includes('highway');
  const landArea = parseFloat(proposal.totalLandRequiredHa) || 150;
  const costCr = parseFloat((proposal.estimatedCost || '500').replace(/[^0-9.]/g, '')) || 500;
  const isUrgent = Boolean(proposal.isUrgent);

  // Match historical comparator
  let comparator = swadeshHistoricalProjects[0];
  if (isRail) {
    comparator = swadeshHistoricalProjects[0]; // Konkan Rail double line
  } else if (isExpressway) {
    comparator = swadeshHistoricalProjects[1]; // Solapur-Bijapur
  } else {
    comparator = swadeshHistoricalProjects[2]; // Nagpur Metro
  }

  // Calculate variances
  const historicalAvgCostPerHa = (parseFloat(comparator.budgetEstimated.replace(/[^0-9.]/g, '')) / comparator.landAcquiredHa).toFixed(2);
  const proposedCostPerHa = (costCr / landArea).toFixed(2);
  const costVariancePct = (((proposedCostPerHa - historicalAvgCostPerHa) / historicalAvgCostPerHa) * 100).toFixed(1);

  const predictedDelayDays = isUrgent ? Math.max(45, comparator.actualDelayDays - 50) : comparator.actualDelayDays;
  const estimatedFamilies = Math.round(landArea * 2.5);
  const estimatedEntitlementsCr = (costCr * 0.18).toFixed(2);

  // Multidimensional risks
  const landRisk = landArea > 200 ? "High" : landArea > 100 ? "Medium" : "Low";
  const legalRisk = isUrgent ? "Medium" : "High";
  const envRisk = (proposal.landClassification || '').toLowerCase().includes('forest') ? "High" : "Medium";
  const rrRisk = estimatedFamilies > 300 ? "High" : "Medium";

  let overallRisk = "Medium";
  if (envRisk === "High" || legalRisk === "High") overallRisk = "High";
  if (envRisk === "High" && legalRisk === "High") overallRisk = "Critical";

  return {
    proposalId: proposal.id || "PROP-DRAFT",
    proposalName: proposal.name,
    projectType: proposal.categoryRfctlarr || "Infrastructure",
    district: proposal.district || "Pune",
    generatedTimestamp: new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: true, timeZone: 'Asia/Kolkata'
    }) + ' IST',

    // Summary Section
    summary: {
      projectFeasibility: overallRisk === 'High' || overallRisk === 'Critical' ? "Medium" : "High",
      landRisk,
      legalRisk,
      environmentalRisk: envRisk,
      rrRisk,
      costAssessment: costVariancePct > 15 ? "Higher than Historical Average" : costVariancePct < -15 ? "Lower than Historical Average" : "Reasonable / Well Aligned",
      timelineAssessment: `Predicted Timeline Variance: +${predictedDelayDays} Days`,
      historicalSimilarity: `Strong Match with ${comparator.name} (${comparator.district} District)`
    },

    // 1. Past Project Matching
    pastProjectMatching: [
      {
        previousProject: comparator.name,
        projectId: comparator.id,
        location: `${comparator.district} District, Maharashtra`,
        similarityScore: "87% Match",
        similarityReasons: [
          `Identical infrastructure category (${comparator.sector})`,
          `Comparable land acquisition footprint (${comparator.landAcquiredHa} Ha vs proposed ${landArea} Ha)`,
          `Similar semi-arid Deccan soil classification and revenue circle compensation norms`
        ],
        whatHappened: `Project faced initial ${comparator.actualDelayDays} days delay primarily due to ${comparator.delayReasons.join(', ')}.`,
        finalOutcome: comparator.outcome,
        canFetchDetails: true,
        historicalDetails: comparator
      },
      {
        previousProject: swadeshHistoricalProjects[2].name,
        projectId: swadeshHistoricalProjects[2].id,
        location: `${swadeshHistoricalProjects[2].district} District`,
        similarityScore: "74% Match",
        similarityReasons: [
          "Similar urban-rural transition corridor",
          "Fast-track land acquisition committee structure"
        ],
        whatHappened: `Acquisition of ${swadeshHistoricalProjects[2].landAcquiredHa} Ha completed in ${swadeshHistoricalProjects[2].actualDurationMonths} months with only ${swadeshHistoricalProjects[2].actualDelayDays} days delay.`,
        finalOutcome: swadeshHistoricalProjects[2].outcome,
        canFetchDetails: true,
        historicalDetails: swadeshHistoricalProjects[2]
      }
    ],

    // 2. R&R Estimation
    rrEstimation: {
      affectedFamilies: estimatedFamilies,
      displacedFamiliesEstimate: Math.round(estimatedFamilies * 0.22),
      likelyEntitlementsCost: `₹ ${estimatedEntitlementsCr} Cr (Estimated)`,
      potentialSocialOutcome: "Major agricultural livelihood transition. Requires Gram Sabha resolution and designated R&R resettlement colony within 5 km buffer to mitigate community agitation.",
      dataCertainty: "Estimated / Preliminary Social Survey Projection (Not Official Award)"
    },

    // 3. Legal / Multi-Dimensional Risk
    multidimensionalRisk: {
      overallPreliminaryRisk: overallRisk,
      dimensions: [
        { dimension: "Forest Permissions", rating: envRisk, notes: "Presence of notified social forestry / reserve pockets requiring MoEF Stage-1 clearance." },
        { dimension: "Environmental Clearances", rating: "Medium", notes: "Requires Environmental Impact Assessment (EIA) validation for drainage canal buffer." },
        { dimension: "Land Classification & Titles", rating: "Medium", notes: "Approx 12% parcels hold joint heirship claims requiring Tahsildar summary inquiry." },
        { dimension: "Statutory Restrictions", rating: legalRisk, notes: isUrgent ? "Section 40 urgency invocation requires Cabinet sanction before possession." : "Standard Section 4 to Section 19 statutory timeline applies." },
        { dimension: "Overlapping Infrastructure Claims", rating: "Low", notes: "No major overlapping high-tension electrical line or gas pipeline recorded." }
      ]
    },

    // 4. Delay Prediction
    delayPrediction: {
      historicalAverageDelay: `+${comparator.actualDelayDays} days`,
      commonCauses: comparator.delayReasons,
      areaSpecificPattern: `${proposal.district || 'Pune'} District historical median land acquisition cycle is 22 months (State average: 19 months).`,
      estimatedProposalDelay: `${Math.max(45, predictedDelayDays - 20)} – ${predictedDelayDays + 25} days`,
      analyticalNote: "Analytical model projection based on district litigation density and agency clearance speed."
    },

    // 5. Cost Validation
    costValidation: {
      proposedCost: `₹ ${costCr.toFixed(2)} Cr`,
      proposedCostPerHa: `₹ ${proposedCostPerHa} Cr/Ha`,
      comparableHistoricalCostPerHa: `₹ ${historicalAvgCostPerHa} Cr/Ha (${comparator.id})`,
      predictedCostRange: `₹ ${(costCr * 0.92).toFixed(2)} Cr – ₹ ${(costCr * 1.15).toFixed(2)} Cr`,
      variancePct: `${costVariancePct > 0 ? '+' : ''}${costVariancePct}%`,
      varianceAssessment: costVariancePct > 10 ? "Higher than historical benchmark due to recent 2025–26 Sub-Registrar circle rate revision in the region." : "Cost estimate is well aligned with prevailing Ready Reckoner rates.",
      reasonsForDifference: [
        "Annual increase in Ready Reckoner land valuation index (+8% CAGR in district)",
        "Inclusion of 100% Solatium and 12% additional interest component under RFCTLARR Act 2013"
      ]
    },

    // 6. Time Prediction
    timePrediction: {
      proposedDuration: "24 Months (Targeted)",
      historicalComparableDuration: `${comparator.actualDurationMonths} Months (${comparator.id})`,
      predictedDuration: `${Math.round(24 + (predictedDelayDays / 30))} Months`,
      varianceAssessment: `Potential variance of +${Math.round(predictedDelayDays / 30)} Months without fast-track SIA appraisal.`
    },

    // 7. Benefits / Departmental Value
    departmentalBenefits: [
      { category: "Public Benefit", detail: "Connects 14 major agricultural rural hubs with rapid urban transit reducing travel time by 60%." },
      { category: "Infrastructure Value", detail: "Constructs a future-ready dual-gauge high-speed transit corridor supporting electric freight locomotives." },
      { category: "Economic Impact", detail: "Direct farm-to-market perishable produce delivery to Mumbai & Pune consumption centers, preventing post-harvest crop loss." },
      { category: "Employment Generation", detail: "Estimated 1,800 direct construction jobs and 450 long-term operational maintenance positions." },
      { category: "Departmental Objective", detail: "Achieves Maharail 2028 State Infrastructure connectivity masterplan milestone." }
    ]
  };
}

// PROPOSING BODY DOCUMENTS (WITH VERSIONING)
export const initialProposingDocuments = [
  {
    id: "DOC-PB-001",
    projectId: "PRJ-MH-STATE-2026-002",
    projectName: "Pune–Nashik Semi High-Speed Rail Corridor",
    proposalId: "PROP-2026-00418",
    name: "Detailed Project Report (DPR) — Maharail Pune-Nashik Rail.pdf",
    type: "Project Detail Report",
    version: 2,
    uploadedBy: "Shri V. K. Sharma",
    designation: "Chief General Manager (Land)",
    department: "Maharail LA Wing",
    uploadDate: "20 Aug 2026",
    exactTimestamp: "20 Aug 2026 | 11:28:42 AM IST",
    status: "Verified",
    digitalSignatureStatus: "Digitally Signed",
    signerName: "Shri V. K. Sharma",
    fileSize: "18.4 MB",
    versions: [
      { version: 1, uploadedBy: "Shri P. R. Shinde", date: "10 Aug 2026", timestamp: "10 Aug 2026 | 04:15:00 PM IST", status: "Superseded", remarks: "Initial draft alignment." },
      { version: 2, uploadedBy: "Shri V. K. Sharma", date: "20 Aug 2026", timestamp: "20 Aug 2026 | 11:28:42 AM IST", status: "Active & Verified", remarks: "Updated with revised station yard coordinates." }
    ]
  },
  {
    id: "DOC-PB-002",
    projectId: "PRJ-MH-STATE-2026-002",
    projectName: "Pune–Nashik Semi High-Speed Rail Corridor",
    proposalId: "PROP-2026-00418",
    name: "Feasibility & Traffic Demand Study Report.pdf",
    type: "Feasibility Report",
    version: 1,
    uploadedBy: "Shri V. K. Sharma",
    designation: "Chief General Manager (Land)",
    department: "Maharail",
    uploadDate: "18 Aug 2026",
    exactTimestamp: "18 Aug 2026 | 02:40:19 PM IST",
    status: "Verified",
    digitalSignatureStatus: "Digitally Signed",
    signerName: "Shri V. K. Sharma",
    fileSize: "12.1 MB",
    versions: [
      { version: 1, uploadedBy: "Shri V. K. Sharma", date: "18 Aug 2026", timestamp: "18 Aug 2026 | 02:40:19 PM IST", status: "Active & Verified", remarks: "Approved by Board of Directors." }
    ]
  },
  {
    id: "DOC-PB-003",
    projectId: "PRJ-MH-STATE-2026-002",
    projectName: "Pune–Nashik Semi High-Speed Rail Corridor",
    proposalId: "PROP-2026-00418",
    name: "Administrator Approval & In-Principle Sanction.pdf",
    type: "Administrator Approval",
    version: 1,
    uploadedBy: "Shri V. K. Sharma",
    designation: "Chief General Manager (Land)",
    department: "Maharail",
    uploadDate: "19 Aug 2026",
    exactTimestamp: "19 Aug 2026 | 10:14:30 AM IST",
    status: "Verified",
    digitalSignatureStatus: "Digitally Signed",
    signerName: "Principal Secretary (Transport)",
    fileSize: "4.8 MB",
    versions: [
      { version: 1, uploadedBy: "Shri V. K. Sharma", date: "19 Aug 2026", timestamp: "19 Aug 2026 | 10:14:30 AM IST", status: "Active & Verified", remarks: "State Cabinet sanction copy." }
    ]
  },
  {
    id: "DOC-PB-004",
    projectId: "PRJ-MH-STATE-2026-002",
    projectName: "Pune–Nashik Semi High-Speed Rail Corridor",
    proposalId: "PROP-2026-00418",
    name: "Revenue Cadastral Survey Map — Haveli & Khed Stretch.pdf",
    type: "Survey Map",
    version: 1,
    uploadedBy: "Shri P. R. Shinde",
    designation: "Senior Surveyor",
    department: "Revenue Cadastral Wing",
    uploadDate: "18 Aug 2026",
    exactTimestamp: "18 Aug 2026 | 03:15:00 PM IST",
    status: "Verified",
    digitalSignatureStatus: "Digitally Signed",
    signerName: "Shri P. R. Shinde",
    fileSize: "28.6 MB",
    versions: [
      { version: 1, uploadedBy: "Shri P. R. Shinde", date: "18 Aug 2026", timestamp: "18 Aug 2026 | 03:15:00 PM IST", status: "Active & Verified", remarks: "Cadastral boundaries verified against 7/12 records." }
    ]
  }
];

// AUDIT TRAIL LOGS
export const initialProposingAuditLogs = [
  {
    id: "AUD-PB-001",
    action: "Project Created",
    user: "Shri V. K. Sharma, CGM",
    department: "Maharail Land Wing",
    timestamp: "20 Aug 2026 | 11:30:15 AM IST",
    previousStatus: "Draft",
    newStatus: "Created",
    remarks: "Project officially created following digital signing.",
    signatureStatus: "Digitally Signed",
    projectId: "PRJ-MH-STATE-2026-002"
  },
  {
    id: "AUD-PB-002",
    action: "Project Digitally Signed",
    user: "Shri V. K. Sharma, CGM",
    department: "Maharail Land Wing",
    timestamp: "20 Aug 2026 | 11:45:22 AM IST",
    previousStatus: "-",
    newStatus: "-",
    remarks: "Class-3 DSC Token Certificate applied successfully (Serial #DS-MH-MAHARAIL-2026-99214A).",
    signatureStatus: "Digitally Signed",
    projectId: "PRJ-MH-STATE-2026-002"
  },
  {
    id: "AUD-PB-003",
    action: "Proposal Created",
    user: "Shri V. K. Sharma, CGM",
    department: "Maharail Land Wing",
    timestamp: "20 Aug 2026 | 11:20:00 AM IST",
    previousStatus: "Draft",
    newStatus: "Under Preparation",
    remarks: "Package 2 proposal variant created under Pune-Nashik Rail Corridor.",
    signatureStatus: "-",
    projectId: "PRJ-MH-STATE-2026-002",
    proposalId: "PROP-2026-00418"
  },
  {
    id: "AUD-PB-004",
    action: "Pre-Proposal Analysis Generated",
    user: "System / AI Model",
    department: "SWADESH Decision Support Engine",
    timestamp: "18 Aug 2026 | 02:40:10 PM IST",
    previousStatus: "Under Preparation",
    newStatus: "Pre-Proposal Analysis",
    remarks: "Comparative evaluation against Konkan Rail double line completed with R&R impact estimates.",
    signatureStatus: "System Generated",
    projectId: "PRJ-MH-STATE-2026-002",
    proposalId: "PROP-2026-00418"
  },
  {
    id: "AUD-PB-005",
    action: "Proposal Submitted",
    user: "Shri V. K. Sharma, CGM",
    department: "Maharail Land Wing",
    timestamp: "20 Aug 2026 | 11:30:15 AM IST",
    previousStatus: "Pre-Proposal Analysis",
    newStatus: "Submitted",
    remarks: "Submitted to Principal Secretary (Revenue) for State Cabinet review and Collector approval.",
    signatureStatus: "Digitally Signed",
    projectId: "PRJ-MH-STATE-2026-002",
    proposalId: "PROP-2026-00418"
  }
];

// PRIORITY ALERTS (SYSTEM / AI GENERATED)
export const initialProposingAlerts = [
  {
    id: "ALT-PB-01",
    severity: "High",
    title: "Potential land overlap detected in Package 2 alignment",
    subtitle: "Flagged by SWADESH GIS Engine • 2h ago",
    details: [
      "Survey No. 412/1 in Waki Village overlaps 4.2 Ha of protected Social Forestry land.",
      "Requires compensatory afforestation proposal to be attached before State Cabinet review.",
      "Overlap detected against Pune Forest Division territorial survey 2024."
    ],
    proposalId: "PROP-2026-00418",
    projectId: "PRJ-MH-STATE-2026-002",
    actionLabel: "View proposal & GIS alignment →"
  },
  {
    id: "ALT-PB-02",
    severity: "Medium",
    title: "Project may exceed estimated implementation timeline (+75 days)",
    subtitle: "Flagged by AI delay prediction model • 1d ago",
    details: [
      "Historical comparator (Konkan Rail Double-Line) experienced 210 days delay during Stage-II forest clearance.",
      "Junnar Ghat section soil survey indicates potential slow tunneling progress during monsoon months.",
      "Suggested action: Submit advance forest clearance application immediately."
    ],
    proposalId: "PROP-2026-00418",
    projectId: "PRJ-MH-STATE-2026-002",
    actionLabel: "View delay analysis report →"
  },
  {
    id: "ALT-PB-03",
    severity: "Medium",
    title: "R&R impact appears higher than initial estimate",
    subtitle: "Flagged by social impact model • 3d ago",
    details: [
      "420 families identified across Charholi and Waki vs initial preliminary estimate of 280 families.",
      "45 commercial establishments require livelihood rehabilitation assistance under First Schedule.",
      "Budget impact: Approx ₹ 18.5 Cr additional R&R compensation required."
    ],
    proposalId: "PROP-2026-00418",
    projectId: "PRJ-MH-STATE-2026-002",
    actionLabel: "Review R&R preliminary report →"
  }
];

// NOTIFICATIONS
export const initialProposingNotifications = [
  {
    id: "PNOTIF-001",
    title: "Proposal Under State Cabinet Review",
    category: "Authority Response",
    message: "Proposal PROP-2026-00418 (Package 2) received and currently under appraisal by Principal Secretary (Revenue).",
    timestamp: "05 Sep 2026 | 10:18:42 AM IST",
    read: false,
    projectId: "PRJ-MH-STATE-2026-002",
    proposalId: "PROP-2026-00418"
  },
  {
    id: "PNOTIF-002",
    title: "Document Correction Required",
    category: "Action Required",
    message: "District Collectorate Pune requested updated sub-registrar valuation sheet for Survey 188/3 (Haveli stretch).",
    timestamp: "04 Sep 2026 | 02:45:10 PM IST",
    read: false,
    projectId: "PRJ-MH-STATE-2026-002",
    proposalId: "PROP-2026-00418"
  },
  {
    id: "PNOTIF-003",
    title: "Pre-Proposal Analysis Available",
    category: "Analysis",
    message: "AI decision-support analysis for Package 3 (Junnar Tunnel Right-of-Way) has been generated and is ready for review.",
    timestamp: "06 Sep 2026 | 02:22:18 PM IST",
    read: false,
    projectId: "PRJ-MH-STATE-2026-002",
    proposalId: "PROP-2026-00420"
  },
  {
    id: "PNOTIF-004",
    title: "Digital Signature Certificate Notice",
    category: "System",
    message: "Class-3 DSC token validity confirmed active until 31 Dec 2026 (NIC CA Sub-CA 2026).",
    timestamp: "01 Sep 2026 | 09:00:00 AM IST",
    read: true
  }
];

// MOCK CADASTRAL GIS PARCELS FOR INTERACTIVE SELECTION
export const swadeshCadastralParcels = [
  { id: "PARCEL-HAV-142-1", surveyNo: "142/1", village: "Charholi Budruk", taluka: "Haveli", district: "Pune", areaHa: 2.85, type: "Private Agricultural", landowner: "Baburao Vitthalrao Deshmukh", subRegistrarRate: "₹ 1,850/sq.m", selected: true },
  { id: "PARCEL-HAV-142-2", surveyNo: "142/2", village: "Charholi Budruk", taluka: "Haveli", district: "Pune", areaHa: 1.95, type: "Private Agricultural", landowner: "Suresh Kondiba Shinde", subRegistrarRate: "₹ 1,850/sq.m", selected: true },
  { id: "PARCEL-HAV-188-3", surveyNo: "188/3", village: "Dhanore", taluka: "Haveli", district: "Pune", areaHa: 3.40, type: "Private Irrigated", landowner: "Pandurang Rama Gaikwad", subRegistrarRate: "₹ 2,100/sq.m", selected: true },
  { id: "PARCEL-KHD-412-1", surveyNo: "412/1", village: "Waki", taluka: "Khed", district: "Pune", areaHa: 4.20, type: "Government Social Forestry", landowner: "Forest Department, Govt. of Maharashtra", subRegistrarRate: "₹ 950/sq.m", selected: true },
  { id: "PARCEL-KHD-412-2", surveyNo: "412/2", village: "Waki", taluka: "Khed", district: "Pune", areaHa: 2.10, type: "Private Agricultural", landowner: "Anand Dattatray Patil", subRegistrarRate: "₹ 1,400/sq.m", selected: true },
  { id: "PARCEL-KHD-415", surveyNo: "415", village: "Waki", taluka: "Khed", district: "Pune", areaHa: 1.80, type: "Community Gairan Land", landowner: "Gram Panchayat Waki", subRegistrarRate: "₹ 1,100/sq.m", selected: true },
  { id: "PARCEL-KHD-502", surveyNo: "502/A", village: "Chakan", taluka: "Khed", district: "Pune", areaHa: 5.50, type: "Non-Agricultural Commercial", landowner: "Chakan Industrial Logistics Ltd.", subRegistrarRate: "₹ 3,800/sq.m", selected: false },
  { id: "PARCEL-KHD-503", surveyNo: "503/B", village: "Chakan", taluka: "Khed", district: "Pune", areaHa: 3.20, type: "Private Agricultural", landowner: "Tukaram Genba Kadam", subRegistrarRate: "₹ 1,600/sq.m", selected: false }
];

export const initialParcelsCadastral = [
  {
    id: "PARCEL-HAV-142-1",
    surveyNo: "142/1",
    village: "Charholi Budruk",
    taluka: "Haveli",
    district: "Pune",
    areaHa: 2.85,
    landType: "Private Agricultural",
    owners: 3,
    estimatedComp: 3.42,
    encumbrance: "None / Clear",
    package: "Package 1A",
    lat: 18.6345,
    lng: 73.8930,
    polygon: [
      [18.6335, 73.8918],
      [18.6358, 73.8920],
      [18.6355, 73.8942],
      [18.6332, 73.8938]
    ]
  },
  {
    id: "PARCEL-HAV-142-2",
    surveyNo: "142/2",
    village: "Charholi Budruk",
    taluka: "Haveli",
    district: "Pune",
    areaHa: 1.95,
    landType: "Private Agricultural",
    owners: 2,
    estimatedComp: 2.34,
    encumbrance: "None / Clear",
    package: "Package 1A",
    lat: 18.6365,
    lng: 73.8960,
    polygon: [
      [18.6355, 73.8945],
      [18.6378, 73.8950],
      [18.6372, 73.8975],
      [18.6350, 73.8970]
    ]
  },
  {
    id: "PARCEL-HAV-188-3",
    surveyNo: "188/3",
    village: "Dhanore",
    taluka: "Haveli",
    district: "Pune",
    areaHa: 3.40,
    landType: "Private Irrigated",
    owners: 5,
    estimatedComp: 4.80,
    encumbrance: "Multiple Co-Sharers",
    package: "Package 1A",
    lat: 18.6520,
    lng: 73.9180,
    polygon: [
      [18.6505, 73.9160],
      [18.6535, 73.9165],
      [18.6530, 73.9200],
      [18.6500, 73.9195]
    ]
  },
  {
    id: "PARCEL-KHD-412-1",
    surveyNo: "412/1",
    village: "Waki",
    taluka: "Khed",
    district: "Pune",
    areaHa: 4.20,
    landType: "Government Social Forestry",
    owners: 1,
    estimatedComp: 1.89,
    encumbrance: "None / Clear",
    package: "Package 1B",
    lat: 18.7330,
    lng: 73.8730,
    polygon: [
      [18.7315, 73.8710],
      [18.7348, 73.8715],
      [18.7342, 73.8750],
      [18.7310, 73.8745]
    ]
  },
  {
    id: "PARCEL-KHD-412-2",
    surveyNo: "412/2",
    village: "Waki",
    taluka: "Khed",
    district: "Pune",
    areaHa: 2.10,
    landType: "Private Agricultural",
    owners: 2,
    estimatedComp: 2.52,
    encumbrance: "None / Clear",
    package: "Package 1B",
    lat: 18.7360,
    lng: 73.8770,
    polygon: [
      [18.7345, 73.8752],
      [18.7375, 73.8758],
      [18.7370, 73.8790],
      [18.7340, 73.8785]
    ]
  },
  {
    id: "PARCEL-KHD-415",
    surveyNo: "415",
    village: "Waki",
    taluka: "Khed",
    district: "Pune",
    areaHa: 1.80,
    landType: "Community Gairan Land",
    owners: 1,
    estimatedComp: 0.95,
    encumbrance: "Gram Panchayat NOC Pending",
    package: "Package 1B",
    lat: 18.7390,
    lng: 73.8820,
    polygon: [
      [18.7375, 73.8805],
      [18.7405, 73.8810],
      [18.7400, 73.8840],
      [18.7370, 73.8835]
    ]
  },
  {
    id: "PARCEL-KHD-502",
    surveyNo: "502/A",
    village: "Chakan",
    taluka: "Khed",
    district: "Pune",
    areaHa: 5.50,
    landType: "Non-Agricultural Commercial",
    owners: 4,
    estimatedComp: 11.50,
    encumbrance: "Commercial Tenancies",
    package: "Package 2",
    lat: 18.7610,
    lng: 73.8560,
    polygon: [
      [18.7590, 73.8535],
      [18.7630, 73.8540],
      [18.7625, 73.8585],
      [18.7585, 73.8580]
    ]
  },
  {
    id: "PARCEL-KHD-503",
    surveyNo: "503/B",
    village: "Chakan",
    taluka: "Khed",
    district: "Pune",
    areaHa: 3.20,
    landType: "Private Agricultural",
    owners: 3,
    estimatedComp: 3.84,
    encumbrance: "None / Clear",
    package: "Package 2",
    lat: 18.7645,
    lng: 73.8610,
    polygon: [
      [18.7630, 73.8590],
      [18.7662, 73.8595],
      [18.7658, 73.8630],
      [18.7625, 73.8625]
    ]
  },
  {
    id: "PARCEL-SHR-204",
    surveyNo: "204/1",
    village: "Sanaswadi",
    taluka: "Shirur",
    district: "Pune",
    areaHa: 4.60,
    landType: "Private Agricultural",
    owners: 4,
    estimatedComp: 5.20,
    encumbrance: "None / Clear",
    package: "Package 2",
    lat: 18.6710,
    lng: 74.0720,
    polygon: [
      [18.6690, 74.0700],
      [18.6730, 74.0705],
      [18.6725, 74.0745],
      [18.6685, 74.0740]
    ]
  },
  {
    id: "PARCEL-SHR-208",
    surveyNo: "208/3",
    village: "Sanaswadi",
    taluka: "Shirur",
    district: "Pune",
    areaHa: 2.40,
    landType: "Barren / Industrial Buffer",
    owners: 2,
    estimatedComp: 2.88,
    encumbrance: "None / Clear",
    package: "Package 2",
    lat: 18.6740,
    lng: 74.0770,
    polygon: [
      [18.6725, 74.0750],
      [18.6755, 74.0755],
      [18.6750, 74.0790],
      [18.6720, 74.0785]
    ]
  },
  {
    id: "PARCEL-AMB-109",
    surveyNo: "109/2",
    village: "Manchar",
    taluka: "Ambegaon",
    district: "Pune",
    areaHa: 3.75,
    landType: "Private Irrigated",
    owners: 6,
    estimatedComp: 4.50,
    encumbrance: "Inheritance Mutation In Progress",
    package: "Package 3",
    lat: 18.9930,
    lng: 73.9430,
    polygon: [
      [18.9910, 73.9410],
      [18.9950, 73.9415],
      [18.9945, 73.9455],
      [18.9905, 73.9450]
    ]
  },
  {
    id: "PARCEL-AMB-114",
    surveyNo: "114/4",
    village: "Manchar",
    taluka: "Ambegaon",
    district: "Pune",
    areaHa: 1.65,
    landType: "Government Revenue Land",
    owners: 1,
    estimatedComp: 0.82,
    encumbrance: "None / Clear",
    package: "Package 3",
    lat: 18.9970,
    lng: 73.9480,
    polygon: [
      [18.9955, 73.9465],
      [18.9985, 73.9470],
      [18.9980, 73.9500],
      [18.9950, 73.9495]
    ]
  },
  {
    id: "PARCEL-JUN-301",
    surveyNo: "301/1",
    village: "Narayangaon",
    taluka: "Junnar",
    district: "Pune",
    areaHa: 4.10,
    landType: "Private Agricultural",
    owners: 3,
    estimatedComp: 4.92,
    encumbrance: "None / Clear",
    package: "Package 3",
    lat: 19.1170,
    lng: 73.9760,
    polygon: [
      [19.1150, 73.9740],
      [19.1190, 73.9745],
      [19.1185, 73.9785],
      [19.1145, 73.9780]
    ]
  },
  {
    id: "PARCEL-JUN-305",
    surveyNo: "305/A",
    village: "Narayangaon",
    taluka: "Junnar",
    district: "Pune",
    areaHa: 2.80,
    landType: "Forest Land Class-C",
    owners: 1,
    estimatedComp: 1.40,
    encumbrance: "Forest Stage-I Clearance Pending",
    package: "Package 3",
    lat: 19.1210,
    lng: 73.9810,
    polygon: [
      [19.1195, 73.9795],
      [19.1225, 73.9800],
      [19.1220, 73.9830],
      [19.1190, 73.9825]
    ]
  }
];

export const proposedCorridorAlignment = [
  [18.6345, 73.8930],
  [18.6520, 73.9180],
  [18.7330, 73.8730],
  [18.7610, 73.8560],
  [18.9930, 73.9430],
  [19.1170, 73.9760]
];

export const corridorMilestones = [
  { label: 'CH 0+000 (Charholi / Haveli)', lat: 18.6345, lng: 73.8930 },
  { label: 'CH 12+400 (Waki / Khed)', lat: 18.7330, lng: 73.8730 },
  { label: 'CH 24+800 (Chakan Hub)', lat: 18.7610, lng: 73.8560 },
  { label: 'CH 48+200 (Manchar / Ambegaon)', lat: 18.9930, lng: 73.9430 },
  { label: 'CH 65+000 (Narayangaon / Junnar)', lat: 19.1170, lng: 73.9760 }
];

