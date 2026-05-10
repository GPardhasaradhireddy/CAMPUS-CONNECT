import * as React from 'react';
import { ChatMessage } from '../types';

interface MessageListProps {
    messages: ChatMessage[];
    isTyping: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
    const listRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <div className="chatbot-messages" ref={listRef}>
            {messages.map((msg) => (
                <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                    <div className="message-bubble" dangerouslySetInnerHTML={{ __html: msg.text }} />
                    {msg.file && (
                        <div className="file-attachment">
                            📎 {msg.file.name} ({(msg.file.size / 1024).toFixed(1)} KB)
                        </div>
                    )}
                    <span className="message-time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            ))}
            {isTyping && (
                <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                </div>
            )}
        </div>
    );
};
