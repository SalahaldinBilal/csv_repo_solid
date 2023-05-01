/// <reference types="vite/client" />

import type { clickOutside } from "./helpers";

interface ImportMetaEnv {
  readonly VITE_API: string
  readonly VITE_WS: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside?: ReturnType<Parameters<typeof clickOutside>[1]>;
    }
  }
}