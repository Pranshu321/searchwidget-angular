import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { fetchData } from '../../Functions/api';
import {
  DependentTermsFetch,
  FilterDataExtract,
  FrameworksOptionsRender,
  GetFrameWorkID,
  MasterFieldContentChange,
  RenderContentFunction,
  TermsFetch,
  UpdateConfig,
} from '../../Functions/Service_Functions';
import { StyleProps } from '../../Interfaces/interfaces';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit, OnChanges {
  content: Array<{ [key: string]: any }> = [];
  @Input() FilterConfig: Array<any> = [];
  @Input() AddtionalFilterConfig: Array<any> = [];
  ApiSettedFilterConfig: Array<any> = [];
  FilterOptionsData: Array<{ [key: string]: any }> = [];
  tags: Array<string> = [];
  OriginalMasterKeys: Array<string> = [];
  DependentTermsData: Array<object> = [];
  MasterFields: Array<{ [key: string]: any }> = [];
  MasterKeys: Array<string> = [];
  CardDataObj: { [key: string]: any } = {};
  CardsData: Array<object> = [];
  FrameworksOptionArray: Array<any> = [];
  FilterOptionNameArray: Array<string> = [];
  @Input() FiltersArray: Array<any> = [];
  @Input() Framework: string = '';
  @Input() FrameworkFieldName: string = '';
  @Input() FrameworksArray: Array<any> = [];
  @Input() hostname: string = '';
  @Input() Styles: StyleProps = {};
  @Input() FormAPI: {
    url: string;
    headers?: object;
    method: string;
    body?: string;
    cache?:
      | 'default'
      | 'no-store'
      | 'reload'
      | 'force-cache'
      | 'only-if-cached'
      | 'no-cache';
  } = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  @Input() CardsFieldConfig: { [key: string]: any } = {};
  @Input() SearchAPI: {
    url: string;
    headers?: object;
    method: string;
    body?: string;
    cache?:
      | 'default'
      | 'no-store'
      | 'reload'
      | 'force-cache'
      | 'only-if-cached'
      | 'no-cache';
  } = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  FilterBodySet: any = this.SearchAPI.body;
  @Input() TermsAPI: {
    url: string;
    headers?: object;
    method: string;
    body?: string;
    cache?:
      | 'default'
      | 'no-store'
      | 'reload'
      | 'force-cache'
      | 'only-if-cached'
      | 'no-cache';
  } = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };

  FetchAndUpdateFilterConfig() {
    fetchData({
      url: this.FormAPI.url,
      cache: this.FormAPI.cache ? this.FormAPI.cache : 'default',
      method: this.FormAPI.method,
    })
      .then((res: any) => {
        this.ApiSettedFilterConfig = UpdateConfig({
          apiData: res,
          filterConfig: this.FilterConfig,
          addtionalFilterConfig: this.AddtionalFilterConfig,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
    const FrameworkID =
      this.Framework === ''
        ? 'ekstep_ncert_k-12'
        : GetFrameWorkID(this.FrameworksArray, this.Framework);
    fetchData({
      url: `${this.hostname}/api/content/v1/search?orgdetails=orgName,email&framework=${FrameworkID}`,
      cache: this.SearchAPI.cache ? this.SearchAPI.cache : 'default',
      method: this.SearchAPI.method,
      body: this.SearchAPI.body,
      headers: this.SearchAPI.headers,
    })
      .then((res) => {
        this.content = res.result.content;
      })
      .catch((err) => {
        console.log(err);
      });
    fetchData({
      url: `${this.hostname}/api/framework/v1/read/${FrameworkID}?categories=board,gradeLevel,medium,class,subject`,
      cache: this.TermsAPI.cache ? this.TermsAPI.cache : 'default',
      method: this.TermsAPI.method,
      headers: this.TermsAPI.headers,
    })
      .then((res) => {
        this.MasterFields = TermsFetch(res, this.ApiSettedFilterConfig);

        this.MasterKeys = Object.keys(this.MasterFields[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  Reset() {
    this.FiltersArray = [];
    this.AllFiltersArray = [];
    this.FetchAndUpdateFilterConfig();
    this.DependentFieldsRender();
    this.FrameWorksFetch();
    this.FiltersContentRender();
    this.RenderContentAddtionalFilter();
    this.FilterDataRender();
  }

  DependentFieldsRender() {
    const FrameworkID =
      this.Framework === ''
        ? 'ekstep_ncert_k-12'
        : GetFrameWorkID(this.FrameworksArray, this.Framework);
    fetchData({
      url: `${this.hostname}/api/framework/v1/read/${FrameworkID}?categories=board,gradeLevel,medium,class,subject`,
      cache: this.TermsAPI.cache ? this.TermsAPI.cache : 'default',
      method: this.TermsAPI.method,
      headers: this.TermsAPI.headers,
    })
      .then((res) => {
        const data = DependentTermsFetch(
          res,
          this.FiltersArray,
          this.MasterFields
        );
        this.DependentTermsData = data;
        let flag = true;
        this.FiltersArray?.map((item: any) => {
          if (item?.value.length !== 0) {
            flag = false;
          }
        });

        if (flag) {
          fetchData({
            url: `${this.hostname}/api/framework/v1/read/${FrameworkID}?categories=board,gradeLevel,medium,class,subject`,
            cache: this.TermsAPI.cache ? this.TermsAPI.cache : 'default',
            method: this.TermsAPI.method,
            headers: this.TermsAPI.headers,
          })
            .then((res) => {
              this.MasterFields = TermsFetch(res, this.ApiSettedFilterConfig);

              if (
                typeof this.MasterFields[0] !== 'undefined' &&
                typeof this.MasterFields[0] !== null
              ) {
                this.MasterKeys = Object.keys(this.MasterFields[0]);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.MasterFields = this.DependentTermsData;
          console.log('Terms', this.MasterFields);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  FrameWorksFetch() {
    const FrameWorksOption = FrameworksOptionsRender(this.FrameworksArray);
    this.FrameworksOptionArray = FrameWorksOption;
  }

  FilterShow() {
    const element = document.getElementById('sidebar');
    if (element?.classList.contains('show')) {
      element.classList.remove('show');
      element.classList.add('hide');
    } else {
      element?.classList.remove('hide');
      element?.classList.add('show');
    }
  }

  MasterBodyContentChange() {
    this.FilterBodySet = MasterFieldContentChange(
      this.AllFiltersArray !== undefined && this.AllFiltersArray.length !== 0
        ? this.AllFiltersArray
        : this.FiltersArray,
      this.FilterConfig,
      this.SearchAPI.body ? this.SearchAPI.body : ''
    );
  }

  FiltersContentRender() {
    this.MasterBodyContentChange();
    const FrameworkID =
      this.Framework === ''
        ? 'ekstep_ncert_k-12'
        : GetFrameWorkID(this.FrameworksArray, this.Framework);
    fetchData({
      url: `${
        this.hostname
      }/api/content/v1/search?orgdetails=orgName,email&framework=${
        this.Framework === '' ? 'ekstep_ncert_k-12' : FrameworkID
      }`,
      cache: 'default',
      method: this.SearchAPI.method,
      body: this.FilterBodySet,
      headers: this.SearchAPI.headers,
    })
      .then((res) => {
        if (res.result.content !== undefined) {
          this.content = res.result.content;
          this.FilterDataRender();
        } else if (res.result.QuestionSet !== undefined) {
          this.content = res.result.QuestionSet;
          this.FilterDataRender();
        } else {
          this.content = this.content;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  FilterDataRender() {
    const ReturnData = FilterDataExtract({
      content: this.content,
      filterConfig: this.ApiSettedFilterConfig,
      TermsObject: this.AddtionalFilterConfig,
    });
    this.FilterOptionsData = ReturnData.OptionValueArray;

    this.FilterOptionNameArray = ReturnData.OptionNameArray;
    this.AllOptions.map((item: any) => {
      if (this.FilterOptionNameArray.includes(item.name)) {
        const idx = this.FilterOptionNameArray.indexOf(item.name);
        item.terms = this.FilterOptionsData[idx].terms;
      }
    });
    return ReturnData;
  }
  AddtionalContent: any;
  RenderContentAddtionalFilter() {
    this.AddtionalContent = RenderContentFunction({
      content: this.content,
      filtersSelected: this.FiltersArray,
      filterConfig: this.ApiSettedFilterConfig,
    });
  }

  AdditionalOptionValueReturn(Key: string) {
    let valueArray: Array<string> = [];
    this.FilterOptionsData.map((item: any) => {
      if (Key.toLowerCase() === item.name.toLowerCase()) {
        valueArray = item.value;
      }
    });
    return valueArray;
  }

  CardsFieldCheck(field: string, item: any) {
    if (field === 'tags' && this.CardsFieldConfig.hasOwnProperty(field)) {
      const arr: Array<string> = [];
      const tagsArray = this.CardsFieldConfig[field].TagsFieldArray;
      tagsArray.map((key: any) => {
        arr.push(item[key]);
      });
      return arr;
    }
    if (field === 'tags') {
      return [];
    }
    if (this.CardsFieldConfig.hasOwnProperty(field)) {
      const itemKey = this.CardsFieldConfig[field].field;
      return item[itemKey];
    }
    return '';
  }

  constructor() {}
  AllOptions: any = [];
  ngOnInit(): void {
    this.FetchAndUpdateFilterConfig();
    this.RenderContentAddtionalFilter();
    this.FrameWorksFetch();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.FetchAndUpdateFilterConfig();
    this.DependentFieldsRender();
    this.FrameWorksFetch();
    this.FiltersContentRender();

    let MasterFieldsArray: Array<any> = [];
    this.MasterKeys.map((item) => {
      MasterFieldsArray.push(this.MasterFields[0][item]);
    });
    this.AllOptions = [
      { name: this.FrameworkFieldName, terms: this.FrameworksOptionArray },
      ...MasterFieldsArray,
      ...this.FilterOptionsData,
    ];
    this.RenderContentAddtionalFilter();
  }

  IsAddtionalFilter(Name: string) {
    let flag = false;
    this.AddtionalFilterConfig.map((item) => {
      if (item.name.toLowerCase() === Name.toLowerCase()) {
        flag = true;
      }
    });
    return flag;
  }

  AllFiltersArray: any = [];

  LOG(a: any) {
    const ele = a[0];
    if (ele.name === this.FrameworkFieldName) {
      this.Framework = ele.value.length === 0 ? 'CBSE' : ele.value[0];
    }
    let flag = true;
    this.AllFiltersArray.map((item: any) => {
      if (item.name === ele.name) {
        flag = false;
      }
    });
    if (flag) {
      this.AllFiltersArray.push(ele);
    } else {
      this.AllFiltersArray.map((item: any) => {
        if (ele.name === this.FrameworkFieldName) {
          if (item.name === this.FrameworkFieldName) {
            if (item.value[0] === ele.value[0]) {
              item.value = [];
            } else {
              item.value = ele.value;
            }
          }
        } else if (this.IsAddtionalFilter(ele.name)) {
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
    // if (this.FrameworksOptionArray.includes(ele.value[0]) && this.AllFiltersArray.length!==0) {
    //   // console.log("Yes");
    //   let oldArr = this.AllFiltersArray.filter((item: any) => {
    //     return item.name.toLowerCase() !== ele.name.toLowerCase();
    //   });
    //   // console.log("old",oldArr);
    //   oldArr.push({ name: ele.name, value: [ele.value] });
    //   this.AllFiltersArray = oldArr;
    // }
    // if(this.AllFiltersArray.length!==0){
    //   this.AllFiltersArray.map((item:any)=>{
    //     if(item.name===this.FrameworkFieldName){
    //     }
    //   })
    // }
    this.FiltersArray = this.AllFiltersArray;

    this.MasterBodyContentChange();
    this.DependentFieldsRender();
    this.FrameWorksFetch();
    this.FiltersContentRender();
    this.RenderContentAddtionalFilter();

    let MasterFieldsArray: Array<any> = [];
    this.MasterKeys.map((item) => {
      MasterFieldsArray.push(this.MasterFields[0][item]);
    });
    this.AllOptions = [
      { name: this.FrameworkFieldName, terms: this.FrameworksOptionArray },
      ...MasterFieldsArray,
      ...this.FilterOptionsData,
    ];
  }
}
