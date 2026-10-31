SWADESH – TAHSILDAR WEB APPLICATION

Design a modern, professional, government-grade web-based dashboard called SWADESH for the Tahsildar Officer.

SWADESH is a Land Acquisition Management and Monitoring System used by the Revenue Department for managing and monitoring the complete land acquisition lifecycle.

The Tahsildar Web Application is a managerial and verification-level interface. It receives information from field-level Surveyors, including Talathis and Junior Engineers, collectively referred to as Surveyors in the system.

The Tahsildar is responsible for:

\- Monitoring land acquisition activities across multiple villages  
\- Managing assigned projects  
\- Reviewing Surveyor and Talathi verification data  
\- Reviewing objections and disputed ownership cases  
\- Verifying documents and bank details  
\- Approving or returning cases to the Surveyor/Talathi  
\- Reviewing compensation calculations  
\- Approving compensation-related information  
\- Issuing statutory notices to affected landowners  
\- Providing digitally signed approvals  
\- Monitoring payment and PFMS status  
\- Managing final mutation initiation after successful completion  
\- Monitoring overall land acquisition progress through analytics

This should be a desktop-first responsive web dashboard, not a mobile application.

\---

DESIGN STYLE

Create a clean, modern, professional, government-grade administrative dashboard.

The design should feel like a high-level government workflow management platform.

Use:

\- Professional green and blue colour palette  
\- White and light neutral backgrounds  
\- Clear typography  
\- Structured dashboard layout  
\- Data tables where large amounts of information need to be reviewed  
\- Cards for analytics and summary information  
\- Clear visual hierarchy  
\- Professional icons  
\- Soft borders and subtle shadows  
\- Responsive web design  
\- Proper spacing  
\- No unnecessary visual clutter

Use clear status colours:

🟢 Green — Verified / Approved / Completed

🟠 Orange — Pending / Under Process / Notice Pending

🔴 Red — Objection / Dispute / Delayed / Action Required

🔵 Blue — Information / Assigned / In Progress

The system should appear trustworthy, official, efficient, and suitable for the Indian Revenue Department.

\---

APPLICATION HEADER

Create a fixed top navigation bar.

The header should contain:

Left Side:

\- SWADESH Logo  
\- Revenue Department  
\- System Name: Land Acquisition Management System

Right Side:

\- Global Search  
\- Notification Bell  
\- Tahsildar Profile  
\- Profile Dropdown  
\- Logout Option

Example:

SWADESH | Revenue Department                          🔍  🔔  👤

Profile information should include:

\- Officer Name  
\- Role: Tahsildar  
\- Taluka / Jurisdiction  
\- Department  
\- Logout

\---

LEFT SIDEBAR NAVIGATION

Create a collapsible sidebar.

The main navigation options should be:

1\. Dashboard  
2\. Notifications  
3\. Objection List  
4\. My Tasks  
5\. Projects  
6\. Compensation & Calculation  
7\. Statutory Notices  
8\. Final Mutation

The sidebar should clearly indicate the currently active section.

Each major section should be a separate page rather than one long continuously scrolling page.

\---

SCREEN 1 – DASHBOARD

The Dashboard should provide a complete overview of the Tahsildar's land acquisition responsibilities.

Display high-level analytics cards.

Include:

Total Assigned Projects

Example:

12 Active Projects

Total Villages

Example:

48 Villages

Total Affected Land Parcels

Example:

8,450 Parcels

Pending Verification

Example:

1,240 Parcels

Under Objection / Dispute

Example:

320 Cases

Compensation Pending

Example:

580 Landowners

Delayed Cases

Example:

85 Cases

\---

DASHBOARD ANALYTICS

Include visual analytics.

Create:

\- Project progress chart  
\- Village-wise progress chart  
\- Verification status chart  
\- Objection status chart  
\- Compensation status chart

Use a combination of:

\- Donut charts  
\- Bar charts  
\- Progress indicators  
\- Summary cards

Display an important section:

WORK COMPLETED VS WORK PENDING

For example:

Total Assigned Work: 8,450 Parcels

Completed: 5,200

Pending: 2,100

Under Objection: 320

Delayed: 85

