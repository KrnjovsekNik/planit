import React, {useEffect, useState} from 'react';
import { pridobiGroupChat, dodajGroupChat } from '../api/groupChatApi';

const GroupChatPage = ({ id_skupine, groupname }) => {

    const my_username = 'martin'
    const [messages, setMessages] = useState([]) 
    const [currentMessage, setCurrentMessage] = useState('')
    const [novCh, setNovCh] = useState(0)

    const handleMessage = async (e) => {
        e.preventDefault();
        try {
        const novGroupChat = {
            id_skupina : id_skupine,
            text : currentMessage,
            posiljatelj : my_username,
        };
        await dodajGroupChat(novGroupChat);
        setCurrentMessage("");
        setNovCh(novCh+1)
        } catch (err) {
        console.error("Napaka pri dodajanju sporocila:", err);
        alert("Napaka pri dodajanju sporocila. Poskusite znova.");
        }
    };
  
    const fetchData = async () => {
        try {
          const data = await pridobiGroupChat(id_skupine);
          setMessages(data);
        } catch (error) {
          alert(error.message);
        }
      };
    useEffect(() => {
        fetchData();
    }, [id_skupine, novCh]);

    return (
        <div className="flex flex-col h-full">

            <div className="p-4 bg-white border-b shadow-lg sticky top-0 z-11">
                <h2 className="text-lg font-semibold text-gray-700">{groupname}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 relative">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-${
                                msg.posiljatelj === my_username ? "end" : "start"
                            } gap-3 ${
                                msg.posiljatelj === my_username
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            {msg.posiljatelj !== my_username && (
                                <img
                                    className="w-[38px] h-[38px] rounded-full border-1 border-blue-400"
                                    src="http://localhost:3000/images/demo.jpg"
                                    alt={msg.posiljatelj}
                                />
                            )}
                            <div>
                                <p className="text-xs text-gray-500">{msg.posiljatelj}</p>
                                <div
                                    className={`p-3 rounded-lg ${
                                        msg.posiljatelj === my_username ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                            {msg.posiljatelj === my_username && (
                                <img
                                    className="w-[38px] h-[38px] rounded-full border-2 border-blue-500"
                                    src="http://localhost:3000/images/demo.jpg"
                                    alt={msg.posiljatelj}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-white border-t sticky bottom-0 z-10">
                <form className="flex items-center gap-3">
                    <input
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        value={currentMessage}
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleMessage}
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Pošlji
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GroupChatPage;
