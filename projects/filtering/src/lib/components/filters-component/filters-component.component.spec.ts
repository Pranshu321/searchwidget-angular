import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponentComponent } from './filters-component.component';

describe('FiltersComponentComponent', () => {
  let component: FiltersComponentComponent;
  let fixture: ComponentFixture<FiltersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
