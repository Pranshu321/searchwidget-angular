import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FilterStyle, FiltersArraySelectedOptionObject } from '../../models/interfaces';

@Component({
  selector: 'lib-filters-component',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnChanges {
  Show: string = '';
  @Input() Data: string = '';
  @Output() FiltersArrayEvent = new EventEmitter<
    Array<FiltersArraySelectedOptionObject>
  >();
  @Output() AddFilterNumberEvent = new EventEmitter<Array<number>>();
  FiltersArray: Array<FiltersArraySelectedOptionObject> = [];
  Selected: Array<FiltersArraySelectedOptionObject> = [];
  AddFilterNumber: Array<number> = [0];
  @Input() styles: FilterStyle = {};
  @Input() Name: string = '';
  @Input() OptionValue: Array<string> = [];
  @Input() filterConfig: Array<any> = [];
  @Input() addtionalFilterConfig: Array<any> = [];
  @Input() AllFiltersArray: Array<any> = [];

  OptionOb: Array<{ name: string; Options: boolean }> = [];

  getOptionStatus(a: string) {
    const idx = this.OptionOb.findIndex(
      (obj) => obj.name.toLowerCase() === a.toLowerCase()
    );
    return this.OptionOb[idx]?.Options;
  }
  OptionsShow(a: string) {
    const index = this.OptionOb.findIndex(
      (obj) => obj.name.toLowerCase() === a.toLowerCase()
    );
    if (index !== -1) {
      this.OptionOb[index].Options = !this.OptionOb[index].Options;
    }
    return this.OptionOb[index].Options ? this.OptionOb[index].Options : false;
  }

  isSelected(optionName: string) {
    let flag = true;
    this.AllFiltersArray.map((item) => {
      if (
        item.name.toLowerCase() === optionName.toLowerCase() &&
        item.value.length !== 0
      ) {
        flag = false;
      }
    });
    return flag;
  }

  CheckIfOptionPresent(optionName: string, option: string) {
    let flag = false;
    this.FiltersArray.map((item) => {
      if (
        item.name.toLowerCase() === optionName.toLowerCase() &&
        item.value.includes(option)
      ) {
        flag = true;
      }
    });
    return flag;
  }

  CheckIfOptionPresentNew(optionName: string) {
    let flag = false;
    this.FiltersArray?.map((item) => {
      if (item.name.toLowerCase() === optionName.toLowerCase()) {
        flag = true;
      }
    });
    return flag;
  }

  OptionNamePresent(optionName: string, itemarg: any) {
    let flag = false;
    this.FiltersArray?.map((item) => {
      if (
        item.name.toLowerCase() === optionName.toLowerCase() &&
        item.name.toLowerCase() === itemarg.name.toLowerCase()
      ) {
        flag = true;
      }
    });
    return flag;
  }

  Check: any = [];
  IsSingleSelect(OptionName: string) {
    let flag = false;
    this.filterConfig.map((item) => {
      console.log(item);
      if (item.name.toLowerCase() === OptionName.toLowerCase()) {
        if (item.SelectType === 'single') {
          flag = true;
        }
      }
    });
    return flag;
  }

  addFilter(OptionName: string, OptionValue: string) {
    if (this.CheckIfOptionPresentNew(OptionName)) {
      this.FiltersArray?.map((item) => {
        if (this.OptionNamePresent(OptionName, item)) {
          if (item.value.includes(OptionValue)) {
            const newarr = item.value;
            const indexofOption = item.value.indexOf(OptionValue);
            newarr.splice(indexofOption, 1);
            item.value = newarr;
            return;
          }
          if (!item.value.includes(OptionValue)) {
            let oldArr = item.value;
            oldArr.push(OptionValue);
            item.value = oldArr;
          }
        }
      });
    } else {
      this.FiltersArray = [
        ...this.FiltersArray,
        { name: OptionName, value: [OptionValue] },
      ];
    }
    const lastIdx = this.AddFilterNumber.length;
    this.AddFilterNumber.push(this.AddFilterNumber[lastIdx - 1] + 1);
    this.AddFilterNumberEvent.emit(this.AddFilterNumber);
    this.Check = [...this.Check, ...this.FiltersArray];
    this.FiltersArrayEvent.emit(this.FiltersArray);
  }

  OptionShowHide() {
    let arr: Array<{ name: string; Options: boolean }> = [];
    if (this.filterConfig.length !== 0) {
      this.filterConfig.map((item) => {
        arr.push({
          name: item.name,
          Options: false,
        });
      });
    }
    if (this.addtionalFilterConfig.length !== 0) {
      this.addtionalFilterConfig.map((item) => {
        if (item.isEnabled)
          arr.push({
            name: item.name,
            Options: false,
          });
      });
    }
    this.OptionOb = arr;
  }

  ngOnInit(): void {
    this.OptionShowHide();
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
