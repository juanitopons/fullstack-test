import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Department } from '~entities/department.entity';
import { IQueryOptions } from '~interfaces/controller.interface';
import { DepartmentRepo } from '~repository/department.repository';

@Service()
export class DepartmentService {
  constructor(@InjectRepository() protected repository: DepartmentRepo) {}

  public async getAll(
    options: IQueryOptions = {},
  ): Promise<[Department[], number]> {
    return await this.repository.getAll(options);
  }

  public async getById(id: number): Promise<Department> {
    return this.repository.getById(id);
  }

  public async insert(departments: Department[]): Promise<Department[]> {
    return this.repository.save(departments);
  }

  public async insertOne(department: Department): Promise<Department[]> {
    return this.repository.save([department]);
  }

  public async update(departments: Department[]): Promise<Department[]> {
    return this.repository.save(departments);
  }

  public async updateOne(department: Department): Promise<Department[]> {
    return this.repository.save([department]);
  }

  public async delete(department: Department): Promise<Department> {
    return this.repository.remove(department);
  }
}
