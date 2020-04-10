import {
  BadRequestError,
  BodyParam,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
  QueryParams,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { Employee } from '~entities/employee.entity';
import {
  BooleanResponse,
  ENTITY_CHECK_REL_OPS,
  EntityResponse,
  IQueryOptions,
} from '~interfaces/controller.interface';
import { DepartmentService } from '~services/department.service';
import { EmployeeService } from '~services/employee.service';

import { mappingTypeExists, queryMapEntity } from '../../helpers/utils';
import { DepartmentNotFound } from '../errors/department.error';
import { EmployeeNotFound } from '../errors/employee.error';

@JsonController('/employee')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class EmployeeCtrl {
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
  ) {}

  @Get('/')
  @ResponseSchema(EntityResponse)
  public async getAll(
    @QueryParams() options: IQueryOptions,
  ): Promise<EntityResponse> {
    const getAll = await this.employeeService.getAll(options);
    if (options.mapping) {
      if (!mappingTypeExists(options.mapping, Employee)) {
        throw new BadRequestError('Bad request options specified!');
      }

      return new EntityResponse(
        [queryMapEntity(options.mapping, getAll[0]), options.mapping],
        getAll[1],
      );
    }

    return new EntityResponse(getAll[0], getAll[1]);
  }

  @Get('/:id')
  @OnUndefined(EmployeeNotFound)
  @ResponseSchema(EntityResponse)
  public async getOne(@Param('id') id: number): Promise<EntityResponse> {
    const employee = await this.employeeService.getById(id);
    return employee && new EntityResponse(employee, 1);
  }

  @Post('/')
  @ResponseSchema(EntityResponse)
  public async post(
    @BodyParam('data', { required: true })
    employee: Employee,
  ) {
    this.checkRelations(employee);
    const newEmployee = await this.employeeService.insertOne(employee);
    return new EntityResponse(newEmployee, newEmployee.length);
  }

  @Put('/:id')
  @OnUndefined(EmployeeNotFound)
  @ResponseSchema(EntityResponse)
  public async put(
    @Param('id') id: number,
    @BodyParam('data', { required: true }) employee: Employee,
  ) {
    this.checkRelations(employee, { ownEntity: true });
    const editedEmployee = await this.employeeService.updateOne(employee);
    return new EntityResponse(editedEmployee, 1);
  }

  @Delete('/:id')
  @OnUndefined(EmployeeNotFound)
  @ResponseSchema(BooleanResponse)
  public async remove(@Param('id') id: number) {
    const employee = await this.employeeService.getById(id);
    if (!employee) {
      return;
    }

    const removedEmployee = await this.employeeService.delete(employee);
    return new BooleanResponse(!!removedEmployee);
  }

  private async checkRelations(
    employee: Employee,
    options = ENTITY_CHECK_REL_OPS,
  ) {
    if (employee.departmentId) {
      const department = await this.departmentService.getById(
        employee.departmentId,
      );
      if (!department) throw new DepartmentNotFound();
    }

    if (options.ownEntity) {
      const me = await this.employeeService.getById(employee.id);
      if (!me) throw new EmployeeNotFound();
    }
  }
}
