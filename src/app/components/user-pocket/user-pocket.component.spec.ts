import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPocketComponent } from './user-pocket.component';

describe('UserPocketComponent', () => {
  let component: UserPocketComponent;
  let fixture: ComponentFixture<UserPocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPocketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
