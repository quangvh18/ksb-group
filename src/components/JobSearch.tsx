'use client';

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface JobSearchProps {
  onSearch: (filters: { positionName: string; workArea: string }) => void;
  loading?: boolean;
}

const JobSearch = ({ onSearch, loading = false }: JobSearchProps) => {
  const { t } = useLanguage();
  const [positionName, setPositionName] = useState('');
  const [workArea, setWorkArea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ positionName: positionName.trim(), workArea: workArea.trim() });
  };

  const handleReset = () => {
    setPositionName('');
    setWorkArea('');
    onSearch({ positionName: '', workArea: '' });
  };

  const workAreas = [
    { value: '', label: t('jobs.location.all') },
    { value: 'Hà Nội', label: t('jobs.location.hanoi') },
    { value: 'Hải Dương', label: t('jobs.location.haiduong') },
    { value: 'Hải Phòng', label: t('jobs.location.haiphong') },
    { value: 'Đà Nẵng', label: t('jobs.location.danang') },
    { value: 'TP HCM', label: t('jobs.location.hcm') },
  ];

  return (
    <div className="relative mb-12">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9184a]/5 to-[#e5989b]/10 rounded-[3rem_0rem_3rem_0rem] transform translate-x-2 translate-y-2"></div>
      
      {/* Main search container */}
      <div className="relative bg-white rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out overflow-hidden">
        
        {/* Header section */}
        <div className="bg-[#c9184a] px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                {t('jobs.search.title')}
              </h3>
              <p className="text-white/80 text-sm">
                {t('jobs.search.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Position Name Search */}
              <div className="space-y-2">
                <label htmlFor="positionName" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <div className="w-2 h-2 bg-[#c9184a] rounded-full"></div>
                  <span>{t('jobs.search.position')}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="positionName"
                    value={positionName}
                    onChange={(e) => setPositionName(e.target.value)}
                    placeholder={t('jobs.search.placeholder')}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#c9184a]/20 focus:border-[#c9184a] outline-none transition-all duration-300 hover:border-gray-300 bg-gray-50/50 focus:bg-white"
                    disabled={loading}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Work Area Filter */}
              <div className="space-y-2">
                <label htmlFor="workArea" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <div className="w-2 h-2 bg-[#e5989b] rounded-full"></div>
                  <span>{t('jobs.search.workArea')}</span>
                </label>
                <div className="relative">
                  <select
                    id="workArea"
                    value={workArea}
                    onChange={(e) => setWorkArea(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#c9184a]/20 focus:border-[#c9184a] outline-none transition-all duration-300 hover:border-gray-300 bg-gray-50/50 focus:bg-white appearance-none cursor-pointer"
                    disabled={loading}
                  >
                    {workAreas.map((area) => (
                      <option key={area.value} value={area.value}>
                        {area.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 group relative overflow-hidden px-8 py-4 bg-[#c9184a] hover:bg-[#a0153a] text-white font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('jobs.searching')}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      <span>{t('jobs.search.button')}</span>
                    </>
                  )}
                </div>
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="px-8 py-4 border-2 border-gray-200 hover:border-[#c9184a] hover:bg-[#c9184a]/5 text-gray-700 hover:text-[#c9184a] font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] group"
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>{t('jobs.search.reset')}</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
