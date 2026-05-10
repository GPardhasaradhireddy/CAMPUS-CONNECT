# Campus Connect - Power Automate Flows

Welcome to the **Power Automate Flows** module of the **Campus Connect** project. This directory contains architectural screenshots of the automated workflows that power the backend business logic, approvals, and AI integrations of the platform.

## Overview

Microsoft Power Automate is the engine driving the automated processes within Campus Connect. By connecting Power Apps, SharePoint, and AI capabilities, these flows eliminate manual administrative tasks, reduce processing times, and ensure seamless communication through automated emails and status updates.

## Key Workflows Demonstrated

### 1. Leave Request Flow (AI-Powered)
A highly intelligent workflow that automates the handling of student leave applications.
- **Trigger:** Initiated when a new leave request is created in SharePoint.
- **AI Processing:** Utilizes AI Builder prompts to analyze the request, extracting `Priority`, `AI Reasons`, and `Recommendations`.
- **Intelligent Routing:** A Switch case automatically routes and tags the request as *High*, *Moderate*, or *Default* priority based on AI analysis.
- **Approval Process:** Routes the request to the appropriate faculty/admin for approval.
- **Outcome Notifications:** Automatically updates the database and sends approval/rejection emails to the student.

### 2. Hostel Complaint Flow
Streamlines the resolution of infrastructure and hostel issues.
- **Trigger:** Initiated when a new complaint is registered.
- **Approval & Assignment:** Starts an approval process to validate and assign the complaint to the respective department.
- **Status Updates:** Uses conditional logic (True/False) to update the complaint status and notify the student of the resolution progress via email.

### 3. HTTP Request Flow
Handles external integrations and API communications.
- **Trigger:** Manual or programmatic trigger.
- **Execution:** Performs outbound HTTP requests to connect Campus Connect with external services, third-party APIs, or the custom Groot backend.
- **Response Handling:** Processes the response payload for use within the Power Platform ecosystem.

## Value Delivered
- **Zero Manual Routing:** Requests automatically reach the right personnel.
- **AI-Enhanced Decision Making:** Approvers get AI-generated context and priority flags, enabling faster decisions.
- **Transparency:** Students receive instant email updates at every stage of their request.

---
*These flow diagrams showcase the robust, event-driven architecture that makes Campus Connect a truly 'smart' platform.*
