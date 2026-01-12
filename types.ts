
export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: string[];
  price: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface StudentProgress {
  courseId: string;
  courseName: string;
  progress: number;
  lastAccessed: string;
  nextLesson: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  type: 'Exam' | 'Assignment' | 'Quiz';
  priority: 'High' | 'Medium' | 'Low';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'Deadline' | 'Announcement' | 'Message';
  timestamp: string;
  isRead: boolean;
}
