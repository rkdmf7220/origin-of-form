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
      document.body.classList.add("show-slider");
    },
    hideSlider() {
      this.sliderState = false;
      document.body.classList.remove("show-slider");
    },
    increaseListIndex() {
      this.listIndex++;
    },
    decreaseListIndex() {
      this.listIndex--;
    }
  }
});