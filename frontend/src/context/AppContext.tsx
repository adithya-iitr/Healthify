import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  color: string;
}

interface Trainer {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  experience: number;
  location: string;
  hourlyRate: number;
  availability: string[];
  bio: string;
  certifications: string[];
  languages: string[];
  responseTime: string;
  clientCount: number;
  featured?: boolean;
  gallery?: string[];
  achievements?: string[];
  testimonials?: {
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
    image: string;
  }[];
  programs?: {
    id: string;
    name: string;
    duration: string;
    price: number;
    description: string;
  }[];
}

interface AppContextType {
  // User state
  userPlan: 'basic' | 'pro' | 'elite' | null;
  setUserPlan: (plan: 'basic' | 'pro' | 'elite' | null) => void;
  
  // Selected items
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan | null) => void;
  selectedTrainer: Trainer | null;
  setSelectedTrainer: (trainer: Trainer | null) => void;
  
  // Navigation helpers
  currentPage: string;
  setCurrentPage: (page: string) => void;
  
  // Actions
  selectPlan: (plan: Plan) => void;
  completePayment: (formData: any) => void;
  startJourney: () => void;
  backToTrainers: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userPlan, setUserPlan] = useState<'basic' | 'pro' | 'elite' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [currentPage, setCurrentPage] = useState('plan-selection');

  const selectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentPage('checkout');
  };


  const completePayment = (formData: any) => {
    console.log('Processing payment with data:', formData);
    
    if (selectedPlan) {
      setUserPlan(selectedPlan.id as 'basic' | 'pro' | 'elite');
    }
    setCurrentPage('payment-success');
  };

  const startJourney = () => {
    setCurrentPage('trainer-selection');
  };

  const backToTrainers = () => {
    setCurrentPage('trainer-selection');
    setSelectedTrainer(null);
  };

  const value: AppContextType = {
    userPlan,
    setUserPlan,
    selectedPlan,
    setSelectedPlan,
    selectedTrainer,
    setSelectedTrainer,
    currentPage,
    setCurrentPage,
    selectPlan,
    completePayment,
    startJourney,
    backToTrainers,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};