import React, { useState } from 'react';
import { CreditCard, FileText, CheckCircle, User, Calculator, Shield, ArrowRight, ArrowLeft, Home, Menu, X, Video, Download, AlertCircle, Phone, Building2 } from 'lucide-react';

export const Header = ({ currentPage, setCurrentPage, menuOpen, setMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <CreditCard className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kredo</h1>
              <p className="text-xs text-gray-500">ABB Bank Onlayn Kredit</p>
            </div>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden lg:flex space-x-8">
            <button 
              onClick={() => setCurrentPage('home')} 
              className={`font-medium ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Ana səhifə
            </button>
            <button 
              onClick={() => setCurrentPage('calculator')} 
              className={`font-medium ${currentPage === 'calculator' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Kalkulyator
            </button>
            <button 
              onClick={() => setCurrentPage('contact')} 
              className={`font-medium ${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Əlaqə
            </button>
          </nav>
        </div>
        
        {menuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t">
            <nav className="flex flex-col space-y-3">
              <button 
                onClick={() => { setCurrentPage('home'); setMenuOpen(false); }} 
                className={`text-left px-4 py-2 rounded-lg font-medium ${currentPage === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Ana səhifə
              </button>
              <button 
                onClick={() => { setCurrentPage('calculator'); setMenuOpen(false); }} 
                className={`text-left px-4 py-2 rounded-lg font-medium ${currentPage === 'calculator' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Kalkulyator
              </button>
              <button 
                onClick={() => { setCurrentPage('contact'); setMenuOpen(false); }} 
                className={`text-left px-4 py-2 rounded-lg font-medium ${currentPage === 'contact' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Əlaqə
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};