import { Service } from 'typedi';
import { getRepository } from 'typeorm';

export interface ICoreEntity {
  new (...args: any[]): CoreEntity;
  QUERY_MAPPINGS_TYPES: string[];
  hasQueryMappingTypes(mappingType: string, entityClass: ICoreEntity): boolean;
  getRepository(entityClass: ICoreEntity);
}

@Service()
export class CoreEntity {
  static QUERY_MAPPINGS_TYPES: string[] = [];

  // constructor() {}

  public static hasQueryMappingTypes(
    mappingType: string,
    entityClass: ICoreEntity,
  ): boolean {
    return entityClass.QUERY_MAPPINGS_TYPES.includes(mappingType);
  }

  public static getRepository(entityClass: ICoreEntity) {
    return getRepository(entityClass);
  }
}
