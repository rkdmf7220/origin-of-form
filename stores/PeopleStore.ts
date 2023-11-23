import {defineStore} from "pinia";
import {IPeople, IPosition} from "~/interfaces/PeopleInterface";

export const usePeopleStore = defineStore("people", {
  state: () => {
    return {
      peopleList: [] as IPeople[],
      marqueeTextList: [] as string[],
      swiperPosition: {} as IPosition,
      // isLoaded: false,
      isLoaded: false,
      selectedPeopleId: "" as string
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
      this.isLoaded = true;
    },
    async setMarqueeTextList() {
      await nextTick();
      const fetchData = await useFetch("/data/intro-name.json");
      this.marqueeTextList = fetchData.data.value as string[];
    },
    setSelectedPeopleId(id: string) {
      return (this.selectedPeopleId = id);
    }
  }
});