// District Collector Level Mock Data for SWADESH Revenue Department Platform

export const initialCollectorProfile = {
  name: "Dr. Rajesh V. Deshmukh, IAS",
  role: "District Collector & District Magistrate",
  id: "COL-MH-PUNE-001",
  cadre: "IAS 2008 Batch (Maharashtra Cadre)",
  district: "Pune District",
  division: "Pune Revenue Division",
  department: "Department of Revenue & Disaster Management, Govt. of Maharashtra",
  govtId: "MH-IAS-COL-2008-042",
  email: "collector.pune@maharashtra.gov.in",
  phone: "+91 20 2612 3340",
  officeAddress: "Collectorate Office, Station Road, Opp. Pune Railway Station, Pune - 411001",
  digitalSignStatus: "Valid (Class 3 DSC Active)",
  signCertIssuer: "NIC CA Sub-CA 2026"
};

export const collectorDistrictStats = {
  totalProjects: 48,
  ongoingProjects: 31,
  completedProjects: 17,
  totalLandRequiredHa: 12850,
  totalLandAcquiredHa: 8420,
  acquisitionPercentage: 65.5,
  totalEstCompensation: "₹ 4,850.00 Cr",
  totalDisbursedCompensation: "₹ 3,120.40 Cr",
  disbursementPercentage: 64.3,
  totalAffectedLandowners: 18450,
  totalAffectedVillages: 142,
  totalTalukas: 13,
  pendingCollectorApprovals: 6,
  pendingSiaReviews: 4,
  activeStateDisputes: 3,
  highRiskProjects: 5
};

export const collectorTalukasProgress = [
  { id: "TAL-01", taluka: "Haveli", projects: 12, landRequired: 2500, landAcquired: 1800, completion: 72, activeOfficers: 8, pendingApprovals: 2, riskScore: 28 },
  { id: "TAL-02", taluka: "Mulshi", projects: 8, landRequired: 1900, landAcquired: 1100, completion: 58, activeOfficers: 5, pendingApprovals: 1, riskScore: 62 },
  { id: "TAL-03", taluka: "Khed", projects: 9, landRequired: 2100, landAcquired: 1550, completion: 74, activeOfficers: 6, pendingApprovals: 1, riskScore: 22 },
  { id: "TAL-04", taluka: "Maval", projects: 7, landRequired: 1850, landAcquired: 1220, completion: 66, activeOfficers: 5, pendingApprovals: 1, riskScore: 45 },
  { id: "TAL-05", taluka: "Shirur", projects: 5, landRequired: 1400, landAcquired: 1050, completion: 75, activeOfficers: 4, pendingApprovals: 0, riskScore: 18 },
  { id: "TAL-06", taluka: "Purandar", projects: 4, landRequired: 2100, landAcquired: 900, completion: 43, activeOfficers: 4, pendingApprovals: 1, riskScore: 84 },
  { id: "TAL-07", taluka: "Baramati", projects: 3, landRequired: 1000, landAcquired: 800, completion: 80, activeOfficers: 3, pendingApprovals: 0, riskScore: 15 }
];

export const collectorVillageProgress = [
  { village: "Wagholi", taluka: "Haveli", project: "Pune Ring Road Expressway", requiredHa: 145.8, acquiredHa: 98.4, completion: 67.5, landowners: 410, pendingComp: 55, risk: "Medium" },
  { village: "Avalwadi", taluka: "Haveli", project: "Pune Ring Road Expressway", requiredHa: 88.2, acquiredHa: 62.0, completion: 70.3, landowners: 245, pendingComp: 28, risk: "Low" },
  { village: "Manjari Khurd", taluka: "Haveli", project: "Pune Ring Road Expressway", requiredHa: 112.0, acquiredHa: 76.5, completion: 68.3, landowners: 310, pendingComp: 42, risk: "Low" },
  { village: "Male", taluka: "Mulshi", project: "Mulshi Dam Canal Project", requiredHa: 195.2, acquiredHa: 110.0, completion: 56.4, landowners: 290, pendingComp: 85, risk: "High" },
  { village: "Nighoje", taluka: "Khed", project: "MIDC Chakan Phase-V", requiredHa: 210.5, acquiredHa: 185.0, completion: 87.9, landowners: 580, pendingComp: 18, risk: "Low" },
  { village: "Khed Shivapur", taluka: "Haveli", project: "NH-48 Highway Expansion", requiredHa: 78.4, acquiredHa: 65.2, completion: 83.2, landowners: 230, pendingComp: 12, risk: "Low" },
  { village: "Pargaon", taluka: "Purandar", project: "Purandar International Airport Express", requiredHa: 450.0, acquiredHa: 180.0, completion: 40.0, landowners: 890, pendingComp: 320, risk: "High" }
];

