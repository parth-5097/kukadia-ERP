import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { convertFullDateToDate } from 'src/app/handler/custom_validator';
import { AuthService } from 'src/app/service/auth.service';
import { WebSocketService } from 'src/app/service/web-socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent implements OnInit {
  @Input() set globalBranch(branch: any) {
    if (branch == undefined) {
      this.toastr.info('Please select location');
      environment.branch = {};
    } else {
      this.company = branch;
      environment.branch = branch;
      this.authService.get(`latest-invoice/${branch.id}`).subscribe((res) => {
        this.invoice_id = res.data[0].invoice_id - -1;
      });
    }
  }

  company: any = {};
  customerForm: FormGroup;
  submitted = false;
  isChecked: any;
  customer: any = {};
  invoice: any = {
    amount: 0,
  };
  invoice_id: any;
  product_invoice_id: any;
  date: any = {};
  search: any = '';
  searchData: any[] = [];
  products: any[] = [
    {
      date: convertFullDateToDate(new Date()),
      currency: 'USD',
    },
  ];

  readonly baseUrl = environment.PORT_URL;

  constructor(
    private authService: AuthService,
    private websocketService: WebSocketService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.websocketService
      .listen('UPDATED_INVOICE_NUMBER')
      .subscribe((res: any) => {
        this.invoice_id = res.invoice_id - -1;
      });
  }

  ngOnInit(): void {
    this.company = environment.branch;

    this.company.id
      ? this.authService
          .get(`latest-invoice/${this.company.id}`)
          .subscribe((res) => {
            this.invoice_id = res.data[0].invoice_id - -1;
          })
      : ``;

    let d = new Date();
    this.date.todayDate = d.toISOString().split('T')[0];
    this.date.dueDate = d.setDate(d.getDate() + 15);
    this.date.dueDate = d.toISOString().split('T')[0];

    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_no: ['', [Validators.required]],
      billing_address: ['', [Validators.required]],
      shipping_address: [''],
      website: [''],
      company_name: [''],
      notes: [''],
      sub_customer: [null],
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.customerForm.value);

    if (this.customerForm.invalid) {
      return;
    } else {
      this.authService
        .post('customer', this.customerForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
        });
    }
  }

  onSearch(val) {
    this.authService.get(`search-customer?search=${val}`).subscribe((res) => {
      this.searchData = res.data;
    });
  }

  onGetCustomer(id) {
    this.authService.get(`customer/${id}`).subscribe((res) => {
      this.customer = res.data[0];
    });
  }

  change(evt) {
    this.isChecked = evt.target.checked;
    this.customerForm.value.shipping_address =
      this.customerForm.value.billing_address;
  }

  onNewProduct() {
    let last = this.products.length - 1;
    this.products[last].invoice_id = this.invoice_id;
    this.company.id
      ? this.authService
          .post(`invoice-product`, this.products[last])
          .subscribe((res) => {
            this.toastr.success(res.message);
            this.products[last].id = res.product_id;
            this.invoice.amount = 0;
            this.products.map((obj) => {
              obj.amount ? (this.invoice.amount += parseInt(obj.amount)) : null;
            });
            this.products.push({
              date: convertFullDateToDate(new Date()),
              invoice_id: this.invoice_id,
              currency: 'USD',
            });
          })
      : this.toastr.error(
          'Please select branch in which you want to generate invoice'
        );
  }

  onDeleteProfuct(id) {
    this.authService.delete(`invoice-product/${id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.products = this.products.filter((el) => {
        if (el.id == id) {
          return false;
        }
        return true;
      });
      this.invoice.amount = 0;
      this.products.map((obj) => {
        obj.amount ? (this.invoice.amount += parseInt(obj.amount)) : null;
      });
      this.products.length > 0
        ? null
        : this.products.push({
            date: convertFullDateToDate(new Date()),
            currency: 'USD',
          });
    });
  }

  handleAttachmentChange($event) {
    const image = $event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.authService.post(`invoice-attach`, formData).subscribe((res) => {
      this.invoice.attachments = res.fileUrl;
      this.toastr.success('Image updated successfully');
    });
  }

  onCreateinvoice() {
    this.invoice.invoice_id = this.invoice_id;
    this.invoice.customer_id = this.customer.id;
    this.invoice.date = this.date.todayDate;
    this.invoice.branch_id = this.company.id;
    this.invoice.branch_id && this.invoice.customer_id
      ? this.authService.post('invoice', this.invoice).subscribe((res) => {
          this.authService
            .put(`invoice-product-in`, {
              invoice_id: res.insert_id,
              product_id: this.products.map((el) => el.id).join(','),
            })
            .subscribe((res2) => {
              this.toastr.success(res.message);
            });
        })
      : this.toastr.error(
          'You have not selected customer or branch for this invoice'
        );
  }

  onSendInvoiceWithEmail() {
    this.authService
      .post(`send-invoice/${this.invoice_id}`, { email: this.customer.email })
      .subscribe((res) => {
        this.toastr.success(res.message);
      });
  }
}
