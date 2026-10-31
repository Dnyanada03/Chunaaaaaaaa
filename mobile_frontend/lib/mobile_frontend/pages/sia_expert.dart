import 'package:flutter/material.dart';
import '../theme/app_design.dart';
import 'surveyor.dart';
 // Imports revenue data structures & sample parcels

// ============================================================================
// 1. SIA DATA MODELS & ENUMS
// ============================================================================

enum UserRole {
  surveyor,  // Field Surveyor / Talathi (Revenue Dept)
  siaExpert, // SIA Coordinator / Expert (Social Impact Assessment)
  landowner, // Landowner / PAP (Affected Person)
}

enum SiaSyncStatus {
  draft,
  savedOffline,
  pendingSync,
  synced,
  submitted,
}

class SiaProject {
  final String id;
  final String name;
  final String publicPurpose;
  final String district;
  final String taluka;
  final int totalVillages;
  final int totalFamilies;
  int surveyedFamilies;
  int problemCases;
  int rehabCases;
  final String startDate;
  final String expectedEndDate;
  final String gazetteDate;
  final String objectionDeadlineDate;
  final int objectionsReceived;
  final int objectionsPending;

  SiaProject({
    required this.id,
    required this.name,
    required this.publicPurpose,
    required this.district,
    required this.taluka,
    required this.totalVillages,
    required this.totalFamilies,
    required this.surveyedFamilies,
    required this.problemCases,
    required this.rehabCases,
    required this.startDate,
    required this.expectedEndDate,
    required this.gazetteDate,
    required this.objectionDeadlineDate,
    required this.objectionsReceived,
    required this.objectionsPending,
  });
}

class SiaSurveyRecord {
  final String id;
  final String fieldId;
  final String projectId;
  final String papId;
  String papName;
  String fatherName;
  int age;
  String gender;
  String contactNo;
  String aadhaarNo;
  String surveyNumber;
  String parcelId;
  double landArea;
  String village;
  String category;
  int totalFamilyMembers;
  int childrenCount;
  int elderlyCount;
  int disabledCount;
  int maleCount;
  int femaleCount;
  String primaryOccupation;
  String secondaryOccupation;
  double monthlyIncome;
  String propertyAffected;
  String socialImpactLevel;
  bool hasDispute;
  String disputeDetails;
  bool requiresRehab;
  String rehabReason;
  SiaSyncStatus status;
  String dateCreated;
  bool photoUploaded;
  String gpsLocation;

  SiaSurveyRecord({
    required this.id,
    required this.fieldId,
    required this.projectId,
    required this.papId,
    required this.papName,
    required this.fatherName,
    required this.age,
    required this.gender,
    required this.contactNo,
    required this.aadhaarNo,
    required this.surveyNumber,
    required this.parcelId,
    required this.landArea,
    required this.village,
    required this.category,
    required this.totalFamilyMembers,
    required this.childrenCount,
    required this.elderlyCount,
    required this.disabledCount,
    required this.maleCount,
    required this.femaleCount,
    required this.primaryOccupation,
    required this.secondaryOccupation,
    required this.monthlyIncome,
    required this.propertyAffected,
    required this.socialImpactLevel,
    required this.hasDispute,
    required this.disputeDetails,
    required this.requiresRehab,
    required this.rehabReason,
    required this.status,
    required this.dateCreated,
    this.photoUploaded = true,
    this.gpsLocation = '19.9540° N, 73.7925° E',
  });
}

class PublicHearing {
  final String id;
  final String village;
  final String date;
  final String time;
  final String venue;
  final int affectedFamiliesCount;
  final String status;
  final int issuesRaisedCount;
  final bool minutesUploaded;

  PublicHearing({
    required this.id,
    required this.village,
    required this.date,
    required this.time,
    required this.venue,
    required this.affectedFamiliesCount,
    required this.status,
    required this.issuesRaisedCount,
    required this.minutesUploaded,
  });
}

// ============================================================================
// 2. SAMPLE SIA DATASETS
// ============================================================================

final List<SiaProject> sampleSiaProjects = [
  SiaProject(
    id: 'SIA-MH-2026-01',
    name: 'NH-48 Pune-Satara Expressway 8-Lane Widening Corridor',
    publicPurpose: 'National Highway Infrastructure Expansion & Traffic De-congestion',
    district: 'Pune',
    taluka: 'Haveli',
    totalVillages: 14,
    totalFamilies: 1500,
    surveyedFamilies: 1248,
    problemCases: 186,
    rehabCases: 74,
    startDate: '01 June 2026',
    expectedEndDate: '30 November 2026',
    gazetteDate: '01 August 2026',
    objectionDeadlineDate: '30 September 2026',
    objectionsReceived: 48,
    objectionsPending: 12,
  ),
  SiaProject(
    id: 'SIA-MH-2026-02',
    name: 'Pune-Nashik Semi High-Speed Rail Alignment Phase 1',
    publicPurpose: 'Public Transportation & Regional Freight Rail Connectivity',
    district: 'Pune',
    taluka: 'Khed',
    totalVillages: 9,
    totalFamilies: 850,
    surveyedFamilies: 620,
    problemCases: 64,
    rehabCases: 28,
    startDate: '15 July 2026',
    expectedEndDate: '15 January 2027',
    gazetteDate: '15 August 2026',
    objectionDeadlineDate: '14 October 2026',
    objectionsReceived: 24,
    objectionsPending: 8,
  ),
];

final List<SiaSurveyRecord> sampleSiaSurveys = [
  SiaSurveyRecord(
    id: 'SIA-REC-101',
    fieldId: 'FLD-MH-4092-01',
    projectId: 'SIA-MH-2026-01',
    papId: 'PAP-MH-98401',
    papName: 'Suresh Tukaram Patil',
    fatherName: 'Tukaram Patil',
    age: 52,
    gender: 'Male',
    contactNo: '+91 98221 45678',
    aadhaarNo: '•••• •••• 4092',
    surveyNumber: '265/1A',
    parcelId: 'MH-PL-10234',
    landArea: 1.85,
    village: 'Chakan Phata',
    category: 'Agricultural & Residential',
    totalFamilyMembers: 6,
    childrenCount: 2,
    elderlyCount: 1,
    disabledCount: 0,
    maleCount: 3,
    femaleCount: 3,
    primaryOccupation: 'Farmer / Agriculture',
    secondaryOccupation: 'Local Dairy Business',
    monthlyIncome: 35000.0,
    propertyAffected: 'House & Agricultural Land',
    socialImpactLevel: 'High',
    hasDispute: false,
    disputeDetails: 'None',
    requiresRehab: true,
    rehabReason: 'Primary ancestral residence & dairy shed in acquisition path requiring relocation.',
    status: SiaSyncStatus.submitted,
    dateCreated: '10 Sept 2026',
  ),
  SiaSurveyRecord(
    id: 'SIA-REC-102',
    fieldId: 'FLD-MH-4092-02',
    projectId: 'SIA-MH-2026-01',
    papId: 'PAP-MH-98402',
    papName: 'Ramesh Baliram Jadhav',
    fatherName: 'Baliram Jadhav',
    age: 48,
    gender: 'Male',
    contactNo: '+91 98901 12345',
    aadhaarNo: '•••• •••• 8841',
    surveyNumber: '262/2',
    parcelId: 'MH-PL-10235',
    landArea: 0.95,
    village: 'Chakan Phata',
    category: 'Agricultural',
    totalFamilyMembers: 5,
    childrenCount: 1,
    elderlyCount: 2,
    disabledCount: 0,
    maleCount: 2,
    femaleCount: 3,
    primaryOccupation: 'Irrigated Sugarcane Farming',
    secondaryOccupation: 'Agricultural Laborer',
    monthlyIncome: 24000.0,
    propertyAffected: 'Open Agricultural Land & Tube Well',
    socialImpactLevel: 'Moderate',
    hasDispute: true,
    disputeDetails: 'Co-sharer objection regarding land partition registered.',
    requiresRehab: false,
    rehabReason: 'Partial land acquisition with remaining viable agricultural area.',
    status: SiaSyncStatus.pendingSync,
    dateCreated: '11 Sept 2026',
  ),
  SiaSurveyRecord(
    id: 'SIA-REC-103',
    fieldId: 'FLD-MH-4092-03',
    projectId: 'SIA-MH-2026-01',
    papId: 'PAP-MH-98403',
    papName: 'Sunita Ananda Shinde',
    fatherName: 'Ananda Shinde',
    age: 42,
    gender: 'Female',
    contactNo: '+91 97654 32109',
    aadhaarNo: '•••• •••• 1234',
    surveyNumber: '260/3',
    parcelId: 'MH-PL-10237',
    landArea: 2.10,
    village: 'Chakan Phata',
    category: 'Agricultural',
    totalFamilyMembers: 4,
    childrenCount: 2,
    elderlyCount: 0,
    disabledCount: 0,
    maleCount: 1,
    femaleCount: 3,
    primaryOccupation: 'Sugarcane Farming',
    secondaryOccupation: 'Self-Help Group (SHG) Leader',
    monthlyIncome: 42000.0,
    propertyAffected: 'Agricultural Land & Open Well',
    socialImpactLevel: 'Moderate',
    hasDispute: false,
    disputeDetails: 'None',
    requiresRehab: false,
    rehabReason: 'Partial land acquisition with remaining viable agricultural area.',
    status: SiaSyncStatus.synced,
    dateCreated: '08 Sept 2026',
  ),
];

final List<PublicHearing> samplePublicHearings = [
  PublicHearing(
    id: 'PH-MH-101',
    village: 'Chakan Phata',
    date: '18 October 2026',
    time: '11:00 AM',
    venue: 'Gram Panchayat Assembly Hall, Chakan',
    affectedFamiliesCount: 86,
    status: 'Scheduled',
    issuesRaisedCount: 14,
    minutesUploaded: false,
  ),
  PublicHearing(
    id: 'PH-MH-102',
    village: 'Manchar Road',
    date: '25 October 2026',
    time: '02:00 PM',
    venue: 'Zilla Parishad School Auditorium, Manchar',
    affectedFamiliesCount: 64,
    status: 'Scheduled',
    issuesRaisedCount: 8,
    minutesUploaded: false,
  ),
  PublicHearing(
    id: 'PH-MH-100',
    village: 'Khadki Rural',
    date: '05 September 2026',
    time: '10:30 AM',
    venue: 'Gram Panchayat Hall, Khadki',
    affectedFamiliesCount: 112,
    status: 'Completed',
    issuesRaisedCount: 32,
    minutesUploaded: true,
  ),
];

