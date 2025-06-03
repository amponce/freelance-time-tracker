import React, { useState } from 'react';
import { FileText, Send } from 'lucide-react';
import { InvoiceDetails } from '../types';
import { generateInvoiceNumber, addDays } from '../utils/timeUtils';

interface InvoiceFormProps {
  invoiceDetails: InvoiceDetails;
  setInvoiceDetails: React.Dispatch<React.SetStateAction<InvoiceDetails>>;
  onGenerateInvoice: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoiceDetails,
  setInvoiceDetails,
  onGenerateInvoice
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails(prev => ({
      ...prev,
      [name]: new Date(value)
    }));
  };

  const generateNewInvoiceNumber = () => {
    setInvoiceDetails(prev => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber()
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Invoice Details</h2>
        <button
          onClick={onGenerateInvoice}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          <FileText size={18} className="mr-2" />
          Generate Invoice
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Invoice Number
          </label>
          <div className="flex">
            <input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              value={invoiceDetails.invoiceNumber}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={generateNewInvoiceNumber}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-r-md"
              type="button"
            >
              Generate
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Invoice Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={invoiceDetails.date.toISOString().split('T')[0]}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={invoiceDetails.dueDate.toISOString().split('T')[0]}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <h3 className="text-md font-medium mb-2">Your Details</h3>
          
          <div className="mb-3">
            <label htmlFor="yourName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="yourName"
              name="yourName"
              value={invoiceDetails.yourName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="yourEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="yourEmail"
              name="yourEmail"
              value={invoiceDetails.yourEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="yourAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Your Address
            </label>
            <textarea
              id="yourAddress"
              name="yourAddress"
              value={invoiceDetails.yourAddress}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2">Client Details</h3>
          
          <div className="mb-3">
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={invoiceDetails.clientName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Client Email
            </label>
            <input
              type="email"
              id="clientEmail"
              name="clientEmail"
              value={invoiceDetails.clientEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="clientAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Client Address
            </label>
            <textarea
              id="clientAddress"
              name="clientAddress"
              value={invoiceDetails.clientAddress}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="paymentDetails" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Details
          </label>
          <textarea
            id="paymentDetails"
            name="paymentDetails"
            value={invoiceDetails.paymentDetails}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Bank account, PayPal, etc."
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={invoiceDetails.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Payment terms, thank you note, etc."
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
