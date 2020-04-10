import { Employee } from 'src/app/core/models/employee.model';
import { BaseIdModel } from './api.interface';


/**
 * Department Entity model
 * @export
 * @extends {BaseIdModel}
 */
export class Department extends BaseIdModel {
  name: string;
  employees?: Employee[];
}
