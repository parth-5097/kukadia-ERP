import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CommonRouteService } from 'src/app/service/common-route.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.css'],
})
export class ChartOfAccountComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];

  constructor(
    private commonService: CommonRouteService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      paging: true,
      destroy: true,
      processing: true,
      scrollX: true,
      language: {
        paginate: {
          next: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-double-left  "></i>',
          first: '<i class="fa fa-angle-double-right"></i>',
          last: '<i class="fa fa-angle-double-left"></i>',
        },
      },
    };

    this.getDbData().then((res) => {
      this.dtTrigger.next();
    });
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.authService.get('chart-of-account').subscribe((res) => {
        this.data = res.data;
        resolve('');
      });
    });
  }

  ReloadDatatable() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.getDbData().then((res) => {
        this.dtTrigger.next();
      });
    });
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.dtTrigger.next();
    });
  }

  onEditRaw(id) {
    let new_data = this.data.filter((e) => e.id === id)[0];
    this.authService
      .put(`chart-of-account/${id}`, {
        name: new_data.name,
        sub_name: new_data.sub_name,
        type: new_data.type,
        balance: new_data.balance,
      })
      .subscribe((res) => {
        this.toastr.success(res.message);
        this.getDbData().then((data) => {
          this.dtTrigger.next();
        });
      });
  }

  onDeleteRaw(id) {
    this.authService.delete(`chart-of-account/${id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.getDbData().then((data) => {
        this.dtTrigger.next();
      });
    });
  }

  onExport(val) {
    var jsonData = this.data;
    this.commonService
      .post(`${val == 'pdf' ? 'make-pdf' : 'make-csv'}`, {
        data: jsonData,
      })
      .subscribe((res) => {
        window.open(`${environment.PORT_URL}/${res.data}`, '__blank');
      });
  }

  openmodalfunction(val) {
    if (val == '1') {
      $('.modal').modal('show');
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
