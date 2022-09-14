import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalServiceService } from '../../services/modal-service.service';

import { BuySellModalComponent } from './buy-sell-modal.component';

describe('BuySellModalComponent', () => {
  let component: BuySellModalComponent;
  let fixture: ComponentFixture<BuySellModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuySellModalComponent],
      imports: [NgbModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [NgbActiveModal, ModalServiceService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
