export interface styleProps {
  wrapperStyle?: {
    container?: {};
    sidebar?: {};
    filtersDiv?: {};
    filter?: {};
    button?: {};
    listDiv?: {};
  };

  filterStyle?: {
    container?: {};
    optionNameStyle?: {};
    optionStyle?: {};
    optionDivStyle?: {};
    select?: {};
    optionsItem?: {};
  };

  cardStyle?: {
    container?: {};
    headingDiv?: {};
    heading?: {};
    type?: {};
    imageDiv?: {};
    image?: {};
    tagsDiv?: {};
    lowerDiv?: {};
    lowerItem?: {};
    lowerDt?: {};
    lowerDd?: {};
    tag?: {};
  };
}

export interface configs {
  filterConfig: Array<filterConfigProps>;
  addtionalFilterConfig?: Array<filterConfigProps>;
}

export interface inputAPIProps {
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
}

export interface allInputApiProps {
  formApi: inputAPIProps;
  searchApi: inputAPIProps;
  termsApi: inputAPIProps;
  getDefaultChannelApi: inputAPIProps;
  getChannelApi: inputAPIProps;
}

export interface cardStyle {
  container?: {};
  headingDiv?: {};
  heading?: {};
  type?: {};
  imageDiv?: {};
  image?: {};
  tagsDiv?: {};
  lowerDiv?: {};
  lowerItem?: {};
  lowerDt?: {};
  lowerDd?: {};
  tag?: {};
}

export interface filterStyle {
  container?: {};
  optionNameStyle?: {};
  optionStyle?: {};
  optionDivStyle?: {};
  select?: {};
  optionsItem?: {};
}

export interface filterConfigProps {
  name: string;
  field: string;
  isEnabled?: boolean;
}

export type cardFieldsObject = {
  name?: {
    field: string;
    isEnabled?: boolean;
  };
  type?: {
    field: string;
    isEnabled?: boolean;
  };
  subject?: {
    field: string;
    isEnabled?: boolean;
  };
  image?: {
    field: string;
    isEnabled?: boolean;
  };
  publisher?: {
    field: string;
    isEnabled?: boolean;
  };
  tags?: {
    tagsFieldArray: Array<string>;
    isEnabled?: boolean;
  };
};

export interface iCardClick {
  event: MouseEvent;
  data: any;
}

export interface wrapperProps {
  hostname: string;
  defaultChannel: {
    url: string;
    method: string;
    cache:
      | 'default'
      | 'no-store'
      | 'reload'
      | 'force-cache'
      | 'only-if-cached'
      | 'no-cache';
    header: object;
  };
  getChannel: {
    method: string;
    cache:
      | 'default'
      | 'no-store'
      | 'reload'
      | 'force-cache'
      | 'only-if-cached'
      | 'no-cache';
    header: object;
  };
  searchApi: {
    url: string;
    headers: object;
    method: string;
    body: string;
  };
  termsRead: {
    url: string;
    headers: object;
    method: string;
    body: string;
  };
  formUrl: string;
  cardFieldsProps: cardFieldsObject;
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
  styles?: styleProps;
  filterConfig: Array<filterConfigProps>;
  addtionalFilterConfig?: Array<filterConfigProps> | undefined;
}

export interface apiContextProps {
  formUrl: string;
  searchApi: {
    url: string;
    method: string;
    headers?: object;
    body: string;
  };
  cardFieldsProps: cardFieldsObject;
  hostname: string;
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
  styles?: styleProps;
  filterConfig: Array<filterConfigProps>;
  addtionalFilterConfig?: Array<filterConfigProps> | undefined;
  termsApi: {
    method: string;
    headers?: object;
    body?: string;
  };
  frameworks: Array<string>;
}

export interface singleSelectProps {
  styles?: {
    container?: {};
    optionNameStyle?: {};
    optionStyle?: {};
    optionDivStyle?: {};
    select?: {};
    optionsItem?: {};
  };
  options: Array<string>;
  optionName: string;
  framework: string;
  setFramework: Function;
  reset?: boolean;
  filtersArray: Array<filtersArraySelectedOptionObject>;
  setFiltersArray: (...args: any[]) => any;
}

export interface filtersArraySelectedOptionObject {
  name: string;
  value: string[];
}

export interface selectProps {
  styles?: {
    container?: {};
    optionNameStyle?: {};
    optionStyle?: {};
    optionDivStyle?: {};
    select?: {};
    optionsItem?: {};
  };
  filtersArray: Array<filtersArraySelectedOptionObject>;
  setFiltersArray: (...args: any[]) => any;
  options: Array<string>;
  optionName: string;
  filters?: Array<string>;
  reset?: boolean;
}

export interface filterProps {
  stylesFilterDiv?: {};
}

export interface cardProps {
  name: string;
  image?: string;
  subject: string;
  type: string;
  publisher: string;
  tags?: Array<string>;
  styles?: {
    container?: {};
    headingDiv?: {};
    heading?: {};
    type?: {};
    imageDiv?: {};
    image?: {};
    tagsDiv?: {};
    lowerDiv?: {};
    lowerItem?: {};
    lowerDt?: {};
    lowerDd?: {};
    tag?: {};
  };
}
