import { HttpError } from 'routing-controllers';

export class DepartmentNotFound extends HttpError {
  constructor() {
    super(404, `Department not found!`);
  }
}
