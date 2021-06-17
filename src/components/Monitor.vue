<template>
  <div class="monitor">
    <iframe
      ref="preview"
      :src="previewUrl"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
  </div>
  <Dialog :visible="dialogVisible">
    <div ref="result"></div>
    <template #footer>
      <div class="dialog-button cancel" @click="cancelEduce">取消</div>
      <div class="dialog-button confirm" @click="confirmEduce">导出</div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, PropType, computed } from "vue";
import Dialog from "./common/Dialog.vue";
import { encodeData } from "../utils";

export interface Html {
  value: string;
  js: string;
}

const renderImage = (resultEl: HTMLElement, src: string) => {
  const oldEl = resultEl.childNodes[0];
  const newEl = new Image();
  newEl.src = src;
  if (oldEl) {
    resultEl.replaceChild(newEl, oldEl);
  } else {
    resultEl.appendChild(newEl);
  }
};

export default defineComponent({
  name: "Monitor",
  props: {
    html: { type: Object as PropType<Html>, default: { value: "", js: "" } },
  },
  components: { Dialog },
  setup(props) {
    const preview = ref<HTMLElement>();
    const result = ref<HTMLElement>();
    let imageBase64 = ref("");
    const previewUrl = computed(() => {
      return `./preview.html?data=${encodeData(props.html.value)}`;
    });
    const updateImageBase64 = (str: string) => {
      imageBase64.value = str;
    };

    const educe = () => {
      renderImage(result.value!, imageBase64.value);
      nextTick(async () => {
        if (preview.value && result.value) {
          showDialog();
        }
      });
    };
    const cancelEduce = () => {
      dialogVisible.value = false;
    };
    const confirmEduce = () => {
      if (imageBase64.value) {
        const a = document.createElement("a");
        a.setAttribute("href", imageBase64.value);
        a.setAttribute("download", "image.png");
        a.click();
      }
    };

    const dialogVisible = ref(false);
    const showDialog = () => {
      dialogVisible.value = true;
    };

    return {
      preview,
      result,
      updateImageBase64,
      imageBase64,
      previewUrl,
      educe,
      cancelEduce,
      confirmEduce,
      dialogVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../variable.scss";
.monitor {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  #wrapper {
    max-width: 100%;
    max-height: 100%;
  }
}
.dialog-button {
  &.confirm {
    @include dialog-button(true);
  }
  &.cancel {
    @include dialog-button(false);
  }
}
</style>
