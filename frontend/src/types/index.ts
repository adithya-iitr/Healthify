export interface Buddy {
    id: string;
    name: string;
    avatar: string;
    activities: string[];
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    location: string;
    distance: number;
    availability: string[];
  }
  
  export interface FitnessGroup {
    id: string;
    name: string;
    image: string;
    memberCount: number;
    activity: string;
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    location: string;
    meetingTime: string;
  }