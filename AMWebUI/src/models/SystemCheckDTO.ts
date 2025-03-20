import { RequestStatusEnum } from './Enums';

export interface ISystemStatusDTO {
  requestStatus: RequestStatusEnum;
}

export class SystemStatusDTO implements ISystemStatusDTO {
  requestStatus: RequestStatusEnum;
  constructor() {
    this.requestStatus = RequestStatusEnum.Unknown;
  }
}
