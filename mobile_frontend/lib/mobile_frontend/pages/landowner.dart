import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart' hide Path;
import 'surveyor.dart';
import '../theme/app_design.dart';


// ============================================================================
// SWADESH - LANDOWNER MOBILE PORTAL
// Modern, transparent, government-grade mobile application for PAPs & Landowners
// ============================================================================

void main() {
  runApp(const SwadeshLandownerPortalApp());
}

class SwadeshLandownerPortalApp extends StatelessWidget {
  final bool startLoggedIn;
  final VoidCallback? onLogout;
  const SwadeshLandownerPortalApp({super.key, this.startLoggedIn = true, this.onLogout});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SWADESH - Landowner Portal',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: 'Roboto',
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF00695C), // Government Teal
          primary: const Color(0xFF00695C),
          secondary: const Color(0xFF0288D1), // Slate Blue
          tertiary: const Color(0xFF2E7D32), // Emerald
          surface: const Color(0xFFF8FAFC),
          onSurface: const Color(0xFF0F172A),
        ),
        scaffoldBackgroundColor: const Color(0xFFF1F5F9),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF00695C),
          foregroundColor: Colors.white,
          elevation: 2,
        ),
        cardTheme: CardThemeData(
          elevation: 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          color: Colors.white,
        ),
      ),
      home: LandownerRootScreen(startLoggedIn: startLoggedIn, onLogout: onLogout),
    );
  }
}


// ============================================================================
// 1. DATA MODELS & ENUMS
// ============================================================================

enum ObjectionStatus {
  notSubmitted,
  draft,
  submitted,
  received,
  underReview,
  additionalInfoRequired,
  accepted,
  partiallyAccepted,
  rejected,
  resolved,
}

extension ObjectionStatusExt on ObjectionStatus {
  String get label {
    switch (this) {
      case ObjectionStatus.notSubmitted:
        return 'Not Submitted';
      case ObjectionStatus.draft:
        return 'Draft Saved';
      case ObjectionStatus.submitted:
        return 'Submitted';
      case ObjectionStatus.received:
        return 'Received by Collector';
      case ObjectionStatus.underReview:
        return 'Under Review';
      case ObjectionStatus.additionalInfoRequired:
        return 'Action Required';
      case ObjectionStatus.accepted:
        return 'Objection Accepted';
      case ObjectionStatus.partiallyAccepted:
        return 'Partially Accepted';
      case ObjectionStatus.rejected:
        return 'Objection Rejected';
      case ObjectionStatus.resolved:
        return 'Resolved';
    }
  }

  Color get color {
    switch (this) {
      case ObjectionStatus.notSubmitted:
        return const Color(0xFF64748B);
      case ObjectionStatus.draft:
        return const Color(0xFF0288D1);
      case ObjectionStatus.submitted:
        return const Color(0xFF0288D1);
      case ObjectionStatus.received:
        return const Color(0xFF0D9488);
      case ObjectionStatus.underReview:
        return const Color(0xFFE65100);
      case ObjectionStatus.additionalInfoRequired:
        return const Color(0xFFD97706);
      case ObjectionStatus.accepted:
        return const Color(0xFF2E7D32);
      case ObjectionStatus.partiallyAccepted:
        return const Color(0xFF15803D);
      case ObjectionStatus.rejected:
        return const Color(0xFFC62828);
      case ObjectionStatus.resolved:
        return const Color(0xFF166534);
    }
  }

  IconData get icon {
    switch (this) {
      case ObjectionStatus.notSubmitted:
        return Icons.edit_note_rounded;
      case ObjectionStatus.draft:
        return Icons.save_as_rounded;
      case ObjectionStatus.submitted:
        return Icons.send_rounded;
      case ObjectionStatus.received:
        return Icons.mark_email_read_rounded;
      case ObjectionStatus.underReview:
        return Icons.hourglass_top_rounded;
      case ObjectionStatus.additionalInfoRequired:
        return Icons.warning_amber_rounded;
      case ObjectionStatus.accepted:
      case ObjectionStatus.partiallyAccepted:
      case ObjectionStatus.resolved:
        return Icons.check_circle_rounded;
      case ObjectionStatus.rejected:
        return Icons.cancel_rounded;
    }
  }
}

class LandownerProfile {
  final String name;
  final String papId;
  final String mobileNumber;
  final String email;
  final String address;
  final String village;
  final String taluka;
  final String district;
  final String khataNumber;
  final String accountStatus;

  LandownerProfile({
    required this.name,
    required this.papId,
    required this.mobileNumber,
    required this.email,
    required this.address,
    required this.village,
    required this.taluka,
    required this.district,
    required this.khataNumber,
    required this.accountStatus,
  });
}

class LandParcelDetails {
  final String projectName;
  final String projectId;
  final String publicPurpose;
  final String proposingAuthority;
  final String surveyNumber;
  final String subDivision;
  final String parcelId;
  final String village;
  final String taluka;
  final String district;
  final String gramPanchayat;
  final double totalAreaHa;
  final double areaRequiredHa;
  final double areaRemainingHa;
  final String landUse;
  final String ownershipStatus;

  LandParcelDetails({
    required this.projectName,
    required this.projectId,
    required this.publicPurpose,
    required this.proposingAuthority,
    required this.surveyNumber,
    required this.subDivision,
    required this.parcelId,
    required this.village,
    required this.taluka,
    required this.district,
    required this.gramPanchayat,
    required this.totalAreaHa,
    required this.areaRequiredHa,
    required this.areaRemainingHa,
    required this.landUse,
    required this.ownershipStatus,
  });
}

class ObjectionRecord {
  final String objectionId;
  final String projectId;
  final String landownerName;
  final String papId;
  final String surveyNumber;
  final String parcelId;
  final String village;
  List<String> categories;
  String description;
  List<Map<String, String>> attachments;
  ObjectionStatus status;
  String submissionDate;
  String submissionTime;
  String lastUpdated;
  String? authorityRemarks;
  String? requestedInfoPrompt;
  List<Map<String, String>> additionalUploads;

  ObjectionRecord({
    required this.objectionId,
    required this.projectId,
    required this.landownerName,
    required this.papId,
    required this.surveyNumber,
    required this.parcelId,
    required this.village,
    required this.categories,
    required this.description,
    required this.attachments,
    required this.status,
    required this.submissionDate,
    required this.submissionTime,
    required this.lastUpdated,
    this.authorityRemarks,
    this.requestedInfoPrompt,
    List<Map<String, String>>? additionalUploads,
  }) : additionalUploads = additionalUploads ?? [];
}

class LandNoticeDoc {
  final String id;
  final String title;
  final String type; // Gazette, Notice, Compensation, R&R
  final String refNumber;
  final String date;
  final String status;
  final String fileSize;
  final String description;

  LandNoticeDoc({
    required this.id,
    required this.title,
    required this.type,
    required this.refNumber,
    required this.date,
    required this.status,
    required this.fileSize,
    required this.description,
  });
}

// ============================================================================
// 2. ROOT & AUTH STATE CONTROLLER
// ============================================================================

class LandownerRootScreen extends StatefulWidget {
  final bool startLoggedIn;
  final VoidCallback? onLogout;
  const LandownerRootScreen({super.key, this.startLoggedIn = true, this.onLogout});

  @override
  State<LandownerRootScreen> createState() => _LandownerRootScreenState();
}

class _LandownerRootScreenState extends State<LandownerRootScreen> {
  late bool _isLoggedIn;
  int _currentNavIndex = 0;

  @override
  void initState() {
    super.initState();
    _isLoggedIn = widget.startLoggedIn;
  }

  // Mock Landowner Data
  final LandownerProfile _profile = LandownerProfile(
    name: 'Rajesh Patil',
    papId: 'PAP-MH-2026-88412',
    mobileNumber: '+91 98765 43210',
    email: 'rajesh.patil@example.com',
    address: 'House No. 42, Waghala Village, Taluka Haveli, District Pune',
    village: 'Waghala',
    taluka: 'Haveli',
    district: 'Pune',
    khataNumber: '481',
    accountStatus: 'Verified Citizen Account',
  );

  final LandParcelDetails _parcel = LandParcelDetails(
    projectName: 'SWADESH Corridor Expansion (NH-48)',
    projectId: 'SWD-2026-014',
    publicPurpose: 'National Highway Infrastructure & Multi-Modal Freight Corridor Expansion',
    proposingAuthority: 'National Highways Authority of India (NHAI)',
    surveyNumber: '124/2',
    subDivision: '2A',
    parcelId: 'MH-P-10241',
    village: 'Waghala',
    taluka: 'Haveli',
    district: 'Pune',
    gramPanchayat: 'Waghala Gram Panchayat',
    totalAreaHa: 2.40,
    areaRequiredHa: 1.60,
    areaRemainingHa: 0.80,
    landUse: 'Agricultural (Irrigated Double-Crop)',
    ownershipStatus: 'Sole Title Holder (7/12 Extract Khata 481)',
  );

  // 60-Day Countdown State
  final int _totalObjectionDays = 60;
  final int _completedObjectionDays = 18;
  bool _forceClosedPeriod = false; // Toggleable for testing expired status

  // Objections State
  final List<ObjectionRecord> _myObjections = [
    ObjectionRecord(
      objectionId: 'OBJ-2026-004821',
      projectId: 'SWD-2026-014',
      landownerName: 'Rajesh Patil',
      papId: 'PAP-MH-2026-88412',
      surveyNumber: '124/2',
      parcelId: 'MH-P-10241',
      village: 'Waghala',
      categories: ['Area Discrepancy', 'Compensation Concern'],
      description:
          'The notification mentions 1.60 Ha required, whereas my physical boundary survey and 7/12 extract indicate only 1.42 Ha falls within the highway corridor boundary. Requesting on-field re-verification by DILR.',
      attachments: [
        {'name': '7_12_Extract_Waghala_124_2.pdf', 'type': 'Land Record', 'date': '12 Oct 2026'},
        {'name': 'Parcel_Boundary_Photo.jpg', 'type': 'Photograph', 'date': '14 Oct 2026'},
      ],
      status: ObjectionStatus.underReview,
      submissionDate: '15 Oct 2026',
      submissionTime: '10:30 AM',
      lastUpdated: '18 Oct 2026',
      authorityRemarks: 'Forwarded to District Inspector of Land Records (DILR) for re-survey.',
      requestedInfoPrompt: 'Please upload updated boundaries map signed by Village Talathi if available.',
    ),
  ];

  // Official Documents List
  final List<LandNoticeDoc> _notices = [
    LandNoticeDoc(
      id: 'DOC-01',
      title: 'Preliminary Notification (Section 11(1))',
      type: 'Gazette',
      refNumber: 'MH-GAZ-2026-9921',
      date: '25 Sep 2026',
      status: 'Official Gazette Released',
      fileSize: '2.4 MB',
      description: 'Official preliminary notification published under RFCTLARR Act 2013 for NH-48 Corridor Expansion.',
    ),
    LandNoticeDoc(
      id: 'DOC-02',
      title: 'Land Acquisition Notice to PAPs',
      type: 'Land Notice',
      refNumber: 'LAO-PUNE-2026-042',
      date: '28 Sep 2026',
      status: 'Served via SMS/Post',
      fileSize: '1.1 MB',
      description: 'Notice detailing acquisition area of Survey No. 124/2 and initiating 60-day objection window.',
    ),
    LandNoticeDoc(
      id: 'DOC-03',
      title: 'Social Impact Assessment (SIA) Summary Report',
      type: 'SIA Report',
      refNumber: 'SIA-PUNE-2026-008',
      date: '10 Sep 2026',
      status: 'Approved by Committee',
      fileSize: '4.8 MB',
      description: 'Approved Social Impact Assessment & SIMP report for Waghala Village corridor.',
    ),
    LandNoticeDoc(
      id: 'DOC-04',
      title: 'Draft Compensation Schedule & Matrix',
      type: 'Compensation',
      refNumber: 'COMP-MH-2026-11',
      date: '05 Nov 2026',
      status: 'Provisional / Guidance',
      fileSize: '1.8 MB',
      description: 'Guideline market values and solatium rates for Haveli Taluka land acquisition.',
    ),
  ];

  // Notification Feed
  int _unreadNotifications = 3;

