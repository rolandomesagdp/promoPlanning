import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDetailsWrapperComponent } from './campaign-details-wrapper.component';

describe('CampaignDetailsWrapperComponent', () => {
  let component: CampaignDetailsWrapperComponent;
  let fixture: ComponentFixture<CampaignDetailsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDetailsWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDetailsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
