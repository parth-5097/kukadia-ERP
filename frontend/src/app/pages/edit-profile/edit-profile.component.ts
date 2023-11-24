import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/handler/custom_validator';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit, AfterViewInit {
  avatar: any;
  data: any = {};
  profileForm: FormGroup;
  changePassForm: FormGroup;
  submitted = false;
  passSubmit = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.get('current-user').subscribe((res) => {
      this.avatar = res.data.avatar;
      this.data = res.data;
    });

    this.profileForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
    });

    this.changePassForm = this.formBuilder.group(
      {
        old_password: ['', Validators.required],
        new_password: ['', Validators.required],
        confirm_password: ['', Validators.required],
      },
      {
        validator: MustMatch('new_password', 'confirm_password'),
      }
    );
  }

  get f() {
    return this.profileForm.controls;
  }

  get f1() {
    return this.changePassForm.controls;
  }

  onChangePassword() {
    this.passSubmit = true;

    if (this.changePassForm.invalid) {
      return;
    } else {
      delete this.changePassForm.value.confirm_password;
      this.authService
        .post('change-password', this.changePassForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
        });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.profileForm.invalid) {
      return;
    } else {
      Object.keys(this.profileForm.value).forEach((e) => {
        this.data[e] = this.profileForm.value[e];
      });
      this.authService
        .put('profile', this.profileForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
          sessionStorage.setItem('loginUser', JSON.stringify(this.data));
          localStorage.setItem('loginUser', JSON.stringify(this.data));
          setTimeout(() => {
            this.router.navigate(['dashboard']);
          }, 0);
        });
    }
  }

  handleImageChange($event) {
    const image = $event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this.authService.post('profile-img', formData).subscribe((res) => {
      this.avatar = environment.PORT_URL + res.imageUrl;
      window.location.reload();
    });
  }

  onCancel() {
    this.submitted = false;
    this.profileForm.reset();
    this.router.navigate(['profile']);
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('.button-psswd').on('click', function () {
        if ($('.input-psswd').attr('psswd-shown') == 'false') {
          $('.input-psswd').removeAttr('type');
          $('.input-psswd').attr('type', 'text');

          $('.input-psswd').removeAttr('psswd-shown');
          $('.input-psswd').attr('psswd-shown', 'true');

          $('.pass-main-show').addClass('active');
        } else {
          $('.input-psswd').removeAttr('type');
          $('.input-psswd').attr('type', 'password');

          $('.input-psswd').removeAttr('psswd-shown');
          $('.input-psswd').attr('psswd-shown', 'false');

          $('.pass-main-show').removeClass('active');
        }
      });
    });
  }
}
