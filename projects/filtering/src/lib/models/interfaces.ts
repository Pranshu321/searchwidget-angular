export interface StyleProps {
  WrapperStyle?: {
    Container?: {};
    Sidebar?: {};
    FiltersDiv?: {};
    Filter?: {};
    Button?: {};
    ListDiv?: {};
  };

  FilterStyle?: {
    container?: {};
    OptionNameStyle?: {};
    OptionStyle?: {};
    OptionDivStyle?: {};
    select?: {};
    OptionsItem?: {};
  };

  CardStyle?: {
    container?: {};
    headingDiv?: {};
    heading?: {};
    type?: {};
    imageDiv?: {};
    image?: {};
    tagsDiv?: {};
    LowerDiv?: {};
    LowerItem?: {};
    LowerDT?: {};
    LowerDD?: {};
    tag?: {};
  };
}

export interface Configs {
  filterConfig: Array<FilterConfigProps>;
  addtionalFilterConfig?: Array<FilterConfigProps>;
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
  formAPI: inputAPIProps;
  searchAPI: inputAPIProps;
  termsAPI: inputAPIProps;
  getDefaultChannelAPI: inputAPIProps;
  getChannelAPI: inputAPIProps;
}

export interface CardStyle {
  container?: {};
  headingDiv?: {};
  heading?: {};
  type?: {};
  imageDiv?: {};
  image?: {};
  tagsDiv?: {};
  LowerDiv?: {};
  LowerItem?: {};
  LowerDT?: {};
  LowerDD?: {};
  tag?: {};
}

export interface FilterStyle {
  container?: {};
  OptionNameStyle?: {};
  OptionStyle?: {};
  OptionDivStyle?: {};
  select?: {};
  OptionsItem?: {};
}

export interface FilterConfigProps {
  name: string;
  field: string;
  isEnabled?: boolean;
}

export type CardFieldsObject = {
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
    TagsFieldArray: Array<string>;
    isEnabled?: boolean;
  };
};

export interface ICourse {
  ownershipType: string[];
  copyright: string;
  board?: string;
  channel: string;
  downloadUrl: string;
  organisation: string[];
  language: string[];
  mimeType: string;
  variants: any;
  leafNodes: string[];
  objectType: string;
  appIcon: string;
  children: string[];
  appId: string;
  contentEncoding: string;
  lockKey: string;
  totalCompressedSize: number;
  mimeTypesCount: string;
  contentType: string;
  contentCredits: string;
  identifier: string;
  lastUpdatedBy: string;
  audience: string[];
  visibility: string;
  toc_url: string;
  contentTypesCount: string;
  consumerId: string;
  childNodes: string[];
  mediaType: string;
  osId: string;
  graph_id: string;
  nodeType: string;
  lastPublishedBy: string;
  version: number;
  license: string;
  prevState: string;
  lastPublishedOn: string;
  size: number;
  IL_FUNC_OBJECT_TYPE: string;
  name: string;
  topic: string[];
  c_diksha_load_open_batch_count: number;
  status: string;
  code: string;
  purpose: string;
  prevStatus: string;
  description: string;
  medium: string;
  idealScreenSize: string;
  createdOn: string;
  reservedDialcodes: string;
  copyrightYear: number;
  contentDisposition: string;
  lastUpdatedOn: string;
  SYS_INTERNAL_LAST_UPDATED_ON: string;
  dialcodeRequired: string;
  creator: string;
  createdFor: string[];
  lastStatusChangedOn: string;
  IL_SYS_NODE_TYPE: string;
  os: string[];
  pkgVersion: number;
  versionKey: string;
  idealScreenDensity: string;
  framework: string;
  depth: number;
  s3Key: string;
  dialcodes: string[];
  lastSubmittedOn: string;
  createdBy: string;
  compatibilityLevel: number;
  leafNodesCount: number;
  IL_UNIQUE_ID: string;
  resourceType: string;
  node_id: number;
}

export interface ICardClick {
  event: MouseEvent;
  data: any;
}

export interface WrapperProps {
  hostname: string;
  DefaultChannel: {
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
  GetChannel: {
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
  searchAPI: {
    url: string;
    headers: object;
    method: string;
    body: string;
  };
  TermsRead: {
    url: string;
    headers: object;
    method: string;
    body: string;
  };
  Formurl: string;
  CardFieldsProps: CardFieldsObject;
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
  styles?: StyleProps;
  filterConfig: Array<FilterConfigProps>;
  addtionalFilterConfig?: Array<FilterConfigProps> | undefined;
}

export interface ApiContextProps {
  Formurl: string;
  searchAPI: {
    url: string;
    method: string;
    headers?: object;
    body: string;
  };
  CardFieldsProps: CardFieldsObject;
  hostname: string;
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
  styles?: StyleProps;
  filterConfig: Array<FilterConfigProps>;
  addtionalFilterConfig?: Array<FilterConfigProps> | undefined;
  termsAPI: {
    method: string;
    headers?: object;
    body?: string;
  };
  Frameworks: Array<string>;
}

export interface SingleSelectProps {
  styles?: {
    container?: {};
    OptionNameStyle?: {};
    OptionStyle?: {};
    OptionDivStyle?: {};
    select?: {};
    OptionsItem?: {};
  };
  options: Array<string>;
  optionName: string;
  Framework: string;
  setFramework: Function;
  Reset?: boolean;
  FiltersArray: Array<FiltersArraySelectedOptionObject>;
  setFiltersArray: (...args: any[]) => any;
}

export interface FiltersArraySelectedOptionObject {
  name: string;
  value: string[];
}

export interface SelectProps {
  styles?: {
    container?: {};
    OptionNameStyle?: {};
    OptionStyle?: {};
    OptionDivStyle?: {};
    select?: {};
    OptionsItem?: {};
  };
  FiltersArray: Array<FiltersArraySelectedOptionObject>;
  setFiltersArray: (...args: any[]) => any;
  options: Array<string>;
  optionName: string;
  filters?: Array<string>;
  Reset?: boolean;
  ArrayNumber: Array<number>;
  setArrayNumber: (...args: any[]) => any;
}

export interface FilterProps {
  stylesFilterDiv?: {};
}

export interface CardProps {
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
    LowerDiv?: {};
    LowerItem?: {};
    LowerDT?: {};
    LowerDD?: {};
    tag?: {};
  };
}
