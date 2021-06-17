<template>
  <Frame ref="frame" @run="runCode" @educe="educe">
    <template #editor>
      <Editor :value="html.value" ref="editor" @changed="onEditorChanged" />
    </template>
    <template #monitor>
      <Monitor :html="html" ref="monitor" />
    </template>
  </Frame>
</template>

<script lang="ts">
import Frame from "./components/Frame.vue";
import Editor from "./components/Editor.vue";
import Monitor, { Html } from "./components/Monitor.vue";
import { defineComponent, nextTick, onMounted, ref } from "vue";

const value = `<div id="container">
  <div class="circle"><\/div>
<\/div>
<script>
<\/script>
<style>
  .circle{
  	width:20px;
    height:200px;
    border-radius:50%;
    background-color:black;
  }
<\/style>`;

const parseHtml = (html: string): Html => {
  const script = html.match(/<script>[\s\S]*<\/script>/g)?.[0];
  const js = script?.replace("<script>", "").replace(`<\/script>`, "") ?? "";
  return { value: html, js };
};

export default defineComponent({
  name: "App",
  components: {
    Frame,
    Editor,
    Monitor,
  },
  setup() {
    const html = ref(parseHtml(value));
    const editor = ref<typeof Editor>();
    const monitor = ref<typeof Monitor>();
    const frame = ref<typeof Frame>();
    let msgFlag = false;
    onMounted(() => {
      window.addEventListener("message", (msg) => {
        if (msg.data?.type === "image") {
          monitor.value?.updateImageBase64(msg.data.base64);
          msgFlag = true;
        }
      });
    });
    const onEditorChanged = () => {
      frame.value!.setRunButton();
    };
    const runCode = () => {
      msgFlag = false;
      const value = editor.value?.getValue();
      const newHtmlValue = parseHtml(value);

      if (html.value.value === newHtmlValue.value) {
        msgFlag = true;
      }
      html.value = newHtmlValue;

      return new Promise((res, rej) => {
        nextTick(() => {
          let count = 0;
          const id = setInterval(() => {
            if (msgFlag) {
              msgFlag = false;
              clearInterval(id);
              res("");
            } else {
              if (count >= 300) {
                clearInterval(id);
                rej("");
              }
            }
            count += 1;
          }, 1);
        });
      });
    };

    const educe = () => {
      runCode().then(() => {
        monitor.value?.educe();
        msgFlag = false;
      });
    };
    return { html, runCode, editor, monitor, frame, educe, onEditorChanged };
  },
});
</script>
<style lang="scss"></style>
