import React, { useState } from 'react';
import { CreditCard, FileText, CheckCircle, User, Calculator, Shield, ArrowRight, ArrowLeft, Home, Menu, X, Video, Download, AlertCircle, Phone, Building2 } from 'lucide-react';

export const SuccessModal = ({ showModal, applicationNumber, handleGoHome }) => {
  if (!showModal) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Təbriklər!</h2>
          <p className="text-gray-600 mb-6">Kredit müraciətiniz uğurla tamamlandı.</p>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Müqavilə nömrəniz:</p>
            <p className="text-2xl font-bold text-blue-600">{applicationNumber}</p>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Kredit məbləği seçdiyiniz üsula uyğun olaraq çatdırılacaq. Ətraflı məlumat üçün sizinlə əlaqə saxlanılacaq.
          </p>

          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            <Home size={20} />
            <span>Ana səhifəyə qayıt</span>
          </button>
        </div>
      </div>
    </div>
  );
};