export const collectorStagePipeline = [
  { stage: "Proposal Submitted", count: 4, percentage: 8.3, status: "Blue" },
  { stage: "Project Approval", count: 6, percentage: 12.5, status: "Purple" },
  { stage: "SIA", count: 4, percentage: 8.3, status: "Orange" },
  { stage: "Expert Appraisal", count: 3, percentage: 6.3, status: "Orange" },
  { stage: "Preliminary Notification", count: 5, percentage: 10.4, status: "Blue" },
  { stage: "Land Survey & Verification", count: 6, percentage: 12.5, status: "Orange" },
  { stage: "Objections", count: 3, percentage: 6.3, status: "Red" },
  { stage: "Compensation", count: 5, percentage: 10.4, status: "Orange" },
  { stage: "Award", count: 4, percentage: 8.3, status: "Green" },
  { stage: "Payment", count: 3, percentage: 6.3, status: "Green" },
  { stage: "Final Mutation", count: 2, percentage: 4.2, status: "Green" },
  { stage: "Completed", count: 17, percentage: 35.4, status: "Green" }
];

export const collectorPendingProjectProposals = [
  {
    id: "PRJ-PROP-2026-04",
    name: "Pune-Nashik Semi High-Speed Rail Corridor (Haveli-Khed Stretch)",
    proposingBody: "Maharashtra Rail Infrastructure Development Corporation (Maharail)",
    proposingOfficer: "Shri V. K. Sharma, Chief General Manager (Land)",
    submissionDate: "2026-08-20",
    projectType: "Railway Transport Infrastructure",
    purpose: "Construction of 135 km high-speed rail line connecting Pune & Nashik to reduce transit time to 2 hours and spur regional agricultural freight corridors.",
    talukaCount: 3,
    talukas: ["Haveli", "Khed", "Junnar"],
    villageCount: 14,
    villages: ["Charholi Budruk", "Dhanore", "Waki", "Chakan", "Rajgurunagar", "Manchar"],
    landRequiredHa: 380.5,
    estimatedCost: "₹ 1,250.00 Cr",
    timeline: "2026 - 2028 (24 Months)",
    urgencyLevel: "High Priority (State Infrastructure Mission)",
    proposedMapUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
    officialGisMapUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80",
    boundaryDiscrepancies: [
      { type: "Forest Land Encroachment", parcel: "Khed / Survey 412", details: "Proposed boundary overlaps 4.2 Ha of protected Social Forestry land in Waki." },
      { type: "Irrigation Canal Buffer", parcel: "Haveli / Survey 188", details: "Proposed alignment violates 30m buffer zone of Mula-Mutha Right Canal." }
    ],
    affectedParcelsCount: 420,
    affectedLandownersCount: 650,
    status: "Awaiting Collector Approval",
    proposalDoc: "PRJ_PROPOSAL_MAHARAIL_PUNE_NASHIK_2026.pdf"
  },
  {
    id: "PRJ-PROP-2026-05",
    name: "Purandar Cargo & Logistics Park Access Expressway",
    proposingBody: "Maharashtra State Road Development Corporation (MSRDC)",
    proposingOfficer: "Shri A. P. More, Superintending Engineer (Land Acquisition)",
    submissionDate: "2026-08-25",
    projectType: "Freight & Airport Expressway Access",
    purpose: "Dedicated 6-lane access expressway connecting NH-48 to proposed Cargo Hub in Purandar Taluka.",
    talukaCount: 2,
    talukas: ["Purandar", "Haveli"],
    villageCount: 8,
    villages: ["Pargaon", "Rajewadi", "Saswad", "Kumbharvalan"],
    landRequiredHa: 240.0,
    estimatedCost: "₹ 680.00 Cr",
    timeline: "2026 - 2027 (18 Months)",
    urgencyLevel: "Kumbh & Cargo Fast-Track",
    proposedMapUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    officialGisMapUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80",
    boundaryDiscrepancies: [
      { type: "Gaothan Village Boundary", parcel: "Purandar / Survey 92", details: "0.8 Ha inside Pargaon Gaothan residential Zone requires R&R relocation plan." }
    ],
    affectedParcelsCount: 280,
    affectedLandownersCount: 410,
    status: "Awaiting Collector Approval",
    proposalDoc: "MSRDC_PURANDAR_CARGO_EXPRESSWAY_DOC.pdf"
  }
];

