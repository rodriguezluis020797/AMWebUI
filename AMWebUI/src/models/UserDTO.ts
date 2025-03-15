interface IUserDTO {
  userId: string;
  firtName: string;
  middleName: string;
  lastName: string;
  eMail: string;
}

class UserDTO extends BaseDTO implements IUserDTO {
  userId: string;
  firtName: string;
  middleName: string;
  lastName: string;
  eMail: string;
  constructor() {
    super();
    this.userId = '';
    this.firtName = '';
    this.middleName = '';
    this.lastName = '';
    this.eMail = '';
  }
}