  void _handleLogout() {
    if (widget.onLogout != null) {
      widget.onLogout!();
    } else {
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (context) => const SwadeshApp()),
        (route) => false,
      );
    }
  }

  void _addNewObjection(ObjectionRecord objection) {
    setState(() {
      _myObjections.insert(0, objection);
      _unreadNotifications++;
    });
  }

  void _showSwadeshSaathiChatbot(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(ctx).viewInsets.bottom),
        child: SwadeshSaathiChatbotModal(
          profile: _profile,
          parcel: _parcel,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (!_isLoggedIn) {
      _handleLogout();
      return const SizedBox.shrink();
    }

    return Scaffold(
      appBar: _buildTopAppBar(),
      body: IndexedStack(
        index: _currentNavIndex,
        children: [
          // 0: Dashboard
          LandownerDashboardView(
            profile: _profile,
            parcel: _parcel,
            completedDays: _completedObjectionDays,
            totalDays: _totalObjectionDays,
            isPeriodClosed: _forceClosedPeriod,
            objections: _myObjections,
            onNavigate: (index) => setState(() => _currentNavIndex = index),
            onToggleClosedPeriod: () {
              setState(() {
                _forceClosedPeriod = !_forceClosedPeriod;
              });
            },
          ),
          // 1: My Land & Map
          MyLandMapView(parcel: _parcel),
          // 2: Notices & Documents
          NoticesDocumentsView(notices: _notices),
          // 3: Objections Management
          ObjectionsManagementView(
            profile: _profile,
            parcel: _parcel,
            objections: _myObjections,
            completedDays: _completedObjectionDays,
            totalDays: _totalObjectionDays,
            isPeriodClosed: _forceClosedPeriod,
            onObjectionSubmitted: _addNewObjection,
          ),
          // 4: Profile & Support
          ProfileAndSupportView(
            profile: _profile,
            parcel: _parcel,
            onLogout: _handleLogout,
            onOpenChatbot: () => _showSwadeshSaathiChatbot(context),
          ),
        ],
      ),
      bottomNavigationBar: _buildBottomNavigationBar(),
    );
  }

  PreferredSizeWidget _buildTopAppBar() {
    return AppBar(
      titleSpacing: 12,
      title: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.2),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.account_balance_rounded, color: Colors.white, size: 22),
          ),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'SWADESH',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  letterSpacing: 1.1,
                  color: Colors.white,
                ),
              ),
              Text(
                'Landowner Mobile Portal',
                style: TextStyle(
                  fontSize: 11,
                  color: Colors.teal.shade50,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ],
          ),
        ],
      ),
      actions: [
        // AI Chatbot Top Navbar Pill Button
        Padding(
          padding: const EdgeInsets.only(right: 4),
          child: Center(
            child: InkWell(
              onTap: () => _showSwadeshSaathiChatbot(context),
              borderRadius: BorderRadius.circular(20),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.white30),
                ),
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.smart_toy_rounded, color: Colors.amber, size: 18),
                    SizedBox(width: 5),
                    Text(
                      'AI Chat',
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),

        Stack(
          children: [
            IconButton(
              icon: const Icon(Icons.notifications_outlined, color: Colors.white),
              onPressed: _showNotificationsSheet,
            ),
            if (_unreadNotifications > 0)
              Positioned(
                right: 8,
                top: 8,
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    color: Color(0xFFEF4444),
                    shape: BoxShape.circle,
                  ),
                  child: Text(
                    '$_unreadNotifications',
                    style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
          ],
        ),
        PopupMenuButton<String>(
          icon: const Icon(Icons.more_vert, color: Colors.white),
          onSelected: (val) {
            if (val == 'logout') {
              _handleLogout();
            } else if (val == 'help') {
              setState(() => _currentNavIndex = 4);
            }
          },
          itemBuilder: (ctx) => [
            const PopupMenuItem(
              value: 'help',
              child: Row(
                children: [
                  Icon(Icons.help_outline_rounded, color: Color(0xFF0288D1)),
                  SizedBox(width: 10),
                  Text('Help & Support'),
                ],
              ),
            ),
            const PopupMenuDivider(),
            const PopupMenuItem(
              value: 'logout',
              child: Row(
                children: [
                  Icon(Icons.logout_rounded, color: Color(0xFFDC2626)),
                  SizedBox(width: 10),
                  Text('Logout', style: TextStyle(color: Color(0xFFDC2626))),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildBottomNavigationBar() {
    return Container(
      decoration: const BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 10,
            offset: Offset(0, -2),
          ),
        ],
      ),
      child: BottomNavigationBar(
        currentIndex: _currentNavIndex,
        onTap: (idx) => setState(() => _currentNavIndex = idx),
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.white,
        selectedItemColor: const Color(0xFF00695C),
        unselectedItemColor: const Color(0xFF64748B),
        selectedFontSize: 12,
        unselectedFontSize: 11,
        selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_rounded),
            activeIcon: Icon(Icons.dashboard),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.map_outlined),
            activeIcon: Icon(Icons.map_rounded),
            label: 'My Land',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.description_outlined),
            activeIcon: Icon(Icons.description_rounded),
            label: 'Notices',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.gavel_outlined),
            activeIcon: Icon(Icons.gavel_rounded),
            label: 'Objections',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline_rounded),
            activeIcon: Icon(Icons.person_rounded),
            label: 'Profile',
          ),
        ],
      ),
    );
  }

  void _showNotificationsSheet() {
    setState(() => _unreadNotifications = 0);
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return Container(
          padding: const EdgeInsets.all(20),
          height: MediaQuery.of(context).size.height * 0.7,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Expanded(
                    child: Row(
                      children: [
                        Icon(Icons.notifications_active_rounded, color: Color(0xFF00695C)),
                        SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            'Official Alerts & Notifications',
                            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () => Navigator.pop(ctx),
                  ),
                ],
              ),
              const Divider(),
              Expanded(
                child: ListView(
                  children: [
                    _buildNotificationTile(
                      icon: Icons.gavel_rounded,
                      color: const Color(0xFF0288D1),
                      title: '60-Day Objection Window Active',
                      subtitle: 'You have 42 days remaining to submit any objections for Survey No. 124/2.',
                      time: 'Today, 9:00 AM',
                    ),
                    _buildNotificationTile(
                      icon: Icons.assignment_outlined,
                      color: const Color(0xFFE65100),
                      title: 'Objection Status Update',
                      subtitle: 'Objection OBJ-2026-004821 is under review by District Collector Office.',
                      time: '18 Oct 2026',
                    ),
                    _buildNotificationTile(
                      icon: Icons.notifications_active_rounded,
                      color: const Color(0xFF2E7D32),
                      title: 'Preliminary Notification Published',
                      subtitle: 'Section 11(1) Gazette notification published for NH-48 Expressway Corridor.',
                      time: '25 Sep 2026',
                    ),
                    _buildNotificationTile(
                      icon: Icons.account_balance_wallet_outlined,
                      color: const Color(0xFF7C3AED),
                      title: 'Draft Valuation Matrix Available',
                      subtitle: 'Provisional land value guidance sheet available under Notices section.',
                      time: '05 Nov 2026',
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildNotificationTile({
    required IconData icon,
    required Color color,
    required String title,
    required String subtitle,
    required String time,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            backgroundColor: color.withValues(alpha: 0.1),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                const SizedBox(height: 4),
                Text(subtitle, style: TextStyle(color: Colors.grey.shade700, fontSize: 12)),
                const SizedBox(height: 6),
                Text(time, style: TextStyle(color: Colors.grey.shade500, fontSize: 10)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ============================================================================
// 3. LANDOWNER LOGIN SCREEN
// ============================================================================

class LandownerLoginScreen extends StatefulWidget {
  final VoidCallback onLoginSuccess;

  const LandownerLoginScreen({super.key, required this.onLoginSuccess});

  @override
  State<LandownerLoginScreen> createState() => _LandownerLoginScreenState();
}

class _LandownerLoginScreenState extends State<LandownerLoginScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _mobileController = TextEditingController(text: '9876543210');
  final TextEditingController _passwordController = TextEditingController(text: 'pass123');
  final TextEditingController _otpController = TextEditingController();

  bool _otpSent = false;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState() ;
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _mobileController.dispose();
    _passwordController.dispose();
    _otpController.dispose();
    super.dispose();
  }

  void _handlePasswordLogin() {
    if (_mobileController.text.trim().isEmpty || _passwordController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter Mobile Number / User ID and Password.')),
      );
      return;
    }
    setState(() => _isLoading = true);
    Future.delayed(const Duration(milliseconds: 800), () {
      if (mounted) {
        setState(() => _isLoading = false);
        widget.onLoginSuccess();
      }
    });
  }

  void _handleRequestOtp() {
    if (_mobileController.text.trim().length < 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a valid 10-digit registered mobile number.')),
      );
      return;
    }
    setState(() => _isLoading = true);
    Future.delayed(const Duration(milliseconds: 700), () {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _otpSent = true;
          _otpController.text = '482109'; // Simulated OTP fill
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('OTP sent to +91 98765 43210 (Simulated: 482109)'),
            backgroundColor: Color(0xFF2E7D32),
          ),
        );
      }
    });
  }

  void _handleVerifyOtp() {
    if (_otpController.text.trim().length < 4) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter valid OTP code.')),
      );
      return;
    }
    setState(() => _isLoading = true);
    Future.delayed(const Duration(milliseconds: 800), () {
      if (mounted) {
        setState(() => _isLoading = false);
        widget.onLoginSuccess();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final double hp = screenWidth < 360 ? 12.0 : (screenWidth < 600 ? 16.0 : 24.0);

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF004D40), // Deep Government Teal
              Color(0xFF00695C),
              Color(0xFF00897B),
            ],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: hp, vertical: 16),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 480),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                  // Government Emblem Badge
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.2),
                          blurRadius: 12,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: const Icon(Icons.account_balance_rounded, size: 46, color: Color(0xFF004D40)),
                  ),
                  const SizedBox(height: 16),

                  const Text(
                    'SWADESH',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                      letterSpacing: 2,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      'Landowner Mobile Portal',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Land Acquisition Management & Transparency Portal',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 12, color: Colors.teal.shade100),
                  ),
                  const SizedBox(height: 28),

                  // Login Form Card
                  Card(
                    elevation: 8,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    child: Padding(
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          TabBar(
                            controller: _tabController,
                            labelColor: const Color(0xFF00695C),
                            unselectedLabelColor: const Color(0xFF64748B),
                            indicatorColor: const Color(0xFF00695C),
                            indicatorWeight: 3,
                            tabs: const [
                              Tab(text: 'Password Login'),
                              Tab(text: 'OTP Authentication'),
                            ],
                          ),
                          const SizedBox(height: 20),
                          SizedBox(
                            height: 230,
                            child: TabBarView(
                              controller: _tabController,
                              children: [
                                // Tab 1: Password Login
                                Column(
                                  children: [
                                    TextField(
                                      controller: _mobileController,
                                      keyboardType: TextInputType.phone,
                                      decoration: InputDecoration(
                                        labelText: 'Mobile Number / PAP User ID',
                                        prefixIcon: const Icon(Icons.phone_android_rounded),
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                                      ),
                                    ),
                                    const SizedBox(height: 16),
                                    TextField(
                                      controller: _passwordController,
                                      obscureText: true,
                                      decoration: InputDecoration(
                                        labelText: 'Password',
                                        prefixIcon: const Icon(Icons.lock_outline_rounded),
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                                      ),
                                    ),
                                    const SizedBox(height: 20),
                                    SizedBox(
                                      width: double.infinity,
                                      height: 48,
                                      child: ElevatedButton(
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor: const Color(0xFF00695C),
                                          foregroundColor: Colors.white,
                                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                        ),
                                        onPressed: _isLoading ? null : _handlePasswordLogin,
                                        child: _isLoading
                                            ? const SizedBox(
                                                width: 24,
                                                height: 24,
                                                child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                                              )
                                            : const Text(
                                                'LOGIN TO PORTAL',
                                                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                                              ),
                                      ),
                                    ),
                                  ],
                                ),
                                // Tab 2: OTP Login
                                Column(
                                  children: [
                                    TextField(
                                      controller: _mobileController,
                                      keyboardType: TextInputType.phone,
                                      decoration: InputDecoration(
                                        labelText: 'Registered Mobile Number',
                                        prefixIcon: const Icon(Icons.phone_android_rounded),
                                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                                      ),
                                    ),
                                    const SizedBox(height: 12),
                                    if (_otpSent) ...[
                                      TextField(
                                        controller: _otpController,
                                        keyboardType: TextInputType.number,
                                        decoration: InputDecoration(
                                          labelText: 'Enter 6-Digit OTP',
                                          prefixIcon: const Icon(Icons.security_rounded),
                                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                                        ),
                                      ),
                                      const SizedBox(height: 12),
                                    ],
                                    SizedBox(
                                      width: double.infinity,
                                      height: 48,
                                      child: ElevatedButton(
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor:
                                              _otpSent ? const Color(0xFF2E7D32) : const Color(0xFF00695C),
                                          foregroundColor: Colors.white,
                                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                        ),
                                        onPressed: _isLoading
                                            ? null
                                            : (_otpSent ? _handleVerifyOtp : _handleRequestOtp),
                                        child: _isLoading
                                            ? const SizedBox(
                                                width: 24,
                                                height: 24,
                                                child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                                              )
                                            : Text(
                                                _otpSent ? 'VERIFY OTP & LOGIN' : 'GET OTP VIA SMS',
                                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                                              ),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),

                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              TextButton(
                                onPressed: () {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                      content: Text('Password reset instructions sent to registered mobile/email.'),
                                    ),
                                  );
                                },
                                child: const Text('Forgot Password?'),
                              ),
                              TextButton(
                                onPressed: _showHelpModal,
                                child: const Text('Need Help?'),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Official Info Footnote
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.info_outline_rounded, color: Colors.white, size: 20),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            'Credentials are dispatched via SMS / Email upon release of Section 11(1) Preliminary Notification Gazette.',
                            style: TextStyle(fontSize: 11, color: Colors.teal.shade50),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  Text(
                    'Ministry of Rural Development • Government of India',
                    style: TextStyle(color: Colors.teal.shade100, fontSize: 11),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      ),
    );
  }

  void _showHelpModal() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.help_center_rounded, color: Color(0xFF00695C), size: 28),
                SizedBox(width: 10),
                Text('Landowner Portal Login Assistance', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 16),
            const Text(
              '1. How do I get my login credentials?\n'
              'Credentials (User ID & Initial Password) are generated automatically when your land parcel is published in the Gazette / Preliminary Notification.\n\n'
              '2. Did not receive SMS?\n'
              'You can use the "OTP Authentication" tab to receive a instant 6-digit login passcode on your registered Aadhaar-linked mobile number.\n\n'
              '3. Helpline & Support\n'
              'Toll-Free Helpline: 1800-233-4567\nEmail: landowner-help@swadesh.gov.in',
              style: TextStyle(fontSize: 13, height: 1.4),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00695C), foregroundColor: Colors.white),
                onPressed: () => Navigator.pop(ctx),
                child: const Text('CLOSE'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ============================================================================
// 4. TAB 0: LANDOWNER DASHBOARD (WITH 60-DAY COUNTDOWN)
// ============================================================================

class LandownerDashboardView extends StatelessWidget {
  final LandownerProfile profile;
  final LandParcelDetails parcel;
  final int completedDays;
  final int totalDays;
  final bool isPeriodClosed;
  final List<ObjectionRecord> objections;
  final Function(int) onNavigate;
  final VoidCallback onToggleClosedPeriod;

  const LandownerDashboardView({
    super.key,
    required this.profile,
    required this.parcel,
    required this.completedDays,
    required this.totalDays,
    required this.isPeriodClosed,
    required this.objections,
    required this.onNavigate,
    required this.onToggleClosedPeriod,
  });

  @override
  Widget build(BuildContext context) {
    // 60-Day Countdown tracked strictly from Preliminary Notification Date (25 Sep 2026)
    final DateTime preliminaryNotificationDate = DateTime(2026, 9, 25);
    final DateTime simulatedCurrentDate = DateTime(2026, 10, 13);

    final int totalWindowDays = 60;
    final int daysCompletedCalc = simulatedCurrentDate.difference(preliminaryNotificationDate).inDays.clamp(0, 60);
    final int daysRemainingCalc = (totalWindowDays - daysCompletedCalc).clamp(0, 60);
    final bool periodExpired = daysRemainingCalc <= 0;
    final double progressRatio = daysCompletedCalc / totalWindowDays;

    Color statusColor;
    if (periodExpired) {
      statusColor = const Color(0xFFC62828);
    } else if (daysRemainingCalc > 30) {
      statusColor = const Color(0xFF2E7D32);
    } else if (daysRemainingCalc >= 15) {
      statusColor = const Color(0xFFE65100);
    } else {
      statusColor = const Color(0xFFC62828);
    }

    final ObjectionRecord? latestObjection = objections.isNotEmpty ? objections.first : null;
    final double screenWidth = MediaQuery.of(context).size.width;
    final double hp = screenWidth < 360 ? 8.0 : (screenWidth < 600 ? 10.0 : 16.0);

    return SingleChildScrollView(
      padding: EdgeInsets.symmetric(horizontal: hp, vertical: 10),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 600),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Personal Welcome Header (Clean, unboxed, no photo or extra details)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 0),
                child: Text(
                  'Welcome, ${profile.name}',
                  style: const TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w800,
                    color: Color(0xFF0F172A),
                    letterSpacing: 0.3,
                  ),
                ),
              ),
              const SizedBox(height: 10),

              // 2. 60-DAY OBJECTION PERIOD CARD (Short, Broader & Dynamic Accent Tint)
              SizedBox(
                width: double.infinity,
                child: Card(
                  elevation: 1,
                  margin: EdgeInsets.zero,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                    side: BorderSide(color: statusColor.withValues(alpha: 0.35), width: 1.5),
                  ),
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(14),
                      color: statusColor.withValues(alpha: 0.05),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Icon(Icons.timer_rounded, color: statusColor, size: 20),
                                const SizedBox(width: 8),
                                const Text(
                                  '60-Day Objection Window',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFF0F172A),
                                  ),
                                ),
                              ],
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                              decoration: BoxDecoration(
                                color: statusColor.withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: statusColor.withValues(alpha: 0.3)),
                              ),
                              child: Text(
                                periodExpired ? 'CLOSED' : '$daysRemainingCalc Days Left',
                                style: TextStyle(color: statusColor, fontWeight: FontWeight.bold, fontSize: 12),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),

                        if (periodExpired) ...[
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                            decoration: BoxDecoration(
                              color: const Color(0xFFC62828),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Text(
                              'OBJECTION PERIOD CLOSED • Expired on 24 November 2026',
                              textAlign: TextAlign.center,
                              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                            ),
                          ),
                        ] else ...[
                          ClipRRect(
                            borderRadius: BorderRadius.circular(6),
                            child: LinearProgressIndicator(
                              value: progressRatio,
                              minHeight: 8,
                              backgroundColor: Colors.grey.shade200,
                              color: statusColor,
                            ),
                          ),
                          const SizedBox(height: 10),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Gazette Date: 25 Sep 2026',
                                style: TextStyle(fontSize: 11, color: Colors.grey.shade600),
                              ),
                              Text(
                                '60-Day Deadline: 24 Nov 2026',
                                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.grey.shade800),
                              ),
                            ],
                          ),
                        ],
                        const SizedBox(height: 12),

                        SizedBox(
                          width: double.infinity,
                          height: 40,
                          child: ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: periodExpired ? Colors.grey.shade400 : const Color(0xFF00695C),
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                              elevation: 0,
                            ),
                            onPressed: periodExpired
                                ? null
                                : () {
                                    onNavigate(3);
                                  },
                            icon: const Icon(Icons.gavel_rounded, size: 16),
                            label: Text(
                              periodExpired ? 'OBJECTION PERIOD CLOSED' : 'RAISE AN OBJECTION NOW',
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 12),

              // 3. MY PROJECT & MY LAND DETAILS directly on page (Full Width Unboxed)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.business_center_rounded, color: Color(0xFF00695C), size: 20),
                      SizedBox(width: 8),
                      Text('MY PROJECT', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Color(0xFF0F172A))),
                    ],
                  ),
                  const SizedBox(height: 10),

                  // Project Overview Card with Image Banner, 2-line Description, Read More Toggle & View Details Modal
                  ProjectCardWidget(parcel: parcel),

                  const SizedBox(height: 20),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Flexible(
                        child: Row(
                          children: [
                            Icon(Icons.landscape_rounded, color: Color(0xFF0288D1), size: 20),
                            SizedBox(width: 8),
                            Flexible(
                              child: Text(
                                'MY LAND PARCEL DETAILS',
                                softWrap: true,
                                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF0F172A)),
                              ),
                            ),
                          ],
                        ),
                      ),
                      OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          foregroundColor: const Color(0xFF00695C),
                          side: const BorderSide(color: Color(0xFF00695C)),
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        ),
                        onPressed: () => onNavigate(1),
                        icon: const Icon(Icons.map_rounded, size: 16),
                        label: const Text('View on Map'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _buildDataRow('Survey Number:', parcel.surveyNumber),
                  _buildDataRow('Sub-Division / Parcel ID:', '${parcel.subDivision} (${parcel.parcelId})'),
                  _buildDataRow('Village Location:', '${parcel.village}, Taluka ${parcel.taluka}, District ${parcel.district}'),
                  _buildDataRow('Total Parcel Area:', '${parcel.totalAreaHa} Hectares'),
                  _buildDataRow('Required Area for Acquisition:', '${parcel.areaRequiredHa} Hectares', isHighlight: true),
                  _buildDataRow('Remaining Unacquired Area:', '${parcel.areaRemainingHa} Hectares'),
                  _buildDataRow('Land Use & Ownership:', '${parcel.landUse} • ${parcel.ownershipStatus}'),
                ],
              ),
              const SizedBox(height: 16),

              // 4. Acquisition Stage Timeline Card (Simplified with VIEW DETAILS button)
              SizedBox(
                width: double.infinity,
                child: Card(
                  elevation: 1,
                  margin: EdgeInsets.zero,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Row(
                          children: [
                            Icon(Icons.timeline_rounded, color: Color(0xFF00695C), size: 20),
                            SizedBox(width: 8),
                            Text(
                              'ACQUISITION STAGE TIMELINE',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF0F172A)),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: const Color(0xFFE65100).withValues(alpha: 0.08),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: const Color(0xFFE65100).withValues(alpha: 0.3)),
                          ),
                          child: Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(8),
                                decoration: const BoxDecoration(
                                  color: Color(0xFFE65100),
                                  shape: BoxShape.circle,
                                ),
                                child: const Text(
                                  '4',
                                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                                ),
                              ),
                              const SizedBox(width: 12),
                              const Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Current Stage: 60-Day Objection Period',
                                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFFE65100)),
                                    ),
                                    SizedBox(height: 2),
                                    Text(
                                      'Stage 4 of 8 • Active Now (25 Sep – 24 Nov 2026)',
                                      style: TextStyle(fontSize: 11, color: Color(0xFF475569)),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 14),
                        SizedBox(
                          width: double.infinity,
                          height: 42,
                          child: ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF00695C),
                              foregroundColor: Colors.white,
                              elevation: 0,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            ),
                            onPressed: () => _showTimelineDetailsModal(context),
                            icon: const Icon(Icons.info_outline_rounded, size: 18),
                            label: const Text(
                              'VIEW DETAILS',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, letterSpacing: 0.5),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // 5. Status Cards Placed at Bottom of Page (Full Width)
              _buildFullWidthStatusCard(
                title: 'ACQUISITION STATUS',
                status: 'Preliminary Notification Released (Section 11(1))',
                statusColor: const Color(0xFF0288D1),
                icon: Icons.assignment_turned_in_rounded,
                subtitle: 'Published in Gazette on 25 September 2026 under RFCTLARR Act 2013',
              ),
              const SizedBox(height: 10),
              _buildFullWidthStatusCard(
                title: 'OBJECTION STATUS',
                status: latestObjection != null ? latestObjection.status.label : 'Not Submitted',
                statusColor: latestObjection != null ? latestObjection.status.color : const Color(0xFF64748B),
                icon: latestObjection != null ? latestObjection.status.icon : Icons.edit_note_rounded,
                subtitle: latestObjection != null
                    ? 'Objection Ref: ${latestObjection.objectionId} • ${latestObjection.categories.join(", ")}'
                    : 'No objection submitted yet. 60-day objection period active.',
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  void _showTimelineDetailsModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return Container(
          height: MediaQuery.of(context).size.height * 0.85,
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
          ),
          child: Column(
            children: [
              // Top Header Bar
              Container(
                padding: const EdgeInsets.fromLTRB(20, 16, 16, 12),
                decoration: const BoxDecoration(
                  color: Color(0xFF00695C),
                  borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.timeline_rounded, color: Colors.white, size: 22),
                    ),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Acquisition Stage Timeline',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            'Official 8-Stage Legal & Revenue Acquisition Workflow',
                            style: TextStyle(
                              fontSize: 11,
                              color: Color(0xFFE0F2F1),
                            ),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: Colors.white),
                      onPressed: () => Navigator.pop(ctx),
                    ),
                  ],
                ),
              ),

              // Full 8-Stage Timeline List
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildTimelineItem(
                        stageNum: '1',
                        title: 'Project Proposal & Approval',
                        date: '15 May 2026',
                        statusText: 'Approved ✓',
                        isDone: true,
                        description: 'Public purpose infrastructure corridor sanctioned.',
                      ),
                      _buildTimelineItem(
                        stageNum: '2',
                        title: 'Social Impact Assessment (SIA)',
                        date: '10 August 2026',
                        statusText: 'SIA Completed ✓',
                        isDone: true,
                        description: 'SIMP report approved & public hearings concluded.',
                      ),
                      _buildTimelineItem(
                        stageNum: '3',
                        title: 'Preliminary Notification Released',
                        date: '25 September 2026',
                        statusText: 'Gazette Released ✓',
                        isDone: true,
                        description: 'Published under Section 11(1) of RFCTLARR Act 2013.',
                      ),
                      _buildTimelineItem(
                        stageNum: '4',
                        title: '60-Day Objection Period',
                        date: '25 Sep – 24 Nov 2026',
                        statusText: 'ACTIVE NOW ●',
                        isCurrent: true,
                        description: 'Landowners can raise objections regarding land area or ownership.',
                      ),
                      _buildTimelineItem(
                        stageNum: '5',
                        title: 'Objection Hearing & Decision',
                        date: 'Expected Dec 2026',
                        statusText: 'Pending ○',
                        description: 'Collector office conducts hearings & issues orders.',
                      ),
                      _buildTimelineItem(
                        stageNum: '6',
                        title: 'Land Valuation & Compensation',
                        date: 'Expected Jan 2027',
                        statusText: 'Pending ○',
                        description: 'Market value determined & solatium grant added.',
                      ),
                      _buildTimelineItem(
                        stageNum: '7',
                        title: 'Award Declaration & Payment',
                        date: 'Expected Feb 2027',
                        statusText: 'Pending ○',
                        description: 'Final award declared & payment disbursed to bank account.',
                      ),
                      _buildTimelineItem(
                        stageNum: '8',
                        title: 'Revenue Mutation',
                        date: 'Expected Mar 2027',
                        statusText: 'Pending ○',
                        isLast: true,
                        description: 'Ownership update completed in 7/12 land records.',
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        height: 44,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF00695C),
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                          onPressed: () => Navigator.pop(ctx),
                          child: const Text('CLOSE TIMELINE DETAILS', style: TextStyle(fontWeight: FontWeight.bold)),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
  }

  Widget _buildFullWidthStatusCard({
    required String title,
    required String status,
    required Color statusColor,
    required IconData icon,
    required String subtitle,
  }) {
    return SizedBox(
      width: double.infinity,
      child: Card(
        elevation: 1,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF64748B), letterSpacing: 0.8)),
              const SizedBox(height: 8),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(icon, color: statusColor, size: 22),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          status,
                          softWrap: true,
                          style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: statusColor),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          subtitle,
                          softWrap: true,
                          style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDataRow(String label, String value, {bool isHighlight = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                flex: 4,
                child: Text(
                  label,
                  softWrap: true,
                  style: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                flex: 5,
                child: Text(
                  value,
                  softWrap: true,
                  textAlign: TextAlign.right,
                  style: TextStyle(
                    fontWeight: isHighlight ? FontWeight.w800 : FontWeight.w600,
                    color: isHighlight ? const Color(0xFFC62828) : const Color(0xFF0F172A),
                    fontSize: 13,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Divider(height: 1, color: Colors.grey.shade200),
        ],
      ),
    );
  }

  Widget _buildTimelineItem({
    required String stageNum,
    required String title,
    required String date,
    required String statusText,
    required String description,
    bool isDone = false,
    bool isCurrent = false,
    bool isLast = false,
  }) {
    Color color = isDone
        ? const Color(0xFF2E7D32)
        : (isCurrent ? const Color(0xFFE65100) : const Color(0xFF94A3B8));

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Container(
              width: 26,
              height: 26,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: color,
              ),
              child: Center(
                child: isDone
                    ? const Icon(Icons.check, size: 14, color: Colors.white)
                    : Text(
                        stageNum,
                        style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                      ),
              ),
            ),
            if (!isLast)
              Container(
                width: 2,
                height: 36,
                color: isDone ? const Color(0xFF2E7D32) : Colors.grey.shade300,
              ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        softWrap: true,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: isCurrent || isDone ? FontWeight.bold : FontWeight.w600,
                          color: isCurrent ? const Color(0xFFE65100) : const Color(0xFF0F172A),
                        ),
                      ),
                    ),
                    const SizedBox(width: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: color.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        statusText,
                        style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 10),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 2),
                Text(
                  '$date • $description',
                  softWrap: true,
                  style: TextStyle(color: Colors.grey.shade600, fontSize: 11),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

// ============================================================================
// 4B. PROJECT OVERVIEW CARD WIDGET
// ============================================================================

class ProjectCardWidget extends StatefulWidget {
  final LandParcelDetails parcel;

  const ProjectCardWidget({super.key, required this.parcel});

  @override
  State<ProjectCardWidget> createState() => _ProjectCardWidgetState();
}

class _ProjectCardWidgetState extends State<ProjectCardWidget> {
  bool _isExpanded = false;

  final String _projectDescription =
      'The SWADESH Highway & Freight Corridor Expansion (NH-48) is a flagship national infrastructure initiative designed to upgrade the existing 4-lane corridor into a modern 10-lane access-controlled expressway with dedicated multi-modal freight channels, solar smart lighting, eco-wildlife passages, and automated toll systems across Maharashtra.';

  void _showProjectDetailsModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return Container(
          height: MediaQuery.of(context).size.height * 0.85,
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
          ),
          child: Column(
            children: [
              // Modal Handle & Top Bar
              Container(
                padding: const EdgeInsets.fromLTRB(20, 16, 16, 12),
                decoration: const BoxDecoration(
                  color: Color(0xFF00695C),
                  borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.business_center_rounded, color: Colors.white, size: 22),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.parcel.projectName,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                          Text(
                            'Project Ref: ${widget.parcel.projectId}',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.teal.shade100,
                            ),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: Colors.white),
                      onPressed: () => Navigator.pop(ctx),
                    ),
                  ],
                ),
              ),

              // Modal Scrollable Content
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Banner Image inside modal
                      Container(
                        width: double.infinity,
                        height: 160,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          gradient: const LinearGradient(
                            colors: [Color(0xFF004D40), Color(0xFF00695C), Color(0xFF0288D1)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                        ),
                        child: Stack(
                          children: [
                            Positioned.fill(
                              child: CustomPaint(
                                painter: _GridPainter(),
                              ),
                            ),
                            Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  const Icon(Icons.alt_route_rounded, size: 48, color: Colors.white),
                                  const SizedBox(height: 8),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: Colors.white.withValues(alpha: 0.25),
                                      borderRadius: BorderRadius.circular(20),
                                    ),
                                    child: const Text(
                                      'NATIONAL HIGHWAY EXPANSION CORRIDOR',
                                      style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 0.8),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Section 1: Overview & Purpose
                      _buildModalSectionTitle('PROJECT OVERVIEW & PUBLIC PURPOSE', Icons.info_outline_rounded),
                      const SizedBox(height: 8),
                      Text(
                        _projectDescription,
                        style: TextStyle(fontSize: 13, color: Colors.grey.shade800, height: 1.5),
                      ),
                      const SizedBox(height: 16),

                      // Section 2: Statutory Details
                      _buildModalSectionTitle('STATUTORY & GAZETTE DETAILS', Icons.gavel_rounded),
                      const SizedBox(height: 10),
                      _buildModalDetailRow('Proposing Authority:', widget.parcel.proposingAuthority),
                      _buildModalDetailRow('Public Purpose Act:', 'RFCTLARR Act 2013 (Section 11(1))'),
                      _buildModalDetailRow('Gazette Notification Ref:', 'MH-GAZ-2026-9921'),
                      _buildModalDetailRow('Gazette Release Date:', '25 September 2026'),
                      _buildModalDetailRow('Acquisition Phase:', 'Stage 4: 60-Day Public Objection Window'),
                      const SizedBox(height: 16),

                      // Section 3: Scope & Statistics
                      _buildModalSectionTitle('CORRIDOR METRICS & SCOPE', Icons.analytics_rounded),
                      const SizedBox(height: 10),
                      _buildModalDetailRow('Total Corridor Length:', '124.5 Km (Pune - Satara Highway)'),
                      _buildModalDetailRow('Right of Way (ROW) Width:', '60 Meters (Access-Controlled)'),
                      _buildModalDetailRow('Affected Talukas:', 'Haveli, Bhor, Khandala, Satara'),
                      _buildModalDetailRow('Affected Villages:', '42 Gram Panchayats'),
                      _buildModalDetailRow('Total Land to be Acquired:', '345.80 Hectares'),
                      _buildModalDetailRow('SIA Approval Status:', 'Approved by State Level Empowered Committee'),
                      const SizedBox(height: 16),

                      // Section 4: Key Authorities & Nodal Contact
                      _buildModalSectionTitle('NODAL AUTHORITIES & HELPLINE', Icons.support_agent_rounded),
                      const SizedBox(height: 10),
                      _buildModalDetailRow('Nodal Officer:', 'Shri A. K. Deshmukh (IAS), SLAO Pune Division'),
                      _buildModalDetailRow('Competent Authority:', 'District Collector Office, Pune'),
                      _buildModalDetailRow('Helpline Phone:', '1800-233-4567 (Toll Free)'),
                      _buildModalDetailRow('Helpdesk Email:', 'slao-pune@swadesh.gov.in'),
                      const SizedBox(height: 24),

                      // Close Action
                      SizedBox(
                        width: double.infinity,
                        height: 46,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF00695C),
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          onPressed: () => Navigator.pop(ctx),
                          child: const Text('CLOSE PROJECT DETAILS', style: TextStyle(fontWeight: FontWeight.bold)),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildModalSectionTitle(String title, IconData icon) {
    return Row(
      children: [
        Icon(icon, size: 18, color: const Color(0xFF00695C)),
        const SizedBox(width: 8),
        Text(
          title,
          style: const TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.bold,
            color: Color(0xFF00695C),
            letterSpacing: 0.5,
          ),
        ),
      ],
    );
  }

  Widget _buildModalDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 4,
            child: Text(
              label,
              style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            flex: 5,
            child: Text(
              value,
              textAlign: TextAlign.right,
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Project Image Display Area
          Stack(
            children: [
              SizedBox(
                width: double.infinity,
                height: 160,
                child: ClipRRect(
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                  child: Image.network(
                    'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800&auto=format&fit=crop',
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        decoration: const BoxDecoration(
                          gradient: LinearGradient(
                            colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                        ),
                        child: const Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.add_road_rounded, size: 44, color: Colors.orange),
                              SizedBox(height: 6),
                              Text(
                                'NH-48 Corridor Construction Site Photo',
                                style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ),
              Positioned(
                bottom: 8,
                left: 10,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.black.withValues(alpha: 0.65),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.photo_camera_rounded, color: Colors.amber, size: 14),
                      SizedBox(width: 6),
                      Text(
                        'Site Survey Photo • Survey No. 124/2',
                        style: TextStyle(color: Colors.white, fontSize: 10.5, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),

          // Content Area
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Project Name Header
                Text(
                  widget.parcel.projectName,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF0F172A),
                  ),
                ),
                const SizedBox(height: 4),

                // Proposing Authority Tag
                Row(
                  children: [
                    const Icon(Icons.account_balance_outlined, size: 16, color: Color(0xFF64748B)),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Text(
                        widget.parcel.proposingAuthority,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF64748B),
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),

                // 2-Line Description with Read More / Read Less Toggle
                Text(
                  _projectDescription,
                  maxLines: _isExpanded ? null : 2,
                  overflow: _isExpanded ? TextOverflow.visible : TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 13,
                    height: 1.4,
                    color: Colors.grey.shade800,
                  ),
                ),
                const SizedBox(height: 4),

                // Read More / Read Less Toggle Link
                InkWell(
                  onTap: () {
                    setState(() {
                      _isExpanded = !_isExpanded;
                    });
                  },
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          _isExpanded ? 'Read Less' : 'Read More',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF00695C),
                          ),
                        ),
                        Icon(
                          _isExpanded ? Icons.keyboard_arrow_up_rounded : Icons.keyboard_arrow_down_rounded,
                          size: 16,
                          color: const Color(0xFF00695C),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 14),

                // View Details Button
                SizedBox(
                  width: double.infinity,
                  height: 42,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF00695C),
                      foregroundColor: Colors.white,
                      elevation: 0,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    onPressed: () => _showProjectDetailsModal(context),
                    icon: const Icon(Icons.info_outline_rounded, size: 18),
                    label: const Text(
                      'VIEW DETAILS',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, letterSpacing: 0.5),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// Background painter for the Project Image Banner area
class _GridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withValues(alpha: 0.06)
      ..strokeWidth = 1.0;

    const spacing = 20.0;
    for (double x = 0; x < size.width; x += spacing) {
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), paint);
    }
    for (double y = 0; y < size.height; y += spacing) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// ============================================================================
// 5. TAB 1: MY LAND & INTERACTIVE GIS MAP
// ============================================================================

class MyLandMapView extends StatefulWidget {
  final LandParcelDetails parcel;

  const MyLandMapView({super.key, required this.parcel});

  @override
  State<MyLandMapView> createState() => _MyLandMapViewState();
}

class _MyLandMapViewState extends State<MyLandMapView> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final MapController _mapController = MapController();

  // Map Filter state: 'my_land' (My Land) vs 'all_parcels' (All Parcels)
  String _mapViewFilter = 'my_land';

  // Selected Parcel ID for 'sab zameen ka' view
  String _selectedParcelId = '124/2';

  // Details card expand/collapse toggle
  bool _isCardExpanded = true;

  // Polygon coordinates for parcel 124/2 (My Land Parcel)
  final List<LatLng> _parcelPolygon = const [
    LatLng(18.5204, 73.8567),
    LatLng(18.5218, 73.8590),
    LatLng(18.5235, 73.8582),
    LatLng(18.5220, 73.8552),
  ];

  // Adjacent Corridor Parcels for 'sab zameen ka' view
  final List<LatLng> _parcelPolygon1241 = const [
    LatLng(18.5235, 73.8582),
    LatLng(18.5250, 73.8605),
    LatLng(18.5262, 73.8595),
    LatLng(18.5248, 73.8572),
  ];

  final List<LatLng> _parcelPolygon1253 = const [
    LatLng(18.5190, 73.8545),
    LatLng(18.5204, 73.8567),
    LatLng(18.5220, 73.8552),
    LatLng(18.5205, 73.8530),
  ];

  final List<LatLng> _parcelPolygon126A = const [
    LatLng(18.5262, 73.8595),
    LatLng(18.5278, 73.8622),
    LatLng(18.5288, 73.8610),
    LatLng(18.5270, 73.8585),
  ];

  final List<LatLng> _corridorBoundary = const [
    LatLng(18.5180, 73.8520),
    LatLng(18.5250, 73.8620),
    LatLng(18.5290, 73.8630),
    LatLng(18.5170, 73.8500),
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Map<String, String> _getParcelDetails(String parcelId) {
    if (parcelId == '124/1') {
      return {
        'LAT': '18.5245° N',
        'LONG': '73.8598° E',
        'ADDRESS DETAILS': 'House No. 18, Waghala Village, Taluka Haveli, District Pune, Maharashtra - 411048',
        'SURVEY NO': 'Survey No. 124/1',
        'GAT NUMBER': 'Gat No. 480 (Khata No. 480)',
        'OWNER NAME': 'Suresh M. Patil (Sole Owner)',
        'TOTAL AREA': '1.80 Hectares (1.80 Ha Acquired • 0.00 Ha Remaining)',
      };
    } else if (parcelId == '125/3') {
      return {
        'LAT': '18.5198° N',
        'LONG': '73.8542° E',
        'ADDRESS DETAILS': 'Gat No. 485, Waghala Village, Taluka Haveli, District Pune, Maharashtra - 411048',
        'SURVEY NO': 'Survey No. 125/3',
        'GAT NUMBER': 'Gat No. 485 (Khata No. 485)',
        'OWNER NAME': 'Vikram R. Deshmukh & Joint Owners',
        'TOTAL AREA': '3.10 Hectares (2.00 Ha Acquired • 1.10 Ha Remaining)',
      };
    } else if (parcelId == '126/A') {
      return {
        'LAT': '18.5265° N',
        'LONG': '73.8612° E',
        'ADDRESS DETAILS': 'Main Road, Waghala Village, Taluka Haveli, District Pune, Maharashtra - 411048',
        'SURVEY NO': 'Survey No. 126/A',
        'GAT NUMBER': 'Gat No. 490 (Khata No. 490)',
        'OWNER NAME': 'Smt. Meena Kulkarni',
        'TOTAL AREA': '1.50 Hectares (1.50 Ha Acquired • 0.00 Ha Remaining)',
      };
    } else {
      // Default: 124/2 (khudke zameen ka / My Land)
      return {
        'LAT': '18.5218° N',
        'LONG': '73.8575° E',
        'ADDRESS DETAILS': 'House No. 42, Waghala Village, Taluka Haveli, District Pune, Maharashtra - 411048',
        'SURVEY NO': 'Survey No. ${widget.parcel.surveyNumber}',
        'GAT NUMBER': 'Gat No. 481 (Khata No. 481)',
        'OWNER NAME': 'Rajesh Patil (Sole Title Holder)',
        'TOTAL AREA': '${widget.parcel.totalAreaHa} Hectares (${widget.parcel.areaRequiredHa} Ha Acquired • ${widget.parcel.areaRemainingHa} Ha Remaining)',
      };
    }
  }

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final double hp = screenWidth < 360 ? 8.0 : (screenWidth < 600 ? 10.0 : 16.0);

    final activeDetailsId = (_mapViewFilter == 'my_land' || _mapViewFilter == 'khudke zameen ka') ? '124/2' : _selectedParcelId;
    final details = _getParcelDetails(activeDetailsId);

    return Column(
      children: [
        Container(
          color: Colors.white,
          child: TabBar(
            controller: _tabController,
            labelColor: const Color(0xFF00695C),
            unselectedLabelColor: const Color(0xFF64748B),
            indicatorColor: const Color(0xFF00695C),
            indicatorWeight: 3,
            tabs: const [
              Tab(icon: Icon(Icons.list_alt_rounded), text: 'Land Details'),
              Tab(icon: Icon(Icons.map_rounded), text: 'Parcel GIS Map'),
            ],
          ),
        ),
        Expanded(
          child: TabBarView(
            controller: _tabController,
            children: [
              // 1. Detailed Land Specs (Unboxed on App Base Screen)
              SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: hp, vertical: 12),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 600),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'OFFICIAL LAND RECORD',
                              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF00695C), letterSpacing: 0.5),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: Colors.teal.shade50,
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(color: Colors.teal.shade200),
                              ),
                              child: Text(
                                'Survey ${widget.parcel.surveyNumber}',
                                style: const TextStyle(color: Color(0xFF00695C), fontWeight: FontWeight.bold, fontSize: 12),
                              ),
                            ),
                          ],
                        ),
                        const Divider(height: 20),
                        _buildGridDetail('Project Name', widget.parcel.projectName),
                        _buildGridDetail('Project ID', widget.parcel.projectId),
                        _buildGridDetail('Survey Number', widget.parcel.surveyNumber),
                        _buildGridDetail('Sub-Division', widget.parcel.subDivision),
                        _buildGridDetail('Parcel ID', widget.parcel.parcelId),
                        _buildGridDetail('Village', widget.parcel.village),
                        _buildGridDetail('Taluka', widget.parcel.taluka),
                        _buildGridDetail('District', widget.parcel.district),
                        _buildGridDetail('Gram Panchayat', widget.parcel.gramPanchayat),
                        const Divider(height: 20),
                        _buildGridDetail('Total Land Area', '${widget.parcel.totalAreaHa} Hectares'),
                        _buildGridDetail('Area Required for Acquisition', '${widget.parcel.areaRequiredHa} Hectares', isHighlight: true),
                        _buildGridDetail('Remaining Unacquired Area', '${widget.parcel.areaRemainingHa} Hectares'),
                        _buildGridDetail('Land Use Category', widget.parcel.landUse),
                        _buildGridDetail('Ownership Status', widget.parcel.ownershipStatus),
                        const SizedBox(height: 24),

                        // OWNERSHIP DETAILS & DOCUMENTS SECTION
                        const Row(
                          children: [
                            Icon(Icons.folder_shared_rounded, color: Color(0xFF00695C), size: 20),
                            SizedBox(width: 8),
                            Text(
                              'OWNERSHIP DETAILS',
                              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF00695C), letterSpacing: 0.5),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Official land title & revenue ownership records issued by e-Mahabhulekh',
                          style: TextStyle(fontSize: 11, color: Colors.grey.shade600),
                        ),
                        const SizedBox(height: 12),
                        _buildDocumentTile(
                          context: context,
                          docName: 'Form 7',
                          subtitle: '7/12 Extract - Occupant Rights & Village Land Form 7',
                          fileInfo: 'e-Signed PDF • 1.4 MB • Issued 12 Sep 2026',
                          icon: Icons.article_rounded,
                          color: const Color(0xFF00695C),
                        ),
                        _buildDocumentTile(
                          context: context,
                          docName: 'Form 12',
                          subtitle: '7/12 Extract - Agricultural Crop & Land Form 12 Register',
                          fileInfo: 'e-Signed PDF • 1.1 MB • Issued 12 Sep 2026',
                          icon: Icons.grass_rounded,
                          color: const Color(0xFF2E7D32),
                        ),
                        _buildDocumentTile(
                          context: context,
                          docName: 'PROPERTY CARD',
                          subtitle: 'Urban Land Title Register & City Survey Record Sheet',
                          fileInfo: 'Certified PDF • 850 KB • Ref: CTS-4821',
                          icon: Icons.badge_rounded,
                          color: const Color(0xFF0288D1),
                        ),
                        _buildDocumentTile(
                          context: context,
                          docName: 'Form 8A',
                          subtitle: 'Landowner Revenue Khata Holding & Assessment Form 8A',
                          fileInfo: 'Certified PDF • 920 KB • Khata No. 481',
                          icon: Icons.account_balance_wallet_rounded,
                          color: const Color(0xFF7C3AED),
                        ),
                        const SizedBox(height: 24),

                        // REGISTRATION DETAILS SECTION
                        const Row(
                          children: [
                            Icon(Icons.assignment_turned_in_rounded, color: Color(0xFF00695C), size: 20),
                            SizedBox(width: 8),
                            Text(
                              'REGISTRATION DETAILS',
                              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF00695C), letterSpacing: 0.5),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Registered conveyance deeds & mutation entry records from Sub-Registrar',
                          style: TextStyle(fontSize: 11, color: Colors.grey.shade600),
                        ),
                        const SizedBox(height: 12),
                        _buildDocumentTile(
                          context: context,
                          docName: 'Index II',
                          subtitle: 'Sub-Registrar Registered Title Deed & Sale Extract',
                          fileInfo: 'Sub-Registrar Copy • 2.8 MB • Ref: SR-PUNE-2021-8842',
                          icon: Icons.history_edu_rounded,
                          color: const Color(0xFFE65100),
                        ),
                        _buildDocumentTile(
                          context: context,
                          docName: 'K-Prat',
                          subtitle: 'Form 6 Ferfar Mutation Entry Copy & Revenue Register',
                          fileInfo: 'Certified Copy • 1.6 MB • Mutation No. 10492',
                          icon: Icons.verified_outlined,
                          color: const Color(0xFF0D9488),
                        ),
                        const SizedBox(height: 24),

                        // VERIFICATION STATUS, DATE TIME AND BY SECTION
                        const Row(
                          children: [
                            Icon(Icons.verified_user_rounded, color: Color(0xFF00695C), size: 20),
                            SizedBox(width: 8),
                            Text(
                              'VERIFICATION STATUS',
                              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF00695C), letterSpacing: 0.5),
                            ),
                          ],
                        ),
                        const Divider(height: 20),
                        _buildGridDetail('VERIFICATION STATUS', 'Verified & Title Confirmed ✓', isHighlight: false),
                        _buildGridDetail('VERIFICATION DATE & TIME', '18 September 2026, 11:45 AM'),
                        _buildGridDetail('VERIFIED BY', 'Shri R. K. Patil (Circle Officer & DILR, Haveli Division)'),
                        const SizedBox(height: 20),

                        SizedBox(
                          width: double.infinity,
                          height: 48,
                          child: ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF00695C),
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              elevation: 2,
                            ),
                            onPressed: () {
                              _tabController.animateTo(1);
                            },
                            icon: const Icon(Icons.map_rounded),
                            label: const Text('VIEW PARCEL ON GIS MAP', style: TextStyle(fontWeight: FontWeight.bold)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),

              // 2. Interactive GIS Parcel Map with khudke zameen ka / sab zameen ka View Selector
              Stack(
                children: [
                  FlutterMap(
                    mapController: _mapController,
                    options: const MapOptions(
                      initialCenter: LatLng(18.5218, 73.8575),
                      initialZoom: 15.5,
                    ),
                    children: [
                      TileLayer(
                        urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                        userAgentPackageName: 'com.swadesh.landowner',
                      ),
                      PolygonLayer(
                        polygons: [
                          Polygon(
                            points: _corridorBoundary,
                            color: Colors.blue.withValues(alpha: 0.1),
                            borderColor: Colors.blue,
                            borderStrokeWidth: 1,
                          ),
                          // Highlighted My Land Parcel (124/2)
                          Polygon(
                            points: _parcelPolygon,
                            color: const Color(0xFF00897B).withValues(alpha: 0.4),
                            borderColor: const Color(0xFF004D40),
                            borderStrokeWidth: activeDetailsId == '124/2' ? 3.5 : 2.0,
                          ),
                          if (_mapViewFilter == 'all_parcels' || _mapViewFilter == 'sab zameen ka') ...[
                            Polygon(
                              points: _parcelPolygon1241,
                              color: Colors.amber.withValues(alpha: 0.35),
                              borderColor: Colors.amber.shade900,
                              borderStrokeWidth: activeDetailsId == '124/1' ? 3.5 : 1.5,
                            ),
                            Polygon(
                              points: _parcelPolygon1253,
                              color: Colors.purple.withValues(alpha: 0.35),
                              borderColor: Colors.purple.shade900,
                              borderStrokeWidth: activeDetailsId == '125/3' ? 3.5 : 1.5,
                            ),
                            Polygon(
                              points: _parcelPolygon126A,
                              color: Colors.indigo.withValues(alpha: 0.35),
                              borderColor: Colors.indigo.shade900,
                              borderStrokeWidth: activeDetailsId == '126/A' ? 3.5 : 1.5,
                            ),
                          ],
                        ],
                      ),
                      MarkerLayer(
                        markers: [
                          Marker(
                            point: const LatLng(18.5218, 73.8575),
                            width: 90,
                            height: 70,
                            child: GestureDetector(
                              onTap: () {
                                setState(() {
                                  _selectedParcelId = '124/2';
                                });
                              },
                              child: Column(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFF00695C),
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: const Text(
                                      '124/2 (My Land)',
                                      style: TextStyle(color: Colors.white, fontSize: 9.5, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                  const Icon(Icons.location_on, color: Color(0xFFC62828), size: 32),
                                ],
                              ),
                            ),
                          ),
                          if (_mapViewFilter == 'all_parcels' || _mapViewFilter == 'sab zameen ka') ...[
                            Marker(
                              point: const LatLng(18.5245, 73.8598),
                              width: 80,
                              height: 65,
                              child: GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _selectedParcelId = '124/1';
                                  });
                                },
                                child: Column(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                                      decoration: BoxDecoration(
                                        color: Colors.amber.shade900,
                                        borderRadius: BorderRadius.circular(4),
                                      ),
                                      child: const Text(
                                        '124/1',
                                        style: TextStyle(color: Colors.white, fontSize: 9.5, fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    const Icon(Icons.location_on, color: Colors.amber, size: 28),
                                  ],
                                ),
                              ),
                            ),
                            Marker(
                              point: const LatLng(18.5198, 73.8542),
                              width: 80,
                              height: 65,
                              child: GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _selectedParcelId = '125/3';
                                  });
                                },
                                child: Column(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                                      decoration: BoxDecoration(
                                        color: Colors.purple.shade900,
                                        borderRadius: BorderRadius.circular(4),
                                      ),
                                      child: const Text(
                                        '125/3',
                                        style: TextStyle(color: Colors.white, fontSize: 9.5, fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    const Icon(Icons.location_on, color: Colors.purple, size: 28),
                                  ],
                                ),
                              ),
                            ),
                            Marker(
                              point: const LatLng(18.5265, 73.8612),
                              width: 80,
                              height: 65,
                              child: GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _selectedParcelId = '126/A';
                                  });
                                },
                                child: Column(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                                      decoration: BoxDecoration(
                                        color: Colors.indigo.shade900,
                                        borderRadius: BorderRadius.circular(4),
                                      ),
                                      child: const Text(
                                        '126/A',
                                        style: TextStyle(color: Colors.white, fontSize: 9.5, fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    const Icon(Icons.location_on, color: Colors.indigo, size: 28),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                    ],
                  ),

                  // Floating Map View Selector Pill Bar (khudke zameen ka / sab zameen ka)
                  Positioned(
                    top: 12,
                    left: hp,
                    right: hp,
                    child: Center(
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(30),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.18),
                              blurRadius: 10,
                              offset: const Offset(0, 3),
                            ),
                          ],
                          border: Border.all(color: const Color(0xFFCBD5E1)),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            _buildMapFilterChip(
                              label: 'My Land',
                              subLabel: 'Parcel 124/2',
                              icon: Icons.person_pin_circle_rounded,
                              isSelected: _mapViewFilter == 'my_land',
                              onTap: () {
                                setState(() {
                                  _mapViewFilter = 'my_land';
                                  _selectedParcelId = '124/2';
                                });
                                _mapController.move(const LatLng(18.5218, 73.8575), 16.0);
                              },
                            ),
                            const SizedBox(width: 4),
                            _buildMapFilterChip(
                              label: 'All Parcels',
                              subLabel: 'Corridor Area',
                              icon: Icons.map_rounded,
                              isSelected: _mapViewFilter == 'all_parcels',
                              onTap: () {
                                setState(() {
                                  _mapViewFilter = 'all_parcels';
                                });
                                _mapController.move(const LatLng(18.5230, 73.8565), 14.5);
                              },
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),

                  // GIS Map Overlay Card containing explicit LAT, LONG, ADDRESS DETAILS, SURVEY NO, GAT NUMBER, OWNER NAME, and TOTAL AREA
                  Positioned(
                    bottom: 10,
                    left: hp,
                    right: hp,
                    child: Center(
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 600),
                        child: SizedBox(
                          width: double.infinity,
                          child: Card(
                            elevation: 8,
                            shadowColor: Colors.black38,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                            child: Padding(
                              padding: const EdgeInsets.all(12),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.all(6),
                                        decoration: BoxDecoration(
                                          color: const Color(0xFF00695C).withValues(alpha: 0.1),
                                          shape: BoxShape.circle,
                                        ),
                                        child: const Icon(Icons.place_rounded, color: Color(0xFF00695C), size: 18),
                                      ),
                                      const SizedBox(width: 8),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              (_mapViewFilter == 'my_land' || _mapViewFilter == 'khudke zameen ka')
                                                  ? 'MY LAND PARCEL (124/2)'
                                                  : 'ALL CORRIDOR PARCELS',
                                              style: const TextStyle(
                                                fontSize: 10.5,
                                                fontWeight: FontWeight.bold,
                                                color: Color(0xFF00695C),
                                                letterSpacing: 0.5,
                                              ),
                                            ),
                                            Text(
                                              details['SURVEY NO']!,
                                              style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                                            ),
                                          ],
                                        ),
                                      ),
                                      IconButton(
                                        icon: Icon(
                                          _isCardExpanded ? Icons.keyboard_arrow_down_rounded : Icons.keyboard_arrow_up_rounded,
                                          color: const Color(0xFF64748B),
                                        ),
                                        onPressed: () {
                                          setState(() {
                                            _isCardExpanded = !_isCardExpanded;
                                          });
                                        },
                                        tooltip: _isCardExpanded ? 'Hide Details' : 'Show Details',
                                      ),
                                    ],
                                  ),

                                  if (_mapViewFilter == 'all_parcels' || _mapViewFilter == 'sab zameen ka') ...[
                                    const SizedBox(height: 6),
                                    SingleChildScrollView(
                                      scrollDirection: Axis.horizontal,
                                      child: Row(
                                        children: [
                                          _buildParcelSelectorPill('124/2', 'My Land', const Color(0xFF00695C)),
                                          const SizedBox(width: 6),
                                          _buildParcelSelectorPill('124/1', 'Suresh P.', Colors.amber.shade900),
                                          const SizedBox(width: 6),
                                          _buildParcelSelectorPill('125/3', 'Vikram D.', Colors.purple.shade900),
                                          const SizedBox(width: 6),
                                          _buildParcelSelectorPill('126/A', 'Meena K.', Colors.indigo.shade900),
                                        ],
                                      ),
                                    ),
                                  ],

                                  if (_isCardExpanded) ...[
                                    const Divider(height: 14),
                                    Container(
                                      constraints: const BoxConstraints(maxHeight: 220),
                                      child: SingleChildScrollView(
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            _buildMapDetailRow('LAT', details['LAT']!, icon: Icons.navigation_rounded),
                                            _buildMapDetailRow('LONG', details['LONG']!, icon: Icons.explore_rounded),
                                            _buildMapDetailRow('ADDRESS DETAILS', details['ADDRESS DETAILS']!, icon: Icons.home_work_rounded),
                                            _buildMapDetailRow('SURVEY NO', details['SURVEY NO']!, icon: Icons.map_outlined),
                                            _buildMapDetailRow('GAT NUMBER', details['GAT NUMBER']!, icon: Icons.numbers_rounded),
                                            _buildMapDetailRow('OWNER NAME', details['OWNER NAME']!, icon: Icons.person_rounded),
                                            _buildMapDetailRow('TOTAL AREA', details['TOTAL AREA']!, icon: Icons.aspect_ratio_rounded, valueColor: const Color(0xFFC62828)),
                                          ],
                                        ),
                                      ),
                                    ),
                                    const SizedBox(height: 10),
                                    SizedBox(
                                      width: double.infinity,
                                      height: 38,
                                      child: ElevatedButton.icon(
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor: const Color(0xFF00695C),
                                          foregroundColor: Colors.white,
                                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                        ),
                                        onPressed: () {
                                          _tabController.animateTo(0);
                                        },
                                        icon: const Icon(Icons.list_alt_rounded, size: 16),
                                        label: const Text('VIEW FULL LAND DETAILS', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                                      ),
                                    ),
                                  ],
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMapFilterChip({
    required String label,
    required String subLabel,
    required IconData icon,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(24),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF00695C) : Colors.transparent,
          borderRadius: BorderRadius.circular(24),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 16,
              color: isSelected ? Colors.white : const Color(0xFF64748B),
            ),
            const SizedBox(width: 6),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  label,
                  style: TextStyle(
                    fontSize: 11.5,
                    fontWeight: FontWeight.bold,
                    color: isSelected ? Colors.white : const Color(0xFF334155),
                  ),
                ),
                Text(
                  subLabel,
                  style: TextStyle(
                    fontSize: 9,
                    color: isSelected ? Colors.teal.shade100 : const Color(0xFF64748B),
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildParcelSelectorPill(String id, String label, Color color) {
    final bool isSelected = _selectedParcelId == id;
    return InkWell(
      onTap: () {
        setState(() {
          _selectedParcelId = id;
        });
        if (id == '124/2') {
          _mapController.move(const LatLng(18.5218, 73.8575), 16.0);
        } else if (id == '124/1') {
          _mapController.move(const LatLng(18.5245, 73.8598), 16.0);
        } else if (id == '125/3') {
          _mapController.move(const LatLng(18.5198, 73.8542), 16.0);
        } else if (id == '126/A') {
          _mapController.move(const LatLng(18.5265, 73.8612), 16.0);
        }
      },
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: isSelected ? color : color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color, width: isSelected ? 1.5 : 1.0),
        ),
        child: Text(
          '$id ($label)',
          style: TextStyle(
            fontSize: 10.5,
            fontWeight: FontWeight.bold,
            color: isSelected ? Colors.white : color,
          ),
        ),
      ),
    );
  }

  Widget _buildMapDetailRow(String label, String value, {IconData? icon, Color? valueColor}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 13, color: const Color(0xFF00695C)),
            const SizedBox(width: 6),
          ],
          SizedBox(
            width: 115,
            child: Text(
              label,
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.bold,
                color: Color(0xFF475569),
                letterSpacing: 0.3,
              ),
            ),
          ),
          const Text(': ', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF475569))),
          Expanded(
            child: Text(
              value,
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                color: valueColor ?? const Color(0xFF0F172A),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDocumentTile({
    required BuildContext context,
    required String docName,
    required String subtitle,
    required String fileInfo,
    required IconData icon,
    required Color color,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade300),
        boxShadow: const [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 3,
            offset: Offset(0, 1),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: color, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  docName,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF0F172A)),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: TextStyle(fontSize: 11, color: Colors.grey.shade600),
                ),
                const SizedBox(height: 3),
                Text(
                  fileInfo,
                  style: const TextStyle(fontSize: 10, color: Color(0xFF0288D1), fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ),
          OutlinedButton.icon(
            style: OutlinedButton.styleFrom(
              foregroundColor: const Color(0xFF00695C),
              side: const BorderSide(color: Color(0xFF00695C)),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            ),
            onPressed: () {
              _showDocumentViewer(context, docName, subtitle);
            },
            icon: const Icon(Icons.visibility_outlined, size: 14),
            label: const Text('View', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
          ),
        ],
      ),
    );
  }

  void _showDocumentViewer(BuildContext context, String docName, String subtitle) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return Container(
          height: MediaQuery.of(context).size.height * 0.75,
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.fromLTRB(20, 16, 16, 12),
                decoration: const BoxDecoration(
                  color: Color(0xFF00695C),
                  borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.description_rounded, color: Colors.white, size: 22),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            docName,
                            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                            overflow: TextOverflow.ellipsis,
                          ),
                          Text(
                            subtitle,
                            style: TextStyle(fontSize: 12, color: Colors.teal.shade100),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: Colors.white),
                      onPressed: () => Navigator.pop(ctx),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    children: [
                      Expanded(
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: const Color(0xFFF8FAFC),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: Colors.grey.shade300),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Container(
                                padding: const EdgeInsets.all(16),
                                decoration: const BoxDecoration(
                                  color: Colors.white,
                                  shape: BoxShape.circle,
                                  boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 8)],
                                ),
                                child: const Icon(Icons.picture_as_pdf_rounded, color: Color(0xFFC62828), size: 48),
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'OFFICIAL LAND RECORD: $docName',
                                textAlign: TextAlign.center,
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF0F172A)),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                'Digitally Signed & Verified via e-Mahabhulekh Land Record Portal',
                                textAlign: TextAlign.center,
                                style: TextStyle(fontSize: 11, color: Colors.grey.shade600),
                              ),
                              const SizedBox(height: 16),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                                decoration: BoxDecoration(
                                  color: Colors.teal.shade50,
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: Colors.teal.shade200),
                                ),
                                child: const Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Icon(Icons.verified_rounded, color: Color(0xFF00695C), size: 16),
                                    SizedBox(width: 6),
                                    Text(
                                      'Status: Digitally Verified Record',
                                      style: TextStyle(color: Color(0xFF00695C), fontWeight: FontWeight.bold, fontSize: 12),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        height: 46,
                        child: ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF00695C),
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          onPressed: () {
                            Navigator.pop(ctx);
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Downloading $docName PDF...'),
                                backgroundColor: const Color(0xFF2E7D32),
                              ),
                            );
                          },
                          icon: const Icon(Icons.download_rounded),
                          label: Text('DOWNLOAD $docName PDF', style: const TextStyle(fontWeight: FontWeight.bold)),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildGridDetail(String label, String value, {bool isHighlight = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: const TextStyle(color: Color(0xFF64748B), fontSize: 12, fontWeight: FontWeight.w500),
          ),
          const SizedBox(height: 2),
          Text(
            value,
            softWrap: true,
            style: TextStyle(
              fontWeight: isHighlight ? FontWeight.w800 : FontWeight.bold,
              color: isHighlight ? const Color(0xFFC62828) : const Color(0xFF0F172A),
              fontSize: 14,
            ),
          ),
          const SizedBox(height: 6),
          Divider(height: 1, color: Colors.grey.shade200),
        ],
      ),
    );
  }
}

