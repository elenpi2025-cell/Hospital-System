export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  admissionDate: string;
  diagnosis: string;
  status: 'Critical' | 'Stable' | 'Recovering' | 'Discharged';
  room: string;
  notes: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: 'Available' | 'In Surgery' | 'Off Duty';
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'Checkup' | 'Surgery' | 'Consultation' | 'Emergency';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewState = 'dashboard' | 'patients' | 'assistant' | 'settings';
