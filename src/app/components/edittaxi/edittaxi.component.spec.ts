import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxiComponent } from './edittaxi.component';

describe('EdittaxiComponent', () => {
  let component: EditTaxiComponent;
  let fixture: ComponentFixture<EditTaxiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaxiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
