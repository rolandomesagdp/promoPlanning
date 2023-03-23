import { HttpParams } from "@angular/common/http";
import { ToHttpParam } from "@shared/pp-http";
import { DropDownTreeSelectModel } from ".";
import { TreeFilterChildrenTypeCalculator } from "./tree-filter-children-type.calculator";
import { TreeFilterHttpParamProperties } from "./tree-filters-http-param-properties.enum";

export class TreeFilter implements ToHttpParam {
    private childrenTypeCalculator: TreeFilterChildrenTypeCalculator;
    private filterAsHttpParams: HttpParams;
    
    get filter(): DropDownTreeSelectModel {
        return this.filterModel;
    }

    get httpParams(): HttpParams {
        if(!this.filterAsHttpParams) {
            this.toHttpParams();
        }
        return this.filterAsHttpParams;
    }

    constructor(private filterModel: DropDownTreeSelectModel) { 
        this.childrenTypeCalculator = new TreeFilterChildrenTypeCalculator(filterModel);
    }

    toHttpParams(): HttpParams {
        this.filterAsHttpParams = new HttpParams();
        if(this.filterModel && this.filterModel.id && this.filterModel.itemId) {
            this.setChildrenFilterParams();
        }
        else {
            this.setCurrentFilterParams();
        }
        return this.filterAsHttpParams;
    }

    setCurrentFilterParams(): void {
        this.setItemTypeParam();
    }

    setChildrenFilterParams(): void {
        this.setParentIdParam();
        this.setItemIdParam();
        this.setChildrenItemTypeParam();
    }

    private setParentIdParam(): void {
        if (this.filterModel && this.filterModel.id) {
			this.filterAsHttpParams = this.filterAsHttpParams
            .set(TreeFilterHttpParamProperties.parentId, this.filterModel.id);
		}
    }

    private setItemIdParam(): void {
        if (this.filterModel && this.filterModel.itemId) {
			this.filterAsHttpParams = this.filterAsHttpParams
            .set(TreeFilterHttpParamProperties.itemId, this.filterModel.itemId);
		}
    }

    private setItemTypeParam(): void {
        if (this.filterModel && this.filterModel.itemType) {
			this.filterAsHttpParams = this.filterAsHttpParams
            .set(TreeFilterHttpParamProperties.type, this.filterModel.itemType.toString());
		}
    }

    private setChildrenItemTypeParam() {
        if (this.filterModel && this.filterModel.itemType) {
			this.filterAsHttpParams = this.filterAsHttpParams
            .set(TreeFilterHttpParamProperties.type, this.childrenTypeCalculator.getChildrenItemType().toString());
		}
	}
}