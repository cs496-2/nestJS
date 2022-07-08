import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }

@Injectable()
export class AppService {
  private data: any;

  getHello(): string {
    return 'Hello World!';
  }

  set myData(arg) {
    this.data = arg;
  }

  get myData() {
    return this.data;
  }
}
