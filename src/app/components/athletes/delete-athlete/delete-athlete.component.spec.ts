import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAthleteComponent } from './delete-athlete.component';

describe('DeleteAthleteComponent', () => {
  let component: DeleteAthleteComponent;
  let fixture: ComponentFixture<DeleteAthleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAthleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
