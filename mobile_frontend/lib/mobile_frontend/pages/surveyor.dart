import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart' hide Path;
import 'sia_expert.dart';
import 'landowner.dart';
import '../theme/app_design.dart';


// ============================================================================
// 1. DATA MODELS & ENUMS
// ============================================================================

enum VerificationStatus {
  pending,
  dispute,
  verified,
}

extension VerificationStatusExt on VerificationStatus {
  String get label {
    switch (this) {
      case VerificationStatus.pending:
        return 'Pending Verification';
      case VerificationStatus.dispute:
        return 'Dispute Verification';
      case VerificationStatus.verified:
        return 'Verified';
    }
  }

  Color get color {
    switch (this) {
      case VerificationStatus.pending:
        return const Color(0xFFE65100); // High contrast orange
      case VerificationStatus.dispute:
        return const Color(0xFFC62828); // Strong red
      case VerificationStatus.verified:
        return const Color(0xFF2E7D32); // Deep emerald green
    }
  }

  IconData get icon {
    switch (this) {
      case VerificationStatus.pending:
        return Icons.hourglass_top_rounded;
      case VerificationStatus.dispute:
        return Icons.warning_amber_rounded;
      case VerificationStatus.verified:
        return Icons.check_circle_rounded;
    }
  }
}

class CropRecord {
  final String id;
  String cropType;
  double areaUnderCultivation;
  double expectedYieldTons;
  String irrigationType;
  String remarks;

  CropRecord({
    required this.id,
    required this.cropType,
    required this.areaUnderCultivation,
    required this.expectedYieldTons,
    required this.irrigationType,
    this.remarks = '',
  });
}

class LandParcel {
  final String id;
  final String surveyNumber;
  final String parcelName;
  final String village;
  final String taluka;
  final String district;
  final double landAreaHectares;
  final String landownerName;
  final String landownerKhataNo;
  final String projectId;
  final String projectName;
  final String? samplePhotoUrl;
  VerificationStatus status;
  final List<OwnershipDoc> documents;
  final List<AssetRecord> assets;
  final List<CropRecord> crops;
  String projectSummary;
  String disputeTitle;
  String disputeDescription;
  String disputeRemarks;
  String? disputePhotoPath;
  String aadhaarNo;
  String bankAccountNo;
  String ifscCode;
  String bankName;

  LandParcel({
    required this.id,
    required this.surveyNumber,
    required this.parcelName,
    required this.village,
    required this.taluka,
    required this.district,
    required this.landAreaHectares,
    required this.landownerName,
    required this.landownerKhataNo,
    required this.projectId,
    required this.projectName,
    this.samplePhotoUrl,
    this.status = VerificationStatus.pending,
    List<OwnershipDoc>? documents,
    List<AssetRecord>? assets,
    List<CropRecord>? crops,
    this.projectSummary = 'Field verification & parcel boundary inspection under highway corridor expansion scheme.',
    this.disputeTitle = '',
    this.disputeDescription = '',
    this.disputeRemarks = '',
    this.disputePhotoPath,
    this.aadhaarNo = '9876 5432 1012',
    this.bankAccountNo = '450910023488',
    this.ifscCode = 'SBIN0000456',
    this.bankName = 'State Bank of India - Shirur Branch',
  })  : documents = documents ?? [],
        assets = assets ?? [],
        crops = crops ?? [];
}

class OwnershipDoc {
  final String id;
  final String name;
  final String type;
  final String dateIssued;
  bool isVerified;
  String? url;

  OwnershipDoc({
    required this.id,
    required this.name,
    required this.type,
    required this.dateIssued,
    this.isVerified = true,
    this.url,
  });
}

class AssetRecord {
  final String id;
  final String category; // Tree, Well, Structure, Other
  final String title;
  final int count;
  final String condition;
  final String remarks;
  bool photoUploaded;

  AssetRecord({
    required this.id,
    required this.category,
    required this.title,
    required this.count,
    required this.condition,
    required this.remarks,
    this.photoUploaded = false,
  });
}

class Project {
  final String id;
  final String name;
  final String type;
  final String division;
  final int totalParcels;

  Project({
    required this.id,
    required this.name,
    required this.type,
    required this.division,
    required this.totalParcels,
  });
}

class LandTask {
  final String taskId;
  final LandParcel parcel;
  final String assignedOfficer;
  final String assignmentDate;
  final String priority;

  LandTask({
    required this.taskId,
    required this.parcel,
    required this.assignedOfficer,
    required this.assignmentDate,
    this.priority = 'Medium',
  });
}

class NotificationItem {
  final String id;
  final String title;
  final String message;
  final String timestamp;
  final bool isRead;
  final IconData icon;
  final Color color;

  NotificationItem({
    required this.id,
    required this.title,
    required this.message,
    required this.timestamp,
    this.isRead = false,
    this.icon = Icons.notifications,
    this.color = Colors.blue,
  });
}

// ============================================================================
// 2. SAMPLE REVENUE DEPARTMENT DATA
// ============================================================================

final List<Project> sampleProjects = [
  Project(
    id: 'PRJ-2026-MH-089',
    name: 'NH-48 Pune-Satara Expressway Widening Corridor',
    type: 'Highway Infrastructure Acquisition',
    division: 'Pune Revenue Division',
    totalParcels: 800,
  ),
  Project(
    id: 'PRJ-2026-MH-104',
    name: 'MTHL Feeder Road Land Acquisition Phase II',
    type: 'Coastal Connector Infrastructure',
    division: 'Konkan Revenue Division',
    totalParcels: 450,
  ),
  Project(
    id: 'PRJ-2026-MH-210',
    name: 'Pune-Nashik Industrial Freight Railway Line',
    type: 'Rail Infrastructure Acquisition',
    division: 'Nashik Revenue Division',
    totalParcels: 620,
  ),
  Project(
    id: 'PRJ-2026-MH-305',
    name: 'Krishna Valley Agricultural Dam & Canal Expansion',
    type: 'Irrigation & Agriculture Acquisition',
    division: 'Satara Revenue Division',
    totalParcels: 310,
  ),
];

