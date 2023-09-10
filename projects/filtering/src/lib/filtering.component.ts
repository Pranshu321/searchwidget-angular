import { Component, Input, OnInit } from '@angular/core';
import { fetchData } from './Functions/api';
import { StyleProps, inputAPIProps } from './models/interfaces';

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

@Component({
  selector: 'lib-filtering',
  templateUrl: './filtering.component.html',
})
export class FilteringComponent implements OnInit {
  constructor() {}
  @Input() @required hostname: string = '';
  @Input() @required frameworkFieldName: string = '';
  @Input() addtionalFilterConfig: Array<{
    name: string;
    field: string;
    isEnabled: boolean;
  }> = [];
  @Input() @required filterConfig: Array<{
    name: string;
    field: string;
    isEnabled: boolean;
  }> = [];
  @Input() @required cardsFieldsObject: {
    name?: {
      field: string;
    };
    type?: {
      field: string;
    };
    tags?: {
      TagsFieldArray: Array<string>;
    };
    image?: {
      field: string;
    };
    publisher?: {
      field: string;
    };
    subject?: {
      field: string;
    };
  } = {};
  @Input() @required formAPI: inputAPIProps = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  @Input() @required searchAPI: inputAPIProps = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  
  @Input() styles:StyleProps = {};

  @Input() @required termsAPI: inputAPIProps = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  @Input() @required getDefaultChannel: inputAPIProps = {
    url: '',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  @Input() @required getChannelAPI: inputAPIProps = {
    url:'',
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  Frameworks: any;
  private defaultChannelID: string = '';
  ngOnInit(): void {
    fetchData({
      url: this.getDefaultChannel.url,
      method: this.getDefaultChannel.method,
      headers: this.getDefaultChannel.headers,
      cache: this.getDefaultChannel.cache
        ? this.getDefaultChannel.cache
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
    fetchData({
      url: `${this.hostname}/api/channel/v1/read/${this.defaultChannelID}`,
      method: this.getChannelAPI.method,
      headers: this.getChannelAPI.headers,
      cache: this.getDefaultChannel.cache
        ? this.getDefaultChannel.cache
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
