import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocationComponent } from './newlocation.component';

describe('NewlocationComponent', () => {
  let component: NewLocationComponent;
  let fixture: ComponentFixture<NewLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
