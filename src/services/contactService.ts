// Contact Service for API calls
import axios from 'axios';

const API_BASE_URL = 'https://admin.ksbgroup.vn/api';

export interface RequestType {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ContactRequestData {
  fullName: string;
  phone: string;
  email: string;
  content: string;
  requestTypeId?: number;
}

export interface ContactRequestResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

// Get request types from API
export async function getRequestTypes(): Promise<RequestType[]> {
  try {
    console.log('Fetching request types from API...');
    
    // Use GET method (POST requires data payload)
    const response = await fetch(`${API_BASE_URL}/request-types`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('API Response status:', response.status);
    console.log('API Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data.data || [];
  } catch (error: unknown) {
    console.error('Error fetching request types:', error);
    
    // Return fallback data if API fails
    console.log('Using fallback data for request types');
    return [
      { 
        id: 1, 
        documentId: "fallback-1", 
        name: "Tư vấn sản phẩm", 
        description: "Tư vấn về các sản phẩm và dịch vụ",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      },
      { 
        id: 2, 
        documentId: "fallback-2", 
        name: "Hỗ trợ kỹ thuật", 
        description: "Hỗ trợ các vấn đề kỹ thuật",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      },
      { 
        id: 3, 
        documentId: "fallback-3", 
        name: "Ý kiến khách hàng", 
        description: "Ý kiến khách hàng",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      },
      { 
        id: 4, 
        documentId: "fallback-4", 
        name: "Đối tác cung ứng", 
        description: "Đối tác cung ứng",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      },
      { 
        id: 5, 
        documentId: "fallback-5", 
        name: "Đối tác phân phối", 
        description: "Đối tác phân phối",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      }
    ];
  }
}

// Submit contact request
export async function submitContactRequest(
  data: ContactRequestData, 
  messages?: {
    contentLimitError: string;
    successMessage: string;
    errorMessage: string;
  }
): Promise<ContactRequestResponse> {
  try {
    // Validate content length
    if (data.content.length > 255) {
      return {
        success: false,
        message: messages?.contentLimitError || 'Nội dung không được vượt quá 255 ký tự'
      };
    }

    const response = await axios.post(`${API_BASE_URL}/contact-requests`, {
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        content: data.content,
        requestTypeId: data.requestTypeId
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    });

    return {
      success: true,
      message: messages?.successMessage || 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.',
      data: response.data
    };
  } catch (error) {
    console.error('Error submitting contact request:', error);
    return {
      success: false,
      message: messages?.errorMessage || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.'
    };
  }
}
