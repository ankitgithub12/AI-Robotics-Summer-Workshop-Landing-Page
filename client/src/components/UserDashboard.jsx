import { useState, useEffect } from 'react';
import {
  FaSignOutAlt,
  FaBookReader,
  FaFileDownload,
  FaCheckCircle,
  FaLock,
  FaChevronRight,
  FaCalendarAlt,
  FaLaptopCode,
  FaEnvelopeOpenText,
  FaPaperPlane,
} from 'react-icons/fa';
import { getUserProfile } from '../services/api';

export default function UserDashboard({ token, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Course progress tracking states (saved locally for interactive feel)
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : {};
  });

  // Support ticket form
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getUserProfile(token);
      if (res.success) {
        setProfile(res);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard profile data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLessonToggle = (lessonId) => {
    const updated = { ...completedLessons, [lessonId]: !completedLessons[lessonId] };
    setCompletedLessons(updated);
    localStorage.setItem('completedLessons', JSON.stringify(updated));
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportSubject || !supportMessage) return;
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      setSupportSubject('');
      setSupportMessage('');
    }, 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-bold text-xs">Opening student portal...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 text-center max-w-md mx-auto px-6">
        <div className="h-14 w-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-xl">⚠️</div>
        <p className="text-red-500 font-black text-sm">{error || 'Could not load your workspace.'}</p>
        <button
          onClick={onLogout}
          className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-2xl text-xs"
        >
          Logout & Return
        </button>
      </div>
    );
  }

  const { user, registration } = profile;
  const isRegistered = !!registration;
  const enrollmentStatus = registration?.status || 'Unregistered';

  // Curriculum Data
  const courseWeeks = [
    {
      title: 'Week 1: Foundations of Robotics',
      lessons: [
        { id: 'w1-1', title: 'Introduction to Microcontrollers & Electronics' },
        { id: 'w1-2', title: 'Working with Actuators, DC Motors & Servos' },
        { id: 'w1-3', title: 'Sensors: Ultrasonic, Infrared & Light' },
      ],
    },
    {
      title: 'Week 2: Autonomous Navigation',
      lessons: [
        { id: 'w2-1', title: 'Robotics Control Loops (PID Basics)' },
        { id: 'w2-2', title: 'Writing Obstacle Avoidance Algorithms' },
        { id: 'w2-3', title: 'Line Following Logic & Implementations' },
      ],
    },
    {
      title: 'Week 3: Artificial Intelligence & Vision',
      lessons: [
        { id: 'w3-1', title: 'Introduction to OpenCV and Image Arrays' },
        { id: 'w3-2', title: 'Color Segmentation & Face Tracking' },
        { id: 'w3-3', title: 'Integrating ML Models on Edge Devices' },
      ],
    },
  ];

  // Calculate total lessons & completed
  const totalLessons = courseWeeks.reduce((acc, week) => acc + week.lessons.length, 0);
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header banner */}
      <header className="bg-white border-b border-slate-100 py-5 px-6 md:px-12 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100">
            K
          </div>
          <div className="text-left">
            <h1 className="text-base font-black text-slate-900 tracking-tight">Kidrove Student Portal</h1>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Workspace</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md active:scale-95"
        >
          <FaSignOutAlt className="text-sm" />
          Logout
        </button>
      </header>

      {/* Workspace container */}
      <main className="max-w-7xl w-full mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Student Info & Course Progress */}
        <section className="lg:col-span-4 space-y-8 text-left">
          {/* Welcome User Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-white/5 blur-xl" />
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-black tracking-widest text-indigo-200 bg-indigo-900/40 border border-indigo-400/20 px-3.5 py-1.5 rounded-full inline-block">
                Welcome Back
              </span>
              <h2 className="text-2xl font-black leading-none">{user.name}</h2>
              <div className="text-xs text-indigo-100/90 font-medium space-y-1">
                <p>📧 {user.email}</p>
                <p>📞 +91 {user.phone}</p>
              </div>
            </div>
          </div>

          {/* Enrollment Info Card */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-base font-black text-slate-900">Summer Workshop Status</h3>

            {isRegistered ? (
              <div className="space-y-5">
                {/* Badge showing status */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-full border ${
                      enrollmentStatus === 'Enrolled'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : enrollmentStatus === 'Contacted'
                        ? 'bg-blue-50 text-blue-600 border-blue-100'
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}
                  >
                    Status: {enrollmentStatus}
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-semibold space-y-3 bg-slate-50 rounded-2xl p-4 border border-slate-100 leading-relaxed">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaCalendarAlt className="text-indigo-600 flex-shrink-0" />
                    <strong>Schedule:</strong> Sat & Sun (10:00 AM)
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaLaptopCode className="text-indigo-600 flex-shrink-0" />
                    <strong>Format:</strong> Live Interactive Batches
                  </div>
                </div>

                {/* Classroom Access Block */}
                <div className="pt-2">
                  {enrollmentStatus === 'Enrolled' ? (
                    <a
                      href="https://zoom.us"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Join Live Zoom Batch</span>
                      <FaChevronRight />
                    </a>
                  ) : (
                    <div className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl text-xs font-black border border-slate-200/50 flex items-center justify-center gap-2 select-none">
                      <FaLock className="text-xs" />
                      <span>Classroom Locked (Pending Enrollment)</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl text-orange-700 text-xs font-semibold leading-relaxed">
                  ⚠️ You are currently logged in but have not completed your registration for the AI & Robotics Summer Workshop.
                </div>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  Submit the registration form on our main portal to secure your seat.
                </p>
                <button
                  onClick={() => {
                    onLogout();
                    setTimeout(() => {
                      const formSection = document.getElementById('register');
                      if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                  }}
                  className="w-full text-center py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black transition-all"
                >
                  Go to Registration Form
                </button>
              </div>
            )}
          </div>

          {/* Interactive Learning Progress */}
          {isRegistered && (
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-black text-slate-900">Learning Progress</h3>
                <span className="text-xs font-black text-indigo-600">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                {completedCount} of {totalLessons} modules finished
              </p>
            </div>
          )}
        </section>

        {/* Right Side: Interactive Curriculum & Materials */}
        <section className="lg:col-span-8 space-y-8 text-left">
          
          {/* Downloads Hub */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-base font-black text-slate-900">Starter Resources Hub</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Resource 1 */}
              <div className="p-4 border border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50 rounded-2xl transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-lg">
                    <FaBookReader />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-slate-800">Robotics Starter Guide</h5>
                    <p className="text-[10px] text-slate-400 font-semibold">PDF File • 4.8 MB</p>
                  </div>
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Robotics Guide downloaded! (Simulated download)');
                  }}
                  className="h-8 w-8 bg-slate-50 hover:bg-indigo-600 text-slate-500 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <FaFileDownload className="text-xs" />
                </a>
              </div>

              {/* Resource 2 */}
              <div className="p-4 border border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50 rounded-2xl transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-lg">
                    <FaLaptopCode />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-slate-800">Arduino Sample Codes</h5>
                    <p className="text-[10px] text-slate-400 font-semibold">ZIP File • 12 MB</p>
                  </div>
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Sample codes downloaded! (Simulated download)');
                  }}
                  className="h-8 w-8 bg-slate-50 hover:bg-purple-600 text-slate-500 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <FaFileDownload className="text-xs" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Curriculum Roadmap */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-black text-slate-900">Interactive Curriculum Tracker</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                Check off topics as you complete them in batches
              </p>
            </div>

            <div className="space-y-6">
              {courseWeeks.map((week, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-extrabold text-xs text-indigo-600 uppercase tracking-wider">{week.title}</h4>
                  <div className="space-y-2.5">
                    {week.lessons.map((lesson) => {
                      const isCompleted = !!completedLessons[lesson.id];
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => handleLessonToggle(lesson.id)}
                          className={`p-3.5 border rounded-2xl flex items-center justify-between cursor-pointer transition-all select-none ${
                            isCompleted
                              ? 'border-emerald-100 bg-emerald-50/40 text-slate-800'
                              : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-5 w-5 rounded-md flex items-center justify-center border transition-colors ${
                                isCompleted
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isCompleted && <span className="text-[10px]">✓</span>}
                            </div>
                            <span className="text-xs font-semibold">{lesson.title}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Support Box */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-black text-slate-900">Need Help? Contact Instructor</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                Submit a query, and we'll reply to your email address
              </p>
            </div>

            {supportSuccess ? (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 p-6 rounded-2xl text-xs font-bold text-center flex flex-col items-center gap-2">
                <FaCheckCircle className="text-2xl" />
                <span>Ticket Submitted! We will contact you at {user.email} shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Question about Week 1 Arduino Setup"
                    value={supportSubject}
                    onChange={(e) => setSupportSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 text-xs font-semibold px-4 py-3"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Message Details
                  </label>
                  <textarea
                    required
                    placeholder="Explain what help you need..."
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 text-xs font-semibold px-4 py-3 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  <span>Submit Inquiry Ticket</span>
                </button>
              </form>
            )}
          </div>

        </section>
      </main>
    </div>
  );
}
