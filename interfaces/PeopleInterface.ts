export interface IPeople {
  id: string;
  name: string;
  detail: boolean;
  info: IInfo[] | null;
  textList: string[] | null;
  indicators: IIndicator[] | null;
  order: ICoordinates;
  relation: IRelation | null;
}

export interface IInfo {
  id: string;
  title: string;
  text: string;
}

export interface IIndicator {
  id: ID;
  title: string;
  text: string;
  coordinates: ICoordinates[];
  x: number;
  y: number;
}

export enum ID {
  Indicator = "indicator",
  Map = "map",
  Text = "text"
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

export interface IPosition {
  xPosition: number;
  yPosition: number;
}