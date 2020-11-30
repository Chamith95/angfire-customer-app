import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerCreateComponent } from './pages/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './pages/customer-update/customer-update.component';


@NgModule({
  declarations: [CustomerComponent, CustomerCreateComponent, CustomerUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
