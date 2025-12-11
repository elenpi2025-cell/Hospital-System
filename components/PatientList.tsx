import React, { useState } from 'react';
import { MOCK_PATIENTS } from '../constants';
import { Search, Filter, MoreHorizontal, FileX } from 'lucide-react';

const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Patients</h2>
           <p className="text-slate-500">Manage patient records and status</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-teal-700/20 active:scale-95 transform duration-100">
          + Add New Patient
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients by name or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Info</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Diagnosis</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Admission</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Room</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs group-hover:bg-teal-200 transition-colors">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{patient.name}</p>
                          <p className="text-xs text-slate-500">{patient.id} • {patient.age}yrs</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {patient.diagnosis}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {patient.admissionDate}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${patient.status === 'Critical' ? 'bg-red-50 text-red-700 border-red-100' :
                          patient.status === 'Recovering' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          patient.status === 'Discharged' ? 'bg-gray-50 text-gray-700 border-gray-100' :
                          'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 font-mono">
                      {patient.room}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <FileX className="w-8 h-8 opacity-50" />
                      <p>No patients found matching "{searchTerm}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;