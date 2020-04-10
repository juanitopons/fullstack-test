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

import { Department } from '~entities/department.entity';
import {
  BooleanResponse,
  ENTITY_CHECK_REL_OPS,
  EntityResponse,
  IQueryOptions,
} from '~interfaces/controller.interface';
import { DepartmentService } from '~services/department.service';

import { mappingTypeExists, queryMapEntity } from '../../helpers/utils';
import { DepartmentNotFound } from '../errors/department.error';

@JsonController('/department')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class DepartmentCtrl {
  constructor(private departmentService: DepartmentService) {}

  @Get('/')
  @ResponseSchema(EntityResponse)
  public async getAll(
    @QueryParams() options: IQueryOptions,
  ): Promise<EntityResponse> {
    const getAll = await this.departmentService.getAll(options);
    if (options.mapping) {
      if (!mappingTypeExists(options.mapping, Department)) {
        throw new BadRequestError('Bad request options specified!');
      }

      return new EntityResponse(
        [queryMapEntity(options.mapping, getAll[0]), options.mapping],
        getAll[1],
      );
    }

    return new EntityResponse([getAll[0]], getAll[1]);
  }

  @Get('/:id')
  @OnUndefined(DepartmentNotFound)
  @ResponseSchema(EntityResponse)
  public async getOne(@Param('id') id: number): Promise<EntityResponse> {
    const department = await this.departmentService.getById(id);
    return department && new EntityResponse([department], 1);
  }

  @Post('/')
  @ResponseSchema(EntityResponse)
  public async post(
    @BodyParam('data', { required: true })
    department: Department,
  ) {
    this.checkRelations(department);
    const newDepartment = await this.departmentService.insertOne(department);
    return new EntityResponse([newDepartment], newDepartment.length);
  }

  @Put('/:id')
  @OnUndefined(DepartmentNotFound)
  @ResponseSchema(EntityResponse)
  public async put(
    @Param('id') id: number,
    @BodyParam('data', { required: true }) department: Department,
  ) {
    this.checkRelations(department, { ownEntity: true });
    const editedDepartment = await this.departmentService.updateOne(department);
    return new EntityResponse([editedDepartment], 1);
  }

  @Delete('/:id')
  @OnUndefined(DepartmentNotFound)
  @ResponseSchema(BooleanResponse)
  public async remove(@Param('id') id: number) {
    const department = await this.departmentService.getById(id);
    if (!department) {
      return;
    }

    const removedDepartment = await this.departmentService.delete(department);
    return new BooleanResponse(!!removedDepartment);
  }

  private async checkRelations(
    department: Department,
    options = ENTITY_CHECK_REL_OPS,
  ) {
    if (options.ownEntity) {
      const me = await this.departmentService.getById(department.id);
      if (!me) throw new DepartmentNotFound();
    }
  }
}
