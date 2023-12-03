<template>
  <div ref="works" @wheel="(e) => onScrollContent(e)" id="works" class="contents">
    <div class="works-wrap">
      <div
        v-if="!isTouchDevice"
        :style="{transform: `translateX(calc(-${50 * this.store.listIndex}vw - ${100 * this.store.listIndex}px))`}"
        class="works-list"
      >
        <template v-if="worksData">
          <div v-for="(item, index) in worksData" :key="item.id" class="works-item">
            <div class="works-inner">
              <div @click="() => onClickThumbnail(index)" class="works-img-outer is-clickable">
                <template v-if="index < 3">
                  <img
                    :src="'https://wonhyukson.github.io/images/origin-of-form/works/' + item.img"
                    :alt="item.title + ' 작품 사진'"
                    draggable="false"
                  />
                </template>
                <template v-else>
                  <img
                    :src="'https://wonhyukson.github.io/images/origin-of-form/works/' + item.img"
                    :alt="item.title + ' 작품 사진'"
                    draggable="false"
                    loading="lazy"
                  />
                </template>
              </div>
              <div class="works-caption">
                <div class="works-caption-inner">
                  <div class="works-overlay"></div>
                  <div class="works-caption-text-wrap">
                    <h4 class="works-title">{{ item.title }}</h4>
                    <span class="works-caption-text">{{ item.caption }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-else :style="{transform: `translateX(-${100 * this.store.listIndex}vw)`}" class="works-list">
        <template v-if="worksData">
          <div v-for="(item, index) in worksData" :key="item.id" class="works-item">
            <div class="works-inner">
              <div @click="() => onClickThumbnail(index)" class="works-img-outer is-clickable">
                <img
                  :src="'https://wonhyukson.github.io/images/origin-of-form/works/' + item.img"
                  :alt="item.title + ' 작품 사진'"
                  draggable="false"
                />
              </div>
              <div class="works-caption">
                <div class="works-caption-inner">
                  <div class="works-overlay"></div>
                  <div class="works-caption-text-wrap">
                    <h4 class="works-title">{{ item.title }}</h4>
                    <span class="works-caption-text">{{ item.caption }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="works-btn-wrap">
        <template v-if="!isTouchDevice">
          <div
            :class="{'is-clickable': this.store.listIndex !== 0}"
            @click="onClickPrevImage"
            class="works-image-btn prev-btn"
          ></div>
          <div
            :class="{'is-clickable': this.store.listIndex !== worksData?.length - 1}"
            @click="onClickNextImage"
            class="works-image-btn next-btn"
          ></div>
        </template>
        <template v-else>
          <div
            :class="{'is-clickable': this.store.listIndex !== 0}"
            @click="onClickPrevImage"
            class="works-image-btn prev-btn"
          >
            <div :style="{backgroundImage: `url(${svgIcon.get('prevIcon')})`}" class="btn-icon"></div>
          </div>
          <div
            :class="{'is-clickable': this.store.listIndex !== worksData?.length - 1}"
            @click="onClickNextImage"
            class="works-image-btn next-btn"
          >
            <div :style="{backgroundImage: `url(${svgIcon.get('nextIcon')})`}" class="btn-icon"></div>
          </div>
        </template>
      </div>
      <div class="dim-area"></div>
      <div :class="{'is-slide': this.isSlide}" class="spotlight-area"></div>
    </div>
    <div v-if="slideCondition" class="image-slider-wrap">
      <ImageSlider ref="slider-component" @close:slider="closeSlider" :img-list="worksData!" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";
import {IWorks} from "~/interfaces/WorksInterface";
import {useWorksStore} from "~/stores/WorksStore";
import svgIcon from "public/images/svgIcon";

export default defineComponent({
  name: "works",
  computed: {
    svgIcon() {
      return svgIcon;
    }
  },
  mounted() {
    this.getWorksData();
  },
  props: {
    isTouchDevice: Boolean
  },
  data() {
    return {
      worksData: null as null | IWorks[],
      isSlide: false,
      store: useWorksStore(),
      slideCondition: false
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
      this.store.increaseListIndex();
      this.isSlide = true;
      setTimeout(() => {
        this.isSlide = false;
      }, 500);
    },
    onClickPrevImage() {
      this.store.decreaseListIndex();
      this.isSlide = true;
      setTimeout(() => {
        this.isSlide = false;
      }, 500);
    },
    onClickThumbnail(index: number) {
      this.store.setListIndex(index);
      this.slideCondition = true;
      setTimeout(() => this.store.showSlider(), 10);
      setTimeout(() => this.setPreventToFalse(), 50);
    },
    closeSlider() {
      setTimeout(() => (this.slideCondition = false), 300);
    },
    setPreventToFalse() {
      const sliderRef = this.$refs["slider-component"] as any;
      sliderRef.$refs["slide-inner"].isPreventTransition = false;
    }
  }
});
</script>

<style scoped lang="scss">
.contents {
  position: relative;
  background-color: #726a57;

  .works-wrap {
    width: 100%;
    height: 100vh;
    padding-top: 100px;
    box-sizing: border-box;
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
      transition: transform 0.5s ease-in-out;

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
            box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.4);

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

              .works-overlay {
                width: 100%;
                height: 100%;
                position: absolute;
              }

              .works-caption-text-wrap {
                padding: 20px;
                color: #fff;
                opacity: 0.9;

                .works-title {
                  font-size: 1.25rem;
                  font-weight: 400;
                  margin: 0 0 10px;
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
        width: 200px;
        height: 100%;
        position: absolute;
        top: 0;
        transition: opacity 0.5s ease-in-out;
        z-index: 50;
        opacity: 1;
        pointer-events: none;

        &.is-clickable {
          pointer-events: auto;
        }

        &::before {
          width: 400px;
          height: 100%;
          pointer-events: none;
        }

        &.prev-btn {
          left: 0;

          &::before {
            content: "";
            position: absolute;
            left: 0;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
          }

          &.is-clickable:hover {
            opacity: 0.7;
          }
        }

        &.next-btn {
          right: 0;

          &::before {
            content: "";
            position: absolute;
            right: 0;
            background: linear-gradient(270deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
          }

          &.is-clickable:hover {
            opacity: 0.7;
          }
        }
      }
    }

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
        animation: spotlighting 0.5s ease-in-out;
        animation-iteration-count: infinite;
        @keyframes spotlighting {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }
  }
}

.show-slider .image-slider-wrap {
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
}

@media screen and (max-width: 767px) {
  .contents {
    .works-wrap {
      height: auto;
      padding: 100px 0 150px 0;

      .works-list {
        width: 100%;
        height: 100%;
        padding: 0 40px;
        gap: 80px;
        margin-left: 0;
        box-sizing: border-box;
        align-items: center;

        .works-item {
          .works-inner {
            text-align: center;

            .works-img-outer {
              // todo: shadow 조정
              box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.4);
              display: inline-block;
              text-align: center;

              img {
                // todo: 값 체크
                max-width: calc(100vw - 100px);
                max-height: 60vh;
                object-fit: contain;
              }
            }

            .works-caption {
              margin-top: 20px;
              text-align: left;

              .works-caption-inner {
                //max-width: 350px;
                position: relative;

                .works-overlay {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                }

                .works-caption-text-wrap {
                  padding: 10px;
                  color: #fff;
                  opacity: 0.9;
                }
              }
            }
          }
        }
      }

      .works-btn-wrap {
        .works-image-btn {
          width: 50px;

          &::before {
            width: 40px;
            background: none !important;
          }

          &.prev-btn {
            left: 0;
          }

          &.next-btn {
            right: 0;
          }

          .btn-icon {
            position: absolute;
            width: 50px;
            height: 50px;
            top: 50%;
            background-size: contain;
            transform: translateY(-50%);
            opacity: 0;
            transition: opacity 0.3s;
          }

          &.is-clickable {
            &.prev-btn .btn-icon,
            &.next-btn .btn-icon {
              opacity: 1;
            }
          }

          &:not(.is-clickable) {
            &.prev-btn::before {
              background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
            }

            &.next-btn::before {
              background: linear-gradient(270deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
            }
          }
        }
      }

      .spotlight-area {
        // todo: set spotlight
        background: radial-gradient(
          18.37% 46.06% at 50% 45.19%,
          rgba(255, 199, 147, 1) 0%,
          rgba(255, 206, 161, 0) 100%
        );
        filter: blur(90px);
      }
    }
  }

  .image-slider-wrap {
  }
}
</style>