import { Component, OnInit } from '@angular/core';
import { CupreferencesService } from 'src/app/shared/services/cupreferences.service';
import { InvestmentPreferences } from 'src/app/shared/models/investment-preferences';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.scss'],
})
export class PreferencesFormComponent implements OnInit {
  investmentPreferences: InvestmentPreferences = new InvestmentPreferences(
    '',
    '',
    '',
    '',
    ''
  );
  rTolerances: any = [];
  iCategories: any = [];
  iLengths: any = [];
  formInputs: any = [];
  formError: any = null;
  formFilled: boolean = false;
  checkbox: boolean = false;

  submit() {
    let ret;
    this.service
      .submitForm(this.investmentPreferences, this.formFilled, this.checkbox)
      .subscribe({
        next: (data) => (ret = data),
        error: (e) => {
          console.log(e);
          this.user.removeUser();
        },
      });
    if (ret != 0) {
      this.formError = false;
    } else this.formError = true;
  }

  constructor(
    private service: CupreferencesService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.service.getFormInputs().subscribe({
      next: (data) => (this.formInputs = data),
      error: (e) => {
        console.log(e);
        this.user.removeUser();
      },
    });
    this.rTolerances = this.formInputs[0];
    this.iCategories = this.formInputs[1];
    this.iLengths = this.formInputs[2];
    let filled!: any;
    this.service.preferenceFilled().subscribe({
      next: (data) => {
        filled = data;
        if (filled) {
          this.formFilled = true;
          this.investmentPreferences.investmentPurpose =
            filled.investmentPurpose;
          this.investmentPreferences.riskTolerance = filled.riskTolerance;
          this.investmentPreferences.incomeCategory = filled.incomeCategory;
          this.investmentPreferences.lengthOfInvestment =
            filled.lengthOfInvestment;
        }
      },
      error: (e) => {
        console.log(e);
        this.user.removeUser();
      },
    });
  }
}
