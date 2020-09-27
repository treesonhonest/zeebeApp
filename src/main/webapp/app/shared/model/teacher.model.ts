import { IStudent } from 'app/shared/model/student.model';

export interface ITeacher {
  id?: number;
  name?: string;
  age?: number;
  kemu?: string;
  students?: IStudent[];
}

export const defaultValue: Readonly<ITeacher> = {};
