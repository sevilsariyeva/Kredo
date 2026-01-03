import React, { useState } from 'react';
import { CreditCard, FileText, CheckCircle, User, Calculator, Shield, ArrowRight, ArrowLeft, Home, Menu, X, Video, Download, AlertCircle, Phone, Building2 } from 'lucide-react';

export const CalculatorPage = ({ setCurrentPage }) => {
  const [calculatorData, setCalculatorData] = useState({
    amount: 10000,
    term: 24,
    rate: 18
  });

  const handleCalculatorChange = (e) => {
    const { name, value } = e.target;
    setCalculatorData({
      ...calculatorData,
      [name]: value
    });
  };

  const calculateLoanDetails = () => {
    const amount = parseFloat(calculatorData.amount);
    const months = parseInt(calculatorData.term);
    const annualRate = parseFloat(calculatorData.rate);
    const monthlyRate = annualRate / 100 / 12;
    
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    };
  };

  const loanDetails = calculateLoanDetails();

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Kredit Kalkulyatoru</h2>
        <p className="text-lg">Aylıq ödənişinizi hesablayın</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-6">Parametrlər</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kredit məbləği: <span className="text-blue-600 font-bold">{calculatorData.amount} AZN</span>
                </label>
                <input
                  type="range"
                  name="amount"
                  min="1000"
                  max="50000"
                  step="100"
                  value={calculatorData.amount}
                  onChange={handleCalculatorChange}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1,000 AZN</span>
                  <span>50,000 AZN</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Müddət: <span className="text-blue-600 font-bold">{calculatorData.term} ay</span>
                </label>
                <input
                  type="range"
                  name="term"
                  min="6"
                  max="60"
                  step="6"
                  value={calculatorData.term}
                  onChange={handleCalculatorChange}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>6 ay</span>
                  <span>60 ay</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  İllik faiz: <span className="text-blue-600 font-bold">{calculatorData.rate}%</span>
                </label>
                <input
                  type="range"
                  name="rate"
                  min="10"
                  max="30"
                  step="0.5"
                  value={calculatorData.rate}
                  onChange={handleCalculatorChange}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Nəticələr</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Aylıq ödəniş</p>
                <p className="text-4xl font-bold text-blue-600">{loanDetails.monthlyPayment} AZN</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-gray-600">Ümumi ödəniş</p>
                  <p className="text-xl font-bold text-gray-900">{loanDetails.totalPayment} AZN</p>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-gray-600">Ümumi faiz</p>
                  <p className="text-xl font-bold text-orange-600">{loanDetails.totalInterest} AZN</p>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${(parseFloat(loanDetails.totalInterest) / parseFloat(loanDetails.totalPayment) * 100).toFixed(0)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-600 mb-1">Kredit</p>
                  <p className="text-lg font-bold text-blue-600">{calculatorData.amount} AZN</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-600 mb-1">Faiz</p>
                  <p className="text-lg font-bold text-orange-600">{loanDetails.totalInterest} AZN</p>
                </div>
              </div>
              
              <button 
                onClick={() => setCurrentPage('home')}
                className="w-full mt-4 px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-lg"
              >
                İndi müraciət et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};