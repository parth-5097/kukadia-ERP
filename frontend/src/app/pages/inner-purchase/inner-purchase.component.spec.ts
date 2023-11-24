import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPurchaseComponent } from './inner-purchase.component';

describe('InnerPurchaseComponent', () => {
  let component: InnerPurchaseComponent;
  let fixture: ComponentFixture<InnerPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
