import React, {useState, useRef, useEffect} from 'react';
import styles from './Chatbot.module.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    {role: 'assistant', text: '👋 Hi! I am your AI Tutor. I can explain concepts from the book. Try asking: "What is ROS 2?" or "Explain Nodes".'}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Simple keyword matcher for the "Demo"
  const getBotResponse = (question: string) => {
    const q = question.toLowerCase();
    if (q.includes('ros 2') || q.includes('ros2')) {
      return "ROS 2 (Robot Operating System 2) is an open-source framework for writing robot software. It improves upon ROS 1 with better real-time performance, security, and support for multi-robot systems.";
    }
    if (q.includes('node')) {
      return "In ROS 2, a **Node** is a single executable that performs a specific task, like reading a sensor or controlling a motor. Think of it as a 'mini-program' inside the robot.";
    }
    if (q.includes('topic')) {
      return "**Topics** are channels for data streaming. Nodes use them to talk to each other. It uses a publish/subscribe model (like a radio station and listeners).";
    }
    if (q.includes('service')) {
      return "**Services** are for request/reply interactions. One node asks for something, and another node replies. Use this for one-off tasks.";
    }
    if (q.includes('urdu')) {
      return "You can toggle Urdu translations using the floating button on the bottom right!";
    }
    return "That's a great question! As I am currently in 'Demo Mode', I can best explain 'ROS 2', 'Nodes', 'Topics', and 'Services'. Try asking about those!";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, {role: 'user', text: userText}]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:8000/api/v1/chat/ask', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message: userText })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {role: 'assistant', text: data.answer}]);
      } else {
        setMessages(prev => [...prev, {role: 'assistant', text: "⚠️ Error contacting the AI Backend."}]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {role: 'assistant', text: "⚠️ Connection failed. Is the backend running at localhost:8000?"}]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div 
      className={`${styles.chatbotContainer} ${isOpen ? styles.open : ''}`}
      onClick={(e) => {
        // If closed, clicking anywhere opens it
        if (!isOpen) setIsOpen(true);
      }}
    >
      <div className={styles.header} onClick={(e) => {
        e.stopPropagation(); // Prevent bubbling
        setIsOpen(!isOpen);
      }}>
        <div className={styles.headerTitle}>
          <span style={{fontSize: '1.2em'}}>🤖</span> 
          AI Tutor
        </div>
        <span className={styles.toggle}>×</span>
      </div>
      
      {isOpen && (
        <div className={styles.body}>
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.message} ${styles[m.role]}`}>
                {m.role === 'assistant' ? (
                  <div dangerouslySetInnerHTML={{__html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />
                ) : m.text}
              </div>
            ))}
            {isTyping && <div className={`${styles.message} ${styles.assistant}`}><em>Typing...</em></div>}
            <div ref={messagesEndRef} />
          </div>
          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about ROS 2..."
              className={styles.input}
            />
            <button type="submit" className={styles.sendBtn}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}