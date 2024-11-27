import React, { useState } from 'react';
import ChatPage from './ChatPage';
import AddFriendModal from './AddFriendModal';
import { FiPlus } from 'react-icons/fi';
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
                        <button onClick={() => setModalOpen(true)} className="flex text-md hover:bg-gray-300 items-center space-x-2 px-1 py-1 pr-2 bg-gray-200 border border-gray-600 text-gray-700 rounded-sm shadow-sm">
                            <FiPlus className="text-md" />
                            <span className='text-md'>Dodaj prijatelja</span>
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