// ============================================================================
// 3. SIA EXPERT APPLICATION MAIN ENTRY & SCREEN
// ============================================================================

void main() {
  runApp(const SiaExpertApp());
}

class SiaExpertApp extends StatelessWidget {
  const SiaExpertApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SWADESH - SIA Coordinator',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: 'Roboto',
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF00897B),
          primary: const Color(0xFF00897B),
          secondary: const Color(0xFF0D9488),
          surface: const Color(0xFFF8FAFC),
          onSurface: const Color(0xFF0F172A),
        ),
        scaffoldBackgroundColor: const Color(0xFFF1F5F9),
      ),
      home: const SiaExpertMainScreen(),
    );
  }
}

class SiaExpertMainScreen extends StatefulWidget {
  final VoidCallback? onLogout;

  const SiaExpertMainScreen({
    super.key,
    this.onLogout,
  });

  @override
  State<SiaExpertMainScreen> createState() => _SiaExpertMainScreenState();
}

class _SiaExpertMainScreenState extends State<SiaExpertMainScreen> {
  int _siaNavIndex = 0; // 0: Dashboard, 1: Projects, 2: Surveys, 3: Hearings, 4: Tools

  final List<SiaProject> _siaProjects = List.from(sampleSiaProjects);
  final List<SiaSurveyRecord> _siaSurveys = List.from(sampleSiaSurveys);
  final List<PublicHearing> _publicHearings = List.from(samplePublicHearings);

  void _onLogout() {
    if (widget.onLogout != null) {
      widget.onLogout!();
    } else {
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (context) => const SwadeshApp()),
        (route) => false,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SiaTopNavigationBar(
        unreadNotificationsCount: 3,
        onNotificationTap: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Opening SIA Notifications.')),
          );
        },
      ),
      bottomNavigationBar: SiaBottomNavigationBar(
        selectedIndex: _siaNavIndex,
        onDestinationSelected: (index) {
          setState(() {
            _siaNavIndex = index;
          });
        },
      ),
      body: IndexedStack(
        index: _siaNavIndex,
        children: [
          SiaDashboardView(
            projects: _siaProjects,
            surveys: _siaSurveys,
            hearings: _publicHearings,
            onOpenSurveys: () => setState(() => _siaNavIndex = 2),
            onOpenHearings: () => setState(() => _siaNavIndex = 3),
          ),
          SiaProjectsView(
            projects: _siaProjects,
            parcels: sampleParcels,
          ),
          SiaSurveysView(
            surveys: _siaSurveys,
            projects: _siaProjects,
            onAddSurvey: (newRecord) {
              setState(() {
                _siaSurveys.insert(0, newRecord);
              });
            },
          ),
          SiaHearingsView(
            hearings: _publicHearings,
          ),
          SiaToolsView(
            surveys: _siaSurveys,
            onLogout: _onLogout,
          ),
        ],
      ),
    );
  }
}

// ============================================================================
// 4. TOP & BOTTOM NAVIGATION BARS FOR SIA EXPERT
// ============================================================================

class SiaTopNavigationBar extends StatelessWidget implements PreferredSizeWidget {
  final int unreadNotificationsCount;
  final VoidCallback onNotificationTap;

  const SiaTopNavigationBar({
    super.key,
    required this.unreadNotificationsCount,
    required this.onNotificationTap,
  });

  @override
  Size get preferredSize => const Size.fromHeight(60);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      centerTitle: false,
      backgroundColor: const Color(0xFF00897B),
      title: const Row(
        children: [
          Icon(Icons.assessment, color: Colors.white, size: 24),
          SizedBox(width: 10),
          Flexible(
            child: Text(
              'SWADESH • SIA Coordinator',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
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

class SiaBottomNavigationBar extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onDestinationSelected;

  const SiaBottomNavigationBar({
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
            color: Colors.black.withValues(alpha: 0.08),
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
            icon: Icon(Icons.dashboard_outlined),
            activeIcon: Icon(Icons.dashboard_rounded),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.analytics_outlined),
            activeIcon: Icon(Icons.analytics_rounded),
            label: 'Projects',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.assignment_ind_outlined),
            activeIcon: Icon(Icons.assignment_ind_rounded),
            label: 'Surveys',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.groups_outlined),
            activeIcon: Icon(Icons.groups_rounded),
            label: 'Hearings',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.hardware_outlined),
            activeIcon: Icon(Icons.hardware_rounded),
            label: 'Tools & AI',
          ),
        ],
      ),
    );
  }
}

// ============================================================================
// 5. SIA DASHBOARD VIEW
// ============================================================================

class SiaDashboardView extends StatelessWidget {
  final List<SiaProject> projects;
  final List<SiaSurveyRecord> surveys;
  final List<PublicHearing> hearings;
  final VoidCallback onOpenSurveys;
  final VoidCallback onOpenHearings;

  const SiaDashboardView({
    super.key,
    required this.projects,
    required this.surveys,
    required this.hearings,
    required this.onOpenSurveys,
    required this.onOpenHearings,
  });

