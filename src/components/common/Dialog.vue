<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div v-show="selfVisible" class="dialog">
        <div class="modal" @click="onModelClick"></div>
        <div class="content">
          <div class="content-body"><slot /></div>
          <div class="content-footer"><slot name="footer" /></div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  props: {
    visible: { type: Boolean, default: false },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const onModelClick = () => {
      if (props.closeOnClickModal) ctx.emit("update:visible", false);
    };
    const selfVisible = ref(false);
    watchEffect(() => {
      selfVisible.value = props.visible;
    });
    return { onModelClick, selfVisible };
  },
});
</script>

<style lang="scss" scoped>
.dialog {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  .modal {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.4);
  }
  .content {
    z-index: 1;
    min-width: 100px;
    min-height: 100px;
    max-width: 70%;
    max-height: 70%;
    overflow: scroll;
    background-color: white;
    color: black;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    &-body {
      flex: 1;
      width: 100%;
      overflow: scroll;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-footer {
      height: 40px;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