// ============================================================================
// 6. TAB 2: OFFICIAL NOTICES & DOCUMENTS VIEWER
// ============================================================================

class NoticesDocumentsView extends StatelessWidget {
  final List<LandNoticeDoc> notices;

  const NoticesDocumentsView({super.key, required this.notices});

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final double hp = screenWidth < 360 ? 8.0 : (screenWidth < 600 ? 10.0 : 16.0);

    return SingleChildScrollView(
      padding: EdgeInsets.symmetric(horizontal: hp, vertical: 12),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 600),
          child: Column(
            children: notices.asMap().entries.map((entry) {
              final int index = entry.key;
              final LandNoticeDoc doc = entry.value;
              final bool isLast = index == notices.length - 1;

              return NoticeDocumentItem(
                type: doc.type,
                date: doc.date,
                title: doc.title,
                refNumber: doc.refNumber,
                description: doc.description,
                fileSize: doc.fileSize,
                showDivider: !isLast,
                onView: () => _showDocumentViewerModal(context, doc),
                onDownload: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Downloading official file: ${doc.refNumber}.pdf'),
                      backgroundColor: AppColors.secondaryGreen,
                    ),
                  );
                },
              );
            }).toList(),
          ),
        ),
      ),
    );
  }

  void _showDocumentViewerModal(BuildContext context, LandNoticeDoc doc) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) {
        return Container(
          padding: const EdgeInsets.all(20),
          height: MediaQuery.of(context).size.height * 0.85,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      doc.title,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () => Navigator.pop(ctx),
                  ),
                ],
              ),
              const Divider(),

              // Government Document Preview Container
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.amber.shade50.withValues(alpha: 0.3),
                    border: Border.all(color: Colors.amber.shade300),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: SingleChildScrollView(
                    child: Column(
                      children: [
                        const Icon(Icons.account_balance, size: 40, color: Color(0xFF004D40)),
                        const SizedBox(height: 8),
                        const Text(
                          'THE EXTRAORDINARY GAZETTE OF INDIA',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, letterSpacing: 1.1),
                        ),
                        const Text(
                          'MINISTRY OF RURAL DEVELOPMENT • GOVERNMENT NOTIFICATION',
                          style: TextStyle(fontSize: 10, color: Colors.grey),
                        ),
                        const Divider(height: 24),
                        Text('Notification Ref: ${doc.refNumber}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                        Text('Date of Publication: ${doc.date}', style: const TextStyle(fontSize: 12)),
                        const SizedBox(height: 16),
                        Text(
                          'WHEREAS, it appears to the Appropriate Government that a parcel of land measuring 1.60 Hectares in Village Waghala, Taluka Haveli, District Pune (Survey No. 124/2) is required for a public purpose, namely for SWADESH Corridor Expansion (NH-48).\n\n'
                          'NOW THEREFORE, under Section 11(1) of RFCTLARR Act 2013, notice is hereby served upon all affected persons (PAPs) including Title Holder Rajesh Patil (PAP ID: PAP-MH-2026-88412).\n\n'
                          'Any person interested in any land which has been notified may within SIXTY (60) DAYS from the date of publication submit an objection in writing to the District Collector.',
                          style: const TextStyle(fontSize: 13, height: 1.5, fontFamily: 'Serif'),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00695C), foregroundColor: Colors.white),
                  onPressed: () => Navigator.pop(ctx),
                  icon: const Icon(Icons.check),
                  label: const Text('CLOSE VIEWER'),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

// ============================================================================
// 7. TAB 3: OBJECTIONS MANAGEMENT (RAISE, TRACK & AUTHORITY RESPONSE)
// ============================================================================

class ObjectionsManagementView extends StatefulWidget {
  final LandownerProfile profile;
  final LandParcelDetails parcel;
  final List<ObjectionRecord> objections;
  final int completedDays;
  final int totalDays;
  final bool isPeriodClosed;
  final Function(ObjectionRecord) onObjectionSubmitted;

  const ObjectionsManagementView({
    super.key,
    required this.profile,
    required this.parcel,
    required this.objections,
    required this.completedDays,
    required this.totalDays,
    required this.isPeriodClosed,
    required this.onObjectionSubmitted,
  });

  @override
  State<ObjectionsManagementView> createState() => _ObjectionsManagementViewState();
}

class _ObjectionsManagementViewState extends State<ObjectionsManagementView> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Multi-step Form State
  int _formStep = 0; // 0: Category, 1: Details, 2: Evidence, 3: Review
  final List<String> _selectedCategories = [];
  final TextEditingController _descriptionController = TextEditingController();
  final List<Map<String, String>> _uploadedEvidence = [];

  final List<String> _categoryOptions = const [
    'Land Details',
    'Survey / Parcel',
    'Area Discrepancy',
    'Ownership Issue',
    'Property Issue',
    'House/Shop Affected',
    'Livelihood Impact',
    'Compensation Concern',
    'Rehabilitation Concern',
    'Family / Legal Issue',
    'Other Acquisition Issue',
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  void _submitObjectionForm() {
    if (_selectedCategories.isEmpty || _descriptionController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select category and provide objection description.')),
      );
      return;
    }

    final newObjection = ObjectionRecord(
      objectionId: 'OBJ-2026-00${1000 + math.Random().nextInt(8999)}',
      projectId: widget.parcel.projectId,
      landownerName: widget.profile.name,
      papId: widget.profile.papId,
      surveyNumber: widget.parcel.surveyNumber,
      parcelId: widget.parcel.parcelId,
      village: widget.parcel.village,
      categories: List.from(_selectedCategories),
      description: _descriptionController.text.trim(),
      attachments: List.from(_uploadedEvidence),
      status: ObjectionStatus.submitted,
      submissionDate: '15 Oct 2026',
      submissionTime: '11:45 AM',
      lastUpdated: '15 Oct 2026',
    );

    widget.onObjectionSubmitted(newObjection);

    // Reset Form
    setState(() {
      _formStep = 0;
      _selectedCategories.clear();
      _descriptionController.clear();
      _uploadedEvidence.clear();
    });

    _showConfirmationDialog(newObjection);
  }

  void _showConfirmationDialog(ObjectionRecord obj) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => Dialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
        child: Container(
          width: double.maxFinite,
          padding: const EdgeInsets.all(24),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 72,
                  height: 72,
                  decoration: const BoxDecoration(
                    color: Color(0xFFDCFCE7),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.check_circle_rounded, color: Color(0xFF15803D), size: 48),
                ),
                const SizedBox(height: 16),
                const Text(
                  'OBJECTION SUBMITTED SUCCESSFULLY',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w800,
                    color: Color(0xFF15803D),
                    letterSpacing: 0.5,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Official Acknowledgement Registered with Collectorate',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                ),
                const SizedBox(height: 20),

                // Details Box
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.grey.shade50,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.grey.shade300),
                  ),
                  child: Column(
                    children: [
                      _buildDialogDetailRow('Objection Reference ID', obj.objectionId, isHighlight: true),
                      _buildDialogDetailRow('Project ID', obj.projectId),
                      _buildDialogDetailRow('Affected PAP Name', obj.landownerName),
                      _buildDialogDetailRow('Survey & Parcel No', '${obj.surveyNumber} (${obj.parcelId})'),
                      _buildDialogDetailRow('Filing Date & Time', '${obj.submissionDate} at ${obj.submissionTime}'),
                      _buildDialogDetailRow('Current Status', obj.status.label),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // Info Box
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.teal.shade50,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.teal.shade200),
                  ),
                  child: const Row(
                    children: [
                      Icon(Icons.info_outline_rounded, color: Color(0xFF00695C), size: 20),
                      SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          'You can track hearing updates & official response orders under the "Track Status" tab.',
                          style: TextStyle(fontSize: 11, color: Color(0xFF004D40), height: 1.3),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        onPressed: () {
                          Navigator.pop(ctx);
                          _tabController.animateTo(1);
                        },
                        icon: const Icon(Icons.track_changes_rounded, size: 18),
                        label: const Text('TRACK STATUS', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF00695C),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        onPressed: () => Navigator.pop(ctx),
                        icon: const Icon(Icons.check_rounded, size: 18),
                        label: const Text('DONE', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                      ),
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

  Widget _buildDialogDetailRow(String label, String value, {bool isHighlight = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(color: Colors.grey.shade600, fontSize: 11)),
          const SizedBox(height: 2),
          Text(
            value,
            softWrap: true,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: isHighlight ? 14 : 13,
              color: isHighlight ? const Color(0xFF00695C) : const Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 4),
          Divider(height: 1, color: Colors.grey.shade200),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final double hp = screenWidth < 360 ? 8.0 : (screenWidth < 600 ? 10.0 : 16.0);

    return Column(
      children: [
        Container(
          color: Colors.white,
          child: TabBar(
            controller: _tabController,
            labelColor: const Color(0xFF00695C),
            unselectedLabelColor: const Color(0xFF64748B),
            indicatorColor: const Color(0xFF00695C),
            indicatorWeight: 3,
            tabs: const [
              Tab(icon: Icon(Icons.add_task_rounded), text: 'Raise Objection'),
              Tab(icon: Icon(Icons.track_changes_rounded), text: 'Track Status'),
            ],
          ),
        ),
        Expanded(
          child: TabBarView(
            controller: _tabController,
            children: [
              // 1. Raise Objection Multi-Step Form
              SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: hp, vertical: 12),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 600),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Before You Submit Alert Banner
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: Colors.amber.shade50,
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: Colors.amber.shade300),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Row(
                                children: [
                                  Icon(Icons.info_outline_rounded, color: Color(0xFFD97706)),
                                  SizedBox(width: 8),
                                  Text('BEFORE YOU SUBMIT', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFD97706))),
                                ],
                              ),
                              const SizedBox(height: 6),
                              Text(
                                'Objection deadline: 24 November 2026 (${widget.totalDays - widget.completedDays} days remaining).\n'
                                'You may raise objections regarding area discrepancy, survey boundary errors, ownership rights, or compensation/R&R terms.',
                                style: const TextStyle(fontSize: 12, height: 1.3),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Stepper Indicator
                        Row(
                          children: [
                            _buildStepTab(0, 'Category'),
                            _buildStepConnector(0),
                            _buildStepTab(1, 'Details'),
                            _buildStepConnector(1),
                            _buildStepTab(2, 'Evidence'),
                            _buildStepConnector(2),
                            _buildStepTab(3, 'Review'),
                          ],
                        ),
                        const SizedBox(height: 20),

                        // Multi-Step Content Cards
                        if (_formStep == 0) _buildStep1Category(),
                        if (_formStep == 1) _buildStep2Details(),
                        if (_formStep == 2) _buildStep3Evidence(),
                        if (_formStep == 3) _buildStep4Review(),
                      ],
                    ),
                  ),
                ),
              ),

              // 2. Objection Tracking & Response View
              SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: hp, vertical: 12),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 600),
                    child: Column(
                      children: widget.objections.map((obj) {
                        return SizedBox(
                          width: double.infinity,
                          child: _buildObjectionTrackCard(obj),
                        );
                      }).toList(),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildStepTab(int stepIndex, String label) {
    final bool isActive = _formStep == stepIndex;
    final bool isCompleted = _formStep > stepIndex;

    return Column(
      children: [
        CircleAvatar(
          radius: 14,
          backgroundColor: isCompleted
              ? const Color(0xFF2E7D32)
              : (isActive ? const Color(0xFF00695C) : Colors.grey.shade300),
          child: isCompleted
              ? const Icon(Icons.check, size: 14, color: Colors.white)
              : Text(
                  '${stepIndex + 1}',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: isActive ? Colors.white : Colors.grey.shade600,
                  ),
                ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: TextStyle(
            fontSize: 10,
            fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
            color: isActive ? const Color(0xFF00695C) : Colors.grey.shade600,
          ),
        ),
      ],
    );
  }

  Widget _buildStepConnector(int stepIndex) {
    final bool isPassed = _formStep > stepIndex;
    return Expanded(
      child: Container(
        height: 2,
        margin: const EdgeInsets.only(bottom: 14),
        color: isPassed ? const Color(0xFF2E7D32) : Colors.grey.shade300,
      ),
    );
  }

  // STEP 1: CATEGORY SELECTION (Bulleted Checklist Format)
  Widget _buildStep1Category() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'STEP 1 – SELECT OBJECTION CATEGORY',
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF00695C)),
        ),
        const SizedBox(height: 6),
        const Text('Select one or more relevant categories for your objection:', style: TextStyle(fontSize: 12, color: Color(0xFF64748B))),
        const SizedBox(height: 14),
        ..._categoryOptions.map((cat) {
          final isSelected = _selectedCategories.contains(cat);
          return Container(
            margin: const EdgeInsets.only(bottom: 8),
            decoration: BoxDecoration(
              color: isSelected ? Colors.teal.shade50 : Colors.white,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: isSelected ? const Color(0xFF00695C) : const Color(0xFFCBD5E1)),
            ),
            child: CheckboxListTile(
              value: isSelected,
              activeColor: const Color(0xFF00695C),
              checkboxShape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
              dense: true,
              title: Row(
                children: [
                  Text('• ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: isSelected ? const Color(0xFF00695C) : const Color(0xFF64748B))),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      cat,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                        color: isSelected ? const Color(0xFF00695C) : const Color(0xFF0F172A),
                      ),
                    ),
                  ),
                ],
              ),
              onChanged: (val) {
                setState(() {
                  if (val == true) {
                    _selectedCategories.add(cat);
                  } else {
                    _selectedCategories.remove(cat);
                  }
                });
              },
            ),
          );
        }),
        const SizedBox(height: 20),
        SizedBox(
          width: double.infinity,
          height: 48,
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00695C), foregroundColor: Colors.white),
            onPressed: _selectedCategories.isEmpty ? null : () => setState(() => _formStep = 1),
            child: const Text('CONTINUE TO STEP 2'),
          ),
        ),
      ],
    );
  }

  // STEP 2: OBJECTION DETAILS
  Widget _buildStep2Details() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'STEP 2 – OBJECTION DETAILS',
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF00695C)),
        ),
        const SizedBox(height: 12),
        // Pre-filled Read-Only Info Card
        Card(
          color: Colors.grey.shade100,
          elevation: 0,
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              children: [
                _buildReadOnlyRow('Landowner Name', widget.profile.name),
                _buildReadOnlyRow('PAP ID', widget.profile.papId),
                _buildReadOnlyRow('Project ID', widget.parcel.projectId),
                _buildReadOnlyRow('Survey Number', '${widget.parcel.surveyNumber} (${widget.parcel.parcelId})'),
                _buildReadOnlyRow('Village', widget.parcel.village),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text('Describe Your Objection Clearly:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
        const SizedBox(height: 6),
        TextField(
          controller: _descriptionController,
          maxLines: 5,
          decoration: InputDecoration(
            hintText: 'Explain the issue clearly (e.g. incorrect area measurement, boundary overlap, missing structure valuation)...',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),
        const SizedBox(height: 24),
        Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: () => setState(() => _formStep = 0),
                child: const Text('BACK'),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00695C), foregroundColor: Colors.white),
                onPressed: _descriptionController.text.trim().isEmpty ? null : () => setState(() => _formStep = 2),
                child: const Text('CONTINUE TO STEP 3'),
              ),
            ),
          ],
        ),
      ],
    );
  }

  // STEP 3: EVIDENCE UPLOAD
  Widget _buildStep3Evidence() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'STEP 3 – SUPPORTING EVIDENCE & DOCUMENTS',
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF00695C)),
        ),
        const SizedBox(height: 8),
        const Text('Upload land records, 7/12 extracts, boundary photos, or ownership proof:', style: TextStyle(fontSize: 12)),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () => _simulateAddEvidence('Photo', 'Camera_Capture_Boundary.jpg'),
                icon: const Icon(Icons.camera_alt_rounded),
                label: const Text('Take Photo'),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () => _simulateAddEvidence('Land Record', '7_12_Extract_Document.pdf'),
                icon: const Icon(Icons.upload_file_rounded),
                label: const Text('Upload Document'),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),

        if (_uploadedEvidence.isNotEmpty) ...[
          const Text('Attached Evidence Files:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
          const SizedBox(height: 8),
          ..._uploadedEvidence.map((file) {
            return Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: Colors.grey.shade300),
              ),
              child: Row(
                children: [
                  const Icon(Icons.insert_drive_file_rounded, color: Color(0xFF00695C)),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(file['name']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                        Text('${file['type']} • ${file['date']}', style: TextStyle(color: Colors.grey.shade600, fontSize: 10)),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.delete_outline, color: Colors.red, size: 20),
                    onPressed: () {
                      setState(() {
                        _uploadedEvidence.remove(file);
                      });
                    },
                  ),
                ],
              ),
            );
          }),
        ],
        const SizedBox(height: 24),
        Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: () => setState(() => _formStep = 1),
                child: const Text('BACK'),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00695C), foregroundColor: Colors.white),
                onPressed: () => setState(() => _formStep = 3),
                child: const Text('REVIEW & SUBMIT'),
              ),
            ),
          ],
        ),
      ],
    );
  }

  void _simulateAddEvidence(String type, String fileName) {
    setState(() {
      _uploadedEvidence.add({
        'name': fileName,
        'type': type,
        'date': 'Today',
      });
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Attached file: $fileName'), backgroundColor: const Color(0xFF2E7D32)),
    );
  }

  // STEP 4: REVIEW & CONFIRM (High Contrast & Maximum Readability)
  Widget _buildStep4Review() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Row(
          children: [
            Icon(Icons.assignment_turned_in_rounded, color: Color(0xFF00695C), size: 22),
            SizedBox(width: 8),
            Text(
              'STEP 4 – OBJECTION SUMMARY REVIEW',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF00695C), letterSpacing: 0.5),
            ),
          ],
        ),
        const SizedBox(height: 6),
        const Text(
          'Please verify all details carefully before final submission to the District Collector:',
          style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
        ),
        const SizedBox(height: 14),

        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFCBD5E1)),
            boxShadow: const [
              BoxShadow(
                color: Colors.black12,
                blurRadius: 8,
                offset: Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'LANDOWNER & PARCEL IDENTIFICATION',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF00695C), letterSpacing: 0.8),
              ),
              const SizedBox(height: 10),
              _buildReadOnlyRow('Landowner Name', widget.profile.name),
              _buildReadOnlyRow('PAP Reference ID', widget.profile.papId),
              _buildReadOnlyRow('Target Project ID', widget.parcel.projectId),
              _buildReadOnlyRow('Survey Number', widget.parcel.surveyNumber),
              _buildReadOnlyRow('Sub-Division / Parcel ID', widget.parcel.parcelId),
              _buildReadOnlyRow('Village Location', '${widget.parcel.village}, Taluka ${widget.parcel.taluka}'),
              const Divider(height: 24, thickness: 1),

              const Text(
                'SELECTED OBJECTION CATEGORIES',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF00695C), letterSpacing: 0.8),
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 6,
                runSpacing: 6,
                children: _selectedCategories.map((cat) {
                  return Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: Colors.teal.shade50,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: const Color(0xFF00695C)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.check_circle_rounded, color: Color(0xFF00695C), size: 14),
                        const SizedBox(width: 4),
                        Text(cat, style: const TextStyle(color: Color(0xFF00695C), fontWeight: FontWeight.bold, fontSize: 12)),
                      ],
                    ),
                  );
                }).toList(),
              ),
              const Divider(height: 24, thickness: 1),

              const Text(
                'OBJECTION DESCRIPTION & STATEMENT',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF00695C), letterSpacing: 0.8),
              ),
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFFF8FAFC),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Text(
                  _descriptionController.text.trim().isEmpty ? '(No description provided)' : _descriptionController.text.trim(),
                  style: const TextStyle(fontSize: 14, height: 1.5, color: Color(0xFF0F172A), fontWeight: FontWeight.w500),
                ),
              ),
              const Divider(height: 24, thickness: 1),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'ATTACHED EVIDENCE & PROOF',
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF00695C), letterSpacing: 0.8),
                  ),
                  Text(
                    '${_uploadedEvidence.length} Files Attached',
                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF64748B)),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              if (_uploadedEvidence.isEmpty)
                const Text('No supporting evidence uploaded.', style: TextStyle(color: Colors.grey, fontSize: 12))
              else
                ..._uploadedEvidence.map((f) {
                  final String type = f['type'] ?? 'Evidence';
                  final bool isPhoto = type.toLowerCase().contains('photo') || (f['name'] ?? '').endsWith('.jpg');
                  return Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade50,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: Colors.grey.shade300),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Row(
                            children: [
                              Icon(isPhoto ? Icons.photo_camera_rounded : Icons.description_rounded, color: const Color(0xFF00695C), size: 20),
                              const SizedBox(width: 10),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      f['name'] ?? '',
                                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                    Text(
                                      '$type • Read-Only View Available',
                                      style: TextStyle(fontSize: 10, color: Colors.grey.shade600),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF00695C),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            minimumSize: Size.zero,
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                          ),
                          onPressed: () => _showReadOnlyEvidenceViewer(f),
                          icon: const Icon(Icons.visibility_rounded, size: 14),
                          label: Text(isPhoto ? 'View Photo' : 'View Document', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                  );
                }),
            ],
          ),
        ),
        const SizedBox(height: 24),
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: () => setState(() => _formStep = 2),
                icon: const Icon(Icons.edit_rounded, size: 18),
                label: const Text('EDIT FORM', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF2E7D32),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  elevation: 2,
                ),
                onPressed: _submitObjectionForm,
                icon: const Icon(Icons.send_rounded, size: 18),
                label: const Text('SUBMIT OBJECTION', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ],
    );
  }

  void _showReadOnlyEvidenceViewer(Map<String, String> file) {
    final String type = file['type'] ?? 'File';
    final String name = file['name'] ?? 'Evidence File';
    final bool isPhoto = type.toLowerCase().contains('photo') || name.endsWith('.jpg') || name.endsWith('.png');

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) => Container(
        padding: const EdgeInsets.all(20),
        height: MediaQuery.of(context).size.height * 0.7,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Row(
                    children: [
                      Icon(isPhoto ? Icons.photo_camera_rounded : Icons.description_rounded, color: const Color(0xFF00695C)),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          '$type ($name)',
                          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(color: Colors.amber.shade50, border: Border.all(color: Colors.amber.shade300), borderRadius: BorderRadius.circular(12)),
                  child: const Text('READ ONLY PREVIEW', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Color(0xFFD97706))),
                ),
                IconButton(icon: const Icon(Icons.close), onPressed: () => Navigator.pop(ctx)),
              ],
            ),
            const Divider(),
            Expanded(
              child: Center(
                child: isPhoto
                    ? Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: Colors.grey.shade100,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: Colors.grey.shade300),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.photo_camera_rounded, size: 70, color: Color(0xFF00695C)),
                            const SizedBox(height: 12),
                            Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                            const SizedBox(height: 4),
                            const Text('Captured Boundary Photo (Read-Only)', style: TextStyle(fontSize: 12, color: Colors.grey)),
                          ],
                        ),
                      )
                    : Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: Colors.amber.shade50.withValues(alpha: 0.3),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: Colors.amber.shade300),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.picture_as_pdf_rounded, size: 70, color: Color(0xFFC62828)),
                            const SizedBox(height: 12),
                            Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                            const SizedBox(height: 4),
                            const Text('Official Land Record / 7/12 Extract Document (Read-Only)', textAlign: TextAlign.center, style: TextStyle(fontSize: 12, color: Colors.grey)),
                          ],
                        ),
                      ),
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF00695C), foregroundColor: Colors.white),
                onPressed: () => Navigator.pop(ctx),
                child: const Text('CLOSE PREVIEW'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildReadOnlyRow(String label, String val) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(color: Color(0xFF64748B), fontSize: 11, fontWeight: FontWeight.w500)),
          const SizedBox(height: 2),
          Text(
            val,
            softWrap: true,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF0F172A)),
          ),
          const SizedBox(height: 4),
          Divider(height: 1, color: Colors.grey.shade200),
        ],
      ),
    );
  }

  Widget _buildObjectionTrackCard(ObjectionRecord obj) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  obj.objectionId,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00695C)),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: obj.status.color.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    children: [
                      Icon(obj.status.icon, color: obj.status.color, size: 14),
                      const SizedBox(width: 4),
                      Text(
                        obj.status.label,
                        style: TextStyle(color: obj.status.color, fontWeight: FontWeight.bold, fontSize: 11),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text('Categories: ${obj.categories.join(", ")}', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
            const SizedBox(height: 4),
            Text('Submitted on ${obj.submissionDate} at ${obj.submissionTime}', style: TextStyle(color: Colors.grey.shade600, fontSize: 11)),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.grey.shade50,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                obj.description,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 12, height: 1.3),
              ),
            ),
            const SizedBox(height: 12),

            // Vertical Status Timeline Tracker
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildTrackerNode('Submitted', true),
                _buildTrackerNode('Received', true),
                _buildTrackerNode('Under Review', obj.status == ObjectionStatus.underReview || obj.status == ObjectionStatus.accepted),
                _buildTrackerNode('Response', obj.status == ObjectionStatus.accepted),
                _buildTrackerNode('Resolved', obj.status == ObjectionStatus.resolved),
              ],
            ),

            if (obj.authorityRemarks != null) ...[
              const Divider(height: 20),
              Row(
                children: [
                  const Icon(Icons.quickreply_rounded, color: Color(0xFF00695C), size: 18),
                  const SizedBox(width: 6),
                  const Text('Authority Remarks:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                ],
              ),
              const SizedBox(height: 4),
              Text(obj.authorityRemarks!, style: TextStyle(color: Colors.teal.shade900, fontSize: 12)),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildTrackerNode(String label, bool isDone) {
    return Column(
      children: [
        Icon(
          isDone ? Icons.check_circle : Icons.radio_button_unchecked,
          color: isDone ? const Color(0xFF2E7D32) : Colors.grey.shade400,
          size: 18,
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: TextStyle(
            fontSize: 9,
            fontWeight: isDone ? FontWeight.bold : FontWeight.normal,
            color: isDone ? const Color(0xFF0F172A) : Colors.grey.shade500,
          ),
        ),
      ],
    );
  }
}

// ============================================================================
// 8. TAB 4: PROFILE, COMPENSATION, R&R & HELP
// ============================================================================

class ProfileAndSupportView extends StatefulWidget {
  final LandownerProfile profile;
  final LandParcelDetails parcel;
  final VoidCallback onLogout;
  final VoidCallback? onOpenChatbot;

  const ProfileAndSupportView({
    super.key,
    required this.profile,
    required this.parcel,
    required this.onLogout,
    this.onOpenChatbot,
  });

  @override
  State<ProfileAndSupportView> createState() => _ProfileAndSupportViewState();
}

class _ProfileAndSupportViewState extends State<ProfileAndSupportView> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _selectedStage = 'PROPOSED'; // PROPOSED, UNDER VERIFICATION, PAID
  bool? _isScoreFair;

  // FAQ Category Filter State
  String _selectedFaqCategory = 'All';

  final List<Map<String, String>> _allFaqs = const [
    {
      'category': 'Objections',
      'q': 'What happens after I submit an objection under Section 15?',
      'a': 'Your objection is assigned to the District Collector & DILR. A hearing notice will be issued, and field re-survey will be conducted before final award determination.',
    },
    {
      'category': 'Compensation',
      'q': 'How is land compensation calculated under RFCTLARR Act 2013?',
      'a': 'Compensation = (Circle/Market Rate × Multiplication Factor [1.5x - 2.0x]) + 100% Solatium Grant + 12% statutory interest per annum from notification date.',
    },
    {
      'category': 'Objections',
      'q': 'How is the 60-day objection deadline calculated?',
      'a': 'The 60-day window starts from the official publication date of the Section 11(1) Gazette Notification in local newspapers.',
    },
    {
      'category': 'Form 7/12 & Docs',
      'q': 'What documents are required for title verification and compensation payout?',
      'a': 'You need e-signed Form 7/12 extract, Form 8A, Sub-Registrar Index II, Aadhaar card, PAN card, and bank account passbook copy.',
    },
    {
      'category': 'Form 7/12 & Docs',
      'q': 'How can I download certified e-Mahabhulekh 7/12 extracts?',
      'a': 'Navigate to the "Land Details" tab in this app and click "View" next to Form 7, Form 12, Property Card, or Form 8A to view and download digitally signed PDFs.',
    },
    {
      'category': 'Acquisition & Notice',
      'q': 'What is Section 11(1) Preliminary Notification?',
      'a': 'It is the official notice issued by the state government declaring the intent to acquire land for a public purpose project (e.g. NH-48 Expansion).',
    },
    {
      'category': 'Compensation',
      'q': 'What is R&R (Resettlement & Rehabilitation) entitlement?',
      'a': 'Affected families are entitled to house allotment, annuity allowance, or one-time resettlement grant as per the Second Schedule of RFCTLARR Act 2013.',
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final double hp = screenWidth < 360 ? 8.0 : (screenWidth < 600 ? 10.0 : 16.0);

    return Column(
      children: [
        Container(
          color: Colors.white,
          child: TabBar(
            controller: _tabController,
            labelColor: const Color(0xFF00695C),
            unselectedLabelColor: const Color(0xFF64748B),
            indicatorColor: const Color(0xFF00695C),
            indicatorWeight: 3,
            tabs: const [
              Tab(icon: Icon(Icons.account_circle_rounded), text: 'Profile'),
              Tab(icon: Icon(Icons.payments_rounded), text: 'Compensation'),
              Tab(icon: Icon(Icons.help_outline_rounded), text: 'Help & FAQ'),
            ],
          ),
        ),
        Expanded(
          child: TabBarView(
            controller: _tabController,
            children: [
              // 1. Profile View (Unboxed on App Base Screen)
              SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: hp, vertical: 12),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 600),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const CircleAvatar(
                              radius: 32,
                              backgroundColor: Color(0xFF00695C),
                              child: Icon(Icons.person, size: 36, color: Colors.white),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    widget.profile.name,
                                    softWrap: true,
                                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    'PAP ID: ${widget.profile.papId}',
                                    style: const TextStyle(color: Color(0xFF64748B), fontSize: 12, fontWeight: FontWeight.w600),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const Divider(height: 24),

                        _buildProfileDetail('Registered Mobile Number', widget.profile.mobileNumber),
                        _buildProfileDetail('Registered Email Address', widget.profile.email),
                        _buildProfileDetail('Village / Location', '${widget.profile.village}, Taluka ${widget.profile.taluka}, District ${widget.profile.district}'),
                        _buildProfileDetail('Residential Address', widget.profile.address),
                        _buildProfileDetail('Account Verification Status', widget.profile.accountStatus, valueColor: const Color(0xFF15803D)),
                        const SizedBox(height: 16),

                        // Revenue Lock Warning Container
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.teal.shade50,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.teal.shade200),
                          ),
                          child: const Row(
                            children: [
                              Icon(Icons.lock_rounded, color: Color(0xFF00695C)),
                              SizedBox(width: 10),
                              Expanded(
                                child: Text(
                                  'Official revenue & land record data is synced read-only from Revenue Dept (e-Ferfar) and cannot be altered by citizen profile edits.',
                                  style: TextStyle(fontSize: 11, color: Color(0xFF004D40), height: 1.3),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),
                        SizedBox(
                          width: double.infinity,
                          height: 48,
                          child: ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFFC62828),
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            onPressed: widget.onLogout,
                            icon: const Icon(Icons.logout),
                            label: const Text('LOGOUT FROM PORTAL', style: TextStyle(fontWeight: FontWeight.bold)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),

              // 2. Compensation & R&R Status View
              SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: hp, vertical: 12),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 600),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // SECTION 1: MY COMPENSATION & VALUATION
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'MY COMPENSATION',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00695C), letterSpacing: 0.5),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: const Color(0xFF00695C).withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(color: const Color(0xFF00695C)),
                              ),
                              child: Text(
                                _selectedStage,
                                style: const TextStyle(fontSize: 10, color: Color(0xFF00695C), fontWeight: FontWeight.bold),
                              ),
                            ),
                          ],
                        ),
                        const Divider(height: 20),

                        // Amount Receiving Box
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Color(0xFF004D40), Color(0xFF00695C)],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(14),
                            boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 2))],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'AMOUNT RECEIVING',
                                style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 0.8),
                              ),
                              const SizedBox(height: 6),
                              const Text(
                                '₹ 48,50,000',
                                style: TextStyle(color: Colors.white, fontSize: 26, fontWeight: FontWeight.w800, letterSpacing: 0.5),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                'Includes Market Valuation + 100% Solatium Grant + 12% Interest',
                                style: TextStyle(color: Colors.teal.shade100, fontSize: 11),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 14),

                        _buildProfileDetail('Landowner Name', widget.profile.name),
                        _buildProfileDetail('Acquired Land Parcel', '${widget.parcel.surveyNumber} (${widget.parcel.parcelId}) • ${widget.parcel.areaRequiredHa} Ha'),
                        _buildProfileDetail('Nearby Circle Rate', '₹ 1,200 / sq.ft (Haveli Zone 4)'),
                        _buildProfileDetail('Nearby Recent Sales Avg', '₹ 1,450 / sq.ft (Waghala Village Benchmark)'),
                        const SizedBox(height: 16),

                        // PRELIMINARY NOTIFICATION CARD
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: Colors.grey.shade300),
                            boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 3, offset: Offset(0, 1))],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  const Row(
                                    children: [
                                      Icon(Icons.campaign_rounded, color: Color(0xFF00695C), size: 20),
                                      SizedBox(width: 8),
                                      Text(
                                        'Preliminary Notification',
                                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF0F172A)),
                                      ),
                                    ],
                                  ),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFFFF7ED),
                                      borderRadius: BorderRadius.circular(12),
                                      border: Border.all(color: const Color(0xFFFDBA74)),
                                    ),
                                    child: const Text(
                                      'Action Required',
                                      style: TextStyle(color: Color(0xFFC2410C), fontWeight: FontWeight.bold, fontSize: 11),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 10),
                              const Text('Issued: 1 August 2026', style: TextStyle(fontSize: 12, color: Color(0xFF475569))),
                              const SizedBox(height: 2),
                              const Text(
                                'Response deadline: 30 September 2026',
                                style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFFC62828)),
                              ),
                              const SizedBox(height: 12),
                              SizedBox(
                                width: double.infinity,
                                height: 38,
                                child: OutlinedButton.icon(
                                  style: OutlinedButton.styleFrom(
                                    foregroundColor: const Color(0xFF00695C),
                                    side: const BorderSide(color: Color(0xFF00695C)),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                  ),
                                  onPressed: () => _showPreliminaryNoticeModal(context),
                                  icon: const Icon(Icons.description_outlined, size: 16),
                                  label: const Text('READ NOTICE', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 16),

                        const SizedBox(height: 28),

                        // SECTION 2: REHABILITATION & RESETTLEMENT (R&R / RmR)
                        const Row(
                          children: [
                            Icon(Icons.house_siding_rounded, color: Color(0xFF00695C), size: 20),
                            SizedBox(width: 8),
                            Text('REHABILITATION & RESETTLEMENT (R&R)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF00695C), letterSpacing: 0.5)),
                          ],
                        ),
                        const Divider(height: 20),
                        _buildProfileDetail('RnR\'s Decision', 'Plot Allocation + One-Time Resettlement Grant Approved'),
                        _buildProfileDetail('New Area / Job Allotted', '200 Sq.m Plot at Sector-14 Housing Colony + Skill Training Allowance'),
                        const SizedBox(height: 12),

                        // SIMILAR CASE PEOPLE'S R&R REPORT BUTTON
                        SizedBox(
                          width: double.infinity,
                          height: 42,
                          child: OutlinedButton.icon(
                            style: OutlinedButton.styleFrom(
                              foregroundColor: const Color(0xFF0288D1),
                              side: const BorderSide(color: Color(0xFF0288D1)),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            ),
                            onPressed: () => _showSimilarCasesRnRModal(context),
                            icon: const Icon(Icons.people_outline_rounded, size: 18),
                            label: const Text(
                              'SIMILAR CASE PEOPLE\'S RNR REPORT',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // R&R EQUITY SCORE & ASSET VALUATION BREAKDOWN CARD
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.teal.shade50.withValues(alpha: 0.5),
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: const Color(0xFF00695C).withValues(alpha: 0.3)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  const Row(
                                    children: [
                                      Icon(Icons.fact_check_rounded, color: Color(0xFF00695C), size: 20),
                                      SizedBox(width: 8),
                                      Text(
                                        'R&R Equity Score',
                                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF0F172A)),
                                      ),
                                    ],
                                  ),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFF2E7D32),
                                      borderRadius: BorderRadius.circular(20),
                                    ),
                                    child: const Text(
                                      'Score: 92 / 100',
                                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              const Text(
                                'Score evaluation based on RFCTLARR 2013 resettlement benchmarks and local market compensation equity.',
                                style: TextStyle(fontSize: 11, color: Color(0xFF475569), height: 1.3),
                              ),
                              const SizedBox(height: 12),
                              // Calculation Score Breakdown Box
                              Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(color: const Color(0xFF00695C).withValues(alpha: 0.2)),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Row(
                                      children: [
                                        Icon(Icons.calculate_rounded, size: 16, color: Color(0xFF00695C)),
                                        SizedBox(width: 6),
                                        Text(
                                          'ASSET VALUATION & SCORE BREAKDOWN',
                                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF00695C), letterSpacing: 0.5),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 8),
                                    _buildScoreMetricRow('Land Area & Base Rate', '25 / 25', '₹ 24.25 L base market value (1.60 Ha)'),
                                    _buildScoreMetricRow('Built Structures Asset', '23 / 25', '₹ 8.50 L RCC house & borewell valuation'),
                                    _buildScoreMetricRow('Trees & Crop Assets', '22 / 25', '₹ 3.25 L teak/fruit trees & standing crop'),
                                    _buildScoreMetricRow('R&R Solatium & Plot Equity', '22 / 25', '200 sq.m plot + 100% Solatium grant'),
                                    const Divider(height: 14),
                                    const Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text('Calculated Total Score:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                                        Text('92 / 100 Equity Score', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: Color(0xFF2E7D32))),
                                      ],
                                    ),
                                    const SizedBox(height: 8),
                                    SizedBox(
                                      width: double.infinity,
                                      child: TextButton.icon(
                                        style: TextButton.styleFrom(
                                          foregroundColor: const Color(0xFF00695C),
                                          padding: EdgeInsets.zero,
                                          minimumSize: const Size(0, 30),
                                          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                        ),
                                        onPressed: () => _showAssetCalculationScoreModal(context),
                                        icon: const Icon(Icons.info_outline_rounded, size: 14),
                                        label: const Text('View Detailed Calculation Formula & Asset Specs', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, decoration: TextDecoration.underline)),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 14),
                              const Text(
                                'Is this score calculation correct?',
                                style: TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: Color(0xFF00695C)),
                              ),
                              const SizedBox(height: 10),
                              Row(
                                children: [
                                  Expanded(
                                    child: ElevatedButton.icon(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: _isScoreFair == true ? const Color(0xFF2E7D32) : Colors.white,
                                        foregroundColor: _isScoreFair == true ? Colors.white : const Color(0xFF2E7D32),
                                        side: const BorderSide(color: Color(0xFF2E7D32)),
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                        elevation: 0,
                                      ),
                                      onPressed: () {
                                        setState(() => _isScoreFair = true);
                                        ScaffoldMessenger.of(context).showSnackBar(
                                          const SnackBar(
                                            content: Text('Feedback Recorded: You confirmed the R&R Calculation Score is Correct ✓'),
                                            backgroundColor: Color(0xFF2E7D32),
                                          ),
                                        );
                                      },
                                      icon: const Icon(Icons.thumb_up_alt_rounded, size: 16),
                                      label: const Text('YES, CORRECT', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                                    ),
                                  ),
                                  const SizedBox(width: 10),
                                  Expanded(
                                    child: ElevatedButton.icon(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: _isScoreFair == false ? const Color(0xFFC62828) : Colors.white,
                                        foregroundColor: _isScoreFair == false ? Colors.white : const Color(0xFFC62828),
                                        side: const BorderSide(color: Color(0xFFC62828)),
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                        elevation: 0,
                                      ),
                                      onPressed: () {
                                        setState(() => _isScoreFair = false);
                                        _showReportErrorModal(context);
                                      },
                                      icon: const Icon(Icons.thumb_down_alt_rounded, size: 16),
                                      label: const Text('NO, NOT CORRECT', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),

                        // REPORT AN ERROR SECTION (VALUATION DISCREPANCY DISPUTE)
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFEF2F2),
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: const Color(0xFFFECACA)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Row(
                                children: [
                                  Icon(Icons.report_problem_rounded, color: Color(0xFFDC2626), size: 20),
                                  SizedBox(width: 8),
                                  Text(
                                    'VALUATION DISCREPANCY DISPUTE',
                                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF991B1B)),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 6),
                              const Text(
                                'Select stage to report error in land area calculation, circle rate, or solatium grant:',
                                style: TextStyle(fontSize: 11, color: Color(0xFF7F1D1D), height: 1.3),
                              ),
                              const SizedBox(height: 10),

                              // Stage Selector Chips
                              Wrap(
                                spacing: 6,
                                children: ['PROPOSED', 'UNDER VERIFICATION', 'PAID'].map((stage) {
                                  final bool isSelected = _selectedStage == stage;
                                  return ChoiceChip(
                                    label: Text(
                                      stage,
                                      style: TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.bold,
                                        color: isSelected ? Colors.white : const Color(0xFF475569),
                                      ),
                                    ),
                                    selected: isSelected,
                                    selectedColor: const Color(0xFF00695C),
                                    backgroundColor: Colors.white,
                                    onSelected: (val) {
                                      if (val) setState(() => _selectedStage = stage);
                                    },
                                  );
                                }).toList(),
                              ),
                              const SizedBox(height: 12),

                              SizedBox(
                                width: double.infinity,
                                height: 40,
                                child: ElevatedButton.icon(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xFFDC2626),
                                    foregroundColor: Colors.white,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                    elevation: 0,
                                  ),
                                  onPressed: () => _showReportErrorModal(context),
                                  icon: const Icon(Icons.edit_notifications_rounded, size: 16),
                                  label: const Text('REPORT AN ERROR', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),

              // 3. Help & FAQ Section with FAQs at top and AI Chatbot card below
              SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: hp, vertical: 12),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 600),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Statutory Rights Banner
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: const Color(0xFF00695C),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Column(
                            children: [
                              Text(
                                '“You have 60 days from the notification date to submit an objection.”',
                                textAlign: TextAlign.center,
                                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                              ),
                              SizedBox(height: 4),
                              Text(
                                'Section 15 of RFCTLARR Act 2013 Rights Protection',
                                style: TextStyle(color: Colors.white70, fontSize: 11),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),

                        // 1. FREQUENTLY ASKED QUESTIONS (FAQs) SECTION FIRST
                        Row(
                          children: [
                            const Icon(Icons.quiz_rounded, color: Color(0xFF00695C), size: 20),
                            const SizedBox(width: 8),
                            const Text(
                              'FREQUENTLY ASKED QUESTIONS (FAQs)',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF00695C), letterSpacing: 0.5),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Find official legal & procedural answers regarding land acquisition',
                          style: TextStyle(fontSize: 11, color: Colors.grey.shade600),
                        ),
                        const SizedBox(height: 12),

                        // Category Filter Chips
                        SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Row(
                            children: ['All', 'Objections', 'Compensation', 'Form 7/12 & Docs', 'Acquisition & Notice'].map((cat) {
                              final isSel = _selectedFaqCategory == cat;
                              return Padding(
                                padding: const EdgeInsets.only(right: 6),
                                child: ChoiceChip(
                                  label: Text(cat, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isSel ? Colors.white : const Color(0xFF334155))),
                                  selected: isSel,
                                  selectedColor: const Color(0xFF00695C),
                                  backgroundColor: Colors.white,
                                  onSelected: (_) => setState(() => _selectedFaqCategory = cat),
                                ),
                              );
                            }).toList(),
                          ),
                        ),
                        const SizedBox(height: 12),

                        // FAQ Accordion List
                        Builder(
                          builder: (context) {
                            final filteredFaqs = _allFaqs.where((faq) {
                              return _selectedFaqCategory == 'All' || faq['category'] == _selectedFaqCategory;
                            }).toList();

                            if (filteredFaqs.isEmpty) {
                              return Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(20),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: Colors.grey.shade300),
                                ),
                                child: const Center(
                                  child: Text('No FAQs match your search criteria.', style: TextStyle(fontSize: 12, color: Color(0xFF64748B))),
                                ),
                              );
                            }

                            return Column(
                              children: filteredFaqs.map((faq) => _buildFaqTile(faq['q']!, faq['a']!)).toList(),
                            );
                          },
                        ),
                        const SizedBox(height: 24),

                        // 2. AI CHATBOT CARD (RIGHT BELOW FAQs)
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Color(0xFF00695C), Color(0xFF0288D1)],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFF00695C).withValues(alpha: 0.3),
                                blurRadius: 10,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.all(8),
                                    decoration: const BoxDecoration(
                                      color: Colors.white24,
                                      shape: BoxShape.circle,
                                    ),
                                    child: const Icon(Icons.smart_toy_rounded, color: Colors.white, size: 24),
                                  ),
                                  const SizedBox(width: 12),
                                  const Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          'SWADESH Saathi AI Assistant',
                                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                                        ),
                                        Text(
                                          'Bilingual 24/7 AI Land Acquisition Assistant',
                                          style: TextStyle(fontSize: 11, color: Colors.white70),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                    decoration: BoxDecoration(
                                      color: Colors.amber,
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: const Text(
                                      'ONLINE 24/7',
                                      style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: Colors.black),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 12),
                              const Text(
                                'Have specific questions about Survey No. 124/2, compensation breakdown, objection filing, or e-Mahabhulekh 7/12 records? Talk to our AI Chatbot anytime in Marathi or English.',
                                style: TextStyle(fontSize: 12, color: Colors.white, height: 1.4),
                              ),
                              const SizedBox(height: 16),
                              SizedBox(
                                width: double.infinity,
                                height: 44,
                                child: ElevatedButton.icon(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Colors.white,
                                    foregroundColor: const Color(0xFF00695C),
                                    elevation: 2,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                  ),
                                  onPressed: () {
                                    if (widget.onOpenChatbot != null) {
                                      widget.onOpenChatbot!();
                                    }
                                  },
                                  icon: const Icon(Icons.chat_bubble_rounded, size: 18),
                                  label: const Text(
                                    'START CHAT WITH SWADESH SAATHI',
                                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12.5, letterSpacing: 0.3),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildProfileDetail(String label, String value, {Color? valueColor}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12, fontWeight: FontWeight.w500)),
          const SizedBox(height: 2),
          Text(
            value,
            softWrap: true,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 14,
              color: valueColor ?? const Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 6),
          Divider(height: 1, color: Colors.grey.shade200),
        ],
      ),
    );
  }

  void _showPreliminaryNoticeModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        height: MediaQuery.of(context).size.height * 0.75,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.fromLTRB(20, 16, 16, 12),
              decoration: const BoxDecoration(
                color: Color(0xFF00695C),
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.campaign_rounded, color: Colors.white, size: 22),
                  const SizedBox(width: 10),
                  const Expanded(
                    child: Text(
                      'Preliminary Notification Notice',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                  IconButton(icon: const Icon(Icons.close, color: Colors.white), onPressed: () => Navigator.pop(ctx)),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildProfileDetail('Notification Reference', 'MH-GAZ-2026-9921'),
                    _buildProfileDetail('Issued Date', '1 August 2026'),
                    _buildProfileDetail('Response Deadline', '30 September 2026'),
                    _buildProfileDetail('Current Notice Status', 'Action Required • Active Window'),
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: Colors.grey.shade50,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.grey.shade300),
                      ),
                      child: const Text(
                        'Official Gazette Notification published under Section 11(1) of RFCTLARR Act 2013 for SWADESH Highway & Freight Corridor (NH-48) land acquisition. Landowners are notified to file objections before 30 September 2026.',
                        style: TextStyle(fontSize: 12, height: 1.4, color: Color(0xFF0F172A)),
                      ),
                    ),
                    const SizedBox(height: 20),
                    SizedBox(
                      width: double.infinity,
                      height: 46,
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF00695C),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: () {
                          Navigator.pop(ctx);
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Downloading Preliminary Notification Gazette PDF...')),
                          );
                        },
                        icon: const Icon(Icons.download_rounded),
                        label: const Text('DOWNLOAD GAZETTE NOTICE PDF', style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
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

  void _showReportErrorModal(BuildContext context) {
    final TextEditingController remarkController = TextEditingController();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        padding: EdgeInsets.only(bottom: MediaQuery.of(ctx).viewInsets.bottom),
        height: MediaQuery.of(context).size.height * 0.7,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.fromLTRB(20, 16, 16, 12),
              decoration: const BoxDecoration(
                color: Color(0xFFDC2626),
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.report_problem_rounded, color: Colors.white, size: 22),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'Report Valuation Error ($_selectedStage)',
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                  IconButton(icon: const Icon(Icons.close, color: Colors.white), onPressed: () => Navigator.pop(ctx)),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Current Discrepancy Stage: $_selectedStage', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00695C))),
                    const SizedBox(height: 12),
                    TextField(
                      controller: remarkController,
                      maxLines: 4,
                      decoration: InputDecoration(
                        labelText: 'Describe valuation / area discrepancy in detail',
                        hintText: 'e.g., Circle rate applied is lower than village ready reckoner; physical land area is 1.6 Ha instead of 1.4 Ha...',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                    ),
                    const SizedBox(height: 20),
                    SizedBox(
                      width: double.infinity,
                      height: 46,
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFDC2626),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: () {
                          Navigator.pop(ctx);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('Valuation Discrepancy Error Report Submitted for $_selectedStage phase!'),
                              backgroundColor: const Color(0xFF2E7D32),
                            ),
                          );
                        },
                        icon: const Icon(Icons.send_rounded),
                        label: const Text('SUBMIT ERROR DISPUTE', style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
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

  void _showSimilarCasesRnRModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        height: MediaQuery.of(context).size.height * 0.75,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.fromLTRB(20, 16, 16, 12),
              decoration: const BoxDecoration(
                color: Color(0xFF0288D1),
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.people_alt_rounded, color: Colors.white, size: 22),
                  const SizedBox(width: 10),
                  const Expanded(
                    child: Text(
                      'Similar Case People\'s R&R Report',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                  IconButton(icon: const Icon(Icons.close, color: Colors.white), onPressed: () => Navigator.pop(ctx)),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Waghala Village Benchmark R&R Allotment Packages:',
                      style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 12),
                    _buildRnRCaseCard('Ramesh Jadhav (Survey 122/1)', '1.20 Ha Acquired', 'Allotted 150 Sq.m Plot + ₹ 5 Lakh Solatium', '90 / 100 Equity'),
                    _buildRnRCaseCard('Sunita Shinde (Survey 125/4)', '1.85 Ha Acquired', 'Allotted 220 Sq.m Plot + Priority Job Training', '94 / 100 Equity'),
                    _buildRnRCaseCard('Rajesh Patil (Your Case - Survey 124/2)', '1.60 Ha Acquired', 'Allotted 200 Sq.m Plot + Skill Grant', '92 / 100 Equity'),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      height: 44,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF0288D1),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: () => Navigator.pop(ctx),
                        child: const Text('CLOSE REPORT', style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
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

  Widget _buildRnRCaseCard(String name, String area, String package, String score) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF0F172A))),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: Colors.teal.shade50, borderRadius: BorderRadius.circular(10)),
                child: Text(score, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Color(0xFF00695C))),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text('Acquired Area: $area', style: TextStyle(fontSize: 11, color: Colors.grey.shade700)),
          const SizedBox(height: 2),
          Text('R&R Package: $package', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF00695C))),
        ],
      ),
    );
  }

  Widget _buildScoreMetricRow(String title, String score, String detail) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 11, color: Color(0xFF1E293B))),
                Text(detail, style: TextStyle(fontSize: 10, color: Colors.grey.shade600)),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: const Color(0xFF00695C).withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Text(
              score,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Color(0xFF00695C)),
            ),
          ),
        ],
      ),
    );
  }

  void _showAssetCalculationScoreModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        height: MediaQuery.of(context).size.height * 0.8,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.fromLTRB(20, 16, 16, 12),
              decoration: const BoxDecoration(
                color: Color(0xFF00695C),
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.calculate_rounded, color: Colors.white, size: 22),
                  const SizedBox(width: 10),
                  const Expanded(
                    child: Text(
                      'Asset Valuation & Calculation Score Matrix',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                  IconButton(icon: const Icon(Icons.close, color: Colors.white), onPressed: () => Navigator.pop(ctx)),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'How the R&R Equity Score (92/100) is Calculated:',
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'As per RFCTLARR Act 2013 First & Second Schedules, compensation and resettlement equity are evaluated across 4 core asset categories:',
                      style: TextStyle(fontSize: 11.5, color: Color(0xFF475569)),
                    ),
                    const SizedBox(height: 16),
                    _buildCalcDetailCard(
                      step: '1. Land Asset Market Value',
                      score: '25 / 25 Score',
                      formula: 'Area (1.60 Ha / 17,222 sq.ft) × Base Rate (₹1,200) × Rural Multiplier (1.25)',
                      result: '₹ 24,25,000 Total Base Value',
                      icon: Icons.landscape_rounded,
                      color: const Color(0xFF2E7D32),
                    ),
                    _buildCalcDetailCard(
                      step: '2. Built Structures & Physical Assets',
                      score: '23 / 25 Score',
                      formula: 'PWD Replacement Cost (₹7.20L RCC House + ₹1.30L Borewell & Boundary Wall)',
                      result: '₹ 8,50,000 Assessed Value',
                      icon: Icons.home_work_rounded,
                      color: const Color(0xFF0288D1),
                    ),
                    _buildCalcDetailCard(
                      step: '3. Trees & Agricultural Asset Valuation',
                      score: '22 / 25 Score',
                      formula: '10 Teak/Fruit Trees @ ₹25,000 + Standing Sugarcane Crop Yield Compensation',
                      result: '₹ 3,25,000 Valuation',
                      icon: Icons.park_rounded,
                      color: const Color(0xFFE65100),
                    ),
                    _buildCalcDetailCard(
                      step: '4. Solatium & Resettlement Equity',
                      score: '22 / 25 Score',
                      formula: '100% Solatium Grant (₹36L) + 200 Sq.m Plot Allotment + Resettlement Grant',
                      result: '₹ 36,00,000 Solatium + Plot',
                      icon: Icons.handshake_rounded,
                      color: const Color(0xFF7C3AED),
                    ),
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: Colors.teal.shade50,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: const Color(0xFF00695C).withValues(alpha: 0.3)),
                      ),
                      child: const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.check_circle_rounded, color: Color(0xFF00695C), size: 18),
                              SizedBox(width: 8),
                              Text('Total Calculated Equity Score', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF00695C))),
                            ],
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Sum of all category scores: 25 + 23 + 22 + 22 = 92 / 100. This indicates high compliance and equitable market benchmark alignment.',
                            style: TextStyle(fontSize: 11, color: Color(0xFF334155)),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      height: 44,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF00695C),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: () => Navigator.pop(ctx),
                        child: const Text('GOT IT', style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
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

  Widget _buildCalcDetailCard({
    required String step,
    required String score,
    required String formula,
    required String result,
    required IconData icon,
    required Color color,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(color: color.withValues(alpha: 0.15), shape: BoxShape.circle),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(child: Text(step, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12.5, color: Color(0xFF0F172A)))),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(4)),
                      child: Text(score, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 10)),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text('Formula: $formula', style: TextStyle(fontSize: 10.5, color: Colors.grey.shade700)),
                const SizedBox(height: 2),
                Text(result, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: color)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFaqTile(String q, String a) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ExpansionTile(
        title: Text(q, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            child: Text(a, style: TextStyle(fontSize: 12, color: Colors.grey.shade700, height: 1.4)),
          ),
        ],
      ),
    );
  }
}

