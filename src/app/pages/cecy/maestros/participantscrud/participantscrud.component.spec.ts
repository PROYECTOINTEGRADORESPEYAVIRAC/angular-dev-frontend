import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantscrudComponent } from './participantscrud.component';

describe('ParticipantscrudComponent', () => {
  let component: ParticipantscrudComponent;
  let fixture: ComponentFixture<ParticipantscrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantscrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantscrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
