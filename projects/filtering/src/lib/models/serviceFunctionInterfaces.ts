interface filterConfigProps {
  name: string;
  field: string;
  isEnabled?: boolean;
}

export interface updateConfigProps {
  apiData: Array<any>;
  filterConfig: Array<filterConfigProps> | undefined;
  addtionalFilterConfig?: Array<filterConfigProps> | undefined;
}
export interface filterDataExtractProps {
  content: Array<object>;
  filterConfig: Array<any>;
  TermsObject: any;
}
export interface serviceFunctionCardProps {
  name?: string;
  image?: string;
  subject?: string;
  type?: string;
  publisher?: string;
  tags?: Array<string>;
}
export interface renderContentProps {
  content: Array<object>;
  filtersSelected: Array<any>;
  filterConfig: Array<any>;
}
export interface apiProps {
  headers?: {};
  body?: string;
  url: string;
  method?: string;
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
}