export const collectorSiaReports = [
  {
    id: "SIA-2026-08",
    projectId: "PRJ-MH-2026-101",
    projectName: "Pune Ring Road Expressway (East Corridor)",
    agency: "Gokhale Institute of Politics and Economics, Pune (Empaneled SIA Agency)",
    submissionDate: "2026-08-28",
    status: "Under Collector Review",
    villagesCovered: ["Wagholi", "Avalwadi", "Manjari Khurd", "Phursungi"],
    totalAffectedFamilies: 850,
    displacedFamilies: 120,
    affectedLandowners: 965,
    livelihoodImpact: "Severe impact on agricultural income for 340 smallholder farmers (less than 1 Ha holding). Loss of 45 commercial shops along Wagholi junction.",
    environmentalImpact: "Loss of 420 mature fruit trees (Mango, Tamarind). Minor impact on natural stream drainage in Avalwadi.",
    majorSocialConcerns: "1. Demand for 4x market rate compensation instead of 2.5x.\n2. Request for underground cattle pass under Ring Road at Survey 142 Wagholi.\n3. Demand for local employment in highway toll operations.",
    gramPanchayatResolutions: [
      { village: "Wagholi", status: "Conditional Consent", resolutionNo: "GP-WAG-2026-44", date: "2026-08-10", remarks: "Resolved to consent provided cattle pass and service road are built." },
      { village: "Avalwadi", status: "Approved", resolutionNo: "GP-AVL-2026-12", date: "2026-08-12", remarks: "Unanimous approval with R&R package assurance." },
      { village: "Manjari Khurd", status: "Approved with Objections", resolutionNo: "GP-MNJ-2026-88", date: "2026-08-15", remarks: "Demanded higher valuation for irrigated parcels." }
    ],
    expertAppraisalRecommendation: "Recommended for Approval under Section 7 of LARR Act 2013 subject to R&R Cattle Pass inclusion.",
    expertAppraisalScore: "8.5 / 10",
    siaReportDoc: "SIA_REPORT_PUNE_RING_ROAD_EAST_2026.pdf",
    expertAppraisalDoc: "EXPERT_APPRAISAL_COMMITTEE_REPORT_PUNE.pdf",
    riskRating: "Medium Risk"
  },
  {
    id: "SIA-2026-09",
    projectId: "PRJ-MH-2026-140",
    projectName: "Mulshi Dam Reservoir & Irrigation Canal Project",
    agency: "Tata Institute of Social Sciences (TISS) SIA Cell",
    submissionDate: "2026-09-02",
    status: "New Submission",
    villagesCovered: ["Male", "Bhadas", "Kolewadi"],
    totalAffectedFamilies: 540,
    displacedFamilies: 210,
    affectedLandowners: 620,
    livelihoodImpact: "Submergence of paddy fields affecting 210 tribal & marginal farmer families. Complete loss of seasonal fishing rights.",
    environmentalImpact: "Submergence of 45 Ha unclassified forest land. Soil erosion risk during monsoon construction.",
    majorSocialConcerns: "1. Demanding Land-for-Land rehabilitation in adjacent Taluka.\n2. Objections to tribal land transfer under PESA Act compliance.",
    gramPanchayatResolutions: [
      { village: "Male", status: "Rejected by Gram Sabha", resolutionNo: "GP-MLE-2026-09", date: "2026-08-22", remarks: "Gram Sabha rejected current R&R package demanding 5 Ha alternative land per family." }
    ],
    expertAppraisalRecommendation: "Conditional Hold - Requires Tribal Welfare Department & PESA Committee Clearance.",
    expertAppraisalScore: "5.2 / 10",
    siaReportDoc: "SIA_REPORT_MULSHI_DAM_TISS_2026.pdf",
    expertAppraisalDoc: "EXPERT_APPRAISAL_MULSHI_NOTE.pdf",
    riskRating: "High Risk"
  }
];

