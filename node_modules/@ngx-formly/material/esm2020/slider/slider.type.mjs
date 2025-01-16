import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatSlider } from '@angular/material/slider';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/slider";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
export class FormlyFieldSlider extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                hideFieldUnderline: true,
                floatLabel: 'always',
                thumbLabel: false,
                displayWith: (value) => value,
            },
        };
    }
    onContainerClick(event) {
        this.slider.focus?.();
        super.onContainerClick(event);
    }
}
FormlyFieldSlider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldSlider, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldSlider.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldSlider, selector: "formly-field-mat-slider", viewQueries: [{ propertyName: "slider", first: true, predicate: MatSlider, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: `
    <mat-slider
      [id]="id"
      [style.width]="'100%'"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [tabIndex]="props.tabindex"
      [color]="props.color"
      [displayWith]="props.displayWith"
      [invert]="props.invert"
      [max]="props.max"
      [min]="props.min"
      [step]="props.step"
      [thumbLabel]="props.thumbLabel || props.discrete"
      [tickInterval]="props.tickInterval"
      [valueText]="props.valueText"
      [vertical]="props.vertical"
      (input)="props.input && props.input(field, $event)"
      (change)="props.change && props.change(field, $event)"
    >
    </mat-slider>
  `, isInline: true, components: [{ type: i1.MatSlider, selector: "mat-slider", inputs: ["disabled", "color", "tabIndex", "invert", "max", "min", "step", "thumbLabel", "tickInterval", "value", "displayWith", "valueText", "vertical"], outputs: ["change", "input", "valueChange"], exportAs: ["matSlider"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldSlider, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-mat-slider',
                    template: `
    <mat-slider
      [id]="id"
      [style.width]="'100%'"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [tabIndex]="props.tabindex"
      [color]="props.color"
      [displayWith]="props.displayWith"
      [invert]="props.invert"
      [max]="props.max"
      [min]="props.min"
      [step]="props.step"
      [thumbLabel]="props.thumbLabel || props.discrete"
      [tickInterval]="props.tickInterval"
      [valueText]="props.valueText"
      [vertical]="props.vertical"
      (input)="props.input && props.input(field, $event)"
      (change)="props.change && props.change(field, $event)"
    >
    </mat-slider>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { slider: [{
                type: ViewChild,
                args: [MatSlider, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLnR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvbWF0ZXJpYWwvc2xpZGVyL3NyYy9zbGlkZXIudHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUVwRixPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxTQUFTLEVBQW1CLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBK0N0RSxNQUFNLE9BQU8saUJBQWtCLFNBQVEsU0FBdUM7SUExQjlFOztRQTRCVyxtQkFBYyxHQUFHO1lBQ3hCLEtBQUssRUFBRTtnQkFDTCxrQkFBa0IsRUFBRSxJQUFJO2dCQUN4QixVQUFVLEVBQUUsUUFBaUI7Z0JBQzdCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixXQUFXLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLEtBQUs7YUFDdEM7U0FDRixDQUFDO0tBTUg7SUFKVSxnQkFBZ0IsQ0FBQyxLQUFpQjtRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDdEIsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7OytHQWRVLGlCQUFpQjttR0FBakIsaUJBQWlCLHVHQUNqQixTQUFTLHFGQXpCVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJUOzRGQUdVLGlCQUFpQjtrQkExQjdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhCQUV5QyxNQUFNO3NCQUE3QyxTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3Q2hpbGQsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRm9ybWx5RmllbGRQcm9wcyB9IGZyb20gJ0BuZ3gtZm9ybWx5L21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0U2xpZGVyLCBNYXRTbGlkZXJDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xuXG5pbnRlcmZhY2UgU2xpZGVyUHJvcHMgZXh0ZW5kcyBGb3JtbHlGaWVsZFByb3BzIHtcbiAgZGlzcGxheVdpdGg/OiAodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nIHwgbnVtYmVyO1xuICBpbnZlcnQ/OiBib29sZWFuO1xuICB0aWNrSW50ZXJ2YWw/OiBudW1iZXI7XG4gIHZhbHVlVGV4dD86IHN0cmluZztcbiAgdmVydGljYWw/OiBib29sZWFuO1xuICBpbnB1dD86IChmaWVsZDogRm9ybWx5RmllbGRDb25maWc8U2xpZGVyUHJvcHM+LCAkZXZlbnQ6IE1hdFNsaWRlckNoYW5nZSkgPT4gdm9pZDtcbiAgY2hhbmdlPzogKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZzxTbGlkZXJQcm9wcz4sICRldmVudDogTWF0U2xpZGVyQ2hhbmdlKSA9PiB2b2lkO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCBVc2UgYGRpc2NyZXRlYCBpbnN0ZWFkLiAqL1xuICB0aHVtYkxhYmVsPzogYm9vbGVhbjtcbiAgZGlzY3JldGU/OiBib29sZWFuO1xuICBzaG93VGlja01hcmtzPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlTbGlkZXJGaWVsZENvbmZpZyBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnPFNsaWRlclByb3BzPiB7XG4gIHR5cGU6ICdzbGlkZXInIHwgVHlwZTxGb3JtbHlGaWVsZFNsaWRlcj47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZC1tYXQtc2xpZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bWF0LXNsaWRlclxuICAgICAgW2lkXT1cImlkXCJcbiAgICAgIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIlxuICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCJcbiAgICAgIFt0YWJJbmRleF09XCJwcm9wcy50YWJpbmRleFwiXG4gICAgICBbY29sb3JdPVwicHJvcHMuY29sb3JcIlxuICAgICAgW2Rpc3BsYXlXaXRoXT1cInByb3BzLmRpc3BsYXlXaXRoXCJcbiAgICAgIFtpbnZlcnRdPVwicHJvcHMuaW52ZXJ0XCJcbiAgICAgIFttYXhdPVwicHJvcHMubWF4XCJcbiAgICAgIFttaW5dPVwicHJvcHMubWluXCJcbiAgICAgIFtzdGVwXT1cInByb3BzLnN0ZXBcIlxuICAgICAgW3RodW1iTGFiZWxdPVwicHJvcHMudGh1bWJMYWJlbCB8fCBwcm9wcy5kaXNjcmV0ZVwiXG4gICAgICBbdGlja0ludGVydmFsXT1cInByb3BzLnRpY2tJbnRlcnZhbFwiXG4gICAgICBbdmFsdWVUZXh0XT1cInByb3BzLnZhbHVlVGV4dFwiXG4gICAgICBbdmVydGljYWxdPVwicHJvcHMudmVydGljYWxcIlxuICAgICAgKGlucHV0KT1cInByb3BzLmlucHV0ICYmIHByb3BzLmlucHV0KGZpZWxkLCAkZXZlbnQpXCJcbiAgICAgIChjaGFuZ2UpPVwicHJvcHMuY2hhbmdlICYmIHByb3BzLmNoYW5nZShmaWVsZCwgJGV2ZW50KVwiXG4gICAgPlxuICAgIDwvbWF0LXNsaWRlcj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkU2xpZGVyIGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxTbGlkZXJQcm9wcz4+IHtcbiAgQFZpZXdDaGlsZChNYXRTbGlkZXIsIHsgc3RhdGljOiB0cnVlIH0pIHNsaWRlciE6IE1hdFNsaWRlcjtcbiAgb3ZlcnJpZGUgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgIGhpZGVGaWVsZFVuZGVybGluZTogdHJ1ZSxcbiAgICAgIGZsb2F0TGFiZWw6ICdhbHdheXMnIGFzIGNvbnN0LFxuICAgICAgdGh1bWJMYWJlbDogZmFsc2UsXG4gICAgICBkaXNwbGF5V2l0aDogKHZhbHVlOiBudW1iZXIpID0+IHZhbHVlLFxuICAgIH0sXG4gIH07XG5cbiAgb3ZlcnJpZGUgb25Db250YWluZXJDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuc2xpZGVyLmZvY3VzPy4oKTtcbiAgICBzdXBlci5vbkNvbnRhaW5lckNsaWNrKGV2ZW50KTtcbiAgfVxufVxuIl19