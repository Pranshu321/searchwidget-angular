import { NgModule } from '@angular/core';
import { FilteringComponent } from './filtering.component';
import { FiltersComponentComponent } from './components/filters-component/filters-component.component';
import { CardsComponentComponent } from './components/cards-component/cards-component.component';
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
    FiltersComponentComponent,
    CardsComponentComponent,
    WrapperComponent,
  ],
})
export class FilteringModule {}