export const collectorProjectsMasterList = [
  {
    id: "PRJ-MH-2026-101",
    name: "Pune Ring Road Expressway (East Corridor)",
    proposingBody: "MSRDC",
    description: "110 km access controlled 8-lane expressway encircling Pune city to divert heavy transit traffic.",
    talukaCount: 2,
    talukas: ["Haveli", "Purandar"],
    villageCount: 4,
    villages: ["Wagholi", "Avalwadi", "Manjari Khurd", "Phursungi"],
    timeline: "Jan 2026 - Dec 2027",
    stage: "Compensation",
    status: "Ongoing",
    riskScore: 28,
    riskLevel: "LOW RISK",
    riskColor: "Green",
    reasonsForStage: [
      "SIA report approved by Collector on 15 May 2026",
      "Section 11 Preliminary Notification published in Gazette #MH-2026-881",
      "85% of land parcels physically verified by Haveli Tahsildar survey team",
      "Compensation awards calculated for 320 parcels; 55 pending landowner bank verification"
    ],
    riskFactors: [
      { factor: "Unresolved Objections", impact: "Low", description: "25 legal/heirship claims under Tahsildar dispute hearing." },
      { factor: "Fund Disbursement", impact: "Low", description: "₹ 120 Cr allocated in escrow account." }
    ],
    milestones: [
      { name: "Proposal", status: "Completed", date: "2026-01-10" },
      { name: "SIA", status: "Completed", date: "2026-03-15" },
      { name: "Appraisal", status: "Completed", date: "2026-04-02" },
      { name: "Notification", status: "Completed", date: "2026-05-01" },
      { name: "Survey", status: "Completed", date: "2026-06-20" },
      { name: "Compensation", status: "In Progress", date: "2026-08-15" },
      { name: "Award", status: "Pending", date: "-" },
      { name: "Payment", status: "Pending", date: "-" },
      { name: "Mutation", status: "Pending", date: "-" }
    ]
  },
  {
    id: "PRJ-MH-2026-102",
    name: "NH-48 Pune-Satara Highway Corridor Widening",
    proposingBody: "NHAI",
    description: "Expansion of existing 6-lane highway to 8-lane smart highway corridor with service lanes.",
    talukaCount: 1,
    talukas: ["Haveli"],
    villageCount: 3,
    villages: ["Khed Shivapur", "Shindewadi", "Golewadi"],
    timeline: "Feb 2026 - Nov 2027",
    stage: "Award",
    status: "Ongoing",
    riskScore: 22,
    riskLevel: "LOW RISK",
    riskColor: "Green",
    reasonsForStage: [
      "Field survey 100% completed by Tahsildar team",
      "Section 3G compensation awards declared by Special Land Acquisition Officer (SLAO)",
      "Payment disbursement initiated via PFMS for 150 verified landowners"
    ],
    riskFactors: [
      { factor: "Aadhaar Mismatch", impact: "Low", description: "15 bank passbook name mismatch cases sent to Tahsildar." }
    ],
    milestones: [
      { name: "Proposal", status: "Completed", date: "2026-02-01" },
      { name: "SIA", status: "Completed", date: "2026-03-01" },
      { name: "Appraisal", status: "Completed", date: "2026-03-25" },
      { name: "Notification", status: "Completed", date: "2026-04-10" },
      { name: "Survey", status: "Completed", date: "2026-05-30" },
      { name: "Compensation", status: "Completed", date: "2026-07-15" },
      { name: "Award", status: "Completed", date: "2026-08-10" },
      { name: "Payment", status: "In Progress", date: "2026-08-25" },
      { name: "Mutation", status: "Pending", date: "-" }
    ]
  },
  {
    id: "PRJ-MH-2026-140",
    name: "Mulshi Dam Reservoir & Irrigation Canal Project",
    proposingBody: "Water Resources Dept",
    description: "Right-of-way land acquisition for high-pressure irrigation pipeline and canal network.",
    talukaCount: 1,
    talukas: ["Mulshi"],
    villageCount: 3,
    villages: ["Male", "Bhadas", "Kolewadi"],
    timeline: "Feb 2026 - Jun 2028",
    stage: "SIA",
    status: "Ongoing",
    riskScore: 84,
    riskLevel: "HIGH RISK",
    riskColor: "Red",
    reasonsForStage: [
      "SIA draft report generated with high social protest in Male village",
      "Gram Sabha in Male passed resolution rejecting proposed compensation rates",
      "210 displaced families demanding alternative land allotment under R&R Act 2013"
    ],
    riskFactors: [
      { factor: "Gram Sabha Rejection", impact: "Critical", description: "Male village Gram Sabha passed negative resolution under PESA." },
      { factor: "Land-for-Land Demand", impact: "High", description: "Non-availability of govt revenue land in Mulshi Taluka." }
    ],
    milestones: [
      { name: "Proposal", status: "Completed", date: "2026-02-18" },
      { name: "SIA", status: "In Progress", date: "2026-08-01" },
      { name: "Appraisal", status: "Pending", date: "-" },
      { name: "Notification", status: "Pending", date: "-" },
      { name: "Survey", status: "Pending", date: "-" },
      { name: "Compensation", status: "Pending", date: "-" },
      { name: "Award", status: "Pending", date: "-" },
      { name: "Payment", status: "Pending", date: "-" },
      { name: "Mutation", status: "Pending", date: "-" }
    ]
  },
  {
    id: "PRJ-MH-2026-088",
    name: "MIDC Chakan Phase-V Industrial Logistics Corridor",
    proposingBody: "MIDC",
    description: "Land acquisition for mega auto & EV manufacturing hub in Khed Taluka.",
    talukaCount: 1,
    talukas: ["Khed"],
    villageCount: 3,
    villages: ["Nighoje", "Kuruli", "Vasuli"],
    timeline: "Nov 2025 - Sep 2026",
    stage: "Final Mutation",
    status: "Completed",
    riskScore: 12,
    riskLevel: "LOW RISK",
    riskColor: "Green",
    reasonsForStage: [
      "98% of compensation disbursed into landowner bank accounts",
      "Final mutation entry 7/12 land record updates completed for Vasuli & Nighoje",
      "Possession handed over to MIDC Regional Officer"
    ],
    riskFactors: [],
    milestones: [
      { name: "Proposal", status: "Completed", date: "2025-11-10" },
      { name: "SIA", status: "Completed", date: "2025-12-15" },
      { name: "Appraisal", status: "Completed", date: "2026-01-10" },
      { name: "Notification", status: "Completed", date: "2026-02-01" },
      { name: "Survey", status: "Completed", date: "2026-03-15" },
      { name: "Compensation", status: "Completed", date: "2026-05-10" },
      { name: "Award", status: "Completed", date: "2026-06-01" },
      { name: "Payment", status: "Completed", date: "2026-07-20" },
      { name: "Mutation", status: "Completed", date: "2026-08-30" }
    ]
  }
];

