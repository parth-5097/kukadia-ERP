import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewshipComponent } from './newship.component';

describe('NewshipComponent', () => {
  let component: NewshipComponent;
  let fixture: ComponentFixture<NewshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewshipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