final List<LandParcel> sampleParcels = [
  // --- PROJECT 1: NH-48 Pune-Satara Expressway Widening Corridor (PRJ-2026-MH-089) ---
  LandParcel(
    id: 'MH-PL-10234',
    surveyNumber: 'Survey 142/3A',
    parcelName: 'Kharab Shivar Plot A',
    village: 'Shirur Shivar',
    taluka: 'Shirur',
    district: 'Pune',
    landAreaHectares: 2.45,
    landownerName: 'Ramchandra Laxman Patil',
    landownerKhataNo: 'KH-8940',
    projectId: 'PRJ-2026-MH-089',
    projectName: 'NH-48 Pune-Satara Expressway Widening Corridor',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'High-density agricultural acquisition parcel along NH-48 feeder bypass road. All 7/12 records verified.',
    status: VerificationStatus.verified,
    aadhaarNo: '9876 5432 1012',
    bankAccountNo: '450910023488',
    ifscCode: 'SBIN0000456',
    bankName: 'State Bank of India - Shirur Branch',
    crops: [
      CropRecord(id: 'CRP-01', cropType: 'Sugarcane', areaUnderCultivation: 1.8, expectedYieldTons: 45.0, irrigationType: 'Open Well / Drip', remarks: 'Perennial crop under active cultivation'),
      CropRecord(id: 'CRP-02', cropType: 'Paddy / Rice', areaUnderCultivation: 0.65, expectedYieldTons: 12.0, irrigationType: 'Canal Irrigated', remarks: 'Monsoon kharif crop harvest'),
    ],
    documents: [
      OwnershipDoc(id: 'DOC-01', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '12 Jan 2026'),
      OwnershipDoc(id: 'DOC-02', name: '8A Khata Register Extract', type: '8A', dateIssued: '15 Jan 2026'),
      OwnershipDoc(id: 'DOC-03', name: 'Revenue Mutation Entry No. 4092', type: 'Mutation', dateIssued: '02 Feb 2026'),
    ],
    assets: [
      AssetRecord(id: 'AST-01', category: 'Tree', title: 'Alphonso Mango Trees', count: 12, condition: 'Healthy Mature', remarks: 'High economic value yield trees'),
      AssetRecord(id: 'AST-02', category: 'Well', title: 'RCC Open Well with Pump', count: 1, condition: 'Operational', remarks: '15 HP Submersible Pump installed'),
      AssetRecord(id: 'AST-03', category: 'Structure', title: 'Agricultural Equipment Shed', count: 1, condition: 'Semi-permanent', remarks: 'GI Sheet Roof 400 sq.ft'),
    ],
  ),
  LandParcel(
    id: 'MH-PL-10238',
    surveyNumber: 'Survey 142/4',
    parcelName: 'Shirur Highway Border Farm',
    village: 'Shirur Shivar',
    taluka: 'Shirur',
    district: 'Pune',
    landAreaHectares: 1.65,
    landownerName: 'Anant Vishnu Kulkarni',
    landownerKhataNo: 'KH-8942',
    projectId: 'PRJ-2026-MH-089',
    projectName: 'NH-48 Pune-Satara Expressway Widening Corridor',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Highway margin parcel scheduled for joint measurement survey with PWD land department.',
    status: VerificationStatus.pending,
    aadhaarNo: '8765 4321 9087',
    bankAccountNo: '309812456711',
    ifscCode: 'MAHB0000123',
    bankName: 'Bank of Maharashtra - Shirur Branch',
    crops: [
      CropRecord(id: 'CRP-05', cropType: 'Wheat', areaUnderCultivation: 1.2, expectedYieldTons: 15.0, irrigationType: 'Tube Well', remarks: 'Rabi season crop'),
    ],
    documents: [
      OwnershipDoc(id: 'DOC-09', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '19 Jan 2026'),
      OwnershipDoc(id: 'DOC-10', name: '8A Khata Register Extract', type: '8A', dateIssued: '20 Jan 2026'),
    ],
    assets: [
      AssetRecord(id: 'AST-07', category: 'Tree', title: 'Neem Trees', count: 6, condition: 'Mature', remarks: 'Shade trees along border'),
    ],
  ),
  LandParcel(
    id: 'MH-PL-10239',
    surveyNumber: 'Survey 143/1B',
    parcelName: 'Jadhav Mala Orchard',
    village: 'Shirur Shivar',
    taluka: 'Shirur',
    district: 'Pune',
    landAreaHectares: 3.12,
    landownerName: 'Shantabai Eknath Jadhav',
    landownerKhataNo: 'KH-8945',
    projectId: 'PRJ-2026-MH-089',
    projectName: 'NH-48 Pune-Satara Expressway Widening Corridor',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Discrepancy noted in revenue mutation record entry regarding ancestral succession share.',
    status: VerificationStatus.dispute,
    disputeTitle: 'Mutation Entry Succession Discrepancy',
    disputeDescription: 'Mutation Entry No. 5102 contested by co-heirs. Talathi verification requested for legal heir certificate.',
    disputeRemarks: 'Notice issued to legal heirs for hearing at Tahsildar office.',
    aadhaarNo: '7654 3210 8901',
    bankAccountNo: '561234908123',
    ifscCode: 'HDFC0001234',
    bankName: 'HDFC Bank - Shirur Town',
    crops: [
      CropRecord(id: 'CRP-06', cropType: 'Pomegranate / Fruit Orchard', areaUnderCultivation: 2.5, expectedYieldTons: 22.0, irrigationType: 'Drip Irrigation', remarks: 'High yield pomegranate orchard'),
    ],
    documents: [
      OwnershipDoc(id: 'DOC-11', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '05 Jan 2026'),
      OwnershipDoc(id: 'DOC-12', name: 'Legal Heir Certificate', type: 'Certificate', dateIssued: '10 Feb 2026'),
    ],
    assets: [
      AssetRecord(id: 'AST-08', category: 'Tree', title: 'Pomegranate Shrubs', count: 180, condition: 'Fruit Bearing', remarks: 'Drip system connected'),
      AssetRecord(id: 'AST-09', category: 'Well', title: 'Farm Pond / Water Tank', count: 1, condition: 'Operational', remarks: '500,000 Liter Capacity'),
    ],
  ),

  // --- PROJECT 2: MTHL Feeder Road Land Acquisition Phase II (PRJ-2026-MH-104) ---
  LandParcel(
    id: 'MH-PL-10235',
    surveyNumber: 'Survey 142/3B',
    parcelName: 'Mala Shivar Plot B',
    village: 'Shirur Shivar',
    taluka: 'Shirur',
    district: 'Pune',
    landAreaHectares: 1.80,
    landownerName: 'Suresh Tukaram Shinde',
    landownerKhataNo: 'KH-8941',
    projectId: 'PRJ-2026-MH-104',
    projectName: 'MTHL Feeder Road Land Acquisition Phase II',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Physical field boundary measurements conflict with 7/12 extract. Flagged for dispute review.',
    status: VerificationStatus.dispute,
    disputeTitle: 'Boundary Overlap & Heir Claim Discrepancy',
    disputeDescription: 'Physical field boundary conflicts with 7/12 record. Co-sharer filed written objection regarding 8A entries.',
    disputeRemarks: 'Marked for joint survey verification by Deputy Collector Land Acquisition.',
    aadhaarNo: '6543 2109 7890',
    bankAccountNo: '789012345678',
    ifscCode: 'ICIC0000987',
    bankName: 'ICICI Bank - Pune Main',
    crops: [
      CropRecord(id: 'CRP-03', cropType: 'Cotton', areaUnderCultivation: 1.2, expectedYieldTons: 18.0, irrigationType: 'Drip Irrigation', remarks: 'High quality cash crop'),
    ],
    documents: [
      OwnershipDoc(id: 'DOC-04', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '10 Jan 2026'),
      OwnershipDoc(id: 'DOC-05', name: '8A Khata Register Extract', type: '8A', dateIssued: '14 Jan 2026'),
    ],
    assets: [
      AssetRecord(id: 'AST-04', category: 'Tree', title: 'Teakwood Timber Trees', count: 8, condition: 'Good', remarks: 'Timber evaluation required'),
      AssetRecord(id: 'AST-05', category: 'Well', title: 'Borewell 450ft', count: 1, condition: 'Functional', remarks: 'Electric connection active'),
    ],
  ),
  LandParcel(
    id: 'MH-PL-10240',
    surveyNumber: 'Survey 145/2A',
    parcelName: 'More Mala Coastal Plot',
    village: 'Shirur Shivar',
    taluka: 'Shirur',
    district: 'Pune',
    landAreaHectares: 2.10,
    landownerName: 'Prakash Bapu More',
    landownerKhataNo: 'KH-9011',
    projectId: 'PRJ-2026-MH-104',
    projectName: 'MTHL Feeder Road Land Acquisition Phase II',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Feeder road alignment parcel fully inspected and approved for valuation assessment.',
    status: VerificationStatus.verified,
    aadhaarNo: '5432 1098 6789',
    bankAccountNo: '123456789012',
    ifscCode: 'SBIN0001122',
    bankName: 'State Bank of India - Pune Cantonment',
    crops: [
      CropRecord(id: 'CRP-07', cropType: 'Groundnut / Peanut', areaUnderCultivation: 1.8, expectedYieldTons: 14.0, irrigationType: 'Rainfed', remarks: 'Kharif oilseed crop'),
    ],
    documents: [
      OwnershipDoc(id: 'DOC-13', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '11 Jan 2026'),
      OwnershipDoc(id: 'DOC-14', name: '8A Khata Register Extract', type: '8A', dateIssued: '15 Jan 2026'),
    ],
    assets: [
      AssetRecord(id: 'AST-10', category: 'Structure', title: 'Stone Fencing Wall', count: 1, condition: 'Good', remarks: '200 meters length boundary wall'),
    ],
  ),
  LandParcel(
    id: 'MH-PL-10241',
    surveyNumber: 'Survey 145/2B',
    parcelName: 'Pawar Shivar Plot',
    village: 'Shirur Shivar',
    taluka: 'Shirur',
    district: 'Pune',
    landAreaHectares: 0.90,
    landownerName: 'Radhabai Maruti Pawar',
    landownerKhataNo: 'KH-9015',
    projectId: 'PRJ-2026-MH-104',
    projectName: 'MTHL Feeder Road Land Acquisition Phase II',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Pending field survey for structural asset valuation of standing farm tube well.',
    status: VerificationStatus.pending,
    aadhaarNo: '4321 0987 5678',
    bankAccountNo: '987612344321',
    ifscCode: 'UBIN0005432',
    bankName: 'Union Bank of India - Shirur',
    crops: [],
    documents: [
      OwnershipDoc(id: 'DOC-15', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '22 Jan 2026'),
    ],
    assets: [],
  ),

  // --- PROJECT 3: Pune-Nashik Industrial Freight Railway Line (PRJ-2026-MH-210) ---
  LandParcel(
    id: 'MH-PL-10236',
    surveyNumber: 'Survey 144/1',
    parcelName: 'Wadgaon Roadside Land',
    village: 'Wadgaon Anand',
    taluka: 'Haveli',
    district: 'Pune',
    landAreaHectares: 3.10,
    landownerName: 'Sunita Dnyaneshwar Deshmukh',
    landownerKhataNo: 'KH-9102',
    projectId: 'PRJ-2026-MH-210',
    projectName: 'Pune-Nashik Industrial Freight Railway Line',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Roadside railway corridor land parcel assigned for preliminary survey and asset verification.',
    status: VerificationStatus.pending,
    aadhaarNo: '3210 9876 4567',
    bankAccountNo: '456789012345',
    ifscCode: 'BARB0HAVELI',
    bankName: 'Bank of Baroda - Haveli Branch',
    crops: [
      CropRecord(id: 'CRP-04', cropType: 'Soybean', areaUnderCultivation: 2.5, expectedYieldTons: 30.0, irrigationType: 'Rainfed / Sprinkler', remarks: 'Soybean cultivation area'),
    ],
    documents: [
      OwnershipDoc(id: 'DOC-06', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '18 Jan 2026'),
      OwnershipDoc(id: 'DOC-07', name: '8A Khata Register Extract', type: '8A', dateIssued: '18 Jan 2026'),
    ],
    assets: [
      AssetRecord(id: 'AST-06', category: 'Tree', title: 'Coconut Palms', count: 25, condition: 'Fruit Bearing', remarks: 'High density palm grove'),
    ],
  ),
  LandParcel(
    id: 'MH-PL-10242',
    surveyNumber: 'Survey 144/3',
    parcelName: 'Gaikwad Freight Corridor Land',
    village: 'Wadgaon Anand',
    taluka: 'Haveli',
    district: 'Pune',
    landAreaHectares: 4.25,
    landownerName: 'Dattatray Raghunath Gaikwad',
    landownerKhataNo: 'KH-9105',
    projectId: 'PRJ-2026-MH-210',
    projectName: 'Pune-Nashik Industrial Freight Railway Line',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Railway alignment sector 4 verified with zero encumbrances or boundary disputes.',
    status: VerificationStatus.verified,
    aadhaarNo: '2109 8765 3456',
    bankAccountNo: '654321098765',
    ifscCode: 'IDIB0009876',
    bankName: 'Indian Bank - Haveli Road',
    crops: [
      CropRecord(id: 'CRP-08', cropType: 'Maize / Corn', areaUnderCultivation: 3.5, expectedYieldTons: 40.0, irrigationType: 'Canal Irrigated', remarks: 'Fodder and grain crop'),
    ],
    documents: [
      OwnershipDoc(id: 'DOC-16', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '14 Jan 2026'),
      OwnershipDoc(id: 'DOC-17', name: 'NOC from Local Panchayat', type: 'NOC', dateIssued: '20 Jan 2026'),
    ],
    assets: [
      AssetRecord(id: 'AST-11', category: 'Well', title: 'Solar Powered Well Pump', count: 1, condition: 'Operational', remarks: '7.5 HP Solar Pump Set'),
    ],
  ),
  LandParcel(
    id: 'MH-PL-10243',
    surveyNumber: 'Survey 146/1A',
    parcelName: 'Bandal Shivar Rail Parcel',
    village: 'Wadgaon Anand',
    taluka: 'Haveli',
    district: 'Pune',
    landAreaHectares: 1.75,
    landownerName: 'Laxmibai Pandharinath Bandal',
    landownerKhataNo: 'KH-9110',
    projectId: 'PRJ-2026-MH-210',
    projectName: 'Pune-Nashik Industrial Freight Railway Line',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Ownership share dispute raised between co-sharers regarding khata allocation.',
    status: VerificationStatus.dispute,
    disputeTitle: 'Co-Sharer Khata Allocation Dispute',
    disputeDescription: 'Co-sharer submitted objection regarding fractional share calculation in revenue records.',
    disputeRemarks: 'Re-verification ordered for ancestral partition deed dated 2018.',
    aadhaarNo: '1098 7654 2345',
    bankAccountNo: '321098765432',
    ifscCode: 'CBIN0280999',
    bankName: 'Central Bank of India - Wadgaon Branch',
    crops: [
      CropRecord(id: 'CRP-09', cropType: 'Onion', areaUnderCultivation: 1.5, expectedYieldTons: 25.0, irrigationType: 'Drip Irrigation', remarks: 'Cash crop harvest ready'),
    ],
    documents: [
      OwnershipDoc(id: 'DOC-18', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '08 Jan 2026'),
    ],
    assets: [
      AssetRecord(id: 'AST-12', category: 'Structure', title: 'Onion Storage Shed (Kanda Chawl)', count: 1, condition: 'Good', remarks: '50 Ton storage capacity'),
    ],
  ),

  // --- PROJECT 4: Krishna Valley Agricultural Dam & Canal Expansion (PRJ-2026-MH-305) ---
  LandParcel(
    id: 'MH-PL-10237',
    surveyNumber: 'Survey 150/4C',
    parcelName: 'Khed Bypass Plot',
    village: 'Chakan Phata',
    taluka: 'Khed',
    district: 'Pune',
    landAreaHectares: 0.95,
    landownerName: 'Ganesh Pandurang Thorat',
    landownerKhataNo: 'KH-7734',
    projectId: 'PRJ-2026-MH-305',
    projectName: 'Krishna Valley Agricultural Dam & Canal Expansion',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Pending initial field visit for land measurement and crop audit under canal expansion.',
    status: VerificationStatus.pending,
    aadhaarNo: '0987 6543 1234',
    bankAccountNo: '876543210987',
    ifscCode: 'KKBK0001234',
    bankName: 'Kotak Mahindra Bank - Chakan',
    crops: [],
    documents: [
      OwnershipDoc(id: 'DOC-08', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '20 Jan 2026'),
    ],
    assets: [],
  ),
  LandParcel(
    id: 'MH-PL-10244',
    surveyNumber: 'Survey 151/2',
    parcelName: 'Bhosale Canal Feeder Land',
    village: 'Chakan Phata',
    taluka: 'Khed',
    district: 'Pune',
    landAreaHectares: 2.80,
    landownerName: 'Mahadev Tukaram Bhosale',
    landownerKhataNo: 'KH-7740',
    projectId: 'PRJ-2026-MH-305',
    projectName: 'Krishna Valley Agricultural Dam & Canal Expansion',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Canal right-of-way verified. Landowner consented to direct bank transfer compensation.',
    status: VerificationStatus.verified,
    aadhaarNo: '9876 1234 5678',
    bankAccountNo: '234567890123',
    ifscCode: 'YESB0000432',
    bankName: 'Yes Bank - Chakan Industrial Area',
    crops: [
      CropRecord(id: 'CRP-10', cropType: 'Sugarcane', areaUnderCultivation: 2.2, expectedYieldTons: 55.0, irrigationType: 'Canal Irrigated', remarks: 'High density ratoon crop'),
    ],
    documents: [
      OwnershipDoc(id: 'DOC-19', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '15 Jan 2026'),
      OwnershipDoc(id: 'DOC-20', name: '8A Khata Register Extract', type: '8A', dateIssued: '16 Jan 2026'),
    ],
    assets: [
      AssetRecord(id: 'AST-13', category: 'Well', title: 'RCC Pipeline Junction', count: 1, condition: 'Operational', remarks: 'Underground 6-inch PVC line'),
    ],
  ),
  LandParcel(
    id: 'MH-PL-10245',
    surveyNumber: 'Survey 152/1B',
    parcelName: 'Shirole Farm Plot',
    village: 'Chakan Phata',
    taluka: 'Khed',
    district: 'Pune',
    landAreaHectares: 1.40,
    landownerName: 'Savita Ashok Shirole',
    landownerKhataNo: 'KH-7745',
    projectId: 'PRJ-2026-MH-305',
    projectName: 'Krishna Valley Agricultural Dam & Canal Expansion',
    samplePhotoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    projectSummary: 'Assigned for ground verification of standing guava trees and farm boundary.',
    status: VerificationStatus.pending,
    aadhaarNo: '8765 2345 6789',
    bankAccountNo: '345678901234',
    ifscCode: 'AXIS0000876',
    bankName: 'Axis Bank - Khed Branch',
    crops: [
      CropRecord(id: 'CRP-11', cropType: 'Guava Orchard', areaUnderCultivation: 1.1, expectedYieldTons: 12.0, irrigationType: 'Drip Irrigation', remarks: 'Organic fruit farm'),
    ],
    documents: [
      OwnershipDoc(id: 'DOC-21', name: '7/12 Extract (Satbara)', type: '7/12', dateIssued: '25 Jan 2026'),
    ],
    assets: [
      AssetRecord(id: 'AST-14', category: 'Tree', title: 'Taiwan Guava Trees', count: 45, condition: 'Mature', remarks: 'High density planting'),
    ],
  ),
];

final List<LandTask> sampleTasks = [
  LandTask(taskId: 'TSK-8901', parcel: sampleParcels[0], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '01 Feb 2026', priority: 'High'),
  LandTask(taskId: 'TSK-8902', parcel: sampleParcels[1], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '02 Feb 2026', priority: 'Normal'),
  LandTask(taskId: 'TSK-8903', parcel: sampleParcels[2], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '03 Feb 2026', priority: 'Urgent Dispute'),
  LandTask(taskId: 'TSK-8904', parcel: sampleParcels[3], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '03 Feb 2026', priority: 'Urgent Dispute'),
  LandTask(taskId: 'TSK-8905', parcel: sampleParcels[4], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '04 Feb 2026', priority: 'High'),
  LandTask(taskId: 'TSK-8906', parcel: sampleParcels[5], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '05 Feb 2026', priority: 'Normal'),
  LandTask(taskId: 'TSK-8907', parcel: sampleParcels[6], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '05 Feb 2026', priority: 'Normal'),
  LandTask(taskId: 'TSK-8908', parcel: sampleParcels[7], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '06 Feb 2026', priority: 'High'),
  LandTask(taskId: 'TSK-8909', parcel: sampleParcels[8], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '07 Feb 2026', priority: 'Urgent Dispute'),
  LandTask(taskId: 'TSK-8910', parcel: sampleParcels[9], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '08 Feb 2026', priority: 'High'),
  LandTask(taskId: 'TSK-8911', parcel: sampleParcels[10], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '09 Feb 2026', priority: 'Normal'),
  LandTask(taskId: 'TSK-8912', parcel: sampleParcels[11], assignedOfficer: 'Rajesh Sharma (Talathi)', assignmentDate: '10 Feb 2026', priority: 'Normal'),
];

