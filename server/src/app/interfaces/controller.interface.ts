import { CoreEntity } from '../../database/entities/core.entity';

export enum QuerySortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IQueryOptions {
  sortColumns?: string[];
  sortDirections?: string[];
  mapping?: string;
  itemsPerPage?: string;
  page?: string;
  searchValue?: string;
  searchColumns?: string[];
}

export const QUERY_OPTIONS: IQueryOptions = {
  sortColumns: ['id'],
  sortDirections: [QuerySortOrder.DESC],
  mapping: null,
  itemsPerPage: '5',
  page: '0',
};

export interface IEntityCheckRelatonOptions {
  ownEntity: boolean;
}

export const ENTITY_CHECK_REL_OPS: IEntityCheckRelatonOptions = {
  ownEntity: false,
};

abstract class ApiResponse<T> {
  data: T;
}

export class ErrorResponse extends ApiResponse<[]> {
  error: Error;
  constructor(error: Error) {
    super();
    this.error = error;
  }
}

export class BooleanResponse extends ApiResponse<{}> {
  constructor(status: boolean) {
    super();
    this.data = { status };
  }
}

export class EntityResponse extends ApiResponse<
  [CoreEntity[]] | [Map<any, CoreEntity[]>, string]
> {
  count: number;

  constructor(data: any, count: number) {
    super();
    if (!data || !data.length || data[0] instanceof CoreEntity) {
      data = [data || []];
    }

    this.data = data;
    this.count = count;
  }
}
