import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordleSolverComponent } from './wordle-solver.component';

describe('WordleSolverComponent', () => {
  let component: WordleSolverComponent;
  let fixture: ComponentFixture<WordleSolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordleSolverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordleSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
