import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionmapComponent } from './connectionmap.component';

describe('ConnectionmapComponent', () => {
  let component: ConnectionmapComponent;
  let fixture: ComponentFixture<ConnectionmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
