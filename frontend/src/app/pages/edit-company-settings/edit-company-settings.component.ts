import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CommonRouteService } from 'src/app/service/common-route.service';

declare var $: any;

@Component({
  selector: 'app-edit-company-settings',
  templateUrl: './edit-company-settings.component.html',
  styleUrls: ['./edit-company-settings.component.css'],
})
export class EditCompanySettingsComponent implements OnInit, AfterViewInit {
  editCompForm: FormGroup;
  submitted = false;
  data: any = {};
  branch: any[] = [];
  company_data: any = {};
  bank_data: any = {};
  country: any[] = [];
  state: any[] = [];
  city: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private commonService: CommonRouteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editCompForm = this.formBuilder.group({
      company_name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      mobile_no: ['', [Validators.required]],
      address: ['', [Validators.required]],
      tax_no: ['', [Validators.required]],
      pan_no: [
        '',
        [Validators.required, Validators.pattern(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)],
      ],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      gst_no: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
          ),
        ],
      ],
      bank_name: ['', [Validators.required]],
      dealer_code: ['', [Validators.required]],
      account_name: ['', [Validators.required]],
      branch_name: ['', [Validators.required]],
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
    });
    this.authService.get('company').subscribe((res) => {
      this.data = res.data[0];
    });
    this.authService.get('branch').subscribe((res) => {
      this.branch = res.data;
    });
    this.commonService.get('defCSC').subscribe((res) => {
      this.country = res.country;
      this.state = res.state;
      this.city = res.city;
    });
  }

  get f() {
    return this.editCompForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editCompForm.invalid) {
      return;
    } else {
      this.authService
        .put(`company/${this.data.company_id}`, {
          company_data: {
            name: this.editCompForm.value.name,
            phone_no: this.editCompForm.value.phone_no,
            mobile_no: this.editCompForm.value.mobile_no,
            address: this.editCompForm.value.address,
            tax_no: this.editCompForm.value.tax_no,
            pancard_no: this.editCompForm.value.pancard_no,
            city: this.editCompForm.value.city,
            state: this.editCompForm.value.state,
            country: this.editCompForm.value.country,
            gst_no: this.editCompForm.value.gst_no,
          },
          bank_data: {
            bank_name: this.editCompForm.value.bank_name,
            account_name: this.editCompForm.value.account_name,
            branch_id: this.editCompForm.value.branch_name,
            dealer_code: this.editCompForm.value.dealer_code,
            account_no: this.editCompForm.value.account_no,
            ifsc_code: this.editCompForm.value.ifsc_code,
            swift_code: this.editCompForm.value.swift_code,
          },
        })
        .subscribe((res) => {
          this.toastrService.success(res.message);
          setTimeout(() => {
            this.router.navigate(['/settings/company']);
          }, 0);
        });
    }
  }

  handleImageChange($event, id) {
    const image = $event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.authService.put(`logo/${id}`, formData).subscribe((res) => {
      this.toastrService.success('Image updated successfully');
    });
  }

  onCancel() {
    this.submitted = false;
    this.editCompForm.reset();
    this.router.navigate(['/settings/company']);
  }

  onState(country) {
    this.state = [];
    this.commonService.get(`state/${country}`).subscribe((res) => {
      this.state = res.data;
    });
  }

  onCity(state) {
    let temp = state.split(',');
    this.city = [];
    this.commonService.get(`city/${temp[0]}/${temp[1]}`).subscribe((res) => {
      this.city = res.data;
    });
  }

  ngAfterViewInit(): void {
    $('#load-saved-searches-dropdown').on('click', function () {
      $('.first-dropdown').toggle();
      $('.second-dropdown').hide();
      $('.third-dropdown').hide();
    });

    $('#save-search-dropdown').on('click', function () {
      $('.second-dropdown').toggle();
      $('.first-dropdown').hide();
      $('.third-dropdown').hide();
    });

    $('#standard-view-dropdown').on('click', function () {
      $('.third-dropdown').toggle();
      $('.first-dropdown').hide();
      $('.second-dropdown').hide();
    });
  }
}
