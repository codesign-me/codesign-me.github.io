<template>
  <div class="editor">
    <div ref="CMEditor" class="cm-editor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { debounce, once } from "../utils";
// autocomplete

import CodeMirror from "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/foldgutter.css";
// codemirror core

import "codemirror/theme/darcula.css";
import "codemirror/theme/panda-syntax.css";
// theme css

import "codemirror/mode/vue/vue.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
// syntax highlight js

import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/xml-hint.js";
import "codemirror/addon/hint/html-hint.js";
import "codemirror/addon/hint/css-hint.js";
import "codemirror/addon/hint/javascript-hint.js";
// hint js

import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/closetag.js";

const ignore = [
  "",
  "#",
  "!",
  "-",
  "=",
  "@",
  "$",
  "%",
  "&",
  "+",
  ";",
  "(",
  ")",
  "*",
  "  ",
];
const ignoreToken = (text: string) => {
  if (text && text[0]) {
    for (const pre in ignore) {
      if (ignore[pre] === text[0]) {
        return true;
      }
    }
  } else {
    return true;
  }
  return false;
};

export default defineComponent({
  props: {
    theme: { type: String, default: "panda-syntax" },
    mode: { type: String, default: "htmlmixed" },
    value: { type: String, default: "" },
  },
  emits: ["changed"],
  setup(props, context) {
    const CMEditor = ref(null as HTMLDivElement | null);
    const mode = props.mode;
    let editor: ReturnType<typeof CodeMirror> | null = null;
    const emitChange = once(() => {
      context.emit("changed");
    }, 1000);
    onMounted(() => {
      const el = CMEditor.value as HTMLDivElement;
      editor = CodeMirror(el, {
        theme: props.theme,
        mode,
        value: props.value,
        lineNumbers: true,
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        matchBrackets: true,
        closeBrackets: true,
        closeTag: true,
      });
      editor.setSize(el.clientWidth + "px", el.clientHeight + "px");

      editor.on("change", function (editor, change) {
        emitChange();
        if (change.origin == "+input") {
          const text = change.text;

          //不提示
          if (!ignoreToken(text))
            setTimeout(function () {
              editor.execCommand("autocomplete");
            }, 20);
        }
      });
      const resize = debounce(() => {
        editor?.setSize(el.clientWidth + "px", el.clientHeight + "px");
      }, 1000);
      window.onresize = () => {
        resize();
      };
    });
    const getValue = () => {
      const value = editor?.getValue();
      return value;
    };
    return { editor, getValue, CMEditor };
  },
});
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 100%;
  .cm-editor {
    width: 100%;
    height: 100%;
  }
}
</style>
