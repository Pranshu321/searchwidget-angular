import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { fetchData } from '../../Functions/api';
import {
  dependentTermsFetch,
  filterDataExtract,
  frameworksOptionsRender,
  getFrameworkID,
  masterFieldContentChange,
  renderContentFunction,
  termsFetch,
  updateConfig,
} from '../../Functions/Service_Functions';
import { StyleProps, inputAPIProps } from '../../models/interfaces';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit, OnChanges {
  content: Array<{ [key: string]: any }> = [];
  @Input() filterConfig: Array<any> = [];
  @Input() addtionalFilterConfig: Array<any> = [];
  apiSettedFilterConfig: Array<any> = [];
  filterOptionsData: Array<{ [key: string]: any }> = [];
  tags: Array<string> = [];
  originalmasterKeys: Array<string> = [];
  dependentTermsData: Array<object> = [];
  masterFields: Array<{ [key: string]: any }> = [];
  masterKeys: Array<string> = [];
  cardDataObj: { [key: string]: any } = {};
  cardsData: Array<object> = [];
  frameworksOptionArray: Array<any> = [];
  filterOptionNameArray: Array<string> = [];
  allOptions: any = [];
  @Input() filtersArray: Array<any> = [];
  @Input() framework: string = '';
  @Input() frameworkFieldName: string = '';
  @Input() FrameworksArray: Array<any> = [];
  @Input() hostname: string = '';
  @Input() styles: StyleProps = {};
  @Input() formAPI: inputAPIProps = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  @Input() cardsFieldConfig: { [key: string]: any } = {};
  @Input() searchAPI: inputAPIProps = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  filterBodySet: any = this.searchAPI.body;
  @Input() termsAPI: inputAPIProps = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };

  fetchAndUpdateFilterConfig() {
    fetchData({
      url: this.formAPI.url,
      cache: this.formAPI.cache ? this.formAPI.cache : 'default',
      method: this.formAPI.method,
    })
      .then((res: any) => {
        this.apiSettedFilterConfig = updateConfig({
          apiData: res,
          filterConfig: this.filterConfig,
          addtionalFilterConfig: this.addtionalFilterConfig,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
    const frameworkID =
      this.framework === ''
        ? 'ekstep_ncert_k-12'
        : getFrameworkID(this.FrameworksArray, this.framework);
    fetchData({
      url: `${this.hostname}/api/content/v1/search?orgdetails=orgName,email&framework=${frameworkID}`,
      cache: this.searchAPI.cache ? this.searchAPI.cache : 'default',
      method: this.searchAPI.method,
      body: this.searchAPI.body,
      headers: this.searchAPI.headers,
    })
      .then((res) => {
        this.content = res.result.content;
      })
      .catch((err) => {
        console.log(err);
      });
    fetchData({
      url: `${this.hostname}/api/framework/v1/read/${frameworkID}?categories=board,gradeLevel,medium,class,subject`,
      cache: this.termsAPI.cache ? this.termsAPI.cache : 'default',
      method: this.termsAPI.method,
      headers: this.termsAPI.headers,
    })
      .then((res) => {
        this.masterFields = termsFetch(res, this.apiSettedFilterConfig);

        this.masterKeys = Object.keys(this.masterFields[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  reset() {
    this.filtersArray = [];
    this.allFiltersArray = [];
    this.fetchAndUpdateFilterConfig();
    this.dependentFieldsRender();
    this.frameworksFetch();
    this.filtersContentRender();
    this.renderContentAddtionalFilter();
    this.filterDataRender();
  }

  dependentFieldsRender() {
    const frameworkID =
      this.framework === ''
        ? 'ekstep_ncert_k-12'
        : getFrameworkID(this.FrameworksArray, this.framework);
    fetchData({
      url: `${this.hostname}/api/framework/v1/read/${frameworkID}?categories=board,gradeLevel,medium,class,subject`,
      cache: this.termsAPI.cache ? this.termsAPI.cache : 'default',
      method: this.termsAPI.method,
      headers: this.termsAPI.headers,
    })
      .then((res) => {
        const data = dependentTermsFetch(
          res,
          this.filtersArray,
          this.masterFields
        );
        this.dependentTermsData = data;
        let flag = true;
        this.filtersArray?.map((item: any) => {
          if (item?.value.length !== 0) {
            flag = false;
          }
        });

        if (flag) {
          fetchData({
            url: `${this.hostname}/api/framework/v1/read/${frameworkID}?categories=board,gradeLevel,medium,class,subject`,
            cache: this.termsAPI.cache ? this.termsAPI.cache : 'default',
            method: this.termsAPI.method,
            headers: this.termsAPI.headers,
          })
            .then((res) => {
              this.masterFields = termsFetch(res, this.apiSettedFilterConfig);

              if (
                typeof this.masterFields[0] !== 'undefined' &&
                typeof this.masterFields[0] !== null
              ) {
                this.masterKeys = Object.keys(this.masterFields[0]);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.masterFields = this.dependentTermsData;
          console.log('Terms', this.masterFields);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  frameworksFetch() {
    const FrameWorksOption = frameworksOptionsRender(this.FrameworksArray);
    this.frameworksOptionArray = FrameWorksOption;
  }

  filterShow() {
    const element = document.getElementById('sidebar');
    if (element?.classList.contains('show')) {
      element.classList.remove('show');
      element.classList.add('hide');
    } else {
      element?.classList.remove('hide');
      element?.classList.add('show');
    }
  }

  masterBodyContentChange() {
    this.filterBodySet = masterFieldContentChange(
      this.allFiltersArray !== undefined && this.allFiltersArray.length !== 0
        ? this.allFiltersArray
        : this.filtersArray,
      this.filterConfig,
      this.searchAPI.body ? this.searchAPI.body : ''
    );
  }

  filtersContentRender() {
    this.masterBodyContentChange();
    const frameworkID =
      this.framework === ''
        ? 'ekstep_ncert_k-12'
        : getFrameworkID(this.FrameworksArray, this.framework);
    fetchData({
      url: `${
        this.hostname
      }/api/content/v1/search?orgdetails=orgName,email&framework=${
        this.framework === '' ? 'ekstep_ncert_k-12' : frameworkID
      }`,
      cache: 'default',
      method: this.searchAPI.method,
      body: this.filterBodySet,
      headers: this.searchAPI.headers,
    })
      .then((res) => {
        if (res.result.content !== undefined) {
          this.content = res.result.content;
          this.filterDataRender();
        } else if (res.result.QuestionSet !== undefined) {
          this.content = res.result.QuestionSet;
          this.filterDataRender();
        } else {
          this.content = this.content;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  filterDataRender() {
    const ReturnData = filterDataExtract({
      content: this.content,
      filterConfig: this.apiSettedFilterConfig,
      TermsObject: this.addtionalFilterConfig,
    });
    this.filterOptionsData = ReturnData.OptionValueArray;

    this.filterOptionNameArray = ReturnData.OptionNameArray;
    this.allOptions.map((item: any) => {
      if (this.filterOptionNameArray.includes(item.name)) {
        const idx = this.filterOptionNameArray.indexOf(item.name);
        item.terms = this.filterOptionsData[idx].terms;
      }
    });
    return ReturnData;
  }
  AddtionalContent: any;
  renderContentAddtionalFilter() {
    this.AddtionalContent = renderContentFunction({
      content: this.content,
      filtersSelected: this.filtersArray,
      filterConfig: this.apiSettedFilterConfig,
    });
  }

  additionalOptionValueReturn(Key: string) {
    let valueArray: Array<string> = [];
    this.filterOptionsData.map((item: any) => {
      if (Key.toLowerCase() === item.name.toLowerCase()) {
        valueArray = item.value;
      }
    });
    return valueArray;
  }

  cardsFieldCheck(field: string, item: any) {
    if (field === 'tags' && this.cardsFieldConfig.hasOwnProperty(field)) {
      const arr: Array<string> = [];
      const tagsArray = this.cardsFieldConfig[field].TagsFieldArray;
      tagsArray.map((key: any) => {
        arr.push(item[key]);
      });
      return arr;
    }
    if (field === 'tags') {
      return [];
    }
    if (this.cardsFieldConfig.hasOwnProperty(field)) {
      const itemKey = this.cardsFieldConfig[field].field;
      return item[itemKey];
    }
    return '';
  }

  constructor() {}
  ngOnInit(): void {
    this.fetchAndUpdateFilterConfig();
    this.renderContentAddtionalFilter();
    this.frameworksFetch();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.fetchAndUpdateFilterConfig();
    this.dependentFieldsRender();
    this.frameworksFetch();
    this.filtersContentRender();

    let masterFieldsArray: Array<any> = [];
    this.masterKeys.map((item) => {
      masterFieldsArray.push(this.masterFields[0][item]);
    });
    this.allOptions = [
      { name: this.frameworkFieldName, terms: this.frameworksOptionArray },
      ...masterFieldsArray,
      ...this.filterOptionsData,
    ];
    this.renderContentAddtionalFilter();
  }

  isAddtionalFilter(Name: string) {
    let flag = false;
    this.addtionalFilterConfig.map((item) => {
      if (item.name.toLowerCase() === Name.toLowerCase()) {
        flag = true;
      }
    });
    return flag;
  }

  allFiltersArray: any = [];

  logCards(a: any) {
    const ele = a[0];
    if (ele.name === this.frameworkFieldName) {
      this.framework = ele.value.length === 0 ? 'CBSE' : ele.value[0];
    }
    let flag = true;
    this.allFiltersArray.map((item: any) => {
      if (item.name === ele.name) {
        flag = false;
      }
    });
    if (flag) {
      this.allFiltersArray.push(ele);
    } else {
      this.allFiltersArray.map((item: any) => {
        if (ele.name === this.frameworkFieldName) {
          if (item.name === this.frameworkFieldName) {
            if (item.value[0] === ele.value[0]) {
              item.value = [];
            } else {
              item.value = ele.value;
            }
          }
        } else if (this.isAddtionalFilter(ele.name)) {
          const oldArr = item.value;
          if (oldArr.includes(ele.value[0])) {
            oldArr.splice(oldArr.indexOf(ele.value[0]), 1);
            item.value = oldArr;
          } else {
            oldArr.push(ele.value[0]);
            const uniqueElements = Array.from(new Set(oldArr));
            item.value = uniqueElements;
          }
        }
      });
    }
    this.filtersArray = this.allFiltersArray;

    this.masterBodyContentChange();
    this.dependentFieldsRender();
    this.frameworksFetch();
    this.filtersContentRender();
    this.renderContentAddtionalFilter();

    let masterFieldsArray: Array<any> = [];
    this.masterKeys.map((item) => {
      masterFieldsArray.push(this.masterFields[0][item]);
    });
    this.allOptions = [
      { name: this.frameworkFieldName, terms: this.frameworksOptionArray },
      ...masterFieldsArray,
      ...this.filterOptionsData,
    ];
  }
}
