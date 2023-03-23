import { of } from "rxjs";
import { IPPChart } from "../charts";
import { IReportPage } from "../report-page.model";

export class ReportPageComponentSepSetup {

    getPpChartsArray(): IPPChart[] {
        return [
            {
                id: 1,
                chartType: "bar",
                chartTitle: "Promotional activity",
                chartSubTitle: "",
                printFullScreen: true,
                errorLoading: "",
                chartSeries: [
                    {
                        argumentField: "Week 41/2018",
                        valueField: 4
                    },
                    {
                        argumentField: "Week 42/2018",
                        valueField: 4
                    },
                    {
                        argumentField: "Week 08/2021",
                        valueField: 4
                    }
                ]
            },
            {
                id: 2,
                chartType: "bar",
                chartTitle: "Attribute performance",
                chartSubTitle: "in (%)",
                printFullScreen: false,
                errorLoading: "",
                chartSeries: [
                    {
                        argumentField: "",
                        valueField: 0
                    },
                    {
                        argumentField: "1234",
                        valueField: 0
                    },
                    {
                        argumentField: "2020-12-23",
                        valueField: 0
                    },
                    {
                        argumentField: "Buy one - Det discount",
                        valueField: 5.361923045723711
                    },
                    {
                        argumentField: "magazine",
                        valueField: 5.361923045723711
                    },
                    {
                        argumentField: "Middle page",
                        valueField: 5.361923045723711
                    },
                    {
                        argumentField: "test1",
                        valueField: 0
                    }
                ]
            },
            {
                id: 3,
                chartType: "doughnut",
                chartTitle: "Attribute intensity",
                chartSubTitle: "",
                printFullScreen: false,
                errorLoading: "",
                chartSeries: [
                    {
                        argumentField: "",
                        valueField: 1
                    },
                    {
                        argumentField: "1234",
                        valueField: 2
                    },
                    {
                        argumentField: "2020-12-23",
                        valueField: 2
                    },
                    {
                        argumentField: "Buy one - Det discount",
                        valueField: 3
                    },
                    {
                        argumentField: "magazine",
                        valueField: 2
                    },
                    {
                        argumentField: "Middle page",
                        valueField: 3
                    },
                    {
                        argumentField: "test1",
                        valueField: 2
                    }
                ]
            }
        ]
    }

    getFullScreenChart(): IPPChart {
        return {
            id: 1,
            chartType: "bar",
            chartTitle: "Promotional activity",
            chartSubTitle: "",
            printFullScreen: true,
            errorLoading: "",
            chartSeries: [
                {
                    argumentField: "Week 41/2018",
                    valueField: 4
                },
                {
                    argumentField: "Week 42/2018",
                    valueField: 4
                },
                {
                    argumentField: "Week 08/2021",
                    valueField: 4
                }
            ]
        }
    }

    getHalfScreenChart(): IPPChart {
        return {
            id: 2,
            chartType: "bar",
            chartTitle: "Attribute performance",
            chartSubTitle: "in (%)",
            printFullScreen: false,
            errorLoading: "",
            chartSeries: [
                {
                    argumentField: "",
                    valueField: 0
                },
                {
                    argumentField: "1234",
                    valueField: 0
                },
                {
                    argumentField: "2020-12-23",
                    valueField: 0
                },
                {
                    argumentField: "Buy one - Det discount",
                    valueField: 5.361923045723711
                },
                {
                    argumentField: "magazine",
                    valueField: 5.361923045723711
                },
                {
                    argumentField: "Middle page",
                    valueField: 5.361923045723711
                },
                {
                    argumentField: "test1",
                    valueField: 0
                }
            ]
        }
    }

    createInternalReportPage(): IReportPage {
        return {
            id: 1,
            name: "Internal Report Page",
            externalLink: ""
        }
    }
}

export class ReportPageRouteMock {
    snapshot = {
        params: {
            id: "1"
        }
    };
    
    queryParams = of({});
}

  