import {defineStore} from "pinia";
import {IWorks} from "~/interfaces/WorksInterface";

export const useWorksStore = defineStore("works", {
  state: () => {
    return {
      worksList: [] as IWorks[],
      listIndex: 0 as number,
      sliderState: false as boolean
    };
  },
  getters: {},
  actions: {
    async setWorksList() {
      await nextTick();
      const fetchData = await useFetch("/data/works.json");
      this.worksList = fetchData.data.value as IWorks[];
    },
    setListIndex(index: number) {
      this.listIndex = index;
    },
    showSlider() {
      this.sliderState = true;
    },
    hideSlider() {
      this.sliderState = false;
    },
    increaseListIndex() {
      this.listIndex++;
    },
    decreaseListIndex() {
      this.listIndex--;
    }
  }
});