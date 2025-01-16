import {
  takeUntilDestroyed
} from "./chunk-I6RFACYD.js";
import {
  FocusMonitor
} from "./chunk-JFTPTE55.js";
import "./chunk-F7EOE3FW.js";
import {
  coerceElement,
  coerceStringArray
} from "./chunk-EX4W6FOG.js";
import {
  DOCUMENT,
  isPlatformBrowser
} from "./chunk-3LWAY6MT.js";
import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  ɵɵHostDirectivesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵlistener
} from "./chunk-YCMYJ33Q.js";
import "./chunk-7GQHZGQU.js";
import "./chunk-B744N6TL.js";
import "./chunk-VMTHMMW2.js";
import "./chunk-W52FN47Y.js";
import "./chunk-PEHFQLBM.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-utils.mjs
function injectDisposables() {
  const destroyRef = inject(DestroyRef);
  return {
    /**
     * Set a timeout that will be cleared when the component is destroyed.
     * @param callback The callback to execute
     * @param delay The delay before the callback is executed
     * @returns A function to clear the timeout
     */
    setTimeout: (callback, delay) => {
      const id = setTimeout(callback, delay);
      const cleanup = () => clearTimeout(id);
      destroyRef.onDestroy(cleanup);
      return cleanup;
    },
    /**
     * Set an interval that will be cleared when the component is destroyed.
     * @param callback The callback to execute
     * @param delay The delay before the callback is executed
     * @param target
     * @param type
     * @param listener
     * @param options
     * @returns A function to clear the interval
     */
    addEventListener: (target, type, listener, options) => {
      target.addEventListener(type, listener, options);
      const cleanup = () => target.removeEventListener(type, listener, options);
      destroyRef.onDestroy(cleanup);
      return cleanup;
    },
    /**
     * Set an interval that will be cleared when the component is destroyed.
     * @param callback The callback to execute
     * @param delay The delay before the callback is executed
     * @returns A function to clear the interval
     */
    setInterval: (callback, delay) => {
      const id = setInterval(callback, delay);
      const cleanup = () => clearInterval(id);
      destroyRef.onDestroy(cleanup);
      return cleanup;
    },
    /**
     * Set a requestAnimationFrame that will be cleared when the component is destroyed.
     * @param callback The callback to execute
     * @returns A function to clear the requestAnimationFrame
     */
    requestAnimationFrame: (callback) => {
      const id = requestAnimationFrame(callback);
      const cleanup = () => cancelAnimationFrame(id);
      destroyRef.onDestroy(cleanup);
      return cleanup;
    }
  };
}
var _FocusManager = class _FocusManager {
  focus(element, origin = "program") {
    element = coerceElement(element);
    switch (origin) {
      case "keyboard":
        element.contentEditable = "true";
        element.focus({
          preventScroll: true
        });
        element.contentEditable = "false";
        break;
      default:
        element.focus();
        break;
    }
  }
};
_FocusManager.ɵfac = function FocusManager_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FocusManager)();
};
_FocusManager.ɵprov = ɵɵdefineInjectable({
  token: _FocusManager,
  factory: _FocusManager.ɵfac,
  providedIn: "root"
});
var FocusManager = _FocusManager;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function onChange(source, fn, options) {
  const previousValue = signal(source());
  effect(() => {
    const value = source();
    if (value !== previousValue()) {
      fn(value, previousValue());
      previousValue.set(value);
    }
  }, {
    allowSignalWrites: true,
    injector: options?.injector
  });
  fn(source(), null);
}
function onBooleanChange(source, onTrue, onFalse, options) {
  onChange(source, (value) => value ? onTrue?.() : onFalse?.(), options);
}

