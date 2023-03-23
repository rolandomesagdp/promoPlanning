export class PpPermissions {
    constructor() { }

    //**********Dashboard permissions*****************/
    get DASHBOARD_OVERVIEW(): string { return 'DASHBOARD.OVERVIEW.READ'} ; // Dashboard Overview Tab
    get DASHBOARD_ANALYTICS(): string { return 'DASHBOARD.ANALYTICS.READ'}; // Dashboard Analytics Tab
    get DASHBOARD_CAMPAIGNS(): string { return 'DASHBOARD.CAMPAIGNS.READ'}; // Dashboard Campaigns Table Tab
    get DASHBOARD_PROMOTIONS(): string { return'DASHBOARD.PROMOTIONS.READ'}; // Dashboard Promotions Table Tab
    get DASHBOARD_PARTICIPANTS(): string { return 'DASHBOARD.PARTICIPANTS.READ'}; // Dashboard Participants Table Tab
    get DASHBOARD_FLAGGED_PROMOTIONS(): string { return 'DASHBOARD.FLAGGED.PROMOTIONS.READ'};  //Dashboard Flagged PROMOTIONs Tab
    get DASHBOARD_CALENDAR(): string { return 'DASHBOARD.CALENDAR.READ'}; //Dashboard Scheduler Calender Tab
    get DASHBOARD_NEWPROMOTION_BUTTON(): string { return 'DASHBOARD.NEW.PROMOTION.READ'}; //Dashboard New Promotion Button
    get DASHBOARD_NEWCAM_BUTTON(): string { return 'DASHBOARD.NEW.CAMPAIGN.READ'};// Dashbaord New Campaign Button
    get DASHBOARD_UNLOCK_PROMOTION(): string { return 'DASHBOARD.UNLOCK.PROMOTION'};// PROMOTION Lock Permission
    
    //***********PROMOTION table permissions ****************/
    get PROMOTION_TABLE_NAME(): string { return 'PROMOTION.COLUMN.PROMOTION.NAME.READ'}; //PROMOTION Table Name Column
    get PROMOTION_TABLE_TYPE(): string { return 'PROMOTION.COLUMN.PROMOTION.TYPE.READ'}; //PROMOTION Table Type Column
    get PROMOTION_TABLE_CAM(): string { return 'PROMOTION.COLUMN.CAMPAIGN.NAME.READ'};//PROMOTION table Campaign Column 
    get PROMOTION_TABLE_DES(): string { return 'PROMOTION.COLUMN.PROMOTION.DESCRIPTION.READ'}; //PROMOTION Table Description Column
    get PROMOTION_TABLE_START_DATE(): string { return 'PROMOTION.COLUMN.START.DATE.READ'};  //PROMOTION Table Start Date Column
    get PROMOTION_TABLE_END_DATE(): string { return 'PROMOTION.COLUMN.END.DATE.READ'}; //PROMOTION Table End Date Column
    get PROMOTION_TABLE_PRODUCT(): string { return 'PROMOTION.COLUMN.PRODUCT.READ'}; //PROMOTION Table Product Column
    get PROMOTION_TABLE_AREA(): string { return 'PROMOTION.COLUMN.AREAS.READ'}; //PROMOTION Table Area Column
    get PROMOTION_TABLE_BASELINE(): string { return 'PROMOTION.COLUMN.QUANTITY.READ'}; //PROMOTION Table Baseline Column
    get PROMOTION_TABLE_UNITS(): string { return 'PROMOTION.COLUMN.UNITS.READ'}; // PROMOTION Table Units Column
    get PROMOTION_TABLE_UPLIFT(): string { return 'PROMOTION.COLUMN.UPLIFT.READ'}; // PROMOTION Table Uplift Column
    get PROMOTION_TABLE_STATUS(): string { return 'PROMOTION.COLUMN.STATUS.READ'}; // PROMOTION Table Status Column
    get PROMOTION_WRITE(): string { return 'PROMOTION.WRITE'}; // PROMOTION Write Permission from PROMOTION Table and New PROMOTION
    get PROMOTION_TABLE_COPY(): string { return 'DASHBOARD.PROMOTION.COPY'}; // PROMOTION table Copy
    get PROMOTION_VIEW(): string { return 'PROMOTION.VIEW'}; // PROMOTION table View
    get PROMOTION_DELETE(): string { return 'PROMOTION.DELETE'} // PROMOTION Delete
    get PROMOTION_PARTICIPANT_DELETE(): string { return 'PROMOTION.PARTICIPANT.DELETE'} // Participant delete
    get PROMOTION_UPLIFT_WRITE(): string { return 'PROMOTION.UPLIFT.WRITE'}; // Edit Uplift
    get PROMOTION_ROI_READ(): string { return 'PROMOTION.ROI.READ'}; // View ROI

    //************Campaign Table Permissions ***************/
    get CAM_TABLE_NAME(): string { return 'CAMPAIGN.COLUMN.NAME.READ'}; // Campaign Table Name Column
    get CAM_TABLE_DES(): string { return 'CAMPAIGN.COLUMN.DESCRIPTION.READ'}; //Campaign Table Description Column
    get CAM_TABLE_START_DATE(): string { return 'CAMPAIGN.COLUMN.STARTDATE.READ'}; // Campaign Table Start Date Column
    get CAM_TABLE_END_DATE(): string { return 'CAMPAIGN.COLUMN.ENDDATE.READ'}; // Campaign Table End Date Column
    get CAM_TABLE_BASELINE(): string { return 'CAMPAIGN.COLUMN.BASELINE.READ'}; // Campaign Table Baseline Column
    get CAM_TABLE_UNITS(): string { return 'CAMPAIGN.COLUMN.UNITS.READ'}; // Campaign Table Units Column
    get CAM_TABLE_VALUE(): string { return 'CAMPAIGN.COLUMN.VALUE.READ'}; // Campaign Table Value Column
    get CAM_TABLE_UPLIFT(): string { return 'CAMPAIGN.COLUMN.UPLIFT.READ'}; // Campaign Table Uplift Column
    get CAM_TABLE_UPLIFTPERCENT(): string { return 'CAMPAIGN.COLUMN.UPLIFTPERCENT.READ'}; // Campaign Table Uplift Percent Column
    get CAMPAIGN_WRITE(): string { return 'CAMPAIGN.WRITE'}; // Campaign Write Permission from table and new Campaign
    
     //*********Filter PROMOTIONs Permissions ************/
    get FILTER_PROMOTIONS_SEARCH(): string { return 'DASHBOARD.SEARCH.READ'}; //'Dashboard Filter PROMOTIONs Search'
    get FILTER_CAMPAIGNS(): string { return 'FILTERS.CAMPAIGNS.READ'}; //Dashboard filter Campaigns'
    get FILTER_PROMOTION_STATUS(): string { return 'FILTERS.PROMOTION.STATUS.READ'}; //Dashboard filter Status'
    get FILTER_PRMOTIONS_DATE(): string { return 'PROMOTIONS.FILTERS.DATE.READ'}; // Dashboard filter PROMOTION Date
    get FILTER_PROMOTIONS_PROMOTYPE(): string { return 'PROMOTIONS.FILTERS.PROMOTYPE.READ'}; // Dashboard filter PROMOTION Date

    // **************Filter Campaigns Permission **********
    get FILTER_CAM_DATE(): string { return 'CAMPAIGNS.FILTERS.DATE.READ'} // date selection from campaign filter
    get FILTER_CAM_SEARCH(): string { return 'CAMPAIGNS.FILTERS.SEARCH.READ'} //search from camapign filter

    //****New-Edit-Campaign Permissions*********/
    get CAMPAIGN_NEW_PROMOTION(): string { return 'CAMPAIGN.CREATE.OPTIONS.NEWPROMOTION'}; //New PROMOTION button from edit camapign'

    // *****************New-Edit-PROMOTION Permissions****************
   get NEW_PROMOTION_PARTICIPANTS_GRID(): string { return 'PROMOTION.CREATE.OPTIONS.PARTICIPANTS'}; //'Participants grid New PROMOTION'
   get NEW_PROMOTION_SIMULATE(): string { return 'PROMOTION.CREATE.OPTIONS.SIMULATE'}; //'Simulate Button New PROMOTION'
   get NEW_PROMOTION_STATUS_EDIT(): string { return 'PROMOTION.STATUS.EDIT'};  //'Status edit permission'
   get NEW_PROMOTION_STATUS_FORWARD(): string { return 'STATUS.CHANGE.FORWARD'}; //'Disable Forward change for status'
   get NEW_PROMOTION_STATUS_BACKWARD(): string { return 'STATUS.CHANGE.BACKWARD'};  //'Disable Backward change for status'
   get NEW_PROMOTION_OVERRIDE(): string { return 'PARTICIPANT.DATA.OVERRIDE'}; //'Participants override'
   get PRODUCT_SEARCH_EXTERNALID(): string { return 'PRODUCT.SEARCH.EXTERNALID'}; //'search by external id for products'

   get NEW_PROMOTION_EXPORT(): string { return 'PROMOTION.CREATE.OPTIONS.EXPORT'}; // Export button New PROMOTION
   get NEW_PROMOTION_ADD_CAM(): string { return 'PROMOTION.CREATE.OPTIONS.CAMPAIGN'}; // new PROMOTION add new campaign

   //********Auto Participant**********/
   get CLINT_AUTO_PARTICPANT(): string { return 'CLIENT.AUTO.PARTICIPANT'}; //'Auto participants'

   //***********Participants Grid Permissions**********/
   get PARTICIPANT_GRID_CALCULATE(): string { return 'PARTICIPANTS.GRID.CALCULATE'}; // Calculate button in grid
   get PARTICIPANT_GRID_PROD_MAR_ATTR(): string { return 'PARTICIPANTS.GRID.PRODUCT.MARKET.ATTR.READ'}; // Product market attributes from grid
   get PARTICIPANT_GRID_CALCULATED_FIELDS(): string { return 'PARTICIPANTS.GRID.CALCULATED.FIELDS.READ'}; //Calculate fields from grid
   get PARTICIPANT_GRID_GROUP(): string { return 'PARTICIPANTS.GRID.GROUP.READ'}; // Group product-area dropdown from grid
   get PARTICIPANT_GRID_FLAGS(): string { return 'PARTICIPANTS.GRID.FLAGS.READ'}; // flags column from grid

}
