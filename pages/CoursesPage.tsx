
import React, { useState, useMemo } from 'react';
import { Course } from '../types';

const COURSES: Course[] = [
  {
    id: 'basic-coding',
    title: 'Basic Medical Coding Training',
    description: 'Foundation course covering medical terminology, anatomy, and introductory coding guidelines. Perfect for beginners.',
    duration: '3 Months',
    level: 'Beginner',
    modules: ['Medical Terminology', 'Anatomy & Physiology', 'Introduction to ICD-10', 'Introduction to CPT', 'Healthcare Compliance'],
    price: 'Contact for Price',
    icon: 'fa-book-medical'
  },
  {
    id: 'advance-coding',
    title: 'Advance Medical Coding Training',
    description: 'Comprehensive training for inpatient and outpatient coding, including complex scenarios, specialties, and case studies.',
    duration: '6 Months',
    level: 'Advanced',
    modules: ['Advanced ICD-10-CM', 'CPT Surgery Sections', 'E/M Coding', 'Compliance & Auditing', 'Specialty Coding'],
    price: 'Contact for Price',
    icon: 'fa-user-md'
  },
  {
    id: 'cpc-training',
    title: 'CPC Training',
    description: 'Targeted preparation for the AAPC Certified Professional Coder (CPC) exam with intensive mock tests and exam strategies.',
    duration: '4 Months',
    level: 'Intermediate',
    modules: ['Examination Guidelines', 'Mock Exams', 'Time Management', 'Code Set Navigation', 'Practice Questions'],
    price: 'Contact for Price',
    icon: 'fa-certificate'
  },
  {
    id: 'crc-training',
    title: 'CRC Training',
    description: 'Specialized training for the Certified Risk Adjustment Coder (CRC) credential, focusing on risk adjustment models.',
    duration: '3 Months',
    level: 'Advanced',
    modules: ['Risk Adjustment Models', 'Hierarchical Condition Categories (HCC)', 'Documentation Improvement', 'Predictive Modeling'],
    price: 'Contact for Price',
    icon: 'fa-chart-line'
  }
];

const CoursesPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      const matchesFilter = filter === 'All' || course.level === filter;
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.modules.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const clearFilters = () => {
    setFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="py-20 bg-slate-50 min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1B] mb-6">Our Elite Programs</h1>
          <p className="text-slate-500 max-w-2xl mx-auto mb-10">
            Professional certifications tailored for success in the evolving healthcare landscape. Find your specialized path today.
          </p>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className={`fas fa-search transition-colors ${searchQuery ? 'text-[#76BC21]' : 'text-slate-400'}`}></i>
              </div>
              <input
                type="text"
                placeholder="Search by course name, topic, or module..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-12 py-4 border border-slate-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-[#76BC21] focus:border-[#76BC21] outline-none transition-all placeholder:text-slate-400 text-slate-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#1A1A1B] transition-colors"
                >
                  <i className="fas fa-times-circle"></i>
                </button>
              )}
            </div>

            {/* Level Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilter(lvl as any)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border duration-300 transform ${filter === lvl
                      ? 'bg-[#76BC21] text-white border-[#76BC21] shadow-xl shadow-[#76BC21]/30 scale-105 ring-4 ring-[#76BC21]/20 z-10'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#76BC21] hover:text-[#76BC21] hover:scale-102'
                    }`}
                >
                  {filter === lvl && <i className="fas fa-check-circle mr-2 animate-in zoom-in duration-300"></i>}
                  {lvl}
                </button>
              ))}
            </div>

            {/* Course Counter */}
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest pt-4">
              Showing <span className="text-[#1A1A1B]">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'Course' : 'Courses'}
            </div>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 text-left max-w-6xl mx-auto">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col md:flex-row group">
                <div className="md:w-1/3 bg-[#1A1A1B] flex items-center justify-center p-8 group-hover:bg-[#76BC21] transition-colors duration-500">
                  <div className="text-white text-6xl transform group-hover:scale-110 transition-transform duration-500">
                    <i className={`fas ${course.icon}`}></i>
                  </div>
                </div>
                <div className="p-8 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                          course.level === 'Intermediate' ? 'bg-orange-100 text-orange-700' :
                            'bg-purple-100 text-purple-700'
                        }`}>
                        {course.level}
                      </span>
                      <span className="text-[#76BC21] font-black text-lg">{course.price}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-[#76BC21] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <i className="far fa-clock mr-2 text-[#76BC21]"></i>
                      {course.duration}
                    </div>
                    <button className="bg-slate-100 text-[#1A1A1B] px-5 py-2 rounded-lg text-xs font-black hover:bg-[#76BC21] hover:text-white transition-all active:scale-95 shadow-sm">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 max-w-2xl mx-auto animate-in zoom-in duration-300">
            <div className="text-6xl text-slate-200 mb-6">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No courses found</h3>
            <p className="text-slate-500 mb-8">We couldn't find any courses matching your current search or filters.</p>
            <button
              onClick={clearFilters}
              className="bg-[#1A1A1B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#76BC21] transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
