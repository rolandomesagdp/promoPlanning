import { BoxColors, BoxModel } from "@shared/components/box";
import { IReportPage } from "../report-page.model";

export class ReportPageListComponetSpecSetUp {
    constructor() { }

    createInternalReportPage(): IReportPage {
        return {
            id: 1,
            name: "Internal Report Page",
            externalLink: ""
        }
    }

    createExternalReportPage(): IReportPage {
        return {
            id: 2,
            name: "External Report Page",
            externalLink: "https://www.google.com/"
        }
    }

    createReportPageArray(): IReportPage[] {
        return [ this.createInternalReportPage(), this.createExternalReportPage() ];
    }

    createExternalReportPageBoxModel(): BoxModel {
        return BoxModel.create(
            BoxColors.accentDarker,
            "External Report Page",
            "External reports",
            "leaderboard",
            "Click and go to External Report Page reports page",
            "This report page will open outside Promo Planning");
    }

    createInternalReportPageBoxModel(): BoxModel {
        return BoxModel.create(
            BoxColors.accentDarker,
            "Internal Report Page",
            "Internal reports",
            "leaderboard",
            "Click and go to Internal Report Page reports page",
            "This report page will open inside Promo Planning");
    }
}