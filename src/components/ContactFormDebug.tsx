'use client';

import { useState } from 'react';
import { getRequestTypes, submitContactRequest, RequestType, ContactRequestData } from '../services/contactService';

export default function ContactFormDebug() {
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [selectedType, setSelectedType] = useState<number | undefined>();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    content: ''
  });
  const [result, setResult] = useState<string>('');

  const loadRequestTypes = async () => {
    try {
      const types = await getRequestTypes();
      setRequestTypes(types);
      setResult(`Loaded ${types.length} request types`);
    } catch (error) {
      setResult(`Error loading request types: ${error}`);
    }
  };

  const testSubmit = async () => {
    if (!selectedType) {
      setResult('Please select a request type');
      return;
    }

    const contactData: ContactRequestData = {
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      content: formData.content,
      requestTypeId: selectedType
    };

    try {
      const response = await submitContactRequest(contactData, {
        contentLimitError: 'Content too long',
        successMessage: 'Success!',
        errorMessage: 'Error occurred'
      });
      
      setResult(`Response: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Contact Form Debug</h3>
      
      <div className="space-y-4">
        <button 
          onClick={loadRequestTypes}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Load Request Types
        </button>

        {requestTypes.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">Request Type:</label>
            <select 
              value={selectedType || ''} 
              onChange={(e) => setSelectedType(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a type</option>
              {requestTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name} (ID: {type.id})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Content"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            className="p-2 border rounded"
          />
        </div>

        <button 
          onClick={testSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Test Submit
        </button>

        {result && (
          <div className="mt-4 p-4 bg-white rounded border">
            <pre className="text-sm overflow-auto">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
