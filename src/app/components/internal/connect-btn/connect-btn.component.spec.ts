import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectBtnComponent } from './connect-btn.component';

describe('ConnectBtnComponent', () => {
  let component: ConnectBtnComponent;
  let fixture: ComponentFixture<ConnectBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
