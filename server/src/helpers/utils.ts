import { FindManyOptions, Like } from 'typeorm';

import { CoreEntity, ICoreEntity } from '~entities/core.entity';
import {
  IQueryOptions,
  QUERY_OPTIONS,
  QuerySortOrder,
} from '~interfaces/controller.interface';
import { IValidatorParam } from '~interfaces/validator.interface';

/**
 * Check for 'development' enviroment
 *
 * @export
 * @returns {boolean}
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export const pipe = (...fns) => (x: IValidatorParam): IValidatorParam =>
  fns.reduce((y, f) => f(y), x);

/**
 * Object key function validator.
 * Checks if key K from T exists on Partial<T>.
 * Also checks T[K] specific defined validator
 *
 * @export
 * @template T
 * @template K
 * @param {Partial<T>} obj
 * @param {K} prop
 * @param {*} validator
 * @param {string} [msg=`Property key '${prop}' not found in Object`]
 * @returns {T[K]}
 */
export function throwIfNotKeyinObj<T, K extends keyof T>(
  obj: Partial<T>,
  prop: K,
  validator,
  msg = `Property key '${prop}' not found in Object`,
): T[K] {
  const key = obj[prop];
  if (key === undefined || key === null) {
    throw new Error(msg);
  } else {
    let isValid = true;
    if (validator) {
      isValid = validator(key);
    }

    return isValid && (obj[prop] as T[K]);
  }
}

/**
 * Get defaults of QueryOptions filter if no valid ones were obtained from the client
 *
 * @param {IQueryOptions} options
 * @returns {IQueryOptions}
 */
function getDefaultsQueryOptions(options: IQueryOptions): IQueryOptions {
  if (Number(options.itemsPerPage) < 0 || Number(options.page) < 0) {
    options.itemsPerPage = QUERY_OPTIONS.itemsPerPage;
    options.page = QUERY_OPTIONS.page;
  }

  return options;
}

function getSortOptions(queryOptions: IQueryOptions): {} {
  let sortFilter = {};
  if (queryOptions.sortColumns) {
    sortFilter = queryOptions.sortColumns.reduce(
      (obj, key, idx) => ({
        ...obj,
        [key]: queryOptions.sortDirections[idx].toUpperCase(),
      }),
      {},
    );
    if (!sortFilter['id']) {
      sortFilter['id'] = QuerySortOrder.DESC.toUpperCase();
    }
    return sortFilter;
  }

  sortFilter['id'] = QuerySortOrder.DESC.toUpperCase();

  return sortFilter;
}

/**
 * Generate typeorm repositories find filter for pagination from QueryOptions interface
 *col
 * @param {IQueryOptions} queryOptions
 * @returns {FindManyOptions}
 */
function getPageOptions(queryOptions: IQueryOptions): FindManyOptions {
  const pageNumber = Number(queryOptions.page);
  const items = Number(queryOptions.itemsPerPage);
  return {
    take: items,
    skip: pageNumber > 0 ? pageNumber * items : 0,
  };
}

/**
 * Get repositories find filter from QueryOptions interface
 *
 * @export
 * @param {IQueryOptions} options
 * @param {boolean} [countAll=false]
 * @returns {FindManyOptions}
 */
export function getFilter(
  options: IQueryOptions,
  countAll = false,
): FindManyOptions {
  options = getDefaultsQueryOptions(options);
  let filter: FindManyOptions = {};
  if (Number(options.itemsPerPage) >= 0 && !countAll) {
    filter = getPageOptions(options);
  }

  filter.order = getSortOptions(options);

  if (options.searchColumns && options.searchValue) {
    const columns = options.searchColumns;
    if (columns.length === 1) {
      filter.where = {};
      filter.where[columns[0]] = Like(`%${options.searchValue}%`);
    } else {
      filter.where = new Array(columns.length);
      columns.forEach(
        (col, idx) =>
          (filter.where[idx] = { [col]: Like(`%${options.searchValue}%`) }),
      );
    }
  }
  console.debug('Front params -> ', JSON.stringify(options));
  console.debug('SQL Filter -> ' + JSON.stringify(filter));
  return filter;
}

/**
 * Check if mapping exists for given Entity
 *
 * @export
 * @param {string} mappingType
 * @param {ICoreEntity} entityRef
 * @returns
 */
export function mappingTypeExists(mappingType: string, entityRef: ICoreEntity) {
  const a = entityRef.QUERY_MAPPINGS_TYPES;
  console.debug(a);
  return entityRef.hasQueryMappingTypes(mappingType, entityRef);
}

/**
 * Transform array entities to mapped key column
 *
 * @export
 * @template T
 * @param {T[]} entityArray
 * @param {string} mapKey
 * @returns {Map<any, Partial<T[]>>}
 */
export function entityArrayToMap<T extends CoreEntity>(
  entityArray: T[],
  mapKey: string,
): Map<any, Partial<T[]>> {
  return entityArray.reduce(function(map: Map<any, Partial<T[]>>, entity) {
    const mapMappingValues: T[] = map.get(entity[mapKey]) || [];
    mapMappingValues.push(entity);
    map.set(entity[mapKey], mapMappingValues);
    return map;
  }, new Map<any, Partial<T[]>>());
}

/**
 * Map entity queries by entity map type
 *
 * @export
 * @template T
 * @template K
 * @param {string} mapColumn
 * @param {Partial<T[]>} data
 * @returns {Map<T[K], Partial<T[]>>}
 */
export function queryMapEntity<T extends CoreEntity, K extends keyof T>(
  mapColumn: string,
  data: Partial<T[]>,
): Map<T[K], Partial<T[]>> {
  return entityArrayToMap(data, mapColumn);
}

function mapSingleToEntity<T extends CoreEntity>(
  values: Partial<T>,
  model: new () => T,
): T {
  return Object.assign(new model(), values);
}

export function mapArrayToEntity<T extends CoreEntity>(
  arrayValues: Partial<T>[],
  model: new () => T,
): T[] {
  return arrayValues.map((values) => mapSingleToEntity(values, model));
}

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      if (name !== 'constructor') {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
    });
  });
}