// ============================================================================
// 9. SWADESH SAATHI AI CHATBOT INTERACTIVE MODAL SHEET
// ============================================================================

class SwadeshSaathiChatbotModal extends StatefulWidget {
  final LandownerProfile profile;
  final LandParcelDetails parcel;

  const SwadeshSaathiChatbotModal({
    super.key,
    required this.profile,
    required this.parcel,
  });

  @override
  State<SwadeshSaathiChatbotModal> createState() => _SwadeshSaathiChatbotModalState();
}

class _SwadeshSaathiChatbotModalState extends State<SwadeshSaathiChatbotModal> {
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool _isTyping = false;

  late final List<Map<String, dynamic>> _messages = [
    {
      'isUser': false,
      'text': 'Namaste ${widget.profile.name} ji! 🙏 I am **SWADESH Saathi**, your 24/7 AI Land Acquisition & Revenue Assistant.\n\nI have loaded your active parcel record for **Survey No. ${widget.parcel.surveyNumber} (${widget.parcel.village} Village)**.\n\nHow can I help you today?',
      'time': 'Just now',
    },
  ];

  final List<String> _suggestions = const [
    '💰 How is my compensation calculated?',
    '📝 What is my Section 15 objection status?',
    '📄 Explain Form 7 and Form 12 extracts',
    '🏡 What is my R&R Equity Score?',
    '📅 When is the next DILR survey date?',
  ];

