import { useState, useEffect, useCallback, useMemo } from 'react';
import { jobService, Job, JobsQueryParams } from '../services/jobService';

interface UseJobsOptions extends JobsQueryParams {
  useFallback?: boolean;
}

interface UseJobsReturn {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  totalJobs: number;
  searchJobs: (filters: { positionName: string; workArea: string }) => void;
}

export const useJobs = (options: UseJobsOptions = {}): UseJobsReturn => {
  const { useFallback = false, ...initialParams } = options;
  const [params, setParams] = useState<JobsQueryParams>(initialParams);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);

  // Fallback data when API is not available - memoized to prevent re-renders
  const fallbackJobs = useMemo((): Job[] => [
    {
      id: 1,
      documentId: "fallback-1",
      positionName: "Lễ tân",
      workArea: "Hà Nội",
      jobDescription: [
        {
          type: "paragraph",
          children: [
            {
              text: "Đón tiếp khách hàng và hỗ trợ các hoạt động văn phòng",
              type: "text"
            }
          ]
        }
      ],
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z"
    },
    {
      id: 2,
      documentId: "fallback-2",
      positionName: "Digital Marketing",
      workArea: "Hà Nội",
      jobDescription: [
        {
          type: "paragraph",
          children: [
            {
              text: "Phát triển và thực hiện các chiến lược marketing số",
              type: "text"
            }
          ]
        }
      ],
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z"
    },
    {
      id: 3,
      documentId: "fallback-3",
      positionName: "Chuyên viên mua hàng",
      workArea: "Hà Nội",
      jobDescription: [
        {
          type: "paragraph",
          children: [
            {
              text: "Quản lý và thực hiện các hoạt động mua sắm, đàm phán",
              type: "text"
            }
          ]
        }
      ],
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z"
    },
    {
      id: 4,
      documentId: "fallback-4",
      positionName: "Kiểm soát kinh doanh",
      workArea: "Hà Nội",
      jobDescription: [
        {
          type: "paragraph",
          children: [
            {
              text: "Giám sát và kiểm soát các hoạt động kinh doanh",
              type: "text"
            }
          ]
        }
      ],
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z"
    },
    {
      id: 5,
      documentId: "fallback-5",
      positionName: "Admin",
      workArea: "Hà Nội",
      jobDescription: [
        {
          type: "paragraph",
          children: [
            {
              text: "Quản lý và hỗ trợ các hoạt động hành chính",
              type: "text"
            }
          ]
        }
      ],
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z"
    }
  ], []); // Empty dependency array since fallback data is static

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await jobService.getJobs(params);
      
      // Always use API data, even if it's an empty array
      setJobs(response.data);
      setTotalJobs(response.meta?.pagination?.total || 0);
      
      console.log('✅ API Success: Loaded', response.data.length, 'jobs from API');
    } catch (err: unknown) {
      console.error('❌ API Error:', err);
      
      // Only use fallback if explicitly enabled and for specific errors
      const error = err as { 
        code?: string; 
        response?: { 
          status?: number; 
          data?: { message?: string } 
        };
        message?: string;
      };
      if (useFallback && (error.code === 'NETWORK_ERROR' || (error.response?.status && error.response.status >= 500))) {
        console.warn('🔄 Using fallback data due to server/network error');
        setJobs(fallbackJobs);
        setTotalJobs(fallbackJobs.length);
        setError(null);
      } else {
        // Show the actual error for debugging
        console.error('🚨 API Error Details:', {
          status: error.response?.status,
          message: error.response?.data?.message || (err as Error).message,
          url: (err as { config?: { url?: string } }).config?.url
        });
        
        setError(error.response?.data?.message || (err as Error).message || 'Failed to load jobs');
        setJobs([]);
        setTotalJobs(0);
      }
    } finally {
      setLoading(false);
    }
  }, [params, useFallback, fallbackJobs]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const refetch = () => {
    fetchJobs();
  };

  const searchJobs = (filters: { positionName: string; workArea: string }) => {
    setParams(prevParams => ({
      ...prevParams,
      positionName: filters.positionName,
      workArea: filters.workArea,
      page: 1 // Reset to first page when searching
    }));
  };

  return {
    jobs,
    loading,
    error,
    refetch,
    totalJobs,
    searchJobs
  };
};
