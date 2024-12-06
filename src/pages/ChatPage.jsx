import React, {useState, useEffect} from 'react';
import { pridobiFriendChat, dodajFriendChat } from '../api/friendChatApi';
import { useRef } from 'react';

const ChatPage = ({ name }) => {
    const my_username = 'martin'

    const [messages, setMessages] = useState([]) 

    const [currentMessage, setCurrentMessage] = useState('')

    const [sprememba, setSprememba] = useState(0)

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const novFriendChat = {
        posiljatelj : my_username,
        text : currentMessage,
        udelezenca : [my_username, name],
      };

      await dodajFriendChat(novFriendChat);
      setCurrentMessage("");
      setSprememba(sprememba+1)

      /*onClose();*/
    } catch (err) {
      console.error("Napaka pri dodajanju sporocila:", err);
      alert("Napaka pri dodajanju sporocila. Poskusite znova.");
    }
  };



    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await pridobiFriendChat(name, my_username);
            setMessages(data);
          } catch (error) {
            alert(error.message);
          }
        };
        fetchData();
    }, [name, sprememba]);

    const EndRef = useRef (null);

    //tu te da na zacetek, pazi na to, da se to zgodi usakic, ko se messages updejta (setMessages)...
    useEffect(() => {
        if (EndRef.current) {
            EndRef.current.scrollTop = EndRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full">

            <div className="p-4 bg-white border-b shadow-lg sticky top-0 z-10">
                <h2 className="text-lg font-semibold text-gray-700">{name}</h2>
            </div>

            {/* Chat Messages */}
            <div ref={EndRef} className="flex-1 overflow-y-auto p-4 bg-gray-50 relative">
                <div className="space-y-4 mb-[30px]">
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
                                    className="w-[38px] h-[38px] rounded-full border-2 border-blue-500"
                                    src="http://localhost:3000/images/demo.jpg"
                                    alt={msg.posiljatelj}
                                />
                            )}
                            <div>
                                <p className="text-xs text-gray-500">{msg.posiljatelj}</p>
                                <div
                                    className={`p-3 rounded-lg ${
                                        msg.posiljatelj === my_username
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 text-gray-700"
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

            {/* Chat Input */}
            <div className="p-4 bg-white border-t sticky bottom-0 z-10">
                <form className="flex items-center gap-3">
                    <input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleMessage}
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
