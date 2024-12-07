import React, {useState, useEffect} from 'react';
import GroupChatPage from './GroupchatPage';
import { pridobiProjekte } from '../api/projectApi';
import { toast } from 'react-toastify';

const Chat = () => {
    const [selectedGroup, setGroup] = useState([]);
    const [projekti, setProjekti] = useState([]);

    const fetchData = async () => {
        try {
          const data = await pridobiProjekte();
          setProjekti(data);
        } catch (error) {
          toast.error('Napaka pri pridobivanju projektov');
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

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
                    {projekti.map((skupina, index) => (
                        <div
                            onClick={() => setGroup(skupina)}
                            key={index}
                            className={`${skupina._id === selectedGroup._id  ? 'bg-gray-100' : 'bg-white'} flex items-center gap-3 p-3 rounded-sm cursor-pointer hover:bg-gray-100`}
                        >
                            <div>
                                <h3 className="text-sm font-medium text-gray-700">{skupina.ime}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col ml-[280px]">
                <GroupChatPage id_skupine={selectedGroup._id} groupname={selectedGroup.ime} />            
            </div>
        </div>
    );
};

export default Chat;
