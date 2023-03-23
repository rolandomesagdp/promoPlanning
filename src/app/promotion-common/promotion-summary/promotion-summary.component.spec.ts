import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PpAngularMaterialModule } from "@shared/pp-angular-material/pp-angular-material.module";
import { PromotionSummaryComponent } from "./promotion-summary.component";

describe("PromotionSummaryComponent", () => {
    let fixture: ComponentFixture<PromotionSummaryComponent>;
    let component: PromotionSummaryComponent;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PpAngularMaterialModule,
            ],
            declarations: [
                PromotionSummaryComponent
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PromotionSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    })
});

