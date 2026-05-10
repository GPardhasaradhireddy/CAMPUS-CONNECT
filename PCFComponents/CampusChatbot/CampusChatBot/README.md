# Campus Connect AI Chatbot - TypeScript-only PCF Upgrade

This upgrade keeps the existing floating PCF chatbot behavior and improves it into a Campus Connect AI assistant with:

- Floating 3D-style chatbot icon at bottom-left
- Responsive popup chat window
- Personalized student context through PCF properties
- NotebookLM-style source upload UI
- File upload support UI for PDF, DOCX, PPTX, CSV, XLSX, TXT, JSON, images, and code files
- Future RAG-ready placeholder functions
- Voice input using browser SpeechRecognition API
- Text-to-speech output using SpeechSynthesis API
- Avatar mode placeholder
- Smart quick actions
- Complaint category, priority, duplicate, and routing placeholders
- Clean TypeScript-only architecture without React/TSX

## Folder Structure

```text
CampusConnectChatbot/
├── ControlManifest.Input.xml
├── index.ts
├── types.ts
├── styles.ts
├── collegeKnowledgeBase.ts
├── chatbotEngine.ts
├── fileUploadHelper.ts
├── voiceAssistant.ts
├── complaintAIPlaceholder.ts
└── package.json
```

## Build Commands

```powershell
pac pcf init --namespace CampusConnect --name CampusChatBot --template field --framework none
```

Replace the generated files with the files from this folder.

Then run:

```powershell
npm install
npm run refreshTypes
npm run build
npm start
```

## Create Solution and Import

```powershell
mkdir CampusConnectSolution
cd CampusConnectSolution
pac solution init --publisher-name CampusConnect --publisher-prefix cc
pac solution add-reference --path ..\CampusConnectChatbot
msbuild /t:build /restore
```

Upload the generated solution ZIP from the `bin\debug` or `bin\release` folder into Power Apps / Power Platform Admin Center.

## Power Apps Property Mapping Examples

Set these component properties from your current logged-in student data:

```powerfx
studentName = varStudent.Name
rollNumber = varStudent.RollNo
department = varStudent.Department
year = varStudent.Year
cgpa = Text(varStudent.CGPA)
attendance = Text(varStudent.Attendance) & "%"
backlogs = Text(varStudent.Backlogs)
skills = Concat(varStudentSkills, SkillName, ", ")
complaintStatus = varLatestComplaint.Status
themeColor = "#ac3e0b"
botName = "Campus Connect AI"
enableVoice = true
enableFileUpload = true
enableAvatarMode = true
collegeName = "Aditya College of Engineering & Technology"
userRole = varUserRole
```

Use output properties in Power Apps:

```powerfx
Chatbot.LastUserMessage
Chatbot.LastBotResponse
Chatbot.UploadedFileName
Chatbot.SelectedQuickAction
Chatbot.DetectedComplaintCategory
Chatbot.PredictedPriority
Chatbot.ChatbotEvent
```

## Future RAG Integration Plan

1. Store notes, announcements, complaints, profiles, and academic files in SharePoint/Snowflake.
2. On file upload, send file metadata and extracted text to a Power Automate flow.
3. Use an embedding model to create vector embeddings for chunks.
4. Store chunk text, metadata, student/department scope, and embeddings in Snowflake.
5. On each chatbot question, retrieve top matching chunks using semantic search.
6. Pass retrieved context into the AI model with student profile context.
7. Return cited answers with file/source names.
8. Add permission filtering so students only access allowed materials.
9. Add auto-sync when faculty upload new notes or admins update announcements.
10. Add duplicate complaint search using embedding similarity.

## Important Production Note

The current code preserves your existing Power Automate HTTP endpoint pattern. For production, move the flow URL into a secure environment variable or backend proxy so the endpoint is not exposed inside the frontend PCF bundle.
