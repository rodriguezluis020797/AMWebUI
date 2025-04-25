export class BaseDTO {
  errorMessage: string | null;
  isSpecialCase: boolean | null;

  constructor() {
    this.errorMessage = null;
    this.isSpecialCase = null;
  }
}
