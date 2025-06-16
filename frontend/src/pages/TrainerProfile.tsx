import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Users, MessageCircle, Calendar, Award, Globe, CheckCircle, Play, Heart, Share2, BookOpen, Video } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TrainerProfile: React.FC = () => {
  const { backToTrainers, selectTrainer } = useAppContext();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'programs'>('overview');
  const selectedTrainer=JSON.parse(localStorage.getItem('selectedTrainer') || 'null');
  if (!selectedTrainer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Trainer Selected</h2>
          <button
            onClick={backToTrainers}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl"
          >
            Back to Trainers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={backToTrainers}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to trainers</span>
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-emerald-500 to-emerald-600">
            {selectedTrainer.featured && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ Featured Trainer
              </div>
            )}
          </div>
          
          <div className="relative px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-8">
              {/* Profile Image */}
              <div className="relative -mt-16 mb-4 lg:mb-0">
                <img
                  src={selectedTrainer.image}
                  alt={selectedTrainer.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedTrainer.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-lg">{selectedTrainer.rating}</span>
                    <span className="text-gray-600">({selectedTrainer.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedTrainer.location}</span>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTrainer.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 lg:w-64">
                <button
                  onClick={() => selectTrainer(selectedTrainer)}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Book Session - ${selectedTrainer.hourlyRate}
                </button>
                <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                  <div className="flex items-center justify-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Send Message</span>
                  </div>
                </button>
                {/* <button
                  onClick={viewVideoLibrary}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Video className="h-4 w-4" />
                    <span>View Videos</span>
                  </div>
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">{selectedTrainer.experience}</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{selectedTrainer.clientCount}</div>
            <div className="text-gray-600">Active Clients</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{selectedTrainer.responseTime}</div>
            <div className="text-gray-600">Response Time</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{selectedTrainer.certifications.length}</div>
            <div className="text-gray-600">Certifications</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'programs', label: 'Programs', icon: Award }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Bio */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About {selectedTrainer.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedTrainer.bio}</p>
                </div>

                {/* Certifications & Languages */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Award className="h-5 w-5 text-emerald-600" />
                      <span>Certifications</span>
                    </h4>
                    <div className="space-y-2">
                      {selectedTrainer.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span className="text-gray-700">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <span>Languages</span>
                    </h4>
                    <div className="space-y-2">
                      {selectedTrainer.languages.map((language, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-gray-700">{language}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span>Availability</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.availability.map((time, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Client Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-lg">{selectedTrainer.rating}</span>
                    <span className="text-gray-600">({selectedTrainer.reviewCount} reviews)</span>
                  </div>
                </div>

                {selectedTrainer.testimonials?.map((testimonial) => (
                  <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">{testimonial.name}</h5>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{testimonial.comment}</p>
                        <p className="text-sm text-gray-500">{testimonial.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Programs Tab */}
            {activeTab === 'programs' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Training Programs</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {selectedTrainer.programs?.map((program) => (
                    <div key={program.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{program.name}</h4>
                      <p className="text-gray-600 mb-4">{program.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-emerald-600">${program.price}</span>
                          <span className="text-gray-600">/{program.duration}</span>
                        </div>
                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors">
                          Select Program
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;