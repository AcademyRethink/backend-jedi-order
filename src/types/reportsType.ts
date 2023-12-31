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
  reason_stopped?: string;
  is_communication_failed: boolean;
}
