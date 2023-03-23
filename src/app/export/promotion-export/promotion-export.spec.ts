import { IPromotion } from '@app/promotion-common';
import { of } from 'rxjs';
import { ExportPromotion } from '.';
import { PromotionExport } from './promotion-export';

describe('PromotionExport', () => {

  let promotionExport: PromotionExport;
  let snackBarServiceMock, logServiceMock, httpClientMock, environmentServiceMock;
  const promotion: IPromotion = { promoId: "dummyPromoId", name: "dummyPromoName",
  description: "dummyPromoDescription", status: 1, campaignId: "dummyCampaignId",
   sellInStartDate: "OneDate", sellInEndDate: "AnotherDate",
  sellOutStartDate: "JustAnotherDate", sellOutEndDate: "LastDummyDate", promoTypeId: 1,
  isPastPromotion: false, forecast: 12, uplift: 12, isLocked: false, lockedUser: "", lockStartTime: null,
  promoAttributes: [], flags: [], imageUrl: "", upliftPercent: 0 }

  const exportPromotion: ExportPromotion = { Comunication: 'SomeComunication', Intensity: '',
    Mechanism: '', Support: '', description: '', end_date_in: '', end_date_out: '',
    forecast_baseline: 1, market: '', override: 1, override_type: '', product: '',
    promo: 'dummyPromo', promotype: '', start_date_in: '', start_date_out: '',
    total_forecast: 1, uplift: 1, uplift_percentage: 0 }

  beforeEach(() => {
    snackBarServiceMock = jasmine.createSpyObj(["openWarn", "openError"]);
    logServiceMock = jasmine.createSpyObj(["error"]);
    httpClientMock = jasmine.createSpyObj(["get"]);
    environmentServiceMock = jasmine.createSpyObj("envServiceMock", ["getEnvironment"]);
    environmentServiceMock.getEnvironment.and.returnValue({
        serverUrl: "/dummyUrl/",
        production: false,
        local_id: 'en-US',
    });

    promotionExport = new PromotionExport(promotion.promoId, promotion.name, snackBarServiceMock, logServiceMock, httpClientMock, environmentServiceMock);
    promotionExport.getExportPromotionData = () => {
      return of(exportPromotion)
    }
  });

  it('should be created', () => {
    expect(promotionExport).toBeTruthy();
  });

  describe('getExportPromotionData', () => {
    it('should get export promotion data from the server', () => {
      // arrange
      let exportPromotionData: ExportPromotion;

      //act
      promotionExport.getExportPromotionData().subscribe(data => {
        exportPromotionData = data;
      });

      // assert
      expect(exportPromotionData).toBeTruthy();
      expect(exportPromotionData.Comunication).toEqual("SomeComunication");
    });
  })

  describe("setExportPromotionData", () => {
    it("should set up the information provided by the server", () => {
      // act
      promotionExport.setExportPromotionData().subscribe();

      // assert
      expect(promotionExport.exportPromotionData).toBeTruthy();
      expect(promotionExport.exportPromotionData.Comunication).toEqual("SomeComunication");
    });

    it('should throw an error if there is no information returned from server', () => {
      // arrange
      promotionExport.getExportPromotionData = () => {
        return of(undefined)
      }

      // act
      //promotionExport.setExportPromotionData().subscribe();

      //assert
      expect(promotionExport.setExportPromotionData().subscribe).toThrowError();

    })
  })

  describe('generateCSVContent', () => {
    it('should convert export promotion data to csv', () => {
      // arrange
      promotionExport.exportPromotionData = exportPromotion;

      // act
      promotionExport.generateCSVContent();

      // assert
      expect(promotionExport.csvContent).toBeTruthy();
    });

    it('should show an error when there is no promotion data', () => {
      // arrange
      promotionExport.exportPromotionData = undefined;

      // act
      promotionExport.generateCSVContent();

      // assert
      expect(promotionExport.snackbarService.openWarn).toHaveBeenCalledWith('There is no export promotion data to generate CSV');
    });
  })

  describe('downloadCSVFile', () => {
    it('should show an error when there is no csv data to download', () => {
      // arrange
      promotionExport.csvContent = undefined;

      // act
      promotionExport.downloadCSVFile();

      // assert
      expect(promotionExport.snackbarService.openWarn).toHaveBeenCalledWith('There is no CSV data to download');
    })
  })

});