export const collectorRrExcelRecords = [
  {
    fileId: "RR-EXCEL-PUNE-101",
    filename: "RR_Compensation_Wagholi_Batch4.xlsx",
    uploadDate: "2026-09-02",
    uploadedBy: "Shri S. K. Mahajan (SLAO Officer, Pune)",
    project: "Pune Ring Road Expressway",
    village: "Wagholi",
    recordCount: 45,
    records: [
      {
        landowner: "Rameshwar Dhondu Patil",
        parcelId: "MH-PL-10234",
        surveyNo: "142/1A",
        dbAreaHa: "0.85 Ha (8,500 sq.m)",
        excelAreaHa: "0.80 Ha (8,000 sq.m)",
        areaMatch: false,
        dbComp: "₹ 1,35,00,000",
        excelComp: "₹ 1,28,00,000",
        compMatch: false,
        dbIfsc: "SBIN0001429",
        excelIfsc: "SBIN0001429",
        bankMatch: true,
        status: "Mismatch Detected - Review Required"
      },
      {
        landowner: "Ganesh Ramchandra Jadhav",
        parcelId: "MH-PL-10235",
        surveyNo: "142/1B",
        dbAreaHa: "1.10 Ha (11,000 sq.m)",
        excelAreaHa: "1.10 Ha (11,000 sq.m)",
        areaMatch: true,
        dbComp: "₹ 1,50,00,000",
        excelComp: "₹ 1,50,00,000",
        compMatch: true,
        dbIfsc: "MAHB0000214",
        excelIfsc: "MAHB0000214",
        bankMatch: true,
        status: "Verified Match"
      },
      {
        landowner: "Sunita Anant Deshmukh",
        parcelId: "MH-PL-10240",
        surveyNo: "88/2B",
        dbAreaHa: "0.70 Ha (7,000 sq.m)",
        excelAreaHa: "0.70 Ha (7,000 sq.m)",
        areaMatch: true,
        dbComp: "₹ 2,45,00,000",
        excelComp: "₹ 1,80,00,000",
        compMatch: false,
        dbIfsc: "HDFC0000412",
        excelIfsc: "HDFC0000412",
        bankMatch: true,
        status: "Valuation Rate Discrepancy"
      }
    ]
  }
];

