import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class LoginFormFactory {
    
    constructor(private fb: FormBuilder) { }

    createLoginForm(): FormGroup {
        return this.fb.group({
            userID: ["", Validators.required],
            password: ["", Validators.required]
        })
    }
}