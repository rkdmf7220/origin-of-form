import {defineStore} from "pinia";
import {IPeople, IPosition} from "~/interfaces/PeopleInterface";

export const usePeopleStore = defineStore("people", {
  state: () => {
    return {
      peopleList: [] as IPeople[],
      swiperPosition: {} as IPosition
    };
  },
  getters: {
    getPeopleList: (state) => {
      return toRaw(state.peopleList);
    },
    getPeopleInformation: (state) => {
      return (routeName: string) => state.peopleList.find((item) => item.id === routeName);
    }
  },
  actions: {
    async setPeopleList() {
      await nextTick();
      const fetchData = await useFetch("/data/people.json");
      this.peopleList = fetchData.data.value as IPeople[];
    },
    async setSwiperPosition(xPosition: number, yPosition: number) {
      await nextTick();
      this.swiperPosition = {xPosition, yPosition};
      return this.swiperPosition;
    }
  }
});