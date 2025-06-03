import React, { useRef } from 'react';
import { Printer, Download, Send } from 'lucide-react';
import { InvoiceDetails, TimeSessionWithDuration, Screenshot } from '../types';
import { formatCurrency, formatDate, formatDuration } from '../utils/timeUtils';

interface InvoiceProps {
  invoiceDetails: InvoiceDetails;
  sessions: TimeSessionWithDuration[];
  onClose: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({ invoiceDetails, sessions, onClose }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  
  const totalAmount = sessions.reduce((sum, session) => sum + session.amount, 0);
  const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
  
  const handlePrint = () => {
    const printContent = invoiceRef.current?.innerHTML || '';
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice ${invoiceDetails.invoiceNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
              .invoice-container { max-width: 800px; margin: 0 auto; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
              th { background-color: #f8f9fa; }
              .text-right { text-align: right; }
              .total-row { font-weight: bold; }
              .screenshot-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
              .screenshot-item { margin-bottom: 15px; }
              .screenshot-item img { max-width: 100%; border: 1px solid #ddd; }
              .screenshot-caption { margin-top: 5px; font-size: 0.9em; color: #555; }
              @media print {
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              ${printContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };
  
  const handleDownload = () => {
    const invoiceHTML = invoiceRef.current?.innerHTML || '';
    const blob = new Blob([`
      <html>
        <head>
          <title>Invoice ${invoiceDetails.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .invoice-container { max-width: 800px; margin: 0 auto; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f8f9fa; }
            .text-right { text-align: right; }
            .total-row { font-weight: bold; }
            .screenshot-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap