import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCRUDComponent } from './school-crud.component';

describe('SchoolCRUDComponent', () => {
  let component: SchoolCRUDComponent;
  let fixture: ComponentFixture<SchoolCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolCRUDComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
