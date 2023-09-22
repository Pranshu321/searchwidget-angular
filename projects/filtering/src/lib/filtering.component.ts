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
  @Input() @required Configs: configs = {
    filterConfig: [],
    addtionalFilterConfig: [],
  };
  @Input() @required cardsFieldsObject: cardFieldsObject = {};
  @Input() @required API: allInputApiProps = {
    formAPI: defaultAPISet,
    searchAPI: defaultAPISet,
    termsAPI: defaultAPISet,
    getDefaultChannelAPI: defaultAPISet,
    getChannelAPI: defaultAPISet,
  };

  @Input() styles: styleProps = {};

  Frameworks: any;
  private defaultChannelID: string = '';
  ngOnInit(): void {
    this.apiService
      .fetchData({
        url: this.API.getDefaultChannelAPI.url,
        method: this.API.getDefaultChannelAPI.method,
        headers: this.API.getDefaultChannelAPI.headers,
        cache: this.API.getDefaultChannelAPI.cache
          ? this.API.getDefaultChannelAPI.cache
          : 'default',
      })
      .then((res) => {
        this.defaultChannelID = res.result.response.value;
        this.getChannelFrameworks();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  getChannelFrameworks() {
    this.apiService
      .fetchData({
        url: `${this.hostname}/api/channel/v1/read/${this.defaultChannelID}`,
        method: this.API.getChannelAPI.method,
        headers: this.API.getChannelAPI.headers,
        cache: this.API.getDefaultChannelAPI.cache
          ? this.API.getDefaultChannelAPI.cache
          : 'default',
      })
      .then((res) => {
        this.Frameworks = res.result.channel.frameworks;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