final List<NotificationItem> sampleNotifications = [
  NotificationItem(
    id: 'NOT-101',
    title: 'Dispute Flagged on Parcel MH-PL-10235',
    message: 'Discrepancy reported by Surveyor Rajesh Sharma during 7/12 document check.',
    timestamp: '10 mins ago',
    icon: Icons.warning_amber_rounded,
    color: const Color(0xFFC62828),
  ),
  NotificationItem(
    id: 'NOT-102',
    title: 'New Verification Task Assigned',
    message: 'Task TSK-8904 assigned for Parcel MH-PL-10237 (Chakan Phata).',
    timestamp: '2 hours ago',
    icon: Icons.assignment_turned_in_rounded,
    color: const Color(0xFF00897B),
  ),
  NotificationItem(
    id: 'NOT-103',
    title: 'Ministry of Rural Dev Record Updated',
    message: 'Updated 8A extract uploaded for Project NH-48 Expressway widening.',
    timestamp: '1 day ago',
    icon: Icons.description_rounded,
    color: const Color(0xFF0284C7),
  ),
];

// ============================================================================
// 3. MAIN APPLICATION & NAVIGATION STATE
// ============================================================================

void main() {
  runApp(const SwadeshApp());
}

class SwadeshApp extends StatelessWidget {
  const SwadeshApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SWADESH',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: 'Roboto',
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF00897B), // Light Bluish Green / Teal
          primary: const Color(0xFF00897B),
          secondary: const Color(0xFF0D9488),
          surface: const Color(0xFFF8FAFC),
          onSurface: const Color(0xFF0F172A),
        ),
        scaffoldBackgroundColor: const Color(0xFFF1F5F9),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF00897B),
          foregroundColor: Colors.white,
          elevation: 2,
        ),
        cardTheme: CardThemeData(
          elevation: 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          color: Colors.white,
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFFCBD5E1)),
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF00897B),
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
            textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
          ),
        ),
      ),
      home: const SwadeshMainScreen(),
    );
  }
}

class SwadeshMainScreen extends StatefulWidget {
  const SwadeshMainScreen({super.key});

  @override
  State<SwadeshMainScreen> createState() => _SwadeshMainScreenState();
}

class _SwadeshMainScreenState extends State<SwadeshMainScreen> {
  bool _isLoggedIn = false;
  UserRole _activeRole = UserRole.surveyor;
  int _selectedNavIndex = 0; // 0: Tasks, 1: Projects, 2: Form Filling, 3: Map & GIS
  
  // Data State
  final List<LandParcel> _parcels = List.from(sampleParcels);
  final List<Project> _projects = List.from(sampleProjects);
  final List<LandTask> _tasks = List.from(sampleTasks);
  final List<NotificationItem> _notifications = List.from(sampleNotifications);
  
  // Active Form Filling Parcel
  late LandParcel _activeParcel;
  int _activeFormStep = 0; // 0: Basic, 1: Ownership, 2: Agriculture, 3: Assets, 4: Bank Details

  // Selected Project Filter for GIS & Projects
  late Project _selectedProject;

  @override
  void initState() {
    super.initState();
    _activeParcel = _parcels[0];
    _selectedProject = _projects[0];
  }

  void _onLoginSuccess([UserRole role = UserRole.surveyor]) {
    setState(() {
      _activeRole = role;
      _isLoggedIn = true;
    });
  }

  void _onLogout() {
    setState(() {
      _isLoggedIn = false;
      _selectedNavIndex = 0;
    });
  }

  void _navigateToFormWithParcel(LandParcel parcel) {
    setState(() {
      _activeParcel = parcel;
      _selectedNavIndex = 2; // Form Filling
      _activeFormStep = 0;   // Start at Basic Details
    });
  }

  void _updateParcelStatus(LandParcel parcel, VerificationStatus newStatus, {String? title, String? desc, String? remarks}) {
    setState(() {
      parcel.status = newStatus;
      if (newStatus == VerificationStatus.dispute && title != null) {
        parcel.disputeTitle = title;
        parcel.disputeDescription = desc ?? '';
        parcel.disputeRemarks = remarks ?? '';
        _notifications.insert(
          0,
          NotificationItem(
            id: 'NOT-${DateTime.now().millisecondsSinceEpoch}',
            title: 'Dispute Flagged on Parcel ${parcel.id}',
            message: 'Discrepancy reported by Surveyor Rajesh Sharma: $title',
            timestamp: 'Just now',
            icon: Icons.warning_amber_rounded,
            color: const Color(0xFFC62828),
          ),
        );
      } else if (newStatus == VerificationStatus.verified) {
        _notifications.insert(
          0,
          NotificationItem(
            id: 'NOT-${DateTime.now().millisecondsSinceEpoch}',
            title: 'Parcel Verified: ${parcel.id}',
            message: 'Verification completed successfully for ${parcel.landownerName}.',
            timestamp: 'Just now',
            icon: Icons.check_circle_rounded,
            color: const Color(0xFF2E7D32),
          ),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_isLoggedIn) {
      return SurveyorLoginScreen(onLogin: _onLoginSuccess);
    }

    if (_activeRole == UserRole.landowner) {
      return SwadeshLandownerPortalApp(onLogout: _onLogout);
    }

    if (_activeRole == UserRole.siaExpert) {
      return SiaExpertMainScreen(onLogout: _onLogout);
    }

    return Scaffold(
      appBar: SwadeshTopNavigationBar(
        unreadNotificationsCount: _notifications.where((n) => !n.isRead).length,
        onNotificationTap: () => _showNotificationsBottomSheet(context),
        activeRole: _activeRole,
      ),
      bottomNavigationBar: SwadeshBottomNavigationBar(
        selectedIndex: _selectedNavIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedNavIndex = index;
          });
        },
      ),
      body: IndexedStack(
        index: _selectedNavIndex,
        children: [
          // SCREEN 1 – TASKS DASHBOARD
          TasksDashboardView(
            tasks: _tasks,
            onSelectTask: (task) => _navigateToFormWithParcel(task.parcel),
          ),
          // SCREEN 2 – PROJECTS DASHBOARD
          ProjectsDashboardView(
            projects: _projects,
            parcels: _parcels,
            selectedProject: _selectedProject,
            onSelectProject: (proj) {
              setState(() {
                _selectedProject = proj;
              });
            },
            onSelectLandownerParcel: (parcel) => _navigateToFormWithParcel(parcel),
          ),
          // SCREEN 3 – FORM FILLING
          FormFillingView(
            parcel: _activeParcel,
            projects: _projects,
            allParcels: _parcels,
            activeStep: _activeFormStep,
            onStepChanged: (step) {
              setState(() {
                _activeFormStep = step;
              });
            },
            onParcelChanged: (parcel) {
              setState(() {
                _activeParcel = parcel;
              });
            },
            onUpdateStatus: _updateParcelStatus,
          ),
          // SCREEN 4 – MAP & GIS
          MapGisView(
            projects: _projects,
            parcels: _parcels,
            selectedProject: _selectedProject,
            onSelectProject: (proj) {
              setState(() {
                _selectedProject = proj;
              });
            },
            onOpenForm: (parcel) => _navigateToFormWithParcel(parcel),
          ),
          // SCREEN 5 – OFFICER PROFILE
          OfficerProfileView(
            onLogout: _onLogout,
          ),
        ],
      ),
    );
  }

  void _showNotificationsBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return DraggableScrollableSheet(
          expand: false,
          initialChildSize: 0.65,
          maxChildSize: 0.9,
          builder: (context, scrollController) {
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Container(
                      width: 40,
                      height: 5,
                      decoration: BoxDecoration(
                        color: Colors.grey[300],
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Expanded(
                        child: Row(
                          children: [
                            Icon(Icons.notifications_active, color: Color(0xFF00897B)),
                            SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                'System Notifications',
                                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ),
                      TextButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: const Text('Mark as read'),
                      ),
                    ],
                  ),
                  const Divider(),
                  Expanded(
                    child: ListView.separated(
                      controller: scrollController,
                      itemCount: _notifications.length,
                      separatorBuilder: (_, ___) => const Divider(height: 1),
                      itemBuilder: (context, index) {
                        final notif = _notifications[index];
                        return ListTile(
                          leading: CircleAvatar(
                            backgroundColor: notif.color.withOpacity(0.15),
                            child: Icon(notif.icon, color: notif.color, size: 20),
                          ),
                          title: Text(notif.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                          subtitle: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const SizedBox(height: 4),
                              Text(notif.message, style: const TextStyle(fontSize: 13, color: Colors.black87)),
                              const SizedBox(height: 4),
                              Text(notif.timestamp, style: TextStyle(fontSize: 11, color: Colors.grey[600])),
                            ],
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }
}

// ============================================================================
// 4. GLOBAL TOP NAVIGATION BAR, INSTAGRAM BOTTOM BAR & OFFICER PROFILE VIEW
// ============================================================================

class SwadeshTopNavigationBar extends StatelessWidget implements PreferredSizeWidget {
  final int unreadNotificationsCount;
  final VoidCallback onNotificationTap;
  final UserRole activeRole;

  const SwadeshTopNavigationBar({
    super.key,
    required this.unreadNotificationsCount,
    required this.onNotificationTap,
    this.activeRole = UserRole.surveyor,
  });

  @override
  Size get preferredSize => const Size.fromHeight(60);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      centerTitle: false,
      title: Row(
        children: [
          const Icon(Icons.account_balance, color: Colors.white, size: 24),
          const SizedBox(width: 10),
          Flexible(
            child: Text(
              activeRole == UserRole.siaExpert
                  ? 'SWADESH • SIA Coordinator'
                  : 'Ministry of Rural Development',
              style: const TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
      actions: [
        Stack(
          children: [
            IconButton(
              icon: const Icon(Icons.notifications_outlined, color: Colors.white, size: 24),
              onPressed: onNotificationTap,
            ),
            if (unreadNotificationsCount > 0)
              Positioned(
                right: 8,
                top: 8,
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    color: Color(0xFFC62828),
                    shape: BoxShape.circle,
                  ),
                  child: Text(
                    '$unreadNotificationsCount',
                    style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
          ],
        ),
        const SizedBox(width: 8),
      ],
    );
  }
}

class SwadeshBottomNavigationBar extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onDestinationSelected;

  const SwadeshBottomNavigationBar({
    super.key,
    required this.selectedIndex,
    required this.onDestinationSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: BottomNavigationBar(
        currentIndex: selectedIndex,
        onTap: onDestinationSelected,
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.white,
        selectedItemColor: const Color(0xFF00897B),
        unselectedItemColor: Colors.grey[600],
        selectedFontSize: 11,
        unselectedFontSize: 10,
        showUnselectedLabels: true,
        elevation: 0,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.assignment_outlined),
            activeIcon: Icon(Icons.assignment),
            label: 'Tasks',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.analytics_outlined),
            activeIcon: Icon(Icons.analytics),
            label: 'Projects',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.edit_note_outlined),
            activeIcon: Icon(Icons.edit_note),
            label: 'Form',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.map_outlined),
            activeIcon: Icon(Icons.map),
            label: 'Map & GIS',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

class OfficerProfileView extends StatelessWidget {
  final VoidCallback onLogout;

  const OfficerProfileView({
    super.key,
    required this.onLogout,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. PROMINENT POST / DESIGNATION HEADER CARD (DISPLAYED ABOVE OFFICER DETAILS)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF00897B), Color(0xFF004D40)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF00897B).withOpacity(0.3),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          'OFFICIAL POST / DESIGNATION',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 1.1,
                          ),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.all(6),
                        decoration: const BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.verified, color: Color(0xFF00897B), size: 20),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Field Surveyor (Talathi)',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Ministry of Rural Development • Govt of India',
                    style: TextStyle(color: Colors.white70, fontSize: 13),
                  ),
                  const SizedBox(height: 12),
                  const Divider(color: Colors.white30, height: 1),
                  const SizedBox(height: 12),
                  const Row(
                    children: [
                      Icon(Icons.location_on, color: Colors.amberAccent, size: 16),
                      SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          'Posting: Haveli Sub-Division, Pune Region',
                          style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w500),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // 2. OFFICER / PERSON DETAILS SECTION (UNBOXED)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      CircleAvatar(
                        radius: 28,
                        backgroundColor: Color(0xFF00897B),
                        child: Icon(Icons.person, color: Colors.white, size: 32),
                      ),
                      SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Rajesh Sharma',
                              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                            ),
                            SizedBox(height: 2),
                            Text(
                              'Officer ID: GOV-MH-SURV-4092',
                              style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF00897B)),
                            ),
                            SizedBox(height: 2),
                            Text(
                              'Cadre: Maharashtra Rural & Revenue Services',
                              style: TextStyle(fontSize: 11, color: Colors.grey),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Divider(),
                  const SizedBox(height: 8),

                  // Information Rows
                  _buildInfoTile(Icons.business, 'Department', 'Ministry of Rural Development'),
                  _buildInfoTile(Icons.badge, 'Officer Employee Code', 'EMP-RD-94028'),
                  _buildInfoTile(Icons.map, 'Jurisdiction', 'Pune Rural Division'),
                  _buildInfoTile(Icons.email, 'Official Email', 'rajesh.sharma@rural.gov.in'),
                  _buildInfoTile(Icons.phone, 'Contact Number', '+91 98765 43210'),
                  _buildInfoTile(Icons.wifi_tethering, 'Field Sync Status', 'Online • Auto-sync Active'),
                ],
              ),
            ),
            const SizedBox(height: 14),
            const Divider(height: 1, thickness: 1, color: Color(0xFFCBD5E1)),
            const SizedBox(height: 16),

            // 3. PERFORMANCE / VERIFICATION SUMMARY STATS (UNBOXED)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Field Inspection Summary',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                  ),
                  const SizedBox(height: 12),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        SizedBox(width: 80, child: _buildStatBox('Assigned', '800', const Color(0xFF0284C7))),
                        const SizedBox(width: 8),
                        SizedBox(width: 80, child: _buildStatBox('Verified', '400', const Color(0xFF2E7D32))),
                        const SizedBox(width: 8),
                        SizedBox(width: 80, child: _buildStatBox('Pending', '300', const Color(0xFFE65100))),
                        const SizedBox(width: 8),
                        SizedBox(width: 80, child: _buildStatBox('Dispute', '100', const Color(0xFFC62828))),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // 4. LOGOUT BUTTON
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: onLogout,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFC62828),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                icon: const Icon(Icons.logout),
                label: const Text('LOGOUT SESSION', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoTile(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Icon(icon, size: 20, color: const Color(0xFF00897B)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: const TextStyle(fontSize: 11, color: Colors.grey)),
                Text(value, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatBox(String label, String count, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: color.withOpacity(0.3)),
        ),
        child: Column(
          children: [
            Text(count, style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: color)),
            const SizedBox(height: 2),
            Text(label, style: TextStyle(fontSize: 10, color: color, fontWeight: FontWeight.w600)),
          ],
        ),
      ),
    );
  }
}

