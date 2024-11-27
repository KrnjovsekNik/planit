import React from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { MdOutlineAddBox } from "react-icons/md";

const AddFriendModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Do not render if modal is not open

    // Pravilna definicija 'prijatelji' kot polje


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/* Modal Content */}
            <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    <IoMdClose size={24} />
                </button>

                {/* Modal Header */}
                <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">
                    Dodaj prijatelja
                </h2>

                {/* Modal Body */}
                <form className="space-y-4">
                    <div>
                        <label
                            htmlFor="friendName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Uporabniško ime Prijatelja
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="text"
                                id="friendName"
                                className="mt-1 py-2 w-[60%] border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="martin"
                            />
                            <div
                                className="hover:cursor-pointer w-[40%] bg-gray-100 text-black py-2 px-4 rounded-sm hover:bg-gray-200 flex justify-center items-center gap-2"
                            >
                                <CiSearch />
                                Išči
                            </div>
                        </div>

                        {/* search icon or picture */}
                        <div className="flex justify-center items-center pt-4">
                            <p>Ni najdenih prijateljev</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFriendModal;
