import {defineStore} from "pinia";

export const useClippingMaskStore = defineStore("clippingMask", {
  state: () => {
    return {
      clickable: false,
      maskSize: 0,
      intervalId: undefined as number | undefined
    };
  },
  getters: {
    getClickable: (state) => {
      return toRaw(state.clickable);
    }
  },
  actions: {
    setClickable(bool: boolean) {
      this.clickable = bool;
      this.setMaskSize(bool ? "clickable" : "clickable-leave");
    },
    setMaskSize(value: "enter" | "leave" | "clickable" | "clickable-leave" | "is-loaded"): void {
      if (this.intervalId) {
        window.clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
      this.intervalId = window.setInterval(() => {
        switch (value) {
          case "enter":
            if (this.maskSize < 400) {
              // marquee mouseenter
              this.maskSize += 4;
            }
            break;

          case "leave":
            if (this.maskSize > 40) {
              // marquee mouseleave
              this.maskSize -= 4;
            }
            break;

          case "clickable":
            // clickable mouseenter
            if (this.maskSize < 60) {
              this.maskSize += 1;
            } else if (this.maskSize > 60) {
              this.maskSize -= 1;
            }
            break;

          case "clickable-leave":
            // clickable mouseleave
            if (this.maskSize > 40) {
              this.maskSize -= 1;
            }
            break;

          case "is-loaded":
            if (this.maskSize < 40) {
              this.maskSize += 1;
            }
            break;

          default:
            window.clearInterval(this.intervalId);
            this.intervalId = undefined;
            break;
        }
      }, 1);
    }
  }
});