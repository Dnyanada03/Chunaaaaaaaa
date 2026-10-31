import re

def fix_all():
    with open('lib/mobile_frontend/pages/sia_expert.dart', 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('_childrenCtrl', '_childrenUnder18Ctrl')
    content = content.replace('_disabledCtrl', '_disabledCountCtrl')

    content = content.replace(
        "Text('Hearing ID: ${h.id}', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0284C7)),",
        "Text('Hearing ID: ${h.id}', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0284C7))),"
    )
    content = content.replace(
        "child: Text(\n                              h.status.toUpperCase()),\n                              style: TextStyle(",
        "child: Text(\n                              h.status.toUpperCase(),\n                              style: TextStyle("
    )
    content = content.replace(
        "Text('Schedule: ${h.date} at ${h.time}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),",
        "Text('Schedule: ${h.date} at ${h.time}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF00897B))),"
    )
    content = content.replace(
        "label: Text(h.minutesUploaded ? 'Download Minutes' : 'Upload Minutes PDF')),\n                            ),",
        "label: Text(h.minutesUploaded ? 'Download Minutes' : 'Upload Minutes PDF'),\n                            ),"
    )

    with open('lib/mobile_frontend/pages/sia_expert.dart', 'w', encoding='utf-8') as f:
        f.write(content)

    with open('lib/mobile_frontend/pages/surveyor.dart', 'r', encoding='utf-8') as f:
        s_content = f.read()

    s_content = s_content.replace(
        "child: Text(poly.surveyNo,\n                          style: const TextStyle(\n                            color: Color(0xFFFACC15)),\n                            fontSize: 10,\n                            fontWeight: FontWeight.bold,\n                          ),",
        "child: Text(poly.surveyNo,\n                          style: const TextStyle(\n                            color: Color(0xFFFACC15),\n                            fontSize: 10,\n                            fontWeight: FontWeight.bold,\n                          ),"
    )
    s_content = s_content.replace(
        "TextButton(onPressed: () => Navigator.pop(context), child: Text('Cancel'))),",
        "TextButton(onPressed: () => Navigator.pop(context), child: Text('Cancel')),"
    )
    s_content = s_content.replace(
        "child: Text('Save Asset')),",
        "child: Text('Save Asset'),"
    )
    s_content = s_content.replace(
        "Text('Parcel ID: ${parcel.id}', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF00897B)),",
        "Text('Parcel ID: ${parcel.id}', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF00897B))),"
    )

    with open('lib/mobile_frontend/pages/surveyor.dart', 'w', encoding='utf-8') as f:
        f.write(s_content)

if __name__ == '__main__':
    fix_all()
    print("Fix script completed.")
