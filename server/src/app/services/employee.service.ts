import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Department } from '~entities/department.entity';
import { Employee } from '~entities/employee.entity';
import { IQueryOptions } from '~interfaces/controller.interface';
import { EmployeeRepo } from '~repository/employee.repository';

@Service()
export class EmployeeService {
  constructor(@InjectRepository() protected repository: EmployeeRepo) {}

  public async getAll(
    options: IQueryOptions = {},
  ): Promise<[Employee[], number]> {
    return await this.repository.getAll(options);
  }

  public async getById(id: number): Promise<Employee> {
    return this.repository.getById(id);
  }

  public async getByDepartment(department: Department) {
    return this.repository.find({
      where: {
        departmentId: department.id,
      },
    });
  }

  public async insert(employees: Employee[]): Promise<Employee[]> {
    return this.repository.save(employees);
  }

  public async insertOne(employee: Employee): Promise<Employee[]> {
    return this.repository.save([employee]);
  }

  public async update(employees: Employee[]): Promise<Employee[]> {
    return this.repository.save(employees);
  }

  public async updateOne(employee: Employee): Promise<Employee[]> {
    return this.repository.save([employee]);
  }

  public async delete(employee: Employee): Promise<Employee> {
    return this.repository.remove(employee);
  }
}
