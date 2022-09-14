import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Trade } from '../../models/trade';

@Component({
  selector: 'app-buy-sell-modal',
  templateUrl: './buy-sell-modal.component.html',
  styleUrls: ['./buy-sell-modal.component.scss'],
})
export class BuySellModalComponent implements OnInit {
  @Input() modalTitle: any;
  @Input() modalContent!: Trade;

  // public lineChartData: ChartConfiguration<'line'>['data']['datasets'] = [];
  public lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      xAxis: {
        grid: {
          display: false,
        },
      },

      yAxis: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  public lineChartLegend = false;

  public lineChartLabels: string[] = [];

  buyForm: FormGroup = new FormGroup({});
  sellForm: FormGroup = new FormGroup({});

  buyStocks() {
    let quantity: number = +this.buyForm.get('buyQuantity')?.value;
    console.log(quantity);
  }

  sellStocks() {
    let quantity: number = +this.sellForm.get('sellQuantity')?.value;
    console.log(quantity);
  }

  graphColor(): string {
    if (
      this.modalContent.Price[this.modalContent.Price.length - 1] >=
      this.modalContent.Price[0]
    )
      return '#00d09c';
    return '#eb5b3c';
  }

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let labels: any[] = [];
    // this.lineChartData = [
    //   {
    //     data: this.modalContent.Price,
    //   },
    // ];
    this.modalContent.Price.forEach((value, index) => {
      labels.push(index.toString(10));
    });

    this.lineChartData = {
      datasets: [
        {
          data: this.modalContent.Price,
          pointRadius: 0,
          label: 'Price',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: this.graphColor(),
        },
      ],
      labels: labels,
    };

    this.buyForm = this.formBuilder.group({
      buyQuantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+'),
        ]),
      ],
    });

    this.sellForm = this.formBuilder.group({
      sellQuantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+'),
        ]),
      ],
    });
  }
}
