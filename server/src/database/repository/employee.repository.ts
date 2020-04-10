import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Employee } from '~entities/employee.entity';
import { getFilter } from '~helpers/utils';
import { IQueryOptions } from '~interfaces/controller.interface';

@Service()
@EntityRepository(Employee)
export class EmployeeRepo extends Repository<Employee> {
  constructor() {
    super();
  }

  public async getAll(options: IQueryOptions): Promise<[Employee[], number]> {
    const queryOptions = getFilter(options);
    return this.findAndCount(queryOptions);
  }

  public async getById(id: number): Promise<Employee> {
    return this.findOne(id);
  }
}
