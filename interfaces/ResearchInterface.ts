interface IDefault {
  id: string;
  title: string;
  textList: string[];
}

export interface IResearch extends IDefault {
  captionList: string[];
}

export interface IIndicatorMap extends IDefault {
  charts: IChart;
}

export interface IIndicatorIndex extends IDefault {
  coordinates: IGroup;
}

export interface IChart {
  x: number;
  y: number;
  value: number;
  color?: string;
}

export interface IGroup {
  artists: ICoordinates[];
  designers: ICoordinates[];
  both: ICoordinates[];
}

export interface ICoordinates {
  x: number;
  y: number;
}