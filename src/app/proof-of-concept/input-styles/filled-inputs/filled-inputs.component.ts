import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { postalCodes } from '@app/proof-of-concept/person/person.model';

@Component({
  selector: 'pp-filled-inputs',
  templateUrl: './filled-inputs.component.html',
  styleUrls: ['./filled-inputs.component.scss'],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'} }
  ]
})
export class FilledInputsComponent implements OnInit {
  personForm: FormGroup;
  availablePostalCodes: string[] = postalCodes;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      name: [ "", Validators.required ],
      lastName: [ "", Validators.required ],
      birthDate: [ "", Validators.required ],
      emailAddress: [ "", Validators.required ],
      credictCardNumber: [ "", Validators.required ],
      postalCode: [ "", Validators.required ]
    });
  }

  onSubmit(): void {
    console.log(this.personForm.value);
  }
}
