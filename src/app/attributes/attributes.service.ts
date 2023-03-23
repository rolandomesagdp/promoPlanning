import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '@pp-core/environment';
import { Observable, of } from 'rxjs';
import { IAttribute } from './attribute';
import { AttributeValidationType } from './attribute-validation-type';

@Injectable()
export class AttributesService {
  private attributesController: string;

  constructor(environmentService: EnvironmentService, private httpClient: HttpClient) { 
    this.attributesController = `${environmentService.getEnvironment().serverUrl}attributes/config`;
  }

  getAttributes(promoTypeId: number): Observable<IAttribute[]> {
    const url: string = `${this.attributesController}?promoTypeId=${promoTypeId}`;
    return this.getObservableAttributes();
  }

  getCampaignAttributes(): Observable<IAttribute[]> {
    const url: string = `${this.attributesController}?promoTypeId=-1&owner=campaigntype`;
    return this.httpClient.get<any[]>(url);
  }

  private getObservableAttributes(): Observable<IAttribute[]> {
    return of([
      {
        promoTypeId: 1,
        promoTypeName: "0",
        attributeId: 3,
        name: "Discount value (percentage)",
        validationType: AttributeValidationType.list,
        defaultValues: [
          {
            attributeId: 3,
            defaultValue: "30",
            cost: 0
          },
          {
            attributeId: 3,
            defaultValue: "56",
            cost: 23
          }
        ],
        owner: "promotype",
        isPromoClustering: true,
        sO99AttributeId: 1,
        costType: 0
      },
      {
        promoTypeId: 1,
        promoTypeName: "0",
        attributeId: 4,
        name: "Comunication - Leaflet",
        validationType: AttributeValidationType.list,
        defaultValues: [],
        owner: "promotype",
        isPromoClustering: true,
        sO99AttributeId: 2,
        costType: 0
      },
      {
        promoTypeId: 1,
        promoTypeName: "0",
        attributeId: 5,
        name: "Other comunication",
        validationType: AttributeValidationType.list,
        defaultValues: [],
        owner: "promotype",
        isPromoClustering: true,
        sO99AttributeId: 3,
        costType: 0
      },
      {
        promoTypeId: 1,
        promoTypeName: "0",
        attributeId: 6,
        name: "POS - Extra display",
        validationType: AttributeValidationType.list,
        defaultValues: [],
        owner: "promotype",
        isPromoClustering: true,
        sO99AttributeId: 4,
        costType: 0
      },
      {
        promoTypeId: 1,
        promoTypeName: "0",
        attributeId: 37,
        name: "test list",
        validationType: AttributeValidationType.list,
        defaultValues: [
          {
            attributeId: 37,
            defaultValue: "Test val 1",
            cost: 56
          }
        ],
        owner: "participanttype",
        isPromoClustering: false,
        sO99AttributeId: 0,
        costType: 0
      }
    ])
  }
}
