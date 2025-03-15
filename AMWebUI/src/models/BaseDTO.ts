interface IBaseDTO {
  requestStatus: RequestStatusEnum;
  errorMessage: string;
}
class BaseDTO implements IBaseDTO {
  requestStatus: RequestStatusEnum;
  errorMessage: string;

  constructor() {
    this.requestStatus = RequestStatusEnum.Unknown;
    this.errorMessage = '';
  }
}
