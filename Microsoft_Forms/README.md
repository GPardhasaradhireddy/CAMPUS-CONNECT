# Campus Connect - Microsoft Forms

Welcome to the **Microsoft Forms** module of the **Campus Connect** project. This directory contains visual documentation and screenshots of the customized forms used for structured data collection across the platform.

## Overview

To ensure standardized and efficient data entry, Campus Connect utilizes customized Microsoft Forms for various modules. These forms are integrated directly into the platform, allowing students and administrators to submit information seamlessly. The data collected triggers automated workflows via Power Automate and is securely stored in Microsoft SharePoint.

## Form Modules

The screenshots in this folder document the design, fields, and configuration of the following key forms:

### Cultural Event Form
Designed to streamline participation in college cultural activities.
**Key Fields:**
- Name & Roll Number
- Department & Year
- Performance Type (e.g., Singing, Dancing, etc.)
- College Mail
- Attachments & Title

### Notice Creation Form
Used by administrators to generate and broadcast official announcements to the student body.
**Key Fields:**
- Notice Heading
- Notice Description
- Created Date
- Notice Type
- Attachments

### Event Registration Form
A comprehensive form for students to register for various campus events such as hackathons, seminars, and workshops.
**Key Fields:**
- Name, Roll Number, Department, Year, Program
- Event Name & Event Logo
- Event Description & Type
- Event Link

## Integration & Workflow

1. **Submission:** A user fills out the embedded form.
2. **Automation Trigger:** Form submission triggers a Power Automate flow.
3. **Data Storage:** Form responses are parsed and stored in structured SharePoint Lists.
4. **Action:** Depending on the form type, notifications are sent, or approval workflows are initiated.

---
*These forms are crucial touchpoints in the Campus Connect ecosystem, ensuring data is collected cleanly, accurately, and consistently.*