  @override
  Widget build(BuildContext context) {
    final activeProject = projects.first;
    // 60-day Gazette Countdown calculation
    const daysRemaining = 17; // Gazette: 01 Aug 2026, Deadline: 30 Sept 2026
    final urgencyColor = daysRemaining > 30
        ? const Color(0xFF2E7D32)
        : daysRemaining >= 15
            ? const Color(0xFFE65100)
            : const Color(0xFFC62828);

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. GAZETTE OBJECTION COUNTDOWN WIDGET (60-DAY WINDOW)
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: urgencyColor.withValues(alpha: 0.4), width: 1.5),
                  gradient: LinearGradient(
                    colors: [Colors.white, urgencyColor.withValues(alpha: 0.05)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Row(
                            children: [
                              Icon(Icons.timer, color: urgencyColor, size: 22),
                              const SizedBox(width: 8),
                              const Expanded(
                                child: Text(
                                  '60-Day Gazette Objection Window',
                                  
                                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF0F172A)),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: urgencyColor,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            '15-30 DAYS ATTENTION',
                            style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      activeProject.name,
                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF00897B)),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Gazette Notification', style: TextStyle(fontSize: 11, color: Colors.grey[600])),
                            Text(activeProject.gazetteDate, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text('Objection Deadline', style: TextStyle(fontSize: 11, color: Colors.grey[600])),
                            Text(activeProject.objectionDeadlineDate, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: urgencyColor)),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: LinearProgressIndicator(
                        value: (60 - daysRemaining) / 60,
                        minHeight: 8,
                        backgroundColor: Colors.grey[200],
                        color: urgencyColor,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            '$daysRemaining Days Remaining',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: urgencyColor),
                          ),
                        ),
                        Expanded(
                          child: Text(
                            '48 Received • 12 Pending',
                            textAlign: TextAlign.end,
                            style: TextStyle(fontSize: 11, color: Colors.grey[700]),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // 2. 6-MONTH SIA FIELD SURVEY MODEL TIMELINE CARD
            Card(
              elevation: 2,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Row(
                            children: [
                              Icon(Icons.calendar_month, color: Color(0xFF00897B), size: 20),
                              SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  '6-Month SIA Survey Timeline',
                                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF00897B)),
                                ),
                              ),
                            ],
                          ),
                        ),
                        SizedBox(width: 6),
                        Text(
                          'Month 4 of 6 Active',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0284C7)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Start: 01 June 2026', style: TextStyle(fontSize: 11, color: Colors.grey[600])),
                        Text('Target: 30 November 2026', style: TextStyle(fontSize: 11, color: Colors.grey[600])),
                      ],
                    ),
                    const SizedBox(height: 8),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: LinearProgressIndicator(
                        value: activeProject.surveyedFamilies / activeProject.totalFamilies,
                        minHeight: 10,
                        backgroundColor: Colors.grey[200],
                        color: const Color(0xFF00897B),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Survey Progress: ${activeProject.surveyedFamilies} / ${activeProject.totalFamilies} Families (83.2% Completed)',
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // 3. SIA HIGHLIGHTS GRID (6 METRIC CARDS)
            const Text(
              'SIA Field Survey Highlights',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 10),
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.15,
              children: [
                _buildSiaMetricCard('Families Surveyed', '${activeProject.surveyedFamilies} / ${activeProject.totalFamilies}', Icons.people, const Color(0xFF0284C7)),
                _buildSiaMetricCard('Completed & Verified', '1,050', Icons.check_circle_rounded, const Color(0xFF2E7D32)),
                _buildSiaMetricCard('Problematic / Disputes', '${activeProject.problemCases}', Icons.warning_amber_rounded, const Color(0xFFC62828)),
                _buildSiaMetricCard('Rehabilitation Needed', '${activeProject.rehabCases}', Icons.home_work_rounded, const Color(0xFFE65100)),
                _buildSiaMetricCard('Pending Surveys', '${activeProject.totalFamilies - activeProject.surveyedFamilies}', Icons.hourglass_empty, const Color(0xFF7C3AED)),
                _buildSiaMetricCard('Public Hearings', '2 Scheduled', Icons.groups, const Color(0xFF0D9488)),
              ],
            ),
            const SizedBox(height: 16),

            // 4. UPCOMING PUBLIC HEARING BANNER
            Card(
              color: const Color(0xFF004D40),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.campaign, color: Colors.amberAccent, size: 24),
                        SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'Upcoming Public Hearing (SIA Phase)',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Gram Panchayat Assembly Hall, Chakan Phata • 18 October 2026, 11:00 AM',
                      style: TextStyle(color: Colors.grey[200], fontSize: 12),
                    ),
                    const SizedBox(height: 12),
                    ElevatedButton.icon(
                      onPressed: onOpenHearings,
                      icon: const Icon(Icons.groups, size: 16),
                      label: const Text('Manage Hearing & Attendance'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.amberAccent,
                        foregroundColor: const Color(0xFF004D40),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildSiaMetricCard(String label, String value, IconData icon, Color color) {
    return Card(
      elevation: 2.5,
      shadowColor: color.withValues(alpha: 0.15),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.all(6),
                  decoration: BoxDecoration(
                    color: color.withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(icon, color: color, size: 18),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    label,
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF1E293B),
                      height: 1.25,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: Text(
                value,
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: color),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ============================================================================
// 6. SIA PROJECTS VIEW (WITH READ-ONLY REVENUE LAND RECORDS INDEX)
// ============================================================================

class SiaProjectsView extends StatefulWidget {
  final List<SiaProject> projects;
  final List<LandParcel> parcels;

  const SiaProjectsView({
    super.key,
    required this.projects,
    required this.parcels,
  });

  @override
  State<SiaProjectsView> createState() => _SiaProjectsViewState();
}

class _SiaProjectsViewState extends State<SiaProjectsView> {
  String _searchQuery = '';

  @override
  Widget build(BuildContext context) {
    final filteredParcels = widget.parcels.where((p) {
      return p.landownerName.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          p.surveyNumber.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          p.village.toLowerCase().contains(_searchQuery.toLowerCase());
    }).toList();

    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Active Social Impact Projects',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 12),
            ...widget.projects.asMap().entries.map((entry) {
              final proj = entry.value;
              final isLast = entry.key == widget.projects.length - 1;
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(proj.id, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0284C7))),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(color: const Color(0xFF00897B).withValues(alpha: 0.12), borderRadius: BorderRadius.circular(10)),
                          child: const Text('SIA ACTIVE', style: TextStyle(color: Color(0xFF00897B), fontSize: 10, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(proj.name, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                    const SizedBox(height: 4),
                    Text('Purpose: ${proj.publicPurpose}', style: TextStyle(fontSize: 12, color: Colors.grey[700])),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(child: _miniStat('Villages', '${proj.totalVillages}')),
                        Expanded(child: _miniStat('Families', '${proj.totalFamilies}')),
                        Expanded(child: _miniStat('Surveyed', '${proj.surveyedFamilies}')),
                        Expanded(child: _miniStat('Disputes', '${proj.problemCases}')),
                      ],
                    ),
                    if (!isLast) ...[
                      const SizedBox(height: 12),
                      const Divider(thickness: 1, color: Color(0xFFCBD5E1)),
                    ],
                  ],
                ),
              );
            }),

            const SizedBox(height: 20),
            const Divider(thickness: 1.5, color: Color(0xFFCBD5E1)),
            const SizedBox(height: 16),
            // READ-ONLY REVENUE LAND RECORDS REFERENCE SECTION (UNBOXED BASE SCREEN)
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(Icons.menu_book, color: Color(0xFF00897B)),
                    SizedBox(width: 8),
                    Text(
                      'Revenue Land Records Index',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(color: Colors.amber.shade100, borderRadius: BorderRadius.circular(10)),
                  child: const Text('READ-ONLY REFERENCE', style: TextStyle(color: Color(0xFFB45309), fontSize: 10, fontWeight: FontWeight.bold)),
                ),
                const SizedBox(height: 8),
                Text(
                  'Official 7/12 & Khata ownership records from Revenue Department for SIA verification.',
                  style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                ),
                const SizedBox(height: 12),
                TextField(
                  onChanged: (val) => setState(() => _searchQuery = val),
                  decoration: const InputDecoration(
                    prefixIcon: Icon(Icons.search, color: Color(0xFF00897B)),
                    hintText: 'Search land owner, survey no, khata no...',
                  ),
                ),
                const SizedBox(height: 14),
                ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: filteredParcels.length,
                  separatorBuilder: (_, ___) => const Divider(height: 16, color: Color(0xFFCBD5E1)),
                  itemBuilder: (context, index) {
                    final item = filteredParcels[index];
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(item.landownerName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF0F172A))),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                decoration: BoxDecoration(color: const Color(0xFF2E7D32).withValues(alpha: 0.12), borderRadius: BorderRadius.circular(8)),
                                child: const Text('7/12 Verified', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF2E7D32))),
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Text('Survey Number: ${item.surveyNumber}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF00897B))),
                          const SizedBox(height: 2),
                          Text('Khata Number: ${item.landownerKhataNo}', style: TextStyle(fontSize: 12, color: Colors.grey[800])),
                          const SizedBox(height: 2),
                          Text('Land Area: ${item.landAreaHectares} Ha', style: TextStyle(fontSize: 12, color: Colors.grey[800])),
                          const SizedBox(height: 2),
                          Text('Village / Location: ${item.village}', style: TextStyle(fontSize: 12, color: Colors.grey[800])),
                        ],
                      ),
                    );
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _miniStat(String label, String val) {
    return Column(
      children: [
        Text(val, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF00897B))),
        Text(label, style: TextStyle(fontSize: 10, color: Colors.grey[600])),
      ],
    );
  }
}

// ============================================================================
// 7. SIA SURVEYS VIEW & WIZARD
// ============================================================================

class SiaSurveysView extends StatefulWidget {
  final List<SiaSurveyRecord> surveys;
  final List<SiaProject> projects;
  final ValueChanged<SiaSurveyRecord> onAddSurvey;

  const SiaSurveysView({
    super.key,
    required this.surveys,
    required this.projects,
    required this.onAddSurvey,
  });

  @override
  State<SiaSurveysView> createState() => _SiaSurveysViewState();
}

class _SiaSurveysViewState extends State<SiaSurveysView> {
  String _filter = 'All';
  String _searchQuery = '';