Display the progress visually.

\---

DASHBOARD NOTIFICATION PREVIEW

Display a small notification panel on the dashboard.

Show only work-related notifications.

Examples:

\- New Project Assigned  
\- New Village Added  
\- Award Generated  
\- Award Pending  
\- Compensation Approval Required  
\- Statutory Notice Pending  
\- Final Mutation Pending

Do NOT display detailed objection information inside the notification section.

Objection-specific information should only appear in the Objection List section.

Include:

\[View All Notifications\]

\---

SCREEN 2 – NOTIFICATIONS

Create a dedicated Notifications page.

This page should display only official work and workflow notifications.

Categories can include:

\- New Project Notifications  
\- Award Generation Notifications  
\- Compensation Notifications  
\- Notice Generation Notifications  
\- Payment Status Notifications  
\- Final Mutation Notifications  
\- Task Assignment Notifications

Examples:

🔔 New Project Assigned

Project ID: PRJ-MH-2026-102

You have been assigned to review 245 affected parcels.

Time: Today, 10:30 AM

\---

🔔 Award Generated

Project ID: PRJ-MH-2026-088

The land acquisition award has been generated and requires further action.

\---

Important:

Do not display detailed objections or landowner dispute descriptions on this page.

The Notifications section should focus only on work and workflow updates.

\---

SCREEN 3 – OBJECTION LIST

Create a dedicated Objection List section.

This section should automatically receive cases marked as:

🔴 Dispute Verification

from the Surveyor/Talathi workflow.

Display cases where:

\- Ownership requires verification  
\- Land records contain discrepancies  
\- Document information is ambiguous  
\- Bank details have verification issues  
\- Landowner has raised an objection  
\- Compensation is under protest  
\- Other land acquisition disputes require Tahsildar attention

Use a professional data table.

Columns should include:

\- Objection ID  
\- Project ID  
\- Village  
\- Parcel ID  
\- Landowner Name  
\- Objection Type  
\- Raised By  
\- Date Raised  
\- Current Status  
\- Action

Example statuses:

\- New  
\- Under Review  
\- Sent Back  
\- Resolved  
\- Under Protest

When a case is selected, open a detailed Objection Review page.

\---

OBJECTION DETAIL PAGE

Display:

Basic Information

\- Project Name  
\- Project ID  
\- Village  
\- Parcel ID  
\- Survey Number  
\- Landowner Name

Objection Details

\- Objection Type  
\- Issue Description  
\- Date Raised  
\- Raised By  
\- Supporting Documents  
\- Surveyor Remarks

Document Comparison

Display the relevant documents and verification information.

The Tahsildar should have options:

\[Approve Resolution\]

\[Send Back to Talathi\]

\[Request Additional Information\]

\[Keep Under Review\]

All actions should update the workflow status.

\---

SCREEN 4 – MY TASKS

The My Tasks section should be organized primarily according to the Tahsildar's jurisdiction.

The Tahsildar manages multiple villages.

Therefore, provide:

Project Filter

Select Project ID ▼

Village Filter

Select Village ▼

The Tahsildar should be able to:

1\. Select a Project  
2\. View all villages under that project  
3\. Select an individual village  
4\. View land acquisition progress for that village

\---

VILLAGE-WISE TASK MANAGEMENT

Display a village-wise table.

Columns should include:

\- Village Name  
\- Total Parcels  
\- Verified  
\- Pending  
\- Under Notice  
\- Compensation Due  
\- Delayed  
\- Progress  
\- Action

Each village can be clicked to view detailed information.

\---

INDIVIDUAL LAND PARCEL STATUS

Inside a selected village, display affected land parcels and landowners.

Statuses include:

🟢 Verified

🟠 Pending

🔵 Under Notice

🟣 Compensation Due

🔴 Delayed

For delayed cases, prominently display:

\- Delay Date  
\- Due Date  
\- Days Remaining

\---

DELAYED CASE LOGIC

When a Surveyor or Talathi marks a case as delayed or raises an issue requiring Tahsildar action, the system should track the resolution deadline.

Default example:

Objection Raised: 01 September 2026

Due Date: 16 September 2026

