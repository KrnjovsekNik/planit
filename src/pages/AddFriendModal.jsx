import React, {useState, useEffect} from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Loading from './Loading'
import { dodajPrijatelja, pridobiUserja } from "../api/userApi";


const AddFriendModal = ({ isOpen, onClose, loading, setLoading, prijatelji, addedFriend, setAddedFriend, dodano }) => {
    if (!isOpen) return null; 
    const my_username = 'martin'

    const handleAddFriend = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          if (!prijatelji.includes(addedFriend)) {
            const result = await dodajPrijatelja(my_username, addedFriend);
          } else {
            console.log('Tega prijatelja imaš že dodanega');
          }
        } catch (error) {
          console.log(`Napaka: ${error.message}`);
        } finally {
          setLoading(false);
          onClose();
          dodano()  //to je za realni čas pridobivanja podatkov
        }
      };
      
    


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

            <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    <IoMdClose size={24} />
                </button>

                <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">
                    Dodaj prijatelja
                </h2>

                <form className="space-y-4">
                    <div>
                        <label
                            htmlFor="friendName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Uporabniško ime Prijatelja
                        </label>
                        <form className="flex items-center gap-4">
                            <input
                                value={addedFriend}
                                onChange={(e) => setAddedFriend(e.target.value)}
                                type="text"
                                id="friendName"
                                className="mt-1 py-2 w-[60%] border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="username"
                                required
                            />
                            <button
                                type="submit"
                                onClick={handleAddFriend}
                                className="hover:cursor-pointer w-[40%] bg-gray-100 text-black py-2 px-4 rounded-sm hover:bg-gray-200 flex justify-center items-center gap-2"
                            >
                                { loading ? <Loading /> : <span><CiSearch />Išči</span> }
                                
                            </button>
                        </form>

                        {
                            loading ? <Loading /> :
                            <div className="flex justify-center items-center pt-4">
                                <p>Ni najdenih prijateljev</p>
                            </div>
                        }

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFriendModal;
