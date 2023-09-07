export interface StyleProps {
  apiContextDiv?: {
    Container?: {};
    Sidebar?: {};
    FiltersDiv?: {};
    Filter?: {};
    Button?: {};
    ListDiv?: {};
  };
  SelectStyle?: {
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
  SearchAPI: {
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
  SearchAPI: {
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
  TermsAPI: {
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
