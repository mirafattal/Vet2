import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { MAT_SLIDER_THUMB } from './slider-interface';
import { FormlyFieldSlider } from './slider.type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/slider";
import * as i2 from "@ngx-formly/core";
import * as i3 from "./slider-input";
import * as i4 from "@angular/forms";
/**
 * @ignore
 */
export class FormlyFieldMDCSlider extends FormlyFieldSlider {
    set mdcSlider(slider) {
        Object.defineProperty(slider, '_input', {
            set: () => { },
            get: () => this.sliderThumb,
        });
        const visualThumb = {
            _hostElement: {
                classList: {
                    add: () => { },
                    remove: () => { },
                },
            },
        };
        // workarround for "ERROR TypeError: visualThumb is undefined" when `discrete` is set to `true`
        slider._thumbs = { first: visualThumb, last: visualThumb };
    }
    onContainerClick(event) {
        this.sliderThumb?._hostElement.focus();
        super.onContainerClick(event);
    }
}
FormlyFieldMDCSlider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldMDCSlider, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldMDCSlider.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldMDCSlider, selector: "formly-field-mat-slider", viewQueries: [{ propertyName: "sliderThumb", first: true, predicate: MAT_SLIDER_THUMB, descendants: true, static: true }, { propertyName: "mdcSlider", first: true, predicate: MatSlider, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: `
    <mat-slider
      [id]="id"
      [style.width]="'100%'"
      [formlyAttributes]="field"
      [tabIndex]="props.tabindex"
      [color]="props.color"
      [displayWith]="props.displayWith"
      [invert]="props.invert"
      [max]="props.max"
      [min]="props.min"
      [step]="props.step"
      [discrete]="props.thumbLabel || props.discrete"
      [showTickMarks]="props.showTickMarks"
      [step]="props.step"
      [tickInterval]="props.tickInterval"
      [valueText]="props.valueText"
      [vertical]="props.vertical"
      (input)="props.input && props.input(field, $event)"
      (change)="props.change && props.change(field, $event)"
    >
      <input matSliderThumb [formControl]="formControl" [formlyAttributes]="field" />
    </mat-slider>
  `, isInline: true, components: [{ type: i1.MatSlider, selector: "mat-slider", inputs: ["disabled", "color", "tabIndex", "invert", "max", "min", "step", "thumbLabel", "tickInterval", "value", "displayWith", "valueText", "vertical"], outputs: ["change", "input", "valueChange"], exportAs: ["matSlider"] }], directives: [{ type: i2.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i3.MatSliderThumb, selector: "input[matSliderThumb]", inputs: ["value"], outputs: ["valueChange", "dragStart", "dragEnd"], exportAs: ["matSliderThumb"] }, { type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldMDCSlider, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-mat-slider',
                    template: `
    <mat-slider
      [id]="id"
      [style.width]="'100%'"
      [formlyAttributes]="field"
      [tabIndex]="props.tabindex"
      [color]="props.color"
      [displayWith]="props.displayWith"
      [invert]="props.invert"
      [max]="props.max"
      [min]="props.min"
      [step]="props.step"
      [discrete]="props.thumbLabel || props.discrete"
      [showTickMarks]="props.showTickMarks"
      [step]="props.step"
      [tickInterval]="props.tickInterval"
      [valueText]="props.valueText"
      [vertical]="props.vertical"
      (input)="props.input && props.input(field, $event)"
      (change)="props.change && props.change(field, $event)"
    >
      <input matSliderThumb [formControl]="formControl" [formlyAttributes]="field" />
    </mat-slider>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { sliderThumb: [{
                type: ViewChild,
                args: [MAT_SLIDER_THUMB, { static: true }]
            }], mdcSlider: [{
                type: ViewChild,
                args: [MatSlider, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLW1kYy50eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL21hdGVyaWFsL3NsaWRlci9zcmMvc2xpZGVyLW1kYy50eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQStCLE1BQU0sb0JBQW9CLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFFbEQ7O0dBRUc7QUE2QkgsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGlCQUFpQjtJQUV6RCxJQUE0QyxTQUFTLENBQUMsTUFBa0I7UUFDdEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO1lBQ3RDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO1lBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO1NBQzVCLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHO1lBQ2xCLFlBQVksRUFBRTtnQkFDWixTQUFTLEVBQUU7b0JBQ1QsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7b0JBQ2IsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7aUJBQ2pCO2FBQ0Y7U0FDRixDQUFDO1FBRUYsK0ZBQStGO1FBQzlGLE1BQWMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUN0RSxDQUFDO0lBRVEsZ0JBQWdCLENBQUMsS0FBaUI7UUFDekMsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O2tIQXhCVSxvQkFBb0I7c0dBQXBCLG9CQUFvQiw0R0FDcEIsZ0JBQWdCLDBGQUNoQixTQUFTLHFGQTVCVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7NEZBR1Usb0JBQW9CO2tCQTVCaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFFZ0QsV0FBVztzQkFBekQsU0FBUzt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQ0QsU0FBUztzQkFBcEQsU0FBUzt1QkFBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTbGlkZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHsgTUFUX1NMSURFUl9USFVNQiwgX01hdFNsaWRlciwgX01hdFNsaWRlclRodW1iIH0gZnJvbSAnLi9zbGlkZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1seUZpZWxkU2xpZGVyIH0gZnJvbSAnLi9zbGlkZXIudHlwZSc7XG5cbi8qKlxuICogQGlnbm9yZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZmllbGQtbWF0LXNsaWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG1hdC1zbGlkZXJcbiAgICAgIFtpZF09XCJpZFwiXG4gICAgICBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCJcbiAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCJcbiAgICAgIFt0YWJJbmRleF09XCJwcm9wcy50YWJpbmRleFwiXG4gICAgICBbY29sb3JdPVwicHJvcHMuY29sb3JcIlxuICAgICAgW2Rpc3BsYXlXaXRoXT1cInByb3BzLmRpc3BsYXlXaXRoXCJcbiAgICAgIFtpbnZlcnRdPVwicHJvcHMuaW52ZXJ0XCJcbiAgICAgIFttYXhdPVwicHJvcHMubWF4XCJcbiAgICAgIFttaW5dPVwicHJvcHMubWluXCJcbiAgICAgIFtzdGVwXT1cInByb3BzLnN0ZXBcIlxuICAgICAgW2Rpc2NyZXRlXT1cInByb3BzLnRodW1iTGFiZWwgfHwgcHJvcHMuZGlzY3JldGVcIlxuICAgICAgW3Nob3dUaWNrTWFya3NdPVwicHJvcHMuc2hvd1RpY2tNYXJrc1wiXG4gICAgICBbc3RlcF09XCJwcm9wcy5zdGVwXCJcbiAgICAgIFt0aWNrSW50ZXJ2YWxdPVwicHJvcHMudGlja0ludGVydmFsXCJcbiAgICAgIFt2YWx1ZVRleHRdPVwicHJvcHMudmFsdWVUZXh0XCJcbiAgICAgIFt2ZXJ0aWNhbF09XCJwcm9wcy52ZXJ0aWNhbFwiXG4gICAgICAoaW5wdXQpPVwicHJvcHMuaW5wdXQgJiYgcHJvcHMuaW5wdXQoZmllbGQsICRldmVudClcIlxuICAgICAgKGNoYW5nZSk9XCJwcm9wcy5jaGFuZ2UgJiYgcHJvcHMuY2hhbmdlKGZpZWxkLCAkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8aW5wdXQgbWF0U2xpZGVyVGh1bWIgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCIgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIiAvPlxuICAgIDwvbWF0LXNsaWRlcj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkTURDU2xpZGVyIGV4dGVuZHMgRm9ybWx5RmllbGRTbGlkZXIge1xuICBAVmlld0NoaWxkKE1BVF9TTElERVJfVEhVTUIsIHsgc3RhdGljOiB0cnVlIH0pIHNsaWRlclRodW1iOiBfTWF0U2xpZGVyVGh1bWI7XG4gIEBWaWV3Q2hpbGQoTWF0U2xpZGVyLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXQgbWRjU2xpZGVyKHNsaWRlcjogX01hdFNsaWRlcikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzbGlkZXIsICdfaW5wdXQnLCB7XG4gICAgICBzZXQ6ICgpID0+IHt9LFxuICAgICAgZ2V0OiAoKSA9PiB0aGlzLnNsaWRlclRodW1iLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdmlzdWFsVGh1bWIgPSB7XG4gICAgICBfaG9zdEVsZW1lbnQ6IHtcbiAgICAgICAgY2xhc3NMaXN0OiB7XG4gICAgICAgICAgYWRkOiAoKSA9PiB7fSxcbiAgICAgICAgICByZW1vdmU6ICgpID0+IHt9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gd29ya2Fycm91bmQgZm9yIFwiRVJST1IgVHlwZUVycm9yOiB2aXN1YWxUaHVtYiBpcyB1bmRlZmluZWRcIiB3aGVuIGBkaXNjcmV0ZWAgaXMgc2V0IHRvIGB0cnVlYFxuICAgIChzbGlkZXIgYXMgYW55KS5fdGh1bWJzID0geyBmaXJzdDogdmlzdWFsVGh1bWIsIGxhc3Q6IHZpc3VhbFRodW1iIH07XG4gIH1cblxuICBvdmVycmlkZSBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5zbGlkZXJUaHVtYj8uX2hvc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgc3VwZXIub25Db250YWluZXJDbGljayhldmVudCk7XG4gIH1cbn1cbiJdfQ==