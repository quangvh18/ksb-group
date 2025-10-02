import api from './api';

// Types
export interface JobDescriptionNode {
  type: string;
  children: Array<{
    text: string;
    type: string;
  }>;
}

export interface Job {
  id: number;
  documentId: string;
  positionName: string;
  workArea: string;
  jobDescription: JobDescriptionNode[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface JobsApiResponse {
  data: Job[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface JobsQueryParams {
  page?: number;
  pageSize?: number;
  positionName?: string;
  workArea?: string;
}

// Job Service
class JobService {
  private readonly endpoint = '/recruitment-positions';

  /**
   * Fetch jobs with optional filters
   */
  async getJobs(params: JobsQueryParams = {}): Promise<JobsApiResponse> {
    const {
      page = 1,
      pageSize = 6,
      positionName = '',
      workArea = ''
    } = params;

    // Build query parameters to match the exact curl command
    const queryParams: Record<string, string> = {
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
    };

    // Add filters only if they have values - use proper URL encoding
    if (positionName) {
      queryParams['filters[positionName][$contains]'] = positionName;
    }
    if (workArea) {
      queryParams['filters[workArea][$contains]'] = workArea;
    }

    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const fullUrl = `${this.endpoint}?${queryString}`;
    console.log('🔗 Making GET request to:', fullUrl);
    
    // Use GET request as per the actual curl command
    const response = await api.get(fullUrl);
    
    console.log('📊 Jobs API Response:', {
      status: response.status,
      dataLength: response.data?.data?.length || 0,
      total: response.data?.meta?.pagination?.total || 0
    });
    
    return response.data;
  }

  /**
   * Get job by ID
   */
  async getJobById(id: number): Promise<Job> {
    try {
      const response = await api.get(`${this.endpoint}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch job ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search jobs by position name
   */
  async searchJobs(query: string, workArea: string = 'Hà Nội'): Promise<JobsApiResponse> {
    return this.getJobs({
      positionName: query,
      workArea: workArea,
      pageSize: 10
    });
  }
}

// Export singleton instance
export const jobService = new JobService();
export default jobService;
