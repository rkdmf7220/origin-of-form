<template>
  <div ref="works" @wheel="(e) => onScrollContent(e)" id="works" class="contents">
    <div class="works-wrap">
      <div class="works-list">
        <div class="works-item">
          <div class="works-inner">
            <div class="works-img-outer">
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
            <div class="works-img-outer">
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
      <div class="spotlight"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";

export default defineComponent({
  name: "works",
  methods: {
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["works"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result !== null) {
        this.$emit("change-hash", IHash.Works, result);
      }
    }
  }
});
</script>

<style scoped lang="scss">
#works {
  position: relative;

  .works-wrap {
    width: 100%;
    height: 100vh;
    position: absolute;
    overflow: hidden;

    .works-list {
      width: 500px;
      height: 100%;
      display: flex;
      flex-direction: row;
      margin-left: calc(50% - 250px);
      gap: calc(50vw - 400px);

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

    .spotlight {
      width: 100%;
      height: 100%;
    }
  }
}
</style>