import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('#purchase-list').DataTable({
        ordering: false,
        bLengthChange: true,
        searching: false,
        scrollX: true,
        fixedHeader: true,
        language: {
          oPaginate: {
            sNext: '<i class="fa fa-angle-double-right"></i>',
            sPrevious: '<i class="fa fa-angle-double-left  "></i>',
            sFirst: '<i class="fa fa-angle-double-right"></i>',
            sLast: '<i class="fa fa-angle-double-left"></i>',
          },
        },

        paging: true,
        info: true,
        iDisplayLength: 10,
      });

      $('#purchase-list-2').DataTable({
        ordering: false,
        bLengthChange: true,
        searching: false,
        scrollX: true,
        fixedHeader: true,
        language: {
          oPaginate: {
            sNext: '<i class="fa fa-angle-double-right"></i>',
            sPrevious: '<i class="fa fa-angle-double-left  "></i>',
            sFirst: '<i class="fa fa-angle-double-right"></i>',
            sLast: '<i class="fa fa-angle-double-left"></i>',
          },
        },

        paging: true,
        info: true,
        iDisplayLength: 10,
      });

      $('#purchase-list-3').DataTable({
        ordering: false,
        bLengthChange: true,
        searching: false,
        scrollX: true,
        fixedHeader: true,
        language: {
          oPaginate: {
            sNext: '<i class="fa fa-angle-double-right"></i>',
            sPrevious: '<i class="fa fa-angle-double-left  "></i>',
            sFirst: '<i class="fa fa-angle-double-right"></i>',
            sLast: '<i class="fa fa-angle-double-left"></i>',
          },
        },

        paging: true,
        info: true,
        iDisplayLength: 10,
      });

      $('#purchase-list-4').DataTable({
        ordering: false,
        bLengthChange: true,
        searching: false,
        scrollX: true,
        fixedHeader: true,
        language: {
          oPaginate: {
            sNext: '<i class="fa fa-angle-double-right"></i>',
            sPrevious: '<i class="fa fa-angle-double-left  "></i>',
            sFirst: '<i class="fa fa-angle-double-right"></i>',
            sLast: '<i class="fa fa-angle-double-left"></i>',
          },
        },

        paging: true,
        info: true,
        iDisplayLength: 10,
      });

      $('.cust-tabs-emp .nav-link').on('shown.bs.tab', function (e) {
        $($.fn.dataTable.tables(true)).css('width', '100%');
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
      });
    });
  }
}
