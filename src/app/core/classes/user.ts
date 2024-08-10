export class UserEntity {
  vCode: string;
  vMsg: string;
  userId: string;
  userName: string;
  isAdmin: string;
  status: boolean;

  constructor() {
    this.vCode = '';
    this.vMsg = '';
    this.userId = '';
    this.userName = '';
    this.isAdmin = '';
    this.status = false;
  }
}

