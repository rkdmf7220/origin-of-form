import {defineStore} from "pinia";
import {IPeople} from "~/interfaces/PeopleInterface";

export const usePeopleStore = defineStore('people', {
  state: () => {
    return {
      peopleList: [] as IPeople[]
    }
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
      await nextTick()
      const fetchData = await useFetch("/data/people.json");
      this.peopleList = fetchData.data.value as IPeople[]
    }
  }
})