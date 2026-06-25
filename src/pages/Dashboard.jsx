import React, { useMemo } from 'react';
import { Users, User, UserPlus, Mail, TrendingUp } from 'lucide-react';
import { usePatients } from '../hooks/usePatients';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  // map color prefix (e.g. 'primary', 'blue') to specific gradient classes
  const getGradient = (baseColor) => {
    if (baseColor.includes('primary')) return 'from-primary-500/10 to-primary-500/5 dark:from-primary-500/20 dark:to-primary-500/5 text-primary-600 dark:text-primary-400';
    if (baseColor.includes('blue')) return 'from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/5 text-blue-600 dark:text-blue-400';
    if (baseColor.includes('pink')) return 'from-pink-500/10 to-pink-500/5 dark:from-pink-500/20 dark:to-pink-500/5 text-pink-600 dark:text-pink-400';
    if (baseColor.includes('purple')) return 'from-purple-500/10 to-purple-500/5 dark:from-purple-500/20 dark:to-purple-500/5 text-purple-600 dark:text-purple-400';
    return 'from-slate-500/10 to-slate-500/5 text-slate-600';
  };

  const gradientClass = getGradient(color);

  return (
    <div className="card relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-50`}></div>
      <div className={`absolute -right-6 -top-6 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 ${gradientClass.split(' ').pop()}`}>
        <Icon className="w-32 h-32" />
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl bg-white dark:bg-dark-800 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 ${gradientClass.split(' ').pop()}`}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <div className="flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-400/20">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              {trend}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { patients, loading, error, refresh } = usePatients();

  const stats = useMemo(() => {
    if (!patients || patients.length === 0) return null;

    let total = patients.length;
    let male = 0;
    let female = 0;
    let withEmail = 0;

    patients.forEach(p => {
      if (p.gender === 'Male') male++;
      else if (p.gender === 'Female') female++;
      
      if (p.email && p.email.trim() !== '') withEmail++;
    });

    return { total, male, female, withEmail };
  }, [patients]);

  if (loading && !stats) {
    return (
      <div className="h-[calc(100vh-120px)] flex items-center justify-center">
        <Loader text="Loading dashboard data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <ErrorMessage message={error.message} type={error.type} onRetry={refresh} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Here's a summary of your patient data for the current view.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value={stats?.total || 0} 
          icon={Users} 
          color="bg-primary-500 dark:bg-primary-400"
          trend="+12%"
        />
        <StatCard 
          title="Male Patients" 
          value={stats?.male || 0} 
          icon={User} 
          color="bg-blue-500 dark:bg-blue-400" 
        />
        <StatCard 
          title="Female Patients" 
          value={stats?.female || 0} 
          icon={UserPlus} 
          color="bg-pink-500 dark:bg-pink-400" 
        />
        <StatCard 
          title="With Email" 
          value={stats?.withEmail || 0} 
          icon={Mail} 
          color="bg-purple-500 dark:bg-purple-400" 
        />
      </div>

      <div className="card relative p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white border-0 shadow-xl overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoMTB2MTBIMHptMjAgMjBoMTB2MTBIMjB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-20"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-3 tracking-tight">Manage Your Patients</h2>
          <p className="text-indigo-100/90 text-lg leading-relaxed">
            View detailed patient records, search by ID or name, and manage clinic data efficiently using our modern patient management system.
          </p>
        </div>
        <Link 
          to={ROUTES.PATIENTS} 
          className="relative z-10 whitespace-nowrap px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          View All Patients
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