export const collectorAuditLogs = [
  {
    id: "AUD-88401",
    officerName: "Dr. Arvind R. Patil",
    role: "Tahsildar",
    jurisdiction: "Haveli Taluka",
    project: "Pune Ring Road Expressway",
    action: "Approved Parcel Valuation #MH-PL-10235",
    date: "2026-09-05 14:30",
    status: "On Time",
    ipAddress: "10.240.18.42"
  },
  {
    id: "AUD-88402",
    officerName: "Shri S. M. Kulkarni",
    role: "Sub-Divisional Officer (SDO)",
    jurisdiction: "Mulshi Division",
    project: "Mulshi Dam Canal Project",
    action: "Forwarded Gram Sabha Objection #OBJ-994 to Collectorate",
    date: "2026-09-04 11:15",
    status: "On Time",
    ipAddress: "10.240.22.10"
  },
  {
    id: "AUD-88403",
    officerName: "Shri Prakash R. Shinde",
    role: "Senior Surveyor",
    jurisdiction: "Haveli Cadastral Unit",
    project: "Pune Ring Road Expressway",
    action: "Updated Field Survey Boundary Plotting for Wagholi",
    date: "2026-09-03 16:45",
    status: "Delayed",
    ipAddress: "10.240.18.88"
  },
  {
    id: "AUD-88404",
    officerName: "Smt. Rohini V. Gawande",
    role: "Talathi",
    jurisdiction: "Wagholi Saza",
    project: "Pune Ring Road Expressway",
    action: "Uploaded 7/12 Heirship Verification Certificate",
    date: "2026-09-02 10:20",
    status: "On Time",
    ipAddress: "10.240.19.12"
  },
  {
    id: "AUD-88405",
    officerName: "Shri B. L. Thorat",
    role: "Tahsildar",
    jurisdiction: "Khed Taluka",
    project: "MIDC Chakan Phase-V",
    action: "Signed Final Mutation Entry Batch #4819",
    date: "2026-08-30 17:00",
    status: "On Time",
    ipAddress: "10.240.30.05"
  }
];

