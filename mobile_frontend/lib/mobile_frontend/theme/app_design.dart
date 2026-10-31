import 'package:flutter/material.dart';

/// Centralized Design System for SWADESH Mobile Applications
/// Defines color palette, typography styles, button controls, chips, 
/// and base screen notice item elements used across Landowner, SIA Expert, and Surveyor applications.

class AppColors {
  // Brand & Primary Theme Colors
  static const Color primaryTeal = Color(0xFF00695C);
  static const Color primaryDarkTeal = Color(0xFF004D40);
  static const Color secondaryGreen = Color(0xFF2E7D32);
  static const Color accentTeal = Color(0xFF0288D1);

  // Surface & Neutral Colors
  static const Color backgroundLight = Color(0xFFF8FAFC);
  static const Color surfaceWhite = Colors.white;
  static const Color borderSlate = Color(0xFFCBD5E1);

  // Text Colors
  static const Color textDark = Color(0xFF0F172A);
  static const Color textMedium = Color(0xFF475569);
  static const Color textMuted = Color(0xFF64748B);
  static const Color textSubtle = Color(0xFF94A3B8);

  // Chip & Badge Colors
  static Color chipBackground = Colors.teal.shade50;
  static Color chipBorder = Colors.teal.shade200;
  static const Color chipText = Color(0xFF00695C);

  // Accent & Alert Colors
  static const Color dangerRed = Color(0xFFDC2626);
  static const Color warningAmber = Color(0xFFD97706);
}

class AppTypography {
  static const TextStyle titleBold = TextStyle(
    fontSize: 15,
    fontWeight: FontWeight.bold,
    color: AppColors.textDark,
  );

  static const TextStyle refNumber = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    color: AppColors.textMedium,
  );

  static const TextStyle description = TextStyle(
    fontSize: 12,
    color: AppColors.textMuted,
    height: 1.3,
  );

  static const TextStyle dateText = TextStyle(
    fontSize: 12,
    color: AppColors.textMuted,
  );

  static const TextStyle chipLabel = TextStyle(
    color: AppColors.chipText,
    fontWeight: FontWeight.bold,
    fontSize: 11,
  );

  static const TextStyle fileSizeText = TextStyle(
    color: AppColors.textSubtle,
    fontSize: 11,
  );
}

/// Category / Status Chip Element
class AppBadgeChip extends StatelessWidget {
  final String label;

  const AppBadgeChip({super.key, required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: AppColors.chipBackground,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.chipBorder),
      ),
      child: Text(
        label,
        style: AppTypography.chipLabel,
      ),
    );
  }
}

/// Styled Outlined View Action Button
class AppViewButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String label;

  const AppViewButton({
    super.key,
    required this.onPressed,
    this.label = 'View',
  });

  @override
  Widget build(BuildContext context) {
    return OutlinedButton.icon(
      onPressed: onPressed,
      icon: const Icon(Icons.visibility_rounded, size: 16),
      label: Text(label),
    );
  }
}

/// Styled Primary Download Action Button
class AppDownloadButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String label;

  const AppDownloadButton({
    super.key,
    required this.onPressed,
    this.label = 'Download',
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primaryTeal,
        foregroundColor: Colors.white,
      ),
      onPressed: onPressed,
      icon: const Icon(Icons.download_rounded, size: 16),
      label: Text(label),
    );
  }
}

/// Base Screen Document Notice Item (Without Outer Box Container)
class NoticeDocumentItem extends StatelessWidget {
  final String type;
  final String date;
  final String title;
  final String refNumber;
  final String description;
  final String fileSize;
  final VoidCallback onView;
  final VoidCallback onDownload;
  final bool showDivider;

  const NoticeDocumentItem({
    super.key,
    required this.type,
    required this.date,
    required this.title,
    required this.refNumber,
    required this.description,
    required this.fileSize,
    required this.onView,
    required this.onDownload,
    this.showDivider = true,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              AppBadgeChip(label: type),
              Text(date, style: AppTypography.dateText),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            title,
            softWrap: true,
            style: AppTypography.titleBold,
          ),
          const SizedBox(height: 4),
          Text('Ref No: $refNumber', style: AppTypography.refNumber),
          const SizedBox(height: 6),
          Text(description, softWrap: true, style: AppTypography.description),
          const Divider(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Size: $fileSize', style: AppTypography.fileSizeText),
              Row(
                children: [
                  AppViewButton(onPressed: onView),
                  const SizedBox(width: 8),
                  AppDownloadButton(onPressed: onDownload),
                ],
              ),
            ],
          ),
          if (showDivider) ...[
            const SizedBox(height: 12),
            const Divider(thickness: 1, color: AppColors.borderSlate),
            const SizedBox(height: 4),
          ],
        ],
      ),
    );
  }
}
