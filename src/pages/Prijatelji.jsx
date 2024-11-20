import React, { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import ChatPage from './ChatPage';
import AddFriendModal from './AddFriendModal';

const Prijatelji = () => {
    const [name, setName] = React.useState('Martin Kobal');
    const [isModalOpen, setModalOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-[280px] bg-white shadow-md border-r h-full fixed">
                <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-700">Prijatelji</h2>
                        <button className="text-gray-500 hover:text-gray-700 hover:font-extrabold">
                            <IoIosAddCircleOutline size={25} onClick={() => setModalOpen(true)} />
                        </button>
                    </div>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-65px)]">
                    {['Martin Kobal', 'Jure Kobal', 'Urban Hribernik'].map((friend, index) => (
                        <div
                            onClick={() => setName(friend)}
                            key={index}
                            className={`flex items-center gap-3 p-3 rounded-sm cursor-pointer hover:bg-gray-100 ${name == friend ? 'bg-gray-100' : 'bg-white'}`}
                        >
                            <div>
                                <h3 className="text-sm font-medium text-gray-700">{friend}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col ml-[280px]">
                <ChatPage name={name} />
            </div>

            <AddFriendModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default Prijatelji;
