export interface IPeople {
  id: string;
  name: string;
  info: IInfo;
  textList: string[];
  indicators: IIndicator[];
  order: ICoordinates;
  relation: IRelation;
}

export interface IInfo {
  year: string;
  country: string;
  activity: string;
  category: string;
}

export interface IIndicator {
  id: ID;
  title: string;
  text?: string;
  coordinates?: ICoordinates[];
  x?: number;
  y?: number;
}

export enum ID {
  Indicator = "indicator",
  Map = "map",
  Text = "text",
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IRelation {
  top: string;
  bottom: string;
  left: string;
  right: string;
}
