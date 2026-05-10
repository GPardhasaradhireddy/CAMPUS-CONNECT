import * as React from 'react';
import { handleFileUpload } from '../utils/chatbotUtils';
import { StudentDocument } from '../types';

interface InputAreaProps {
    onSendMessage: (text: string) => void;
    onFileUpload: (file: StudentDocument) => void;
    enableVoice: boolean;
    enableFileUpload: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, onFileUpload, enableVoice, enableFileUpload }) => {
    const [text, setText] = React.useState("");
    const [isRecording, setIsRecording] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleSend = () => {
        if (!text.trim()) {
            return; // Empty message validation
        }
        onSendMessage(text);
        setText("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleRecording = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Speech recognition is not supported in your browser.");
            return;
        }

        if (isRecording) {
            setIsRecording(false);
            // Speech recognition logic would be stopped here
        } else {
            setIsRecording(true);
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            let finalTranscript = '';

            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                setText((prev) => {
                    // Quick replace of previous interim with new interim + final
                    // A simple approximation is just setting the text to what we heard
                    // But to preserve previous text, we just set the entire phrase heard in this session
                    // We need a better way to handle previous text. For simplicity in this session:
                    return text.replace(/.*$/, finalTranscript + interimTranscript);
                });
            };

            // To properly handle appending to existing text without complex state:
            // Let's capture the original text before recording started
            const originalText = text ? text + " " : "";
            
            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                let currentFinal = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        currentFinal += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                finalTranscript += currentFinal;
                setText(originalText + finalTranscript + interimTranscript);
            };

            recognition.onerror = () => {
                setIsRecording(false);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };

            recognition.start();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsUploading(true);
            const file = e.target.files[0];
            const processedFile = await handleFileUpload(file);
            onFileUpload(processedFile);
            setIsUploading(false);
        }
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="chatbot-input-area">
            {isUploading && (
                <div className="file-upload-preview">
                    <div className="file-card">
                        <span>⏳ Reading Document...</span>
                    </div>
                </div>
            )}
            
            <div className="chatbot-input-row">
                {enableFileUpload && (
                    <>
                        <button className="icon-btn" onClick={() => fileInputRef.current?.click()} title="Upload Document">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                            </svg>
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleFileChange}
                            accept=".pdf,.docx,.doc,.txt,.csv,.xlsx,.json,image/*"
                        />
                    </>
                )}
                
                <input
                    type="text"
                    className="chatbot-input"
                    placeholder="Ask your campus assistant..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                
                {enableVoice && (
                    <button className={`icon-btn ${isRecording ? 'recording' : ''}`} onClick={toggleRecording} title="Voice Input" style={isRecording ? {color: '#c8401a', animation: 'pulse 1.5s infinite'} : {}}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                    </button>
                )}
                
                <button className="icon-btn send" onClick={handleSend} disabled={!text.trim()}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};
