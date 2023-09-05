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
      selectedPeopleId: null as string | null
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
      const fetchData = await useFetch("/data/introName.json");
      this.marqueeTextList = fetchData.data.value as string[];
    },
    // async setSwiperPosition(xPosition: number, yPosition: number) {
    //   await nextTick();
    //   this.swiperPosition = {xPosition, yPosition};
    //   return this.swiperPosition;
    // },
    setSelectedPeopleId(id: string | null) {
      return (this.selectedPeopleId = id);
    }
  }
});