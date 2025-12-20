import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Bonjour ! Je suis le chatbot de Hamza. Posez-moi des questions sur son parcours, ses compétences ou ses projets ! 👋' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new message arrives
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Quick questions
    const quickQuestions = [
        "Quelles sont tes compétences ?",
        "Montre-moi tes projets AI",
        "Tu as de l'expérience React ?",
        "Comment te contacter ?"
    ];

    const sendMessage = async (messageText = input) => {
        if (!messageText.trim()) return;

        const userMessage = { role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Use absolute backend URL on Vercel, localhost in development
            const apiUrl = window.location.hostname.includes('vercel.app')
                ? 'https://portfolio-backend-babn.onrender.com/api/chat'
                : 'http://localhost:5000/api/chat';

            const response = await axios.post(apiUrl, { message: messageText });

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.data.reply
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            let errorMessage = 'Désolé, une erreur s\'est produite. Veuillez réessayer.';

            if (error.response?.status === 429) {
                errorMessage = 'Trop de requêtes. Attendez quelques secondes et réessayez.';
            } else if (!window.navigator.onLine) {
                errorMessage = 'Pas de connexion internet. Vérifiez votre connexion.';
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: errorMessage
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Bubble Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-cyber-green to-cyber-blue rounded-full shadow-2xl z-50 flex items-center justify-center hover:shadow-cyber-green/50 transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    boxShadow: isOpen
                        ? '0 0 30px rgba(0, 255, 135, 0.5)'
                        : '0 0 20px rgba(0, 255, 135, 0.3)'
                }}
            >
                {isOpen ? (
                    <FaTimes className="text-dark-bg text-2xl" />
                ) : (
                    <FaRobot className="text-dark-bg text-2xl animate-pulse" />
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-full max-w-md h-[600px] bg-dark-bg border-2 border-cyber-green/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-xl"
                        style={{ maxWidth: 'calc(100vw - 3rem)' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-cyber-green/20 to-cyber-blue/20 p-4 border-b border-cyber-green/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-cyber-green rounded-full flex items-center justify-center">
                                    <FaRobot className="text-dark-bg text-xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-cyber-green">Hamza AI Assistant</h3>
                                    <p className="text-xs text-gray-400">Propulsé par Gemini 1.5 ⚡</p>
                                </div>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-cyber-green transition-colors"
                                    whileHover={{ rotate: 90 }}
                                >
                                    <FaTimes size={20} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-cyber-green to-cyber-blue text-dark-bg font-semibold rounded-br-sm'
                                            : 'bg-gray-800/80 text-white border border-gray-700 rounded-bl-sm backdrop-blur'
                                        }`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-gray-800/80 p-4 rounded-2xl rounded-bl-sm border border-gray-700">
                                        <div className="flex space-x-2">
                                            <motion.div
                                                className="w-2 h-2 bg-cyber-green rounded-full"
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-cyber-green rounded-full"
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-cyber-green rounded-full"
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions (only show if first time) */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2">
                                <p className="text-xs text-gray-500 mb-2">Questions suggérées :</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickQuestions.map((q, idx) => (
                                        <motion.button
                                            key={idx}
                                            onClick={() => sendMessage(q)}
                                            className="text-xs px-3 py-1.5 bg-gray-800 border border-cyber-green/30 rounded-full text-cyber-green hover:bg-cyber-green/10 transition-all"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {q}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t border-gray-700 bg-dark-bg/50 backdrop-blur">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Posez votre question..."
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyber-green focus:ring-1 focus:ring-cyber-green outline-none transition-all disabled:opacity-50"
                                />
                                <motion.button
                                    onClick={() => sendMessage()}
                                    disabled={loading || !input.trim()}
                                    className="px-4 py-3 bg-gradient-to-r from-cyber-green to-cyber-blue text-dark-bg rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                    whileHover={{ scale: loading || !input.trim() ? 1 : 1.05 }}
                                    whileTap={{ scale: loading || !input.trim() ? 1 : 0.95 }}
                                >
                                    <FaPaperPlane />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 255, 135, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 255, 135, 0.5);
                }
            `}</style>
        </>
    );
};

export default ChatBot;
