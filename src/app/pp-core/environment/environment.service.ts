import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Environment } from '@environments/environment-model';

@Injectable()
export class EnvironmentService {

  constructor() { }

  getEnvironment(): Environment {
    return environment
  }
}
