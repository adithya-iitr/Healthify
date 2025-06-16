import React, { useEffect, useState } from 'react';
import { Star, MapPin, Clock, Users, MessageCircle, Calendar, Filter, Search, Award, Zap, Eye } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ExpiredSubscription from './ExpiredSubscription';
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

const trainers: Trainer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Weight Loss', 'Strength Training', 'HIIT'],
    rating: 4.9,
    reviewCount: 127,
    experience: 8,
    location: 'New York, NY',
    hourlyRate: 85,
    availability: ['Morning', 'Evening'],
    bio: 'Certified personal trainer with 8+ years of experience helping clients achieve their fitness goals through personalized workout plans and nutrition guidance.',
    certifications: ['NASM-CPT', 'Precision Nutrition Level 1'],
    languages: ['English', 'Spanish'],
    responseTime: '< 2 hours',
    clientCount: 45,
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    achievements: ['Top Trainer 2023', 'Client Transformation Award'],
    testimonials: [
      {
        id: '1',
        name: 'Jessica Miller',
        rating: 5,
        comment: 'Sarah helped me lose 30 pounds and gain confidence. Her personalized approach made all the difference!',
        date: '2 weeks ago',
        image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    programs: [
      {
        id: '1',
        name: 'Weight Loss Transformation',
        duration: '12 weeks',
        price: 899,
        description: 'Complete weight loss program with nutrition and workout plans'
      }
    ]
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Bodybuilding', 'Powerlifting', 'Sports Performance'],
    rating: 4.8,
    reviewCount: 89,
    experience: 12,
    location: 'Los Angeles, CA',
    hourlyRate: 120,
    availability: ['Morning', 'Afternoon'],
    bio: 'Former competitive bodybuilder turned trainer. Specializes in muscle building and strength development for serious athletes.',
    certifications: ['CSCS', 'NSCA-CPT'],
    languages: ['English'],
    responseTime: '< 1 hour',
    clientCount: 32,
    featured: true,
    gallery: [
      'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    achievements: ['Former Mr. California', 'Strength Coach of the Year'],
    testimonials: [
      {
        id: '1',
        name: 'Mike Rodriguez',
        rating: 5,
        comment: 'Marcus helped me add 50 pounds to my bench press in just 6 months. Incredible knowledge and motivation!',
        date: '1 week ago',
        image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    programs: [
      {
        id: '1',
        name: 'Strength Building Program',
        duration: '16 weeks',
        price: 1299,
        description: 'Advanced strength training for serious lifters'
      }
    ]
  },
  {
    id: '3',
    name: 'Emily Chen',
    image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Yoga', 'Pilates', 'Flexibility'],
    rating: 4.9,
    reviewCount: 156,
    experience: 6,
    location: 'San Francisco, CA',
    hourlyRate: 75,
    availability: ['Morning', 'Evening'],
    bio: 'Yoga instructor and wellness coach focused on mind-body connection and holistic fitness approaches.',
    certifications: ['RYT-500', 'PMA-CPT'],
    languages: ['English', 'Mandarin'],
    responseTime: '< 3 hours',
    clientCount: 67,
    gallery: [
      'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    achievements: ['Yoga Alliance Certified', 'Mindfulness Coach'],
    testimonials: [
      {
        id: '1',
        name: 'Anna Lee',
        rating: 5,
        comment: 'Emily\'s yoga classes transformed my flexibility and mental well-being. Highly recommend!',
        date: '3 days ago',
        image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    programs: [
      {
        id: '1',
        name: 'Flexibility & Wellness',
        duration: '8 weeks',
        price: 599,
        description: 'Comprehensive yoga and flexibility program'
      }
    ]
  },
  {
    id: '4',
    name: 'David Rodriguez',
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['CrossFit', 'Functional Training', 'Injury Recovery'],
    rating: 4.7,
    reviewCount: 94,
    experience: 10,
    location: 'Miami, FL',
    hourlyRate: 95,
    availability: ['Afternoon', 'Evening'],
    bio: 'CrossFit Level 3 trainer with expertise in functional movement and injury prevention.',
    certifications: ['CF-L3', 'FMS Level 2'],
    languages: ['English', 'Spanish'],
    responseTime: '< 4 hours',
    clientCount: 38,
    gallery: [
      'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    achievements: ['CrossFit Games Qualifier', 'Injury Prevention Specialist'],
    testimonials: [
      {
        id: '1',
        name: 'Carlos Martinez',
        rating: 5,
        comment: 'David helped me recover from a back injury and get stronger than ever. Amazing trainer!',
        date: '5 days ago',
        image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    programs: [
      {
        id: '1',
        name: 'Functional Fitness',
        duration: '10 weeks',
        price: 799,
        description: 'CrossFit and functional movement training'
      }
    ]
  },
  {
    id: '5',
    name: 'Lisa Park',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Dance Fitness', 'Cardio', 'Group Classes'],
    rating: 4.8,
    reviewCount: 112,
    experience: 5,
    location: 'Chicago, IL',
    hourlyRate: 65,
    availability: ['Morning', 'Afternoon', 'Evening'],
    bio: 'High-energy dance fitness instructor who makes workouts fun and engaging for all fitness levels.',
    certifications: ['ACE-CPT', 'Zumba Instructor'],
    languages: ['English', 'Korean'],
    responseTime: '< 2 hours',
    clientCount: 78,
    gallery: [
      'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    achievements: ['Dance Fitness Innovator', 'Community Wellness Award'],
    testimonials: [
      {
        id: '1',
        name: 'Rachel Kim',
        rating: 5,
        comment: 'Lisa makes working out so much fun! I actually look forward to my sessions now.',
        date: '1 day ago',
        image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    programs: [
      {
        id: '1',
        name: 'Dance Fitness Fun',
        duration: '6 weeks',
        price: 399,
        description: 'High-energy dance workouts for all levels'
      }
    ]
  },
  {
    id: '6',
    name: 'James Wilson',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Senior Fitness', 'Rehabilitation', 'Low Impact'],
    rating: 4.9,
    reviewCount: 73,
    experience: 15,
    location: 'Seattle, WA',
    hourlyRate: 80,
    availability: ['Morning', 'Afternoon'],
    bio: 'Specialized in senior fitness and post-rehabilitation training with a gentle, patient approach.',
    certifications: ['ACSM-CPT', 'Medical Exercise Specialist'],
    languages: ['English'],
    responseTime: '< 1 hour',
    clientCount: 29,
    gallery: [
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    achievements: ['Senior Fitness Specialist', 'Rehabilitation Excellence Award'],
    testimonials: [
      {
        id: '1',
        name: 'Margaret Thompson',
        rating: 5,
        comment: 'James is so patient and understanding. He helped me regain my strength after surgery.',
        date: '4 days ago',
        image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    programs: [
      {
        id: '1',
        name: 'Senior Wellness',
        duration: '12 weeks',
        price: 699,
        description: 'Gentle fitness program for active aging'
      }
    ]
  }
];

const TrainerSelection: React.FC = () => {
  const userPlan = JSON.parse(localStorage.getItem('userPlan') || '{"plan": "null"}').plan
  const [selected, setSelected]=useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const navigate=useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 

  const verifyToken = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const res = await axios.get('http://localhost:8000/api/auth/verify', {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.valid) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // optional loader while verifying
  }

  if (!isAuthenticated) {
    navigate('/login');
  }
  const viewVideoLibrary=()=>{
    navigate('/video')
  }
  const specialties = Array.from(new Set(trainers.flatMap(trainer => trainer.specialties)));
  const viewTrainerProfile=(trainer:Trainer)=>{
    localStorage.setItem('selectedTrainer',JSON.stringify(trainer));
    navigate('/trainer/${trainer.id}')
  }
  const filteredTrainers = trainers
    .filter(trainer => {
      const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trainer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpecialty = !selectedSpecialty || trainer.specialties.includes(selectedSpecialty);
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'price-low':
          return a.hourlyRate - b.hourlyRate;
        case 'price-high':
          return b.hourlyRate - a.hourlyRate;
        default:
          return 0;
      }
    });

  const getAvailableFeatures = () => {
    switch (userPlan) {
      case 'basic':
        return ['Monthly sessions', 'Email support'];
      case 'pro':
        return ['Weekly sessions', 'Video calls', 'Custom plans'];
      case 'elite':
        return ['Daily access', '24/7 support', 'Premium trainers'];
      default:
        return [];
    }
  };
  const selectTrainer=(trainer: Trainer)=>{
    setSelected(true);
    localStorage.setItem('selected trainer',trainer.id)
  }
  if (!userPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Required</h2>
          <p className="text-gray-600 mb-6">Please subscribe to a plan to access trainer selection.</p>
        </div>
      </div>
    );
  }
  if(!(new Date(userPlan.expiry) > new Date())){
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Trainer</h1>
                <p className="text-gray-600 text-lg">
                  Connect with certified fitness professionals who match your goals and schedule.
                </p>
              </div>
              
              {/* Video Library Button */}
              <button
                onClick={viewVideoLibrary}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                📹 Video Library
              </button>
            </div>
            
            {/* Plan Features */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold text-gray-900 capitalize">{userPlan} Plan Benefits:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {getAvailableFeatures().map((feature, index) => (
                  <span key={index} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search trainers by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="experience">Most Experienced</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trainers Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                  trainer.featured ? 'ring-2 ring-emerald-500 ring-opacity-50' : ''
                }`}
              >
                {trainer.featured && (
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-t-2xl">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span className="font-semibold text-sm">Featured Trainer</span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Trainer Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{trainer.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{trainer.rating}</span>
                          <span className="text-gray-600">({trainer.reviewCount})</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{trainer.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {trainer.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{trainer.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{trainer.experience}</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{trainer.clientCount}</div>
                      <div className="text-sm text-gray-600">Active Clients</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2 mb-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Responds in {trainer.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Available: {trainer.availability.join(', ')}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${trainer.hourlyRate}</span>
                      <span className="text-gray-600">/session</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button disabled={selected}
                      onClick={() => selectTrainer(trainer)}
                      className={selected?'w-full bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105':'w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'}
                    >
                      Select Trainer
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => viewTrainerProfile(trainer)}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-xl transition-all duration-200"
                      >
                        <div className="flex items-center justify-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>Profile</span>
                        </div>
                      </button>
                      <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-xl transition-all duration-200">
                        <div className="flex items-center justify-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>Message</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTrainers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Users className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No trainers found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  localStorage.removeItem('userPlan');
  localStorage.removeItem('selected trainer');
  localStorage.removeItem('selectedTrainer')
  return <ExpiredSubscription/>
};

export default TrainerSelection;