// ============================================================================
// 5. SCREEN 0 – SURVEYOR LOGIN SCREEN
// ============================================================================

class SurveyorLoginScreen extends StatefulWidget {
  final ValueChanged<UserRole> onLogin;

  const SurveyorLoginScreen({super.key, required this.onLogin});

  @override
  State<SurveyorLoginScreen> createState() => _SurveyorLoginScreenState();
}

class _SurveyorLoginScreenState extends State<SurveyorLoginScreen> {
  UserRole _selectedRole = UserRole.landowner;

  final _idController = TextEditingController(text: 'SURV-MH-4092');
  final _mobileController = TextEditingController(text: '9876543210');
  final _passController = TextEditingController(text: 'pass123');
  final _otpController = TextEditingController(text: '482109');
  
  String _selectedDivision = 'Pune Revenue Division';
  bool _isLoading = false;
  bool _useOtp = false;

  void _handleLogin() {
    setState(() => _isLoading = true);
    Future.delayed(const Duration(milliseconds: 600), () {
      if (mounted) {
        setState(() => _isLoading = false);
        widget.onLogin(_selectedRole);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    Color primaryColor;
    String titleText;
    String subtitleText;
    String buttonText;

    switch (_selectedRole) {
      case UserRole.landowner:
        primaryColor = const Color(0xFF00695C);
        titleText = 'Landowner / PAP Portal';
        subtitleText = 'Citizen Land Acquisition & Objection Portal';
        buttonText = 'LOGIN TO LANDOWNER PORTAL';
        break;
      case UserRole.surveyor:
        primaryColor = const Color(0xFF00897B);
        titleText = 'Field Surveyor / Talathi Login';
        subtitleText = 'Revenue Department Inspection Officer Portal';
        buttonText = 'ACCESS SURVEYOR DASHBOARD';
        break;
      case UserRole.siaExpert:
        primaryColor = const Color(0xFF0288D1);
        titleText = 'SIA Coordinator / Expert Login';
        subtitleText = 'Social Impact Assessment & Monitoring Portal';
        buttonText = 'ACCESS SIA EXPERT PORTAL';
        break;
    }

    return Scaffold(
      backgroundColor: const Color(0xFF004D40),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Header Emblem & Title
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.account_balance,
                    size: 48,
                    color: primaryColor,
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  'SWADESH',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 28,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 2.0,
                  ),
                ),
                const SizedBox(height: 2),
                const Text(
                  'Land Acquisition Management System',
                  style: TextStyle(color: Colors.amberAccent, fontSize: 12, fontWeight: FontWeight.bold),
                ),
                const Text(
                  'Ministry of Rural Development • Government of India',
                  style: TextStyle(color: Colors.white70, fontSize: 11),
                ),
                const SizedBox(height: 20),

                // Unified Login Card
                Card(
                  elevation: 8,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Role Selector Segmented Tabs
                        const Text(
                          'SELECT PORTAL ROLE',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF64748B), letterSpacing: 1.0),
                        ),
                        const SizedBox(height: 8),
                        SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Row(
                            children: [
                              _buildRoleChip(UserRole.landowner, '👤 Landowner / PAP', primaryColor),
                              const SizedBox(width: 8),
                              _buildRoleChip(UserRole.surveyor, '📋 Field Surveyor', primaryColor),
                              const SizedBox(width: 8),
                              _buildRoleChip(UserRole.siaExpert, '📊 SIA Expert', primaryColor),
                            ],
                          ),
                        ),
                        const Divider(height: 24),

                        // Form Header
                        Text(
                          titleText,
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: primaryColor,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          subtitleText,
                          style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                        ),
                        const SizedBox(height: 16),

                        // Form Inputs based on selected role
                        if (_selectedRole == UserRole.landowner) ...[
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                _useOtp ? 'Registered Mobile Number' : 'Mobile Number / PAP User ID',
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                              ),
                              TextButton(
                                onPressed: () => setState(() => _useOtp = !_useOtp),
                                child: Text(_useOtp ? 'Use Password' : 'Use OTP via SMS', style: const TextStyle(fontSize: 11)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          TextField(
                            controller: _mobileController,
                            keyboardType: TextInputType.phone,
                            decoration: InputDecoration(
                              prefixIcon: Icon(Icons.phone_android_rounded, color: primaryColor),
                              hintText: 'e.g. 9876543210',
                            ),
                          ),
                          const SizedBox(height: 14),

                          if (_useOtp) ...[
                            const Text(
                              'Enter 6-Digit Security OTP',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                            ),
                            const SizedBox(height: 6),
                            TextField(
                              controller: _otpController,
                              keyboardType: TextInputType.number,
                              decoration: InputDecoration(
                                prefixIcon: Icon(Icons.security_rounded, color: primaryColor),
                                hintText: 'Simulated OTP: 482109',
                              ),
                            ),
                          ] else ...[
                            const Text(
                              'Password',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                            ),
                            const SizedBox(height: 6),
                            TextField(
                              controller: _passController,
                              obscureText: true,
                              decoration: InputDecoration(
                                prefixIcon: Icon(Icons.lock_outline_rounded, color: primaryColor),
                                hintText: 'Enter Password',
                              ),
                            ),
                          ],
                        ] else ...[
                          Text(
                            _selectedRole == UserRole.surveyor ? 'Surveyor Officer ID' : 'SIA Expert ID',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                          ),
                          const SizedBox(height: 6),
                          TextField(
                            controller: _idController,
                            decoration: InputDecoration(
                              prefixIcon: Icon(
                                _selectedRole == UserRole.surveyor ? Icons.badge : Icons.assignment_ind,
                                color: primaryColor,
                              ),
                              hintText: _selectedRole == UserRole.surveyor ? 'e.g. SURV-MH-4092' : 'e.g. SIA-EXP-8802',
                            ),
                          ),
                          const SizedBox(height: 14),
                          const Text(
                            'Password / Security Code',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                          ),
                          const SizedBox(height: 6),
                          TextField(
                            controller: _passController,
                            obscureText: true,
                            decoration: InputDecoration(
                              prefixIcon: Icon(Icons.lock, color: primaryColor),
                              hintText: 'Enter Password',
                            ),
                          ),
                          const SizedBox(height: 14),
                          const Text(
                            'Jurisdiction Region',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                          ),
                          const SizedBox(height: 6),
                          DropdownButtonFormField<String>(
                            value: _selectedDivision,
                            isExpanded: true,
                            decoration: InputDecoration(
                              prefixIcon: Icon(Icons.location_city, color: primaryColor),
                            ),
                            items: const [
                              DropdownMenuItem(value: 'Pune Revenue Division', child: Text('Pune Region')),
                              DropdownMenuItem(value: 'Konkan Revenue Division', child: Text('Konkan Region')),
                              DropdownMenuItem(value: 'Nashik Revenue Division', child: Text('Nashik Region')),
                              DropdownMenuItem(value: 'Chhatrapati Sambhajinagar Division', child: Text('Chhatrapati Sambhajinagar')),
                            ],
                            onChanged: (val) {
                              if (val != null) setState(() => _selectedDivision = val);
                            },
                          ),
                        ],

                        const SizedBox(height: 20),
                        SizedBox(
                          width: double.infinity,
                          height: 48,
                          child: ElevatedButton(
                            onPressed: _isLoading ? null : _handleLogin,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: primaryColor,
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            child: _isLoading
                                ? const SizedBox(
                                    width: 24,
                                    height: 24,
                                    child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                                  )
                                : Text(buttonText, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.verified_user, color: Colors.green.shade400, size: 16),
                    const SizedBox(width: 6),
                    const Text(
                      'Government of India • Unified Security Portal',
                      style: TextStyle(color: Colors.white70, fontSize: 12),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRoleChip(UserRole role, String label, Color activeColor) {
    final bool isSelected = _selectedRole == role;
    return ChoiceChip(
      selected: isSelected,
      label: Text(label),
      selectedColor: activeColor.withValues(alpha: 0.15),
      labelStyle: TextStyle(
        color: isSelected ? activeColor : const Color(0xFF475569),
        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
        fontSize: 12,
      ),
      onSelected: (val) {
        if (val) setState(() => _selectedRole = role);
      },
    );
  }
}

// ============================================================================
// 6. SCREEN 1 – TASKS DASHBOARD (Wireframe Image Matched)
// ============================================================================

class TasksDashboardView extends StatefulWidget {
  final List<LandTask> tasks;
  final ValueChanged<LandTask> onSelectTask;

  const TasksDashboardView({
    super.key,
    required this.tasks,
    required this.onSelectTask,
  });

  @override
  State<TasksDashboardView> createState() => _TasksDashboardViewState();
}

class _TasksDashboardViewState extends State<TasksDashboardView> {
  String _searchQuery = '';
  VerificationStatus? _filterStatus;

  @override
  Widget build(BuildContext context) {
    final filteredTasks = widget.tasks.where((task) {
      final matchesSearch = task.parcel.landownerName.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          task.parcel.id.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          task.parcel.projectName.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          task.parcel.surveyNumber.toLowerCase().contains(_searchQuery.toLowerCase());
      final matchesStatus = _filterStatus == null || task.parcel.status == _filterStatus;
      return matchesSearch && matchesStatus;
    }).toList();

    return Column(
      children: [
        // Search Header
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14.0, vertical: 12.0),
          color: Colors.white,
          child: Column(
            children: [
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(30),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.08),
                      blurRadius: 8,
                      offset: const Offset(0, 3),
                    ),
                  ],
                ),
                child: TextField(
                  onChanged: (val) => setState(() => _searchQuery = val),
                  decoration: InputDecoration(
                    prefixIcon: const Icon(Icons.search, color: Color(0xFF005A36), size: 22),
                    suffixIcon: _searchQuery.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.clear, size: 18),
                            onPressed: () => setState(() => _searchQuery = ''),
                          )
                        : null,
                    hintText: 'Search project_id...',
                    hintStyle: TextStyle(color: Colors.grey[500], fontSize: 14),
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  ),
                ),
              ),
              const SizedBox(height: 10),
              // Status Filter Chips
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildFilterChip('All Tasks', null),
                    const SizedBox(width: 8),
                    _buildFilterChip('🟠 Pending', VerificationStatus.pending),
                    const SizedBox(width: 8),
                    _buildFilterChip('🔴 Dispute', VerificationStatus.dispute),
                    const SizedBox(width: 8),
                    _buildFilterChip('🟢 Verified', VerificationStatus.verified),
                  ],
                ),
              ),
            ],
          ),
        ),
        // Task List
        Expanded(
          child: filteredTasks.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.search_off, size: 48, color: Colors.grey[400]),
                      const SizedBox(height: 12),
                      Text('No verification tasks found', style: TextStyle(color: Colors.grey[600], fontSize: 15)),
                    ],
                  ),
                )
              : ListView.builder(
                  padding: const EdgeInsets.all(12),
                  itemCount: filteredTasks.length,
                  itemBuilder: (context, index) {
                    final task = filteredTasks[index];
                    return _buildTaskCard(task);
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildFilterChip(String label, VerificationStatus? status) {
    final isSelected = _filterStatus == status;
    return FilterChip(
      selected: isSelected,
      label: Text(label),
      selectedColor: const Color(0xFF005A36).withOpacity(0.18),
      checkmarkColor: const Color(0xFF005A36),
      labelStyle: TextStyle(
        color: isSelected ? const Color(0xFF005A36) : Colors.black87,
        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
        fontSize: 12,
      ),
      onSelected: (_) => setState(() => _filterStatus = status),
    );
  }

  Widget _buildTaskPhotoBanner(LandParcel parcel) {
    final photoUrl = parcel.samplePhotoUrl;

    // Project type styling and icon badges
    String projectTypeTag = 'Land Acquisition';
    IconData typeIcon = Icons.landscape_rounded;
    Color tagColor = const Color(0xFF005A36);

    if (parcel.projectName.contains('Expressway') || parcel.projectName.contains('NH-')) {
      projectTypeTag = 'Highway Corridor';
      typeIcon = Icons.add_road_rounded;
      tagColor = const Color(0xFF1E3A8A);
    } else if (parcel.projectName.contains('MTHL') || parcel.projectName.contains('Feeder') || parcel.projectName.contains('Coastal')) {
      projectTypeTag = 'Coastal Feeder Road';
      typeIcon = Icons.waves_rounded;
      tagColor = const Color(0xFF0284C7);
    } else if (parcel.projectName.contains('Railway') || parcel.projectName.contains('Freight') || parcel.projectName.contains('Rail')) {
      projectTypeTag = 'Freight Rail Line';
      typeIcon = Icons.train_rounded;
      tagColor = const Color(0xFFB45309);
    } else if (parcel.projectName.contains('Canal') || parcel.projectName.contains('Agricultural') || parcel.projectName.contains('Krishna')) {
      projectTypeTag = 'Irrigation & Farming';
      typeIcon = Icons.agriculture_rounded;
      tagColor = const Color(0xFF15803D);
    }

    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: SizedBox(
        height: 135,
        width: double.infinity,
        child: Stack(
          fit: StackFit.expand,
          children: [
            if (photoUrl != null && photoUrl.isNotEmpty)
              Image.network(
                photoUrl,
                fit: BoxFit.cover,
                loadingBuilder: (context, child, loadingProgress) {
                  if (loadingProgress == null) return child;
                  return Container(
                    color: Colors.grey[200],
                    child: const Center(
                      child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF005A36)),
                    ),
                  );
                },
                errorBuilder: (context, error, stackTrace) {
                  return CustomPaint(
                    painter: ScenicLandBannerPainter(),
                    child: Container(),
                  );
                },
              )
            else
              CustomPaint(
                painter: ScenicLandBannerPainter(),
                child: Container(),
              ),

            // Vignette gradient for clear text readability
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Colors.black.withOpacity(0.45),
                    Colors.transparent,
                    Colors.black.withOpacity(0.70),
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  stops: const [0.0, 0.45, 1.0],
                ),
              ),
            ),

            // Top-Right: Project Type Badge
            Positioned(
              top: 8,
              right: 8,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: tagColor.withOpacity(0.92),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: const [
                    BoxShadow(color: Colors.black26, blurRadius: 4, offset: Offset(0, 2)),
                  ],
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(typeIcon, color: Colors.white, size: 13),
                    const SizedBox(width: 4),
                    Text(
                      projectTypeTag,
                      style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),

            // Bottom-Left: Location & Land Area Badge
            Positioned(
              bottom: 8,
              left: 8,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.70),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.location_on, color: Color(0xFFF59E0B), size: 13),
                    const SizedBox(width: 4),
                    Text(
                      '${parcel.village} • ${parcel.landAreaHectares} Ha',
                      style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Unboxed Base Screen Task Component Design
  Widget _buildTaskCard(LandTask task) {
    final parcel = task.parcel;
    final status = parcel.status;

    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: InkWell(
        onTap: () => widget.onSelectTask(task),
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4.0, vertical: 6.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // TOP ROW: Project Name & Assigned By
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      parcel.projectName,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF00897B),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Assigned by ${task.assignedOfficer.split(' ')[0]}',
                    style: TextStyle(fontSize: 12, color: Colors.grey[700], fontWeight: FontWeight.w500),
                  ),
                ],
              ),
              const SizedBox(height: 10),

              // PROJECT TYPE SPECIFIC PHOTO BANNER
              _buildTaskPhotoBanner(parcel),
              const SizedBox(height: 12),

              // MIDDLE ROW: Land Owner Parcel ID's & ISSUE NOTICE BUTTON
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Land Owner: ${parcel.landownerName}',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                        ),
                        Text(
                          'Parcel ID: ${parcel.id} • ${parcel.surveyNumber}',
                          style: TextStyle(fontSize: 12, color: Colors.grey[700]),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF00897B),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    ),
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Notice issued to landowner ${parcel.landownerName} for Parcel ${parcel.id}'),
                          backgroundColor: const Color(0xFF00897B),
                        ),
                      );
                    },
                    child: const Text('Issue Notice', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
              const SizedBox(height: 8),

              // PROJECT SUMMARY SECTION
              const Text(
                'Land Acquisition project summary',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.black87),
              ),
              const SizedBox(height: 2),
              Text(
                parcel.projectSummary,
                maxLines: 2,
                style: TextStyle(fontSize: 12, color: Colors.grey[700], height: 1.3),
              ),
              const SizedBox(height: 10),

              // BOTTOM SECTION - STATUS BADGE & VIEW DETAILS
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: status.color.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: status.color, width: 1),
                    ),
                    child: Row(
                      children: [
                        Icon(status.icon, color: status.color, size: 14),
                        const SizedBox(width: 4),
                        Text(
                          status.label,
                          style: TextStyle(
                            color: status.color,
                            fontWeight: FontWeight.bold,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ),
                  TextButton.icon(
                    onPressed: () => widget.onSelectTask(task),
                    icon: const Icon(Icons.arrow_forward_ios, size: 12, color: Color(0xFF00897B)),
                    label: const Text('Open Form', style: TextStyle(color: Color(0xFF00897B), fontWeight: FontWeight.bold, fontSize: 12)),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              const Divider(height: 1, thickness: 1, color: Color(0xFFCBD5E1)),
            ],
          ),
        ),
      ),
    );
  }
}

