import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play, Clock, Users, Star, Filter, Search, Heart, BookOpen, Target, Dumbbell, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  instructor: string;
  rating: number;
  views: number;
  description: string;
  equipment: string[];
  targetMuscles: string[];
  isPremium?: boolean;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Full Body HIIT Workout - 20 Minutes',
    thumbnail: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '20:15',
    difficulty: 'Intermediate',
    category: 'HIIT',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    views: 15420,
    description: 'High-intensity interval training workout targeting all major muscle groups. Perfect for burning calories and building endurance.',
    equipment: ['None'],
    targetMuscles: ['Full Body'],
    isPremium: false
  },
  {
    id: '2',
    title: 'Beginner Yoga Flow - Morning Routine',
    thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '15:30',
    difficulty: 'Beginner',
    category: 'Yoga',
    instructor: 'Emily Chen',
    rating: 4.9,
    views: 23150,
    description: 'Gentle morning yoga flow to start your day with energy and mindfulness. Great for flexibility and stress relief.',
    equipment: ['Yoga Mat'],
    targetMuscles: ['Core', 'Back'],
    isPremium: false
  },
  {
    id: '3',
    title: 'Advanced Strength Training - Upper Body',
    thumbnail: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '35:45',
    difficulty: 'Advanced',
    category: 'Strength',
    instructor: 'Marcus Thompson',
    rating: 4.7,
    views: 8930,
    description: 'Intensive upper body strength workout focusing on progressive overload and muscle building techniques.',
    equipment: ['Dumbbells', 'Barbell', 'Bench'],
    targetMuscles: ['Chest', 'Back', 'Arms', 'Shoulders'],
    isPremium: true
  },
  {
    id: '4',
    title: 'Cardio Dance Workout - Fun & Energetic',
    thumbnail: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '25:20',
    difficulty: 'Beginner',
    category: 'Dance',
    instructor: 'Lisa Park',
    rating: 4.9,
    views: 31200,
    description: 'High-energy dance workout that makes cardio fun! Follow along to upbeat music while burning calories.',
    equipment: ['None'],
    targetMuscles: ['Full Body'],
    isPremium: false
  },
  {
    id: '5',
    title: 'Core Strengthening - Pilates Based',
    thumbnail: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '18:10',
    difficulty: 'Intermediate',
    category: 'Pilates',
    instructor: 'Emily Chen',
    rating: 4.8,
    views: 12750,
    description: 'Pilates-inspired core workout focusing on stability, strength, and proper form for a strong foundation.',
    equipment: ['Mat'],
    targetMuscles: ['Core', 'Glutes'],
    isPremium: true
  },
  {
    id: '6',
    title: 'Senior Fitness - Low Impact Routine',
    thumbnail: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '22:30',
    difficulty: 'Beginner',
    category: 'Senior Fitness',
    instructor: 'James Wilson',
    rating: 4.9,
    views: 9840,
    description: 'Gentle, low-impact exercises designed specifically for seniors to maintain mobility and strength.',
    equipment: ['Chair', 'Light Weights'],
    targetMuscles: ['Full Body'],
    isPremium: true
  }
];

const categories = ['All', 'HIIT', 'Yoga', 'Strength', 'Dance', 'Pilates', 'Senior Fitness'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const VideoLibrary: React.FC = () => {
  const navigate=useNavigate()
  const rawPlan = localStorage.getItem("userPlan");
  const { plan, expiry } = rawPlan ? JSON.parse(rawPlan) : { plan: null, expiry: null };
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;

    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || video.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  const backFromVideoLibrary=()=>{
    navigate('/home');
  }
  const canAccessVideo = (video: Video) => {
    if (!video.isPremium) return true;
    if (!plan || !expiry) return false;

  const isActive = new Date(expiry) > new Date();
  return isActive && (plan.toLowerCase() === 'pro' || plan.toLowerCase() === 'elite');
  };

  const handleVideoClick = (video: Video) => {
    if (canAccessVideo(video)) {
      setSelectedVideo(video);
    }
  };

  const handleUpgrade = () => {
    navigate('/plan')
  };

  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-black">
        {/* Video Player */}
        <div className="relative">
          <button
            onClick={() => {
              setSelectedVideo(null)
            }}
            className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
              <h2 className="text-2xl font-semibold mb-2">{selectedVideo.title}</h2>
              <p className="text-gray-300">Video player would be integrated here</p>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="bg-white p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h1>
                <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>Instructor: {selectedVideo.instructor}</span>
                  <span>Duration: {selectedVideo.duration}</span>
                  <span>Difficulty: {selectedVideo.difficulty}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{selectedVideo.rating}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="h-6 w-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Equipment Needed</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.equipment.map((item, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Target Muscles</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.targetMuscles.map((muscle, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={backFromVideoLibrary}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Video Library</h1>
              <p className="text-gray-600 text-lg">
                Access hundreds of workout videos from certified trainers
              </p>
            </div>
            
            {/* Plan Badge */}
            {rawPlan && new Date(expiry) > new Date() &&(
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold capitalize">
                {plan} Plan
              </div>
            )}
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
                placeholder="Search videos, instructors, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => {
            const hasAccess = canAccessVideo(video);
            
            return (
              <div
                key={video.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                  hasAccess ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : 'opacity-75'
                }`}
                onClick={() => handleVideoClick(video)}
              >
                {/* Thumbnail */}
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-gray-900 ml-1" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>

                  {/* Premium Badge */}
                  {video.isPremium && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                      PRO
                    </div>
                  )}

                  {/* Lock Overlay for Non-Premium Users */}
                  {video.isPremium && !hasAccess && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-8 h-8 border-2 border-white rounded mx-auto mb-2"></div>
                        <p className="text-sm font-semibold">Upgrade to Pro</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {video.instructor}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{video.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{video.views.toLocaleString()} views</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      video.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      video.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {video.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">{video.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Upgrade Prompt for Free Users */}
        {!rawPlan && (
          <div className="mt-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Unlock Premium Content</h2>
            <p className="text-emerald-100 mb-6">
              Get access to exclusive workout videos, advanced training programs, and personalized guidance from certified trainers.
            </p>
            <button 
              onClick={handleUpgrade}
              className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Subscription Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLibrary;