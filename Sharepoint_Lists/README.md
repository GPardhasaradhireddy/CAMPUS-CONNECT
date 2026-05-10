# Campus Connect - SharePoint Lists (Database)

Welcome to the **SharePoint Lists** module of the **Campus Connect** project. This directory contains visual documentation of the Microsoft SharePoint lists that act as the secure, centralized database for the entire platform.

## Overview

Microsoft SharePoint is utilized as the primary backend data source for Campus Connect. It provides a scalable, secure, and easily manageable environment for storing all relational data, user credentials, academic records, and form submissions. The Power Apps frontend and Power Automate workflows read from and write to these lists in real-time.

## Key Database Tables (Lists)

The screenshots in this folder document the structure of several critical lists:

### 1. UserCredential List
Manages authentication, roles, and access control.
**Key Columns:**
- `User Name` (Roll Number)
- `Password` (Encrypted/Hashed)
- `Role` (Admin, Reviewer, Viewer, Dashboard)
- `User_Email`
- `OTP` (For 2FA / Password Recovery)

### 2. Personal_Details List
Stores the demographic and contact information of the students.
**Key Columns:**
- `Name` & `User Name` (Roll Number)
- `Email` & `Phone Number`
- `Date of Birth`
- `Guardian Name` & `Guardian Number`
- `Entrance Type` (e.g., Convenor, Management)

### 3. Other Integrated Lists (Visible in Navigation)
- **`AcdemicDetails`**: Stores CGPA, SGPA, Backlogs, and Attendance.
- **`Fee_details`**: Tracks tuition and hostel fee payments/dues.
- **`AppUsers` / `pass_fail`**: Additional user management and grading data.
- **Form Data Lists**: `Cultural Form`, `Placement Form`, and `Event Customization` lists directly capture data from Microsoft Forms and Power Apps inputs.

## Security & Data Integrity
- **Role-Based Access Control (RBAC):** Access to these SharePoint lists is strictly governed by the roles defined in the `UserCredential` list.
- **Version History:** SharePoint automatically tracks changes to list items, providing an audit trail for admin actions.
- **Integration:** Serves as the single source of truth for Snowflake Data Warehouse syncs.

---
*These SharePoint lists form the structural foundation of Campus Connect, ensuring data is always accessible, secure, and highly structured.*
