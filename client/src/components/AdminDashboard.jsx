import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  FaSignOutAlt,
  FaSearch,
  FaFilter,
  FaUserGraduate,
  FaSpinner,
  FaClock,
  FaCheck,
  FaTrashAlt,
  FaEdit,
  FaBell,
  FaTimes,
  FaInfoCircle,
  FaClipboardList,
} from 'react-icons/fa';
import { getEnquiries, updateEnquiry, deleteEnquiry } from '../services/api';

export default function AdminDashboard({ token, onLogout }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtering / Search / Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected item operations
  const [editingEnquiry, setEditingEnquiry] = useState(null);
  const [editStatus, setEditStatus] = useState('Pending');
  const [editNotes, setEditNotes] = useState('');
  const [deletingEnquiry, setDeletingEnquiry] = useState(null);

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeToast, setActiveToast] = useState(null);

  // Fetch enquiries initially
  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getEnquiries(token);
      if (res.success) {
        setEnquiries(res.enquiries);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch registrations.');
    } finally {
      setLoading(false);
    }
  };

  // Real-time listener using Socket.io
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5001');

    socket.on('connect', () => {
      console.log('Socket.io Admin connected');
    });

    socket.on('new-enquiry', (newEnquiry) => {
      // Prepend to enquiries list
      setEnquiries((prev) => [newEnquiry, ...prev]);

      // Add to notifications
      const newNotif = {
        id: newEnquiry._id || Math.random().toString(),
        name: newEnquiry.name,
        email: newEnquiry.email,
        phone: newEnquiry.phone,
        time: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);

      // Show toast
      setActiveToast(newNotif);

      // Play dynamic sound chime
      playChime();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Play electronic alert sound
  const playChime = () => {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      
      // High note
      const osc1 = context.createOscillator();
      const gain1 = context.createGain();
      osc1.frequency.setValueAtTime(523.25, context.currentTime); // C5
      osc1.connect(gain1);
      gain1.connect(context.destination);
      gain1.gain.setValueAtTime(0.15, context.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.3);
      osc1.start(context.currentTime);
      osc1.stop(context.currentTime + 0.3);

      // Higher follow-up note
      const osc2 = context.createOscillator();
      const gain2 = context.createGain();
      osc2.frequency.setValueAtTime(659.25, context.currentTime + 0.12); // E5
      osc2.connect(gain2);
      gain2.connect(context.destination);
      gain2.gain.setValueAtTime(0.2, context.currentTime + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5);
      osc2.start(context.currentTime + 0.12);
      osc2.stop(context.currentTime + 0.5);
    } catch (e) {
      console.warn('AudioContext chime blocked or unsupported:', e);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Clear single toast
  const dismissToast = () => {
    setActiveToast(null);
  };

  // Filtered registrations list
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination bounds
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Open Edit Modal
  const openEditModal = (enquiry) => {
    setEditingEnquiry(enquiry);
    setEditStatus(enquiry.status || 'Pending');
    setEditNotes(enquiry.notes || '');
  };

  // Submit Edit changes to backend
  const handleSaveEdit = async () => {
    if (!editingEnquiry) return;
    try {
      const res = await updateEnquiry(editingEnquiry._id, { status: editStatus, notes: editNotes }, token);
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item._id === editingEnquiry._id ? res.enquiry : item))
        );
        setEditingEnquiry(null);
      }
    } catch (err) {
      alert(err.message || 'Could not update record');
    }
  };

  // Handle delete enquiry
  const handleDeleteConfirm = async () => {
    if (!deletingEnquiry) return;
    try {
      const res = await deleteEnquiry(deletingEnquiry._id, token);
      if (res.success) {
        setEnquiries((prev) => prev.filter((item) => item._id !== deletingEnquiry._id));
        setDeletingEnquiry(null);
      }
    } catch (err) {
      alert(err.message || 'Could not delete record');
    }
  };

  // Stats calculation
  const totalCount = enquiries.length;
  const pendingCount = enquiries.filter((e) => e.status === 'Pending').length;
  const contactedCount = enquiries.filter((e) => e.status === 'Contacted').length;
  const enrolledCount = enquiries.filter((e) => e.status === 'Enrolled').length;

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-x-hidden">
      {/* Realtime Toast Banner */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white rounded-3xl shadow-2xl border border-indigo-100 p-5 flex flex-col space-y-3 animate-bounce">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-lg">
                🎉
              </div>
              <div>
                <h5 className="font-black text-sm text-slate-900">New Registration!</h5>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Just Now</p>
              </div>
            </div>
            <button onClick={dismissToast} className="text-slate-400 hover:text-slate-600 font-black">
              ✕
            </button>
          </div>
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 text-xs space-y-1">
            <p className="text-slate-800 font-bold"><span className="text-slate-400 font-semibold">Name:</span> {activeToast.name}</p>
            <p className="text-slate-800 font-semibold"><span className="text-slate-400 font-semibold">Phone:</span> {activeToast.phone}</p>
            <p className="text-slate-800 font-semibold"><span className="text-slate-400 font-semibold">Email:</span> {activeToast.email}</p>
          </div>
          <button
            onClick={() => {
              setSearchQuery(activeToast.name);
              dismissToast();
            }}
            className="w-full text-center py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black shadow-md shadow-indigo-100 transition-all"
          >
            View Registration
          </button>
        </div>
      )}

      {/* Main Admin Header */}
      <header className="bg-white border-b border-slate-100 py-5 px-6 md:px-12 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100">
            K
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Kidrove Admin</h1>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Workshop Enquiries</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen);
                if (!isNotificationOpen) markAllAsRead();
              }}
              className="relative h-10 w-10 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 rounded-2xl flex items-center justify-center transition-all border border-slate-100"
            >
              <FaBell className="text-base" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-40 py-2">
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-black text-slate-800 text-sm">Real-time Stream</h4>
                  <button
                    onClick={() => setNotifications([])}
                    className="text-[10px] text-slate-400 hover:text-red-500 font-black uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs font-semibold">
                      No live notifications yet.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="px-4 py-3.5 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex items-start gap-3 transition-colors"
                      >
                        <div className="h-8 w-8 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                          👤
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-slate-700 font-bold">
                            <span className="text-indigo-600">{notif.name}</span> registered for the workshop.
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md active:scale-95"
          >
            <FaSignOutAlt className="text-sm" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-12 py-10 space-y-10">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1 text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Registrations</p>
              <h3 className="text-3xl font-black text-slate-900">{loading ? '...' : totalCount}</h3>
            </div>
            <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl">
              <FaClipboardList />
            </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1 text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending</p>
              <h3 className="text-3xl font-black text-amber-500">{loading ? '...' : pendingCount}</h3>
            </div>
            <div className="h-12 w-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center text-xl">
              <FaClock />
            </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1 text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contacted</p>
              <h3 className="text-3xl font-black text-blue-500">{loading ? '...' : contactedCount}</h3>
            </div>
            <div className="h-12 w-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-xl">
              <FaInfoCircle />
            </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1 text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enrolled</p>
              <h3 className="text-3xl font-black text-emerald-500">{loading ? '...' : enrolledCount}</h3>
            </div>
            <div className="h-12 w-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-xl">
              <FaCheck />
            </div>
          </div>
        </section>

        {/* Database Enquiries Table Section */}
        <section className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-left">
          {/* Controls Bar */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Manage Submissions</h3>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-grow sm:flex-none">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search name, email, phone..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-64 pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100/50 transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1">
                <FaFilter className="text-slate-400 text-[10px] mr-2" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-0 outline-none text-xs font-bold text-slate-700 py-2 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Enrolled">Enrolled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Container */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <FaSpinner className="text-indigo-600 text-3xl animate-spin" />
              <p className="text-slate-500 font-bold text-xs">Loading enquiries database...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center text-red-500 font-black text-sm max-w-md mx-auto px-4">
              {error}
              <button
                onClick={fetchData}
                className="mt-4 block mx-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
              >
                Retry Fetch
              </button>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-slate-400 font-bold text-sm">No registrations match your search/filter parameters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4.5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Student Info</th>
                    <th className="px-6 py-4.5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Contact Details</th>
                    <th className="px-6 py-4.5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Registration Date</th>
                    <th className="px-6 py-4.5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Status</th>
                    <th className="px-6 py-4.5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Admin Notes</th>
                    <th className="px-6 py-4.5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentItems.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-sm">
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-800 leading-tight">{item.name}</p>
                            <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                              Student
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5.5 space-y-0.5">
                        <p className="text-xs text-slate-600 font-semibold">{item.email}</p>
                        <p className="text-xs text-slate-500 font-bold">{item.phone}</p>
                      </td>
                      <td className="px-6 py-5.5 text-xs text-slate-500 font-semibold">
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-5.5">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block ${
                            item.status === 'Enrolled'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : item.status === 'Contacted'
                              ? 'bg-blue-50 text-blue-600 border border-blue-100'
                              : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}
                        >
                          {item.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-5.5 max-w-[200px] truncate">
                        <p className="text-xs text-slate-500 italic font-semibold">
                          {item.notes ? item.notes : 'No custom notes.'}
                        </p>
                      </td>
                      <td className="px-6 py-5.5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="h-8 w-8 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl flex items-center justify-center transition-colors border border-slate-100"
                            title="Edit Status / Notes"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                          <button
                            onClick={() => setDeletingEnquiry(item)}
                            className="h-8 w-8 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-xl flex items-center justify-center transition-colors border border-slate-100"
                            title="Delete Enquiry"
                          >
                            <FaTrashAlt className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/20">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredEnquiries.length)} of {filteredEnquiries.length}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-600 transition-colors disabled:opacity-50"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`h-8 w-8 rounded-xl text-xs font-black transition-colors ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                        : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-600 transition-colors disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Edit Status & Notes Modal */}
      {editingEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setEditingEnquiry(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden z-10 p-8 text-left space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">Edit Enquiry</h4>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                  Update status and log custom notes
                </p>
              </div>
              <button
                onClick={() => setEditingEnquiry(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Info Snippet */}
              <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl text-xs space-y-1">
                <p className="text-slate-800 font-bold"><span className="text-slate-400 font-semibold">Name:</span> {editingEnquiry.name}</p>
                <p className="text-slate-800 font-semibold"><span className="text-slate-400 font-semibold">Phone:</span> {editingEnquiry.phone}</p>
                <p className="text-slate-800 font-semibold"><span className="text-slate-400 font-semibold">Email:</span> {editingEnquiry.email}</p>
              </div>

              {/* Status Select */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Process Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 text-sm font-semibold px-4 py-3 cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Enrolled">Enrolled</option>
                </select>
              </div>

              {/* Notes Area */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Action Logs / Custom Notes
                </label>
                <textarea
                  placeholder="Record interaction notes here..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 text-sm font-semibold px-4 py-3 resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleSaveEdit}
              className="w-full font-black text-sm py-4 rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all"
            >
              Save Record Changes
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setDeletingEnquiry(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden z-10 p-8 text-center space-y-6">
            <div className="mx-auto h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl border border-red-100 shadow-inner">
              ⚠️
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">Remove Registration</h4>
              <p className="text-xs text-slate-500 font-semibold mt-2 leading-relaxed">
                Are you sure you want to delete <span className="text-slate-800 font-black">{deletingEnquiry.name}</span>? This action is permanent and cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingEnquiry(null)}
                className="flex-1 font-black text-xs py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 font-black text-xs py-3.5 rounded-2xl text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-100 hover:shadow-red-200 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
