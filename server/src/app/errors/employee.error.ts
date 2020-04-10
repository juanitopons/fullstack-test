import { HttpError } from 'routing-controllers';

export class EmployeeNotFound extends HttpError {
  constructor() {
    super(404, `Employee not found!`);
  }
}
