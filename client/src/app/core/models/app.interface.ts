import { BaseEntityModel, ServerResponse } from './api.interface';

/**
 * ModelMap extended Map for Entity models
 *
 * @export
 * @extends {Map<string, T[]>}
 */
export class ModelMap<T extends BaseEntityModel> extends Map<string, T[]> {
  constructor(
    map: Map<string, T[]>,
    mappingColumn: string,
    model: new () => T,
  ) {
    super(map);
    this.mappedBy = mappingColumn;
    this.modelRef = model;
  }

  /**
   * Entity model class reference
   */
  protected modelRef: new () => T;

  /**
   * Entity key mapped by
   */
  public mappedBy: string;

  forEach(
    callbackfn: (value: T[], key: string, map: ModelMap<T>) => void,
    thisArg?: any,
  ): void {
    for (const [key, value] of this.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  get(key: string): T[] {
    const arrValue = super.get(key);
    return arrValue.map((item) => Object.assign(new this.modelRef(), item));
  }
}

/**
 * Data source subject data class.
 * Base data source class for entities from server responses
 * @export
 */
export class DataSourceSubjData {
  public loading: boolean;
  public count = 0;
  public errors: Error[] = [];

  constructor(loading: boolean) {
    this.loading = loading;
  }

  public set(
    loading: boolean,
    count: number,
    ...responses: ServerResponse<any>[]
  ): DataSourceSubjData {
    this.loading = loading;
    this.count = count;
    this.setErrors(...responses);
    return this;
  }

  public reset(): DataSourceSubjData {
    this.loading = !this.loading;
    this.count = 0;
    this.errors = [];
    return this;
  }

  public hasErrors() {
    return !!this.errors && this.errors.length;
  }

  public setErrors(...responses: ServerResponse<any>[]) {
    this.errors = responses
      .map((response) => response.getError())
      .filter((err) => !!err);
  }

  public getErrors(): Error[] {
    return this.errors;
  }
}
