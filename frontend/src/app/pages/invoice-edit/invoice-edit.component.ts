import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { convertFullDateToDate } from 'src/app/handler/custom_validator';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css'],
})
export class InvoiceEditComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  submitted = false;

  invoice_id: any;
  customer: any[] = [];
  invoice: any = {};
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.invoice_id = params['id'];
      this.authService.get(`invoice/${+params['id']}`).subscribe((res) => {
        this.invoice = res.data[0];
      });
    });

    this.authService.get('customer').subscribe((res) => {
      this.customer = res.data;
    });

    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 25,
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

    this.getDbData().then((res) => {
      this.dtTrigger.next();
    });
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.data = [];
      this.authService
        .get(`invoice-product/${this.invoice_id}`)
        .subscribe((res) => {
          this.data = res.data;
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

  onSubmit() {
    return new Promise((resolve, reject) => {
      this.authService
        .put(`customer/${this.invoice.customer_id}`, {
          name: this.invoice.name,
          email: this.invoice.email,
          phone_no: this.invoice.phone_no,
          billing_address: this.invoice.billing_address,
          shipping_address: this.invoice.shipping_address,
        })
        .subscribe((data) => {
          this.authService
            .put(`invoice/${this.invoice.id}`, {
              amount: this.invoice.amount,
              bill_to: this.invoice.bill_to,
              branch_id: this.invoice.branch_id,
              broker: this.invoice.broker,
              brokerage: this.invoice.brokerage,
              country_of_goods: this.invoice.country_of_goods,
              currency: this.invoice.currency,
              customer_id: this.invoice.customer_id,
              date: convertFullDateToDate(this.invoice.date),
              due_date: convertFullDateToDate(this.invoice.due_date),
              invoice_id: parseInt(this.invoice.id),
              ship: convertFullDateToDate(this.invoice.ship),
              f_o_b: this.invoice.f_o_b,
              final_dest: this.invoice.final_dest,
              flight_no: this.invoice.flight_no,
              p_o_number: this.invoice.p_o_number,
              port_of_loading: this.invoice.port_of_loading,
              pre_carriage_by: this.invoice.pre_carriage_by,
              rap: this.invoice.rap,
              ship_to: this.invoice.ship_to,
              status: this.invoice.status,
              terms: this.invoice.terms,
              via: this.invoice.via,
            })
            .subscribe((res) => {
              localStorage.setItem('invoice', JSON.stringify(this.invoice));
              this.toastr.success(res.message);
              resolve(res);
            });
        });
    });
  }

  onSave() {
    this.onSubmit().then((res) => {
      this.router.navigate(['/invoice']);
    });
  }

  onSaveWithOption(value: any) {
    if (value == 1) {
      this.onSubmit().then((res) => {
        this.router.navigate(['/invoice/create']);
      });
    } else if (value == 2) {
      document
        .getElementById('send-Invoice-modal')
        .classList.add('model fade show');
    } else {
      window.open(
        'https://api.whatsapp.com/send?text=YourShareTextHere',
        '_blank'
      );
    }
  }

  onSendInvoice(email) {
    this.authService
      .post(`send-invoice/${this.invoice_id}`, { email: email })
      .subscribe((res) => {
        this.toastr.success(res.message);
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

  onEditProduct(id) {
    let new_data = this.data.filter((e) => e.id === id)[0];
    console.log(new_data);
    this.authService
      .put(`invoice-product/${id}`, {
        date: convertFullDateToDate(new_data.date),
        name: new_data.name,
        invoice_id: new_data.invoice_id,
        description: new_data.description,
        qty: new_data.qty,
        rate: new_data.rate,
        currency: new_data.currency,
        amount: new_data.amount,
      })
      .subscribe((res) => {
        this.toastr.success(res.message);
      });
  }

  onProductDelete(id) {
    this.authService.delete(`invoice-product/${id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.reload();
    });
  }
}
