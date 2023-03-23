import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ToggleDrawerService {
  private toggleDrawerSubject$: Subject<void> = new Subject<void>();
  toggleDrawerEvent$: Observable<void> = this.toggleDrawerSubject$.asObservable();

  constructor() { }

  toggleDrawer(): void {
    this.toggleDrawerSubject$.next();
  }
}
