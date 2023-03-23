export interface ICampaign {
    campaignId: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    units: number,
    baseline: number,
    value: number,
    upliftCalculated: number,
    upliftPercent: number
}