import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '@pp-core/logging';
import { BoxColors, BoxModel } from '@shared/components/box';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AnalyticsService } from '../analytics-services';
import { IReportPage } from '../report-page.model';

@Component({
  selector: 'pp-report-pages',
  templateUrl: './report-page-list.component.html',
  styleUrls: ['./report-page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportPageListComponent {
  private className: string = "ReportPagesComponent";
  private currentReportPageColor: BoxColors = BoxColors.ppBlue;
  title: string = "Analytics";
  subtitle: string = "Report pages";
  reportPages$: Observable<IReportPage[]> = this.analyticsService.getAllPages().pipe(
      tap(pages => this.logger.debug(this.className, "reportPages$ stream", "Retreived report pages:", pages))
    );

  constructor(private router: Router, private analyticsService: AnalyticsService, private logger: LogService) { }
  
  buildBoxModel(reportPage: IReportPage): BoxModel {
    return BoxModel.create(
      this.getColor(),
      reportPage.name,
      this.getSubtitle(reportPage),
      "leaderboard",
      this.getIconTooltip(reportPage),
      this.getSubtitleTooltip(reportPage));
  }

  navigateToReportsPage(reportPage: IReportPage): void {
    this.logger.debug(this.className, 'navigateToReportsPage', 'Navigating to reports page', reportPage);
    if (reportPage.externalLink)
      window.open(reportPage.externalLink, "_blank");
    else {
      this.router.navigate([`analytics/report-page/${reportPage.id}`]);
    }
  }

  private getIconTooltip(reportPage: IReportPage): string {
    return `Click and go to ${reportPage.name} reports page`;
  }

  private getSubtitle(reportPage: IReportPage): string {
    return `${reportPage.externalLink ? "External" : "Internal"} reports`;
  }

  private isExternal(reportPage: IReportPage): boolean {
    return reportPage.externalLink ? true : false;
  }

  private getSubtitleTooltip(reportPage: IReportPage): string {
    let inOrOutside: string = this.isExternal(reportPage) ? "outside" : "inside";
    return `This report page will open ${inOrOutside} Promo Planning`;
  }

  private getColor(): BoxColors {
    let currentColor = this.currentReportPageColor;
    switch (currentColor) {
      case BoxColors.accentDarker:
        this.currentReportPageColor = BoxColors.purple;
        return BoxColors.purple;
      case BoxColors.purple:
        this.currentReportPageColor = BoxColors.ppBlue;
        return BoxColors.ppBlue;
      case BoxColors.ppBlue: default:
        this.currentReportPageColor = BoxColors.accentDarker;
        return BoxColors.accentDarker;
    }
  }
}
