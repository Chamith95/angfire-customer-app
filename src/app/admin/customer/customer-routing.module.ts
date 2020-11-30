
import { CustomerCreateComponent } from './pages/customer-create/customer-create.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/public/common/layout/layout.component';
import { CustomerUpdateComponent } from './pages/customer-update/customer-update.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CustomerComponent
      },
      {
        path: 'create',
        component: CustomerCreateComponent
      },
      {
        path: 'update/:id',
        component: CustomerUpdateComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
