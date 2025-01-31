import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { dodajNalogo } from "../api/nalogeApi";

function DodajNalogoModal({ isOpen, onClose, onAddTask, projekt }) {
  const [formData, setFormData] = useState({
    ime: '',
    opis: '',
    rok: '',
    lastnik: ''
  });
  
  const [prijatelji, setPrijatelji] = useState([]);

  useEffect(() => {
    if (projekt?.udelezenci) {
      setPrijatelji(projekt.udelezenci);
    }
  }, [projekt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.lastnik) {
      toast.error('Prosim izberite lastnika naloge');
      return;
    }
    
    try {
      const naloga = {
        ime: formData.ime,
        opis: formData.opis,
        rok: formData.rok,
        stanje: 'nedokončano',
        lastnik: formData.lastnik,
        id_projekt: projekt._id,
        ime_projekta: projekt.ime
      };

      const response = await dodajNalogo(naloga);
      
      toast.success("Naloga uspešno dodana!");
      onClose();
      
      setFormData({
        ime: '',
        opis: '',
        rok: '',
        lastnik: ''
      });
    } catch (error) {
      console.error("Detail napake:", error);
      toast.error(`Napaka pri dodajanju naloge: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Dodaj novo nalogo</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Naziv naloge
            </label>
            <input
              type="text"
              value={formData.ime}
              onChange={(e) => setFormData({ ...formData, ime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opis
            </label>
            <textarea
              value={formData.opis}
              onChange={(e) => setFormData({ ...formData, opis: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lastnik
            </label>
            <select
              value={formData.lastnik}
              onChange={(e) => setFormData({ ...formData, lastnik: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Izberi lastnika</option>
              {prijatelji.map((prijatelj, index) => (
                <option key={index} value={prijatelj}>
                  {prijatelj}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rok
            </label>
            <input
              type="date"
              value={formData.rok}
              onChange={(e) => setFormData({ ...formData, rok: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Prekliči
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DodajNalogoModal;