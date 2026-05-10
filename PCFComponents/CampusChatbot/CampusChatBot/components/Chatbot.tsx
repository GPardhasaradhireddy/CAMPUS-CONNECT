import * as React from 'react';
import { ChatbotProps, ChatMessage, StudentDocument } from '../types';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { COLLEGE_INFO, categorizeComplaintPlaceholder, predictComplaintPriorityPlaceholder } from '../utils/chatbotUtils';
import '../styles/Chatbot.css';

const POWER_AUTOMATE_FLOW_URL = "https://default7359f89671e24daeb8a315cdf97f2f.10.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/814199cef53749baab8bb47082fe85d7/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QRqOB_iOP0PHu-Z6JtQaVYFpO6I2miNFw7DRtCcwJF4";
// API_KEY = stored securely in Power Automate

export const Chatbot: React.FC<ChatbotProps> = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = React.useState(false);
    const [activeDocument, setActiveDocument] = React.useState<StudentDocument | undefined>();

    const themeStyle = { '--theme-color': props.themeColor || '#c8401a' } as React.CSSProperties;

    // Initial greeting
    React.useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: 'welcome',
                    text: `Hello ${props.studentName || 'Student'}! 👋 I am your Campus Assistant. How can I help you today?`,
                    sender: 'bot',
                    timestamp: new Date()
                }
            ]);
        }
    }, [props.studentName, messages.length]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = async (text: string) => {
        // Add User Message
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        props.onUpdateOutput({ lastUserMessage: text, uploadedFileName: activeDocument?.name });

        setIsTyping(true);

        // Process message via Power Automate securely
        try {
            // Call Power Automate securely (API Key is handled entirely in the flow)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

            const response = await fetch(POWER_AUTOMATE_FLOW_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    studentName: props.studentName || 'Student',
                    documentName: activeDocument?.name || '',
                    documentText: activeDocument?.extractedText || '',
                    context: {
                        department: props.department,
                        year: props.year,
                        attendance: props.attendance,
                        cgpa: props.cgpa,
                        complaintStatus: props.complaintStatus
                    }
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                let errStr = `Server returned ${response.status}`;
                try {
                    const errData = await response.json();
                    if (errData?.error?.message) {
                        errStr = errData.error.message;
                    }
                } catch (e) {
                    /* ignore parsing error */
                }
                throw new Error(errStr);
            }

            const data = await response.json();
            const botReply = data.reply || "I'm sorry, I couldn't understand the response from the server.";
            finalizeBotResponse(botReply);

        } catch (error: any) {
            console.error("Chatbot request failed:", error.message);
            let errorReply = "Sorry, I am currently unable to connect to the campus servers. Please try again later.";
            if (error.name === 'AbortError') {
                errorReply = "The request timed out. The server is taking too long to respond.";
            } else if (error.message.includes("Server returned") || error.message.includes("did not receive a response") || error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
                errorReply = `Connection error: ${error.message}. Please check your Power Automate Flow (ensure it has a Response action and CORS is enabled).`;
            }
            finalizeBotResponse(errorReply);
        }
    };

    const finalizeBotResponse = (botReply: string) => {
        const botMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: botReply,
            sender: 'bot',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);

        props.onUpdateOutput({ lastBotResponse: botReply, chatbotEvent: 'message_received' });

        // Speech synthesis if voice enabled
        if (props.enableVoice && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(botReply.replace(/<[^>]*>?/gm, ''));
            window.speechSynthesis.speak(utterance);
        }
    };

    const quickActions = [
        "Check Attendance", "View CGPA", "Track Complaint",
        "Exam Notes", "Placement Help", "College Location"
    ];

    const handleQuickAction = (action: string) => {
        props.onUpdateOutput({ selectedQuickAction: action });
        handleSendMessage(action);
    };

    return (
        <div style={themeStyle}>
            {/* Floating 3D Icon */}
            <div className="chatbot-fab-container">
                <div className="chatbot-fab" onClick={toggleChat} title="Open Assistant">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 2.16.68 4.15 1.84 5.76L3 22l4.24-.84C8.85 21.82 10.39 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.3-3.84-.82l-2.45.49.49-2.45C5.7 16.06 5 14.11 5 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm-2-9a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
            </div>

            {/* Popup Chat Window */}
            {isOpen && (
                <div className="chatbot-popup">
                    <div className="chatbot-header">
                        <div className="chatbot-header-info" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <div className="chatbot-header-logo">
                                <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                </svg>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span className="chatbot-header-title">
                                    {props.botName && props.botName !== 'val' ? props.botName : 'Groot AI'}
                                </span>
                                <span className="chatbot-header-subtitle">Aditya University</span>
                            </div>
                        </div>
                        <div className="chatbot-header-actions">
                            <button onClick={toggleChat}>✕</button>
                        </div>
                    </div>

                    <div className="chatbot-quick-actions">
                        {quickActions.map(action => (
                            <div key={action} className="quick-action-chip" onClick={() => handleQuickAction(action)}>
                                {action}
                            </div>
                        ))}
                    </div>

                    {/* Notebook Sources */}
                    {activeDocument && (
                        <div className="notebook-sources-bar">
                            <span className="source-label">Source Document:</span>
                            <div className="active-source-chip">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                {activeDocument.name}
                                <button onClick={() => setActiveDocument(undefined)} title="Remove Source">✕</button>
                            </div>
                        </div>
                    )}

                    <MessageList messages={messages} isTyping={isTyping} />

                    <InputArea
                        onSendMessage={handleSendMessage}
                        onFileUpload={(file) => setActiveDocument(file)}
                        enableVoice={props.enableVoice !== false}
                        enableFileUpload={props.enableFileUpload !== false}
                    />
                </div>
            )}
        </div>
    );
};
