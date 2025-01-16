import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/slide-toggle";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
export class FormlyFieldToggle extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                hideFieldUnderline: true,
                floatLabel: 'always',
                hideLabel: true,
            },
        };
    }
    onContainerClick(event) {
        this.slideToggle.focus();
        super.onContainerClick(event);
    }
}
FormlyFieldToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldToggle, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldToggle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldToggle, selector: "formly-field-mat-toggle", viewQueries: [{ propertyName: "slideToggle", first: true, predicate: MatSlideToggle, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: `
    <mat-slide-toggle
      [id]="id"
      [name]="field.name"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [color]="props.color"
      [tabIndex]="props.tabindex"
      [required]="required"
      [labelPosition]="props.labelPosition"
    >
      {{ props.label }}
    </mat-slide-toggle>
  `, isInline: true, components: [{ type: i1.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex", "name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "checked"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }], directives: [{ type: i1.MatSlideToggleRequiredValidator, selector: "mat-slide-toggle[required][formControlName],             mat-slide-toggle[required][formControl], mat-slide-toggle[required][ngModel]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldToggle, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-mat-toggle',
                    template: `
    <mat-slide-toggle
      [id]="id"
      [name]="field.name"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [color]="props.color"
      [tabIndex]="props.tabindex"
      [required]="required"
      [labelPosition]="props.labelPosition"
    >
      {{ props.label }}
    </mat-slide-toggle>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { slideToggle: [{
                type: ViewChild,
                args: [MatSlideToggle, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLnR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvbWF0ZXJpYWwvdG9nZ2xlL3NyYy90b2dnbGUudHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUVwRixPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7QUE0QmhFLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxTQUF1QztJQWxCOUU7O1FBb0JXLG1CQUFjLEdBQUc7WUFDeEIsS0FBSyxFQUFFO2dCQUNMLGtCQUFrQixFQUFFLElBQUk7Z0JBQ3hCLFVBQVUsRUFBRSxRQUFpQjtnQkFDN0IsU0FBUyxFQUFFLElBQUk7YUFDaEI7U0FDRixDQUFDO0tBTUg7SUFKVSxnQkFBZ0IsQ0FBQyxLQUFpQjtRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDOzsrR0FiVSxpQkFBaUI7bUdBQWpCLGlCQUFpQiw0R0FDakIsY0FBYyxxRkFqQmY7Ozs7Ozs7Ozs7Ozs7R0FhVDs0RkFHVSxpQkFBaUI7a0JBbEI3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztHQWFUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFFOEMsV0FBVztzQkFBdkQsU0FBUzt1QkFBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0NoaWxkLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGVDb25maWcsIEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZvcm1seUZpZWxkUHJvcHMgfSBmcm9tICdAbmd4LWZvcm1seS9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1hdFNsaWRlVG9nZ2xlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJztcblxuaW50ZXJmYWNlIFRvZ2dsZVByb3BzIGV4dGVuZHMgRm9ybWx5RmllbGRQcm9wcyB7XG4gIGxhYmVsUG9zaXRpb24/OiAnYmVmb3JlJyB8ICdhZnRlcic7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5VG9nZ2xlRmllbGRDb25maWcgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZzxUb2dnbGVQcm9wcz4ge1xuICB0eXBlOiAndG9nZ2xlJyB8IFR5cGU8Rm9ybWx5RmllbGRUb2dnbGU+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZmllbGQtbWF0LXRvZ2dsZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG1hdC1zbGlkZS10b2dnbGVcbiAgICAgIFtpZF09XCJpZFwiXG4gICAgICBbbmFtZV09XCJmaWVsZC5uYW1lXCJcbiAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiXG4gICAgICBbY29sb3JdPVwicHJvcHMuY29sb3JcIlxuICAgICAgW3RhYkluZGV4XT1cInByb3BzLnRhYmluZGV4XCJcbiAgICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICBbbGFiZWxQb3NpdGlvbl09XCJwcm9wcy5sYWJlbFBvc2l0aW9uXCJcbiAgICA+XG4gICAgICB7eyBwcm9wcy5sYWJlbCB9fVxuICAgIDwvbWF0LXNsaWRlLXRvZ2dsZT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkVG9nZ2xlIGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxUb2dnbGVQcm9wcz4+IHtcbiAgQFZpZXdDaGlsZChNYXRTbGlkZVRvZ2dsZSwgeyBzdGF0aWM6IHRydWUgfSkgc2xpZGVUb2dnbGUhOiBNYXRTbGlkZVRvZ2dsZTtcbiAgb3ZlcnJpZGUgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgIGhpZGVGaWVsZFVuZGVybGluZTogdHJ1ZSxcbiAgICAgIGZsb2F0TGFiZWw6ICdhbHdheXMnIGFzIGNvbnN0LFxuICAgICAgaGlkZUxhYmVsOiB0cnVlLFxuICAgIH0sXG4gIH07XG5cbiAgb3ZlcnJpZGUgb25Db250YWluZXJDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuc2xpZGVUb2dnbGUuZm9jdXMoKTtcbiAgICBzdXBlci5vbkNvbnRhaW5lckNsaWNrKGV2ZW50KTtcbiAgfVxufVxuIl19