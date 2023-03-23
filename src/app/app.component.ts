import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@pp-core/auth/authentication-service/authentication.service';
import { SettingsManager } from '@pp-core/settings/settings-manager';
import { SubscriptionsManager } from '@shared/rxjs-subscriptions';
import { PromotionStatusService } from './promotion-status';
import { PromotionTypeService } from './promotion-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy  {
  private subscriptionManager: SubscriptionsManager = new SubscriptionsManager();
  constructor(private authService: AuthenticationService, 
    private settingsManager: SettingsManager) { }
  
  ngOnInit(): void {
    this.subscriptionManager.add(
      this.settingsManager.loadAppSettings().subscribe()
    );
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }
}
