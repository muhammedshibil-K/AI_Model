import { useState } from "react";
import axios from "axios";
import "./MainSection.css";
import { SendHorizontal } from "lucide-react";

function MainSection() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // =========================================
    // SEND MESSAGE
    // =========================================
    const handleSend = async () => {

        if (!message.trim()) return;

        // USER MESSAGE
        const userMessage = {
            type: "user",
            text: message,
        };

        // SHOW USER MESSAGE
        setMessages((prev) => [...prev, userMessage]);

        try {

            // =========================================
            // API CALL
            // =========================================
            const response = await axios.post(
                "http://127.0.0.1:8000/analyze",
                {
                    text: message,
                }
            );

            console.log(response.data);

            // =========================================
            // EXTRACT DATA
            // =========================================
            const data = response.data;

            // TOKENS
            const tokenText = data.tokens
                .map(
                    (item) =>
                        `Word: ${item.word}
POS: ${item.pos}
Lemma: ${item.lemma}
Tag: ${item.tag}
Stop Word: ${item.is_stop}
----------------------`
                )
                .join("\n");

            // ENTITIES
            const entityText =
                data.entities.length > 0
                    ? data.entities
                          .map(
                              (ent) =>
                                  `Entity: ${ent.text} (${ent.label})`
                          )
                          .join("\n")
                    : "No Entities Found";

            // KEYWORDS
            const keywordText =
                data.keywords.length > 0
                    ? data.keywords.join(", ")
                    : "No Keywords";

            // SUMMARY
            const summaryText = `
========================
NLP SUMMARY
========================

Total Tokens: ${data.summary.total_tokens}
Total Entities: ${data.summary.total_entities}
Total Sentences: ${data.summary.total_sentences}
Total Keywords: ${data.summary.total_keywords}

========================
ENTITIES
========================

${entityText}

========================
KEYWORDS
========================

${keywordText}

========================
TOKENS
========================

${tokenText}
`;

            // BOT MESSAGE
            const botReply = {
                type: "bot",
                text: summaryText,
            };

            // SHOW BOT MESSAGE
            setMessages((prev) => [...prev, botReply]);

        } catch (error) {

            console.log(error);

            // ERROR MESSAGE
            const errorMessage = {
                type: "bot",
                text: "Server Error",
            };

            setMessages((prev) => [...prev, errorMessage]);
        }

        // CLEAR INPUT
        setMessage("");
    };

    // =========================================
    // ENTER KEY SEND
    // =========================================
    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="main-section">

            {/* =========================================
                START SCREEN
            ========================================= */}
            {messages.length === 0 ? (

                <div className="start-screen">

                    {/* HERO */}
                    <div className="hero">

                        <div className="orb"></div>

                        <h1>Welcome to Relatus.AI</h1>

                        <p>
                            Get started by asking anything to the AI assistant.
                        </p>

                    </div>

                    {/* CENTER INPUT */}
                    <div className="center-input-wrapper">

                        <div className="chat-input-wrapper">

                            <textarea
                                className="chat-textarea"
                                rows="1"
                                placeholder="Ask me anything..."
                                value={message}
                                onChange={(e) => {

                                    setMessage(e.target.value);

                                    // AUTO HEIGHT
                                    e.target.style.height = "auto";
                                    e.target.style.height =
                                        e.target.scrollHeight + "px";
                                }}
                                onKeyDown={handleKeyDown}
                            />

                            <button
                                className="send-btn"
                                onClick={handleSend}
                            >
                                <SendHorizontal size={18} />
                            </button>

                        </div>

                    </div>

                    {/* CARDS */}
                    <div className="cards">

                        <div className="card">
                            <h3>Productivity Boost</h3>

                            <p>
                                Start your day with focus and clear goals.
                            </p>
                        </div>

                        <div className="card">
                            <h3>User-Friendly Onboarding</h3>

                            <p>
                                Improve onboarding experience for users.
                            </p>
                        </div>

                        <div className="card">
                            <h3>Voice Responses</h3>

                            <p>
                                Enable voice-powered smart responses.
                            </p>
                        </div>

                    </div>

                </div>

            ) : (

                /* =========================================
                    CHAT SCREEN
                ========================================= */
                <div className="chat-container">

                    {/* CHAT MESSAGES */}
                    <div className="chat-messages">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={
                                    msg.type === "user"
                                        ? "message user-message"
                                        : "message bot-message"
                                }
                            >

                                <pre>{msg.text}</pre>

                            </div>

                        ))}

                    </div>

                    {/* BOTTOM INPUT */}
                    <div className="chat-box">

                        <div className="chat-input-wrapper">

                            <textarea
                                className="chat-textarea"
                                rows="1"
                                placeholder="Ask me anything..."
                                value={message}
                                onChange={(e) => {

                                    setMessage(e.target.value);

                                    // AUTO HEIGHT
                                    e.target.style.height = "auto";
                                    e.target.style.height =
                                        e.target.scrollHeight + "px";
                                }}
                                onKeyDown={handleKeyDown}
                            />

                            <button
                                className="send-btn"
                                onClick={handleSend}
                            >
                                <SendHorizontal size={18} />
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default MainSection;