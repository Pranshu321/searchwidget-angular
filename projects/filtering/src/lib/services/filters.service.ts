import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor() {}
  isSingleSelect(optionName: string, filterConfig: any) {
    let flag = false;
    filterConfig.map((item: any) => {
      console.log(item);
      if (item.name.toLowerCase() === optionName.toLowerCase()) {
        if (item.SelectType === 'single') {
          flag = true;
        }
      }
    });
    return flag;
  }

  itemPresentOptionName(optionName: string, itemarg: any, filtersArray: any) {
    let flag = false;
    filtersArray?.map((item: any) => {
      if (
        item.name.toLowerCase() === optionName.toLowerCase() &&
        item.name.toLowerCase() === itemarg.name.toLowerCase()
      ) {
        flag = true;
      }
    });
    return flag;
  }
  optionNameIsPresent(optionName: string, filtersArray: any) {
    let flag = false;
    filtersArray?.map((item: any) => {
      if (item.name.toLowerCase() === optionName.toLowerCase()) {
        flag = true;
      }
    });
    return flag;
  }
}
