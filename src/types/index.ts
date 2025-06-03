export interface TimeSession {
  id: string;
  projectName: string;
  startTime: Date;
  endTime: Date | null;
  hourlyRate: number;
  notes: string;
  isActive: boolean;
  screenshots?: Screenshot[];
}

export interface TimeSessionWithDuration extends TimeSession {
  duration: number; // duration in milliseconds
  amount: number; // calculated amount based on hourlyRate and duration
}

export interface Screenshot {
  id: string;
  dataUrl: string;
  caption: string;
  timestamp: Date;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  yourName: string;
  yourEmail: string;
  yourAddress: string;
  paymentDetails: string;
  notes: string;
}
