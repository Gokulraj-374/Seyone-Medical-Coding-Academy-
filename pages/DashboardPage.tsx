
import React, { useState, useRef, useMemo } from 'react';
import { StudentProgress, Deadline, Notification } from '../types';

const PROGRESS_DATA: StudentProgress[] = [
  {
    courseId: 'cpc-01',
    courseName: 'Certified Professional Coder (CPC)',
    progress: 65,
    lastAccessed: '2 hours ago',
    nextLesson: 'Module 4: CPT Surgery Section'
  },
  {
    courseId: 'med-term-01',
    courseName: 'Medical Terminology Foundations',
    progress: 100,
    lastAccessed: '1 month ago',
    nextLesson: 'Completed'
  },
  {
    courseId: 'icd-01',
    courseName: 'ICD-10-CM Masterclass',
    progress: 20,
    lastAccessed: 'Yesterday',
    nextLesson: 'Lesson 3: Neoplasms Coding'
  }
];

const DEADLINES: Deadline[] = [
  {
    id: 'd1',
    title: 'Anatomy Final Quiz',
    date: 'Oct 24, 2023',
    type: 'Quiz',
    priority: 'High'
  },
  {
    id: 'd2',
    title: 'ICD-10 Case Study Submission',
    date: 'Oct 28, 2023',
    type: 'Assignment',
    priority: 'Medium'
  },
  {
    id: 'd3',
    title: 'Coding Standards Seminar',
    date: 'Oct 15, 2023',
    type: 'Assignment',
    priority: 'Low'
  }
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Upcoming Deadline',
    message: 'Your Anatomy Final Quiz is due in 48 hours. Don\'t forget to review Module 3.',
    type: 'Deadline',
    timestamp: '1 hour ago',
    isRead: false
  },
  {
    id: 'n2',
    title: 'New Course Announcement',
    message: 'Enrollment for the "Risk Adjustment Mastery" course is now open for CPC graduates.',
    type: 'Announcement',
    timestamp: '4 hours ago',
    isRead: false
  },
  {
    id: 'n3',
    title: 'Message from Dr. Chen',
    message: 'Great job on the latest case study! Your attention to detail in ICD-10-CM coding is improving.',
    type: 'Message',
    timestamp: 'Yesterday',
    isRead: true
  }
];

const PRESET_AVATARS = [
  "https://i.pravatar.cc/150?u=student1",
  "https://i.pravatar.cc/150?u=student2",
  "https://i.pravatar.cc/150?u=student3",
  "https://i.pravatar.cc/150?u=student4",
];

const INSTRUCTORS = [
  { name: "Dr. Sarah Chen", specialty: "CPC Lead Mentor", img: "https://i.pravatar.cc/150?u=dr-chen", status: 'Online' },
  { name: "Prof. Marcus Thompson", specialty: "CCS & Inpatient", img: "https://i.pravatar.cc/150?u=prof-thompson", status: 'Busy' },
  { name: "Elena Rodriguez", specialty: "Auditing Director", img: "https://i.pravatar.cc/150?u=elena-r", status: 'Online' }
];

const MOCK_REPLIES = [
  "I've reviewed your latest submission. Your sequencing of the CPT codes for the surgery section was spot on!",
  "Are you free for a quick Zoom call tomorrow? I want to clarify the HCC guidelines for your project.",
  "Check out the new resource I uploaded to Module 4. It specifically covers the neoplasm table updates.",
  "Great question regarding Modifier 25. Usually, it's used when a separate evaluation is performed on the same day as a procedure."
];

const DashboardPage: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<{ courseName: string; date: string } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(INSTRUCTORS[0]);
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(PRESET_AVATARS[0]);
  const [deadlineViewMode, setDeadlineViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarMonth, setCalendarMonth] = useState(new Date(2023, 9)); // October 2023
  const fileInputRef = useRef<HTMLInputElement>(null);
  const studentName = "Alex Johnson";

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const messageHistory = notifications.filter(n => n.type === 'Message');

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerIncomingMessage = (instructor = selectedInstructor) => {
    const randomMsg = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
    const newNotification: Notification = {
      id: `n-${Date.now()}`,
      title: `Message from ${instructor.name}`,
      message: randomMsg,
      type: 'Message',
      timestamp: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    setIsNotificationsOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsMessageModalOpen(false);
      setMessageText("");
      setTimeout(() => {
        triggerIncomingMessage(selectedInstructor);
      }, 3000);
    }, 1500);
  };

  // Calendar Logic
  const calendarData = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(year, month, i));
      const dayDeadlines = DEADLINES.filter(d => d.date === dateStr);
      days.push({ day: i, deadlines: dayDeadlines });
    }
    return days;
  }, [calendarMonth]);

  const changeMonth = (offset: number) => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + offset, 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 animate-in fade-in duration-500 print:p-0 print:bg-white relative">

      {/* Messaging Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative">
            <div className="bg-[#1A1A1B] p-8 text-white relative">
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              <div className="flex items-center space-x-4">
                <img src={selectedInstructor.img} alt={selectedInstructor.name} className="w-16 h-16 rounded-2xl border-2 border-[#76BC21] object-cover" />
                <div>
                  <h3 className="text-xl font-black">{selectedInstructor.name}</h3>
                  <p className="text-[#76BC21] text-xs font-bold uppercase tracking-widest">{selectedInstructor.specialty}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="p-8 space-y-6 bg-white">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 focus:ring-2 focus:ring-[#76BC21] focus:bg-white outline-none transition-all resize-none text-slate-700"
                  placeholder={`Send a message to ${selectedInstructor.name.split(' ')[0]}...`}
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-slate-400 font-medium italic">Estimated response: ~2 hours</span>
                <button
                  type="submit"
                  disabled={isSending || !messageText.trim()}
                  className="bg-[#76BC21] text-white px-8 py-3 rounded-xl font-black shadow-lg shadow-[#76BC21]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center"
                >
                  {isSending ? (
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                  ) : (
                    <i className="fas fa-paper-plane mr-2"></i>
                  )}
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 relative">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-2xl font-black text-slate-800 mb-6">Customize Profile</h3>

            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-[2rem] object-cover border-4 border-slate-100 shadow-md mb-4"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-6 right-0 bg-[#76BC21] text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <i className="fas fa-camera text-sm"></i>
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*"
              />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Upload or Select Photo</p>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Quick Presets</span>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {PRESET_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setAvatarUrl(url)}
                      className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${avatarUrl === url ? 'border-[#76BC21] ring-4 ring-[#76BC21]/10' : 'border-slate-100 opacity-60 hover:opacity-100'}`}
                    >
                      <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="w-full bg-[#1A1A1B] text-white py-4 rounded-2xl font-black text-sm hover:bg-[#76BC21] transition-all shadow-xl shadow-black/10"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Center */}
      {isNotificationsOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
            onClick={() => setIsNotificationsOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#1A1A1B] text-white">
              <div className="flex items-center space-x-3">
                <i className="fas fa-bell text-[#76BC21]"></i>
                <h3 className="font-black tracking-tight">Notification Center</h3>
              </div>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {unreadCount} Unread Notifications
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[10px] font-black text-[#76BC21] uppercase hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer group relative ${n.isRead ? 'bg-white border-slate-100' : 'bg-[#76BC21]/5 border-[#76BC21]/20'
                      }`}
                  >
                    {!n.isRead && (
                      <div className="absolute top-5 right-5 w-2 h-2 bg-[#76BC21] rounded-full"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'Deadline' ? 'bg-red-50 text-red-500' :
                          n.type === 'Announcement' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
                        }`}>
                        <i className={`fas ${n.type === 'Deadline' ? 'fa-calendar-exclamation' :
                            n.type === 'Announcement' ? 'fa-bullhorn' : 'fa-comment-alt'
                          }`}></i>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-bold text-sm ${n.isRead ? 'text-slate-700' : 'text-[#1A1A1B]'}`}>{n.title}</h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3">
                          {n.message}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {n.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                  <i className="fas fa-bell-slash text-4xl mb-4"></i>
                  <p className="font-bold text-slate-500">All caught up!</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button className="w-full py-3 bg-[#1A1A1B] text-white rounded-xl text-xs font-black hover:bg-[#76BC21] transition-all">
                Notification Settings
              </button>
            </div>
          </div>
        </>
      )}

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 print:relative print:p-0 print:bg-white">
          <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl relative overflow-hidden print:shadow-none print:rounded-none">
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all print:hidden"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="p-12 md:p-20 border-[16px] border-[#1A1A1B] m-4 relative print:m-0 print:border-[12px]">
              <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-[#76BC21] -m-2"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-[#76BC21] -m-2"></div>

              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 bg-[#1A1A1B] rounded-full flex items-center justify-center text-white text-3xl">
                    <i className="fas fa-award text-[#76BC21]"></i>
                  </div>
                </div>

                <h3 className="text-[#1A1A1B] text-sm font-black uppercase tracking-[0.4em] mb-4">Certificate of Completion</h3>
                <p className="text-slate-400 text-sm mb-12">This is to certify that</p>
                <h2 className="text-5xl md:text-6xl font-serif-brand font-black text-[#1A1A1B] mb-8 border-b-2 border-slate-100 pb-6 inline-block">
                  {studentName}
                </h2>
                <p className="text-slate-500 mb-8 max-w-lg mx-auto leading-relaxed">
                  Has successfully completed the comprehensive training and assessment requirements for the professional course:
                </p>
                <h4 className="text-2xl font-black text-[#76BC21] mb-12 uppercase tracking-tight">
                  {selectedCertificate.courseName}
                </h4>

                <div className="flex flex-col md:flex-row items-center justify-between mt-16 pt-12 border-t border-slate-100">
                  <div className="text-left mb-8 md:mb-0">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Date Issued</p>
                    <p className="font-bold text-slate-800">{selectedCertificate.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-serif-brand italic text-2xl text-slate-700 mb-1">Dr. Sarah Chen</div>
                    <div className="h-px w-48 bg-slate-300 ml-auto mb-2"></div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Academy Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 print:hidden">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center space-x-5">
            <div className="relative group cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
              <img
                src={avatarUrl}
                alt={studentName}
                className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <i className="fas fa-edit text-white text-sm"></i>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#76BC21] rounded-full border-4 border-slate-50 flex items-center justify-center">
                <i className="fas fa-check text-[8px] text-white"></i>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#1A1A1B]">Welcome back, Alex!</h1>
              <p className="text-slate-500 font-medium">Your coding journey is <span className="text-[#76BC21] font-bold">45% complete</span> overall.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#76BC21] transition-all shadow-sm"
            >
              <i className="fas fa-bell"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="bg-white text-slate-700 px-6 py-3 rounded-xl font-bold shadow-sm border border-slate-200 hover:border-[#76BC21] transition-all text-sm"
            >
              <i className="fas fa-user-edit mr-2"></i> Profile
            </button>
            <button className="bg-[#1A1A1B] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#76BC21] transition-all text-sm">
              Resume Learning
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-[#1A1A1B]">Active & Completed Courses</h2>
                <button className="text-[#76BC21] text-xs font-black uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="space-y-8">
                {PROGRESS_DATA.map((item) => (
                  <div key={item.courseId} className="group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#76BC21] transition-colors">{item.courseName}</h3>
                        {item.progress === 100 && (
                          <span className="bg-yellow-50 text-yellow-600 border border-yellow-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-md flex items-center">
                            <i className="fas fa-star mr-1"></i> Completed
                          </span>
                        )}
                      </div>
                      <span className={`text-lg font-black text-slate-800 ${item.progress < 100 && item.progress > 0 ? 'animate-text-pulse' : ''}`}>
                        {item.progress}%
                      </span>
                    </div>

                    {/* ENHANCED Progress Bar Track */}
                    <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-6 progress-track-inner p-[2px] relative border border-slate-200/50">
                      {/* Fixed Glass Reflection Line */}
                      <div className="absolute inset-0 z-10 progress-glass-reflection rounded-full pointer-events-none opacity-50"></div>

                      {/* Active Progress Fill */}
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative ${item.progress === 100
                            ? 'bg-[#1A1A1B] animate-completion-glow'
                            : 'bg-gradient-to-r from-[#76BC21] via-[#95D143] to-[#76BC21] animate-gradient-shift'
                          }`}
                        style={{ width: `${item.progress}%` }}
                      >
                        {/* Shimmer & Reflection Overlays */}
                        {item.progress > 0 && item.progress < 100 && (
                          <>
                            {/* Primary Sharp Shimmer */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-progress-shimmer z-20"></div>
                            {/* Secondary Slow Reflection Sweep */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-reflection-sweep z-10"></div>
                            {/* Pulsing Lead Glow Tip */}
                            <div className="absolute top-0 right-0 h-full w-2 bg-white/60 blur-[6px] animate-tip-pulse z-30"></div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className={`rounded-2xl p-4 flex items-center justify-between border transition-all ${item.progress === 100 ? 'bg-[#1A1A1B]/5 border-[#1A1A1B]/10' : 'bg-slate-50 border-slate-100'
                      }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${item.progress === 100 ? 'bg-[#1A1A1B] text-[#76BC21]' : 'bg-white text-[#76BC21]'
                          }`}>
                          <i className={`fas ${item.progress === 100 ? 'fa-check-circle' : 'fa-play-circle'}`}></i>
                        </div>
                        <span className={`text-sm font-bold truncate max-w-[200px] md:max-w-xs ${item.progress === 100 ? 'text-[#1A1A1B]' : 'text-slate-600'
                          }`}>{item.nextLesson}</span>
                      </div>
                      {item.progress === 100 ? (
                        <button
                          onClick={() => setSelectedCertificate({ courseName: item.courseName, date: 'Oct 12, 2023' })}
                          className="bg-[#76BC21] text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-[#1A1A1B] transition-all shadow-lg shadow-[#76BC21]/20"
                        >
                          Certificate
                        </button>
                      ) : (
                        <button className="text-xs font-black text-[#76BC21] hover:text-[#1A1A1B] transition-colors">Continue</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Messaging & Recent Conversations */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-[#1A1A1B]">Faculty Hub</h2>
                <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-[#76BC21] rounded-full mr-2 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Instructors Online</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {INSTRUCTORS.map((instructor, i) => (
                  <div key={i} className="group p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#76BC21] transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-3">
                        <img src={instructor.img} alt={instructor.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm" />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-50 ${instructor.status === 'Online' ? 'bg-[#76BC21]' : 'bg-amber-400'}`}></div>
                      </div>
                      <h4 className="font-bold text-sm text-slate-800 mb-0.5">{instructor.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mb-4">{instructor.specialty}</p>

                      <div className="flex space-x-2 w-full">
                        <button
                          onClick={() => {
                            setSelectedInstructor(instructor);
                            setIsMessageModalOpen(true);
                          }}
                          className="flex-grow bg-white text-slate-600 border border-slate-200 py-2 rounded-lg text-[10px] font-black hover:bg-[#76BC21] hover:text-white transition-all"
                        >
                          Message
                        </button>
                        <button
                          onClick={() => triggerIncomingMessage(instructor)}
                          title="Simulate Instructor Sending Message"
                          className="bg-[#1A1A1B] text-[#76BC21] w-10 py-2 rounded-lg text-[10px] flex items-center justify-center hover:bg-[#76BC21] hover:text-white transition-all"
                        >
                          <i className="fas fa-vial"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-50 pt-8">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Recent Conversations</h3>
                {messageHistory.length > 0 ? (
                  <div className="space-y-3">
                    {messageHistory.slice(0, 3).map((msg, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-[#76BC21]/10 text-[#76BC21] flex items-center justify-center shrink-0">
                            <i className="fas fa-comment-dots text-xs"></i>
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-bold text-slate-800 truncate">{msg.message}</p>
                            <p className="text-[10px] text-slate-400">{msg.timestamp}</p>
                          </div>
                        </div>
                        <button className="text-[10px] font-black text-[#76BC21] uppercase shrink-0 ml-4 hover:underline">View</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-2xl">
                    <p className="text-[10px] text-slate-400 font-bold italic">No recent messages yet. Start a chat with a mentor above.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Upcoming Deadlines with Toggle */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-[#1A1A1B]">Upcoming Deadlines</h2>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setDeadlineViewMode('list')}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${deadlineViewMode === 'list' ? 'bg-white text-[#76BC21] shadow-sm' : 'text-slate-400'}`}
                  >
                    <i className="fas fa-list-ul"></i>
                  </button>
                  <button
                    onClick={() => setDeadlineViewMode('calendar')}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${deadlineViewMode === 'calendar' ? 'bg-white text-[#76BC21] shadow-sm' : 'text-slate-400'}`}
                  >
                    <i className="fas fa-calendar-day"></i>
                  </button>
                </div>
              </div>

              {deadlineViewMode === 'list' ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {DEADLINES.map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#76BC21]/30 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${deadline.type === 'Exam' ? 'bg-red-50 text-red-500' :
                            deadline.type === 'Quiz' ? 'bg-orange-50 text-orange-500' :
                              'bg-blue-50 text-blue-500'
                          }`}>
                          <i className={`fas ${deadline.type === 'Exam' ? 'fa-file-signature' :
                              deadline.type === 'Quiz' ? 'fa-stopwatch' : 'fa-tasks'
                            }`}></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{deadline.title}</h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#76BC21]">{deadline.type}</span>
                            <span className="text-[10px] text-slate-400 flex items-center">
                              <i className="far fa-clock mr-1"></i> {deadline.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${deadline.priority === 'High' ? 'bg-red-100 text-red-600' :
                          deadline.priority === 'Medium' ? 'bg-amber-100 text-amber-600' :
                            'bg-slate-200 text-slate-600'
                        }`}>
                        {deadline.priority}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in duration-300">
                  {/* Calendar View */}
                  <div className="flex items-center justify-between mb-6 px-2">
                    <button onClick={() => changeMonth(-1)} className="text-slate-400 hover:text-[#76BC21]"><i className="fas fa-chevron-left"></i></button>
                    <h3 className="font-black text-[#1A1A1B] uppercase tracking-widest text-xs">
                      {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(calendarMonth)}
                    </h3>
                    <button onClick={() => changeMonth(1)} className="text-slate-400 hover:text-[#76BC21]"><i className="fas fa-chevron-right"></i></button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                      <div key={d} className="text-center text-[10px] font-black text-slate-300 py-2">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarData.map((d, i) => (
                      <div
                        key={i}
                        className={`aspect-square flex flex-col items-center justify-center rounded-xl relative border border-transparent transition-all ${d.day ? 'hover:bg-slate-50 cursor-pointer' : ''
                          } ${d.deadlines && d.deadlines.length > 0 ? 'bg-[#76BC21]/5 border-[#76BC21]/20' : ''}`}
                      >
                        {d.day && (
                          <>
                            <span className={`text-xs font-bold ${d.deadlines && d.deadlines.length > 0 ? 'text-[#76BC21]' : 'text-slate-500'}`}>
                              {d.day}
                            </span>
                            {d.deadlines && d.deadlines.length > 0 && (
                              <div className="flex space-x-0.5 mt-1">
                                {d.deadlines.map((dl, idx) => (
                                  <div key={idx} className={`w-1.5 h-1.5 rounded-full ${dl.priority === 'High' ? 'bg-red-500' : dl.priority === 'Medium' ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Legend */}
                  <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap gap-4 justify-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High Priority</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medium</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Standard</span>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <section className="bg-[#1A1A1B] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#76BC21]/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h2 className="text-xl font-black mb-8 relative z-10">Certification Status</h2>
              <div className="space-y-6 relative z-10">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-[#76BC21] flex items-center justify-center text-xs">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Medical Terminology</h4>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">Completed • Aug 2023</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full border-2 border-[#76BC21] flex items-center justify-center text-xs text-[#76BC21]">
                    <i className="fas fa-sync-alt fa-spin"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">AAPC CPC Certification</h4>
                    <p className="text-[10px] text-[#76BC21] mt-1 uppercase tracking-widest font-black">In Progress • 65%</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-10 py-4 bg-[#76BC21] text-white rounded-2xl font-black text-sm hover:bg-[#65a11c] transition-all shadow-xl">
                Register for Board Exam
              </button>
            </section>

            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm border-t-8 border-t-[#76BC21]">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#76BC21] text-2xl">
                  <i className="fas fa-robot"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">SmartPath AI</h3>
                  <p className="text-xs text-slate-400">Ready to assist your career</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                "Based on your progress in CPC, you're currently in the top 10% of your cohort. Consider booking your exam for early December."
              </p>
              <button className="text-[#76BC21] text-xs font-black uppercase tracking-widest hover:text-[#1A1A1B] transition-colors">
                Chat with Advisor <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;