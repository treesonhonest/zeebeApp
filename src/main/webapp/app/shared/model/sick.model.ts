export interface ISick {
  id?: number;
  reason?: string;
  days?: number;
  jobKey?: number;
}

export const defaultValue: Readonly<ISick> = {};
