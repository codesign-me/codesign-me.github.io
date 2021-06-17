<template>
  <div ref="CMEditor" class="cm-editor"></div>
</template>

<script>
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";

import { defineComponent, ref, onMounted } from "vue";

// const loadModes = {
//   default: () => import("codemirror/mode/javascript/javascript.js"),
//   javascript: () => import("codemirror/mode/javascript/javascript.js"),
//   vue: () => import("codemirror/mode/vue/vue.js"),
//   htmlmixed: () => import("codemirror/mode/htmlmixed/htmlmixed.js"),
// };

export default defineComponent({
  name: "CMEditor",
  props: {
    theme: { type: String, default: "panda-syntax" },
    mode: { type: String, default: "htmlmixed" },
    value: { type: Object, default: "" },
  },
  setup(props) {
    const CMEditor = ref(null);
    const mode = props.mode;
    const editor = ref("");
    onMounted(() => {
      const el = CMEditor.value;
      editor.value = CodeMirror(el, {
        theme: props.theme,
        mode,
        value: props.value,
        lineNumbers: true,
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        matchBrackets: true,
      });
      editor.value.setSize(el.clientWidth + "px", el.clientHeight + "px");
    });
    const getValue = () => {
      return editor.value.getValue();
    };
    return { CMEditor, getValue };
  },
});
</script>

<style lang="scss" scoped>
.cm-editor {
  width: 100%;
  height: 100%;
}
</style>