// SCENIC LAND ACQUISITION BANNER PAINTER (Wireframe card illustration matched with clouds & green hills)
class ScenicLandBannerPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // Sky background gradient
    final bgPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFFBAE6FD), Color(0xFFE0F2FE), Color(0xFFF0FDF4)],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bgPaint);

    // Puffy White Clouds (Wireframe artwork matched)
    final cloudPaint = Paint()..color = Colors.white.withOpacity(0.85);
    canvas.drawCircle(Offset(size.width * 0.25, size.height * 0.28), 16, cloudPaint);
    canvas.drawCircle(Offset(size.width * 0.30, size.height * 0.22), 20, cloudPaint);
    canvas.drawCircle(Offset(size.width * 0.36, size.height * 0.28), 16, cloudPaint);

    canvas.drawCircle(Offset(size.width * 0.65, size.height * 0.32), 14, cloudPaint);
    canvas.drawCircle(Offset(size.width * 0.70, size.height * 0.25), 18, cloudPaint);
    canvas.drawCircle(Offset(size.width * 0.76, size.height * 0.32), 14, cloudPaint);

    // Rolling Green Hills (Dual-tone matched with wireframe artwork)
    final hillPaint1 = Paint()..color = const Color(0xFF84CC16);
    final hillPath1 = Path()
      ..moveTo(0, size.height * 0.65)
      ..quadraticBezierTo(size.width * 0.3, size.height * 0.45, size.width * 0.6, size.height * 0.7)
      ..quadraticBezierTo(size.width * 0.85, size.height * 0.85, size.width, size.height * 0.55)
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();
    canvas.drawPath(hillPath1, hillPaint1);

    final hillPaint2 = Paint()..color = const Color(0xFF65A30D);
    final hillPath2 = Path()
      ..moveTo(0, size.height * 0.75)
      ..quadraticBezierTo(size.width * 0.4, size.height * 0.55, size.width * 0.75, size.height * 0.78)
      ..quadraticBezierTo(size.width * 0.9, size.height * 0.88, size.width, size.height * 0.72)
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();
    canvas.drawPath(hillPath2, hillPaint2);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// ============================================================================
// 7. SCREEN 2 – PROJECTS DASHBOARD & ANALYTICS
// ============================================================================

class ProjectsDashboardView extends StatefulWidget {
  final List<Project> projects;
  final List<LandParcel> parcels;
  final Project selectedProject;
  final ValueChanged<Project> onSelectProject;
  final ValueChanged<LandParcel> onSelectLandownerParcel;

  const ProjectsDashboardView({
    super.key,
    required this.projects,
    required this.parcels,
    required this.selectedProject,
    required this.onSelectProject,
    required this.onSelectLandownerParcel,
  });

  @override
  State<ProjectsDashboardView> createState() => _ProjectsDashboardViewState();
}

class _ProjectsDashboardViewState extends State<ProjectsDashboardView> {
  String _searchLandownerQuery = '';
  late Project _currentSelectedProject;

  @override
  void initState() {
    super.initState();
    _currentSelectedProject = widget.selectedProject;
  }

  @override
  void didUpdateWidget(covariant ProjectsDashboardView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.selectedProject != widget.selectedProject) {
      _currentSelectedProject = widget.selectedProject;
    }
  }

  @override
  Widget build(BuildContext context) {
    final allProjectsOption = Project(
      id: 'ALL_PROJECTS',
      name: 'All Acquisition Projects (All Parcels)',
      type: 'Combined View',
      division: 'All Divisions',
      totalParcels: widget.parcels.length,
    );

    final dropdownProjects = [allProjectsOption, ...widget.projects];
    final isAllProjects = _currentSelectedProject.id == 'ALL_PROJECTS';

    final projectParcels = isAllProjects
        ? widget.parcels
        : widget.parcels.where((p) => p.projectId == _currentSelectedProject.id).toList();

    int verifiedCount = projectParcels.where((p) => p.status == VerificationStatus.verified).length;
    int pendingCount = projectParcels.where((p) => p.status == VerificationStatus.pending).length;
    int disputeCount = projectParcels.where((p) => p.status == VerificationStatus.dispute).length;
    int totalParcels = projectParcels.isEmpty ? 1 : projectParcels.length;

    // Filter table landowners
    final filteredLandownerParcels = projectParcels.where((p) {
      final q = _searchLandownerQuery.toLowerCase();
      return p.landownerName.toLowerCase().contains(q) ||
          p.id.toLowerCase().contains(q) ||
          p.surveyNumber.toLowerCase().contains(q) ||
          p.landownerKhataNo.toLowerCase().contains(q) ||
          p.village.toLowerCase().contains(q) ||
          p.projectName.toLowerCase().contains(q);
    }).toList();

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(14.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // PROJECT SELECTOR SECTION (UNBOXED)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.business_center, color: Color(0xFF00897B)),
                      const SizedBox(width: 8),
                      Expanded(
                        child: DropdownButtonFormField<Project>(
                          value: dropdownProjects.firstWhere(
                            (p) => p.id == _currentSelectedProject.id,
                            orElse: () => allProjectsOption,
                          ),
                          isExpanded: true,
                          decoration: const InputDecoration(
                            labelText: 'Active Land Acquisition Project',
                            contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          ),
                          items: dropdownProjects.map((proj) {
                            return DropdownMenuItem(
                              value: proj,
                              child: Text(proj.name, overflow: TextOverflow.ellipsis),
                            );
                          }).toList(),
                          onChanged: (val) {
                            if (val != null) {
                              setState(() => _currentSelectedProject = val);
                              if (val.id != 'ALL_PROJECTS') {
                                widget.onSelectProject(val);
                              }
                            }
                          },
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      // DONUT CHART PAINTER
                      SizedBox(
                        width: 120,
                        height: 120,
                        child: CustomPaint(
                          painter: AnalyticsDonutPainter(
                            verifiedCount: verifiedCount,
                            pendingCount: pendingCount,
                            disputeCount: disputeCount,
                          ),
                          child: Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  '${((verifiedCount / totalParcels) * 100).toStringAsFixed(0)}%',
                                  style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: Color(0xFF00897B)),
                                ),
                                const Text('Verified', style: TextStyle(fontSize: 10, color: Colors.grey)),
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      // LEGEND STATS
                      Expanded(
                        child: Column(
                          children: [
                            _analyticStatRow(
                              color: VerificationStatus.verified.color,
                              title: 'Verified',
                              count: verifiedCount,
                              total: totalParcels,
                            ),
                            const SizedBox(height: 8),
                            _analyticStatRow(
                              color: VerificationStatus.pending.color,
                              title: 'Pending Verification',
                              count: pendingCount,
                              total: totalParcels,
                            ),
                            const SizedBox(height: 8),
                            _analyticStatRow(
                              color: VerificationStatus.dispute.color,
                              title: 'Dispute Verification',
                              count: disputeCount,
                              total: totalParcels,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),
            const Divider(height: 1, thickness: 1, color: Color(0xFFCBD5E1)),
            const SizedBox(height: 16),

            // AFFECTED LANDOWNER AND PARCEL LIST TABLE (UNBOXED)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Affected Landowners & Parcels',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFF00897B).withOpacity(0.12),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          '${filteredLandownerParcels.length} Landowners',
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Click on any landowner entry to open the verification form directly.',
                    style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    onChanged: (val) => setState(() => _searchLandownerQuery = val),
                    decoration: InputDecoration(
                      prefixIcon: const Icon(Icons.search, color: Color(0xFF00897B)),
                      suffixIcon: _searchLandownerQuery.isNotEmpty
                          ? IconButton(
                              icon: const Icon(Icons.clear, size: 18),
                              onPressed: () => setState(() => _searchLandownerQuery = ''),
                            )
                          : null,
                      hintText: 'Search Landowner, Parcel ID, Khata No. or Survey No...',
                      isDense: true,
                    ),
                  ),
                  const SizedBox(height: 14),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: DataTable(
                      showCheckboxColumn: false,
                      headingRowColor: WidgetStateProperty.all(const Color(0xFF00897B).withOpacity(0.08)),
                      columns: const [
                        DataColumn(label: Text('Landowner Name', style: TextStyle(fontWeight: FontWeight.bold))),
                        DataColumn(label: Text('Parcel ID', style: TextStyle(fontWeight: FontWeight.bold))),
                        DataColumn(label: Text('Survey No.', style: TextStyle(fontWeight: FontWeight.bold))),
                        DataColumn(label: Text('Area (Ha)', style: TextStyle(fontWeight: FontWeight.bold))),
                        DataColumn(label: Text('Village', style: TextStyle(fontWeight: FontWeight.bold))),
                        DataColumn(label: Text('Status', style: TextStyle(fontWeight: FontWeight.bold))),
                        DataColumn(label: Text('Action', style: TextStyle(fontWeight: FontWeight.bold))),
                      ],
                      rows: filteredLandownerParcels.map((parcel) {
                        final status = parcel.status;
                        return DataRow(
                          onSelectChanged: (_) => widget.onSelectLandownerParcel(parcel),
                          cells: [
                            DataCell(
                              Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(parcel.landownerName, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                                  Text('Khata: ${parcel.landownerKhataNo}', style: TextStyle(fontSize: 11, color: Colors.grey[600])),
                                ],
                              ),
                            ),
                            DataCell(Text(parcel.id, style: const TextStyle(fontWeight: FontWeight.w500))),
                            DataCell(Text(parcel.surveyNumber)),
                            DataCell(Text('${parcel.landAreaHectares} Ha')),
                            DataCell(Text(parcel.village)),
                            DataCell(
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: status.color.withOpacity(0.12),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  status.label,
                                  style: TextStyle(color: status.color, fontWeight: FontWeight.bold, fontSize: 11),
                                ),
                              ),
                            ),
                            DataCell(
                              ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color(0xFF00897B),
                                  foregroundColor: Colors.white,
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                ),
                                onPressed: () => widget.onSelectLandownerParcel(parcel),
                                child: const Text('Open Form', style: TextStyle(fontSize: 11)),
                              ),
                            ),
                          ],
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _analyticStatRow({
    required Color color,
    required String title,
    required int count,
    required int total,
  }) {
    final double pct = (count / total) * 100;
    return Row(
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            title,
            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
          ),
        ),
        Text(
          '$count (${pct.toStringAsFixed(0)}%)',
          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: color),
        ),
      ],
    );
  }
}