The interface should clearly highlight approaching or overdue cases.

Use:

\- Green for cases within time  
\- Orange for approaching deadline  
\- Red for overdue cases

\---

SCREEN 5 – PROJECTS

Create a comprehensive Projects section.

At the top, provide a search bar.

Search using:

\- Project ID  
\- Project Name  
\- Village  
\- Parcel ID  
\- Landowner Name

When the Tahsildar selects a project, display a Project Overview page.

\---

PROJECT OVERVIEW

Display:

\- Project Image or Representative Project Photograph  
\- Project Name  
\- Project ID  
\- Project Type  
\- Basic Project Details  
\- Total Affected Land  
\- Total Affected Parcels  
\- Total Affected Landowners  
\- Project Location

Display a summary of land parcels in a compact one-line list or table.

Example:

Parcel ID | Survey Number | Village | Landowner | Area | Status | Action

Clicking a parcel should open complete parcel details.

\---

PROJECT-WISE VILLAGE SEGREGATION

Within every project, provide village-level segregation.

Example:

PROJECT ID: PRJ-MH-2026-101

Villages:

\- Village A — 120 Parcels  
\- Village B — 210 Parcels  
\- Village C — 85 Parcels

When a village is selected, display all affected persons.

The affected landowner table should include:

\- Landowner Name  
\- Parcel ID  
\- Survey Number  
\- Land Area  
\- Verification Status  
\- Notice Status  
\- Compensation Status  
\- Action

\---

DOCUMENT AND BANK DETAIL VERIFICATION

Document verification and field verification are performed by the Talathi/Surveyor.

The Tahsildar should be able to review the verification results.

Display:

Document Verification Status

\- Satbara / 7-12 Extract  
\- 8A Extract  
\- Ownership Verification  
\- Other Land Records

Bank Verification Status

\- Account Holder Name  
\- Bank Name  
\- Account Verification Status  
\- Supporting Documents

The Tahsildar should not need to enter these details again.

All information should be fetched from the database and Surveyor verification workflow.

The Tahsildar should have two primary actions:

\[Approve\]

\[Send Back to Talathi\]

If information is incomplete or incorrect, the Tahsildar can send the case back with remarks.

\---

DIGITAL SIGNATURE APPROVAL

When approving important verification stages, provide:

\[Digitally Sign & Approve\]

The system should support uploading or applying an authorized digital signature.

Before final submission, display a confirmation modal.

Example:

You are approving:

Project: XYZ Project

Parcel ID: MH-PL-10234

Landowner: Ram Patil

Status will change to:

APPROVED

\[Cancel\]     \[Digitally Sign & Approve\]

The system should maintain an approval record with:

\- Officer Name  
\- Role  
\- Date  
\- Time  
\- Approval Status

\---

SCREEN 6 – COMPENSATION AND CALCULATION

Create a dedicated Compensation and Calculation section.

The Tahsildar does not manually calculate the compensation values.

The compensation calculation should be automatically performed by the backend and database based on official data.

The Tahsildar's role is to:

\- Review calculated values  
\- Verify compensation details  
\- Approve or return the calculation  
\- Digitally sign approved compensation

\---

SUB-REGISTRAR OFFICE DATA

The system should retrieve land valuation information from the relevant Sub-Registrar Office data source.

Display:

\- Official Land Value  
\- Land Valuation Rate  
\- Relevant Market Value  
\- Reference Date  
\- Data Source  
\- Verification Status

If required, the system should show whether official valuation data has been received.

Example:

Sub-Registrar Data

Status: Received

Reference Value: ₹XX per square metre

\---

LAND ACQUISITION COMPENSATION DETAILS

For every landowner, display:

\- Landowner Name  
\- Parcel ID  
\- Total Land Area  
\- Area Being Acquired  
\- Land Rate  
\- Base Land Compensation

The backend should calculate:

Base Land Compensation

\+ 

Asset Compensation

\+ 

Applicable Additional Components

\=

Total Calculated Compensation

\---

ASSET COMPENSATION

If the landowner has verified assets, include them in the calculation.

Examples:

\- Trees  
\- Wells  
\- Buildings  
\- Structures  
\- Other verified assets

