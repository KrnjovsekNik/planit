import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import ChatPage from './ChatPage';

const Chat = () => {
    const [selectedGroup, setGroup] = React.useState('RPO projekt');

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-[280px] bg-white shadow-md border-r h-full fixed">
                <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-700">Skupine</h2>
                    </div>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-65px)]">
                    {['RPO projekt', 'Skupina 2', 'Skupina 3'].map((skupina, index) => (
                        <div
                            onClick={() => setGroup(skupina)}
                            key={index}
                            className={`${skupina == selectedGroup ? 'bg-gray-100' : 'bg-white'} flex items-center gap-3 p-3 rounded-sm cursor-pointer hover:bg-gray-100`}
                        >
                            <div>
                                <h3 className="text-sm font-medium text-gray-700">{skupina}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col ml-[280px]">
                <ChatPage name={selectedGroup} />
            </div>
        </div>
    );
};

export default Chat;
