import { Component, OnInit } from '@angular/core';
import { CupreferencesService } from 'src/app/shared/services/cupreferences.service';
import { InvestmentPreferences } from 'src/app/shared/models/investment-preferences';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.scss'],
})
export class PreferencesFormComponent implements OnInit {
  clientId = '2';

  public investmentPreferences: InvestmentPreferences =
    new InvestmentPreferences(this.clientId, '', '', '', '');

  rTolerances: any = [];
  iCategories: any = [];
  iLengths: any = [];
  formInputs: any = [];
  formError: any = null;

  submit() {
    let ret;
    this.service
      .submitForm(this.investmentPreferences)
      .subscribe((data) => (ret = data));
    if (ret == 1 || ret == 2) {
      console.log(this.investmentPreferences);
      this.investmentPreferences = new InvestmentPreferences(
        this.clientId,
        '',
        '',
        '',
        ''
      );
      this.formError = false;
    } else this.formError = true;
  }

  constructor(private service: CupreferencesService) {}

  ngOnInit(): void {
    this.service
      .getFormInputs(this.clientId)
      .subscribe((data) => (this.formInputs = data));
    this.rTolerances = this.formInputs[0];
    this.iCategories = this.formInputs[1];
    this.iLengths = this.formInputs[2];
    if (this.formInputs.length > 3) {
      this.investmentPreferences.investmentPurpose = this.formInputs[3];
      this.investmentPreferences.riskTolerance = this.formInputs[4];
      this.investmentPreferences.incomeCategory = this.formInputs[5];
      this.investmentPreferences.investmentLength = this.formInputs[6];
    }
  }
}