export const collectorWorkforceSummary = [
  {
    name: "Dr. Arvind R. Patil",
    role: "Tahsildar",
    jurisdiction: "Haveli Taluka",
    assignedProjects: 5,
    tasksCompleted: 320,
    tasksPending: 40,
    casesRequiringAttention: 12,
    completionPercentage: 88.9,
    status: "On Schedule"
  },
  {
    name: "Shri S. M. Kulkarni",
    role: "SDO",
    jurisdiction: "Mulshi Division",
    assignedProjects: 4,
    tasksCompleted: 210,
    tasksPending: 60,
    casesRequiringAttention: 24,
    completionPercentage: 77.8,
    status: "High Workload"
  },
  {
    name: "Shri B. L. Thorat",
    role: "Tahsildar",
    jurisdiction: "Khed Taluka",
    assignedProjects: 6,
    tasksCompleted: 450,
    tasksPending: 25,
    casesRequiringAttention: 5,
    completionPercentage: 94.7,
    status: "Exemplary Performance"
  },
  {
    name: "Shri D. K. Bhosale",
    role: "SDO",
    jurisdiction: "Purandar Division",
    assignedProjects: 3,
    tasksCompleted: 140,
    tasksPending: 95,
    casesRequiringAttention: 45,
    completionPercentage: 59.5,
    status: "Delayed - Review Needed"
  }
];

export const collectorEgazetteDrafts = [
  {
    gazetteRefNo: "MH-GAZ-PUNE-2026-089",
    notificationNo: "REV-LA-108/2026/PUNE",
    notificationDate: "2026-09-09",
    issueDate: "2026-09-12",
    projectName: "Pune Ring Road Expressway (East Corridor)",
    projectId: "PRJ-MH-2026-101",
    proposingBody: "MSRDC",
    purpose: "Public Infrastructure - High Speed Access Controlled Expressway",
    district: "Pune",
    taluka: "Haveli",
    villages: ["Wagholi", "Avalwadi", "Manjari Khurd", "Phursungi"],
    actSection: "Right to Fair Compensation & Transparency in Land Acquisition Act, 2013 (Section 11(1))",
    issuingAuthority: "District Collector & District Magistrate, Pune District",
    landRequiredHa: 145.8,
    parcelCount: 320,
    surveyNumbers: "142/1A, 142/1B, 88/2B, 210/4, 95/1, 104/3A ...",
    affectedLandownersCount: 410,
    status: "Draft Ready for Collector Signature"
  }
];