  void _sendMessage(String messageText) {
    if (messageText.trim().isEmpty) return;

    final userMsg = messageText.trim();
    _textController.clear();

    setState(() {
      _messages.add({
        'isUser': true,
        'text': userMsg,
        'time': 'Just now',
      });
      _isTyping = true;
    });

    _scrollToBottom();

    // Generate intelligent AI response after short delay
    Future.delayed(const Duration(milliseconds: 800), () {
      if (!mounted) return;

      String botReply = '';
      final q = userMsg.toLowerCase();

      if (q.contains('compensation') || q.contains('calculated') || q.contains('money') || q.contains('amount') || q.contains('rate')) {
        botReply = '💰 **Compensation Calculation for Survey ${widget.parcel.surveyNumber}**:\n\n• **Acquired Area**: ${widget.parcel.areaRequiredHa} Hectares\n• **Base Market Rate**: ₹ 1,200 / sq.ft\n• **Calculated Base Value**: ₹ 24,25,000\n• **100% Solatium Grant**: ₹ 24,25,000 (as per RFCTLARR Act 2013)\n• **Total Payable Compensation**: **₹ 48,50,000**\n\nPayment will be directly disbursed to your Aadhaar-seeded Bank Account upon final award determination.';
      } else if (q.contains('objection') || q.contains('status') || q.contains('section 15')) {
        botReply = '📝 **Section 15 Objection Status**:\n\n• **Ref No**: OBJ-2026-004821\n• **Category**: Area Discrepancy & Boundary Re-verification\n• **Current Status**: **UNDER REVIEW**\n• **Assigned Officer**: Shri R. K. Patil (Circle Officer & DILR, Haveli Division)\n• **Next Step**: On-field physical re-survey scheduled for 28 September 2026.';
      } else if (q.contains('form 7') || q.contains('7/12') || q.contains('form 12') || q.contains('extract')) {
        botReply = '📄 **Land Title Record Summary**:\n\n• **Form 7 (Occupant Rights)**: Verified & e-Signed via e-Mahabhulekh (Khata No. 481)\n• **Form 12 (Crop Register)**: Verified (Irrigated Double-Crop Groundnut/Sugarcane)\n• **Property Card**: Certified (CTS-4821)\n• **Verification Status**: Title Confirmed & Legally Clear ✓';
      } else if (q.contains('r&r') || q.contains('equity') || q.contains('resettlement') || q.contains('score')) {
        botReply = '🏡 **Resettlement & Rehabilitation (R&R) Package**:\n\n• **R&R Equity Score**: **92 / 100**\n• **Plot Allotment**: 200 Sq.m developed plot in Sector-14 Housing Colony\n• **Resettlement Grant**: One-time allowance + vocational skill training grant for family members.';
      } else if (q.contains('survey') || q.contains('date') || q.contains('dilr') || q.contains('visit')) {
        botReply = '📅 **Field Survey Schedule**:\n\n• **Survey Date**: 28 September 2026 at 10:30 AM\n• **Survey Team**: District Inspector of Land Records (DILR), Haveli Division\n• **Location**: Survey No. 124/2, Waghala Village Corridor.';
      } else {
        botReply = 'Thank you for your question! As per the RFCTLARR Act 2013 guidelines for the SWADESH NH-48 Corridor Project, all landowner rights are protected under 60-day statutory provisions. You can also view official document copies under the **Notices** tab or check your compensation schedule under **Compensation**.';
      }

      setState(() {
        _isTyping = false;
        _messages.add({
          'isUser': false,
          'text': botReply,
          'time': 'Just now',
        });
      });

      _scrollToBottom();
    });
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.82,
      decoration: const BoxDecoration(
        color: Color(0xFFF8FAFC),
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        children: [
          // Header Bar
          Container(
            padding: const EdgeInsets.fromLTRB(16, 14, 12, 14),
            decoration: const BoxDecoration(
              color: Color(0xFF00695C),
              borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
            ),
            child: Row(
              children: [
                Stack(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: const BoxDecoration(
                        color: Colors.white24,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.smart_toy_rounded, color: Colors.white, size: 22),
                    ),
                    Positioned(
                      right: 0,
                      top: 0,
                      child: Container(
                        width: 9,
                        height: 9,
                        decoration: BoxDecoration(
                          color: const Color(0xFF22C55E),
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.white, width: 1.5),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Text(
                            'SWADESH Saathi AI',
                            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: const BoxDecoration(color: Colors.amber, borderRadius: BorderRadius.all(Radius.circular(6))),
                            child: const Text('24/7 AI', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: Colors.black)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Land Revenue & PAP Assistant • English / Marathi',
                        style: TextStyle(fontSize: 11, color: Colors.teal.shade100),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close_rounded, color: Colors.white),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          // Message Stream
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(14),
              itemCount: _messages.length + (_isTyping ? 1 : 0),
              itemBuilder: (ctx, i) {
                if (i == _messages.length && _isTyping) {
                  return Align(
                    alignment: Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 10),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: Colors.grey.shade300),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          SizedBox(
                            width: 12,
                            height: 12,
                            child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF00695C)),
                          ),
                          SizedBox(width: 8),
                          Text('SWADESH Saathi is typing...', style: TextStyle(fontSize: 12, color: Color(0xFF64748B))),
                        ],
                      ),
                    ),
                  );
                }

                final msg = _messages[i];
                final bool isUser = msg['isUser'] == true;

                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: isUser ? const Color(0xFF00695C) : Colors.white,
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(16),
                        topRight: const Radius.circular(16),
                        bottomLeft: Radius.circular(isUser ? 16 : 4),
                        bottomRight: Radius.circular(isUser ? 4 : 16),
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.05),
                          blurRadius: 4,
                          offset: const Offset(0, 2),
                        ),
                      ],
                      border: isUser ? null : Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          msg['text'],
                          style: TextStyle(
                            fontSize: 13,
                            height: 1.4,
                            color: isUser ? Colors.white : const Color(0xFF0F172A),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Align(
                          alignment: Alignment.bottomRight,
                          child: Text(
                            msg['time'],
                            style: TextStyle(
                              fontSize: 9.5,
                              color: isUser ? Colors.white70 : const Color(0xFF94A3B8),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),

          // Suggestion Chips
          Container(
            padding: const EdgeInsets.symmetric(vertical: 6),
            color: Colors.white,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Row(
                children: _suggestions.map((sug) {
                  return Padding(
                    padding: const EdgeInsets.only(right: 6),
                    child: ActionChip(
                      backgroundColor: Colors.teal.shade50,
                      side: BorderSide(color: Colors.teal.shade200),
                      label: Text(sug, style: const TextStyle(fontSize: 11, color: Color(0xFF00695C), fontWeight: FontWeight.bold)),
                      onPressed: () => _sendMessage(sug),
                    ),
                  );
                }).toList(),
              ),
            ),
          ),

          // Input Bar
          Container(
            padding: const EdgeInsets.fromLTRB(12, 8, 12, 14),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Color(0xFFE2E8F0))),
            ),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.mic_rounded, color: Color(0xFF00695C)),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Voice assistant listening... Speak now'),
                        backgroundColor: Color(0xFF00695C),
                      ),
                    );
                  },
                ),
                Expanded(
                  child: TextField(
                    controller: _textController,
                    onSubmitted: _sendMessage,
                    decoration: InputDecoration(
                      hintText: 'Ask SWADESH Saathi in Marathi or English...',
                      hintStyle: const TextStyle(fontSize: 12, color: Color(0xFF94A3B8)),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      filled: true,
                      fillColor: const Color(0xFFF1F5F9),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(24),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 6),
                CircleAvatar(
                  backgroundColor: const Color(0xFF00695C),
                  child: IconButton(
                    icon: const Icon(Icons.send_rounded, color: Colors.white, size: 18),
                    onPressed: () => _sendMessage(_textController.text),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
