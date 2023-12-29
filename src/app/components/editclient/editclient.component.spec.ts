import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientComponent } from './editclient.component';

describe('EditclientComponent', () => {
  let component: EditClientComponent;
  let fixture: ComponentFixture<EditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
