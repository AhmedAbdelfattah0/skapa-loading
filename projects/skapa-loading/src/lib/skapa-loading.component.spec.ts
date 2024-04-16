import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkapaLoadingComponent } from './skapa-loading.component';

describe('SkapaLoadingComponent', () => {
  let component: SkapaLoadingComponent;
  let fixture: ComponentFixture<SkapaLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkapaLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkapaLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
