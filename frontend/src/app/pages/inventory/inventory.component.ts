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
import { CommonRouteService } from 'src/app/service/common-route.service';
import { environment } from 'src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';

declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit, AfterViewInit, OnDestroy {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter your desription here...',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  selectedData: any[] = [];

  newInventoryForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private commonService: CommonRouteService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.newInventoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      stock_id: ['', Validators.required],
      account: ['', Validators.required],
      sub_item_id: ['', Validators.required],
      unit_of_m: ['', Validators.required],
      description: ['', Validators.required],
      rate: ['', Validators.required],
      avg_price: ['', Validators.required],
    });

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

    this.getDbData().then((res) => {
      this.dtTrigger.next();
    });
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.authService.get('inventory').subscribe((res) => {
        this.data = res.data;
        resolve(res);
      });
    });
  }

  get f() {
    return this.newInventoryForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.newInventoryForm.invalid) {
      return;
    } else {
      this.authService
        .post('inventory', this.newInventoryForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
        });
    }
  }

  reload() {
    this.getDbData().then((res) => {
      this.dtTrigger.next();
    });
  }

  rerender() {
    this.dtTrigger.next();
  }

  onEditRaw(id) {
    let new_data = this.data.filter((e) => e.id === id)[0];
    this.authService
      .put(`inventory/${id}`, {
        name: new_data.name,
        sub_name: new_data.sub_name,
        description: new_data.description,
        type: new_data.type,
        account: new_data.account,
        on_hand: new_data.on_hand,
        avg_price: new_data.avg_price,
      })
      .subscribe((res) => {
        this.toastr.success(res.message);
        this.getDbData().then((data) => {
          this.dtTrigger.next();
        });
      });
  }

  onDeleteRaw(id) {
    this.authService.delete(`inventory/${id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.getDbData().then((data) => {
        this.dtTrigger.next();
      });
    });
  }

  onExport(val) {
    var jsonData = this.selectedData.length > 0 ? this.selectedData : this.data;
    this.commonService
      .post(`${val == 'pdf' ? 'make-pdf/inventory' : 'make-csv'}`, {
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

  onCheck(data, event) {
    if (event.target.checked) {
      this.selectedData.push(this.data.filter((e) => e.id == data.id)[0]);
    } else {
      this.selectedData = this.selectedData.filter((e) => e.id !== data.id);
    }
  }

  ngAfterViewInit(): void {
    var clicked = false;
    $('.cust-chkmark').on('click', function () {
      $('.checkhour').prop('checked', !clicked);
      this.selectedData = !clicked ? this.data : [];
      clicked = !clicked;
    });

    $('#item-list_wrapper .dataTables_scrollBody').height(
      $(window).height() - 400
    );
  }
}