class AnalyticsDonutPainter extends CustomPainter {
  final int verifiedCount;
  final int pendingCount;
  final int disputeCount;

  AnalyticsDonutPainter({
    required this.verifiedCount,
    required this.pendingCount,
    required this.disputeCount,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final int total = verifiedCount + pendingCount + disputeCount;
    if (total == 0) return;

    final center = Offset(size.width / 2, size.height / 2);
    final radius = math.min(size.width, size.height) / 2;
    final strokeWidth = radius * 0.35;
    final drawRadius = radius - (strokeWidth / 2);

    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.butt;

    double startAngle = -math.pi / 2;

    // Verified
    final verifiedSweep = (verifiedCount / total) * 2 * math.pi;
    if (verifiedSweep > 0) {
      paint.color = const Color(0xFF2E7D32);
      canvas.drawArc(Rect.fromCircle(center: center, radius: drawRadius), startAngle, verifiedSweep, false, paint);
      startAngle += verifiedSweep;
    }

    // Pending
    final pendingSweep = (pendingCount / total) * 2 * math.pi;
    if (pendingSweep > 0) {
      paint.color = const Color(0xFFE65100);
      canvas.drawArc(Rect.fromCircle(center: center, radius: drawRadius), startAngle, pendingSweep, false, paint);
      startAngle += pendingSweep;
    }

    // Dispute
    final disputeSweep = (disputeCount / total) * 2 * math.pi;
    if (disputeSweep > 0) {
      paint.color = const Color(0xFFC62828);
      canvas.drawArc(Rect.fromCircle(center: center, radius: drawRadius), startAngle, disputeSweep, false, paint);
    }
  }

  @override
  bool shouldRepaint(covariant AnalyticsDonutPainter oldDelegate) {
    return oldDelegate.verifiedCount != verifiedCount ||
        oldDelegate.pendingCount != pendingCount ||
        oldDelegate.disputeCount != disputeCount;
  }
}

class FormFillingView extends StatelessWidget {
  final LandParcel parcel;
  final List<Project> projects;
  final List<LandParcel> allParcels;
  final int activeStep;
  final ValueChanged<int> onStepChanged;
  final ValueChanged<LandParcel> onParcelChanged;
  final Function(LandParcel, VerificationStatus, {String? title, String? desc, String? remarks}) onUpdateStatus;

  const FormFillingView({
    super.key,
    required this.parcel,
    required this.projects,
    required this.allParcels,
    required this.activeStep,
    required this.onStepChanged,
    required this.onParcelChanged,
    required this.onUpdateStatus,
  });

  void _showLandownerSearchDialog(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        String query = '';
        return StatefulBuilder(
          builder: (context, setModalState) {
            final matches = allParcels.where((p) {
              final q = query.toLowerCase();
              return p.landownerName.toLowerCase().contains(q) ||
                  p.id.toLowerCase().contains(q) ||
                  p.surveyNumber.toLowerCase().contains(q) ||
                  p.village.toLowerCase().contains(q);
            }).toList();

            return DraggableScrollableSheet(
              expand: false,
              initialChildSize: 0.75,
              maxChildSize: 0.9,
              builder: (context, scrollController) {
                return Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      Container(
                        width: 40,
                        height: 5,
                        decoration: BoxDecoration(
                          color: Colors.grey[300],
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          const Icon(Icons.person_search, color: Color(0xFF00897B)),
                          const SizedBox(width: 8),
                          const Text(
                            'Search & Select Landowner',
                            style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                          ),
                          const Spacer(),
                          IconButton(
                            icon: const Icon(Icons.close),
                            onPressed: () => Navigator.pop(context),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      TextField(
                        autofocus: true,
                        onChanged: (val) => setModalState(() => query = val),
                        decoration: InputDecoration(
                          prefixIcon: const Icon(Icons.search, color: Color(0xFF00897B)),
                          suffixIcon: query.isNotEmpty
                              ? IconButton(
                                  icon: const Icon(Icons.clear, size: 18),
                                  onPressed: () => setModalState(() => query = ''),
                                )
                              : null,
                          hintText: 'Type landowner name, parcel ID or survey no...',
                        ),
                      ),
                      const SizedBox(height: 12),
                      Expanded(
                        child: matches.isEmpty
                            ? Center(
                                child: Text('No matching landowners found', style: TextStyle(color: Colors.grey[600])),
                              )
                            : ListView.separated(
                                controller: scrollController,
                                itemCount: matches.length,
                                separatorBuilder: (_, __) => const Divider(height: 1),
                                itemBuilder: (context, index) {
                                  final p = matches[index];
                                  final isCurrent = p.id == parcel.id;
                                  return ListTile(
                                    tileColor: isCurrent ? const Color(0xFF00897B).withOpacity(0.08) : null,
                                    leading: CircleAvatar(
                                      backgroundColor: p.status.color.withOpacity(0.15),
                                      child: Icon(p.status.icon, color: p.status.color, size: 20),
                                    ),
                                    title: Text(
                                      p.landownerName,
                                      style: TextStyle(
                                        fontWeight: isCurrent ? FontWeight.bold : FontWeight.w600,
                                        color: isCurrent ? const Color(0xFF00897B) : Colors.black87,
                                      ),
                                    ),
                                    subtitle: Text(
                                      'Parcel ID: ${p.id} • Survey: ${p.surveyNumber} • ${p.village}',
                                      style: const TextStyle(fontSize: 11),
                                    ),
                                    trailing: isCurrent
                                        ? const Chip(
                                            label: Text('ACTIVE', style: TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.bold)),
                                            backgroundColor: Color(0xFF00897B),
                                          )
                                        : const Icon(Icons.arrow_forward_ios, size: 14),
                                    onTap: () {
                                      Navigator.pop(context);
                                      onParcelChanged(p);
                                    },
                                  );
                                },
                              ),
                      ),
                    ],
                  ),
                );
              },
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // STEPPER HEADER BAR (Responsive Overflow Protected)
        Container(
          color: const Color(0xFF00897B),
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 6),
          child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _stepItem(0, 'Basic Details', Icons.description),
                _stepConnector(0),
                _stepItem(1, 'Ownership', Icons.verified_user),
                _stepConnector(1),
                _stepItem(2, 'Agriculture', Icons.agriculture),
                _stepConnector(2),
                _stepItem(3, 'Assets', Icons.nature_people),
                _stepConnector(3),
                _stepItem(4, 'Bank Details', Icons.account_balance),
              ],
            ),
          ),
        ),

