import { Component, ViewChild, ChangeDetectionStrategy, } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/material/checkbox";
import * as i3 from "@angular/forms";
import * as i4 from "@ngx-formly/core";
import * as i5 from "@angular/common";
export class FormlyFieldCheckbox extends FieldType {
    constructor(renderer, focusMonitor) {
        super();
        this.renderer = renderer;
        this.focusMonitor = focusMonitor;
        this.defaultOptions = {
            props: {
                hideFieldUnderline: true,
                indeterminate: true,
                floatLabel: 'always',
                hideLabel: true,
                color: 'accent', // workaround for https://github.com/angular/components/issues/18465
            },
        };
    }
    onContainerClick(event) {
        this.checkbox.focus();
        super.onContainerClick(event);
    }
    ngAfterViewInit() {
        if (this.checkbox) {
            this.focusMonitor.monitor(this.checkbox._inputElement, true).subscribe((focusOrigin) => {
                this.field.focus = !!focusOrigin;
                this.stateChanges.next();
                if (focusOrigin) {
                    this.props.focus && this.props.focus(this.field);
                }
                else {
                    this.props.blur && this.props.blur(this.field);
                }
            });
        }
    }
    ngAfterViewChecked() {
        if (this.required !== this._required && this.checkbox && this.checkbox._inputElement) {
            this._required = this.required;
            const inputElement = this.checkbox._inputElement.nativeElement;
            if (this.required) {
                this.renderer.setAttribute(inputElement, 'required', 'required');
            }
            else {
                this.renderer.removeAttribute(inputElement, 'required');
            }
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.checkbox) {
            this.focusMonitor.stopMonitoring(this.checkbox._inputElement);
        }
    }
}
FormlyFieldCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldCheckbox, deps: [{ token: i0.Renderer2 }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
FormlyFieldCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldCheckbox, selector: "formly-field-mat-checkbox", viewQueries: [{ propertyName: "checkbox", first: true, predicate: MatCheckbox, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: `
    <mat-checkbox
      [formControl]="formControl"
      [id]="id"
      [name]="field.name"
      [formlyAttributes]="field"
      [tabIndex]="props.tabindex"
      [indeterminate]="props.indeterminate && formControl.value == null"
      [color]="props.color"
      [labelPosition]="props.labelPosition"
    >
      {{ props.label }}
      <span
        *ngIf="props.required && props.hideRequiredMarker !== true"
        aria-hidden="true"
        class="mat-form-field-required-marker mat-mdc-form-field-required-marker"
        >*</span
      >
    </mat-checkbox>
  `, isInline: true, components: [{ type: i2.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "aria-describedby", "id", "required", "labelPosition", "name", "value", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }], directives: [{ type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-mat-checkbox',
                    template: `
    <mat-checkbox
      [formControl]="formControl"
      [id]="id"
      [name]="field.name"
      [formlyAttributes]="field"
      [tabIndex]="props.tabindex"
      [indeterminate]="props.indeterminate && formControl.value == null"
      [color]="props.color"
      [labelPosition]="props.labelPosition"
    >
      {{ props.label }}
      <span
        *ngIf="props.required && props.hideRequiredMarker !== true"
        aria-hidden="true"
        class="mat-form-field-required-marker mat-mdc-form-field-required-marker"
        >*</span
      >
    </mat-checkbox>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.FocusMonitor }]; }, propDecorators: { checkbox: [{
                type: ViewChild,
                args: [MatCheckbox, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9tYXRlcmlhbC9jaGVja2JveC9zcmMvY2hlY2tib3gudHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCx1QkFBdUIsR0FNeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBb0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7QUFvQ3pELE1BQU0sT0FBTyxtQkFDWCxTQUFRLFNBQXlDO0lBZWpELFlBQW9CLFFBQW1CLEVBQVUsWUFBMEI7UUFDekUsS0FBSyxFQUFFLENBQUM7UUFEVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFYbEUsbUJBQWMsR0FBRztZQUN4QixLQUFLLEVBQUU7Z0JBQ0wsa0JBQWtCLEVBQUUsSUFBSTtnQkFDeEIsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFVBQVUsRUFBRSxRQUFpQjtnQkFDN0IsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsS0FBSyxFQUFFLFFBQWlCLEVBQUUsb0VBQW9FO2FBQy9GO1NBQ0YsQ0FBQztJQUtGLENBQUM7SUFFUSxnQkFBZ0IsQ0FBQyxLQUFpQjtRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDckYsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQkFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxXQUFXLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsRDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUNwRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDL0IsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1lBQy9ELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNsRTtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDekQ7U0FDRjtJQUNILENBQUM7SUFFUSxXQUFXO1FBQ2xCLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMvRDtJQUNILENBQUM7O2lIQXhEVSxtQkFBbUI7cUdBQW5CLG1CQUFtQiwyR0FJbkIsV0FBVyxxRkExQlo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQ7NEZBR1UsbUJBQW1CO2tCQXhCL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzJIQUsyQyxRQUFRO3NCQUFqRCxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFJlbmRlcmVyMixcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgT25EZXN0cm95LFxuICBBZnRlclZpZXdJbml0LFxuICBUeXBlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRm9ybWx5RmllbGRQcm9wcyB9IGZyb20gJ0BuZ3gtZm9ybWx5L21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3ggfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5cbmludGVyZmFjZSBDaGVja2JveFByb3BzIGV4dGVuZHMgRm9ybWx5RmllbGRQcm9wcyB7XG4gIGluZGV0ZXJtaW5hdGU/OiBib29sZWFuO1xuICBsYWJlbFBvc2l0aW9uPzogJ2JlZm9yZScgfCAnYWZ0ZXInO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seUNoZWNrYm94RmllbGRDb25maWcgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZzxDaGVja2JveFByb3BzPiB7XG4gIHR5cGU6ICdjaGVja2JveCcgfCBUeXBlPEZvcm1seUZpZWxkQ2hlY2tib3g+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZmllbGQtbWF0LWNoZWNrYm94JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bWF0LWNoZWNrYm94XG4gICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgW2lkXT1cImlkXCJcbiAgICAgIFtuYW1lXT1cImZpZWxkLm5hbWVcIlxuICAgICAgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIlxuICAgICAgW3RhYkluZGV4XT1cInByb3BzLnRhYmluZGV4XCJcbiAgICAgIFtpbmRldGVybWluYXRlXT1cInByb3BzLmluZGV0ZXJtaW5hdGUgJiYgZm9ybUNvbnRyb2wudmFsdWUgPT0gbnVsbFwiXG4gICAgICBbY29sb3JdPVwicHJvcHMuY29sb3JcIlxuICAgICAgW2xhYmVsUG9zaXRpb25dPVwicHJvcHMubGFiZWxQb3NpdGlvblwiXG4gICAgPlxuICAgICAge3sgcHJvcHMubGFiZWwgfX1cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0lmPVwicHJvcHMucmVxdWlyZWQgJiYgcHJvcHMuaGlkZVJlcXVpcmVkTWFya2VyICE9PSB0cnVlXCJcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgY2xhc3M9XCJtYXQtZm9ybS1maWVsZC1yZXF1aXJlZC1tYXJrZXIgbWF0LW1kYy1mb3JtLWZpZWxkLXJlcXVpcmVkLW1hcmtlclwiXG4gICAgICAgID4qPC9zcGFuXG4gICAgICA+XG4gICAgPC9tYXQtY2hlY2tib3g+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZENoZWNrYm94XG4gIGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxDaGVja2JveFByb3BzPj5cbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3lcbntcbiAgQFZpZXdDaGlsZChNYXRDaGVja2JveCwgeyBzdGF0aWM6IHRydWUgfSkgY2hlY2tib3ghOiBNYXRDaGVja2JveDtcbiAgb3ZlcnJpZGUgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgIGhpZGVGaWVsZFVuZGVybGluZTogdHJ1ZSxcbiAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXG4gICAgICBmbG9hdExhYmVsOiAnYWx3YXlzJyBhcyBjb25zdCxcbiAgICAgIGhpZGVMYWJlbDogdHJ1ZSxcbiAgICAgIGNvbG9yOiAnYWNjZW50JyBhcyBjb25zdCwgLy8gd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9pc3N1ZXMvMTg0NjVcbiAgICB9LFxuICB9O1xuXG4gIHByaXZhdGUgX3JlcXVpcmVkITogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG9uQ29udGFpbmVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrYm94LmZvY3VzKCk7XG4gICAgc3VwZXIub25Db250YWluZXJDbGljayhldmVudCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3gpIHtcbiAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5jaGVja2JveC5faW5wdXRFbGVtZW50LCB0cnVlKS5zdWJzY3JpYmUoKGZvY3VzT3JpZ2luKSA9PiB7XG4gICAgICAgIHRoaXMuZmllbGQuZm9jdXMgPSAhIWZvY3VzT3JpZ2luO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIGlmIChmb2N1c09yaWdpbikge1xuICAgICAgICAgIHRoaXMucHJvcHMuZm9jdXMgJiYgdGhpcy5wcm9wcy5mb2N1cyh0aGlzLmZpZWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByb3BzLmJsdXIgJiYgdGhpcy5wcm9wcy5ibHVyKHRoaXMuZmllbGQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMucmVxdWlyZWQgIT09IHRoaXMuX3JlcXVpcmVkICYmIHRoaXMuY2hlY2tib3ggJiYgdGhpcy5jaGVja2JveC5faW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLl9yZXF1aXJlZCA9IHRoaXMucmVxdWlyZWQ7XG4gICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSB0aGlzLmNoZWNrYm94Ll9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgIGlmICh0aGlzLnJlcXVpcmVkKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0RWxlbWVudCwgJ3JlcXVpcmVkJywgJ3JlcXVpcmVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZShpbnB1dEVsZW1lbnQsICdyZXF1aXJlZCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgaWYgKHRoaXMuY2hlY2tib3gpIHtcbiAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuY2hlY2tib3guX2lucHV0RWxlbWVudCk7XG4gICAgfVxuICB9XG59XG4iXX0=