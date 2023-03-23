import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDetailsReadComponent } from './campaign-details-read.component';

describe('CampaignDetailsReadComponent', () => {
  let component: CampaignDetailsReadComponent;
  let fixture: ComponentFixture<CampaignDetailsReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDetailsReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDetailsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
