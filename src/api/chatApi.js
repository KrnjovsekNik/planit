import axios from 'axios';
const API_URL = 'http://localhost:5000/api';

export const pridobiSporocila = async (username) => {
    try {
        let friendChats = [];
        try {
            const friendResponse = await axios.post(`${API_URL}/chats/friends`, { 
                username: username 
            });
            friendChats = friendResponse.data;
            console.log('Prijateljska sporočila:', friendChats);
        } catch (err) {
            console.log('Napaka pri prijateljskih sporočilih:', err.response?.data || err.message);
        }

        let groupChats = [];
        try {
            const groupResponse = await axios.post(`${API_URL}/chats/groups`, { 
                username: username 
            });
            groupChats = groupResponse.data;
            console.log('Skupinska sporočila:', groupChats);
        } catch (err) {
            console.log('Napaka pri skupinskih sporočilih:', err.response?.data || err.message);
        }

        const allMessages = [...friendChats, ...groupChats]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return allMessages;
    } catch (error) {
        console.error('Splošna napaka pri pridobivanju sporočil:', error);
        throw new Error('Napaka pri pridobivanju sporočil: ' + (error.response?.data?.message || error.message));
    }
};