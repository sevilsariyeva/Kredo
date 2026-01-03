import React, { useState } from 'react';
import { CreditCard, FileText, CheckCircle, User, Calculator, Shield, ArrowRight, ArrowLeft, Home, Menu, X, Video, Download, AlertCircle, Phone, Building2 } from 'lucide-react';

export const HomePage = ({ 
  currentStep, 
  setCurrentStep, 
  formData, 
  setFormData, 
  errors, 
  setErrors,
  odmRejected,
  setOdmRejected,
  videoApproved,
  setVideoApproved,
  isRecording,
  setIsRecording,
  handleGoHome,
  handleSubmit
}) => {
  const steps = [
    { id: 0, title: 'Məlumatlar', icon: User },
    { id: 1, title: 'OTP', icon: Phone },
    { id: 2, title: 'Kredit', icon: Calculator },
    { id: 3, title: 'Təklif', icon: FileText },
    { id: 4, title: 'Çatdırılma', icon: Building2 },
    { id: 5, title: 'Video', icon: Video },
    { id: 6, title: 'İmza', icon: FileText },
    { id: 7, title: 'Təsdiq', icon: CheckCircle }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 0) {
      if (!formData.fin.trim() || formData.fin.length !== 7) newErrors.fin = 'FIN kod 7 simvol olmalıdır';
      if (!formData.phone.trim() || formData.phone.length < 9) newErrors.phone = 'Telefon düzgün deyil';
      if (!formData.consentGiven) newErrors.consent = 'İcazə verilməlidir';
    }
    if (currentStep === 1) {
      if (!formData.otp.trim() || formData.otp.length !== 6) newErrors.otp = 'OTP 6 rəqəm olmalıdır';
    }
    if (currentStep === 2) {
      if (!formData.amount || parseFloat(formData.amount) < 1000) newErrors.amount = 'Minimum 1,000 AZN';
      if (!formData.term) newErrors.term = 'Müddət seçilməlidir';
    }
    if (currentStep === 4) {
      if (!formData.deliveryMethod) newErrors.deliveryMethod = 'Çatdırılma seçilməlidir';
    }
    if (currentStep === 5) {
      if (!formData.videoRecorded || !videoApproved) newErrors.video = 'Video təsdiqlənməlidir';
    }
    if (currentStep === 6) {
      if (!formData.documentSigned) newErrors.documentSigned = 'Sənəd imzalanmalıdır';
    }
    if (currentStep === 7) {
      if (!formData.finalOtp.trim() || formData.finalOtp.length !== 6) newErrors.finalOtp = 'OTP 6 rəqəm olmalıdır';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMonthlyPayment = () => {
    if (formData.amount && formData.term) {
      const amount = parseFloat(formData.amount);
      const months = parseInt(formData.term);
      const rate = 0.18 / 12;
      const payment = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      return payment.toFixed(2);
    }
    return '0.00';
  };

  const getCreditOffer = () => {
    if (formData.amount && formData.term) {
      return {
        amount: formData.amount,
        rate: '18.0',
        term: formData.term,
        monthlyPayment: calculateMonthlyPayment()
      };
    }
    return {
      amount: '0',
      rate: '18.0',
      term: '0',
      monthlyPayment: '0.00'
    };
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep === 2) {
        const rejected = Math.random() < 0.2;
        if (rejected) {
          setOdmRejected(true);
          return;
        }
      }
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0 && !odmRejected) setCurrentStep(currentStep - 1);
  };

  const handleVideoRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setFormData({ ...formData, videoRecorded: true });
      const approved = Math.random() < 0.8;
      setVideoApproved(approved);
    }, 5000);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 mb-8 text-white">
        <h2 className="text-4xl font-bold mb-4">Sürətli və Asan Kredit</h2>
        <p className="text-lg mb-6">5 dəqiqə ərzində onlayn müraciət edin!</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <CheckCircle size={20} />
            <span>100% onlayn</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle size={20} />
            <span>Sürətli qərar</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle size={20} />
            <span>Komissiyasız</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    currentStep >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${
                    currentStep >= index ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-8 mx-1 transition-all ${
                    currentStep > index ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        {currentStep === 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Şəxsi Məlumatlarınız</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">FIN kod <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="fin"
                  value={formData.fin}
                  onChange={handleInputChange}
                  maxLength="7"
                  className={`w-full px-4 py-3 border rounded-lg uppercase ${errors.fin ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="XXXXXXX"
                />
                {errors.fin && <p className="text-red-500 text-sm mt-1">{errors.fin}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mobil telefon <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+994 XX XXX XX XX"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    name="consentGiven"
                    checked={formData.consentGiven}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5"
                  />
                  <label htmlFor="consent" className="text-sm">
                    Məlumatlarımın Asan Finance və AKB vasitəsilə sorğulanmasına icazə verirəm. <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.consent && <p className="text-red-500 text-sm mt-2">{errors.consent}</p>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">OTP Təsdiqi</h3>
            <div className="max-w-md mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center">
                <Phone className="text-blue-600 mx-auto mb-4" size={48} />
                <p className="font-semibold mb-2">{formData.phone}</p>
                <p className="text-sm text-gray-600">nömrəsinə OTP kod göndərildi</p>
              </div>

              <label className="block text-sm font-medium mb-2 text-center">OTP Kod <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                maxLength="6"
                className={`w-full px-4 py-4 border rounded-lg text-center text-2xl font-bold tracking-widest ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="000000"
              />
              {errors.otp && <p className="text-red-500 text-sm mt-1 text-center">{errors.otp}</p>}
              
              <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:underline">
                Yenidən göndər
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && !odmRejected && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Kredit Məlumatları</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Kredit məbləği (AZN) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="1000"
                  step="100"
                  className={`w-full px-4 py-3 border rounded-lg ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Minimum 1,000 AZN"
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Müddət <span className="text-red-500">*</span></label>
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg ${errors.term ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Müddət seçin</option>
                  <option value="12">12 ay</option>
                  <option value="24">24 ay</option>
                  <option value="36">36 ay</option>
                  <option value="48">48 ay</option>
                </select>
                {errors.term && <p className="text-red-500 text-sm mt-1">{errors.term}</p>}
              </div>

              {formData.amount && formData.term && (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Təxmini aylıq ödəniş</p>
                  <p className="text-3xl font-bold text-blue-600">{calculateMonthlyPayment()} AZN</p>
                  <p className="text-xs text-gray-500 mt-2">* Dəqiq məbləğ təklif mərhələsində göstəriləcək</p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && odmRejected && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-red-600" size={64} />
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-4">Müraciət Rədd Edildi</h3>
            <p className="text-gray-600 mb-2">Təəssüf ki, kredit müraciətiniz ODM tərəfindən təsdiq edilmədi.</p>
            <p className="text-sm text-gray-500 mb-8">Ətraflı məlumat üçün bank filialına müraciət edə bilərsiniz.</p>
            <button 
              onClick={handleGoHome} 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Ana səhifəyə qayıt
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Kredit Təklifimiz</h3>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-8 mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={48} />
                </div>
              </div>
              <h4 className="text-center text-2xl font-bold text-green-700 mb-8">Təbrik edirik! Kreditiniz təsdiqləndi</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <p className="text-sm text-gray-600 mb-2">Kredit məbləği</p>
                  <p className="text-3xl font-bold text-blue-600">{getCreditOffer().amount} AZN</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <p className="text-sm text-gray-600 mb-2">İllik faiz dərəcəsi</p>
                  <p className="text-3xl font-bold text-blue-600">{getCreditOffer().rate}%</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <p className="text-sm text-gray-600 mb-2">Kredit müddəti</p>
                  <p className="text-3xl font-bold text-blue-600">{getCreditOffer().term} ay</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <p className="text-sm text-gray-600 mb-2">Aylıq ödəniş</p>
                  <p className="text-3xl font-bold text-green-600">{getCreditOffer().monthlyPayment} AZN</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={nextStep} 
                className="flex items-center justify-center space-x-2 px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-lg"
              >
                <CheckCircle size={20} />
                <span>Qəbul edirəm</span>
              </button>
              <button 
                onClick={handleGoHome} 
                className="flex items-center justify-center space-x-2 px-6 py-4 border-2 border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition"
              >
                <X size={20} />
                <span>Razı deyiləm</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Çatdırılma Metodu</h3>
            <p className="text-gray-600 mb-6">Kredit məbləğinin necə almaq istədiyinizi seçin:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => {
                  setFormData({ ...formData, deliveryMethod: 'card' });
                  if (errors.deliveryMethod) setErrors({ ...errors, deliveryMethod: '' });
                }}
                className={`border-2 rounded-xl p-6 text-center transition-all hover:shadow-lg ${
                  formData.deliveryMethod === 'card' 
                    ? 'border-blue-600 bg-blue-50 shadow-md' 
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <CreditCard className="mx-auto mb-4 text-blue-600" size={48} />
                <h4 className="font-semibold mb-2">Karta köçürmə</h4>
                <p className="text-sm text-gray-600">Mövcud bank kartınıza köçürülsün</p>
              </button>

              <button
                onClick={() => {
                  setFormData({ ...formData, deliveryMethod: 'branch' });
                  if (errors.deliveryMethod) setErrors({ ...errors, deliveryMethod: '' });
                }}
                className={`border-2 rounded-xl p-6 text-center transition-all hover:shadow-lg ${
                  formData.deliveryMethod === 'branch' 
                    ? 'border-blue-600 bg-blue-50 shadow-md' 
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <Building2 className="mx-auto mb-4 text-blue-600" size={48} />
                <h4 className="font-semibold mb-2">Filialdan götürmə</h4>
                <p className="text-sm text-gray-600">Yaxın filialdan nağd şəkildə</p>
              </button>

              <button
                onClick={() => {
                  setFormData({ ...formData, deliveryMethod: 'home' });
                  if (errors.deliveryMethod) setErrors({ ...errors, deliveryMethod: '' });
                }}
                className={`border-2 rounded-xl p-6 text-center transition-all hover:shadow-lg ${
                  formData.deliveryMethod === 'home' 
                    ? 'border-blue-600 bg-blue-50 shadow-md' 
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <Home className="mx-auto mb-4 text-blue-600" size={48} />
                <h4 className="font-semibold mb-2">Evə çatdırılma</h4>
                <p className="text-sm text-gray-600">Kuryer vasitəsilə ünvanınıza</p>
              </button>
            </div>
            {errors.deliveryMethod && <p className="text-red-500 text-sm mt-4 text-center">{errors.deliveryMethod}</p>}
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Video Qeydiyyat</h3>
            <div className="max-w-2xl mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Qeyd:</strong> Şəxsiyyətinizi təsdiq etmək üçün videoda aşağıdakı mətni oxuyun:
                </p>
                <div className="bg-white rounded p-3 mt-3 border-l-4 border-blue-600">
                  <p className="text-sm italic">
                    Mən, {formData.fin} FIN kodlu şəxs, ABB Bank-dan {formData.amount} AZN məbləğində kredit götürməyə razılıq verirəm.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center mb-6 overflow-hidden">
                {!formData.videoRecorded ? (
                  <div className="text-center p-8">
                    {!isRecording ? (
                      <div>
                        <Video className="text-gray-500 mx-auto mb-4" size={64} />
                        <p className="text-gray-400 mb-6">Video çəkilişi üçün hazır olun</p>
                        <button 
                          onClick={handleVideoRecord} 
                          className="px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition inline-flex items-center space-x-2"
                        >
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                          <span>Çəkilişi başlat</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-white">
                        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg mb-2">Çəkiliş davam edir...</p>
                        <p className="text-sm text-gray-400">Lütfən mətni aydın oxuyun</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-8">
                    {videoApproved ? (
                      <div>
                        <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                        <p className="text-white font-semibold text-lg">Video təsdiqləndi!</p>
                      </div>
                    ) : (
                      <div>
                        <AlertCircle className="text-red-500 mx-auto mb-4" size={64} />
                        <p className="text-white mb-4">Video təsdiqlənmədi. Yenidən cəhd edin.</p>
                        <button
                          onClick={() => {
                            setFormData({ ...formData, videoRecorded: false });
                            setVideoApproved(false);
                          }}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Yenidən çək
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Kredit Müqaviləsi</h3>
            <div className="bg-white border-2 border-gray-300 rounded-xl p-8 mb-6 max-h-96 overflow-y-auto">
              <h4 className="text-xl font-bold text-center mb-6">KREDİT MÜQAVİLƏSİ</h4>
              <div className="space-y-4 text-sm text-gray-700">
                <p><strong>Kredit Verən:</strong> ABB Bank ASC</p>
                <p><strong>Kredit Alan:</strong> {formData.fin} FIN kodlu şəxs</p>
                <p><strong>Telefon:</strong> {formData.phone}</p>
                <p><strong>Kredit məbləği:</strong> {formData.amount} AZN</p>
                <p><strong>Kredit müddəti:</strong> {formData.term} ay</p>
                <p><strong>Aylıq ödəniş:</strong> {calculateMonthlyPayment()} AZN</p>
                <div className="border-t pt-4 mt-4">
                  <h5 className="font-semibold mb-2">Şərtlər:</h5>
                  <p className="mb-2">1. Kredit Alan hər ayın 5-nə qədər aylıq ödənişi həyata keçirməlidir.</p>
                  <p className="mb-2">2. Gecikmiş ödənişlərə görə gündəlik 0.1% cərimə tətbiq olunur.</p>
                  <p className="mb-2">3. Erkən ödəniş mümkündür (komissiyasız).</p>
                  <p className="mb-2">4. Kredit Alan öz öhdəliklərini vaxtında yerinə yetirməyi öhdəsinə götürür.</p>
                  <p>5. Müqavilə elektron imza ilə təsdiq edilir və hüquqi qüvvəyə malikdir.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                const contractText = `KREDİT MÜQAVİLƏSİ\n\nKredit Verən: ABB Bank ASC\nKredit Alan: ${formData.fin} FIN kodlu şəxs\nTelefon: ${formData.phone}\nKredit məbləği: ${formData.amount} AZN\nKredit müddəti: ${formData.term} ay\nAylıq ödəniş: ${calculateMonthlyPayment()} AZN\n\nŞƏRTLƏR:\n1. Kredit Alan hər ayın 5-nə qədər aylıq ödənişi həyata keçirməlidir.\n2. Gecikmiş ödənişlərə görə gündəlik 0.1% cərimə tətbiq olunur.\n3. Erkən ödəniş mümkündür (komissiyasız).\n4. Kredit Alan öz öhdəliklərini vaxtında yerinə yetirməyi öhdəsinə götürür.\n5. Müqavilə elektron imza ilə təsdiq edilir və hüquqi qüvvəyə malikdir.`;
                const blob = new Blob([contractText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Kredit_Muqavilesi_${formData.fin}.txt`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg mb-6 mx-auto hover:bg-blue-700 transition"
            >
              <Download size={20} />
              <span>Müqaviləni yüklə (TXT)</span>
            </button>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="docSign" 
                  name="documentSigned"
                  checked={formData.documentSigned}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5"
                />
                <label htmlFor="docSign" className="text-sm">
                  Müqaviləni oxudum və elektron imza ilə təsdiq edirəm. <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.documentSigned && <p className="text-red-500 text-sm mt-2">{errors.documentSigned}</p>}
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Yekun Təsdiq</h3>
            <div className="max-w-md mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
                <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
                <p className="font-semibold mb-2">Proses tamamlanmaq üzrədir!</p>
                <p className="text-sm text-gray-600">Son təsdiq üçün OTP kodunu daxil edin</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
                <Phone className="text-blue-600 mx-auto mb-3" size={40} />
                <p className="text-sm text-gray-600">
                  <strong>{formData.phone}</strong> nömrəsinə yeni OTP kod göndərildi
                </p>
              </div>

              <label className="block text-sm font-medium mb-2 text-center">OTP Kod <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="finalOtp"
                value={formData.finalOtp}
                onChange={handleInputChange}
                maxLength="6"
                className={`w-full px-4 py-4 border rounded-lg text-center text-2xl font-bold tracking-widest ${errors.finalOtp ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="000000"
              />
              {errors.finalOtp && <p className="text-red-500 text-sm mt-1 text-center">{errors.finalOtp}</p>}
              
              <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:underline">
                Yenidən göndər
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t">
          {currentStep > 0 && !odmRejected && (
            <button
              onClick={prevStep}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              <ArrowLeft size={20} />
              <span>Geri</span>
            </button>
          )}
          
          {currentStep < 7 && currentStep !== 3 && !odmRejected && (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition ml-auto"
            >
              <span>Növbəti</span>
              <ArrowRight size={20} />
            </button>
          )}

          {currentStep === 7 && (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition ml-auto"
            >
              <CheckCircle size={20} />
              <span>Təsdiq et</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};