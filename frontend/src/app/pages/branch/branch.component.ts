import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { removeNull } from 'src/app/handler/custom_validator';
import { AuthService } from 'src/app/service/auth.service';
import { CommonRouteService } from 'src/app/service/common-route.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit, AfterViewInit {
  branchForm: FormGroup;
  newBankForm: FormGroup;
  submitted = false;
  newBankSub = false;
  country: any[] = [];
  state: any[] = [];
  city: any[] = [];
  branch: any[] = [];
  company: any = {};
  bank: any[] = [];

  selectedCountry: any = 'IN';

  imgUrl: any;
  readonly baseUrl: any = environment.PORT_URL;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private commonService: CommonRouteService
  ) {}

  ngOnInit(): void {
    this.commonService.get('country').subscribe((res) => {
      this.country = res.data;
    });

    this.authService.get('company').subscribe((res) => {
      this.branch = res.data;
    });

    this.branchForm = this.formBuilder.group({
      company_data: this.formBuilder.group({
        name: ['', [Validators.required]],
        branch_name: ['', [Validators.required]],
        phone_no: ['', [Validators.required]],
        address: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        website: [
          '',
          [
            Validators.pattern(
              /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
            ),
          ],
        ],
        attn_to: ['', [Validators.required]],
        tin_no: [''],
        tax_id: [''],
        pancard_no: ['', [Validators.pattern(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)]],
        city: [''],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        gst_no: [
          '',
          [
            Validators.pattern(
              /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
            ),
          ],
        ],
        ein_no: [''],
      }),
      bank_data: this.formBuilder.group({
        bank_name: ['', [Validators.required]],
        dealer_code: ['', [Validators.required]],
        account_name: ['', [Validators.required]],
        account_no: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{2}(?:[0-9]{9}|-[0-9]{3}-[0-9]{6})$/),
          ],
        ],
        ifsc_code: [
          '',
          [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)],
        ],
        swift_code: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}[XXX0-9]{0,3}/
            ),
          ],
        ],
        aba_routing_no: [''],
      }),
    });

    this.newBankForm = this.formBuilder.group({
      bank_name: ['', [Validators.required]],
      dealer_code: ['', [Validators.required]],
      account_name: ['', [Validators.required]],
      account_no: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{2}(?:[0-9]{9}|-[0-9]{3}-[0-9]{6})$/),
        ],
      ],
      ifsc_code: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)],
      ],
      swift_code: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}[XXX0-9]{0,3}/
          ),
        ],
      ],
      aba_routing_no: [''],
    });

    this.commonService.get('defCSC').subscribe((res) => {
      this.country = res.country;
      this.state = res.state;
      this.city = res.city;
    });
  }

  get f() {
    return {
      ...this.branchForm.get('company_data')['controls'],
      ...this.branchForm.get('bank_data')['controls'],
    };
  }

  get f1() {
    return this.newBankForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.branchForm.invalid) {
      return;
    } else {
      this.branchForm.value.company_data = removeNull(
        this.branchForm.value.company_data
      );
      this.branchForm.value.bank_data = removeNull(
        this.branchForm.value.bank_data
      );
      this.authService
        .post(`company`, this.branchForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
        });
    }
  }

  onAddBank() {
    this.newBankSub = true;

    if (this.newBankForm.invalid) {
      return;
    } else {
      this.authService
        .post(`bank/${this.company.id}`, removeNull(this.newBankForm.value))
        .subscribe((res) => {
          this.toastr.success(res.message);
          this.newBankSub = false;
          this.newBankForm.reset();
        });
    }
  }

  onEditBank(id) {
    let value = this.bank.find((el) => el.id == id);
    delete value.id;
    delete value.created_at;
    delete value.updated_at;
    this.authService.put(`bank/${id}`, value).subscribe((res) => {
      this.toastr.success(res.message);
    });
  }

  onDeleteBank(id) {
    this.authService.delete(`bank/${id}`).subscribe((res) => {
      this.bank.splice(
        this.bank.findIndex((el) => el.id == id),
        1
      );
      this.toastr.success(res.message);
    });
  }

  onEditCompany(id) {
    this.authService.get(`company/${id}`).subscribe((res) => {
      this.company = res.company_data;
      this.bank = res.bank_data;
    });
  }

  onUpdateCompany(id) {
    let value = this.company;
    delete value.created_at;
    delete value.updated_at;
    delete value.id;
    value.country = value.country.name
      ? value.country
      : JSON.parse(value.country);
    value.city = value.city.name ? value.city : JSON.parse(value.city);
    value.state = value.state.name ? value.state : JSON.parse(value.state);
    this.authService.put(`company/${id}`, value).subscribe((res) => {
      this.toastr.success(res.message);
    });
  }

  handleImageChange($event) {
    const image = $event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.authService.post(`company_logo`, formData).subscribe((res) => {
      this.imgUrl = res.imgUrl;
      this.branchForm.value.logo = res.imgUrl;
      this.toastr.success('Image updated successfully');
    });
  }

  onState(country) {
    this.state = [];
    let cn = JSON.parse(country);
    this.selectedCountry = cn.isoCode;
    this.commonService.get(`state/${cn.isoCode}`).subscribe((res) => {
      this.state = res.data;
    });
  }

  onCity(state) {
    this.city = [];
    let st = JSON.parse(state);
    this.commonService
      .get(`city/${st.countryCode}/${st.isoCode}`)
      .subscribe((res) => {
        this.city = res.data;
      });
  }

  ngAfterViewInit() {
    $('.image-upload-wrap').bind('dragover', function () {
      $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', function () {
      $('.image-upload-wrap').removeClass('image-dropping');
    });
  }
}
