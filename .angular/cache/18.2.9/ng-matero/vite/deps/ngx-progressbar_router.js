import {
  NgProgressRef,
  toSignal
} from "./chunk-POVKETI2.js";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "./chunk-HWULI4UQ.js";
import "./chunk-U3YQB5PC.js";
import "./chunk-GF3TUK6Z.js";
import "./chunk-N4KTDJXB.js";
import {
  Directive,
  InjectionToken,
  effect,
  inject,
  setClassMetadata,
  untracked,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵdefineDirective,
  ɵɵgetInheritedFactory
} from "./chunk-ZIMOXBNZ.js";
import "./chunk-RVPGH44C.js";
import "./chunk-7T6KWQAF.js";
import {
  filter
} from "./chunk-Y72VVDF2.js";
import {
  map
} from "./chunk-WAMCWUMY.js";
import "./chunk-4ZCQXTI3.js";
import {
  __spreadValues
} from "./chunk-PEHFQLBM.js";

// node_modules/ngx-progressbar/fesm2022/ngx-progressbar-router.mjs
var defaultRouterOptions = {
  minDuration: 0,
  startEvents: [NavigationStart],
  completeEvents: [NavigationEnd, NavigationCancel, NavigationError]
};
var NG_PROGRESS_ROUTER_OPTIONS = new InjectionToken("NG_PROGRESS_ROUTER_OPTIONS", {
  providedIn: "root",
  factory: () => defaultRouterOptions
});
function provideNgProgressRouter(options) {
  return {
    provide: NG_PROGRESS_ROUTER_OPTIONS,
    useValue: __spreadValues(__spreadValues({}, defaultRouterOptions), options)
  };
}
function eventExists(routerEvent, events) {
  return events.some((e) => routerEvent instanceof e);
}
var _NgProgressRouterBase = class _NgProgressRouterBase {
  constructor() {
    this.router = inject(Router);
    this.config = inject(NG_PROGRESS_ROUTER_OPTIONS);
    this.progressRef = inject(NgProgressRef, {
      host: true,
      self: true
    });
    this.routerToggleEvent = toSignal(this.router.events.pipe(filter((event) => eventExists(event, [...this.config.startEvents, ...this.config.completeEvents])), map((event) => eventExists(event, this.config.startEvents))));
    effect((onCleanup) => {
      const toggle = this.routerToggleEvent();
      let completeTimeout;
      untracked(() => {
        if (toggle) {
          this.progressRef.start();
        } else {
          completeTimeout = setTimeout(() => {
            this.progressRef.complete();
          }, this.config.minDuration);
        }
        onCleanup(() => clearTimeout(completeTimeout));
      });
    });
  }
};
_NgProgressRouterBase.ɵfac = function NgProgressRouterBase_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgProgressRouterBase)();
};
_NgProgressRouterBase.ɵdir = ɵɵdefineDirective({
  type: _NgProgressRouterBase
});
var NgProgressRouterBase = _NgProgressRouterBase;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgProgressRouterBase, [{
    type: Directive
  }], () => [], null);
})();
var _NgProgressRouter = class _NgProgressRouter extends NgProgressRouterBase {
};
_NgProgressRouter.ɵfac = /* @__PURE__ */ (() => {
  let ɵNgProgressRouter_BaseFactory;
  return function NgProgressRouter_Factory(__ngFactoryType__) {
    return (ɵNgProgressRouter_BaseFactory || (ɵNgProgressRouter_BaseFactory = ɵɵgetInheritedFactory(_NgProgressRouter)))(__ngFactoryType__ || _NgProgressRouter);
  };
})();
_NgProgressRouter.ɵdir = ɵɵdefineDirective({
  type: _NgProgressRouter,
  selectors: [["ng-progress", "ngProgressRouter", ""]],
  standalone: true,
  features: [ɵɵInheritDefinitionFeature]
});
var NgProgressRouter = _NgProgressRouter;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgProgressRouter, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "ng-progress[ngProgressRouter]"
    }]
  }], null, null);
})();
var _NgProgressRouterRef = class _NgProgressRouterRef extends NgProgressRouterBase {
};
_NgProgressRouterRef.ɵfac = /* @__PURE__ */ (() => {
  let ɵNgProgressRouterRef_BaseFactory;
  return function NgProgressRouterRef_Factory(__ngFactoryType__) {
    return (ɵNgProgressRouterRef_BaseFactory || (ɵNgProgressRouterRef_BaseFactory = ɵɵgetInheritedFactory(_NgProgressRouterRef)))(__ngFactoryType__ || _NgProgressRouterRef);
  };
})();
_NgProgressRouterRef.ɵdir = ɵɵdefineDirective({
  type: _NgProgressRouterRef,
  selectors: [["", "ngProgressRouter", "", 5, "ng-progress"]],
  standalone: true,
  features: [ɵɵHostDirectivesFeature([NgProgressRef]), ɵɵInheritDefinitionFeature]
});
var NgProgressRouterRef = _NgProgressRouterRef;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgProgressRouterRef, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[ngProgressRouter]:not(ng-progress)",
      hostDirectives: [NgProgressRef]
    }]
  }], null, null);
})();
export {
  NG_PROGRESS_ROUTER_OPTIONS,
  NgProgressRouter,
  NgProgressRouterRef,
  provideNgProgressRouter
};
//# sourceMappingURL=ngx-progressbar_router.js.map
