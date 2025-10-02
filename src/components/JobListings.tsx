'use client';

import { useLanguage } from "../contexts/LanguageContext";
import { useJobs } from "../hooks/useJobs";
import { JobDescriptionNode } from "../services/jobService";
import JobSearch from "./JobSearch";

const JobListings = () => {
  const { t } = useLanguage();
  
  // Use custom hook for jobs data
  // Set useFallback to false to see real API responses during development
  const { jobs, loading, error, refetch, searchJobs } = useJobs({
    pageSize: 6,
    // Remove workArea filter to match the basic curl command
    useFallback: false // Disable fallback to see real API behavior
  });

  // Helper function to extract text from jobDescription array
  const extractJobDescription = (jobDescription: JobDescriptionNode[]): string => {
    return jobDescription
      .map(node => 
        node.children
          .map(child => child.text)
          .join(' ')
      )
      .join(' ');
  };

  const handleCardClick = () => {
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('jobs.title')}</h2>
          <p className="text-muted-foreground text-lg">
            {t('jobs.subtitle')}
          </p>
        </div>

        {/* Search Component */}
        <JobSearch onSearch={searchJobs} loading={loading} />

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9184a]"></div>
            <p className="mt-2 text-gray-600">{t('jobs.loading')}</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{t('jobs.error')}</p>
            <button 
              onClick={refetch} 
              className="px-4 py-2 bg-[#c9184a] text-white rounded-lg hover:bg-[#a0153a] transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">{t('jobs.noJobs')}</p>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="space-y-3">
            {jobs.map((job) => {
            const leafClass = 'rounded-[3rem_0rem_3rem_0rem]';
            const shadowClass = 'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)]';
            
            return (
              <div key={job.id} className="relative">
                {/* Leaf shadow */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gray-200 ${leafClass} transform translate-x-2 translate-y-2 z-0`}></div>
                
                {/* Main card */}
                <div 
                  onClick={handleCardClick}
                  className={`bg-white ${leafClass} ${shadowClass} hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_8px_24px_-4px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer group relative z-10 overflow-hidden`}
                >
                  {/* Leaf shape decoration */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-bl-full"></div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-10 gap-3 items-center">
                      {/* Position */}
                      <div className="md:col-span-3">
                        <p className="text-xs text-muted-foreground mb-1">{t('jobs.card.position')}</p>
                        <h3 className="text-lg font-semibold group-hover:text-[#c9184a] transition-colors duration-300">{job.positionName}</h3>
                      </div>

                      {/* Work Area */}
                      <div className="md:col-span-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t('jobs.card.workArea')}
                        </p>
                        <p className="text-sm group-hover:text-[#c9184a] transition-colors duration-300">{job.workArea}</p>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-4">
                        <p className="text-xs text-muted-foreground mb-1">
                          {t('jobs.card.description')}
                        </p>
                        <p className="text-sm group-hover:text-[#c9184a] transition-colors duration-300">{extractJobDescription(job.jobDescription)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
