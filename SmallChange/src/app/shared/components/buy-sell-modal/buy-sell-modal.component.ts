import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ModalServiceService } from '../../services/modal-service.service';
import { Instrument } from '../../models/instrument';
import { Order } from '../../models/order';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-buy-sell-modal',
  templateUrl: './buy-sell-modal.component.html',
  styleUrls: ['./buy-sell-modal.component.scss'],
})
export class BuySellModalComponent implements OnInit {
  @Input() modalTitle: any;
  @Input() modalContent!: Instrument;


  private _success = new Subject<string>();
  errorMessage: string = '';

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert: NgbAlert | undefined;


  // public lineChartData: ChartConfiguration<'line'>['data']['datasets'] = [];
  public lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      xAxis: {
        type: "category",
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 10,
          maxRotation: 0,
          minRotation: 0
        }
      },
      yAxis: {
        display: true,
        position: 'right',
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

  errorType: string = 'danger';
  clientPortfolio: any = null;

  stockPresent: boolean = false;
  portfolioQuantity: number = 0;
  walletAmount: number = 0;
  maxQuantity: number = 0;
  calculatedPrice: number = 0;

  display: number = 100;

  buyStocks() {
    let quantity: number = +this.buyForm.get('buyQuantity')?.value;

    let stockPrice: number = this.modalContent.askPrice;
    if (quantity * stockPrice * 1.01 > this.walletAmount) {
      this._success.next("Insufficient Funds");
      return;
    }

    console.log(quantity)
    if (quantity < this.modalContent.minQuantity || quantity > this.modalContent.maxQuantity) {
      this._success.next(`Please enter a quantity between ${this.modalContent.minQuantity} and ${this.modalContent.maxQuantity}`);
      return;
    }
    if (confirm(`Please confirm that you want to buy ${quantity} ${quantity > 1 ? "units" : 'unit'} of ${this.modalContent.instrumentDescription}.`) == false) {
      return
    }
    this.modalService.executeTrade(new Order(this.modalContent.instrumentId, "B", quantity, stockPrice)).subscribe({
      next: (data) => {
        console.log(data);
        this.getPortfolioWallet();
      },
      error: (e) => {
        console.log(e);
        this._success.next("Server couldnt Perform your trade. Please Try Again.");
      }
    });
  }

  sellStocks() {
    let quantity: number = +this.sellForm.get('sellQuantity')?.value;

    let stockPrice: number = this.modalContent.bidPrice;
    if (!this.stockPresent) {
      this._success.next("Stock not in portfolio");
      return;
    }
    if (quantity > this.portfolioQuantity) {
      this._success.next("Insufficient Shares Bought");
      return;
    }
    if (confirm(`Please confirm that you want to sell ${quantity} ${quantity > 1 ? "units" : 'unit'} of ${this.modalContent.instrumentDescription}.`) == false) {
      return
    }
    this.modalService.executeTrade(new Order(this.modalContent.instrumentId, "S", quantity, stockPrice)).subscribe({
      next: (data) => {
        console.log(data);
        this.getPortfolioWallet();
      },
      error: (e) => {
        console.log(e);
        this._success.next("Server couldnt Perform your trade. Please Try Again.");
      }
    });
  }

  graphColor(): string {
    if (this.modalContent.askPrice < this.calculatedPrice)
      return '#00d09c';
    return '#eb5b3c';
  }

  getPortfolioWallet() {
    this.modalService.getWalletAmount().subscribe((walletResult) => {
      let q = 0;
      this.modalService.getPortfolio().subscribe((portfolio) => {
        portfolio.every((p: any) => {
          if (this.modalContent.instrumentId == p.instrumentId) {
            q = p.quantity;
            this.stockPresent = true;
            return false
          }
          return true;
        });
        this.portfolioQuantity = q;
        this.walletAmount = walletResult.wallet;
        this.maxQuantity = this.walletAmount / (this.modalContent.askPrice * 1.01)
      });
    });
  }

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: ModalServiceService
  ) { }

  getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  ngOnInit(): void {
    this._success.subscribe(message => this.errorMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this.getPortfolioWallet();
    let labels: any[] = [];
    // this.lineChartData = [
    //   {
    //     data: this.modalContent.Price,
    //   },
    // ];
    let Price: number[] = [];
    Price[0] = this.modalContent.askPrice
    for (let i = 1; i < this.display; i++) Price[i] = Price[i - 1] + Price[i - 1] * this.getRandomArbitrary(-0.0001, 0.0001);
    // Price.forEach((value, index) => {
    //   labels.push(index.toString(10));
    // });

    var date, array = [];
    date = new Date();
    while (date.getMinutes() % 30 !== 0) {
      date.setMinutes(date.getMinutes() + 1);
    }
    for (var i = 0; i < this.display; i++) {
      array.push(date.getHours() + ':' + date.getMinutes());
      date.setMinutes(date.getMinutes() + 30);
    }
    this.calculatedPrice = Price[Price.length - 1];
    this.lineChartData = {
      datasets: [
        {
          data: Price,
          pointRadius: 0,
          backgroundColor: this.graphColor(),
          borderColor: this.graphColor()
        },
      ],
      labels: array,
    };

    this.buyForm = this.formBuilder.group({
      buyQuantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+'),
          Validators.min(this.modalContent.minQuantity),
        ]),
      ],
    });

    this.sellForm = this.formBuilder.group({
      sellQuantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+'),
          Validators.min(0),
          Validators.max(this.portfolioQuantity),
        ]),
      ],
    });
  }
}
