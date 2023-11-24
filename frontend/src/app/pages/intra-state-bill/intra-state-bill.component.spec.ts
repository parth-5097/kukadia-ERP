import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraStateBillComponent } from './intra-state-bill.component';

describe('IntraStateBillComponent', () => {
  let component: IntraStateBillComponent;
  let fixture: ComponentFixture<IntraStateBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntraStateBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraStateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
