import {SuccessModal} from './components/SuccessModal';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {HomePage} from './pages/HomePage';
import {CalculatorPage} from './pages/CalculatorPage';
import {ContactPage} from './pages/ContactPage';
import { useState } from 'react';


const KredoPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fin: '',
    phone: '',
    consentGiven: false,
    otp: '',
    amount: '',
    term: '',
    deliveryMethod: '',
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
    address: '',
    city: '',
    postalCode: '',
    videoRecorded: false,
    documentSigned: false,
    finalOtp: ''
  });
  const [errors, setErrors] = useState({});
  const [odmRejected, setOdmRejected] = useState(false);
  const [videoApproved, setVideoApproved] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.finalOtp.trim() || formData.finalOtp.length !== 6) {
      newErrors.finalOtp = 'OTP 6 rəqəm olmalıdır';
      setErrors(newErrors);
      return;
    }
    
    const appNum = 'KRD' + Math.floor(100000 + Math.random() * 900000);
    setApplicationNumber(appNum);
    setShowSuccessModal(true);
  };

  const handleGoHome = () => {
    setShowSuccessModal(false);
    setCurrentStep(0);
    setCurrentPage('home');
    setFormData({
      fin: '',
      phone: '',
      consentGiven: false,
      otp: '',
      amount: '',
      term: '',
      deliveryMethod: '',
      cardNumber: '',
      cardHolder: '',
      cardExpiry: '',
      address: '',
      city: '',
      postalCode: '',
      videoRecorded: false,
      documentSigned: false,
      finalOtp: ''
    });
    setErrors({});
    setOdmRejected(false);
    setVideoApproved(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SuccessModal 
        showModal={showSuccessModal} 
        applicationNumber={applicationNumber} 
        handleGoHome={handleGoHome} 
      />
      
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <HomePage 
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            odmRejected={odmRejected}
            setOdmRejected={setOdmRejected}
            videoApproved={videoApproved}
            setVideoApproved={setVideoApproved}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            handleGoHome={handleGoHome}
            handleSubmit={handleSubmit}
          />
        )}
        
        {currentPage === 'calculator' && (
          <CalculatorPage setCurrentPage={setCurrentPage} />
        )}
        
        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default KredoPlatform;