export class UserDto {
  private _userId: string;
  private _userName: string;
  constructor(userId: string, userName: string) {
    this._userId = userId;
    this._userName = userName;
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }
  get userName(): string {
    return this._userName;
  }
  set userName(value: string) {
    this._userName = value;
  }
}
