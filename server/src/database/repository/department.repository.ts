import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Department } from '~entities/department.entity';
import { getFilter } from '~helpers/utils';
import { IQueryOptions } from '~interfaces/controller.interface';

@Service()
@EntityRepository(Department)
export class DepartmentRepo extends Repository<Department> {
  public async getAll(options: IQueryOptions): Promise<[Department[], number]> {
    const queryOptions = getFilter(options);
    return this.findAndCount(queryOptions);
  }

  public async getById(id: number): Promise<Department> {
    return this.findOne(id);
  }

  public async insertOne(department: Department): Promise<Department> {
    return this.save(department);
  }

  public async insertMany(departments: Department[]): Promise<Department[]> {
    return this.save(departments);
  }

  public async editOne(department: Department): Promise<Department> {
    return this.save(department);
  }

  public async editMany(departments: Department[]): Promise<Department[]> {
    return this.save(departments);
  }

  public async removeById(department: Department): Promise<Department> {
    const itemToRemove: Department = await this.findOne(department);
    return this.remove(itemToRemove);
  }
}
