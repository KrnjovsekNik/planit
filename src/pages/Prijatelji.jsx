import React, { useState, useEffect } from 'react';
import ChatPage from './ChatPage';
import AddFriendModal from './AddFriendModal';
import { FiPlus } from 'react-icons/fi';
import { pridobiUserja } from '../api/userApi';
import { toast } from 'react-toastify';
import Loading from './Loading';

const Prijatelji = () => {

    const name = sessionStorage.getItem("username");

    const [chatLoading, setChatLoading] = useState(false)
    const [msgLoading, setMsgLoading] = useState(false)
    const [prijateljiLoading, setPriateljiLoading] = useState(false);

    const [loading, setLoading] = useState(false)
    const [novPrijatelj, setNovPrijatelj] = useState(0);
    const [addedFriend, setAddedFriend] = useState('')

    const [prijatelj, setPrijatelj] = useState('');
    const [user, setUser] = useState(null)
    const [prijatelji, setPrijatelji] = useState([])
    const [isModalOpen, setModalOpen] = useState(false)

    const fetchData = async () => {
        try {
          setPriateljiLoading(true)
          const data = await pridobiUserja(name);
          setUser(data);
          setPrijatelji(data[0].prijatelji);
        } catch (error) {
          toast.error('Napaka pri pridobitvi lastnih podatkov.')
        } finally {
          setPriateljiLoading(false)
        }
      };

    useEffect(() => {
        fetchData();
    }, [novPrijatelj]);

    const dodano = () => {
        fetchData()
    }

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
                <div className={`p-4 overflow-y-auto h-[calc(100%-65px)] ${prijateljiLoading ? 'flex h-full items-center justify-center mt-[-100px]' : ''}`}>
                    {prijateljiLoading ? <Loading /> : (prijatelji ? prijatelji.map((friend, index) => (
                        <div
                            onClick={() => setPrijatelj(friend)}
                            key={index}
                            className={`flex items-center gap-3 p-3 rounded-sm cursor-pointer hover:bg-gray-100 ${prijatelj === friend ? 'bg-gray-100' : 'bg-white'}`}
                        >
                            <div>
                                <h3 className="text-sm font-medium text-gray-700">{friend}</h3>
                            </div>
                        </div>
                    )) : '')}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex py-[5px] flex-col ml-[280px]">
                <ChatPage name={prijatelj} setChatLoading={setChatLoading} msgLoading={msgLoading} chatLoading={chatLoading} setMsgLoading={setMsgLoading} />
            </div>

            <AddFriendModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                loading={loading}
                setLoading={setLoading}
                prijatelji={prijatelji}
                addedFriend={addedFriend}
                setAddedFriend={setAddedFriend}
                dodano={dodano}
            />
        </div>
    );
};

export default Prijatelji;
