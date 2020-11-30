import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/public/services/ui.service';
import { CustomerModel } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit, OnDestroy {

  public updateCustomerForm!: FormGroup;
  public titles = ['Mr', 'Mrs', 'Miss'];
  public contactTypes = ['Mobile', 'Fixed Line'];
  public isLoading = false;
  public id: string;

  public customerSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private uiService: UiService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getCustomerDetails();
    }
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.customerSub) {
      this.customerSub.unsubscribe();
    }
  }

  get contactformArray(): FormArray {
    return this.updateCustomerForm.get('contacts') as FormArray;
  }

  private initForm(): void {
    this.updateCustomerForm = this.fb.group({
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
    if (this.updateCustomerForm.invalid) {
      return;
    }
    const SubmitData: CustomerModel = {
      // id: this.id,
      title: this.updateCustomerForm.get('title').value,
      firstName: this.updateCustomerForm.get('firstName').value,
      lastName: this.updateCustomerForm.get('lastName').value,
      email: this.updateCustomerForm.get('email').value,
      address: this.updateCustomerForm.get('address').value,
      city: this.updateCustomerForm.get('city').value,
      state: this.updateCustomerForm.get('state').value,
      zipCode: this.updateCustomerForm.get('zipCode').value,
      birthday: this.updateCustomerForm.get('birthday').value,
      contacts: this.updateCustomerForm.get('contacts').value,
    }

    this.customerService.updateCustomer(this.id, SubmitData).then(
      res => {
        console.log(res);
      }
    )
    this.uiService.showSnackbar('Customer Updated Successfully', 'Ok', 3000);
    this.router.navigate(['../../'], { relativeTo: this.route });
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
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  getCustomerDetails(): void {
    this.customerSub = this.customerService.getCustomerByid(this.id).subscribe((res: any) => {
      console.log(res);
      this.setdata(res);
    }
    );
  }

  public setdata(res: CustomerModel): void {
    this.updateCustomerForm.patchValue({
      title: res.title,
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      address: res.address,
      city: res.city,
      state: res.state,
      zipCode: res.zipCode,
      birthday: new Date((res.birthday.seconds * 1000)),
    })

    res.contacts.forEach(item => {
      this.addNewExistingContact(item.contactType, item.value);
    })

  }

  private addNewExistingContact(contactType: string, value: string): void {
    this.contactformArray.push(this.fb.group({
      contactType: [contactType, [Validators.required]],
      value: [value, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
    }));
  }

}
