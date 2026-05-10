# Campus Connect - System Architecture & Chart Presentation

Welcome to the **Chart Presentation** module of the **Campus Connect** project. This folder contains the high-level system architecture diagrams and conceptual models that drive the "Campus Connect" digital platform.

## Overview

**Campus Connect** is a smart, one-stop digital platform designed to unify all campus services for students and administration. It transforms manual, scattered processes into a centralized, scalable, and intelligent system.

### Key Problem Statements Addressed
- Decentralized notices and slow, manual leave forms.
- Difficult-to-track complaints and scattered event registration.
- Fragmented academic details, placement/internship info, and anti-ragging reports.
- Administrative bottlenecks in managing student requests.

### Objectives
- Provide a single digital platform for all campus services.
- Simplify student requests, applications, and complaint tracking.
- Improve communication between students and the college.
- Leverage AI for priority prediction, duplicate detection, and 24/7 chatbot support.
- Ensure anti-ragging safety and transparency.

## System Architecture

The architecture is built on a robust, modern technology stack:

- **Frontend (Power Apps):** Responsive web and mobile applications with role-based access for students and admins.
- **Backend & Data (Microsoft SharePoint):** Document management, secure storage, and list/form data storage with access control.
- **Automation (Power Automate):** Approval workflows, email notifications, status updates, and automated escalations.
- **AI Capabilities (AI Builder & Copilot Studio):** 
  - **AI Builder:** Smart categorization, duplicate detection, and priority prediction for leaves/complaints.
  - **Copilot Studio + GROQ AI:** 24/7 personalized chatbot providing fast, accurate responses to student queries.
- **Data Warehouse (Snowflake):** Centralized data integration, secure scalable storage, and high-performance analytics.

## Main Features

1. **Student Profile:** Marks, attendance, backlogs, and fee dues.
2. **Event Registration:** Workshops, hackathons, seminars, and cultural events.
3. **Notices & Updates:** Exam notices, placement alerts, and announcements.
4. **Leave Management:** Online application, AI-based priority tracking, and approval status.
5. **Complaint Tracking:** Hostel, bus, infrastructure, and ragging complaints.
6. **Placement / Internship:** Opportunities viewing, online application, and drive updates.
7. **Anti-Ragging Form:** Anonymous reporting, track status, and awareness info.
8. **Admin Dashboard:** Manage requests, update notices, assign complaints, and monitor usage analytics.

## Workflows

### Student Workflow
`Login` ➔ `Home Page` ➔ `Select Service` ➔ `Fill Form/View Info` ➔ `Submit Request` ➔ `Track Status`

### Admin Workflow
`Admin Login` ➔ `Admin Dashboard` ➔ `View Requests` ➔ `Approve/Reject` ➔ `Notify Student`

---
*This directory serves as the visual and structural blueprint for the Campus Connect ecosystem.*
