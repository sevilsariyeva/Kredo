import React, { useState } from 'react';
import { CreditCard, FileText, CheckCircle, User, Calculator, Shield, ArrowRight, ArrowLeft, Home, Menu, X, Video, Download, AlertCircle, Phone, Building2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="mb-2">© 2026 Kredo - ABB Bank ASC</p>
        <p className="text-sm text-gray-400">Bütün hüquqlar qorunur</p>
      </div>
    </footer>
  );
};