        // SEARCHABLE LANDOWNER BAR (REPLACES DROPDOWN MENU)
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          color: Colors.white,
          child: InkWell(
            onTap: () => _showLandownerSearchDialog(context),
            borderRadius: BorderRadius.circular(30),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: const Color(0xFFF1F5F9),
                borderRadius: BorderRadius.circular(30),
                border: Border.all(color: const Color(0xFF00897B).withOpacity(0.35)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.search, color: Color(0xFF00897B), size: 20),
                  const SizedBox(width: 10),
                  Expanded(
                    child: RichText(
                      
                      text: TextSpan(
                        style: const TextStyle(fontSize: 13, color: Colors.black87),
                        children: [
                          const TextSpan(text: 'Active Landowner: ', style: TextStyle(color: Colors.grey)),
                          TextSpan(
                            text: '${parcel.landownerName} ',
                            style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                          ),
                          TextSpan(
                            text: '(${parcel.id})',
                            style: TextStyle(color: Colors.grey[700], fontSize: 12),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 6),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: const Color(0xFF00897B),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.person_search, color: Colors.white, size: 14),
                        SizedBox(width: 4),
                        Text('Search Landowner', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        const Divider(height: 1),

        // STEP CONTENT BODY
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(14.0),
            child: _buildStepBody(context),
          ),
        ),

        // BOTTOM NAVIGATION BUTTONS
        Container(
          padding: const EdgeInsets.all(14.0),
          color: Colors.white,
          child: Row(
            children: [
              if (activeStep > 0)
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => onStepChanged(activeStep - 1),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      side: const BorderSide(color: Color(0xFF005A36)),
                    ),
                    child: Text('Previous Step', style: TextStyle(color: Color(0xFF005A36))),
                  ),
                ),
              if (activeStep > 0) const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton(
                  onPressed: () {
                    if (activeStep < 4) {
                      onStepChanged(activeStep + 1);
                    } else {
                      // Final Submit Verification
                      onUpdateStatus(parcel, VerificationStatus.verified);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Verification Form Submitted Successfully! Status set to VERIFIED.'),
                          backgroundColor: Color(0xFF2E7D32),
                        ),
                      );
                    }
                  },
                  child: Text(activeStep == 4 ? 'SUBMIT VERIFICATION' : 'Next Step'),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _stepItem(int stepIndex, String title, IconData icon) {
    final isActive = activeStep == stepIndex;
    final isDone = activeStep > stepIndex;
    return InkWell(
      onTap: () => onStepChanged(stepIndex),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CircleAvatar(
              radius: 13,
              backgroundColor: isActive
                  ? Colors.amberAccent
                  : isDone
                      ? Colors.green.shade400
                      : Colors.white24,
              child: Icon(
                isDone ? Icons.check : icon,
                size: 13,
                color: isActive ? Colors.black : Colors.white,
              ),
            ),
            const SizedBox(height: 3),
            Text(
              title,
              style: TextStyle(
                color: isActive ? Colors.amberAccent : Colors.white70,
                fontSize: 10,
                fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _stepConnector(int stepIndex) {
    return Container(
      width: 18,
      height: 2,
      color: activeStep > stepIndex ? Colors.green.shade400 : Colors.white24,
    );
  }

  Widget _buildStepBody(BuildContext context) {
    switch (activeStep) {
      case 0:
        return _buildStep1BasicDetails();
      case 1:
        return _buildStep2OwnershipAndDocs(context);
      case 2:
        return _buildStep3Agriculture(context);
      case 3:
        return _buildStep4Assets(context);
      case 4:
        return _buildStep5BankDetails();
      default:
        return Container();
    }
  }

  // FORM STEP 1 – BASIC INFORMATION
  Widget _buildStep1BasicDetails() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Basic Parcel Information',
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                ),
              ],
            ),
            const SizedBox(height: 16),
            _readOnlyField('Project Name', parcel.projectName),
            _readOnlyField('Project ID', parcel.projectId),
            Row(
              children: [
                Expanded(child: _readOnlyField('Parcel ID', parcel.id)),
                const SizedBox(width: 12),
                Expanded(child: _readOnlyField('Survey Number', parcel.surveyNumber)),
              ],
            ),
            _readOnlyField('Parcel Name / Location', parcel.parcelName),
            _readOnlyField('Landowner Name', parcel.landownerName),
            Row(
              children: [
                Expanded(child: _readOnlyField('Village', parcel.village)),
                const SizedBox(width: 12),
                Expanded(child: _readOnlyField('Taluka / District', '${parcel.taluka}, ${parcel.district}')),
              ],
            ),
            _readOnlyField('Land Area', '${parcel.landAreaHectares} Hectares (${(parcel.landAreaHectares * 2.471).toStringAsFixed(2)} Acres)'),
          ],
        ),
      ),
    );
  }

  // FORM STEP 2 – OWNERSHIP & DOCUMENT VERIFICATION
  Widget _buildStep2OwnershipAndDocs(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Ownership Document Verification',
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                ),
                const SizedBox(height: 4),
                Text(
                  'Inspect official Revenue Department documents attached to this parcel.',
                  style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                ),
                const SizedBox(height: 16),
                ...parcel.documents.map((doc) => _buildDocCard(context, doc)),
              ],
            ),
          ),
        ),
        const SizedBox(height: 14),
        // DISCREPANCY REPORTING BOX
        Card(
          color: const Color(0xFFFFFBEB),
          shape: RoundedRectangleBorder(
            side: const BorderSide(color: Color(0xFFF59E0B), width: 1.2),
            borderRadius: BorderRadius.circular(14),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(Icons.report_problem, color: Color(0xFFD97706)),
                    SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Report Discrepancy / Ownership Issue',
                        style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFFB45309)),
                        
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                const Text(
                  'If you find any discrepancy between official records and physical ground status, document it here to mark parcel for dispute.',
                  style: TextStyle(fontSize: 12, color: Colors.black87),
                ),
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () => _showDisputeModal(context),
                    label: const Text('⚠ MARK FOR DISPUTE VERIFICATION'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFC62828),
                      foregroundColor: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildDocCard(BuildContext context, OwnershipDoc doc) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey[50],
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.grey[200]!),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.red.shade50,
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.picture_as_pdf, color: Colors.red, size: 22),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(doc.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13), ),
                Text('Issued: ${doc.dateIssued} • Verified Revenue Record', style: TextStyle(fontSize: 11, color: Colors.grey[600])),
              ],
            ),
          ),
          const SizedBox(width: 6),
          FittedBox(
            fit: BoxFit.scaleDown,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                backgroundColor: const Color(0xFF005A36),
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (_) => AlertDialog(
                    title: Text(doc.name, ),
                    content: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          height: 200,
                          color: Colors.grey[200],
                          child: const Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.description, size: 50, color: Color(0xFF00897B)),
                                SizedBox(height: 8),
                                Text('Official Government 7/12 Satbara Digital Record', textAlign: TextAlign.center),
                                Text('Verified Seal Stamp • Revenue Dept', textAlign: TextAlign.center),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                    actions: [
                      TextButton(onPressed: () => Navigator.pop(context), child: const Text('Close')),
                    ],
                  ),
                );
              },
              icon: const Icon(Icons.remove_red_eye, size: 13),
              label: const Text('View', style: TextStyle(fontSize: 11)),
            ),
          ),
        ],
      ),
    );
  }

  // FORM STEP 3 – AGRICULTURAL DETAILS (SUPPORTING MULTIPLE CROPS / ADD CROP)
  Widget _buildStep3Agriculture(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Expanded(
                  child: Text(
                    'Agricultural Data Collection',
                    style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                    
                  ),
                ),
                FittedBox(
                  fit: BoxFit.scaleDown,
                  child: ElevatedButton.icon(
                    onPressed: () => _showAddCropDialog(context),
                    icon: const Icon(Icons.add, size: 16),
                    label: const Text(
                      'Add Crop',
                      style: TextStyle(fontSize: 12),
                      maxLines: 1,
                      
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF00897B),
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              'Record all standing crops on this parcel requiring agricultural evaluation.',
              style: TextStyle(fontSize: 12, color: Colors.grey[600]),
            ),
            const SizedBox(height: 16),
            if (parcel.crops.isEmpty)
              Center(
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    children: [
                      Icon(Icons.grass, size: 40, color: Colors.grey[400]),
                      const SizedBox(height: 8),
                      Text('No crop details added yet. Click "+ Add Crop" to add standing crops.', textAlign: TextAlign.center, style: TextStyle(color: Colors.grey[600], fontSize: 13)),
                    ],
                  ),
                ),
              )
            else
              ...parcel.crops.map((crop) => _buildCropCard(context, crop)),
          ],
        ),
      ),
    );
  }

  Widget _buildCropCard(BuildContext context, CropRecord crop) {
    IconData cropIcon = Icons.grass;
    if (crop.cropType.contains('Sugarcane')) {
      cropIcon = Icons.nature;
    } else if (crop.cropType.contains('Paddy')) {
      cropIcon = Icons.water_drop;
    } else if (crop.cropType.contains('Cotton')) {
      cropIcon = Icons.cloud;
    } else if (crop.cropType.contains('Fruit')) {
      cropIcon = Icons.local_florist;
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.green.shade50.withOpacity(0.6),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.green.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 16,
                backgroundColor: const Color(0xFF00897B),
                child: Icon(cropIcon, color: Colors.white, size: 18),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(crop.cropType, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00897B))),
                    Text('Irrigation: ${crop.irrigationType}', style: TextStyle(fontSize: 11, color: Colors.grey[700])),
                  ],
                ),
              ),
              StatefulBuilder(
                builder: (context, setCropState) {
                  return IconButton(
                    icon: const Icon(Icons.delete_outline, color: Color(0xFFC62828), size: 20),
                    onPressed: () {
                      setCropState(() {
                        parcel.crops.removeWhere((c) => c.id == crop.id);
                      });
                    },
                  );
                },
              ),
            ],
          ),
          const Divider(height: 16),
          Row(
            children: [
              Expanded(child: _cropInfoChip('Cultivation Area', '${crop.areaUnderCultivation} Ha')),
              const SizedBox(width: 8),
              Expanded(child: _cropInfoChip('Expected Yield', '${crop.expectedYieldTons} Tons')),
            ],
          ),
          if (crop.remarks.isNotEmpty) ...[
            const SizedBox(height: 6),
            Text('Remarks: ${crop.remarks}', style: TextStyle(fontSize: 11, color: Colors.grey[800])),
          ],
        ],
      ),
    );
  }

  Widget _cropInfoChip(String label, String value) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.grey[300]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(fontSize: 10, color: Colors.grey[600]), ),
          Text(value, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold), ),
        ],
      ),
    );
  }

  void _showAddCropDialog(BuildContext context) {
    String cropType = 'Sugarcane';
    final areaCtrl = TextEditingController(text: '1.5');
    final yieldCtrl = TextEditingController(text: '35.0');
    final irrigationCtrl = TextEditingController(text: 'Drip / Open Well');
    final remarksCtrl = TextEditingController(text: 'Active standing crop harvest');

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: const Row(
            children: [
              Icon(Icons.agriculture, color: Color(0xFF00897B)),
              SizedBox(width: 8),
              Expanded(
                child: Text('Add Crop Record'),
              ),
            ],
          ),
          content: StatefulBuilder(
            builder: (context, setDialogState) {
              return SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    DropdownButtonFormField<String>(
                      value: cropType,
                      isExpanded: true,
                      decoration: const InputDecoration(labelText: 'Crop Type'),
                      items: const [
                        DropdownMenuItem(value: 'Sugarcane', child: Text('Sugarcane')),
                        DropdownMenuItem(value: 'Paddy / Rice', child: Text('Paddy / Rice')),
                        DropdownMenuItem(value: 'Cotton', child: Text('Cotton')),
                        DropdownMenuItem(value: 'Soybean', child: Text('Soybean')),
                        DropdownMenuItem(value: 'Wheat', child: Text('Wheat')),
                        DropdownMenuItem(value: 'Fruit Orchard (Mango/Pomegranate)', child: Text('Fruit Orchard')),
                        DropdownMenuItem(value: 'Uncultivated / Fallow Land', child: Text('Fallow Land')),
                      ],
                      onChanged: (val) {
                        if (val != null) setDialogState(() => cropType = val);
                      },
                    ),
                    const SizedBox(height: 12),
                    TextField(controller: areaCtrl, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Area Under Cultivation (Hectares)')),
                    const SizedBox(height: 12),
                    TextField(controller: yieldCtrl, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Expected Yield (Tons / Quintals)')),
                    const SizedBox(height: 12),
                    TextField(controller: irrigationCtrl, decoration: const InputDecoration(labelText: 'Irrigation Source')),
                    const SizedBox(height: 12),
                    TextField(controller: remarksCtrl, decoration: const InputDecoration(labelText: 'Additional Remarks')),
                  ],
                ),
              );
            },
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
            ElevatedButton(
              onPressed: () {
                parcel.crops.add(
                  CropRecord(
                    id: 'CRP-${DateTime.now().millisecondsSinceEpoch}',
                    cropType: cropType,
                    areaUnderCultivation: double.tryParse(areaCtrl.text) ?? 1.0,
                    expectedYieldTons: double.tryParse(yieldCtrl.text) ?? 10.0,
                    irrigationType: irrigationCtrl.text,
                    remarks: remarksCtrl.text,
                  ),
                );
                Navigator.pop(context);
              },
              child: const Text('Save Crop'),
            ),
          ],
        );
      },
    );
  }

  // FORM STEP 4 – ASSET VERIFICATION
  Widget _buildStep4Assets(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Expanded(
                      child: Text(
                        'Land Assets',
                        style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                        
                      ),
                    ),
                    FittedBox(
                      fit: BoxFit.scaleDown,
                      child: ElevatedButton.icon(
                        onPressed: () => _showAddAssetDialog(context),
                        icon: const Icon(Icons.add, size: 16),
                        label: const Text(
                          'Add Asset',
                          style: TextStyle(fontSize: 12),
                          maxLines: 1,
                          
                        ),
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  'Record all standing assets (Trees, Wells, Structures) requiring compensation valuation.',
                  style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                ),
                const SizedBox(height: 16),
                if (parcel.assets.isEmpty)
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.all(24.0),
                      child: Column(
                        children: [
                          Icon(Icons.park_outlined, size: 40, color: Colors.grey[400]),
                          const SizedBox(height: 8),
                          Text('No physical assets recorded yet.', style: TextStyle(color: Colors.grey[600])),
                        ],
                      ),
                    ),
                  )
                else
                  ...parcel.assets.map((asset) => _buildAssetCard(context, asset)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAssetCard(BuildContext context, AssetRecord asset) {
    IconData icon;
    if (asset.category == 'Tree') {
      icon = Icons.nature;
    } else if (asset.category == 'Well') {
      icon = Icons.water_drop;
    } else {
      icon = Icons.home_work;
    }

    final isUploaded = asset.photoUploaded;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey[50],
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.grey[200]!),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: const Color(0xFF00897B).withOpacity(0.1),
            child: Icon(icon, color: const Color(0xFF00897B)),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(asset.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14), ),
                Text('Category: ${asset.category} • Count: ${asset.count} units', style: TextStyle(fontSize: 12, color: Colors.grey[700])),
                Text('Condition: ${asset.condition} | ${asset.remarks}', style: TextStyle(fontSize: 11, color: Colors.grey[600])),
              ],
            ),
          ),
          const SizedBox(width: 6),
          Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: () => _showPhotoUploadBottomSheet(context, asset),
              borderRadius: BorderRadius.circular(6),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
                decoration: BoxDecoration(
                  color: isUploaded ? const Color(0xFFDCFCE7) : const Color(0xFFFEF3C7),
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(
                    color: isUploaded ? const Color(0xFF16A34A) : const Color(0xFFD97706),
                    width: 1,
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      isUploaded ? Icons.check_circle_rounded : Icons.camera_alt,
                      size: 13,
                      color: isUploaded ? const Color(0xFF15803D) : const Color(0xFFB45309),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      isUploaded ? 'Photo Attached' : 'Attach Photo',
                      style: TextStyle(
                        fontSize: 10,
                        color: isUploaded ? const Color(0xFF15803D) : const Color(0xFFB45309),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showPhotoUploadBottomSheet(BuildContext context, AssetRecord asset) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        'Asset Photo: ${asset.title}',
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                        
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, size: 20),
                      onPressed: () => Navigator.pop(ctx),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                ListTile(
                  leading: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(color: Colors.green.shade50, shape: BoxShape.circle),
                    child: const Icon(Icons.camera_alt_rounded, color: Color(0xFF00897B)),
                  ),
                  title: const Text('Take Photo from Phone Camera', style: TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: const Text('Capture live asset photograph on site'),
                  onTap: () {
                    Navigator.pop(ctx);
                    asset.photoUploaded = true;
                    (context as Element).markNeedsBuild();
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Row(
                          children: [
                            const Icon(Icons.check_circle, color: Colors.white, size: 20),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Text('Captured & attached camera photo for ${asset.title}'),
                            ),
                          ],
                        ),
                        backgroundColor: const Color(0xFF005A36),
                        behavior: SnackBarBehavior.floating,
                        duration: const Duration(seconds: 3),
                      ),
                    );
                  },
                ),
                const Divider(),
                ListTile(
                  leading: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(color: Colors.blue.shade50, shape: BoxShape.circle),
                    child: const Icon(Icons.photo_library_rounded, color: Colors.blue),
                  ),
                  title: const Text('Choose from Phone Gallery', style: TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: const Text('Upload existing image from device gallery'),
                  onTap: () {
                    Navigator.pop(ctx);
                    asset.photoUploaded = true;
                    (context as Element).markNeedsBuild();
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Row(
                          children: [
                            const Icon(Icons.check_circle, color: Colors.white, size: 20),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Text('Selected & attached gallery photo for ${asset.title}'),
                            ),
                          ],
                        ),
                        backgroundColor: const Color(0xFF005A36),
                        behavior: SnackBarBehavior.floating,
                        duration: const Duration(seconds: 3),
                      ),
                    );
                  },
                ),
                if (asset.photoUploaded) ...[
                  const Divider(),
                  ListTile(
                    leading: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(color: Colors.red.shade50, shape: BoxShape.circle),
                      child: const Icon(Icons.delete_outline, color: Colors.red),
                    ),
                    title: const Text('Remove Attached Photo', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
                    onTap: () {
                      Navigator.pop(ctx);
                      asset.photoUploaded = false;
                      (context as Element).markNeedsBuild();
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Removed photo for ${asset.title}'),
                          duration: const Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                ],
              ],
            ),
          ),
        );
      },
    );
  }

  // FORM STEP 5 – BANK DETAILS & SUBMISSION
  Widget _buildStep5BankDetails() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Landowner Direct Compensation Bank Account',
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 16),
            TextFormField(
              initialValue: parcel.aadhaarNo,
              decoration: const InputDecoration(labelText: 'Landowner Aadhaar Number'),
              onChanged: (val) => parcel.aadhaarNo = val,
            ),
            const SizedBox(height: 14),
            TextFormField(
              initialValue: parcel.bankAccountNo,
              decoration: const InputDecoration(labelText: 'Bank Account Number'),
              onChanged: (val) => parcel.bankAccountNo = val,
            ),
            const SizedBox(height: 14),
            TextFormField(
              initialValue: parcel.ifscCode,
              decoration: const InputDecoration(labelText: 'Bank IFSC Code'),
              onChanged: (val) => parcel.ifscCode = val,
            ),
            const SizedBox(height: 14),
            TextFormField(
              initialValue: parcel.bankName,
              decoration: const InputDecoration(labelText: 'Bank Name & Branch'),
              onChanged: (val) => parcel.bankName = val,
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(8)),
              child: const Row(
                children: [
                  Icon(Icons.verified, color: Colors.blue),
                  SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'DBT Bank verification enabled. Direct Land Acquisition compensation will be transferred to this account.',
                      style: TextStyle(fontSize: 12, color: Colors.blue),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _readOnlyField(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(fontSize: 11, color: Colors.grey[600], fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              color: Colors.grey[100],
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.grey[200]!),
            ),
            child: Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
          ),
        ],
      ),
    );
  }

  void _showDisputeModal(BuildContext context) {
    final titleCtrl = TextEditingController(text: 'Boundary Overlap & Document Discrepancy');
    final descCtrl = TextEditingController(text: 'Physical field boundary measurements differ from 7/12 extract.');

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: const Row(
            children: [
              Icon(Icons.warning_amber_rounded, color: Color(0xFFC62828)),
              SizedBox(width: 8),
              Expanded(
                child: Text('Report Dispute Verification'),
              ),
            ],
          ),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: titleCtrl,
                  decoration: const InputDecoration(labelText: 'Issue Title'),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: descCtrl,
                  maxLines: 3,
                  decoration: const InputDecoration(labelText: 'Issue Description & Remarks'),
                ),
                const SizedBox(height: 12),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.camera_alt),
                  label: const Text('Attach Evidence Photograph'),
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.grey[700]),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFC62828)),
              onPressed: () {
                Navigator.pop(context);
                onUpdateStatus(
                  parcel,
                  VerificationStatus.dispute,
                  title: titleCtrl.text,
                  desc: descCtrl.text,
                );
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('🔴 Parcel marked for DISPUTE VERIFICATION. Synced with Analytics & GIS Map.'),
                    backgroundColor: Color(0xFFC62828),
                  ),
                );
              },
              child: const Text('MARK DISPUTE'),
            ),
          ],
        );
      },
    );
  }

  void _showAddAssetDialog(BuildContext context) {
    String category = 'Tree';
    final titleCtrl = TextEditingController(text: 'Teakwood Tree');
    final countCtrl = TextEditingController(text: '5');
    final remarkCtrl = TextEditingController(text: 'Mature timber tree');

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: const Text('Add Physical Land Asset'),
          content: StatefulBuilder(
            builder: (context, setDialogState) {
              return SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    DropdownButtonFormField<String>(
                      value: category,
                      isExpanded: true,
                      decoration: const InputDecoration(labelText: 'Asset Category'),
                      items: const [
                        DropdownMenuItem(value: 'Tree', child: Text('🌳 Tree Asset')),
                        DropdownMenuItem(value: 'Well', child: Text('🕳️ Well Asset')),
                        DropdownMenuItem(value: 'Structure', child: Text('🏠 Structure / Building')),
                        DropdownMenuItem(value: 'Other', child: Text('⚙️ Other Asset')),
                      ],
                      onChanged: (val) {
                        if (val != null) setDialogState(() => category = val);
                      },
                    ),
                    const SizedBox(height: 12),
                    TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Asset Description/Species')),
                    const SizedBox(height: 12),
                    TextField(controller: countCtrl, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Quantity / Count')),
                    const SizedBox(height: 12),
                    TextField(controller: remarkCtrl, decoration: const InputDecoration(labelText: 'Condition / Remarks')),
                  ],
                ),
              );
            },
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
            ElevatedButton(
              onPressed: () {
                parcel.assets.add(
                  AssetRecord(
                    id: 'AST-${DateTime.now().millisecondsSinceEpoch}',
                    category: category,
                    title: titleCtrl.text,
                    count: int.tryParse(countCtrl.text) ?? 1,
                    condition: 'Good',
                    remarks: remarkCtrl.text,
                  ),
                );
                Navigator.pop(context);
              },
              child: const Text('Save Asset'),
            ),
          ],
        );
      },
    );
  }
}

