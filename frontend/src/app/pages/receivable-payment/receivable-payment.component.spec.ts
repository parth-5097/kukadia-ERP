import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivablePaymentComponent } from './receivable-payment.component';

describe('ReceivablePaymentComponent', () => {
  let component: ReceivablePaymentComponent;
  let fixture: ComponentFixture<ReceivablePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivablePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivablePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
