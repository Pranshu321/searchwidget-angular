import { Component, Input, OnInit } from '@angular/core';
import { fetchData } from './Functions/api';
import { StyleProps } from './Interfaces/interfaces';

export function Required(target: object, propertyKey: string) {
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
  @Input() @Required hostname: string = '';
  @Input() @Required FrameworkFieldName: string = '';
  @Input() AddtionalFilterConfig: Array<{
    name: string;
    field: string;
    isEnabled: boolean;
  }> = [];
  @Input() @Required FilterConfig: Array<{
    name: string;
    field: string;
    isEnabled: boolean;
  }> = [];
  @Input() @Required CardsFieldsObject: {
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
  @Input() @Required FormAPI: {
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
  @Input() @Required SearchAPI: {
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
  
  @Input() Styles:StyleProps = {};

  @Input() @Required TermsAPI: {
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
  @Input() @Required GetDefaultChannel: {
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
  @Input() @Required GetChannelAPI: {
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
    headers: {},
    method: '',
    body: '',
    cache: 'default',
  };
  Frameworks: any;
  private DefaultChannelID: string = '';
  ngOnInit(): void {
    fetchData({
      url: this.GetDefaultChannel.url,
      method: this.GetDefaultChannel.method,
      headers: this.GetDefaultChannel.headers,
      cache: this.GetDefaultChannel.cache
        ? this.GetDefaultChannel.cache
        : 'default',
    })
      .then((res) => {
        this.DefaultChannelID = res.result.response.value;
        this.GetChannelFrameworks();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  GetChannelFrameworks() {
    fetchData({
      url: `${this.hostname}/api/channel/v1/read/${this.DefaultChannelID}`,
      method: this.GetChannelAPI.method,
      headers: this.GetChannelAPI.headers,
      cache: this.GetDefaultChannel.cache
        ? this.GetDefaultChannel.cache
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
