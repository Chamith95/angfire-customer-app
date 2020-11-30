import { CustomerModel } from './../../models/customer.model';

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/public/services/ui.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['index', 'title', 'first_name', 'last_name', 'action'];
  dataSource = new MatTableDataSource<CustomerModel>(null);

  public customerSub: Subscription;


  constructor(
    private router: Router,
    private uiService: UiService,
    private route: ActivatedRoute,
    private customerService: CustomerService,
  ) { }


  ngOnInit(): void {
    this.customerSub = this.customerService.getCustomers().subscribe((res: any) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    })
  }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    if (this.customerSub) {
      this.customerSub.unsubscribe();
    }
  }

  onCreateButtonClick(): void {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onRemoveCustomer(id: string): void {
    this.customerService.removeCustomer(id);
    this.uiService.showSnackbar('Customer Removed Successfully', 'Ok', 3000);
  }

  onUpdateCustomer(id: string): void {
    this.router.navigate(['update', id], { relativeTo: this.route });
  }

}

