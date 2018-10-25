export namespace Translations {
  export type MessageInputType =
    | string
    | string[]
    | string[][]
    | TranslateParam[]
    | TranslateParam[][]
    | (TranslateParam | string)[];

  export interface TranslateParam {
    value: string;
    params?: any;
  }
}
