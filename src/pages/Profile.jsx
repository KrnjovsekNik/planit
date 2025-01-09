import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { posodobiProfilnoSliko } from '../api/userApi';

export default function Profile() {
  const [name, setName] = useState("Martin Kobal");
  const [email] = useState("martin.kobal@gmail.com");
  const [password, setPassword] = useState("123456");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(sessionStorage.getItem('profile_image'));

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    try {
      // Compress and resize the image
      const options = {
        maxWidthOrHeight: 100,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
  
      // Prepare FormData for ImgBB
      const formData = new FormData();
      formData.append("image", compressedFile);
  
      // Upload to ImgBB
      const response = await fetch("https://api.imgbb.com/1/upload?key=0d6f327be83ef1c4f9fc93dbb8990b68", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (data.success) {
        const uploadedImageUrl = data.data.url;
  
        // Call API to save image URL to local database
        const username = sessionStorage.getItem('username'); // Assuming username is already stored in session
        const apiResponse = await posodobiProfilnoSliko(username, uploadedImageUrl);
  
        if (apiResponse.success) {
          // Save to session storage
          sessionStorage.setItem('profile_image', uploadedImageUrl);
  
          // Update local state or UI if necessary
          setProfileImage(uploadedImageUrl);
          alert("Image successfully uploaded and saved!");
        } else {
          alert(`Failed to save image to database: ${apiResponse.message}`);
        }
      } else {
        alert(`Failed to upload image to ImgBB: ${data.error.message}`);
      }
    } catch (error) {
      console.error("Error uploading the image: ", error);
      alert("Image upload failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Profile Card */}
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
        {/* Profile Image */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={profileImage || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-20 h-20 rounded-full shadow-md cursor-pointer"
              onClick={() => isEditing && document.getElementById("imageUpload").click()}
            />
            {isEditing && (
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            )}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Uporabniško ime</p>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
            ) : (
              <p className="text-lg font-bold text-gray-800">{name}</p>
            )}
          </div>
        </div>

        {/* User Email */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">Uporabniški e-naslov</p>
          <p className="text-lg text-gray-800">{email}</p>
        </div>

        {/* Password */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">Geslo</p>
          {isEditing ? (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
          ) : (
            <p className="text-lg text-gray-800">******</p>
          )}
        </div>

        {/* Edit/Save Button */}
        <button
          onClick={() => {
            if (isEditing) {
              alert("Podatki spremenjeni!");
            }
            setIsEditing(!isEditing);
          }}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
        >
          {isEditing ? "Shrani" : "Spremeni"}
        </button>
      </div>
    </div>
  );
}