  @override
  Widget build(BuildContext context) {
    final filteredSurveys = widget.surveys.where((s) {
      final matchesSearch = s.papName.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          s.surveyNumber.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          s.village.toLowerCase().contains(_searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (_filter == 'Rehab Required') return s.requiresRehab;
      if (_filter == 'Pending Sync') return s.status == SiaSyncStatus.pendingSync || s.status == SiaSyncStatus.savedOffline;
      return true;
    }).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'SIA Household Surveys',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                ),
                const SizedBox(height: 8),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (context) => SiaSurveyWizardDialog(
                          projects: widget.projects,
                          onSave: (record) {
                            widget.onAddSurvey(record);
                          },
                        ),
                      );
                    },
                    icon: const Icon(Icons.add, size: 18),
                    label: const Text('+ New SIA Survey'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF00897B),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            TextField(
              onChanged: (val) => setState(() => _searchQuery = val),
              decoration: const InputDecoration(
                prefixIcon: Icon(Icons.search, color: Color(0xFF00897B)),
                hintText: 'Search PAP name, survey number, village...',
              ),
            ),
            const SizedBox(height: 10),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: ['All', 'Rehab Required', 'Pending Sync'].map((f) {
                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: ChoiceChip(
                      label: Text(f, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      selected: _filter == f,
                      selectedColor: const Color(0xFF00897B).withValues(alpha: 0.2),
                      onSelected: (selected) {
                        if (selected) setState(() => _filter = f);
                      },
                    ),
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 14),
            Expanded(
              child: ListView.separated(
                itemCount: filteredSurveys.length,
                separatorBuilder: (_, ___) => const Divider(height: 20, thickness: 1.2),
                itemBuilder: (context, index) {
                  final record = filteredSurveys[index];
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 6.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Field ID: ${record.fieldId}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF0284C7))),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: record.status == SiaSyncStatus.submitted ? const Color(0xFF2E7D32).withValues(alpha: 0.15) : Colors.orange.shade100,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Text(
                                record.status.name.toUpperCase(),
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  color: record.status == SiaSyncStatus.submitted ? const Color(0xFF2E7D32) : Colors.orange.shade900,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Text(record.papName, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                        const SizedBox(height: 4),
                        Text('Father / Husband: ${record.fatherName}', style: TextStyle(fontSize: 12, color: Colors.grey[800])),
                        const SizedBox(height: 2),
                        Text('Age & Gender: ${record.age} Yrs (${record.gender})', style: TextStyle(fontSize: 12, color: Colors.grey[800])),
                        const SizedBox(height: 2),
                        Text('Contact Mobile: ${record.contactNo}', style: TextStyle(fontSize: 12, color: Colors.grey[800])),
                        const SizedBox(height: 2),
                        Text('Survey Number: ${record.surveyNumber}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF00897B))),
                        const SizedBox(height: 2),
                        Text('Parcel ID: ${record.parcelId}', style: TextStyle(fontSize: 12, color: Colors.grey[800])),
                        const SizedBox(height: 2),
                        Text('Land Area: ${record.landArea} Ha', style: TextStyle(fontSize: 12, color: Colors.grey[800])),
                        const SizedBox(height: 2),
                        Text('Village / Location: ${record.village}', style: TextStyle(fontSize: 12, color: Colors.grey[800])),
                        const SizedBox(height: 6),
                        Row(
                          children: [
                            if (record.requiresRehab)
                              Container(
                                margin: const EdgeInsets.only(right: 8),
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                decoration: BoxDecoration(color: const Color(0xFFC62828).withValues(alpha: 0.12), borderRadius: BorderRadius.circular(8)),
                                child: const Text('🔴 REHABILITATION REQUIRED', style: TextStyle(color: Color(0xFFC62828), fontSize: 10, fontWeight: FontWeight.bold)),
                              ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(8)),
                              child: Text('Impact Level: ${record.socialImpactLevel}', style: const TextStyle(color: Color(0xFF0284C7), fontSize: 10, fontWeight: FontWeight.bold)),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ============================================================================
// 8. 11-STEP SIA FIELD SURVEY WIZARD DIALOG
// ============================================================================

class SiaSurveyWizardDialog extends StatefulWidget {
  final List<SiaProject> projects;
  final ValueChanged<SiaSurveyRecord> onSave;

  const SiaSurveyWizardDialog({
    super.key,
    required this.projects,
    required this.onSave,
  });

  @override
  State<SiaSurveyWizardDialog> createState() => _SiaSurveyWizardDialogState();
}

class _SiaSurveyWizardDialogState extends State<SiaSurveyWizardDialog> {
  int _step = 0;

  // Form Fields State
  String _selectedProjectId = 'SIA-MH-2026-01';

  // STATIC Metadata (Auto-Populated System Reference Data)
  final String _fieldId = 'FLD-MH-4092-04';
  final String _enumeratorNumber = '+91 98765 43210';
  final String _enumeratorId = 'SIA-EXP-9402';
  String _village = 'Chakan Phata';
  final String _gramPanchayat = 'Chakan Phata Gram Panchayat';

  // CHANGE Metadata (Editable Field Data)
  final _surveyDateCtrl = TextEditingController(text: '13 September 2026');
  final _surveyNoCtrl = TextEditingController(text: '262/2B');
  final _parcelIdCtrl = TextEditingController(text: 'MH-PL-10239');
  final _landAreaCtrl = TextEditingController(text: '1.40');
  final _latLngCtrl = TextEditingController(text: '19.9540° N, 73.7925° E');
  bool _photoCaptured = true;

  // 1. PAP Personal Details State (Request 2)
  final _papIdCtrl = TextEditingController(text: 'PAP-MH-98403');
  String _papType = 'Title Holder (Owner)';
  final _papNameCtrl = TextEditingController(text: 'Ananda Ramchandra Jadhav');
  final _fatherNameCtrl = TextEditingController(text: 'Ramchandra Jadhav');
  final _ageCtrl = TextEditingController(text: '46');
  String _gender = 'Male';
  final _contactCtrl = TextEditingController(text: '+91 98901 23456');
  final _aadhaarCtrl = TextEditingController(text: '9081 2345 6789');
  String _otherIdType = 'PAN Card';
  final _otherIdCtrl = TextEditingController(text: 'ABCDE1234F');
  bool _aadhaarPhotoCaptured = true;
  bool _otherIdPhotoCaptured = true;
  String _educationLevel = 'Secondary (SSC)';

  // 2. Land & Tenure State (Request 3)
  final _subDivisionCtrl = TextEditingController(text: 'Hissa No. 4');
  String _landPrimaryCategory = 'Agricultural';
  final _landRecordOwnerCtrl = TextEditingController(text: 'Ramchandra Bhikaji Jadhav (7/12 Extract Holder)');
  String _ownershipStatus = 'Sole Owner';
  final _totalAreaCtrl = TextEditingController(text: '2.50');
  final _areaRequiredCtrl = TextEditingController(text: '1.40');
  final _areaRemainCtrl = TextEditingController(text: '1.10');
  String _landUse = 'Double Crop Irrigated';
  String _isIrrigated = 'Irrigated (Well / Canal)';
  String _croppingPattern = 'Kharif & Rabi';
  final _majorCropCtrl = TextEditingController(text: 'Soybean & Sugarcane');
  String _noOfCropsPerYear = '2 Crops';
  final _treesAffectedCtrl = TextEditingController(text: '12 Alphonso Mango, 5 Teak Trees');
  final _existingEncumbrancesCtrl = TextEditingController(text: 'Crop Loan ₹1,50,000 from Bank of Maharashtra (Encumbered)');
  final _revenueRecordRefCtrl = TextEditingController(text: '7/12 Extract No. 4092, Mutation Entry No. 1284');

  // 3. Household & Social Profile State (Request 3)
  final _totalMembersCtrl = TextEditingController(text: '5');
  final _childrenUnder18Ctrl = TextEditingController(text: '2');
  final _childrenOver18Ctrl = TextEditingController(text: '1');
  final _elderlyCtrl = TextEditingController(text: '1');
  final _maleCountCtrl = TextEditingController(text: '3');
  final _femaleCountCtrl = TextEditingController(text: '2');
  final _disabledCountCtrl = TextEditingController(text: '0');
  final _disabilityDetailsCtrl = TextEditingController(text: 'None');
  String _religion = 'Hinduism';
  final _casteCtrl = TextEditingController(text: 'Maratha');
  String _reservationCategory = 'OBC / SEBC';
  final _tribeNameCtrl = TextEditingController(text: 'N/A');
  final _yearsResidingCtrl = TextEditingController(text: '35 Years (Ancestral Resident)');

  String _landCategory = 'Agricultural & Residential';
  String _primaryOcc = 'Farmer / Agriculture';
  String _secondaryOcc = 'Livestock / Dairy';
  final _monthlyIncomeCtrl = TextEditingController(text: '28000');
  String _propertyAffected = 'House Structure & Farm Land';
  String _impactLevel = 'High';
  bool _hasDispute = false;
  final _disputeCtrl = TextEditingController(text: '');
  bool _requiresRehab = false;
  String _rehabReason = 'Primary ancestral residence displaced by project highway alignment.';

  // Dynamic Asset Inventory State (Step 6)
  final List<Map<String, String>> _assetInventory = [
    {'type': 'Residential House', 'details': 'Pucca 2-Storey RCC House (1,200 sq.ft)'},
    {'type': 'Water Well', 'details': 'Irrigation Ring Well (25 ft depth with 5HP Pump)'},
    {'type': 'Open Shed', 'details': 'Cattle & Agricultural Equipment Storage Shed'},
    {'type': 'Alphonso Trees', 'details': '12 Fruit Bearing Mature Mango Trees'},
  ];
  String _selectedNewAssetType = 'Farm Structure';
  final _newAssetDetailsCtrl = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final stepTitles = [
      '1. Identification & Project Details',
      '2. PAP Personal Details',
      '3. Land & Tenure',
      '4. Household & Social Profile',
      '5. Livelihood & Income',
      '6. Property & Assets',
      '7. Social Impact',
      '8. Family Disputes',
      '9. Rehabilitation (R&R)',
      '10. Evidence & GPS',
      '11. Review & Submit',
    ];

    return Dialog.fullscreen(
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color(0xFF00897B),
          title: Text('SIA Field Survey Wizard (${_step + 1}/11)'),
          leading: IconButton(
            icon: const Icon(Icons.close),
            onPressed: () => Navigator.pop(context),
          ),
        ),
        body: Column(
          children: [
            // STEP PROGRESS HEADER
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              color: Colors.white,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(stepTitles[_step], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00897B))),
                      Text('Step ${_step + 1} of 11', style: TextStyle(fontSize: 12, color: Colors.grey[600])),
                    ],
                  ),
                  const SizedBox(height: 6),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: (_step + 1) / 11,
                      minHeight: 6,
                      color: const Color(0xFF00897B),
                      backgroundColor: Colors.grey[200],
                    ),
                  ),
                ],
              ),
            ),
            const Divider(height: 1),

            // STEP BODY CONTENT
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20.0),
                child: _buildStepBody(),
              ),
            ),

            // WIZARD FOOTER NAVIGATION
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.white,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  if (_step > 0)
                    OutlinedButton.icon(
                      onPressed: () => setState(() => _step--),
                      icon: const Icon(Icons.arrow_back),
                      label: const Text('Previous'),
                    )
                  else
                    const SizedBox(),
                  if (_step < 10)
                    ElevatedButton.icon(
                      onPressed: () => setState(() => _step++),
                      icon: const Icon(Icons.arrow_forward),
                      label: const Text('Next Step'),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00897B)),
                    )
                  else
                    ElevatedButton.icon(
                      onPressed: _submitWizard,
                      icon: const Icon(Icons.check_circle),
                      label: const Text('Submit SIA Survey'),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF2E7D32)),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepBody() {
    switch (_step) {
      case 0:
        final selectedProject = widget.projects.firstWhere(
          (p) => p.id == _selectedProjectId,
          orElse: () => widget.projects.first,
        );
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Project Selector Dropdown
            const Text(
              'Select SIA Project Corridor',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 6),
            DropdownButtonFormField<String>(
              initialValue: _selectedProjectId,
              isExpanded: true,
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.analytics, color: Color(0xFF00897B)),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
              items: widget.projects
                  .map((p) => DropdownMenuItem(
                        value: p.id,
                        child: Text(p.name),
                      ))
                  .toList(),
              onChanged: (val) {
                if (val != null) setState(() => _selectedProjectId = val);
              },
            ),
            const SizedBox(height: 16),

            // 📌 SECTION 1: STATIC METADATA (READ-ONLY, UNBOXED)
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Icon(Icons.lock, color: Color(0xFF0284C7), size: 18),
                    SizedBox(width: 6),
                    Text(
                      'STATIC METADATA',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF0284C7)),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: Colors.blue.shade100,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Text('AUTO-POPULATED', style: TextStyle(color: Color(0xFF0369A1), fontSize: 10, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
            const SizedBox(height: 10),
            _staticReadonlyGrid([
              _StaticItem('Field ID', _fieldId),
              _StaticItem('Project ID', selectedProject.id),
              _StaticItem('Project Name', selectedProject.name),
              _StaticItem('Enumerator Number', _enumeratorNumber),
              _StaticItem('Enumerator ID', _enumeratorId),
              _StaticItem('District', selectedProject.district),
              _StaticItem('Taluka', selectedProject.taluka),
              _StaticItem('Village', _village),
              _StaticItem('Gram Panchayat', _gramPanchayat),
            ]),
            const SizedBox(height: 20),

            // ✍️ SECTION 2: DYNAMIC FIELD SURVEY DETAILS (UNBOXED)
            const Row(
              children: [
                Icon(Icons.edit_note, color: Color(0xFF00897B), size: 20),
                SizedBox(width: 6),
                Text(
                  'FIELD SURVEY DATA (EDITABLE)',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00897B)),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Date Picker Input
            TextFormField(
              controller: _surveyDateCtrl,
              decoration: const InputDecoration(
                labelText: 'Date of Survey',
                prefixIcon: Icon(Icons.calendar_today, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 12),

            // Survey Number Input
            TextFormField(
              controller: _surveyNoCtrl,
              decoration: const InputDecoration(
                labelText: 'Survey Number',
                prefixIcon: Icon(Icons.pin, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 12),

            // Parcel ID Input
            TextFormField(
              controller: _parcelIdCtrl,
              decoration: const InputDecoration(
                labelText: 'Parcel ID',
                prefixIcon: Icon(Icons.layers, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 12),

            // Area Hectares
            TextFormField(
              controller: _landAreaCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Land Area (Hectares)',
                prefixIcon: Icon(Icons.square_foot, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 12),

            // Latitude, Longitude GPS Coordinates
            TextFormField(
              controller: _latLngCtrl,
              decoration: const InputDecoration(
                labelText: 'Latitude, Longitude (GPS)',
                prefixIcon: Icon(Icons.my_location, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 14),

            // Photo Attachment / Capture Box
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade300),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Geo-Tagged Field Photo Evidence',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Container(
                        width: 56,
                        height: 56,
                        decoration: BoxDecoration(
                          color: const Color(0xFF00897B).withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Icon(Icons.photo_camera, color: Color(0xFF00897B), size: 26),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _photoCaptured ? 'Photo Captured & Geo-Stamped' : 'No photo captured yet',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 12,
                                color: _photoCaptured ? const Color(0xFF2E7D32) : Colors.grey[700],
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'GPS: 19.9540° N, 73.7925° E',
                              style: TextStyle(fontSize: 10, color: Colors.grey[600]),
                            ),
                          ],
                        ),
                      ),
                      ElevatedButton.icon(
                        onPressed: () {
                          setState(() => _photoCaptured = !_photoCaptured);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(_photoCaptured ? '📷 Photo Captured & Geo-Tagged.' : 'Photo status updated.'),
                              backgroundColor: const Color(0xFF00897B),
                            ),
                          );
                        },
                        icon: Icon(_photoCaptured ? Icons.check : Icons.camera_alt, size: 14),
                        label: Text(_photoCaptured ? 'Captured' : 'Take Photo', style: const TextStyle(fontSize: 11)),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _photoCaptured ? const Color(0xFF2E7D32) : const Color(0xFF00897B),
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        );
      case 1:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'AFFECTED PERSON (PAP) PERSONAL DETAILS',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 14),

            // 1. PAP System Identification (Unboxed)
            const Text('PAP System Identification', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF0284C7))),
            const SizedBox(height: 8),
            TextFormField(
              controller: _papIdCtrl,
              decoration: const InputDecoration(
                labelText: 'PAP ID (System Assigned)',
                prefixIcon: Icon(Icons.badge, color: Color(0xFF0284C7)),
              ),
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              initialValue: _papType,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'PAP Type'),
              items: const [
                DropdownMenuItem(value: 'Title Holder (Owner)', child: Text('Title Holder (Owner)')),
                DropdownMenuItem(value: 'Tenant / Lessee', child: Text('Tenant / Lessee')),
                DropdownMenuItem(value: 'Sharecropper', child: Text('Sharecropper')),
                DropdownMenuItem(value: 'Agricultural Labourer', child: Text('Agricultural Labourer')),
                DropdownMenuItem(value: 'Squatter', child: Text('Squatter')),
                DropdownMenuItem(value: 'Encroacher', child: Text('Encroacher')),
                DropdownMenuItem(value: 'Artisan / Business Owner', child: Text('Artisan / Business Owner')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _papType = val);
              },
            ),
            const SizedBox(height: 20),

            // 2. Personal Demographic Profile (Unboxed)
            const Text('Personal Demographic Profile', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00897B))),
            const SizedBox(height: 8),
            TextFormField(
              controller: _papNameCtrl,
              decoration: const InputDecoration(
                labelText: 'Full Name of PAP',
                prefixIcon: Icon(Icons.person, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _fatherNameCtrl,
              decoration: const InputDecoration(
                labelText: 'Father / Husband Name',
                prefixIcon: Icon(Icons.family_restroom, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 12),
            // Age field (without birthday symbol)
            TextFormField(
              controller: _ageCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Age (Years)',
                prefixIcon: Icon(Icons.numbers, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 12),
            // Gender dropdown on its own line (full width, zero overflow)
            DropdownButtonFormField<String>(
              initialValue: _gender,
              isExpanded: true,
              decoration: const InputDecoration(
                labelText: 'Gender',
                prefixIcon: Icon(Icons.wc, color: Color(0xFF00897B)),
              ),
              items: const [
                DropdownMenuItem(value: 'Male', child: Text('Male')),
                DropdownMenuItem(value: 'Female', child: Text('Female')),
                DropdownMenuItem(value: 'Transgender / Other', child: Text('Transgender / Other')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _gender = val);
              },
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _contactCtrl,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(
                labelText: 'Mobile Contact Number',
                prefixIcon: Icon(Icons.phone, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 20),

            // 3. Identity Documents & Photos (Unboxed)
            const Text('Government Identity Verification & Uploads', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00897B))),
            const SizedBox(height: 8),
            TextFormField(
              controller: _aadhaarCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Aadhaar Number (12-Digit)',
                prefixIcon: Icon(Icons.credit_card, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              initialValue: _otherIdType,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'Other ID Type'),
              items: const [
                DropdownMenuItem(value: 'PAN Card', child: Text('PAN Card')),
                DropdownMenuItem(value: 'Voter ID', child: Text('Voter ID')),
                DropdownMenuItem(value: 'Ration Card', child: Text('Ration Card')),
                DropdownMenuItem(value: 'Driving License', child: Text('Driving License')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _otherIdType = val);
              },
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _otherIdCtrl,
              decoration: const InputDecoration(labelText: 'Other ID Number'),
            ),
            const SizedBox(height: 14),

            // Photos of Aadhaar and Other ID Upload Boxes
            const Text('Photo Evidence of ID Cards', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: Colors.grey.shade100, borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.grey.shade300)),
              child: Column(
                children: [
                  Row(
                    children: [
                      const Icon(Icons.document_scanner, color: Color(0xFF00897B)),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          _aadhaarPhotoCaptured ? 'Aadhaar Photo: Uploaded & Verified' : 'Aadhaar Photo: Not Uploaded',
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: _aadhaarPhotoCaptured ? const Color(0xFF2E7D32) : Colors.grey[700]),
                        ),
                      ),
                      OutlinedButton.icon(
                        onPressed: () {
                          setState(() => _aadhaarPhotoCaptured = !_aadhaarPhotoCaptured);
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(_aadhaarPhotoCaptured ? 'Aadhaar Photo Captured' : 'Photo Removed')));
                        },
                        icon: Icon(_aadhaarPhotoCaptured ? Icons.check : Icons.camera_alt, size: 14),
                        label: Text(_aadhaarPhotoCaptured ? 'Uploaded' : 'Capture Aadhaar', style: const TextStyle(fontSize: 11)),
                      ),
                    ],
                  ),
                  const Divider(height: 16),
                  Row(
                    children: [
                      const Icon(Icons.badge, color: Color(0xFF0284C7)),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          _otherIdPhotoCaptured ? 'Other ID Photo: Uploaded & Verified' : 'Other ID Photo: Not Uploaded',
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: _otherIdPhotoCaptured ? const Color(0xFF2E7D32) : Colors.grey[700]),
                        ),
                      ),
                      OutlinedButton.icon(
                        onPressed: () {
                          setState(() => _otherIdPhotoCaptured = !_otherIdPhotoCaptured);
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(_otherIdPhotoCaptured ? 'Other ID Photo Captured' : 'Photo Removed')));
                        },
                        icon: Icon(_otherIdPhotoCaptured ? Icons.check : Icons.camera_alt, size: 14),
                        label: Text(_otherIdPhotoCaptured ? 'Uploaded' : 'Capture Other ID', style: const TextStyle(fontSize: 11)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // 4. Education Level (Unboxed)
            const Text('Education Level', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00897B))),
            const SizedBox(height: 8),
            DropdownButtonFormField<String>(
              initialValue: _educationLevel,
              isExpanded: true,
              decoration: const InputDecoration(
                prefixIcon: Icon(Icons.school, color: Color(0xFF00897B)),
                border: OutlineInputBorder(),
              ),
              items: const [
                DropdownMenuItem(value: 'Illiterate', child: Text('Illiterate')),
                DropdownMenuItem(value: 'Primary (1-4)', child: Text('Primary (Classes 1-4)')),
                DropdownMenuItem(value: 'Middle (5-7)', child: Text('Middle (Classes 5-7)')),
                DropdownMenuItem(value: 'Secondary (SSC)', child: Text('Secondary (SSC Class 10)')),
                DropdownMenuItem(value: 'Higher Secondary (HSC)', child: Text('Higher Secondary (HSC Class 12)')),
                DropdownMenuItem(value: 'Graduate', child: Text('Graduate (B.A. / B.Sc. / B.Com)')),
                DropdownMenuItem(value: 'Post Graduate', child: Text('Post Graduate (M.A. / M.Sc. / M.Com)')),
                DropdownMenuItem(value: 'ITI / Diploma', child: Text('ITI / Vocational Diploma')),
                DropdownMenuItem(value: 'Technical / Professional', child: Text('Technical / Professional (Engineering / Medical)')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _educationLevel = val);
              },
            ),
          ],
        );
      case 2:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'LAND AND TENURE DETAILS',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 14),

            // 1. Revenue Record & GIS Identification (Unboxed)
            const Text('Revenue Record & GIS Identification', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF0284C7))),
            const SizedBox(height: 8),
            TextFormField(
              controller: _surveyNoCtrl,
              decoration: const InputDecoration(labelText: 'Survey Number', prefixIcon: Icon(Icons.pin, color: Color(0xFF0284C7))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _subDivisionCtrl,
              decoration: const InputDecoration(labelText: 'Sub-Division (Hissa No.)', prefixIcon: Icon(Icons.tag, color: Color(0xFF0284C7))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _parcelIdCtrl,
              decoration: const InputDecoration(labelText: 'SWADESH Parcel GIS ID', prefixIcon: Icon(Icons.layers, color: Color(0xFF0284C7))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _revenueRecordRefCtrl,
              decoration: const InputDecoration(labelText: 'Revenue Record Reference (7/12 & Khata No.)', prefixIcon: Icon(Icons.description, color: Color(0xFF0284C7))),
            ),
            const SizedBox(height: 20),

            // 2. Ownership & Legal Tenure Status (Unboxed)
            const Text('Ownership & Legal Tenure Status', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00897B))),
            const SizedBox(height: 8),
            TextFormField(
              controller: _landRecordOwnerCtrl,
              decoration: const InputDecoration(
                labelText: 'Land Record Owner (Name on 7/12 Extract)',
                prefixIcon: Icon(Icons.person_pin, color: Color(0xFF00897B)),
              ),
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              initialValue: _landPrimaryCategory,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'Primary Category'),
              items: const [
                DropdownMenuItem(value: 'Agricultural', child: Text('Agricultural')),
                DropdownMenuItem(value: 'Residential', child: Text('Residential')),
                DropdownMenuItem(value: 'Commercial', child: Text('Commercial')),
                DropdownMenuItem(value: 'Industrial', child: Text('Industrial')),
                DropdownMenuItem(value: 'Forest', child: Text('Forest')),
                DropdownMenuItem(value: 'Wasteland / Barren', child: Text('Wasteland / Barren')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _landPrimaryCategory = val);
              },
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              initialValue: _ownershipStatus,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'Ownership Status'),
              items: const [
                DropdownMenuItem(value: 'Sole Owner', child: Text('Sole Owner')),
                DropdownMenuItem(value: 'Joint Owner', child: Text('Joint Owner')),
                DropdownMenuItem(value: 'Tenant / Lessee', child: Text('Tenant / Lessee')),
                DropdownMenuItem(value: 'Encroacher', child: Text('Encroacher')),
                DropdownMenuItem(value: 'Mortgagee', child: Text('Mortgagee')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _ownershipStatus = val);
              },
            ),
            const SizedBox(height: 20),

            // 3. Land Area Dimensions (Unboxed)
            const Text('Land Area Dimensions (in Hectares)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00897B))),
            const SizedBox(height: 8),
            TextFormField(
              controller: _totalAreaCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Total Area (Ha)', prefixIcon: Icon(Icons.square_foot, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _areaRequiredCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Area Required / Acquired (Ha)', prefixIcon: Icon(Icons.crop, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _areaRemainCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Remaining Land Area (Ha)', prefixIcon: Icon(Icons.check_box_outline_blank, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 20),

            // 4. Land Use, Irrigation & Agricultural Profile (Unboxed)
            const Text('Land Use, Irrigation & Agricultural Profile', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00897B))),
            const SizedBox(height: 8),
            DropdownButtonFormField<String>(
              initialValue: _landUse,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'Land Use'),
              items: const [
                DropdownMenuItem(value: 'Single Crop', child: Text('Single Crop')),
                DropdownMenuItem(value: 'Double Crop Irrigated', child: Text('Double Crop Irrigated')),
                DropdownMenuItem(value: 'Perennial Orchard', child: Text('Perennial Orchard')),
                DropdownMenuItem(value: 'Fallow / Uncultivated', child: Text('Fallow / Uncultivated')),
                DropdownMenuItem(value: 'Residential Homestead', child: Text('Residential Homestead')),
                DropdownMenuItem(value: 'Commercial / Shop', child: Text('Commercial / Shop')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _landUse = val);
              },
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              initialValue: _isIrrigated,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'Irrigation Status'),
              items: const [
                DropdownMenuItem(value: 'Irrigated (Well / Canal)', child: Text('Irrigated (Well / Canal)')),
                DropdownMenuItem(value: 'Drip Irrigated', child: Text('Drip Irrigated')),
                DropdownMenuItem(value: 'Rainfed / Unirrigated', child: Text('Rainfed / Unirrigated')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _isIrrigated = val);
              },
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              initialValue: _croppingPattern,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'Cropping Pattern'),
              items: const [
                DropdownMenuItem(value: 'Kharif Only', child: Text('Kharif Only')),
                DropdownMenuItem(value: 'Rabi Only', child: Text('Rabi Only')),
                DropdownMenuItem(value: 'Kharif & Rabi', child: Text('Kharif & Rabi')),
                DropdownMenuItem(value: 'Perennial / Year-Round', child: Text('Perennial / Year-Round')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _croppingPattern = val);
              },
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              initialValue: _noOfCropsPerYear,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'No. of Crops / Year'),
              items: const [
                DropdownMenuItem(value: '1 Crop', child: Text('1 Crop')),
                DropdownMenuItem(value: '2 Crops', child: Text('2 Crops')),
                DropdownMenuItem(value: '3 Crops / Multi-Cropping', child: Text('3 Crops / Multi-Cropping')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _noOfCropsPerYear = val);
              },
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _majorCropCtrl,
              decoration: const InputDecoration(labelText: 'Major Crop(s) Grown', prefixIcon: Icon(Icons.grass, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _treesAffectedCtrl,
              decoration: const InputDecoration(labelText: 'Trees Affected (Count & Species)', prefixIcon: Icon(Icons.park, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 20),

            // 5. Existing Encumbrances & Financial Condition (Unboxed)
            const Text('Existing Encumbrances & Financial Condition', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00897B))),
            const SizedBox(height: 8),
            TextFormField(
              controller: _existingEncumbrancesCtrl,
              maxLines: 2,
              decoration: const InputDecoration(
                labelText: 'Bank Loans, Mortgages, Charges & Financial Liabilities',
                prefixIcon: Icon(Icons.account_balance, color: Color(0xFF00897B)),
              ),
            ),
          ],
        );
      case 3:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'HOUSEHOLD AND SOCIAL PROFILE',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 14),

            // 1. Family Composition & Age Breakup (Unboxed, single lines)
            const Text('Family Composition & Age Breakup', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF0284C7))),
            const SizedBox(height: 8),
            TextFormField(
              controller: _totalMembersCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Total Family Members Count', prefixIcon: Icon(Icons.groups, color: Color(0xFF0284C7))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _childrenUnder18Ctrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Children (<18 yrs Count)', prefixIcon: Icon(Icons.child_care, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _childrenOver18Ctrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Dependents (>18 yrs Count)', prefixIcon: Icon(Icons.person, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _elderlyCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Elderly (>60 yrs Count)', prefixIcon: Icon(Icons.elderly, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _maleCountCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Male Family Members Count', prefixIcon: Icon(Icons.male, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _femaleCountCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Female Family Members Count', prefixIcon: Icon(Icons.female, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _disabledCountCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Persons with Disability (PWD Count)', prefixIcon: Icon(Icons.accessible, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _disabilityDetailsCtrl,
              decoration: const InputDecoration(labelText: 'Disability Details / Vulnerability Description', prefixIcon: Icon(Icons.medical_services, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 20),

            // 2. Social, Cultural & Tribal Identity (Unboxed, single lines)
            const Text('Social, Cultural & Tribal Identity', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00897B))),
            const SizedBox(height: 8),
            DropdownButtonFormField<String>(
              initialValue: _religion,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'Religion', prefixIcon: Icon(Icons.church, color: Color(0xFF00897B))),
              items: const [
                DropdownMenuItem(value: 'Hinduism', child: Text('Hinduism')),
                DropdownMenuItem(value: 'Islam', child: Text('Islam')),
                DropdownMenuItem(value: 'Christianity', child: Text('Christianity')),
                DropdownMenuItem(value: 'Sikhism', child: Text('Sikhism')),
                DropdownMenuItem(value: 'Buddhism', child: Text('Buddhism')),
                DropdownMenuItem(value: 'Jainism', child: Text('Jainism')),
                DropdownMenuItem(value: 'Other', child: Text('Other')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _religion = val);
              },
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              initialValue: _reservationCategory,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'Reservation Category', prefixIcon: Icon(Icons.category, color: Color(0xFF00897B))),
              items: const [
                DropdownMenuItem(value: 'General', child: Text('General')),
                DropdownMenuItem(value: 'SC (Scheduled Caste)', child: Text('SC (Scheduled Caste)')),
                DropdownMenuItem(value: 'ST (Scheduled Tribe)', child: Text('ST (Scheduled Tribe)')),
                DropdownMenuItem(value: 'OBC / SEBC', child: Text('OBC / SEBC')),
                DropdownMenuItem(value: 'EWS', child: Text('EWS')),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _reservationCategory = val);
              },
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _casteCtrl,
              decoration: const InputDecoration(labelText: 'Caste Name', prefixIcon: Icon(Icons.people_outline, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _tribeNameCtrl,
              decoration: const InputDecoration(labelText: 'Tribe Name (If ST)', prefixIcon: Icon(Icons.nature_people, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _yearsResidingCtrl,
              decoration: const InputDecoration(
                labelText: 'Years Residing in Village',
                prefixIcon: Icon(Icons.home, color: Color(0xFF00897B)),
              ),
            ),
          ],
        );
      case 4:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'LIVELIHOOD AND INCOME PROFILE',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 14),
            TextFormField(
              initialValue: _primaryOcc,
              onChanged: (val) => _primaryOcc = val,
              decoration: const InputDecoration(labelText: 'Primary Occupation', prefixIcon: Icon(Icons.work, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              initialValue: _secondaryOcc,
              onChanged: (val) => _secondaryOcc = val,
              decoration: const InputDecoration(labelText: 'Secondary Occupation', prefixIcon: Icon(Icons.work_outline, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _monthlyIncomeCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Average Monthly Household Income (₹)', prefixIcon: Icon(Icons.currency_rupee, color: Color(0xFF00897B))),
            ),
          ],
        );
      case 5:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'PROPERTY & ASSET INVENTORY',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 14),
            TextFormField(
              initialValue: _propertyAffected,
              onChanged: (val) => _propertyAffected = val,
              decoration: const InputDecoration(labelText: 'Primary Property / Assets Impacted Summary', prefixIcon: Icon(Icons.home_work, color: Color(0xFF00897B))),
            ),
            const SizedBox(height: 16),
            const Text(
              'Itemized Asset Inventory',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF0284C7)),
            ),
            const SizedBox(height: 8),

            // Asset Inventory List
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _assetInventory.length,
              separatorBuilder: (_, __) => const Divider(height: 12),
              itemBuilder: (context, index) {
                final asset = _assetInventory[index];
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 4.0),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(color: const Color(0xFF00897B).withValues(alpha: 0.12), borderRadius: BorderRadius.circular(8)),
                        child: const Icon(Icons.inventory_2, color: Color(0xFF00897B), size: 20),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(asset['type'] ?? '', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF0F172A))),
                            Text(asset['details'] ?? '', style: TextStyle(fontSize: 12, color: Colors.grey[700])),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete_outline, color: Color(0xFFC62828), size: 20),
                        onPressed: () {
                          setState(() {
                            _assetInventory.removeAt(index);
                          });
                        },
                      ),
                    ],
                  ),
                );
              },
            ),
            const SizedBox(height: 16),

            // Add New Asset Input Box
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.grey.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade300),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('➕ Add Asset Item to Inventory', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF00897B))),
                  const SizedBox(height: 10),
                  DropdownButtonFormField<String>(
                    initialValue: _selectedNewAssetType,
                    isExpanded: true,
                    decoration: const InputDecoration(labelText: 'Asset Category / Type'),
                    items: const [
                      DropdownMenuItem(value: 'Residential House', child: Text('Residential House')),
                      DropdownMenuItem(value: 'Water Well', child: Text('Water Well / Borewell')),
                      DropdownMenuItem(value: 'Open Shed', child: Text('Open Cattle / Storage Shed')),
                      DropdownMenuItem(value: 'Alphonso Trees', child: Text('Fruit Trees (Alphonso Mango etc)')),
                      DropdownMenuItem(value: 'Timber Trees', child: Text('Timber Trees (Teak / Bamboo)')),
                      DropdownMenuItem(value: 'Farm Structure', child: Text('Farm Boundary / Compound Wall')),
                      DropdownMenuItem(value: 'Commercial Shop', child: Text('Commercial Shop / Stall')),
                      DropdownMenuItem(value: 'Other Asset', child: Text('Other Property Asset')),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedNewAssetType = val);
                    },
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: _newAssetDetailsCtrl,
                    decoration: const InputDecoration(
                      labelText: 'Asset Details (Count, Dimensions, Condition)',
                      hintText: 'e.g. 10 Mature Trees, 1 RCC Well 20ft deep',
                    ),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () {
                        if (_newAssetDetailsCtrl.text.trim().isNotEmpty) {
                          setState(() {
                            _assetInventory.add({
                              'type': _selectedNewAssetType,
                              'details': _newAssetDetailsCtrl.text.trim(),
                            });
                            _newAssetDetailsCtrl.clear();
                          });
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Asset added to inventory.')),
                          );
                        }
                      },
                      icon: const Icon(Icons.add, size: 16),
                      label: const Text('Add Asset Item'),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00897B)),
                    ),
                  ),
                ],
              ),
            ),
          ],
        );
      case 6:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'SOCIAL IMPACT SEVERITY LEVEL',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 14),
            DropdownButtonFormField<String>(
              initialValue: _impactLevel,
              isExpanded: true,
              decoration: const InputDecoration(
                labelText: 'Social Impact Severity Level',
                prefixIcon: Icon(Icons.warning_amber_rounded, color: Color(0xFF00897B)),
                border: OutlineInputBorder(),
              ),
              items: const [
                DropdownMenuItem(
                  value: 'High',
                  child: Text('High Impact (Displacement / Complete Livelihood Loss)', overflow: TextOverflow.ellipsis),
                ),
                DropdownMenuItem(
                  value: 'Moderate',
                  child: Text('Moderate Impact (Partial Land Acquisition)', overflow: TextOverflow.ellipsis),
                ),
                DropdownMenuItem(
                  value: 'Low',
                  child: Text('Low Impact (Minimal Asset Loss)', overflow: TextOverflow.ellipsis),
                ),
              ],
              onChanged: (val) {
                if (val != null) setState(() => _impactLevel = val);
              },
            ),
            const SizedBox(height: 14),
            Text(
              'Note: High Impact automatically triggers mandatory Rehabilitation & Resettlement (R&R) appraisal.',
              style: TextStyle(fontSize: 12, color: Colors.grey[600], fontStyle: FontStyle.italic),
            ),
          ],
        );
      case 7:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SwitchListTile(
              title: const Text('Is there any ongoing Co-Sharer or Inheritance Dispute?'),
              value: _hasDispute,
              onChanged: (val) => setState(() => _hasDispute = val),
            ),
            if (_hasDispute)
              TextFormField(
                controller: _disputeCtrl,
                maxLines: 3,
                decoration: const InputDecoration(labelText: 'Dispute Details & Objections'),
              ),
          ],
        );
      case 8:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: const Color(0xFFC62828).withValues(alpha: 0.1), borderRadius: BorderRadius.circular(12)),
              child: SwitchListTile(
                title: const Text('🔴 REHABILITATION & RESETTLEMENT REQUIRED?', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFC62828))),
                value: _requiresRehab,
                onChanged: (val) => setState(() => _requiresRehab = val),
              ),
            ),
            const SizedBox(height: 14),
            if (_requiresRehab)
              TextFormField(
                initialValue: _rehabReason,
                maxLines: 3,
                onChanged: (val) => _rehabReason = val,
                decoration: const InputDecoration(labelText: 'Mandatory Rehabilitation Reason & Request'),
              ),
          ],
        );
      case 9:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('GPS Location & Field Photographic Evidence', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(12)),
              child: const Row(
                children: [
                  Icon(Icons.gps_fixed, color: Color(0xFF0284C7)),
                  SizedBox(width: 10),
                  Text('GPS Stamp: 19.9540° N, 73.7925° E (Accuracy ±2.1m)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Field photo captured & geo-tagged.')));
              },
              icon: const Icon(Icons.camera_alt),
              label: const Text('Capture Geo-Tagged Photo'),
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00897B)),
            ),
          ],
        );
      case 10:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Top Header Card
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFF00897B).withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF00897B).withValues(alpha: 0.3)),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(color: const Color(0xFF00897B), borderRadius: BorderRadius.circular(10)),
                    child: const Icon(Icons.fact_check, color: Colors.white, size: 24),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('SIA Field Survey Final Review', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Color(0xFF00897B))),
                        const SizedBox(height: 2),
                        Text('Please review all collected survey information carefully before submission.', style: TextStyle(fontSize: 11, color: Colors.grey[700])),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // SECTION 1: PAP PERSONAL PROFILE
            _reviewSection(
              title: '1. PAP Personal & Demographic Details',
              icon: Icons.person,
              color: const Color(0xFF00897B),
              tiles: [
                _reviewTile('Full Name of PAP', _papNameCtrl.text),
                _reviewTile("Father / Husband's Name", _fatherNameCtrl.text),
                _reviewTile('PAP ID & Tenure Type', '${_papIdCtrl.text} ($_papType)'),
                _reviewTile('Age & Gender', '${_ageCtrl.text} Years | $_gender'),
                _reviewTile('Mobile Contact Number', _contactCtrl.text),
                _reviewTile('Aadhaar Number', _aadhaarCtrl.text),
                _reviewTile('Other ID Document', '$_otherIdType: ${_otherIdCtrl.text}'),
                _reviewTile('Education Level', _educationLevel),
              ],
            ),
            const SizedBox(height: 20),

            // SECTION 2: LAND & TENURE IDENTIFICATION
            _reviewSection(
              title: '2. Land & Tenure Identification',
              icon: Icons.landscape,
              color: const Color(0xFF0284C7),
              tiles: [
                _reviewTile('Survey Number & Hissa', '${_surveyNoCtrl.text} (Sub-Division: ${_subDivisionCtrl.text})'),
                _reviewTile('SWADESH Parcel GIS ID', _parcelIdCtrl.text),
                _reviewTile('7/12 & Revenue Reference', _revenueRecordRefCtrl.text),
                _reviewTile('Land Record Owner (7/12 Holder)', _landRecordOwnerCtrl.text),
                _reviewTile('Land Category & Ownership', '$_landPrimaryCategory | $_ownershipStatus'),
                _reviewTile('Land Area Breakdown', '${_totalAreaCtrl.text} Ha Total | ${_areaRequiredCtrl.text} Ha Acquired | ${_areaRemainCtrl.text} Ha Remaining'),
                _reviewTile('Land Use & Irrigation Status', '$_landUse | $_isIrrigated'),
                _reviewTile('Cropping Pattern & Annual Crops', '$_croppingPattern | $_noOfCropsPerYear'),
                _reviewTile('Major Crops Grown', _majorCropCtrl.text),
                _reviewTile('Trees Affected', _treesAffectedCtrl.text),
                _reviewTile('Encumbrances & Liabilities', _existingEncumbrancesCtrl.text),
              ],
            ),
            const SizedBox(height: 20),

            // SECTION 3: HOUSEHOLD & SOCIAL DEMOGRAPHICS
            _reviewSection(
              title: '3. Household & Social Demographics',
              icon: Icons.groups,
              color: const Color(0xFF7C3AED),
              tiles: [
                _reviewTile('Total Family Members', '${_totalMembersCtrl.text} Members'),
                _reviewTile('Age & Gender Breakup', 'Children (<18): ${_childrenUnder18Ctrl.text} | Adult Dependents (>18): ${_childrenOver18Ctrl.text} | Elderly (>60): ${_elderlyCtrl.text}'),
                _reviewTile('Gender Composition', 'Male: ${_maleCountCtrl.text} | Female: ${_femaleCountCtrl.text}'),
                _reviewTile('Disability Profile (PWD)', 'PWD Count: ${_disabledCountCtrl.text} (${_disabilityDetailsCtrl.text})'),
                _reviewTile('Religion & Category', '$_religion | $_reservationCategory'),
                _reviewTile('Caste & Tribe Info', 'Caste: ${_casteCtrl.text} | Tribe: ${_tribeNameCtrl.text}'),
                _reviewTile('Years Residing in Village', _yearsResidingCtrl.text),
              ],
            ),
            const SizedBox(height: 20),

            // SECTION 4: LIVELIHOOD, ASSETS & IMPACT
            _reviewSection(
              title: '4. Livelihood, Assets & Social Impact',
              icon: Icons.home_work,
              color: const Color(0xFFD97706),
              tiles: [
                _reviewTile('Occupational Profile', 'Primary: $_primaryOcc | Secondary: $_secondaryOcc'),
                _reviewTile('Monthly Household Income', '₹ ${_monthlyIncomeCtrl.text} / Month'),
                _reviewTile('Property Impact Summary', _propertyAffected),
                _reviewTile('Itemized Assets Count', '${_assetInventory.length} Items Listed in Inventory'),
                _reviewTile('Social Impact Severity Level', _impactLevel),
                _reviewTile('Dispute Status', _hasDispute ? '⚠️ Ongoing Dispute: ${_disputeCtrl.text}' : 'No Disputes Reported'),
                _reviewTile('Rehabilitation Required (R&R)', _requiresRehab ? '🔴 YES - ${_rehabReason}' : '🟢 NO'),
              ],
            ),
          ],
        );
      default:
        return const SizedBox();
    }
  }

  Widget _reviewSection({
    required String title,
    required IconData icon,
    required Color color,
    required List<Widget> tiles,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.1),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(13),
                topRight: Radius.circular(13),
              ),
            ),
            child: Row(
              children: [
                Icon(icon, color: color, size: 20),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: color),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(14.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: tiles,
            ),
          ),
        ],
      ),
    );
  }

  Widget _reviewTile(String label, String val) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label.toUpperCase(),
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.bold,
              color: Colors.grey[600],
              letterSpacing: 0.4,
            ),
          ),
          const SizedBox(height: 3),
          Text(
            val.isNotEmpty ? val : 'N/A',
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: Color(0xFF0F172A),
              height: 1.35,
            ),
          ),
        ],
      ),
    );
  }

  Widget _staticReadonlyGrid(List<_StaticItem> items) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 2.8,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
      ),
      itemCount: items.length,
      itemBuilder: (context, index) {
        final item = items[index];
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.grey.shade300),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                item.label,
                style: TextStyle(fontSize: 10, color: Colors.grey[600], fontWeight: FontWeight.bold),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 2),
              Text(
                item.value,
                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        );
      },
    );
  }

  void _submitWizard() {
    final record = SiaSurveyRecord(
      id: 'SIA-REC-${DateTime.now().millisecondsSinceEpoch}',
      fieldId: 'FLD-MH-${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}',
      projectId: _selectedProjectId,
      papId: _papIdCtrl.text.isNotEmpty ? _papIdCtrl.text : 'PAP-MH-${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}',
      papName: _papNameCtrl.text,
      fatherName: _fatherNameCtrl.text,
      age: int.tryParse(_ageCtrl.text) ?? 45,
      gender: _gender,
      contactNo: _contactCtrl.text,
      aadhaarNo: _aadhaarCtrl.text,
      surveyNumber: _surveyNoCtrl.text,
      parcelId: _parcelIdCtrl.text,
      landArea: double.tryParse(_landAreaCtrl.text) ?? 1.0,
      village: _village,
      category: _landCategory,
      totalFamilyMembers: int.tryParse(_totalMembersCtrl.text) ?? 4,
      childrenCount: int.tryParse(_childrenUnder18Ctrl.text) ?? 2,
      elderlyCount: int.tryParse(_elderlyCtrl.text) ?? 1,
      disabledCount: int.tryParse(_disabledCountCtrl.text) ?? 0,
      maleCount: 2,
      femaleCount: 2,
      primaryOccupation: _primaryOcc,
      secondaryOccupation: _secondaryOcc,
      monthlyIncome: double.tryParse(_monthlyIncomeCtrl.text) ?? 25000.0,
      propertyAffected: _propertyAffected,
      socialImpactLevel: _impactLevel,
      hasDispute: _hasDispute,
      disputeDetails: _disputeCtrl.text,
      requiresRehab: _requiresRehab,
      rehabReason: _rehabReason,
      status: SiaSyncStatus.pendingSync,
      dateCreated: 'Today',
    );

    widget.onSave(record);
    Navigator.pop(context);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('✅ New SIA Field Survey record added successfully.'), backgroundColor: Color(0xFF2E7D32)),
    );
  }
}

