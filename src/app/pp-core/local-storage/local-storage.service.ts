import { Injectable } from '@angular/core';
import { IPpFilters } from '@app/pp-filters/filters';
import { IPromotionStatus } from '@app/promotion-status';
import { IPromotionType } from '@app/promotion-type';
import { PpUser } from '@pp-core/auth/user/pp-user.model';
import { AppSettings } from '@pp-core/settings/app-settings.model';
import { UnitOfMeasurement } from '@pp-core/units-of-measurement';
import { LocalStorageItems } from './local-storage-items.enum';
import { PromotionFilterAuthors } from './promotion-filter-authors.enum';
import { ICampaign } from '@app/campaign/campaign.model';

@Injectable()
export class LocalStorageService {

  constructor() { }

  addCurrentUser(user: PpUser): void {
    localStorage.setItem(LocalStorageItems.user, JSON.stringify(user));
  }

  getUser(): PpUser {
    try {
      let currentUser: PpUser = JSON.parse(localStorage.getItem(LocalStorageItems.user));
      return currentUser;
    }
    catch {
      this.clear(LocalStorageItems.user);
      return null;
    }
  }

  addSettings(configSettings: AppSettings): void {
    localStorage.setItem(LocalStorageItems.configSettings, JSON.stringify(configSettings));
  }

  getSettings(): AppSettings {
    try {
      return JSON.parse(localStorage.getItem(LocalStorageItems.configSettings));
    }
    catch {
      this.clear(LocalStorageItems.configSettings);
      return null;
    }    
  }

  addPromotionFilters(filters: IPpFilters): void {
    localStorage.setItem(LocalStorageItems.promotionFilters, JSON.stringify(filters));
  }

  getPromotionFilters(): IPpFilters {
    try {
      let promotionFilters: IPpFilters = JSON.parse(localStorage.getItem(LocalStorageItems.promotionFilters));
      return promotionFilters;
    }
    catch {
      this.clear(LocalStorageItems.promotionFilters);
      return null;
    }
  }

  addPromotionFiltersAuthor(componentAuthor: PromotionFilterAuthors): void {
    localStorage.setItem(LocalStorageItems.promotionFiltersAuthor.toString(), componentAuthor.toString());
  }

  getPromotionFiltersAuthor(): PromotionFilterAuthors {
    const filterAutorValue: string = localStorage.getItem(LocalStorageItems.promotionFiltersAuthor.toString());
    const valueToReturn: PromotionFilterAuthors = PromotionFilterAuthors[filterAutorValue];
    return valueToReturn;
  }

  getDisabledPermissions(): Array<string> {
    try {
      let currentUser: PpUser = JSON.parse(localStorage.getItem(LocalStorageItems.user));
      return currentUser.disabledPermissions;
    }
    catch {
      this.clear(LocalStorageItems.user);
      return [];
    }
  }

  setPromotionTypes(promotionTypes: IPromotionType[]): void {
    localStorage.setItem(LocalStorageItems.promotionTypes, JSON.stringify(promotionTypes));
  }

  getPromotionTypes(): IPromotionType[] {
    try {
      let promotionTypes: IPromotionType[] = JSON.parse(localStorage.getItem(LocalStorageItems.promotionTypes));
      return promotionTypes;
    }
    catch {
      this.clear(LocalStorageItems.promotionTypes);
      return null;
    }
  }

  getCampaigns(): ICampaign[] {
    try {
      let campaigns: ICampaign[] = JSON.parse(localStorage.getItem(LocalStorageItems.campaigns));
      return campaigns;
    }
    catch {
      this.clear(LocalStorageItems.campaigns);
      return null;
    }
  }

  setCampaigns(campaigns: ICampaign[]): void {
    localStorage.setItem(LocalStorageItems.campaigns, JSON.stringify(campaigns));
  }

  setPromotionStatus(promotionStatus: IPromotionStatus[]): void {
    localStorage.setItem(LocalStorageItems.promotionStatus, JSON.stringify(promotionStatus));
  }

  getPromotionStatus(): IPromotionStatus[] {
    try {
      let promotionStatus: IPromotionStatus[] = JSON.parse(localStorage.getItem(LocalStorageItems.promotionStatus));
      return promotionStatus;
    }
    catch {
      this.clear(LocalStorageItems.promotionStatus);
      return null;
    }
  }

  setAvailableUnitsOfMeasurement(unitsOfMeasurement: UnitOfMeasurement[]): void {
    localStorage.setItem(LocalStorageItems.availableUnitsOfMeasurement, JSON.stringify(unitsOfMeasurement));
  }

  getAvailableUnitsOfMeasurement(): UnitOfMeasurement[] {
    try {
      let unitsOfMeasurement: UnitOfMeasurement[] = JSON.parse(localStorage.getItem(LocalStorageItems.availableUnitsOfMeasurement));
      return unitsOfMeasurement;
    }
    catch {
      this.clear(LocalStorageItems.availableUnitsOfMeasurement);
      return null;
    }
  }

  setSelectedUniOfMeasurement(unitOfMeasurement: UnitOfMeasurement): void {
    localStorage.setItem(LocalStorageItems.selectedUnitOfMeasurement, JSON.stringify(unitOfMeasurement));
  }

  getSelectedUnitOfMeasurement(): UnitOfMeasurement {
    try {
      let unitOfMeasurement: UnitOfMeasurement = JSON.parse(localStorage.getItem(LocalStorageItems.selectedUnitOfMeasurement));
      return unitOfMeasurement;
    }
    catch {
      this.clear(LocalStorageItems.selectedUnitOfMeasurement);
      return null;
    }
  }

  clear(itemName: string): void {
    localStorage.removeItem(itemName);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
