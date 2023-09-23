import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { styleProps, inputAPIProps } from '../../models/interfaces';
import { WrapperService } from '../../services/wrapper.service';
import { apiService } from '../../services/api.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit, OnChanges {
  content: Array<{ [key: string]: any }> = [];
  @Input() filterConfig: Array<any> = [];
  @Input() addtionalFilterConfig: Array<any> | any = [];
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
  allFiltersArray: any = [];
  @Input() filtersArray: Array<any> = [];
  @Input() framework: string = '';
  @Input() frameworkFieldName: string = '';
  @Input() FrameworksArray: Array<any> = [];
  @Input() hostname: string = '';
  @Input() styles: styleProps = {};
  @Input() formApi: inputAPIProps = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  @Input() cardsFieldConfig: { [key: string]: any } = {};
  @Input() searchApi: inputAPIProps = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  filterBodySet: any = this.searchApi.body;
  @Input() termsApi: inputAPIProps = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  constructor(
    private wrapperService: WrapperService,
    private apiService: apiService
  ) {}

  fetchAndUpdateFilterConfig() {
    this.apiService
      .fetchData({
        url: this.formApi.url,
        cache: this.formApi.cache ? this.formApi.cache : 'default',
        method: this.formApi.method,
      })
      .then((res: any) => {
        this.apiSettedFilterConfig = this.wrapperService.updateConfig({
          apiData: res,
          filterConfig: this.filterConfig,
          addtionalFilterConfig: this.addtionalFilterConfig,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
    const frameworkId =
      this.framework === ''
        ? 'ekstep_ncert_k-12'
        : this.wrapperService.getFrameworkID(
            this.FrameworksArray,
            this.framework
          );
    this.apiService
      .fetchData({
        url: `${this.hostname}/api/content/v1/search?orgdetails=orgName,email&framework=${frameworkId}`,
        cache: this.searchApi.cache ? this.searchApi.cache : 'default',
        method: this.searchApi.method,
        body: this.searchApi.body,
        headers: this.searchApi.headers,
      })
      .then((res) => {
        this.content = res.result.content;
      })
      .catch((err) => {
        console.log(err);
      });
    this.apiService
      .fetchData({
        url: `${this.hostname}/api/framework/v1/read/${frameworkId}?categories=board,gradeLevel,medium,class,subject`,
        cache: this.termsApi.cache ? this.termsApi.cache : 'default',
        method: this.termsApi.method,
        headers: this.termsApi.headers,
      })
      .then((res) => {
        this.masterFields = this.wrapperService.termsFetch(
          res,
          this.apiSettedFilterConfig
        );

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
    const frameworkId =
      this.framework === ''
        ? 'ekstep_ncert_k-12'
        : this.wrapperService.getFrameworkID(
            this.FrameworksArray,
            this.framework
          );
    this.apiService
      .fetchData({
        url: `${this.hostname}/api/framework/v1/read/${frameworkId}?categories=board,gradeLevel,medium,class,subject`,
        cache: this.termsApi.cache ? this.termsApi.cache : 'default',
        method: this.termsApi.method,
        headers: this.termsApi.headers,
      })
      .then((res) => {
        const data = this.wrapperService.dependentTermsFetch(
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
          this.apiService
            .fetchData({
              url: `${this.hostname}/api/framework/v1/read/${frameworkId}?categories=board,gradeLevel,medium,class,subject`,
              cache: this.termsApi.cache ? this.termsApi.cache : 'default',
              method: this.termsApi.method,
              headers: this.termsApi.headers,
            })
            .then((res) => {
              this.masterFields = this.wrapperService.termsFetch(
                res,
                this.apiSettedFilterConfig
              );

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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  frameworksFetch() {
    const FrameWorksOption = this.wrapperService.frameworksOptionsRender(
      this.FrameworksArray
    );
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
    this.filterBodySet = this.wrapperService.masterFieldContentChange(
      this.allFiltersArray !== undefined && this.allFiltersArray.length !== 0
        ? this.allFiltersArray
        : this.filtersArray,
      this.filterConfig,
      this.searchApi.body ? this.searchApi.body : ''
    );
  }

  filtersContentRender() {
    this.masterBodyContentChange();
    const frameworkId =
      this.framework === ''
        ? 'ekstep_ncert_k-12'
        : this.wrapperService.getFrameworkID(
            this.FrameworksArray,
            this.framework
          );
    this.apiService
      .fetchData({
        url: `${
          this.hostname
        }/api/content/v1/search?orgdetails=orgName,email&framework=${
          this.framework === '' ? 'ekstep_ncert_k-12' : frameworkId
        }`,
        cache: 'default',
        method: this.searchApi.method,
        body: this.filterBodySet,
        headers: this.searchApi.headers,
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
    const returnData = this.wrapperService.filterDataExtract({
      content: this.content,
      filterConfig: this.apiSettedFilterConfig,
      termsObject: this.addtionalFilterConfig,
    });
    this.filterOptionsData = returnData.OptionValueArray;

    this.filterOptionNameArray = returnData.OptionNameArray;
    this.allOptions.map((item: any) => {
      if (this.filterOptionNameArray.includes(item.name)) {
        const idx = this.filterOptionNameArray.indexOf(item.name);
        item.terms = this.filterOptionsData[idx].terms;
      }
    });
    return returnData;
  }
  addtionalContent: any;
  renderContentAddtionalFilter() {
    this.addtionalContent = this.wrapperService.renderContentFunction({
      content: this.content,
      filtersSelected: this.filtersArray,
      filterConfig: this.apiSettedFilterConfig,
    });
  }

  additionalOptionValueReturn(key: string) {
    let valueArray: Array<string> = [];
    this.filterOptionsData.map((item: any) => {
      if (key.toLowerCase() === item.name.toLowerCase()) {
        valueArray = item.value;
      }
    });
    return valueArray;
  }

  cardsFieldCheck(field: string, item: any) {
    if (field === 'tags' && this.cardsFieldConfig.hasOwnProperty(field)) {
      const arr: Array<string> = [];
      const tagsArray = this.cardsFieldConfig[field].tagsFieldArray;
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

  isAddtionalFilter(name: string) {
    let flag = false;
    this.addtionalFilterConfig?.map((item: any) => {
      if (item.name.toLowerCase() === name.toLowerCase()) {
        flag = true;
      }
    });
    return flag;
  }

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
