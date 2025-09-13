
export interface EventLogMessage {
  id: string;
  type: 'thought' | 'dialogue' | 'system';
  text: string;
}

export interface SubjectStatus {
  name: string;
  location: string;
  activity: string;
  position: {
    x: number;
    y: number;
  };
  conditions: string[];
}
