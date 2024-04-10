
declare interface ApiList {
  [key: string]: string;
}
declare interface ApiMathods {
  [key: string]: ({}?) => Promise;
}

declare const BASEURL:string;
