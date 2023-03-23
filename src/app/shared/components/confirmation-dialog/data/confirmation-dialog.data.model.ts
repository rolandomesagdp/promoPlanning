export class ConfirmDialogData {
    title: string;
    message: string;
    width: string;
    acceptButton?: boolean;
    acceptButtonText?: string;
    rejectButton?: boolean;
    rejectButtonText?: string;

    constructor(data: ConfirmDialogData) {
        this.title = data.title;
        this.message = data.message;
        this.acceptButton = data.acceptButton === false ? data.acceptButton : true;
        this.acceptButtonText = data.acceptButtonText ? data.acceptButtonText : 'Yes';
        this.rejectButton = data.rejectButton === false ? data.rejectButton : true;
        this.rejectButtonText = data.rejectButtonText ? data.rejectButtonText : 'No';
	}

	// Some comment
	static build(title: string, message: string, acceptButton: boolean, acceptButtonText: string, rejectButton: boolean, rejectButtonText: string, width: string): ConfirmDialogData {
		const configData = {
			title: title,
			message: message,
			acceptButton: acceptButton === false ? false : true,
			acceptButtonText: acceptButtonText,
			rejectButton: rejectButton === false ? false : true,
			rejectButtonText: rejectButtonText,
			width: width
		}

		return new ConfirmDialogData(configData);
	}
}