import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaxiComponent } from './newtaxi.component';

describe('NewTaxiComponent', () => {
  let component: NewTaxiComponent;
  let fixture: ComponentFixture<NewTaxiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaxiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
