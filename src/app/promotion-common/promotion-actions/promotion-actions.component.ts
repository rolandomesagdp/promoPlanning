import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { PromotionExport } from '@app/export/promotion-export';
import { EnvironmentService } from '@pp-core/environment';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { finalize, tap } from 'rxjs/operators';
import { IPromotion } from '../promotion/promotion.model';
import { PromotionActionsManager } from './promotion-actions.manager';

@Component({
  selector: 'pp-promotion-actions',
  templateUrl: './promotion-actions.component.html',
  styleUrls: ['./promotion-actions.component.scss']
})
export class PromotionActionsComponent implements OnInit, OnDestroy {
  private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  @ViewChild('actionsMenuTrigger') actionsMenuTrigger: MatMenuTrigger;
  @Input() showCopyAction: boolean = true;
  @Input() showDeleteAction: boolean = true;
  @Input() promotion: IPromotion;
  @Output() onEditPromotion: EventEmitter<IPromotion> = new EventEmitter<IPromotion>();
  @Output() onPromotionDeleted: EventEmitter<IPromotion> = new EventEmitter<IPromotion>();
  exportingPromotion: boolean = false;

  constructor(private httpClient: HttpClient, private environmentService: EnvironmentService, 
    public actions: PromotionActionsManager) { }

  ngOnInit(): void {
    this.actions.promotionExport = new PromotionExport(this.promotion.promoId, this.promotion.name,
      this.actions.snackBar, this.actions.logger, this.httpClient, this.environmentService);
  }

  onExportPromotionClicked(event: PointerEvent): void {
    event.stopPropagation();
    this.switchExportingPromotion();
    this.subscriptionManager.add(this.actions.promotionExport.executeExport(this.promotion).pipe(
      finalize(() => {
        this.switchExportingPromotion();
      })
    ).subscribe());
  }

  getForecastActionTooltip(): string {
    if (this.actions.promotionPermissions.userCanWriteUplift() && !this.promotion.isLocked && !this.promotion.isPastPromotion) {
      return `Edit participants forecast for promotion '${this.promotion.name}'.`;
    }
    else {
      return `View participants forecast for promotion '${this.promotion.name}'.`;
    }
  }

  onDeleteButtonClicked(promotion: IPromotion): void {
    this.subscriptionManager.add(
    this.actions.deletePromotion(promotion).pipe(
      tap((deletedPromotion: IPromotion) => {
        this.onPromotionDeleted.emit(deletedPromotion);
      })).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

  private switchExportingPromotion(): void {
    this.exportingPromotion = !this.exportingPromotion;
    if (!this.exportingPromotion) {
      this.actionsMenuTrigger.closeMenu();
    }
  }
}
