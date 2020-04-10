import { SortDirection } from '@angular/material/sort';
import { ModelMap } from '~core/models/app.interface';

/**
 * Specific server REST api URIs
 * @export
 */
export enum API_URIS {
  EMPLOYEE = '/employee',
  DEPARTMENT = '/department',
}

/**
 * REST Api query options interface
 *
 * @export
 */
export interface QueryOptions {
  sortColumns?: { [key: string]: SortDirection | '' };
  mapping?: string;
  itemsPerPage?: number;
  page?: number;
  searchValue?: string;
  searchColumns?: string[];
}

/**
 *
 * Base server error response.
 * @export
 */
export abstract class ErrorResponse {
  public error: Error;
  constructor(error: Error) {
    this.error = error;
  }

  getError() {
    return this.error;
  }
}

/**
 * Base server response from api service.
 *
 * @export
 * @extends {ErrorResponse}
 */
export abstract class ServerResponse<T> extends ErrorResponse {
  public data: T;
  constructor(error: Error, data: T) {
    super(error);
    this.data = data;
  }
}

/**
 * Server BooleanResponse data type interface
 *
 * @export
 */
export interface BooleanResponseData {
  status: boolean;
}

/**
 * Server boolean response interface
 *
 * @export
 * @extends {ServerResponse<BooleanResponseData>}
 */
export class BooleanResponse extends ServerResponse<BooleanResponseData> {
  constructor(data: BooleanResponseData, error: Error) {
    super(error, data);
  }
}

/**
 * Raw server http response type
 *
 * @export
 */
export type RawResponseData =
  | [BaseEntityModel[]]
  | [{ [key: string]: [] }, string]
  | []
  | null;

/**
 * Raw server http response
 *
 * @export
 * @extends {ServerResponse<RawResponseData>}
 */
export abstract class RawResponse extends ServerResponse<RawResponseData> {
  public count = 0;
  constructor(data: RawResponseData, count: number, error: Error) {
    super(error, data);
    this.count = count ? count : 0;
  }
}

/**
 * Entity model server response type
 *
 * @export
 */
export type ModelResponseData =
  | [BaseEntityModel[]]
  | [ModelMap<BaseEntityModel>, string]
  | []
  | null;

/**
 * Entity model server response
 *
 * @export
 * @extends {ServerResponse<ModelResponseData>}
 */
export class ModelResponse extends ServerResponse<ModelResponseData> {
  /**
   * Request query options params
   */
  public params: QueryOptions = {};
  /**
   * server response entity count
   */
  public count = 0;
  constructor(
    data: RawResponseData,
    count: number,
    error: Error,
    model: new () => BaseEntityModel,
    params: QueryOptions = {},
  ) {
    super(error, ModelResponse.parseToModel(data, params, model));
    this.count = count ? count : 0;
    this.params = params;
  }

  /**
   * Map raw single result to entity model
   * @template T Entity model class type
   * @param values raw entity object data
   * @param model Entity model ref
   * @returns Entity model instance
   */
  private static mapSingleToModel<T extends BaseEntityModel>(
    values: Partial<T>,
    model: new () => T,
  ): T {
    return Object.assign(new model(), values);
  }

  /**
   * Map raw array response result to entity model
   * @template T Entity model class type
   * @param arrayResponseData Raw array response data
   * @param model Entity model ref
   * @returns [Entity model array]
   */
  private static mapArrayToModel<T extends BaseEntityModel>(
    arrayResponseData: [T[]],
    model: new () => T,
  ): [T[]] {
    const modelArray = arrayResponseData[0].map((values) =>
      this.mapSingleToModel(values, model),
    );
    return [modelArray];
  }

  /**
   * Map raw map response result to entity model map
   * @template T Entity model class type
   * @param mapResponseData Raw map response data
   * @param params Request query options params
   * @param model Entity model ref
   * @returns [Entity ModelMap]
   */
  private static mapMapToModel<T extends BaseEntityModel>(
    mapResponseData: [Map<string, T[]>, string],
    params: QueryOptions,
    model: new () => T,
  ): [ModelMap<T>, string] {
    return [
      new ModelMap<T>(mapResponseData[0], params.mapping, model),
      mapResponseData[1],
    ];
  }

