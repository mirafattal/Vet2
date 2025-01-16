import {
  CommonModule
} from "./chunk-3LWAY6MT.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation$1,
  booleanAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵStandaloneFeature,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵstyleProp
} from "./chunk-YCMYJ33Q.js";
import "./chunk-7GQHZGQU.js";
import "./chunk-B744N6TL.js";
import "./chunk-VMTHMMW2.js";
import "./chunk-W52FN47Y.js";
import "./chunk-PEHFQLBM.js";

// node_modules/@ng-matero/extensions/fesm2022/mtxProgress.mjs
var _c0 = ["*"];
var _MtxProgress = class _MtxProgress {
  constructor() {
    this.type = "default";
    this.value = 0;
    this.striped = false;
    this.animate = false;
  }
};
_MtxProgress.ɵfac = function MtxProgress_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MtxProgress)();
};
_MtxProgress.ɵcmp = ɵɵdefineComponent({
  type: _MtxProgress,
  selectors: [["mtx-progress"]],
  hostAttrs: [1, "mtx-progress"],
  hostVars: 4,
  hostBindings: function MtxProgress_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵstyleProp("height", ctx.height)("background-color", ctx.background);
    }
  },
  inputs: {
    type: "type",
    value: "value",
    height: "height",
    color: "color",
    foreground: "foreground",
    background: "background",
    striped: [2, "striped", "striped", booleanAttribute],
    animate: [2, "animate", "animate", booleanAttribute]
  },
  exportAs: ["mtxProgress"],
  standalone: true,
  features: [ɵɵInputTransformsFeature, ɵɵStandaloneFeature],
  ngContentSelectors: _c0,
  decls: 2,
  vars: 12,
  consts: [["role", "progress-fill", 1, "mtx-progress-fill"]],
  template: function MtxProgress_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 0);
      ɵɵprojection(1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵclassMap("mtx-progress-fill-" + ctx.type);
      ɵɵstyleProp("width", ctx.value, "%")("background-color", ctx.foreground)("color", ctx.color);
      ɵɵclassProp("mtx-progress-fill-striped", ctx.striped)("mtx-progress-fill-animated", ctx.animate);
    }
  },
  styles: [".mtx-progress{display:flex;height:16px;margin:8px 0;overflow:hidden;font-size:var(--mtx-progress-text-size, var(--mat-app-label-medium-size));border-radius:var(--mtx-progress-container-shape, var(--mat-app-corner-extra-small));background-color:var(--mtx-progress-track-color, var(--mat-app-surface-container))}.mtx-progress-fill{display:flex;flex-direction:column;justify-content:center;text-align:center;transition:width .6s ease;background-color:var(--mtx-progress-indicator-color, var(--mat-app-outline-variant));color:var(--mtx-progress-text-color, var(--mat-app-on-surface))}.mtx-progress-fill-info{background-color:var(--mtx-progress-info-indicator-color);color:var(--mtx-progress-info-text-color)}.mtx-progress-fill-success{background-color:var(--mtx-progress-success-indicator-color);color:var(--mtx-progress-success-text-color)}.mtx-progress-fill-warning{background-color:var(--mtx-progress-warning-indicator-color);color:var(--mtx-progress-warning-text-color)}.mtx-progress-fill-danger{background-color:var(--mtx-progress-danger-indicator-color);color:var(--mtx-progress-danger-text-color)}.mtx-progress-fill-striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:16px 16px}.mtx-progress-fill-animated{animation:mtx-progress-fill-stripes 1s linear infinite}@media (prefers-reduced-motion: reduce){.mtx-progress-fill-animated{animation:none}}@keyframes mtx-progress-fill-stripes{0%{background-position:16px 0}to{background-position:0 0}}\n"],
  encapsulation: 2,
  changeDetection: 0
});
var MtxProgress = _MtxProgress;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxProgress, [{
    type: Component,
    args: [{
      selector: "mtx-progress",
      exportAs: "mtxProgress",
      host: {
        "class": "mtx-progress",
        "[style.height]": "height",
        "[style.backgroundColor]": "background"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: `<div class="mtx-progress-fill"
     [class]="'mtx-progress-fill-' + type"
     [class.mtx-progress-fill-striped]="striped"
     [class.mtx-progress-fill-animated]="animate"
     [style.width.%]="value"
     [style.background-color]="foreground"
     [style.color]="color"
     role="progress-fill">
  <ng-content></ng-content>
</div>
`,
      styles: [".mtx-progress{display:flex;height:16px;margin:8px 0;overflow:hidden;font-size:var(--mtx-progress-text-size, var(--mat-app-label-medium-size));border-radius:var(--mtx-progress-container-shape, var(--mat-app-corner-extra-small));background-color:var(--mtx-progress-track-color, var(--mat-app-surface-container))}.mtx-progress-fill{display:flex;flex-direction:column;justify-content:center;text-align:center;transition:width .6s ease;background-color:var(--mtx-progress-indicator-color, var(--mat-app-outline-variant));color:var(--mtx-progress-text-color, var(--mat-app-on-surface))}.mtx-progress-fill-info{background-color:var(--mtx-progress-info-indicator-color);color:var(--mtx-progress-info-text-color)}.mtx-progress-fill-success{background-color:var(--mtx-progress-success-indicator-color);color:var(--mtx-progress-success-text-color)}.mtx-progress-fill-warning{background-color:var(--mtx-progress-warning-indicator-color);color:var(--mtx-progress-warning-text-color)}.mtx-progress-fill-danger{background-color:var(--mtx-progress-danger-indicator-color);color:var(--mtx-progress-danger-text-color)}.mtx-progress-fill-striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:16px 16px}.mtx-progress-fill-animated{animation:mtx-progress-fill-stripes 1s linear infinite}@media (prefers-reduced-motion: reduce){.mtx-progress-fill-animated{animation:none}}@keyframes mtx-progress-fill-stripes{0%{background-position:16px 0}to{background-position:0 0}}\n"]
    }]
  }], null, {
    type: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    foreground: [{
      type: Input
    }],
    background: [{
      type: Input
    }],
    striped: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    animate: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _MtxProgressModule = class _MtxProgressModule {
};
_MtxProgressModule.ɵfac = function MtxProgressModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MtxProgressModule)();
};
_MtxProgressModule.ɵmod = ɵɵdefineNgModule({
  type: _MtxProgressModule,
  imports: [CommonModule, MtxProgress],
  exports: [MtxProgress]
});
_MtxProgressModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
var MtxProgressModule = _MtxProgressModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MtxProgressModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, MtxProgress],
      exports: [MtxProgress]
    }]
  }], null, null);
})();
export {
  MtxProgress,
  MtxProgressModule
};
//# sourceMappingURL=@ng-matero_extensions_progress.js.map
