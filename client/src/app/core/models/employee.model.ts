import { BaseIdModel } from './api.interface';
import { Department } from './department.model';


/**
 * Employee Entity model
 * @export
 * @extends {BaseIdModel}
 */
export class Employee extends BaseIdModel {
  name: string;
  lastname: string;
  age?: number;
  departmentId: number;
  created: Date;
  department?: Department;
}
