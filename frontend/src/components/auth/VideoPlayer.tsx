import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward, 
  Settings, 
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Star,
  Clock,
  Users,
  BookOpen,
  Target,
  Dumbbell
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

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
  videoUrl?: string; // In a real app, this would be the actual video URL
}

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
  const { userPlan } = useAppContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isPlaying && showControls) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          skipBackward();
          break;
        case 'ArrowRight':
          skipForward();
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSettings(false);
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Video Container */}
      <div 
        className="relative flex-1 flex items-center justify-center"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Mock Video Player - In production, replace with actual video element */}
        <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
          {/* Placeholder for actual video */}
          <div className="text-center text-white">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="max-w-full max-h-full object-contain opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-70 rounded-2xl p-8 text-center">
                <Play className="h-16 w-16 mx-auto mb-4 text-emerald-500" />
                <h3 className="text-xl font-semibold mb-2">Video Player</h3>
                <p className="text-gray-300">In production, this would be the actual video player</p>
                <p className="text-sm text-gray-400 mt-2">Duration: {video.duration}</p>
              </div>
            </div>
          </div>

          {/* Hidden video element for demo functionality */}
          <video
            ref={videoRef}
            className="hidden"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          >
            {/* In production, add video source here */}
          </video>

          {/* Controls Overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-black transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
              <button
                onClick={onClose}
                className="text-white hover:text-emerald-400 transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-50"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`text-white hover:text-red-400 transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-50 ${
                    isLiked ? 'text-red-500' : ''
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="text-white hover:text-emerald-400 transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-50">
                  <Share2 className="h-6 w-6" />
                </button>
                <button className="text-white hover:text-emerald-400 transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-50">
                  <Download className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlayPause}
                className="w-20 h-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10 text-white ml-1" />
                ) : (
                  <Play className="h-10 w-10 text-white ml-2" />
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Progress Bar */}
              <div 
                ref={progressRef}
                className="w-full h-2 bg-white bg-opacity-30 rounded-full cursor-pointer mb-4 group"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-emerald-500 rounded-full relative transition-all duration-150"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={skipBackward}
                    className="text-white hover:text-emerald-400 transition-colors"
                  >
                    <SkipBack className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={togglePlayPause}
                    className="text-white hover:text-emerald-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </button>
                  
                  <button
                    onClick={skipForward}
                    className="text-white hover:text-emerald-400 transition-colors"
                  >
                    <SkipForward className="h-6 w-6" />
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-emerald-400 transition-colors"
                    >
                      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-white bg-opacity-30 rounded-full appearance-none slider"
                    />
                  </div>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {video.duration}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-white hover:text-emerald-400 transition-colors"
                    >
                      <Settings className="h-6 w-6" />
                    </button>
                    
                    {showSettings && (
                      <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-90 rounded-lg p-4 min-w-48">
                        <h4 className="text-white font-semibold mb-3">Playback Speed</h4>
                        <div className="space-y-2">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => handlePlaybackRateChange(rate)}
                              className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                                playbackRate === rate
                                  ? 'bg-emerald-500 text-white'
                                  : 'text-gray-300 hover:bg-gray-700'
                              }`}
                            >
                              {rate}x {rate === 1 ? '(Normal)' : ''}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-emerald-400 transition-colors"
                  >
                    {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Information Panel */}
      <div className="bg-white border-t">
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{video.title}</h1>
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <span>by {video.instructor}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{video.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{video.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{video.duration}</span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">{video.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  video.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  video.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {video.difficulty}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {video.category}
                </span>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Equipment */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Dumbbell className="h-5 w-5 text-emerald-600" />
                  <span>Equipment Needed</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {video.equipment.map((item, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Target Muscles */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Target className="h-5 w-5 text-red-600" />
                  <span>Target Muscles</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {video.targetMuscles.map((muscle, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors">
                  Add to Playlist
                </button>
                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-xl transition-colors">
                  Download for Offline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
        }
      `}</style> */}
    </div>
  );
};

export default VideoPlayer;