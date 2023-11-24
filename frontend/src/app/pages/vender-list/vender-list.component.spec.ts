import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderListComponent } from './vender-list.component';

describe('VenderListComponent', () => {
  let component: VenderListComponent;
  let fixture: ComponentFixture<VenderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
