import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderColors } from './page-header-colors.enum';

import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHeaderComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should print the title with correct color", () => {
    // arrange -- act
    component.color = PageHeaderColors.primary;
    const primaryColorClasses = component.getClasses();

    component.color = PageHeaderColors.accent;
    const accentColorClasses = component.getClasses();

    component.color = PageHeaderColors.warning;
    const warningColorClasses = component.getClasses();

    component.color = PageHeaderColors.error;
    const errorColorClasses = component.getClasses();
    
    // assert
    expect(primaryColorClasses).toEqual(PageHeaderColors.primary);
    expect(accentColorClasses).toEqual(PageHeaderColors.accent);
    expect(warningColorClasses).toEqual(PageHeaderColors.warning);
    expect(errorColorClasses).toEqual(PageHeaderColors.error);
  });
});
