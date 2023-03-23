import { TestBed } from '@angular/core/testing';
import { Router, RouterState } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EnvironmentService } from '.';

import { EnvironmentGuard } from './environment.guard';

describe('EnvironmentGuard', () => {
  let environmentGard: EnvironmentGuard;
  let environmentServiceMock;

  beforeEach(() => {
    environmentServiceMock = jasmine.createSpyObj("envServiceMock", ["getEnvironment"]);
    environmentServiceMock.getEnvironment.and.returnValue({
      serverUrl: "/dummyUrl/",
      production: true,
      local_id: 'en-US',
    });
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        EnvironmentGuard,
        { provide: EnvironmentService, useValue: environmentServiceMock }
      ]
    });
    environmentGard = TestBed.inject(EnvironmentGuard);
  });

  it('should be created', () => {
    expect(environmentGard).toBeTruthy();
  });

  describe("navigation activation", () => {
    it("should deactivate the route load in Production environment", () => {
      // act
      const navigationActive: boolean = environmentGard.canActivate();

      // assert
      expect(navigationActive).toBeFalse();
    });

    it("should redirect to base url in Production environment", () => {
      // act
      const router: Router = TestBed.inject(Router);
      const routerNavigationSpy = spyOn(router, "navigate");
      
      environmentGard.canActivate();

      // assert
      expect(routerNavigationSpy).toHaveBeenCalledWith([environmentGard.baseUrl]);
    });

    it("should activate the route load in non Production environment", () => {
      // arrange
      environmentServiceMock.getEnvironment.and.returnValue({
        serverUrl: "/dummyUrl/",
        production: false,
        local_id: 'en-US',
      });

      // act
      const navigationActive: boolean = environmentGard.canActivate();

      // assert
      expect(navigationActive).toBeTrue();
    });
  });
});
