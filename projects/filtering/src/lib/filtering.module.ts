import { NgModule } from '@angular/core';
import { FilteringComponent } from './filtering.component';
import { FiltersComponent } from './components/filters-component/filters.component';
import { CardsComponent } from './components/cards-component/cards.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './components/wrapper/wrapper.component';

@NgModule({
  declarations: [
    FilteringComponent,
    FiltersComponentComponent,
    CardsComponentComponent,
    WrapperComponent,
  ],
  imports: [BrowserModule, CommonModule],
  exports: [
    FilteringComponent,
    FiltersComponent,
    CardsComponent,
    WrapperComponent,
  ],
})
export class FilteringModule {}
