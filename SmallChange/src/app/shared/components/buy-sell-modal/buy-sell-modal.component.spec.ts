import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Instrument } from '../../models/instrument';
import { ModalServiceService } from '../../services/modal-service.service';

import { BuySellModalComponent } from './buy-sell-modal.component';

describe('BuySellModalComponent', () => {
  let component: BuySellModalComponent;
  let fixture: ComponentFixture<BuySellModalComponent>;

  beforeEach(async () => {
    let modalService: any = jasmine.createSpyObj('ModalServiceService', [
      'executeTrade',
      'getPortfolio',
      'getWalletAmount',
      'handleError',
    ]);
    await TestBed.configureTestingModule({
      declarations: [BuySellModalComponent],
      imports: [
        NgbModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [NgbActiveModal, ModalServiceService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellModalComponent);
    component = fixture.componentInstance;
    component.modalContent = new Instrument('', '', '', -1, -1, -1, -1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
