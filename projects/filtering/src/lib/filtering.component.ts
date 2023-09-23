import { Component, Input, OnInit } from '@angular/core';
import {
  cardFieldsObject,
  configs,
  styleProps,
  allInputApiProps,
  inputAPIProps,
} from './models/interfaces';
import { apiService } from './services/api.service';

export function required(target: object, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    get() {
      throw new Error(`Attribute ${propertyKey} is required`);
    },
    set(value) {
      Object.defineProperty(target, propertyKey, {
        value,
        writable: true,
        configurable: true,
      });
    },
    configurable: true,
  });
}

const defaultAPISet: inputAPIProps = {
  url: '',
  headers: {},
  method: '',
  body: '',
  cache: 'default',
};

@Component({
  selector: 'lib-filtering',
  templateUrl: './filtering.component.html',
})
export class FilteringComponent implements OnInit {
  constructor(private apiService: apiService) {}
  @Input() @required hostname: string = '';
  @Input() @required frameworkFieldName: string = '';
  @Input() @required configObject: configs = {
    filterConfig: [],
    addtionalFilterConfig: [],
  };
  @Input() @required cardsFieldsObject: cardFieldsObject = {};
  @Input() @required API: allInputApiProps = {
    formApi: defaultAPISet,
    searchApi: defaultAPISet,
    termsApi: defaultAPISet,
    getDefaultChannelApi: defaultAPISet,
    getChannelApi: defaultAPISet,
  };

  @Input() styles: styleProps = {};

  frameworks: any;
  private defaultChannelId: string = '';
  ngOnInit(): void {
    this.apiService
      .fetchData({
        url: this.API.getDefaultChannelApi.url,
        method: this.API.getDefaultChannelApi.method,
        headers: this.API.getDefaultChannelApi.headers,
        cache: this.API.getDefaultChannelApi.cache
          ? this.API.getDefaultChannelApi.cache
          : 'default',
      })
      .then((res) => {
        this.defaultChannelId = res.result.response.value;
        this.getChannelFrameworks();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  getChannelFrameworks() {
    this.apiService
      .fetchData({
        url: `${this.hostname}/api/channel/v1/read/${this.defaultChannelId}`,
        method: this.API.getChannelApi.method,
        headers: this.API.getChannelApi.headers,
        cache: this.API.getDefaultChannelApi.cache
          ? this.API.getDefaultChannelApi.cache
          : 'default',
      })
      .then((res) => {
        this.frameworks = res.result.channel.frameworks;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
