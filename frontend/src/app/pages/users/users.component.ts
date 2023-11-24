import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { AuthService } from 'src/app/service/auth.service';
import { CommonRouteService } from 'src/app/service/common-route.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() set globalBranch(branch: any) {
    if (branch == undefined) {
      this.authService.get(`user`).subscribe((res) => {
        this.data = res.data;
      });
      environment.branch = {};
    } else {
      this.company = branch;
      environment.branch = branch;
      this.authService.get(`user?branch=${branch.id}`).subscribe((res) => {
        this.data = res.data;
      });
    }
  }

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  selectedData: any[] = [];
  branch: any[] = [];
  activeUser: number;
  userForm: FormGroup;
  pageScrollPos: any;
  submitted = false;
  company: any = {};

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private commonService: CommonRouteService
  ) {}

  ngOnInit(): void {
    this.company = environment.branch;

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

    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      branch_access: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      mobile_no: [
        '',
        [Validators.required, Validators.pattern(/^(?:[0-9] ?){9}[0-9]$/)],
      ],
      acc_type: ['', [Validators.required]],
    });

    this.authService.get('branch').subscribe((res) => {
      res.data.filter((el) => this.branch.push(el.location));
    });

    this.getDbData().then((data) => {
      this.dtTrigger.next();
    });
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.data = [];
      this.authService.get(`user`).subscribe((res) => {
        this.data = res.data;
        this.data.map(
          (el) => (el.location = el.location ? el.location.split(',') : [])
        );
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

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    } else {
      this.userForm.value.avatar =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1280px-Googleplex_HQ_%28cropped%29.jpg';
      this.authService.post('user', this.userForm.value).subscribe((res) => {
        this.submitted = false;
        this.getDbData().then((data) => {
          this.dtTrigger.next();
        });
        this.userForm.reset();
        this.toastr.success(res.message);
      });
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
      .post(`${val == 'pdf' ? 'make-pdf/users' : 'make-csv'}`, {
        data: jsonData,
      })
      .subscribe((res) => {
        window.open(`${environment.PORT_URL}/${res.data}`, '__blank');
      });
  }

  onEmailChange(email) {
    this.commonService
      .post('check-email', { email: email })
      .subscribe((res) => {
        if (res.message == 'Email exists') {
          this.toastr.info(res.message);
        }
      });
  }

  onFilterBranch(branch: any) {
    return this.branch.filter(function (el) {
      return this.indexOf(el) < 0;
    }, branch);
  }

  onEditRaw(id) {
    let new_data = this.data.filter((e) => e.id === id)[0];
    this.authService
      .put(`user/${id}`, {
        first_name: new_data.first_name,
        last_name: new_data.last_name,
        mobile_no: new_data.mobile_no,
        acc_type: new_data.acc_type,
      })
      .subscribe((res) => {
        this.toastr.success(res.message);
        this.reload();
      });
  }

  onDeleteRaw(id) {
    this.authService.delete(`user/${id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.reload();
    });
  }

  ngAfterViewInit(): void {
    var clicked = false;
    $('.cust-chkmark').on('click', function () {
      $('.checkhour').prop('checked', !clicked);
      this.selectedData = !clicked ? this.data : [];
      clicked = !clicked;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
