import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { PpAngularMaterialModule } from '@shared/pp-angular-material';
import { BoxColors } from './box-colors.enum';

import { BoxComponent } from './box.component';
import { BoxModel } from './box.model';

describe('BoxComponent', () => {
    let component: BoxComponent;
    let fixture: ComponentFixture<BoxComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BoxComponent],
            imports: [PpAngularMaterialModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BoxComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("Component initialization", () => {
        it("should correctly set up purple style", () => {
            // arrange
            const boxModel = BoxModel
                .create(BoxColors.purple, "Title", "Subtitle", "arrow_back", "Icon tooltip", "Subtitle tooltip");

            // act
            component.boxModel = boxModel;
            fixture.detectChanges();

            // assert
            const boxContainerClasses = component.boxContainerClasses;
            const boxIconContainerClasses = component.boxIconContainerClasses;
            const boxIconClasses = component.boxIconClasses;
            expect(boxContainerClasses).toEqual("box-container purple-box-container");
            expect(boxIconContainerClasses).toEqual("box-icon-container purple-box-icon-container");
            expect(boxIconClasses).toEqual("box-icon purple-box-icon");
        });

        it("should correctly set up pp-blue style", () => {
            // arrange
            const boxModel = BoxModel
                .create(BoxColors.ppBlue, "Title", "Subtitle", "arrow_back", "Icon tooltip", "Subtitle tooltip");

            // act
            component.boxModel = boxModel;
            fixture.detectChanges();

            // assert
            const boxContainerClasses = component.boxContainerClasses;
            const boxIconContainerClasses = component.boxIconContainerClasses;
            const boxIconClasses = component.boxIconClasses;
            expect(boxContainerClasses).toEqual("box-container pp-blue-box-container");
            expect(boxIconContainerClasses).toEqual("box-icon-container pp-blue-box-icon-container");
            expect(boxIconClasses).toEqual("box-icon pp-blue-box-icon");
        });

        it("should correctly set up accent style", () => {
            // arrange
            const boxModel = BoxModel
            .create(BoxColors.accentDarker, "Title", "Subtitle", "arrow_back", "Icon tooltip", "Subtitle tooltip");

            // act
            component.boxModel = boxModel;
            fixture.detectChanges();

            // assert
            const boxContainerClasses = component.boxContainerClasses;
            const boxIconContainerClasses = component.boxIconContainerClasses;
            const boxIconClasses = component.boxIconClasses;
            expect(boxContainerClasses).toEqual("box-container accent-box-container");
            expect(boxIconContainerClasses).toEqual("box-icon-container accent-box-icon-container");
            expect(boxIconClasses).toEqual("box-icon accent-box-icon");
        });
    });

    describe("UI", () => {
        it("should print correct title", () => {
            // arrange
            const boxModel = BoxModel
                .create(BoxColors.purple, "Title", "Subtitle", "arrow_back", "Icon tooltip", "Subtitle tooltip");
            
            // act
            component.boxModel = boxModel;
            fixture.detectChanges();

            // assert
            const title = fixture.debugElement.query(By.css(".box-title")).nativeElement.textContent;
            expect(title).toEqual(boxModel.boxTitle);
        });

        it("should print correct subtitle", () => {
            // arrange
            const boxModel = BoxModel
                .create(BoxColors.purple, "Title", "Subtitle", "arrow_back", "Icon tooltip", "Subtitle tooltip");
            
            // act
            component.boxModel = boxModel;
            fixture.detectChanges();

            // assert
            const subtitle = fixture.debugElement.query(By.css(".box-subtitle")).nativeElement.textContent;
            expect(subtitle).toEqual(boxModel.boxSubTitle);
        });

        it("should print correct icon", () => {
            // arrange
            const boxModel = BoxModel
                .create(BoxColors.purple, "Title", "Subtitle", "arrow_back", "Icon tooltip", "Subtitle tooltip");
            
            // act
            component.boxModel = boxModel;
            fixture.detectChanges();

            // assert
            const icon = fixture.debugElement.query(By.directive(MatIcon)).nativeElement.textContent;
            expect(icon).toEqual(boxModel.boxIcon);
        });
    });
});
