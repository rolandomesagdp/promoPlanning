import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { postalCodes } from '@app/proof-of-concept/person/person.model';

@Component({
  selector: 'pp-outlined-inputs',
  templateUrl: './outlined-inputs.component.html',
  styleUrls: ['./outlined-inputs.component.scss'],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'} }
  ]
})
export class OutlinedInputsComponent implements OnInit {
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
