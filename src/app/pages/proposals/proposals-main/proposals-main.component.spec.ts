import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsMainComponent } from './proposals-main.component';

describe('ProposalsMainComponent', () => {
  let component: ProposalsMainComponent;
  let fixture: ComponentFixture<ProposalsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
