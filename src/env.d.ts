declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
  }
}

declare namespace JSX {
  interface IntrinsicAttributes {
    id?: string
    class?: unknown
    style?: unknown
    draggable?: boolean
    onClick?: (evt: MouseEvent, navigateFn: () => void) => void
    onDblclick?: (evt: MouseEvent, navigateFn: () => void) => void
    onMouseover?: (ev?: MouseEvent) => void
    onMouseout?: (ev?: MouseEvent) => void
    onMouseup?: (ev?: MouseEvent) => void
    onMousedown?: (ev?: MouseEvent) => void
    onMouseenter?: (ev?: MouseEvent) => void
    onMouseleave?: (ev?: MouseEvent) => void
    onAnimationstart?: (ev?: AnimationEvent) => void
    onAnimationiteration?: (ev?: AnimationEvent) => void
    onAnimationend?: (ev?: AnimationEvent) => void
    onDrag?: (ev?: DragEvent) => void
    onDragend?: (ev?: DragEvent) => void
    onDragenter?: (ev?: DragEvent) => void
    onDragleave?: (ev?: DragEvent) => void
    onDragover?: (ev?: DragEvent) => void
    onDragstart?: (ev?: DragEvent) => void
    onDrop?: (ev?: DragEvent) => void
    onKeydown?: (ev?: KeyboardEvent) => void
    onKeypress?: (ev?: KeyboardEvent) => void
    onKeyup?: (ev?: KeyboardEvent) => void
  }
}