// ============================================================================
// 9. SCREEN 4 – MAP & GIS INTERACTIVE SCREEN
// ============================================================================

class MapGisView extends StatefulWidget {
  final List<Project> projects;
  final List<LandParcel> parcels;
  final Project selectedProject;
  final ValueChanged<Project> onSelectProject;
  final ValueChanged<LandParcel> onOpenForm;

  const MapGisView({
    super.key,
    required this.projects,
    required this.parcels,
    required this.selectedProject,
    required this.onSelectProject,
    required this.onOpenForm,
  });

  @override
  State<MapGisView> createState() => _MapGisViewState();
}

class _MapGisViewState extends State<MapGisView> {
  final MapController _mapController = MapController();
  LandParcel? _tappedParcel;
  String _mapLayer = 'Satellite'; // 'Satellite' or 'Vector'

  // Cadastral Survey Polygons matching the reference photo
  final List<CadastralSurveyPolygon> _cadastralPolygons = [
    CadastralSurveyPolygon(
      surveyNo: '265',
      points: [
        const LatLng(19.9580, 73.7900),
        const LatLng(19.9592, 73.7922),
        const LatLng(19.9578, 73.7928),
        const LatLng(19.9566, 73.7906),
      ],
      centroid: const LatLng(19.9579, 73.7914),
    ),
    CadastralSurveyPolygon(
      surveyNo: '264',
      points: [
        const LatLng(19.9578, 73.7928),
        const LatLng(19.9590, 73.7950),
        const LatLng(19.9575, 73.7955),
        const LatLng(19.9563, 73.7933),
      ],
      centroid: const LatLng(19.9576, 73.7941),
    ),
    CadastralSurveyPolygon(
      surveyNo: '263',
      points: [
        const LatLng(19.9566, 73.7906),
        const LatLng(19.9578, 73.7928),
        const LatLng(19.9563, 73.7933),
        const LatLng(19.9551, 73.7911),
      ],
      centroid: const LatLng(19.9564, 73.7919),
    ),
    CadastralSurveyPolygon(
      surveyNo: '260',
      points: [
        const LatLng(19.9563, 73.7933),
        const LatLng(19.9575, 73.7955),
        const LatLng(19.9560, 73.7960),
        const LatLng(19.9548, 73.7938),
      ],
      centroid: const LatLng(19.9561, 73.7946),
    ),
    CadastralSurveyPolygon(
      surveyNo: '259',
      points: [
        const LatLng(19.9551, 73.7911),
        const LatLng(19.9563, 73.7933),
        const LatLng(19.9548, 73.7938),
        const LatLng(19.9536, 73.7916),
      ],
      centroid: const LatLng(19.9549, 73.7924),
    ),
    CadastralSurveyPolygon(
      surveyNo: '159',
      points: [
        const LatLng(19.9536, 73.7916),
        const LatLng(19.9548, 73.7938),
        const LatLng(19.9533, 73.7943),
        const LatLng(19.9521, 73.7921),
      ],
      centroid: const LatLng(19.9534, 73.7929),
    ),
    CadastralSurveyPolygon(
      surveyNo: '158',
      points: [
        const LatLng(19.9521, 73.7921),
        const LatLng(19.9533, 73.7943),
        const LatLng(19.9518, 73.7948),
        const LatLng(19.9506, 73.7926),
      ],
      centroid: const LatLng(19.9519, 73.7934),
    ),
    CadastralSurveyPolygon(
      surveyNo: '157',
      points: [
        const LatLng(19.9506, 73.7926),
        const LatLng(19.9518, 73.7948),
        const LatLng(19.9503, 73.7953),
        const LatLng(19.9491, 73.7931),
      ],
      centroid: const LatLng(19.9504, 73.7939),
    ),
    CadastralSurveyPolygon(
      surveyNo: '108',
      points: [
        const LatLng(19.9491, 73.7931),
        const LatLng(19.9503, 73.7953),
        const LatLng(19.9488, 73.7958),
        const LatLng(19.9476, 73.7936),
      ],
      centroid: const LatLng(19.9489, 73.7944),
    ),
    CadastralSurveyPolygon(
      surveyNo: '107',
      points: [
        const LatLng(19.9476, 73.7936),
        const LatLng(19.9488, 73.7958),
        const LatLng(19.9473, 73.7963),
        const LatLng(19.9461, 73.7941),
      ],
      centroid: const LatLng(19.9474, 73.7949),
    ),
  ];

  void _zoomIn() {
    _mapController.move(_mapController.camera.center, _mapController.camera.zoom + 1.0);
  }

  void _zoomOut() {
    _mapController.move(_mapController.camera.center, _mapController.camera.zoom - 1.0);
  }

  @override
  Widget build(BuildContext context) {
    final projectParcels = widget.parcels.where((p) => p.projectId == widget.selectedProject.id).toList();

    return Stack(
      children: [
        // 1. FLUTTER LEAFLET SATELLITE MAP ENGINE
        FlutterMap(
          mapController: _mapController,
          options: const MapOptions(
            initialCenter: LatLng(19.9540, 73.7925),
            initialZoom: 14.5,
            minZoom: 10.0,
            maxZoom: 18.0,
          ),
          children: [
            // Tile Layer (Satellite vs Street Vector)
            TileLayer(
              urlTemplate: _mapLayer == 'Satellite'
                  ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                  : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
              userAgentPackageName: 'com.swadesh.mobile_frontend',
            ),

            // Yellow Cadastral Survey Parcel Polygons
            PolygonLayer(
              polygons: _cadastralPolygons.map((poly) {
                final isSelected = _tappedParcel?.surveyNumber.contains(poly.surveyNo) ?? false;
                return Polygon(
                  points: poly.points,
                  color: isSelected
                      ? Colors.cyan.withOpacity(0.4)
                      : Colors.yellow.withOpacity(0.18),
                  borderColor: isSelected ? const Color(0xFF06B6D4) : const Color(0xFFFACC15),
                  borderStrokeWidth: isSelected ? 3.5 : 1.8,
                );
              }).toList(),
            ),

            // Survey Number Markers on Polygons
            MarkerLayer(
              markers: [
                ..._cadastralPolygons.map((poly) {
                  return Marker(
                    point: poly.centroid,
                    width: 45,
                    height: 22,
                    child: GestureDetector(
                      onTap: () {
                        if (projectParcels.isNotEmpty) {
                          setState(() {
                            _tappedParcel = projectParcels.firstWhere(
                              (p) => p.surveyNumber.contains(poly.surveyNo),
                              orElse: () => projectParcels.first,
                            );
                          });
                          _showParcelBottomSheet(context, _tappedParcel!);
                        }
                      },
                      child: Container(
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.6),
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(color: const Color(0xFFFACC15), width: 1),
                        ),
                        child: Text(
                          poly.surveyNo,
                          style: const TextStyle(
                            color: Color(0xFFFACC15),
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  );
                }),

                // Landmark Point Marker
                Marker(
                  point: const LatLng(19.9585, 73.7960),
                  width: 140,
                  height: 32,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(6),
                      boxShadow: const [BoxShadow(color: Colors.black26, blurRadius: 4)],
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.flight_takeoff, size: 14, color: Colors.blue),
                        SizedBox(width: 4),
                        Expanded(
                          child: Text('Land', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),

        // 2. TOP PROJECT CORRIDOR FILTER BAR
        Positioned(
          top: 12,
          left: 12,
          right: 12,
          child: Card(
            elevation: 4,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              child: Row(
                children: [
                  const Icon(Icons.layers, color: Color(0xFF00897B)),
                  const SizedBox(width: 8),
                  Expanded(
                    child: DropdownButton<Project>(
                      value: widget.selectedProject,
                      isExpanded: true,
                      underline: const SizedBox(),
                      items: widget.projects.map((proj) {
                        return DropdownMenuItem(value: proj, child: Text(proj.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)));
                      }).toList(),
                      onChanged: (val) {
                        if (val != null) {
                          widget.onSelectProject(val);
                          setState(() => _tappedParcel = null);
                        }
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),

        // 3. LEAFLET ZOOM CONTROLS (Top-Left + / - Buttons)
        Positioned(
          top: 72,
          left: 16,
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(6),
              boxShadow: const [BoxShadow(color: Colors.black26, blurRadius: 6)],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                InkWell(
                  onTap: _zoomIn,
                  child: const SizedBox(
                    width: 34,
                    height: 34,
                    child: Center(
                      child: Text('+', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black87)),
                    ),
                  ),
                ),
                const Divider(height: 1, thickness: 1, color: Colors.black12),
                InkWell(
                  onTap: _zoomOut,
                  child: const SizedBox(
                    width: 34,
                    height: 34,
                    child: Center(
                      child: Text('-', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.black87)),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),

        // 4. MAP LAYER SWITCHER & RECENTER CONTROLS (Top Right)
        Positioned(
          top: 72,
          right: 16,
          child: Column(
            children: [
              FloatingActionButton.small(
                heroTag: 'map_layer_toggle',
                backgroundColor: Colors.white,
                child: Icon(
                  _mapLayer == 'Satellite' ? Icons.map : Icons.satellite_alt,
                  color: const Color(0xFF00897B),
                ),
                onPressed: () {
                  setState(() {
                    _mapLayer = _mapLayer == 'Satellite' ? 'Vector' : 'Satellite';
                  });
                },
              ),
              const SizedBox(height: 8),
              FloatingActionButton.small(
                heroTag: 'recenter_map',
                backgroundColor: Colors.white,
                child: const Icon(Icons.my_location, color: Color(0xFF00897B)),
                onPressed: () {
                  _mapController.move(const LatLng(19.9540, 73.7925), 14.5);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Centered to Cadastral Survey Grid.')),
                  );
                },
              ),
            ],
          ),
        ),

        // 5. LEAFLET SCALE BAR (Bottom Left - 500 m)
        Positioned(
          bottom: 12,
          left: 16,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.9),
              border: Border.all(color: Colors.black45, width: 1),
              borderRadius: BorderRadius.circular(3),
            ),
            child: const Text(
              '500 m',
              style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.black87),
            ),
          ),
        ),

        // 6. LEAFLET ATTRIBUTION BADGE (Bottom Right)
        Positioned(
          bottom: 4,
          right: 8,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            color: Colors.white.withOpacity(0.8),
            child: const Text(
              'Leaflet | © OpenStreetMap',
              style: TextStyle(fontSize: 10, color: Colors.black87),
            ),
          ),
        ),
      ],
    );
  }

  void _showParcelBottomSheet(BuildContext context, LandParcel parcel) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (context) {
        final status = parcel.status;
        return Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('PARCEL GIS DETAILS', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.grey[600])),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(color: status.color.withOpacity(0.12), borderRadius: BorderRadius.circular(12)),
                    child: Text(status.label, style: TextStyle(color: status.color, fontWeight: FontWeight.bold, fontSize: 11)),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text('Parcel ID: ${parcel.id}', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF00897B))),
              Text('Landowner: ${parcel.landownerName}', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
              Text('Survey No: ${parcel.surveyNumber} • Area: ${parcel.landAreaHectares} Ha • Village: ${parcel.village}', style: TextStyle(fontSize: 12, color: Colors.grey[700])),
              const Divider(height: 24),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {
                        Navigator.pop(context);
                        widget.onOpenForm(parcel);
                      },
                      icon: const Icon(Icons.edit_note),
                      label: const Text('Open Verification Form'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF00897B),
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}

class CadastralSurveyPolygon {
  final String surveyNo;
  final List<LatLng> points;
  final LatLng centroid;

  CadastralSurveyPolygon({
    required this.surveyNo,
    required this.points,
    required this.centroid,
  });
}
