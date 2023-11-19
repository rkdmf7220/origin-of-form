<template>
  <div ref="works" @wheel="(e) => onScrollContent(e)" id="works" class="contents">
    <div class="works-wrap">
      <div
        :style="{transform: `translateX(calc(-${50 * this.slideIndex}vw - ${100 * this.slideIndex}px))`}"
        class="works-list"
      >
        <div class="works-item">
          <div class="works-inner">
            <div class="works-img-outer is-clickable">
              <img src="/images/works/01.jpg" alt="사진 1" />
            </div>
            <div class="works-caption">
              <div class="works-caption-inner">
                <div class="works-overlay"></div>
                <div class="works-caption-text-wrap">
                  <h4 class="works-title">194</h4>
                  <span class="works-caption-text">2020, Lego brick on acrylic, 86.6 x 65 cm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="works-item">
          <div class="works-inner">
            <div class="works-img-outer is-clickable">
              <img src="/images/works/02.jpg" alt="사진 2" />
            </div>
            <div class="works-caption">
              <div class="works-caption-inner">
                <div class="works-overlay"></div>
                <div class="works-caption-text-wrap">
                  <h4 class="works-title">The fall of opera</h4>
                  <span class="works-caption-text">2019, Lego brick, 41 x 24 x94cm </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="works-btn-wrap">
        <div @click="onClickPrevImage" class="works-image-btn prev-btn is-clickable"></div>
        <div @click="onClickNextImage" class="works-image-btn next-btn is-clickable"></div>
      </div>
      <div class="dim-area"></div>
      <div :class="{'is-slide': this.isSlide}" class="spotlight-area"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";
import {IWorks} from "~/interfaces/WorksInterface";

export default defineComponent({
  name: "works",
  mounted() {
    this.getWorksData();
  },
  data() {
    return {
      worksData: null as null | IWorks[]
    };
  },
  methods: {
    async getWorksData() {
      const fetchData = await useFetch("/data/works.json");
      this.worksData = toRaw(fetchData.data.value) as IWorks[];
    },
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["works"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result !== null) {
        this.$emit("change-hash", IHash.Works, result);
      }
    },
    onClickNextImage() {
      this.slideIndex++;
      this.isSlide = true;
      setTimeout(() => {
        this.isSlide = false;
      }, 200);
    },
    onClickPrevImage() {
      this.slideIndex--;
      this.isSlide = true;
      setTimeout(() => {
        this.isSlide = false;
      }, 200);
    }
  }
});
</script>

<style scoped lang="scss">
#works {
  position: relative;
  background-color: #726a57;

  .works-wrap {
    width: 100%;
    height: 100vh;
    position: absolute;
    overflow: hidden;
    background-image: url("/images/grain-texture4.jpg");
    background-size: cover;
    background-repeat: no-repeat;

    .works-list {
      width: 500px;
      height: 100%;
      display: flex;
      flex-direction: row;
      margin-left: calc(50% - 250px);
      gap: calc(50vw - 400px);
      position: relative;
      z-index: 3;
      transition: transform 0.3s ease-in-out;

      .works-item {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        .works-inner {
          .works-img-outer {
            img {
              display: block;
              width: 100%;
              height: auto;
              max-width: 500px;
              max-height: 600px;
            }
          }

          .works-caption {
            width: 100%;
            margin-top: 40px;

            .works-caption-inner {
              max-width: 350px;
              position: relative;
              background-color: #000000;

              .works-overlay {
                width: 100%;
                height: 100%;
                position: absolute;
              }

              .works-caption-text-wrap {
                padding: 20px;
                color: #fff;

                .works-title {
                  font-size: 1.25rem;
                  font-weight: 400;
                  margin: 0 0 20px;
                }

                .works-caption-text {
                  font-size: 0.875rem;
                }
              }
            }
          }
        }
      }
    }

    .works-btn-wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      //z-index: 50;
      left: 0;
      top: 0;
      right: 0;

      .works-image-btn {
        width: 300px;
        height: 100%;
        position: absolute;
        top: 0;
        transition: all 0.3s ease-in-out;
        z-index: 50;

        &.prev-btn {
          left: 0;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);

          &:hover {
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
          }
        }

        &.next-btn {
          right: 0;
          background: linear-gradient(270deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);

          &:hover {
            background: linear-gradient(270deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
          }
        }
      }
    }

    /*.dim-area {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 9;
      top: 0;
      left: 0;
      right: 0;
      pointer-events: none;

      &::before,
      &::after {
        content: "";
        width: 15%;
        height: 100%;
        position: absolute;
      }

      &::before {
        left: 0;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
      }

      &::after {
        right: 0;
        background: linear-gradient(270deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
      }
    }*/

    .spotlight-area {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      background: radial-gradient(
        18.37% 46.06% at 50% 45.19%,
        rgba(255, 199, 147, 0.4) 0%,
        rgba(255, 206, 161, 0) 100%
      );
      filter: blur(90px);
      opacity: 1;
      transition: opacity 0.2s ease-in-out;

      &.is-slide {
        opacity: 0.3;
      }
    }
  }
}
</style>