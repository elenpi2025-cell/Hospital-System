import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { Users, AlertCircle, Clock, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS } from '../constants';

const data = [
  { name: 'Mon', patients: 24, critical: 4 },
  { name: 'Tue', patients: 18, critical: 2 },
  { name: 'Wed', patients: 32, critical: 6 },
  { name: 'Thu', patients: 26, critical: 3 },
  { name: 'Fri', patients: 35, critical: 5 },
  { name: 'Sat', patients: 15, critical: 2 },
  { name: 'Sun', patients: 12, critical: 1 },
];

const StatCard = ({ title, value, subtext, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-all duration-200 group">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      <div className="flex items-center gap-1 mt-2">
        <TrendingUp className={`w-3 h-3 ${color === 'red' ? 'text-red-500' : 'text-emerald-500'}`} />
        <p className={`text-xs font-medium ${color === 'red' ? 'text-red-600' : 'text-emerald-600'}`}>
          {subtext}
        </p>
      </div>
    </div>
    <div className={`p-3 rounded-xl transition-colors ${
      color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' : 
      color === 'red' ? 'bg-red-50 text-red-600 group-hover:bg-red-100' : 
      color === 'orange' ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-100' : 
      'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
    }`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const criticalCount = MOCK_PATIENTS.filter(p => p.status === 'Critical').length;
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hospital Overview</h2>
          <p className="text-slate-500">Real-time insights and operational metrics</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="font-medium text-slate-600">Live System</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value="142" 
          subtext="+12% from last week" 
          icon={Users} 
          color="blue" 
        />
        <StatCard 
          title="Critical Cases" 
          value={criticalCount} 
          subtext="Requires immediate attention" 
          icon={AlertCircle} 
          color="red" 
        />
        <StatCard 
          title="Appointments" 
          value={MOCK_APPOINTMENTS.length} 
          subtext="Scheduled for today" 
          icon={Clock} 
          color="orange" 
        />
        <StatCard 
          title="Recovered" 
          value="89" 
          subtext="+5% recovery rate" 
          icon={CheckCircle2} 
          color="green" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Patient Admittance History</h3>
            <button className="text-sm text-teal-600 font-medium hover:text-teal-700 flex items-center gap-1 transition-colors">
              View Report <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="patients" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panel / Charts */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-6">Department Status</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.slice(-5)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={5}/>
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none'}}/>
                  <Bar dataKey="critical" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="patients" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
             <h3 className="font-semibold mb-2 relative z-10">System Status</h3>
             <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between text-sm">
                   <span className="text-slate-400">Server Load</span>
                   <span className="text-teal-400 font-mono">12%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                   <div className="bg-teal-500 h-1.5 rounded-full w-[12%]"></div>
                </div>
                
                <div className="flex items-center justify-between text-sm pt-2">
                   <span className="text-slate-400">Database</span>
                   <span className="text-emerald-400 font-mono">Connected</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                   <span className="text-slate-400">AI Model</span>
                   <span className="text-blue-400 font-mono">Gemini 2.5</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;