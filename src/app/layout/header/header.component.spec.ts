import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAccountService } from '@pp-core/auth/user/user-account-service/user-account.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let userAccountServiceMock;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    userAccountServiceMock = jasmine.createSpyObj(["getUser"]);
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [{
        provide: UserAccountService, useValue: userAccountServiceMock
      }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("togggleMenu", () => {
    it("should notify when toggle menu buttom is clicked", () => {
      // arrange
      const menuToggleOutputSpy = spyOn(component.menuToggle, "emit");

      // act
      component.togggleMenu();

      // assert
      expect(menuToggleOutputSpy).toHaveBeenCalled();
    });
  })
});
