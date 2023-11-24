import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { WebSocketService } from 'src/app/service/web-socket.service';
import { environment } from 'src/environments/environment';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];
  annotations: ApexAnnotations;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  labels: string[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  states: ApexStates;
  subtitle: ApexTitleSubtitle;
  theme: ApexTheme;
};

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() set globalBranch(branch: any) {
    if (branch == undefined) {
      this.toastr.info('Please select location');
      environment.branch = {};
    } else {
      this.company = branch;
      environment.branch = branch;
      this.company.id
        ? this.socketService.emit('LOAD_DASHBOARD', {
            location: this.company.id,
          })
        : this.socketService.emit('LOAD_DASHBOARD', { location: null });
    }
  }

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings[] = [];
  dtTriggerPrice: Subject<any> = new Subject<any>();
  dtTriggerMetal: Subject<any> = new Subject<any>();
  cashOnHandChartOptions: Partial<any>;
  totalSaleChartOptions: Partial<any>;
  totalPurchaseOptions: Partial<any>;
  averageSaleOptions: Partial<any>;
  chartRecentOptions: Partial<any>;
  chartInventoryOptions: Partial<any>;
  company: any;
  time: any = [];
  chartData: any = {};
  price: any[] = [];
  metal: any[] = [];

  constructor(
    private authService: AuthService,
    private socketService: WebSocketService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.company = environment.branch;

    this.socketService.listen('CHART').subscribe((res: any) => {
      this.chartData = res;
      this.setChart();
    });

    this.socketService.listen('COUNTRY_TIME').subscribe((res) => {
      this.time = res;
    });

    this.socketService.listen('PRICE_METAL').subscribe((res: any) => {
      this.price = res.price;
      this.metal = res.metal;
      this.dtTriggerPrice.next();
      this.dtTriggerMetal.next();
    });

    this.dtOptions[0] = {
      pagingType: 'simple',
      searching: false,
      destroy: true,
      scrollX: true,
      scrollY: '22vh',
      ordering: false,
      info: false,
      paging: false,
    };

    this.dtOptions[1] = {
      pagingType: 'simple',
      searching: false,
      destroy: true,
      scrollX: true,
      scrollY: '22vh',
      ordering: false,
      info: false,
      paging: false,
    };

    this.company.id
      ? this.socketService.emit('LOAD_DASHBOARD', { location: this.company.id })
      : this.socketService.emit('LOAD_DASHBOARD', { location: null });
  }

  setChart() {
    this.cashOnHandChartOptions = {
      colors: ['#FF2366', '#F0EFEF'],
      chart: {
        type: 'bar',
        height: 120,
        sparkline: {
          enabled: true,
        },
        stacked: true,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 1,
        dashArray: 0,
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.5,
        },
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      yaxis: {
        show: false,
      },
    };
    this.totalSaleChartOptions = {
      colors: ['#02BC77'],
      chart: {
        type: 'area',
        height: 120,
        sparkline: {
          enabled: true,
        },
        stacked: true,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 1,
        dashArray: 0,
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.5,
        },
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      yaxis: {
        show: false,
      },
    };
    this.totalPurchaseOptions = {
      colors: ['#02BC77', '#4791FF'],
      chart: {
        type: 'area',
        height: 120,
        sparkline: {
          enabled: true,
        },
        stacked: true,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 1,
        dashArray: 0,
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.5,
        },
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      yaxis: {
        show: false,
      },
    };
    this.averageSaleOptions = {
      chart: {
        type: 'donut',
        height: '120',
      },
      colors: ['#FFD950', '#4791FF'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 0,
        dashArray: 0,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (val) {
            return val + '.00' + ' Rs';
          },
          title: {
            formatter: function (seriesName) {
              return '';
            },
          },
        },
      },
      legend: {
        show: false,
      },
    };
    this.chartRecentOptions = {
      colors: ['#02BC77', '#4791FF'],
      chart: {
        type: 'line',
        height: 280,
        stacked: true,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      markers: {
        size: 5,
        colors: ['#02BC77', '#4791FF'],
        shape: 'circle',
        radius: 2,
        hover: {
          sizeOffset: 2,
        },
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'right',
      },
      fill: {
        opacity: 1,
      },
    };
    this.chartInventoryOptions = {
      colors: ['#4791FF', '#FF2366', '#FFD950', '#02BC77'],
      chart: {
        type: 'bar',
        height: 280,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      markers: {
        size: 0,
        strokeColor: '#fff',
        strokeWidth: 2,
        strokeOpacity: 1,
        fillOpacity: 1,
        hover: {
          size: 6,
        },
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995],
      },
    };
  }

  ngAfterViewInit(): void {
    $(window).on('load', function () {
      $('#Summary-modal').modal('show');
    });
  }

  onPrice() {
    setTimeout(() => {
      this.dtTriggerPrice.next();
    }, 200);
  }

  onMetal() {
    setTimeout(() => {
      this.dtTriggerMetal.next();
    }, 200);
  }

  ngOnDestroy(): void {
    this.dtTriggerPrice.unsubscribe();
    this.dtTriggerMetal.unsubscribe();
  }
}