// node_modules/ng-primitives/fesm2022/ng-primitives-internal.mjs
var NgpDisabledToken = new InjectionToken("NgpDisabledToken");
function injectDisabled(disabled = signal(false)) {
  const provider = inject(NgpDisabledToken, {
    optional: true,
    self: true
  });
  return computed(() => provider?.disabled() || disabled());
}
function setupFocusVisible({
  focusChange,
  disabled = signal(false)
}) {
  const elementRef = inject(ElementRef);
  const focusMonitor = inject(FocusMonitor);
  const isFocused = signal(false);
  focusMonitor.monitor(elementRef.nativeElement).pipe(takeUntilDestroyed()).subscribe((origin) => (
    // null indicates the element was blurred
    origin === null ? onBlur() : onFocus(origin)
  ));
  onBooleanChange(disabled, () => focus(false));
  effect(() => isFocused() ? elementRef.nativeElement.setAttribute("data-focus-visible", "") : elementRef.nativeElement.removeAttribute("data-focus-visible"));
  function onFocus(origin) {
    if (disabled() || isFocused()) {
      return;
    }
    if (alwaysShowFocus()) {
      focus(true);
      return;
    }
    if (origin === "keyboard" || origin === "program") {
      focus(true);
      return;
    }
  }
  function onBlur() {
    if (disabled() || !isFocused()) {
      return;
    }
    focus(false);
  }
  function focus(value) {
    if (isFocused() === value) {
      return;
    }
    isFocused.set(value);
    focusChange?.(value);
  }
  function alwaysShowFocus() {
    const nonTextInputTypes = ["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"];
    if (elementRef.nativeElement instanceof HTMLInputElement && !nonTextInputTypes.includes(elementRef.nativeElement.type)) {
      return true;
    }
    if (elementRef.nativeElement instanceof HTMLTextAreaElement) {
      return true;
    }
    if (elementRef.nativeElement.isContentEditable || elementRef.nativeElement.hasAttribute("contenteditable")) {
      return true;
    }
    return false;
  }
  return {
    isFocused
  };
}
var _GlobalPointerEvents = class _GlobalPointerEvents {
  constructor() {
    this.ignoreEmulatedMouseEvents = false;
    this.document = inject(DOCUMENT);
    this.platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(this.platformId)) {
      this.setupGlobalTouchEvents();
    }
  }
  setupGlobalTouchEvents() {
    this.document.addEventListener("pointerup", this.handleGlobalPointerEvent.bind(this));
    this.document.addEventListener("touchend", this.setGlobalIgnoreEmulatedMouseEvents.bind(this));
  }
  setGlobalIgnoreEmulatedMouseEvents() {
    this.ignoreEmulatedMouseEvents = true;
    setTimeout(() => this.ignoreEmulatedMouseEvents = false, 50);
  }
  handleGlobalPointerEvent(event) {
    if (event.pointerType === "touch") {
      this.setGlobalIgnoreEmulatedMouseEvents();
    }
  }
};
_GlobalPointerEvents.ɵfac = function GlobalPointerEvents_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GlobalPointerEvents)();
};
_GlobalPointerEvents.ɵprov = ɵɵdefineInjectable({
  token: _GlobalPointerEvents,
  factory: _GlobalPointerEvents.ɵfac,
  providedIn: "root"
});
var GlobalPointerEvents = _GlobalPointerEvents;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GlobalPointerEvents, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function setupHover({
  hoverStart,
  hoverEnd,
  disabled = signal(false)
}) {
  const elementRef = inject(ElementRef);
  const globalPointerEvents = inject(GlobalPointerEvents);
  const disposables = injectDisposables();
  const hovered = signal(false);
  let ignoreEmulatedMouseEvents = false;
  disposables.addEventListener(elementRef.nativeElement, "pointerenter", onPointerEnter);
  disposables.addEventListener(elementRef.nativeElement, "pointerleave", onPointerLeave);
  disposables.addEventListener(elementRef.nativeElement, "touchstart", onTouchStart);
  disposables.addEventListener(elementRef.nativeElement, "mouseenter", onMouseEnter);
  disposables.addEventListener(elementRef.nativeElement, "mouseleave", onMouseLeave);
  if (disabled) {
    onBooleanChange(disabled, reset);
  }
  effect(() => hovered() ? elementRef.nativeElement.setAttribute("data-hover", "") : elementRef.nativeElement.removeAttribute("data-hover"));
  function reset() {
    onHoverEnd("mouse");
  }
  function onHoverStart(event, pointerType) {
    if (disabled() || pointerType === "touch" || hovered() || !event.currentTarget?.contains(event.target)) {
      return;
    }
    hovered.set(true);
    hoverStart?.();
  }
  function onHoverEnd(pointerType) {
    if (pointerType === "touch" || !hovered()) {
      return;
    }
    hovered.set(false);
    hoverEnd?.();
  }
  function onPointerEnter(event) {
    if (globalPointerEvents.ignoreEmulatedMouseEvents && event.pointerType === "mouse") {
      return;
    }
    onHoverStart(event, event.pointerType);
  }
  function onPointerLeave(event) {
    if (!disabled() && event.currentTarget?.contains(event.target)) {
      onHoverEnd(event.pointerType);
    }
  }
  function onTouchStart() {
    ignoreEmulatedMouseEvents = true;
  }
  function onMouseEnter(event) {
    if (!ignoreEmulatedMouseEvents && !globalPointerEvents.ignoreEmulatedMouseEvents) {
      onHoverStart(event, "mouse");
    }
    ignoreEmulatedMouseEvents = false;
  }
  function onMouseLeave(event) {
    if (!disabled() && event.currentTarget?.contains(event.target)) {
      onHoverEnd("mouse");
    }
  }
  return {
    hovered
  };
}
function setupPress({
  pressStart,
  pressEnd,
  disabled = signal(false)
}) {
  const elementRef = inject(ElementRef);
  const disposables = injectDisposables();
  const pressed = signal(false);
  disposables.addEventListener(elementRef.nativeElement, "pointerdown", onPointerDown);
  effect(() => pressed() && !disabled() ? elementRef.nativeElement.setAttribute("data-press", "") : elementRef.nativeElement.removeAttribute("data-press"));
  function reset() {
    if (!pressed()) {
      return;
    }
    disposableListeners.forEach((dispose) => dispose());
    pressed.set(false);
    pressEnd?.();
  }
  let disposableListeners = [];
  function onPointerDown() {
    if (disabled()) {
      return;
    }
    disposableListeners.forEach((dispose) => dispose());
    pressed.set(true);
    pressStart?.();
    const ownerDocument = elementRef.nativeElement.ownerDocument ?? document;
    const pointerUp = disposables.addEventListener(ownerDocument, "pointerup", () => reset(), false);
    const pointerMove = disposables.addEventListener(ownerDocument, "pointermove", () => onPointerMove, false);
    const pointerCancel = disposables.addEventListener(ownerDocument, "pointercancel", () => reset(), false);
    disposableListeners = [pointerUp, pointerMove, pointerCancel];
  }
  function onPointerMove(event) {
    if (elementRef.nativeElement !== event.target && !elementRef.nativeElement.contains(event.target)) {
      reset();
    }
  }
  return {
    pressed
  };
}
function setupFocus({
  focus,
  blur,
  disabled = signal(false)
}) {
  const elementRef = inject(ElementRef);
  const disposables = injectDisposables();
  const isFocused = signal(false);
  disposables.addEventListener(elementRef.nativeElement, "focus", onFocus);
  disposables.addEventListener(elementRef.nativeElement, "blur", onBlur);
  effect(() => isFocused() ? elementRef.nativeElement.setAttribute("data-focus", "") : elementRef.nativeElement.removeAttribute("data-focus"));
  function onFocus(event) {
    if (disabled()) {
      return;
    }
    const ownerDocument = event.target?.ownerDocument ?? document;
    if (ownerDocument.activeElement === event.target && event.currentTarget === event.target) {
      focus?.();
      isFocused.set(true);
    }
  }
  function onBlur(event) {
    if (disabled()) {
      return;
    }
    if (event.currentTarget === event.target) {
      blur?.();
      isFocused.set(false);
    }
  }
  return {
    isFocused
  };
}
var NgpOrientationToken = new InjectionToken("NgpOrientationToken");
var _StyleInjector = class _StyleInjector {
  constructor() {
    this.document = inject(DOCUMENT);
    this.platformId = inject(PLATFORM_ID);
    this.styleElements = /* @__PURE__ */ new Map();
    if (isPlatformBrowser(this.platformId)) {
      this.collectServerStyles();
    }
  }
  /**
   * Inject a style into the document.
   * @param id The unique identifier for the style.
   * @param style The style to inject.
   */
  add(id, style) {
    if (this.styleElements.has(id)) {
      return;
    }
    const styleElement = this.document.createElement("style");
    styleElement.setAttribute("data-ngp-style", id);
    styleElement.textContent = style;
    this.document.head.appendChild(styleElement);
    this.styleElements.set(id, styleElement);
  }
  /**
   * Remove a style from the document.
   * @param id The unique identifier for the style.
   */
  remove(id) {
    const styleElement = this.styleElements.get(id);
    if (styleElement) {
      this.document.head.removeChild(styleElement);
      this.styleElements.delete(id);
    }
  }
  /**
   * Collect any styles that were rendered by the server.
   */
  collectServerStyles() {
    const styleElements = this.document.querySelectorAll("style[data-ngp-style]");
    styleElements.forEach((styleElement) => {
      const id = styleElement.getAttribute("data-ngp-style");
      if (id) {
        this.styleElements.set(id, styleElement);
      }
    });
  }
};
_StyleInjector.ɵfac = function StyleInjector_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StyleInjector)();
};
_StyleInjector.ɵprov = ɵɵdefineInjectable({
  token: _StyleInjector,
  factory: _StyleInjector.ɵfac,
  providedIn: "root"
});
var StyleInjector = _StyleInjector;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StyleInjector, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/ng-primitives/fesm2022/ng-primitives-interactions.mjs
var NgpHoverToken = new InjectionToken("NgpHoverToken");
var _NgpHover = class _NgpHover {
  /**
   * Setup the hover state.
   */
  constructor() {
    this.disabled = input(false, {
      alias: "ngpHoverDisabled",
      transform: booleanAttribute
    });
    this.isDisabled = injectDisabled(this.disabled);
    this.hoverStart = output({
      alias: "ngpHoverStart"
    });
    this.hoverEnd = output({
      alias: "ngpHoverEnd"
    });
    this.hoverChange = output({
      alias: "ngpHover"
    });
    setupHover({
      hoverStart: () => {
        this.hoverStart.emit();
        this.hoverChange.emit(true);
      },
      hoverEnd: () => {
        this.hoverEnd.emit();
        this.hoverChange.emit(false);
      },
      disabled: this.isDisabled
    });
  }
};
_NgpHover.ɵfac = function NgpHover_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpHover)();
};
_NgpHover.ɵdir = ɵɵdefineDirective({
  type: _NgpHover,
  selectors: [["", "ngpHover", ""]],
  inputs: {
    disabled: [1, "ngpHoverDisabled", "disabled"]
  },
  outputs: {
    hoverStart: "ngpHoverStart",
    hoverEnd: "ngpHoverEnd",
    hoverChange: "ngpHover"
  },
  exportAs: ["ngpHover"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NgpHoverToken,
    useExisting: _NgpHover
  }])]
});
var NgpHover = _NgpHover;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpHover, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[ngpHover]",
      exportAs: "ngpHover",
      providers: [{
        provide: NgpHoverToken,
        useExisting: NgpHover
      }]
    }]
  }], () => [], null);
})();
var NgpFocusToken = new InjectionToken("NgpFocusToken");
var _NgpFocus = class _NgpFocus {
  constructor() {
    this.disabled = input(false, {
      alias: "ngpFocusDisabled",
      transform: booleanAttribute
    });
    this.isDisabled = injectDisabled(this.disabled);
    this.focus = output({
      alias: "ngpFocus"
    });
    setupFocus({
      disabled: this.isDisabled,
      focus: () => this.focus.emit(true),
      blur: () => this.focus.emit(false)
    });
  }
};
_NgpFocus.ɵfac = function NgpFocus_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpFocus)();
};
_NgpFocus.ɵdir = ɵɵdefineDirective({
  type: _NgpFocus,
  selectors: [["", "ngpFocus", ""]],
  inputs: {
    disabled: [1, "ngpFocusDisabled", "disabled"]
  },
  outputs: {
    focus: "ngpFocus"
  },
  exportAs: ["ngpFocus"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NgpFocusToken,
    useExisting: _NgpFocus
  }])]
});
var NgpFocus = _NgpFocus;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpFocus, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[ngpFocus]",
      exportAs: "ngpFocus",
      providers: [{
        provide: NgpFocusToken,
        useExisting: NgpFocus
      }]
    }]
  }], () => [], null);
})();
var NgpFocusVisibleToken = new InjectionToken("NgpFocusVisibleToken");
var _NgpFocusVisible = class _NgpFocusVisible {
  constructor() {
    this.disabled = input(false, {
      alias: "ngpFocusVisibleDisabled",
      transform: booleanAttribute
    });
    this.isDisabled = injectDisabled(this.disabled);
    this.focusChange = output({
      alias: "ngpFocusVisible"
    });
    setupFocusVisible({
      disabled: this.isDisabled,
      focusChange: (value) => this.focusChange.emit(value)
    });
  }
};
_NgpFocusVisible.ɵfac = function NgpFocusVisible_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpFocusVisible)();
};
_NgpFocusVisible.ɵdir = ɵɵdefineDirective({
  type: _NgpFocusVisible,
  selectors: [["", "ngpFocusVisible", ""]],
  inputs: {
    disabled: [1, "ngpFocusVisibleDisabled", "disabled"]
  },
  outputs: {
    focusChange: "ngpFocusVisible"
  },
  exportAs: ["ngpFocusVisible"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NgpFocusVisibleToken,
    useExisting: _NgpFocusVisible
  }])]
});
var NgpFocusVisible = _NgpFocusVisible;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpFocusVisible, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[ngpFocusVisible]",
      exportAs: "ngpFocusVisible",
      providers: [{
        provide: NgpFocusVisibleToken,
        useExisting: NgpFocusVisible
      }]
    }]
  }], () => [], null);
})();
var NgpPressToken = new InjectionToken("NgpPressToken");
var _NgpPress = class _NgpPress {
  constructor() {
    this.disabled = input(false, {
      alias: "ngpPressDisabled",
      transform: booleanAttribute
    });
    this.isDisabled = injectDisabled(this.disabled);
    this.pressStart = output({
      alias: "ngpPressStart"
    });
    this.pressEnd = output({
      alias: "ngpPressEnd"
    });
    this.pressChange = output({
      alias: "ngpPress"
    });
    setupPress({
      pressStart: () => {
        this.pressStart.emit();
        this.pressChange.emit(true);
      },
      pressEnd: () => {
        this.pressEnd.emit();
        this.pressChange.emit(false);
      },
      disabled: this.isDisabled
    });
  }
};
_NgpPress.ɵfac = function NgpPress_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpPress)();
};
_NgpPress.ɵdir = ɵɵdefineDirective({
  type: _NgpPress,
  selectors: [["", "ngpPress", ""]],
  inputs: {
    disabled: [1, "ngpPressDisabled", "disabled"]
  },
  outputs: {
    pressStart: "ngpPressStart",
    pressEnd: "ngpPressEnd",
    pressChange: "ngpPress"
  },
  exportAs: ["ngpPress"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NgpPressToken,
    useExisting: _NgpPress
  }])]
});
var NgpPress = _NgpPress;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpPress, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[ngpPress]",
      exportAs: "ngpPress",
      providers: [{
        provide: NgpPressToken,
        useExisting: NgpPress
      }]
    }]
  }], () => [], null);
})();
var NgpMoveToken = new InjectionToken("NgpMoveToken");
var _NgpMove = class _NgpMove {
  constructor() {
    this.disposables = injectDisposables();
    this.disabled = input(false, {
      alias: "ngpMoveDisabled",
      transform: booleanAttribute
    });
    this.isDisabled = injectDisabled(this.disabled);
    this.start = output({
      alias: "ngpMoveStart"
    });
    this.move = output({
      alias: "ngpMove"
    });
    this.end = output({
      alias: "ngpMoveEnd"
    });
    this.isMoving = signal(false);
    this.x = null;
    this.y = null;
    this.pointerId = null;
    this.disposableListeners = [];
  }
  /**
   * Handle a move start.
   */
  onMoveStart(event, pointerType) {
    this.start.emit({
      pointerType,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      altKey: event.altKey
    });
    this.isMoving.set(true);
  }
  /**
   * Handle a move event.
   */
  onMove(event, pointerType, deltaX, deltaY) {
    if (deltaX === 0 && deltaY === 0) {
      return;
    }
    this.move.emit({
      deltaX,
      deltaY,
      pointerType,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      altKey: event.altKey
    });
  }
  /**
   * Handle a move end.
   */
  onMoveEnd(event, pointerType) {
    this.end.emit({
      pointerType,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      altKey: event.altKey
    });
    this.isMoving.set(false);
  }
  /**
   * Handle the pointer down event.
   */
  onPointerDown(event) {
    if (event.button !== 0 || this.pointerId !== null || this.isDisabled()) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.onMoveStart(event, event.pointerType);
    this.pointerId = event.pointerId;
    this.x = event.pageX;
    this.y = event.pageY;
    const pointerMove = this.disposables.addEventListener(window, "pointermove", this.onPointerMove.bind(this), false);
    const pointerUp = this.disposables.addEventListener(window, "pointerup", this.onPointerUp.bind(this), false);
    const pointerCancel = this.disposables.addEventListener(window, "pointercancel", this.onPointerUp.bind(this), false);
    this.disposableListeners = [pointerMove, pointerUp, pointerCancel];
  }
  /**
   * Handle the pointer up event.
   */
  onPointerUp(event) {
    if (this.pointerId !== event.pointerId) {
      return;
    }
    const pointerType = event.pointerType ?? "mouse";
    this.onMoveEnd(event, pointerType);
    this.pointerId = null;
    this.disposableListeners.forEach((dispose) => dispose());
  }
  /**
   * Handle the pointer move event.
   */
  onPointerMove(event) {
    if (this.pointerId !== event.pointerId) {
      return;
    }
    this.onMove(event, event.pointerType, event.pageX - (this.x ?? 0), event.pageY - (this.y ?? 0));
    this.x = event.pageX;
    this.y = event.pageY;
  }
  triggerKeyboardMove(event, deltaX, deltaY) {
    if (this.isDisabled()) {
      return;
    }
    this.onMoveStart(event, "keyboard");
    this.onMove(event, "keyboard", deltaX, deltaY);
    this.onMoveEnd(event, "keyboard");
  }
  onArrowUp(event) {
    event.preventDefault();
    event.stopPropagation();
    this.triggerKeyboardMove(event, 0, -1);
  }
  onArrowDown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.triggerKeyboardMove(event, 0, 1);
  }
  onArrowLeft(event) {
    event.preventDefault();
    event.stopPropagation();
    this.triggerKeyboardMove(event, -1, 0);
  }
  onArrowRight(event) {
    event.preventDefault();
    event.stopPropagation();
    this.triggerKeyboardMove(event, 1, 0);
  }
};
_NgpMove.ɵfac = function NgpMove_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpMove)();
};
_NgpMove.ɵdir = ɵɵdefineDirective({
  type: _NgpMove,
  selectors: [["", "ngpMove", ""]],
  hostVars: 1,
  hostBindings: function NgpMove_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("pointerdown", function NgpMove_pointerdown_HostBindingHandler($event) {
        return ctx.onPointerDown($event);
      })("keydown.ArrowUp", function NgpMove_keydown_ArrowUp_HostBindingHandler($event) {
        return ctx.onArrowUp($event);
      })("keydown.ArrowDown", function NgpMove_keydown_ArrowDown_HostBindingHandler($event) {
        return ctx.onArrowDown($event);
      })("keydown.ArrowLeft", function NgpMove_keydown_ArrowLeft_HostBindingHandler($event) {
        return ctx.onArrowLeft($event);
      })("keydown.ArrowRight", function NgpMove_keydown_ArrowRight_HostBindingHandler($event) {
        return ctx.onArrowRight($event);
      });
    }
    if (rf & 2) {
      ɵɵattribute("data-move", ctx.isMoving() ? "" : null);
    }
  },
  inputs: {
    disabled: [1, "ngpMoveDisabled", "disabled"]
  },
  outputs: {
    start: "ngpMoveStart",
    move: "ngpMove",
    end: "ngpMoveEnd"
  },
  exportAs: ["ngpMove"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NgpMoveToken,
    useExisting: _NgpMove
  }])]
});
var NgpMove = _NgpMove;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpMove, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[ngpMove]",
      exportAs: "ngpMove",
      providers: [{
        provide: NgpMoveToken,
        useExisting: NgpMove
      }],
      host: {
        "[attr.data-move]": 'isMoving() ? "" : null'
      }
    }]
  }], null, {
    onPointerDown: [{
      type: HostListener,
      args: ["pointerdown", ["$event"]]
    }],
    onArrowUp: [{
      type: HostListener,
      args: ["keydown.ArrowUp", ["$event"]]
    }],
    onArrowDown: [{
      type: HostListener,
      args: ["keydown.ArrowDown", ["$event"]]
    }],
    onArrowLeft: [{
      type: HostListener,
      args: ["keydown.ArrowLeft", ["$event"]]
    }],
    onArrowRight: [{
      type: HostListener,
      args: ["keydown.ArrowRight", ["$event"]]
    }]
  });
})();

