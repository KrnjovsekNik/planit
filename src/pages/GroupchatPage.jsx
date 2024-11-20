import React from 'react';

const ChatPage = ({ group }) => {
    // Example messages with sender information
    const messages = [
        { text: "Hi, how are you?", sender: "Martin" },
        { text: "I'm good, thank you!", sender: "Kobal" },
        { text: "Great to hear!", sender: "Martin" },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header (Fixed) */}
            <div className="p-4 bg-white border-b shadow-sm sticky top-0 z-10">
                <h2 className="text-lg font-semibold text-gray-700">{group}</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 relative">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-${
                                msg.sender === "Kobal" ? "end" : "start"
                            } gap-3 ${
                                msg.sender === "Kobal"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            {/* Show avatar for sender */}
                            {msg.sender !== "Kobal" && (
                                <img
                                    className="w-[38px] h-[38px] rounded-full border-2 border-blue-500"
                                    src="http://localhost:3000/images/demo.jpg"
                                    alt={msg.sender}
                                />
                            )}
                            <div>
                                {/* Sender's name */}
                                <p className="text-xs text-gray-500">{msg.sender}</p>
                                <div
                                    className={`p-3 rounded-lg ${
                                        msg.sender === "Kobal"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                            {/* Show avatar for receiver */}
                            {msg.sender === "Kobal" && (
                                <img
                                    className="w-[38px] h-[38px] rounded-full border-2 border-blue-500"
                                    src="http://localhost:3000/images/demo.jpg"
                                    alt={msg.sender}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t sticky bottom-0 z-10">
                <form className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
