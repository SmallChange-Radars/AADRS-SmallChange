import { Component, OnInit } from '@angular/core';
import { CupreferencesService } from 'src/app/shared/services/cupreferences.service';
import { InvestmentPreferences } from 'src/app/shared/models/investment-preferences';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.scss'],
})
export class PreferencesFormComponent implements OnInit {
  public investmentPreferences: InvestmentPreferences =
    new InvestmentPreferences('', '', '', '', '');
  rTolerances: any = [];
  iCategories: any = [];
  iLengths: any = [];
  formInputs: any = [];
  formError: any = null;
  formFilled: boolean = false;

  submit() {
    let ret;
    this.service
      .submitForm(this.investmentPreferences, this.formFilled)
      .subscribe((data) => (ret = data));
    if (ret != 0) {
      this.formError = false;
    } else this.formError = true;
  }

  constructor(private service: CupreferencesService) {}

  ngOnInit(): void {
    this.service.getFormInputs().subscribe((data) => (this.formInputs = data));
    this.rTolerances = this.formInputs[0];
    this.iCategories = this.formInputs[1];
    this.iLengths = this.formInputs[2];
    let filled!: any;
    this.service.preferenceFilled().subscribe((data) => {
      filled = data;
      if (filled) {
        this.formFilled = true;
        this.investmentPreferences.investmentPurpose = filled.investmentPurpose;
        this.investmentPreferences.riskTolerance = filled.riskTolerance;
        this.investmentPreferences.incomeCategory = filled.incomeCategory;
        this.investmentPreferences.lengthOfInvestment =
          filled.lengthOfInvestment;
      }
    });
  }
}
