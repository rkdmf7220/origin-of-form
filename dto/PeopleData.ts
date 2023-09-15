import {IPeople} from "~/interfaces/PeopleInterface";

export const defaultPeopleData: IPeople = {
  id: "",
  name: "",
  detail: false,
  info: null,
  textList: null,
  indicators: null,
  order: {
    x: -99,
    y: -99
  },
  relation: null
};