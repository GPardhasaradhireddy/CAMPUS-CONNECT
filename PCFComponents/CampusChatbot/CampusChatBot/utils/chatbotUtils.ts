export const COLLEGE_INFO = {
    name: "Aditya College of Engineering & Technology",
    location: "Aditya Nagar, ADB Road, Surampalem, Pin: 533437, East Godavari District, Andhra Pradesh, India.",
    nearby: "15 KM from Samalkot Railway Station, 35 KM from Kakinada and Rajahmundry.",
    campus: "Eco-friendly 180-acre green campus.",
    affiliation: "Permanently affiliated to JNTU Kakinada.",
    approval: "AICTE approved, recognized by Govt. of Andhra Pradesh.",
    accreditation: "NAAC A+ Grade with 3.40 CGPA, NBA accredited.",
    recognition: "UGC 2(f) and 12(B).",
    contact: "0884-2326212, 9959176665",
    whatsapp: "+91 7036076661",
    email: "office@acet.ac.in",
    buildings: [
        "Visweswarayya Bhavan - Administrative Office, Examination Cell, Admission Office, Transport Office, ECE, BSE",
        "CV Raman Bhavan - EEE, Mechanical, Civil",
        "Ramanujan Bhavan - CSE",
        "Newton Bhavan - IT",
        "James Watt Bhavan - AIML & DS, IoT"
    ],
    features: "WOW Campus, PIO Status, TCS Accreditation, MOUs with Infosys and other companies, state-of-the-art infrastructure, hygienic canteen and food courts, project clubs, activity clubs, record placements, trained faculty, campus placement training, Sunrise Startup Village, AMCAT and CoCUBES MOU, Technology Business Incubator from DST, incubation center by Govt. of AP, SIRO recognition by DSIR, APSSDC skill development institute, certification courses."
};

// PLACEHOLDER: Future RAG integration
export async function prepareRAGContextPlaceholder(query: string, files: any[]): Promise<string> {
    console.log("Preparing RAG context for:", query, "with files:", files);
    return "This is a placeholder for RAG context extraction.";
}

// PLACEHOLDER: Future RAG integration
export async function generateFileSummaryPlaceholder(file: any): Promise<string> {
    console.log("Generating summary for:", file);
    return `Summary placeholder for file ${file.name}`;
}

// PLACEHOLDER: Future RAG integration
export async function extractFileTextPlaceholder(file: File): Promise<string> {
    console.log("Extracting text from:", file.name);
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Extracted text placeholder for ${file.name}`), 1000);
    });
}

export async function handleFileUpload(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const text = e.target?.result as string;
            
            resolve({ 
                id: Date.now().toString(), 
                name: file.name, 
                size: file.size, 
                type: file.type, 
                status: "done",
                extractedText: text.replace(/[^\x20-\x7E\n\r\t]/g, '').trim().substring(0, 5000) 
            });
        };

        reader.onerror = (e) => {
            reject(new Error("Failed to read file"));
        };

        // Option B: Free Frontend Parser. Reads text and sanitizes binary gibberish.
        reader.readAsText(file);
    });
}

// PLACEHOLDER: Video Avatar Response
export async function generateAvatarResponsePlaceholder(text: string): Promise<string> {
    console.log("Generating avatar video for text:", text);
    return "Avatar mode placeholder URL";
}

// PLACEHOLDER: Smart Complaint Categorization
export function categorizeComplaintPlaceholder(text: string): string {
    const lower = text.toLowerCase();
    if (lower.includes("wifi") || lower.includes("lab") || lower.includes("projector")) return "Technical";
    if (lower.includes("food") || lower.includes("room") || lower.includes("water")) return "Hostel";
    if (lower.includes("bus") || lower.includes("driver") || lower.includes("route")) return "Transport";
    if (lower.includes("exam") || lower.includes("marks") || lower.includes("attendance")) return "Academic";
    return "Other";
}

// PLACEHOLDER: Complaint Priority
export function predictComplaintPriorityPlaceholder(text: string): string {
    const lower = text.toLowerCase();
    if (lower.includes("ragging") || lower.includes("harassment") || lower.includes("urgent")) return "Critical";
    if (lower.includes("exam") || lower.includes("bus left")) return "High";
    if (lower.includes("wifi") || lower.includes("food")) return "Medium";
    return "Low";
}

// PLACEHOLDER: Duplicate Complaint Detection
export function detectDuplicateComplaintPlaceholder(complaintData: any): boolean {
    console.log("Checking duplicates for:", complaintData);
    return false;
}

// PLACEHOLDER: Complaint Routing
export function routeComplaintPlaceholder(category: string): string {
    return `Routed to ${category} department.`;
}
