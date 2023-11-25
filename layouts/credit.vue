<template>
  <div @wheel="onScrollContent" ref="credit" id="credit" class="contents">
    <div class="credit-content-wrap">
      <div class="credit-content-inner">
        <ul class="credit-list">
          <li class="credit-item">
            <h4 class="credit-title">기획 · 아트디렉팅</h4>
            <span class="credit-text">손원혁</span>
          </li>
          <li class="credit-item">
            <h4 class="credit-title">웹디자인 · 웹사이트개발</h4>
            <span class="credit-text">이상민</span>
          </li>
          <li class="credit-item">
            <h4 class="credit-title">사진 촬영</h4>
            <span class="credit-text">안희상, 손원혁 (드로잉 일부)</span>
          </li>
          <li class="credit-item credit-support-item">
            <h4 class="credit-title">후원</h4>
            <div class="support-img-list">
              <img src="/images/support-img-1.png" alt="인천광역시 로고" class="support-img support-img-1" />
              <img src="/images/support-img-2.png" alt="인천문화재단 로고" class="support-img support-img-2" />
            </div>
            <span class="credit-text"
              >본 전시는 인천광역시와 (재)인천문화재단의 후원을 받아 ‘2023 예술창작지원사업  -신진/원로지원사업’으로
              선정된 사업입니다.</span
            >
          </li>
        </ul>
        <span class="copyright">© 2023. Wonhyuk Son All rights reserved.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";
import {defineComponent} from "vue";

export default defineComponent({
  name: "credit",
  methods: {
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["credit"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result === "prev") {
        this.$emit("change-hash", IHash.Credit, result);
      }
    }
  }
});
</script>

<style scoped lang="scss">
#credit {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(69, 69, 69, 0.06) 100%), #2f2f2f;
  box-shadow: 0px -10px 30px 0px rgba(0, 0, 0, 0.3);

  .credit-content-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 200px 0 150px;
    box-sizing: border-box;

    .credit-content-inner {
      width: 1180px;
      height: 100%;
      border-top: 2px solid #fff;
      color: white;
      position: relative;
      padding-top: 80px;

      .credit-list {
        display: flex;
        max-height: 450px;
        flex-direction: column;
        flex-wrap: wrap;

        .credit-item {
          width: 50%;
          margin-bottom: 60px;

          h4.credit-title {
            margin: 0 0 20px 0;
            font-size: 1.5rem;
          }

          .credit-text {
            font-size: 1.5rem;
          }

          &.credit-support-item {
            .support-img {
              vertical-align: top;
              margin-bottom: 40px;
            }

            .support-img-1 {
              width: 183px;
              height: 45px;
            }

            .support-img-2 {
              width: 180px;
              height: 45px;
              margin-left: 50px;
            }

            .credit-text {
              font-size: 1rem;
              line-height: 1.6rem;
              word-break: break-word;
            }
          }
        }
      }

      .copyright {
        position: absolute;
        bottom: 0;
        font-weight: 700;
      }
    }
  }
}
</style>