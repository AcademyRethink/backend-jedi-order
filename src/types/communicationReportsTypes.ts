export type ReportType = {
  id?: number;
  subject_id?: number;
  created_by_id?: number;
  created_at?: string;
  driver_id?: number;
  location?: string;
  description?: string;
  locomotive_id?: number;
  is_stopped?: boolean;
  reason_stopped?: string;
  is_communication_failed?: boolean;
  subject: string;
  created_by: string;
  driver: string;
  locomotive: string;
  date: string;
  time: string;
};
export interface CommunicationReport {
  id: number;
  subject_id: number;
  created_by_id: number;
  created_at: Date;
  driver_id: number;
  location: string;
  description: string;
  locomotive_id: number;
  is_stopped: boolean;
  reason_stopped: string;
  is_communication_failed: boolean;
}

export interface CreateCommunicationReportData {
  subject_id: number;
  created_by_id: number;
  driver_id: number;
  location: string;
  description: string;
  locomotive_id: number;
  is_stopped: boolean;
  reason_stopped: string;
  is_communication_failed: boolean;
  subject: string;
  created_by: string;
  driver: string;
  locomotive: string;
  date: string;
  time: string;
}
