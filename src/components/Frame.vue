<template>
  <div class="content">
    <div class="panel left" @changed="onchanged">
      <div class="header">
        <div class="title">
          <a class="title-text" href="" target="_blank">
            CodeDesign
            <div class="github"></div>
          </a>
          <span class="version">{{ version }}</span>
        </div>
        <button class="run" :class="edited ? 'edited' : ''" @click="run()">
          run
        </button>
      </div>
      <slot name="editor"></slot>
    </div>
    <div class="panel right">
      <div class="header">
        <button class="export" @click="educe()">export</button>
        <div class="tip" @click="dialogVisible = true">?</div>
      </div>
      <slot name="monitor"></slot>
    </div>
  </div>
  <Dialog v-model:visible="dialogVisible">
    <div class="tip-content">
      <ul>
        <li>
          <h5>这是什么？</h5>
          <span
            >这是一个给前端工程师的图片生成网站，你可以使用熟悉的 HTML 布局和
            CSS3 来快速生成简单的图形图片，你甚至可以使用 Javascript
            来动态生成重复的结构。</span
          >
        </li>
        <li>
          <h5>如何使用？</h5>
          <span
            >在编辑器区域输入合法的 HTML
            代码，运行后即可在预览区域预览，点击导出按钮即可下载图片</span
          >
        </li>
        <li>
          <h5>能 1:1 还原预览样式吗？</h5>
          <span
            >不能，生成图片功能来自<a
              href="http://html2canvas.hertzen.com/"
              target="_blank"
            >
              html2canvas </a
            >，你可以在<a
              href="http://html2canvas.hertzen.com/features"
              target="_blank"
              >这里</a
            >查看所有支持的 CSS 属性</span
          >
        </li>
      </ul>
    </div>
    <template #footer>
      <div class="dialog-button" @click="dialogVisible = false">确认</div>
    </template>
  </Dialog>
</template>

<script>
import { defineComponent, nextTick, ref } from "vue";
import Dialog from "./common/Dialog.vue";
import config from "../../package.json";

export default defineComponent({
  name: "Frame",
  components: { Dialog },
  emits: ["educe", "run"],
  setup(_, context) {
    const version = ref(config.version);
    const dialogVisible = ref(false);
    const edited = ref(false);
    const setEdited = (v) => {
      edited.value = v;
    };
    const run = () => {
      edited.value = false;
      context.emit("run");
    };
    const educe = () => {
      edited.value = false;
      context.emit("educe");
    };
    const setRunButton = () => {
      edited.value = true;
    };
    return {
      dialogVisible,
      version,
      edited,
      run,
      educe,
      setEdited,
      setRunButton,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../variable.scss";
button {
  width: 60px;
  height: 25px;
  outline: none;
  border: none;
  cursor: pointer;
  &.run {
    border-radius: 20px 0 0 20px;
    background-color: $converse-color;
    color: $emphasis-color;
    transition: background-color linear 0.2s;
    &.edited {
      background-color: orange;
    }
  }
  &.export {
    border-radius: 0 20px 20px 0;
    background-color: $emphasis-color;
    color: $converse-color;
  }
}

.content {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  .panel {
    flex: 1;
    height: 100%;
    min-width: 380px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    .header {
      width: 100%;
      height: 40px;
      flex-shrink: 0;
      color: $converse-color;
      font-weight: 900;
      font-size: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .title {
        padding-left: 10px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: baseline;
        &-text {
          display: block;
          text-decoration: none;
          color: $converse-color;
          position: relative;
          $color: $converse-color;
          .github {
            position: absolute;
            top: 0;
            right: -3px;
            width: 6px;
            height: 6px;
            border: none;
            border-top: 1px solid $color;
            border-right: 1px solid $color;
            display: flex;
            justify-content: center;
            align-items: center;
            // &::before {
            //   content: "";
            //   display: block;
            //   width: 1px;
            //   height: 100%;
            //   background-color: $color;
            //   transform: rotate(45deg);
            // }
          }
        }
        span {
          padding-left: 10px;
          font-size: 12px;
          color: $version-color;
        }
      }
    }
    // &.left {
    // }
    &.right {
      background-color: $converse-color;
      .tip {
        background-color: $emphasis-color;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        font-size: 16px;
        text-align: center;
        line-height: 100%;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
.dialog-button {
  @include dialog-button(true);
}
.tip-content {
  ul {
    padding-inline-end: 40px;
    span {
      font-size: 14px;
      a {
        text-decoration: none;
        color: $link-color;
      }
    }
  }
}
</style>
