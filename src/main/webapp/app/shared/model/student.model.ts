import { ITeacher } from 'app/shared/model/teacher.model';

export interface IStudent {
  id?: number;
  name?: string;
  age?: number;
  teacher?: ITeacher;
}

export const defaultValue: Readonly<IStudent> = {};
