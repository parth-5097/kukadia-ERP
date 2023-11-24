import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalBillComponent } from './local-bill.component';

describe('LocalBillComponent', () => {
  let component: LocalBillComponent;
  let fixture: ComponentFixture<LocalBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
