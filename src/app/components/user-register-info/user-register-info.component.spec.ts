import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterInfoComponent } from './user-register-info.component';

describe('UserRegisterInfoComponent', () => {
  let component: UserRegisterInfoComponent;
  let fixture: ComponentFixture<UserRegisterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegisterInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
