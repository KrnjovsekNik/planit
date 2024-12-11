import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Loading from "./Loading";
import { dodajPrijatelja, pridobiUserja } from "../api/userApi";
import { toast } from "react-toastify";

const AddFriendModal = ({
  isOpen,
  onClose,
  loading,
  setLoading,
  prijatelji,
  addedFriend,
  setAddedFriend,
  dodano,
}) => {
  let my_username = sessionStorage.getItem('username');


  const handleAddFriend = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (prijatelji.includes(addedFriend)) {
        toast.warning(`${addedFriend} je že dodan.`);
        return;
      }
      const user = await pridobiUserja(addedFriend);
      if (!user[0]?.username) {
        toast.warning(`${addedFriend} ne obstaja.`);
        return;
      }
  
      const response = await dodajPrijatelja(my_username, addedFriend);
      response.success
        ? toast.success(`${addedFriend} uspešno dodan`)
        : toast.error(`Napaka pri dodajanju prijatelja ${addedFriend}`);
    } catch (error) {
      toast.error(error.message || "Napaka pri dodajanju prijatelja.");
    } finally {
      setLoading(false);
      onClose();
      setAddedFriend("");
    }
    dodano();
  };
  
  
  

  if (!isOpen) return null;

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

        <form onSubmit={handleAddFriend} className="space-y-4">
          <div>
            <label
              htmlFor="friendName"
              className="block text-sm font-medium text-gray-700"
            >
              Uporabniško ime prijatelja
            </label>
            <div className="flex items-center gap-4 mt-1">
              <input
                value={addedFriend}
                onChange={(e) => setAddedFriend(e.target.value)}
                type="text"
                id="friendName"
                className="py-2 w-[60%] border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="Vnesi ime uporabnika..."
                required
              />
              <button
                type="submit"
                className="w-[40%] border border-gray-600 bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <CiSearch />
                    Dodaj
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFriendModal;