// ============================================================================
// 9. PUBLIC HEARINGS VIEW
// ============================================================================

class SiaHearingsView extends StatelessWidget {
  final List<PublicHearing> hearings;

  const SiaHearingsView({
    super.key,
    required this.hearings,
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
            const Text(
              'Public Hearings & Gram Sabha Consultations',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
            ),
            const SizedBox(height: 12),
            ...hearings.map((h) {
              return Card(
                elevation: 3,
                margin: const EdgeInsets.only(bottom: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Hearing ID: ${h.id}', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0284C7))),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: h.status == 'Completed' ? const Color(0xFF2E7D32).withValues(alpha: 0.15) : Colors.orange.shade100,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(
                              h.status.toUpperCase(),
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: h.status == 'Completed' ? const Color(0xFF2E7D32) : Colors.orange.shade900,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text('Village Gram Panchayat: ${h.village}', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 4),
                      Text('Venue: ${h.venue}', style: TextStyle(fontSize: 12, color: Colors.grey[700])),
                      Text('Schedule: ${h.date} at ${h.time}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF00897B))),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(child: Text('Affected Families: ${h.affectedFamiliesCount}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600))),
                          Expanded(child: Text('Issues Raised: ${h.issuesRaisedCount}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600))),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton.icon(
                              onPressed: () {
                                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Hearing Minutes PDF downloaded.')));
                              },
                              icon: const Icon(Icons.picture_as_pdf, size: 16),
                              label: Text(h.minutesUploaded ? 'Download Minutes' : 'Upload Minutes PDF'),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}

// ============================================================================
// 10. SIA TOOLS VIEW (AI ANALYSIS & 2FA SUBMISSION)
// ============================================================================

class SiaToolsView extends StatelessWidget {
  final List<SiaSurveyRecord> surveys;
  final VoidCallback onLogout;

  const SiaToolsView({
    super.key,
    required this.surveys,
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
            // 1. MANDATORY AI ASSISTED DISCLAIMER BANNER
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.amber.shade100,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: Colors.amber.shade800, width: 1.5),
              ),
              child: Row(
                children: [
                  Icon(Icons.warning_amber_rounded, color: Colors.amber.shade900, size: 28),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '⚠️ AI-ASSISTED ANALYSIS – REQUIRES EXPERT VERIFICATION',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: Colors.amber.shade900),
                        ),
                        const SizedBox(height: 2),
                        const Text(
                          'AI recommendations provide statistical impact estimates and conflict predictions. Final decision lies with certified SIA Experts & Collector.',
                          style: TextStyle(fontSize: 11, color: Colors.black87),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // 2. AI IMPACT ANALYSIS CARD
            Card(
              elevation: 3,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.auto_awesome, color: Color(0xFF7C3AED)),
                        SizedBox(width: 8),
                        Text(
                          'AI-Assisted SIA Impact Synthesis',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF7C3AED)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    _aiInsightBullet('Displacement Risk', 'High concentration of residential displacement in Chakan Phata (74 families requiring relocation plots).'),
                    _aiInsightBullet('Livelihood Vulnerability', '68% of affected PAPs rely on rainfed farming. Priority skill retraining recommended.'),
                    _aiInsightBullet('Dispute Probability', '12 land parcels flagged for potential boundary inheritance claims before Gazette closure.'),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // 3. 2FA SUBMISSION & REPORT LOCK
            Card(
              elevation: 3,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.lock, color: Color(0xFF00897B)),
                        SizedBox(width: 8),
                        Text(
                          'SIA Report Submission & 2FA Lock',
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text('Submit final verified Social Impact Assessment report to District Collectorate with 6-Digit OTP security authentication.', style: TextStyle(fontSize: 12, color: Colors.grey[700])),
                    const SizedBox(height: 14),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: () {
                          _show2faModal(context);
                        },
                        icon: const Icon(Icons.security),
                        label: const Text('Submit Final SIA Report to Collector (2FA)'),
                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00897B)),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // 4. SYNC CENTER
            Card(
              elevation: 2,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Offline Survey Sync Center', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                        Text('3 Draft Records Ready for Upload', style: TextStyle(fontSize: 11, color: Colors.grey)),
                      ],
                    ),
                    ElevatedButton.icon(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Synced all offline SIA records with central server.')));
                      },
                      icon: const Icon(Icons.sync, size: 16),
                      label: const Text('Sync Now'),
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0284C7)),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),

            // 5. LOGOUT SESSION
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
                label: const Text('LOGOUT SIA SESSION', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _aiInsightBullet(String title, String desc) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('• ', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF7C3AED), fontSize: 16)),
          Expanded(
            child: RichText(
              text: TextSpan(
                style: const TextStyle(fontSize: 12, color: Colors.black87),
                children: [
                  TextSpan(text: '$title: ', style: const TextStyle(fontWeight: FontWeight.bold)),
                  TextSpan(text: desc),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _show2faModal(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => const Sia2faSubmitModal(),
    );
  }
}

// ============================================================================
// 11. 2FA SECURITY OTP SUBMISSION MODAL
// ============================================================================

class Sia2faSubmitModal extends StatefulWidget {
  const Sia2faSubmitModal({super.key});

  @override
  State<Sia2faSubmitModal> createState() => _Sia2faSubmitModalState();
}

class _Sia2faSubmitModalState extends State<Sia2faSubmitModal> {
  final _otpCtrl = TextEditingController(text: '849201');
  bool _verifying = false;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      title: const Row(
        children: [
          Icon(Icons.verified_user, color: Color(0xFF00897B)),
          SizedBox(width: 8),
          Text('2FA Authentication'),
        ],
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Enter the 6-Digit OTP sent to your registered SIA Expert mobile number (+91 98*** **901):', style: TextStyle(fontSize: 12)),
          const SizedBox(height: 14),
          TextField(
            controller: _otpCtrl,
            keyboardType: TextInputType.number,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, letterSpacing: 6),
            decoration: const InputDecoration(hintText: '000000'),
          ),
        ],
      ),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
        ElevatedButton(
          onPressed: _verifying
              ? null
              : () {
                  setState(() => _verifying = true);
                  Future.delayed(const Duration(milliseconds: 700), () {
                    if (mounted) {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('🔒 SIA Final Report successfully verified with 2FA & locked for Collector Review!'),
                          backgroundColor: Color(0xFF2E7D32),
                        ),
                      );
                    }
                  });
                },
          style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00897B)),
          child: _verifying ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Text('VERIFY & SUBMIT'),
        ),
      ],
    );
  }
}

class _StaticItem {
  final String label;
  final String value;
  const _StaticItem(this.label, this.value);
}
