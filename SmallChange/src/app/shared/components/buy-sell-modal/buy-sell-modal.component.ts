import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Trade } from '../../models/trade';
import { UserService } from '../../services/user.service';
import { ModalServiceService } from '../../services/modal-service.service';
import { Instrument } from '../../models/instrument';

@Component({
  selector: 'app-buy-sell-modal',
  templateUrl: './buy-sell-modal.component.html',
  styleUrls: ['./buy-sell-modal.component.scss'],
})
export class BuySellModalComponent implements OnInit {
  @Input() modalTitle: any;
  @Input() modalContent!: Instrument;

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

  buyError: boolean = false;
  sellError: boolean = false;
  sellStockError: boolean = false;

  errorType: string = 'danger';
  clientPortfolio: any = null;

  portfolioQuantity: number = 0;
  walletAmount: number = 0;
  calculatedPrice: number = 0;

  buyStocks() {
    let quantity: number = +this.buyForm.get('buyQuantity')?.value;
    let amount: number = 0.5 * 1000;
    let stockPrice: number = this.modalContent.askPrice;
    if (quantity * stockPrice <= amount) {
      this.buyError = false;
    } else this.buyError = true;
    console.log(quantity);
  }

  sellStocks() {
    let quantity: number = +this.sellForm.get('sellQuantity')?.value;
    console.log(quantity);
    console.log('here');

    this.modalService
      .getPortfolio(this.userService.getUser())
      .subscribe((data) => {
        this.clientPortfolio = data;
        let flag: Boolean = false;
        this.clientPortfolio.value.forEach((a: any) => {
          //Change to for loop and implement break
          if (a.Stock == this.modalContent.instrumentId) {
            flag = true;
            const result = a.Quantities.reduce(
              (accumulator: any, current: any) => {
                return accumulator + current;
              },
              0
            );
            console.log(result > quantity);
            if (result > quantity) {
              this.sellError = false;
            } else this.sellError = true;
          }
        });
        if (flag == false) this.sellStockError = true;
        else this.sellStockError = false;
      });
  }

  graphColor(): string {
    if (
      // this.modalContent.Price[this.modalContent.Price.length - 1] >=
      // this.modalContent.Price[0]
      true
    )
      return '#00d09c';
    return '#eb5b3c';
  }

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private modalService: ModalServiceService
  ) {}

  ngOnInit(): void {
    let labels: any[] = [];
    // this.lineChartData = [
    //   {
    //     data: this.modalContent.Price,
    //   },
    // ];
    let Price: number[] = [];
    for (let i = 0; i < 100; i++) Price[i] = this.modalContent.askPrice;
    Price.forEach((value, index) => {
      labels.push(index.toString(10));
    });

    this.lineChartData = {
      datasets: [
        {
          data: Price,
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
    let portfolio: any;
    this.modalService.getPortfolioActual().subscribe((data) => {
      portfolio = data;
      console.log(portfolio);
      portfolio.forEach((p: any) => {
        if (this.modalContent.instrumentId == p.instrumentId)
          this.portfolioQuantity = p.quantity;
      });
    });
    let walletResult: any;
    this.modalService.getWalletAmount().subscribe((data) => {
      walletResult = data;
      this.walletAmount = walletResult.wallet;
    });
  }
}