// node_modules/ng-primitives/fesm2022/ng-primitives-file-upload.mjs
var NgpFileUploadToken = new InjectionToken("NgpFileUploadToken");
function injectFileUpload() {
  return inject(NgpFileUploadToken);
}
var _NgpFileUpload = class _NgpFileUpload {
  constructor() {
    this.elementRef = inject(ElementRef);
    this.fileTypes = input(void 0, {
      alias: "ngpFileUploadFileTypes",
      transform: coerceStringArray
    });
    this.multiple = input(false, {
      alias: "ngpFileUploadMultiple",
      transform: booleanAttribute
    });
    this.directory = input(false, {
      alias: "ngpFileUploadDirectory",
      transform: booleanAttribute
    });
    this.dragAndDrop = input(true, {
      alias: "ngpFileUploadDragDrop",
      transform: booleanAttribute
    });
    this.disabled = input(false, {
      alias: "ngpFileUploadDisabled",
      transform: booleanAttribute
    });
    this.selected = output({
      alias: "ngpFileUploadSelected"
    });
    this.dragOver = output({
      alias: "ngpFileUploadDragOver"
    });
    this.isDragOver = signal(false);
    this.input = document.createElement("input");
    this.input.type = "file";
    this.input.addEventListener("change", () => this.selected.emit(this.input.files));
  }
  showFileDialog() {
    if (this.disabled()) {
      return;
    }
    const fileTypes = this.fileTypes()?.join(",");
    if (fileTypes) {
      this.input.accept = fileTypes;
    }
    this.input.multiple = this.multiple();
    this.input.webkitdirectory = this.directory();
    this.input.click();
  }
  onDragEnter(event) {
    if (this.disabled() || !this.dragAndDrop()) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
    this.dragOver.emit(true);
  }
  onDragOver(event) {
    if (this.disabled() || !this.dragAndDrop()) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.isDragOver.set(true);
  }
  onDragLeave(event) {
    if (this.disabled() || !this.dragAndDrop() || !this.isDragOver()) {
      return;
    }
    if (this.elementRef.nativeElement.contains(event.relatedTarget)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    this.dragOver.emit(false);
  }
  onDrop(event) {
    if (this.disabled() || !this.dragAndDrop()) {
      return;
    }
    event.preventDefault();
    this.isDragOver.set(false);
    this.dragOver.emit(false);
    if (event.dataTransfer?.files) {
      this.selected.emit(event.dataTransfer.files);
    }
  }
};
_NgpFileUpload.ɵfac = function NgpFileUpload_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpFileUpload)();
};
_NgpFileUpload.ɵdir = ɵɵdefineDirective({
  type: _NgpFileUpload,
  selectors: [["", "ngpFileUpload", ""]],
  hostVars: 2,
  hostBindings: function NgpFileUpload_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpFileUpload_click_HostBindingHandler() {
        return ctx.showFileDialog();
      })("dragenter", function NgpFileUpload_dragenter_HostBindingHandler($event) {
        return ctx.onDragEnter($event);
      })("dragover", function NgpFileUpload_dragover_HostBindingHandler($event) {
        return ctx.onDragOver($event);
      })("dragleave", function NgpFileUpload_dragleave_HostBindingHandler($event) {
        return ctx.onDragLeave($event);
      })("drop", function NgpFileUpload_drop_HostBindingHandler($event) {
        return ctx.onDrop($event);
      });
    }
    if (rf & 2) {
      ɵɵattribute("data-disabled", ctx.disabled() ? "" : null)("data-dragover", ctx.isDragOver() ? "" : null);
    }
  },
  inputs: {
    fileTypes: [1, "ngpFileUploadFileTypes", "fileTypes"],
    multiple: [1, "ngpFileUploadMultiple", "multiple"],
    directory: [1, "ngpFileUploadDirectory", "directory"],
    dragAndDrop: [1, "ngpFileUploadDragDrop", "dragAndDrop"],
    disabled: [1, "ngpFileUploadDisabled", "disabled"]
  },
  outputs: {
    selected: "ngpFileUploadSelected",
    dragOver: "ngpFileUploadDragOver"
  },
  exportAs: ["ngpFileUpload"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NgpFileUploadToken,
    useExisting: _NgpFileUpload
  }]), ɵɵHostDirectivesFeature([NgpHover, NgpFocusVisible, NgpPress])]
});
var NgpFileUpload = _NgpFileUpload;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpFileUpload, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[ngpFileUpload]",
      exportAs: "ngpFileUpload",
      providers: [{
        provide: NgpFileUploadToken,
        useExisting: NgpFileUpload
      }],
      host: {
        "[attr.data-disabled]": 'disabled() ? "" : null',
        "[attr.data-dragover]": 'isDragOver() ? "" : null'
      },
      hostDirectives: [NgpHover, NgpFocusVisible, NgpPress]
    }]
  }], () => [], {
    showFileDialog: [{
      type: HostListener,
      args: ["click"]
    }],
    onDragEnter: [{
      type: HostListener,
      args: ["dragenter", ["$event"]]
    }],
    onDragOver: [{
      type: HostListener,
      args: ["dragover", ["$event"]]
    }],
    onDragLeave: [{
      type: HostListener,
      args: ["dragleave", ["$event"]]
    }],
    onDrop: [{
      type: HostListener,
      args: ["drop", ["$event"]]
    }]
  });
})();
export {
  NgpFileUpload,
  NgpFileUploadToken,
  injectFileUpload
};
//# sourceMappingURL=ng-primitives_file-upload.js.map
