import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  unitForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.unitForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      abbreviation: ['', [Validators.required]],
    });
  }

  get f() {
    return this.unitForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.unitForm.invalid) {
      return;
    } else {
      this.toastrService.info(this.unitForm.value);
    }
  }
}
