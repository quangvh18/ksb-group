// Contact Service for API calls
const API_BASE_URL = 'https://admin.ksbgroup.vn/api';

export interface RequestType {
  id: number;
  name: string;
  description?: string;
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
    const response = await fetch(`${API_BASE_URL}/request-types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching request types:', error);
    // Return fallback data if API fails
    return [
      { id: 1, name: "Tư vấn sản phẩm", description: "Tư vấn về các sản phẩm và dịch vụ" },
      { id: 2, name: "Hỗ trợ kỹ thuật", description: "Hỗ trợ các vấn đề kỹ thuật" },
      { id: 3, name: "Phản hồi khách hàng về sản phẩm", description: "Phản hồi về chất lượng sản phẩm" },
      { id: 4, name: "Đối tác cung ứng", description: "Hợp tác cung ứng sản phẩm" },
      { id: 5, name: "Đối tác phân phối", description: "Hợp tác phân phối sản phẩm" }
    ];
  }
}

// Submit contact request
export async function submitContactRequest(data: ContactRequestData): Promise<ContactRequestResponse> {
  try {
    // Validate content length
    if (data.content.length > 255) {
      return {
        success: false,
        message: 'Nội dung không được vượt quá 255 ký tự'
      };
    }

    const response = await fetch(`${API_BASE_URL}/contact-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          content: data.content
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.',
      data: result
    };
  } catch (error) {
    console.error('Error submitting contact request:', error);
    return {
      success: false,
      message: 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.'
    };
  }
}
