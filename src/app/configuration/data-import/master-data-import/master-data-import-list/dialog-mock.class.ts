import { of } from 'rxjs';

export class DialogMock {
    open() {
      return {
        afterClosed: () => of({})
      };
    }
  }