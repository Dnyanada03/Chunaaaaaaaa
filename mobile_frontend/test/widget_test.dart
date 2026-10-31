import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_frontend/mobile_frontend/pages/surveyor.dart';

void main() {
  testWidgets('SWADESH App smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const SwadeshApp());

    // Verify that SWADESH title exists on login screen.
    expect(find.text('SWADESH'), findsWidgets);
  });
}
