import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { WebSocketService } from '../service/web-socket.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  data: any = {};
  branch: any[] = [];
  notification: any[] = [];
  selectedBranch: any = 'All';
  component: any;

  onMain: Boolean;

  constructor(
    private authService: AuthService,
    private websocketService: WebSocketService,
    private router: Router,
    private toastr: ToastrService
  ) {
    // this will be for live detection changes on socket event of account deleted
    this.websocketService.listen('ACCOUNT_DELETED').subscribe((res) => {
      localStorage.clear();
      sessionStorage.clear();
      setTimeout(() => {
        this.toastr.info(
          'Your account has been deleted by super admin, please contact super admin for more information'
        );
      }, 0);
      this.router.navigate(['login']);
    });

    this.websocketService.listen('NOTIFICATION').subscribe((res) => {
      this.notification.push(res);
    });
  }

  ngOnInit(): void {
    this.authService.get('current-user').subscribe((res) => {
      this.data = res.data;
    });
    this.authService.get('company').subscribe((res) => {
      this.branch = res.data;
    });
  }

  onBranchSelect(id, name) {
    let company = this.branch.find((el) => el.id == id);
    this.selectedBranch = name;
    this.component.globalBranch = company;
  }

  onOutletLoaded(component) {
    this.component = component;
  }

  ngAfterViewInit(): void {
    $(function () {
      $('.toggle-icon-main').on('click', function (e) {
        $('.hdr-bottom-class').toggleClass('mbl-menu-open-cust');
        if ($('.hdr-bottom-class').hasClass('mbl-menu-open-cust')) {
          $(this).append('<div class="menu-derk-bg-new"></div>');
        } else {
          $('div.menu-derk-bg-new').remove();
        }
        e.stopPropagation();
      });

      $(document).on('click', function (e) {
        if ($(e.target).closest('.hdr-bottom-class').length > 0) return;
        if ($(e.target).is('.hdr-bottom-class') === false) {
          $('.hdr-bottom-class').removeClass('mbl-menu-open-cust');
          $('div.menu-derk-bg-new').remove();
        }
      });

      $('.header-user-profile-inner-cust').on('click', function (e) {
        $(this).toggleClass('active');
        e.stopPropagation();
      });
      $(document).on('click', function (e) {
        if ($(e.target).closest('.header-user-profile-inner-cust').length > 0)
          return;
        if ($(e.target).is('.header-user-profile-inner-cust') === false) {
          $('.header-user-profile-inner-cust').removeClass('active');
        }
      });
      $(window).on('unload', function () {
        $(window).scrollTop(0);
      });
    });

    $(function () {
      const $menu = $('.notification-custom-main');
      $(document).mouseup((e) => {
        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
          $menu.removeClass('active');
        }
      });
      $('.notification-click').on('click', () => {
        $menu.toggleClass('active');
      });

      $('.responsive-view-right img').click(function () {
        $('.search-form-wrapper').toggleClass('active');
      });

      $('.responsive-view-right i').click(function () {
        $('.responsive-view-menu').toggleClass('active');
      });

      $('.responsive-view-right i').click(function () {
        $('.search-form-wrapper').removeClass('active');
      });

      $('.responsive-view-right img').click(function () {
        $('.responsive-view-menu').removeClass('active');
      });

      $('.responsive-view-right .toggle-icon-main').click(function () {
        $('.search-form-wrapper').removeClass('active');
      });
    });

    $('.hdr-bottom-class ul li a').on('click', function () {
      $('.hdr-bottom-class ul li').removeClass('sub-menu-open');
      $(this).parent('li').addClass('sub-menu-open');
      $(this)
        .parent()
        .parent()
        .parent('li.mega-menu-section')
        .addClass('sub-menu-open');
    });

    const $locs = $('.locs-section');
    $(document).mouseup((e) => {
      if (!$locs.is(e.target) && $locs.has(e.target).length === 0) {
        $locs.removeClass('active');
      }
    });
    $('.location-click').on('click', () => {
      $locs.toggleClass('active');
    });
  }
}
