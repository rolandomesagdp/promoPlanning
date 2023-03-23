import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EnvironmentService } from './environment.service';

@Injectable()
export class EnvironmentGuard implements CanActivate {

  get baseUrl(): string {
    return "/";
  }
  constructor(private router: Router, private environmentService: EnvironmentService) { }

  canActivate(): boolean {
    if(this.environmentService.getEnvironment().production) {
      this.router.navigate([this.baseUrl]);
    }
    
    return !this.environmentService.getEnvironment().production
  }
}