  /**
   *
   * Join one-to-one relation: from relation array to entity (map or array) 'toNewRelation' col.
   * @template T Entity model class type
   * @param from Entity array where the relation data is located
   * @param to Entity model server response where relation reference are located
   * @param toRelation Key name of entity relation reference col
   * @param toNewRelation Key of entity where relation data will be saved (be carefully with overrides!)
   * @returns Entity model server response with model relation data
   */
  private static joinOneToOneRelationFromArray<T extends BaseIdModel>(
    from: T[],
    to: ModelResponseData,
    toRelation: string,
    toNewRelation: string,
  ): ModelResponseData {
    if (to[0] instanceof Map) {
      const mapKeysIt = to[0].keys();
      const mapValues = to[0].values();
      let i = 0;
      for (const mapArrValue of mapValues) {
        mapArrValue.forEach((modelItem) => {
          modelItem[toNewRelation] = from.find(
            (relationItem) => relationItem.id === modelItem[toRelation],
          );
        });
        i++;
      }

      i = 0;
      for (const key of mapKeysIt) {
        to[0].set(key, mapValues[i]);
        i++;
      }
    }

    if (to[0] instanceof Array) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < to[0].length; i++) {
        to[0][i][toNewRelation] = from.find(
          (relationItem) => relationItem.id === to[0][i][toRelation],
        );
      }
    }

    return to;
  }

  /**
   * Join one-to-one relation: from relation map to entity (map or array) 'toNewRelation' col.
   * @template T Entity model class type
   * @param from Entity ModelMap where the relation data is located
   * @param to Entity model server response where relation reference are located
   * @param toRelation Key name of entity relation reference col
   * @param toNewRelation Key of entity where relation data will be saved (be carefully with overrides!)
   * @returns Entity model server response with model relation data
   */
  private static joinOneToOneRelationFromMap<T extends BaseIdModel>(
    from: ModelMap<T>,
    to: ModelResponseData,
    toRelation: string,
    toNewRelation: string,
  ): ModelResponseData {
    if (to[0] instanceof Map) {
      const mapKeysIt = to[0].keys();
      const mapValues = to[0].values();
      let i = 0;
      for (const mapArrValue of mapValues) {
        mapArrValue.forEach((modelItem) => {
          modelItem[toNewRelation] = from.get(String(modelItem[toRelation]))[0];
        });
        i++;
      }

      i = 0;
      for (const key of mapKeysIt) {
        to[0].set(key, mapValues[i]);
        i++;
      }
    } else if (to[0] instanceof Array) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < to[0].length; i++) {
        to[0][i][toNewRelation] = from.get(String(to[0][i][toRelation]))[0];
      }
    }

    return to;
  }

  /**
   * Parse Raw server response data to Model response data
   * @template T Entity model class type
   * @param rawResponseData Raw server response data
   * @param params Request query params options
   * @param model To model class reference
   * @returns Model response data
   */
  public static parseToModel<T extends BaseEntityModel>(
    rawResponseData: RawResponseData,
    params: QueryOptions,
    model: new () => T,
  ): ModelResponseData {
    if (!rawResponseData) {
      return [[]];
    }

    if (rawResponseData[0] instanceof Array) {
      return this.mapArrayToModel(rawResponseData as [T[]], model);
    } else if (
      rawResponseData[0] instanceof Object &&
      rawResponseData.length === 2
    ) {
      const map = new Map<string, T[]>(
        Object.entries(rawResponseData[0] as { [key: string]: T[] }),
      );
      return this.mapMapToModel([map, rawResponseData[1]], params, model);
    }

    return [[]];
  }

  /**
   * Join one-to-one relation: from relation map/array to entity map/array 'toNewRelation' col.
   * @template T Entity model class type
   * @param from Entity array/ModelMap where the relation data is located
   * @param toRelation Key name of entity relation reference col
   * @param toNewRelation Key of entity where relation data will be saved (be carefully with overrides!)
   * @returns Entity model server response with model relation data
   */
  public joinOneToOneRelation<T extends BaseIdModel>(
    from: ModelResponseData,
    toRelation: string,
    toNewRelation: string,
  ): ModelResponseData {
    if (!this.data || !from) {
      return;
    }

    if (from[0] instanceof Map) {
      return ModelResponse.joinOneToOneRelationFromMap(
        from[0] as ModelMap<T>,
        this.data,
        toRelation,
        toNewRelation,
      );
    } else if (from[0] instanceof Array) {
      return ModelResponse.joinOneToOneRelationFromArray(
        from[0] as T[],
        this.data,
        toRelation,
        toNewRelation,
      );
    }
  }
}

/**
 * Class for entity service POST requests
 * @export
 */
export class EntityPostRequest {
  data: BaseEntityModel;
  constructor(data: BaseEntityModel) {
    this.data = data;
  }
}

/**
 * Class for entity service PUT requests
 * @export
 */
export class EntityPutRequest {
  data: BaseIdModel;
  constructor(data: BaseIdModel) {
    this.data = data;
  }
}

/**
 * Base Entity model object
 * @export
 */
export abstract class BaseEntityModel {
  [key: string]: any;
}

/**
 * Base Entity ID model object
 * @export
 */
export abstract class BaseIdModel {
  id: number;
  [key: string]: any;
}