export const collectorGISParcels = [
  {
    id: "MH-PL-10234",
    surveyNo: "142/1A",
    village: "Wagholi",
    taluka: "Haveli",
    project: "Pune Ring Road Expressway",
    landowner: "Rameshwar Dhondu Patil",
    area: "0.85 Ha",
    status: "Compensation Under Dispute",
    statusCode: "Disputed",
    compAmount: "₹ 1,35,00,000",
    lat: 18.5793,
    lng: 73.9814,
    polygon: [
      [18.5780, 73.9800],
      [18.5805, 73.9805],
      [18.5800, 73.9830],
      [18.5775, 73.9825]
    ]
  },
  {
    id: "MH-PL-10235",
    surveyNo: "142/1B",
    village: "Wagholi",
    taluka: "Haveli",
    project: "Pune Ring Road Expressway",
    landowner: "Shantabai Babanrao Shinde",
    area: "1.12 Ha",
    status: "Acquired & DBT Disbursed",
    statusCode: "Acquired",
    compAmount: "₹ 1,78,00,000",
    lat: 18.5815,
    lng: 73.9845,
    polygon: [
      [18.5805, 73.9830],
      [18.5828, 73.9835],
      [18.5822, 73.9860],
      [18.5800, 73.9855]
    ]
  },
  {
    id: "MH-PL-10240",
    surveyNo: "88/2B",
    village: "Avalwadi",
    taluka: "Haveli",
    project: "Pune Ring Road Expressway",
    landowner: "Kisan Mahadu Tupe",
    area: "0.95 Ha",
    status: "Pending Field Verification",
    statusCode: "Pending",
    compAmount: "₹ 1,12,00,000",
    lat: 18.5710,
    lng: 73.9920,
    polygon: [
      [18.5695, 73.9905],
      [18.5722, 73.9910],
      [18.5718, 73.9935],
      [18.5690, 73.9930]
    ]
  },
  {
    id: "MH-PL-10248",
    surveyNo: "210/4",
    village: "Manjari Khurd",
    taluka: "Haveli",
    project: "Pune Ring Road Expressway",
    landowner: "Genba Haribhau Jagtap",
    area: "1.40 Ha",
    status: "Acquired & DBT Disbursed",
    statusCode: "Acquired",
    compAmount: "₹ 2,10,00,000",
    lat: 18.5320,
    lng: 73.9870,
    polygon: [
      [18.5305, 73.9855],
      [18.5335, 73.9860],
      [18.5330, 73.9890],
      [18.5300, 73.9885]
    ]
  },
  {
    id: "MH-PL-10310",
    surveyNo: "95/1",
    village: "Nighoje",
    taluka: "Khed",
    project: "MIDC Chakan Phase-V",
    landowner: "Balkrishna Pandurang Thakar",
    area: "2.30 Ha",
    status: "Acquired & Possession Taken",
    statusCode: "Acquired",
    compAmount: "₹ 3,45,00,000",
    lat: 18.7300,
    lng: 73.8050,
    polygon: [
      [18.7285, 73.8030],
      [18.7315, 73.8035],
      [18.7310, 73.8070],
      [18.7280, 73.8065]
    ]
  },
  {
    id: "MH-PL-10315",
    surveyNo: "104/3A",
    village: "Khed Shivapur",
    taluka: "Haveli",
    project: "NH-48 Highway Expansion",
    landowner: "Ananda Sakharam Konde",
    area: "0.68 Ha",
    status: "Pending Field Verification",
    statusCode: "Pending",
    compAmount: "₹ 92,00,000",
    lat: 18.3540,
    lng: 73.8580,
    polygon: [
      [18.3525, 73.8565],
      [18.3552, 73.8570],
      [18.3548, 73.8598],
      [18.3520, 73.8592]
    ]
  },
  {
    id: "MH-PL-10402",
    surveyNo: "312/C",
    village: "Male",
    taluka: "Mulshi",
    project: "Mulshi Dam Canal Project",
    landowner: "Narayan Govind Marathe",
    area: "1.75 Ha",
    status: "Compensation Under Dispute",
    statusCode: "Disputed",
    compAmount: "₹ 1,85,00,000",
    lat: 18.5080,
    lng: 73.5350,
    polygon: [
      [18.5065, 73.5330],
      [18.5098, 73.5335],
      [18.5092, 73.5370],
      [18.5060, 73.5365]
    ]
  },
  {
    id: "MH-PL-10520",
    surveyNo: "55/2",
    village: "Pargaon",
    taluka: "Purandar",
    project: "Purandar International Airport Express",
    landowner: "Sopanrao Eknath Jagtap",
    area: "3.50 Ha",
    status: "Pending Field Verification",
    statusCode: "Pending",
    compAmount: "₹ 4,20,00,000",
    lat: 18.2800,
    lng: 74.0500,
    polygon: [
      [18.2780, 74.0475],
      [18.2820, 74.0480],
      [18.2815, 74.0525],
      [18.2775, 74.0520]
    ]
  }
];

export const collectorProjectAlignments = [
  {
    id: "ALN-RING-ROAD",
    name: "Pune Ring Road Expressway (East Corridor)",
    project: "Pune Ring Road Expressway",
    color: "#EF4444",
    dashArray: "8, 6",
    weight: 4,
    coords: [
      [18.7200, 73.8200],
      [18.6600, 73.9100],
      [18.5793, 73.9814],
      [18.5320, 73.9870],
      [18.4200, 73.9500],
      [18.3540, 73.8580]
    ]
  },
  {
    id: "ALN-NH-48",
    name: "NH-48 National Highway Expansion",
    project: "NH-48 Highway Expansion",
    color: "#3B82F6",
    dashArray: null,
    weight: 4,
    coords: [
      [18.6000, 73.7500],
      [18.5204, 73.8567],
      [18.4500, 73.8600],
      [18.3540, 73.8580],
      [18.2500, 73.8600]
    ]
  },
  {
    id: "ALN-PURANDAR",
    name: "Purandar Airport Express Corridor",
    project: "Purandar International Airport Express",
    color: "#8B5CF6",
    dashArray: "6, 6",
    weight: 4,
    coords: [
      [18.5000, 73.9300],
      [18.4100, 73.9800],
      [18.3400, 74.0200],
      [18.2800, 74.0500]
    ]
  }
];

