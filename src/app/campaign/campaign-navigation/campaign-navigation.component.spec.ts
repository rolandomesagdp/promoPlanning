import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignNavigationComponent } from './campaign-navigation.component';

describe('CampaignNavigationComponent', () => {
  let component: CampaignNavigationComponent;
  let fixture: ComponentFixture<CampaignNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
