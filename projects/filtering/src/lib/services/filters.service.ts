import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor() {}
  IsSingleSelect(OptionName: string, filterConfig: any) {
    let flag = false;
    filterConfig.map((item: any) => {
      console.log(item);
      if (item.name.toLowerCase() === OptionName.toLowerCase()) {
        if (item.SelectType === 'single') {
          flag = true;
        }
      }
    });
    return flag;
  }

  itemPresentOptionName(optionName: string, itemarg: any, FiltersArray: any) {
    let flag = false;
    FiltersArray?.map((item: any) => {
      if (
        item.name.toLowerCase() === optionName.toLowerCase() &&
        item.name.toLowerCase() === itemarg.name.toLowerCase()
      ) {
        flag = true;
      }
    });
    return flag;
  }
  OptionNameisPresent(optionName: string, FiltersArray: any) {
    let flag = false;
    FiltersArray?.map((item: any) => {
      if (item.name.toLowerCase() === optionName.toLowerCase()) {
        flag = true;
      }
    });
    return flag;
  }
}
