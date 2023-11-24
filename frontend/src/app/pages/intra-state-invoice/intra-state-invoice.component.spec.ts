import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraStateInvoiceComponent } from './intra-state-invoice.component';

describe('IntraStateInvoiceComponent', () => {
  let component: IntraStateInvoiceComponent;
  let fixture: ComponentFixture<IntraStateInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntraStateInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraStateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
