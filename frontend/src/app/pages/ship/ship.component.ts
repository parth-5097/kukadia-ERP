import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css'],
})
export class ShipComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  selectedData: any[] = [];

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 25,
      paging: true,
      processing: true,
      ordering: false,
      destroy: true,
      scrollX: true,
      scrollY: '50vh',
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
      this.authService.get(`ship`).subscribe((res) => {
        this.data = res.data;
        console.log(this.data);
        resolve(res);
      });
    });
  }

  reload() {
    this.getDbData().then((res) => {
      this.dtTrigger.next();
    });
  }

  rerender() {
    this.dtTrigger.next();
  }

  onCheck(data, event) {
    if (event.target.checked) {
      this.selectedData.push(this.data.filter((e) => e.id == data.id)[0]);
    } else {
      this.selectedData = this.selectedData.filter((e) => e.id !== data.id);
    }
  }

  ngAfterViewInit(): void {
    let that = this;
    var clicked = false;
    $('.cust-chkmark').on('click', function () {
      $('.checkhour').prop('checked', !clicked);
      that.selectedData = !clicked ? that.data : [];
      clicked = !clicked;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
