import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import {
  filterStyle,
  filtersArraySelectedOptionObject,
} from '../../models/interfaces';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'lib-filters-component',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnChanges {
  Show: string = '';
  @Input() Data: string = '';
  @Output() filtersArrayEvent = new EventEmitter<
    Array<filtersArraySelectedOptionObject>
  >();
  @Output() addFilterNumberEvent = new EventEmitter<Array<number>>();
  filtersArray: Array<filtersArraySelectedOptionObject> = [];
  selected: Array<filtersArraySelectedOptionObject> = [];
  addFilterNumber: Array<number> = [0];
  @Input() styles: filterStyle = {};
  @Input() name: string = '';
  @Input() optionValue: Array<string> = [];
  @Input() filterConfig: Array<any> = [];
  @Input() addtionalFilterConfig: Array<any> = [];
  @Input() allFiltersArray: Array<any> = [];

  optionOb: Array<{ name: string; options: boolean }> = [];
  check: any = [];

  constructor(private filterService: FiltersService) {}

  getOptionStatus(a: string) {
    const idx = this.optionOb.findIndex(
      (obj) => obj.name.toLowerCase() === a.toLowerCase()
    );
    return this.optionOb[idx]?.options;
  }
  optionsShow(a: string) {
    const index = this.optionOb.findIndex(
      (obj) => obj.name.toLowerCase() === a.toLowerCase()
    );
    if (index !== -1) {
      this.optionOb[index].options = !this.optionOb[index].options;
    }
    return this.optionOb[index].options ? this.optionOb[index].options : false;
  }

  isSelected(optionName: string) {
    let flag = true;
    this.allFiltersArray.map((item) => {
      if (
        item.name.toLowerCase() === optionName.toLowerCase() &&
        item.value.length !== 0
      ) {
        flag = false;
      }
    });
    return flag;
  }

  checkIfOptionPresent(optionName: string, option: string) {
    let flag = false;
    this.filtersArray.map((item) => {
      if (
        item.name.toLowerCase() === optionName.toLowerCase() &&
        item.value.includes(option)
      ) {
        flag = true;
      }
    });
    return flag;
  }

  optionShowHide(filterConfig: any) {
    let arr: Array<{ name: string; options: boolean }> = [];
    if (filterConfig.length !== 0) {
      filterConfig.map((item: any) => {
        arr.push({
          name: item.name,
          options: false,
        });
      });
    }
    if (this.addtionalFilterConfig.length !== 0) {
      this.addtionalFilterConfig.map((item: any) => {
        if (item.isEnabled)
          arr.push({
            name: item.name,
            options: false,
          });
      });
    }
    this.optionOb = arr;
  }
  addFilter(optionName: string, optionValue: string) {
    if (this.filterService.optionNameIsPresent(optionName, this.filtersArray)) {
      this.filtersArray?.map((item) => {
        if (
          this.filterService.itemPresentOptionName(
            optionName,
            item,
            this.filtersArray
          )
        ) {
          if (item.value.includes(optionValue)) {
            const newarr = item.value;
            const indexofOption = item.value.indexOf(optionValue);
            newarr.splice(indexofOption, 1);
            item.value = newarr;
            return;
          }
          if (!item.value.includes(optionValue)) {
            let oldArr = item.value;
            oldArr.push(optionValue);
            item.value = oldArr;
          }
        }
      });
    } else {
      this.filtersArray = [
        ...this.filtersArray,
        { name: optionName, value: [optionValue] },
      ];
    }
    const lastIdx = this.addFilterNumber.length;
    this.addFilterNumber.push(this.addFilterNumber[lastIdx - 1] + 1);
    this.addFilterNumberEvent.emit(this.addFilterNumber);
    this.check = [...this.check, ...this.filtersArray];
    this.filtersArrayEvent.emit(this.filtersArray);
  }

  ngOnInit(): void {
    this.optionShowHide(this.filterConfig);
  }
  ngOnChanges(): void {}
}
