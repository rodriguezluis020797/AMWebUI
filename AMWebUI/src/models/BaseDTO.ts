import { RequestStatusEnum } from './Enums';

interface IBaseDTO {
  requestStatus: RequestStatusEnum;
  errorMessage: string;
}
export class BaseDTO implements IBaseDTO {
  requestStatus: RequestStatusEnum;
  errorMessage: string;

  constructor() {
    this.requestStatus = RequestStatusEnum.Unknown;
    this.errorMessage = '';
  }
}
