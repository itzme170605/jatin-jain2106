'use client'
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Calendar, 
  User, 
  MessageSquare, 
  Eye, 
  Check, 
  Clock, 
  Archive,
  Search,
  LogOut
} from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
  timestamp: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  updatedAt?: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAttemptedAuth, setHasAttemptedAuth] = useState(false);

  const fetchSubmissions = useCallback(async (key: string) => {
    if (!key.trim() || loading) return;
    
    try {
      setLoading(true);
      setAuthError('');
      
      const response = await fetch(`/api/contact?key=${encodeURIComponent(key.trim())}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmissions(data.submissions || []);
        setIsAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError(data.error || 'Authentication failed');
        setIsAuthenticated(false);
        setSubmissions([]);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setAuthError('Failed to connect to server');
      setIsAuthenticated(false);
      setSubmissions([]);
    } finally {
      setLoading(false);
      setHasAttemptedAuth(true);
    }
  }, [loading]);

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!adminKey.trim()) {
      setAuthError('Please enter an admin key');
      return;
    }
    
    if (!loading && !isAuthenticated) {
      fetchSubmissions(adminKey);
    }
  }, [adminKey, loading, isAuthenticated, fetchSubmissions]);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setAdminKey('');
    setSubmissions([]);
    setAuthError('');
    setSelectedSubmission(null);
    setHasAttemptedAuth(false);
  }, []);

  const updateSubmissionStatus = useCallback(async (id: string, status: Submission['status']) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status, adminKey }),
      });

      if (response.ok) {
        setSubmissions(prev => 
          prev.map(sub => 
            sub.id === id ? { ...sub, status, updatedAt: new Date().toISOString() } : sub
          )
        );
        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission(prev => prev ? { ...prev, status } : null);
        }
      }
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  }, [adminKey, selectedSubmission]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesFilter = filter === 'all' || submission.status === filter;
    const matchesSearch = 
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: Submission['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'read': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'replied': return 'bg-green-100 text-green-800 border-green-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Submission['status']) => {
    switch (status) {
      case 'new': return <Mail size={16} />;
      case 'read': return <Eye size={16} />;
      case 'replied': return <Check size={16} />;
      case 'archived': return <Archive size={16} />;
      default: return <Clock size={16} />;
    }
  };

  // Login Form Component
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter your admin key to access the dashboard</p>
          </div>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Key
              </label>
              <input
                type="password"
                id="adminKey"
                name="adminKey"
                placeholder="Enter admin key"
                value={adminKey}
                onChange={(e) => {
                  setAdminKey(e.target.value);
                  if (authError) setAuthError(''); // Clear error on typing
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                disabled={loading}
                autoComplete="new-password"
                required
              />
            </div>
            
            {authError && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                {authError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading || !adminKey.trim()}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-medium"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Authenticating...
                </>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center mb-2">For testing purposes:</p>
            <code className="text-xs bg-white px-2 py-1 rounded border text-center block">
              your-admin-key-here
            </code>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
              <p className="text-gray-600">Manage and respond to contact form submissions</p>
            </div>
            <div className="flex gap-3 items-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredSubmissions.length} submissions
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm px-3 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredSubmissions.map((submission) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-lg shadow-sm border-l-4 p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedSubmission?.id === submission.id ? 'ring-2 ring-blue-500' : ''
                } ${submission.status === 'new' ? 'border-l-blue-500' : 'border-l-gray-300'}`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{submission.subject}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User size={14} />
                      <span>{submission.name}</span>
                      <span>•</span>
                      <span>{submission.email}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                    {getStatusIcon(submission.status)}
                    {submission.status}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {submission.message}
                </p>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(submission.timestamp).toLocaleDateString()}
                  </div>
                  {submission.projectType && submission.projectType !== 'Not specified' && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {submission.projectType}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}

            {filteredSubmissions.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <MessageSquare className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600">
                  {submissions.length === 0 ? 'No submissions yet' : 'No submissions match your search'}
                </p>
              </div>
            )}
          </div>

          {/* Submission Details */}
          <div className="lg:col-span-1">
            {selectedSubmission ? (
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Submission Details</h3>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedSubmission.status)}`}>
                    {getStatusIcon(selectedSubmission.status)}
                    {selectedSubmission.status}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-900">{selectedSubmission.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{selectedSubmission.email}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <p className="text-gray-900">{selectedSubmission.subject}</p>
                  </div>
                  
                  {selectedSubmission.projectType && selectedSubmission.projectType !== 'Not specified' && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Project Type</label>
                      <p className="text-gray-900">{selectedSubmission.projectType}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg text-sm leading-relaxed">
                      {selectedSubmission.message}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Received</label>
                    <p className="text-gray-900">
                      {new Date(selectedSubmission.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="mt-6 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Update Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateSubmissionStatus(selectedSubmission.id, 'read')}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                    >
                      <Eye size={14} />
                      Mark Read
                    </button>
                    <button
                      onClick={() => updateSubmissionStatus(selectedSubmission.id, 'replied')}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                    >
                      <Check size={14} />
                      Replied
                    </button>
                  </div>
                  <button
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, 'archived')}
                    className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Archive size={14} />
                    Archive
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href={`mailto:${selectedSubmission.email}?subject=Re: ${encodeURIComponent(selectedSubmission.subject)}&body=Hi ${encodeURIComponent(selectedSubmission.name)},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A`}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    <Mail size={16} />
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <MessageSquare className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600">Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}