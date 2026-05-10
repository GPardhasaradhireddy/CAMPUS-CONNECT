export interface ChatMessage {
    id: string;
    text: string;
    sender: "bot" | "user";
    timestamp: Date;
    isTyping?: boolean;
    quickActions?: string[];
    file?: StudentDocument;
}

export interface StudentDocument {
    id: string;
    name: string;
    size: number;
    type: string;
    content?: string;
    extractedText?: string;
    base64Data?: string;
    status: "uploading" | "done" | "error";
}

export interface ChatbotProps {
    studentName?: string;
    rollNumber?: string;
    department?: string;
    year?: string;
    cgpa?: string;
    attendance?: string;
    backlogs?: string;
    skills?: string; // stringified array or comma separated
    complaintStatus?: string;
    themeColor?: string;
    botName?: string;
    enableVoice?: boolean;
    enableFileUpload?: boolean;
    enableAvatarMode?: boolean;
    collegeName?: string;
    userRole?: string;

    // Outputs
    onUpdateOutput: (outputs: any) => void;
}
