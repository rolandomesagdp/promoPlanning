import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDetailsPannelComponent } from './campaign-details-pannel.component';

describe('CampaignDetailsPannelComponent', () => {
  let component: CampaignDetailsPannelComponent;
  let fixture: ComponentFixture<CampaignDetailsPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDetailsPannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDetailsPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
