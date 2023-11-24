import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalInvoiceComponent } from './local-invoice.component';

describe('LocalInvoiceComponent', () => {
  let component: LocalInvoiceComponent;
  let fixture: ComponentFixture<LocalInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
