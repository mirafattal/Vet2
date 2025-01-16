import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/input";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
import * as i4 from "@angular/common";
import * as i5 from "@ngx-formly/core/select";
export class FormlyFieldNativeSelect extends FieldType {
}
FormlyFieldNativeSelect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldNativeSelect, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldNativeSelect.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldNativeSelect, selector: "formly-field-mat-native-select", usesInheritance: true, ngImport: i0, template: `
    <select
      matNativeControl
      [id]="id"
      [name]="field.name"
      [readonly]="props.readonly"
      [required]="required"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [formlyAttributes]="field"
    >
      <option *ngIf="props.placeholder" [ngValue]="undefined">{{ props.placeholder }}</option>
      <ng-container *ngIf="props.options | formlySelectOptions : field | async as opts">
        <ng-container *ngFor="let opt of opts">
          <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
            {{ opt.label }}
          </option>
          <ng-template #optgroup>
            <optgroup [label]="opt.label">
              <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                {{ child.label }}
              </option>
            </optgroup>
          </ng-template>
        </ng-container>
      </ng-container>
    </select>
  `, isInline: true, directives: [{ type: i1.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i4.AsyncPipe, "formlySelectOptions": i5.FormlySelectOptionsPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldNativeSelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-mat-native-select',
                    template: `
    <select
      matNativeControl
      [id]="id"
      [name]="field.name"
      [readonly]="props.readonly"
      [required]="required"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [formlyAttributes]="field"
    >
      <option *ngIf="props.placeholder" [ngValue]="undefined">{{ props.placeholder }}</option>
      <ng-container *ngIf="props.options | formlySelectOptions : field | async as opts">
        <ng-container *ngFor="let opt of opts">
          <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
            {{ opt.label }}
          </option>
          <ng-template #optgroup>
            <optgroup [label]="opt.label">
              <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                {{ child.label }}
              </option>
            </optgroup>
          </ng-template>
        </ng-container>
      </ng-container>
    </select>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLXNlbGVjdC50eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL21hdGVyaWFsL25hdGl2ZS1zZWxlY3Qvc3JjL25hdGl2ZS1zZWxlY3QudHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFRLE1BQU0sZUFBZSxDQUFDO0FBR3pFLE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7QUF3QzlFLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxTQUE2Qzs7cUhBQTdFLHVCQUF1Qjt5R0FBdkIsdUJBQXVCLDZGQTlCeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDs0RkFHVSx1QkFBdUI7a0JBaENuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZvcm1seUZpZWxkU2VsZWN0UHJvcHMgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlL3NlbGVjdCc7XG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZvcm1seUZpZWxkUHJvcHMgfSBmcm9tICdAbmd4LWZvcm1seS9tYXRlcmlhbC9mb3JtLWZpZWxkJztcblxuaW50ZXJmYWNlIE5hdGl2ZVNlbGVjdFByb3BzIGV4dGVuZHMgRm9ybWx5RmllbGRQcm9wcywgRm9ybWx5RmllbGRTZWxlY3RQcm9wcyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seU5hdGl2ZVNlbGVjdEZpZWxkQ29uZmlnIGV4dGVuZHMgRm9ybWx5RmllbGRDb25maWc8TmF0aXZlU2VsZWN0UHJvcHM+IHtcbiAgdHlwZTogJ25hdGl2ZS1zZWxlY3QnIHwgVHlwZTxGb3JtbHlGaWVsZE5hdGl2ZVNlbGVjdD47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZC1tYXQtbmF0aXZlLXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNlbGVjdFxuICAgICAgbWF0TmF0aXZlQ29udHJvbFxuICAgICAgW2lkXT1cImlkXCJcbiAgICAgIFtuYW1lXT1cImZpZWxkLm5hbWVcIlxuICAgICAgW3JlYWRvbmx5XT1cInByb3BzLnJlYWRvbmx5XCJcbiAgICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICBbZXJyb3JTdGF0ZU1hdGNoZXJdPVwiZXJyb3JTdGF0ZU1hdGNoZXJcIlxuICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCJcbiAgICA+XG4gICAgICA8b3B0aW9uICpuZ0lmPVwicHJvcHMucGxhY2Vob2xkZXJcIiBbbmdWYWx1ZV09XCJ1bmRlZmluZWRcIj57eyBwcm9wcy5wbGFjZWhvbGRlciB9fTwvb3B0aW9uPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInByb3BzLm9wdGlvbnMgfCBmb3JtbHlTZWxlY3RPcHRpb25zIDogZmllbGQgfCBhc3luYyBhcyBvcHRzXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG9wdCBvZiBvcHRzXCI+XG4gICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIiFvcHQuZ3JvdXA7IGVsc2Ugb3B0Z3JvdXBcIiBbbmdWYWx1ZV09XCJvcHQudmFsdWVcIiBbZGlzYWJsZWRdPVwib3B0LmRpc2FibGVkXCI+XG4gICAgICAgICAgICB7eyBvcHQubGFiZWwgfX1cbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI29wdGdyb3VwPlxuICAgICAgICAgICAgPG9wdGdyb3VwIFtsYWJlbF09XCJvcHQubGFiZWxcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygb3B0Lmdyb3VwXCIgW25nVmFsdWVdPVwiY2hpbGQudmFsdWVcIiBbZGlzYWJsZWRdPVwiY2hpbGQuZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICB7eyBjaGlsZC5sYWJlbCB9fVxuICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgIDwvb3B0Z3JvdXA+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L3NlbGVjdD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkTmF0aXZlU2VsZWN0IGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxOYXRpdmVTZWxlY3RQcm9wcz4+IHt9XG4iXX0=