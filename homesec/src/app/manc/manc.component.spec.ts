import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MancComponent } from './manc.component';

describe('MancComponent', () => {
  let component: MancComponent;
  let fixture: ComponentFixture<MancComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MancComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
