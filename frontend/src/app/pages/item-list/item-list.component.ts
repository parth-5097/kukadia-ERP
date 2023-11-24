import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CommonRouteService } from 'src/app/service/common-route.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  selectedData: any[] = [];

  constructor(
    private authService: AuthService,
    private commonService: CommonRouteService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      paging: true,
      processing: true,
      ordering: false,
      destroy: true,
      scrollX: true,
      language: {
        paginate: {
          next: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-double-left"></i>',
          first: '<i class="fa fa-angle-double-right"></i>',
          last: '<i class="fa fa-angle-double-left"></i>',
        },
      },
    };
    this.getDbData().then((data) => {
      this.dtTrigger.next();
    });
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.data = [];
      this.authService.get('item').subscribe((res) => {
        this.data = res.data;
        resolve(res);
      });
    });
  }

  ReloadDatatable() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.getDbData();
    });
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.dtTrigger.next();
    });
  }

  openmodalfunction(val) {
    if (val == '1') {
      $('.modal').modal('show');
    }
  }

  onCheck(data, event) {
    if (event.target.checked) {
      this.selectedData.push(this.data.filter((e) => e.id == data.id)[0]);
    } else {
      this.selectedData = this.selectedData.filter((e) => e.id !== data.id);
    }
  }

  onExport(val) {
    var jsonData = this.selectedData.length > 0 ? this.selectedData : this.data;
    this.commonService
      .post(`${val == 'pdf' ? 'make-pdf/item_list' : 'make-csv'}`, {
        data: jsonData,
      })
      .subscribe((res) => {
        window.open(`${environment.PORT_URL}/${res.data}`, '__blank');
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
