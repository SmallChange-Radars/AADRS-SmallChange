import { Component, Input, OnInit } from '@angular/core';
import { ClientPortfolio } from 'src/app/shared/models/client-portfolio';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  // @Input() sum: any;
  @Input() totalPortfolio: any;
  // ClientPortfolio = {name: '', qty: 0, price: 0, value: 0, prof: 0, percent: 0};
  summaryValue: number = 0;
  summaryGains: number = 0;
  walletAmount: number = 0;

  constructor(private service: PortfolioService, private modalService: ModalServiceService, private user: UserService) { }

  ngOnInit(): void {
    this.getPortfolioSummary();
  }

  getPortfolioSummary() {
    this.service.getPortfolio().subscribe({
      next: (data) => {
        this.summaryValue = +data.headers.get("totalValue")!;
        this.summaryGains = +data.headers.get("totalGains")!;
      },
      error: (e) => {
        console.log(e);
        this.user.removeUser();
      }
    });
    this.modalService.getWalletAmount().subscribe({
      next: (data) => {
        this.walletAmount = data.wallet;
      },
      error: (e) => {
        console.log(e);
        this.user.removeUser();
      }
    });
  }

}
