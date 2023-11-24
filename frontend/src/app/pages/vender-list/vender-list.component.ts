import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-vender-list',
  templateUrl: './vender-list.component.html',
  styleUrls: ['./vender-list.component.css'],
})
export class VenderListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  vendorForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions[0] = {
      paging: false,
      info: false,
      searching: false,
      processing: true,
      ordering: false,
      destroy: true,
      language: {
        paginate: {
          next: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-double-left"></i>',
          first: '<i class="fa fa-angle-double-right"></i>',
          last: '<i class="fa fa-angle-double-left"></i>',
        },
      },
    };

    this.dtOptions[1] = {
      pagingType: 'simple_numbers',
      pageLength: 6,
      paging: true,
      processing: true,
      ordering: false,
      destroy: true,
      language: {
        paginate: {
          next: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-double-left"></i>',
          first: '<i class="fa fa-angle-double-right"></i>',
          last: '<i class="fa fa-angle-double-left"></i>',
        },
      },
    };

    this.dtOptions[2] = {
      paging: false,
      info: false,
      searching: false,
      processing: true,
      ordering: false,
      destroy: true,
      language: {
        paginate: {
          next: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-double-left"></i>',
          first: '<i class="fa fa-angle-double-right"></i>',
          last: '<i class="fa fa-angle-double-left"></i>',
        },
      },
    };

    this.vendorForm = this.formBuilder.group({
      company_name: ['', [Validators.required]],
      full_name: ['', [Validators.required]],
      terms: ['', [Validators.required]],
      bill_to: ['', [Validators.required]],
    });
  }

  get f() {
    return this.vendorForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.vendorForm.invalid) {
      return;
    } else {
      this.toastrService.info(this.vendorForm.value);
    }
  }

  getDbData() {
    // this.data = [];
    // this.authService.get('user').subscribe((res) => {
    //   this.data = res.data;
    // });
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {}
}