Example:

Land Compensation: ₹10,00,000

Tree Compensation: ₹2,00,000

Well Compensation: ₹1,50,000

Total Compensation:

₹13,50,000

Clearly indicate that the amount is calculated automatically through the backend and database.

\---

COMPENSATION REVIEW ACTIONS

The Tahsildar can:

\[Approve Compensation\]

\[Send Back for Review\]

\[Request Clarification\]

When approving:

\[Digitally Sign & Approve\]

After approval, update the landowner compensation workflow.

\---

LANDOWNER RESPONSE STATUS

After compensation details are approved, the system should track the landowner's response.

Possible statuses:

🟢 Accepted

🟠 Awaiting Response

🔴 Under Protest

If:

Accepted

The case proceeds toward payment processing.

Status:

Under PFMS Processing

If:

Under Protest

The case should automatically appear in the Objection List.

\---

SCREEN 7 – STATUTORY NOTICES

Create a Statutory Notice Management section.

The Tahsildar must issue official notices to affected landowners.

The system should provide government-approved notice templates.

\---

NOTICE GENERATION

When a parcel and landowner are selected, automatically fetch information from the database.

Auto-fill:

\- Landowner Name  
\- Address  
\- Project Name  
\- Project ID  
\- Parcel ID  
\- Survey Number  
\- Land Area Being Acquired  
\- Relevant Compensation Information  
\- Notice Reference Number

The Tahsildar should review the generated notice before approval.

Actions:

\[Preview Notice\]

\[Edit Permitted Fields\]

\[Verify\]

\[Digitally Sign\]

\[Approve for Printing\]

\---

PRINT AND DIGITAL DELIVERY

After Tahsildar approval:

1\. The notice should be marked:

Ready for Printing

2\. A printable version should be generated.

3\. The notice should be delivered through the official workflow to the registered mobile number of the affected landowner.

The interface should display delivery status, such as:

\- Generated  
\- Approved  
\- Printed  
\- Sent  
\- Delivered  
\- Failed

The system should clearly distinguish between physical notice delivery and digital notification/delivery.

\---

LANDOWNER ACCESS INFORMATION

The system should maintain the landowner's contact details from the database.

After the notice is issued, the landowner should be able to access the land acquisition portal.

The system can provide landowner access credentials or an account activation process.

The landowner portal should allow them to:

\- Check land acquisition status  
\- View parcel information  
\- View notices  
\- View compensation details where permitted  
\- Raise objections  
\- Track objection status

Do not display or expose sensitive credentials unnecessarily on the Tahsildar dashboard.

\---

SCREEN 8 – FINAL MUTATION

Create a Final Mutation section.

This is the final stage after:

\- Land verification is complete  
\- Required documents are approved  
\- Objections are resolved or absent  
\- Compensation workflow is completed  
\- Required approvals are complete

\---

FINAL MUTATION WORKFLOW

Display eligible cases.

Example:

Project ID

↓

Village

↓

Parcel

↓

Landowner

↓

Verification Complete

↓

Compensation Complete

↓

No Active Objection

↓

Eligible for Final Mutation

The Tahsildar should review the final case.

\---

FINAL MUTATION APPROVAL

Before initiating the final mutation, display:

\- Project Details  
\- Parcel Details  
\- Landowner Details  
\- Verification Status  
\- Compensation Status  
\- Objection Status  
\- Final Eligibility Status

Actions:

\[Send Back\]

\[Digitally Sign & Approve Final Mutation\]

The Tahsildar's approval should require digital signature authorization.

\---

FINAL MUTATION NOTIFICATION

After final approval:

The system should send a Final Mutation Notification to the Talathi.

Example:

Final Mutation Required

Project ID: PRJ-MH-2026-101

Parcel ID: MH-PL-10234

Landowner: Ram Patil

Status: Approved for Mutation

The Talathi receives the notification and performs the mutation-related update in their workflow.

This should reduce duplicate data entry and unnecessary repetition of verification work.

\---

MUTATION STATUS TRACKING

Display the complete mutation workflow.

Example:

Verification Completed

↓

Compensation Approved

↓

Payment Completed

↓

Final Mutation Approved

