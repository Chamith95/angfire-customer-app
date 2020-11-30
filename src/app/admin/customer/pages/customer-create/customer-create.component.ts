
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/public/services/ui.service';
import { CustomerModel } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  public createCustomerForm!: FormGroup;
  public titles = ['Mr', 'Mrs', 'Miss'];
  public contactTypes = ['Mobile', 'Fixed Line'];
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private uiService: UiService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.initForm();
  }

  get contactformArray(): FormArray {
    return this.createCustomerForm.get('contacts') as FormArray;
  }

  private initForm(): void {
    this.createCustomerForm = this.fb.group({
      title: [null, [Validators.required]],
      firstName: [null, [Validators.pattern('^[A-Za-z]*$|^[A-Za-z][A-Za-z ]*[A-Za-z]$'), Validators.required]],
      lastName: [null, [Validators.pattern('^[A-Za-z]*$|^[A-Za-z][A-Za-z ]*[A-Za-z]$'), Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null],
      city: [null, [Validators.pattern('^[A-Za-z]*$|^[A-Za-z][A-Za-z ]*[A-Za-z]$')]],
      state: [null, [Validators.pattern('^[A-Za-z]*$|^[A-Za-z][A-Za-z ]*[A-Za-z]$')]],
      zipCode: [null, [Validators.pattern('^[0-9]*$')]],
      birthday: [null, [Validators.required]],
      contacts: this.fb.array([
      ])
    })
  }

  onSubmit(): void {
    if (this.createCustomerForm.invalid) {
      return;
    }
    const SubmitData: CustomerModel = {
      title: this.createCustomerForm.get('title').value,
      firstName: this.createCustomerForm.get('firstName').value,
      lastName: this.createCustomerForm.get('lastName').value,
      email: this.createCustomerForm.get('email').value,
      address: this.createCustomerForm.get('address').value,
      city: this.createCustomerForm.get('city').value,
      state: this.createCustomerForm.get('state').value,
      zipCode: this.createCustomerForm.get('zipCode').value,
      birthday: this.createCustomerForm.get('birthday').value,
      contacts: this.createCustomerForm.get('contacts').value,
    }

    this.customerService.createCustomer(SubmitData).then(
      res => {
        console.log(res);
      }
    )
    this.uiService.showSnackbar('Customer Created Successfully', 'Ok', 3000);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCreateButtonClick(): void {
    this.contactformArray.push(this.fb.group({
      contactType: [null, [Validators.required]],
      value: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
    }));
  }

  onRemoveContact(i: number): void {
    this.contactformArray.removeAt(i);
  }

  onBackClick(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
