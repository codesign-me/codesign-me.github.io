// /src/shims-vue.d.ts
declare module "*.vue" {
  // Vue 3
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
declare const __PREVIEW_PATH: string;
declare module "codemirror/lib/codemirror.js" {
  export default function CodeMirror(
    el: HTMLDivElement,
    arg1: {
      theme?: string;
      mode?: string;
      value?: string;
      lineNumbers?: boolean;
      lineWrapping?: boolean;
      foldGutter?: boolean;
      gutters?: string[];
      matchBrackets?: boolean;
      closeTag?: boolean;
      closeBrackets?: boolean;
    }
  ): {
    setValue: (value: string) => void;
    setSize: (width: string, height: string) => void;
    getValue: (v: void) => string;
    on: (
      event: string,
      fn: (editor: ReturnType<typeof CodeMirror>, change: any) => void
    ) => void;
    execCommand: (cmd: string) => void;
  };
}
