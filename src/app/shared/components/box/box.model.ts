import { BoxColors } from "./box-colors.enum";

export class BoxModel {
    boxColor: BoxColors;
    boxTitle: string;
    boxSubTitle: string;
    boxSubtitleTooltip: string;
    boxIcon: string;
    boxIconTooltip: string;

    private constructor(boxColor: BoxColors,
        boxTitle: string,
        boxSubTitle: string,
        boxIcon: string,
        boxIconTooltip?: string,
        boxSubtitleTooltip?: string) {
            this.boxColor = boxColor;
            this.boxTitle = boxTitle;
            this.boxSubTitle = boxSubTitle;
            this.boxIcon = boxIcon;
            this.boxIconTooltip = boxIconTooltip ? boxIconTooltip : "";
            this.boxSubtitleTooltip = boxSubtitleTooltip ? boxSubtitleTooltip : boxSubTitle;
         }
    
    static create(boxColor: BoxColors,
        boxTitle: string,
        boxSubTitle: string,
        boxIcon: string,
        boxIconTooltip?: string,
        boxSubtitleTooltip?: string): BoxModel {
            return new BoxModel(boxColor, boxTitle, boxSubTitle, boxIcon, boxIconTooltip, boxSubtitleTooltip);
    }

    get boxTitleTooltip(): string {
        return this.boxTitle;
    }
}