↓

Notification Sent to Talathi

↓

Mutation Updated

↓

Case Completed

Use a clear visual progress tracker.

\---

GLOBAL SEARCH

Provide search functionality across relevant sections.

The Tahsildar should be able to search using:

\- Project ID  
\- Project Name  
\- Village  
\- Parcel ID  
\- Survey Number  
\- Landowner Name

Search results should show the relevant category and allow direct navigation.

\---

NOTIFICATION SYSTEM

The system should include a global notification system.

Notifications may include:

\- New project assigned  
\- Award generated  
\- Award pending  
\- Document verification pending  
\- Compensation awaiting approval  
\- Notice pending  
\- Landowner response received  
\- PFMS status updated  
\- Final mutation pending  
\- Final mutation completed

Do not use the global notification panel as a replacement for the dedicated Objection List.

Objection cases should remain primarily managed through the Objection List workflow.

\---

COMPLETE TAHSILDAR WORKFLOW

Design the application according to the following workflow:

SURVEYOR / TALATHI FIELD VERIFICATION

↓

DOCUMENT VERIFICATION

↓

OWNERSHIP VERIFICATION

↓

CASE SUBMITTED TO TAHSILDAR

↓

TAHSILDAR REVIEW

↓

APPROVE

OR

SEND BACK TO TALATHI

↓

COMPENSATION DATA RECEIVED

↓

AUTOMATIC BACKEND CALCULATION

↓

TAHSILDAR VERIFICATION

↓

DIGITAL SIGNATURE APPROVAL

↓

LANDOWNER NOTIFIED

↓

LANDOWNER RESPONSE

↓

ACCEPTED

OR

UNDER PROTEST

↓

IF UNDER PROTEST

→ OBJECTION LIST

↓

IF ACCEPTED

→ PFMS PAYMENT PROCESSING

↓

PAYMENT COMPLETED

↓

FINAL MUTATION REVIEW

↓

DIGITAL SIGNATURE APPROVAL

↓

FINAL MUTATION NOTIFICATION SENT TO TALATHI

↓

MUTATION UPDATED

↓

CASE COMPLETED

\---

REQUIRED SCREENS

Generate complete, high-fidelity web application screens for:

1\. Tahsildar Login Screen  
2\. Main Dashboard  
3\. Dashboard Analytics  
4\. Notifications Page  
5\. Objection List  
6\. Objection Detail and Review  
7\. My Tasks  
8\. Village-Wise Task Dashboard  
9\. Delayed Cases  
10\. Projects List  
11\. Project Overview  
12\. Village-Wise Project Details  
13\. Affected Landowner Table  
14\. Land Parcel Detail Page  
15\. Document Verification Review  
16\. Bank Details Verification Review  
17\. Digital Approval Interface  
18\. Compensation Dashboard  
19\. Individual Compensation Calculation Review  
20\. Sub-Registrar Value Details  
21\. Asset Compensation Details  
22\. Landowner Response Status  
23\. Statutory Notice List  
24\. Notice Generation Interface  
25\. Notice Preview  
26\. Print Approval Interface  
27\. Final Mutation Dashboard  
28\. Final Mutation Review  
29\. Digital Signature Approval  
30\. Mutation Status Tracker  
31\. Tahsildar Profile and Logout

\---

FINAL DESIGN REQUIREMENTS

Generate a complete, connected, high-fidelity web application interface.

The application should demonstrate realistic navigation and workflow connections between all modules.

Use realistic Indian land acquisition sample data, including:

\- Indian landowner names  
\- Maharashtra village names  
\- Project IDs  
\- Parcel IDs  
\- Survey numbers  
\- Land area measurements  
\- Sample government-style documents  
\- Indian currency formatting

The design must clearly distinguish between:

\- Surveyor-level verification  
\- Tahsildar-level review and approval  
\- Backend/database calculations  
\- Landowner actions  
\- Payment processing  
\- Final mutation

The Tahsildar should primarily act as a manager, reviewer, verifier, and approval authority, rather than manually entering field-level data or manually performing compensation calculations.

Create a consistent, production-ready design system for the complete SWADESH Tahsildar Web Application.  
