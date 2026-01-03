import React, { useState } from 'react';
import { CreditCard, FileText, CheckCircle, User, Calculator, Shield, ArrowRight, ArrowLeft, Home, Menu, X, Video, Download, AlertCircle, Phone, Building2 } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Bizimlə Əlaqə</h2>
        <p className="text-lg">Sizə kömək etməyə hazırıq</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold mb-6">Əlaqə Məlumatları</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="font-semibold mb-1">Çağrı Mərkəzi</p>
                <p className="text-gray-600">*1808</p>
                <p className="text-sm text-gray-500">24/7 xidmət</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="font-semibold mb-1">Email</p>
                <p className="text-gray-600">info@abbbank.az</p>
                <p className="text-sm text-gray-500">Cavab müddəti: 24 saat</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="font-semibold mb-1">Baş Ofis</p>
                <p className="text-gray-600">Bakı şəhəri, Nizami küç. 203</p>
                <p className="text-sm text-gray-500">Bazar ertəsi - Cümə: 09:00-18:00</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold mb-6">Mesaj Göndər</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ad, Soyad</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Adınızı daxil edin"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Mövzu</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                <option>Kredit haqqında sual</option>
                <option>Texniki dəstək</option>
                <option>Digər</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Mesaj</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                rows="4"
                placeholder="Mesajınızı yazın..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Göndər
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};