import { Patient, Doctor, Appointment } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P-101',
    name: 'Sarah Jenkins',
    age: 34,
    gender: 'Female',
    admissionDate: '2023-10-25',
    diagnosis: 'Acute Bronchitis',
    status: 'Recovering',
    room: '304-A',
    notes: 'Patient showing good response to antibiotics. Fever subsided.'
  },
  {
    id: 'P-102',
    name: 'Michael Chen',
    age: 62,
    gender: 'Male',
    admissionDate: '2023-10-26',
    diagnosis: 'Myocardial Infarction',
    status: 'Critical',
    room: 'ICU-02',
    notes: 'Monitoring vitals closely. Scheduled for angiogram tomorrow.'
  },
  {
    id: 'P-103',
    name: 'Emily Davis',
    age: 28,
    gender: 'Female',
    admissionDate: '2023-10-27',
    diagnosis: 'Fractured Tibia',
    status: 'Stable',
    room: '201-B',
    notes: 'Post-op recovery. Pain managed with analgesics.'
  },
  {
    id: 'P-104',
    name: 'Robert Wilson',
    age: 45,
    gender: 'Male',
    admissionDate: '2023-10-24',
    diagnosis: 'Type 2 Diabetes Complications',
    status: 'Stable',
    room: '305-C',
    notes: 'Blood sugar levels stabilizing. Dietary consultation required.'
  },
  {
    id: 'P-105',
    name: 'Linda Martinez',
    age: 55,
    gender: 'Female',
    admissionDate: '2023-10-28',
    diagnosis: 'Pneumonia',
    status: 'Critical',
    room: 'ICU-05',
    notes: 'Requiring oxygen support. High fever persists.'
  }
];

export const MOCK_DOCTORS: Doctor[] = [
  { id: 'D-01', name: 'Dr. Alistair Ray', specialty: 'Cardiology', availability: 'In Surgery' },
  { id: 'D-02', name: 'Dr. Susan Bones', specialty: 'Orthopedics', availability: 'Available' },
  { id: 'D-03', name: 'Dr. John Watson', specialty: 'General Medicine', availability: 'Off Duty' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'A-01', patientName: 'Alice Cooper', doctorName: 'Dr. Ray', date: '2023-10-30', time: '09:00 AM', type: 'Consultation' },
  { id: 'A-02', patientName: 'Bob Vance', doctorName: 'Dr. Bones', date: '2023-10-30', time: '10:30 AM', type: 'Checkup' },
  { id: 'A-03', patientName: 'Charlie Day', doctorName: 'Dr. Watson', date: '2023-10-30', time: '01:00 PM', type: 'Emergency' },
];
