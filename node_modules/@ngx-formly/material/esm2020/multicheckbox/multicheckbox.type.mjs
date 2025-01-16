import { Component, ChangeDetectionStrategy, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { FieldType } from '@ngx-formly/material/form-field';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/checkbox";
import * as i2 from "@angular/common";
import * as i3 from "@ngx-formly/core";
import * as i4 from "@ngx-formly/core/select";
export class FormlyFieldMultiCheckbox extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                hideFieldUnderline: true,
                floatLabel: 'always',
                color: 'accent', // workaround for https://github.com/angular/components/issues/18465
            },
        };
    }
    onChange(value, checked) {
        this.formControl.markAsDirty();
        if (this.props.type === 'array') {
            this.formControl.patchValue(checked
                ? [...(this.formControl.value || []), value]
                : [...(this.formControl.value || [])].filter((o) => o !== value));
        }
        else {
            this.formControl.patchValue({ ...this.formControl.value, [value]: checked });
        }
        this.formControl.markAsTouched();
    }
    // TODO: find a solution to prevent scroll on focus
    onContainerClick() { }
    isChecked(option) {
        const value = this.formControl.value;
        return value && (this.props.type === 'array' ? value.indexOf(option.value) !== -1 : value[option.value]);
    }
}
FormlyFieldMultiCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldMultiCheckbox, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldMultiCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldMultiCheckbox, selector: "formly-field-mat-multicheckbox", host: { properties: { "id": "id" } }, viewQueries: [{ propertyName: "checkboxes", predicate: MatCheckbox, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index">
      <mat-checkbox
        [id]="id + '_' + i"
        [formlyAttributes]="field"
        [tabIndex]="props.tabindex"
        [color]="props.color"
        [labelPosition]="props.labelPosition"
        [checked]="isChecked(option)"
        [disabled]="formControl.disabled || option.disabled"
        (change)="onChange(option.value, $event.checked)"
      >
        {{ option.label }}
      </mat-checkbox>
    </ng-container>
  `, isInline: true, components: [{ type: i1.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "aria-describedby", "id", "required", "labelPosition", "name", "value", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }], pipes: { "async": i2.AsyncPipe, "formlySelectOptions": i4.FormlySelectOptionsPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldMultiCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-mat-multicheckbox',
                    template: `
    <ng-container *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index">
      <mat-checkbox
        [id]="id + '_' + i"
        [formlyAttributes]="field"
        [tabIndex]="props.tabindex"
        [color]="props.color"
        [labelPosition]="props.labelPosition"
        [checked]="isChecked(option)"
        [disabled]="formControl.disabled || option.disabled"
        (change)="onChange(option.value, $event.checked)"
      >
        {{ option.label }}
      </mat-checkbox>
    </ng-container>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[id]': 'id',
                    },
                }]
        }], propDecorators: { checkboxes: [{
                type: ViewChildren,
                args: [MatCheckbox]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGljaGVja2JveC50eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL21hdGVyaWFsL211bHRpY2hlY2tib3gvc3JjL211bHRpY2hlY2tib3gudHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFBbUIsTUFBTSxlQUFlLENBQUM7QUFFbEcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0saUNBQWlDLENBQUM7Ozs7OztBQWlDOUUsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFNBQThDO0lBdkI1Rjs7UUEwQlcsbUJBQWMsR0FBRztZQUN4QixLQUFLLEVBQUU7Z0JBQ0wsa0JBQWtCLEVBQUUsSUFBSTtnQkFDeEIsVUFBVSxFQUFFLFFBQWlCO2dCQUM3QixLQUFLLEVBQUUsUUFBaUIsRUFBRSxvRUFBb0U7YUFDL0Y7U0FDRixDQUFDO0tBd0JIO0lBdEJDLFFBQVEsQ0FBQyxLQUFVLEVBQUUsT0FBZ0I7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FDekIsT0FBTztnQkFDTCxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FDbkUsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQzlFO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsbURBQW1EO0lBQzFDLGdCQUFnQixLQUFJLENBQUM7SUFFOUIsU0FBUyxDQUFDLE1BQVc7UUFDbkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFFckMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0csQ0FBQzs7c0hBaENVLHdCQUF3QjswR0FBeEIsd0JBQXdCLDJJQUNyQixXQUFXLHVFQXRCZjs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7NEZBTVUsd0JBQXdCO2tCQXZCcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLElBQUk7cUJBQ2I7aUJBQ0Y7OEJBRTRCLFVBQVU7c0JBQXBDLFlBQVk7dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdDaGlsZHJlbiwgUXVlcnlMaXN0LCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGVDb25maWcsIEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBNYXRDaGVja2JveCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRm9ybWx5RmllbGRQcm9wcyB9IGZyb20gJ0BuZ3gtZm9ybWx5L21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuXG5pbnRlcmZhY2UgTXVsdGlDaGVja2JveFByb3BzIGV4dGVuZHMgRm9ybWx5RmllbGRQcm9wcyB7XG4gIGxhYmVsUG9zaXRpb24/OiAnYmVmb3JlJyB8ICdhZnRlcic7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5TXVsdGlDaGVja2JveEZpZWxkQ29uZmlnIGV4dGVuZHMgRm9ybWx5RmllbGRDb25maWc8TXVsdGlDaGVja2JveFByb3BzPiB7XG4gIHR5cGU6ICdtdWx0aWNoZWNrYm94JyB8IFR5cGU8Rm9ybWx5RmllbGRNdWx0aUNoZWNrYm94Pjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkLW1hdC1tdWx0aWNoZWNrYm94JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcHMub3B0aW9ucyB8IGZvcm1seVNlbGVjdE9wdGlvbnMgOiBmaWVsZCB8IGFzeW5jOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgIFtpZF09XCJpZCArICdfJyArIGlcIlxuICAgICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiXG4gICAgICAgIFt0YWJJbmRleF09XCJwcm9wcy50YWJpbmRleFwiXG4gICAgICAgIFtjb2xvcl09XCJwcm9wcy5jb2xvclwiXG4gICAgICAgIFtsYWJlbFBvc2l0aW9uXT1cInByb3BzLmxhYmVsUG9zaXRpb25cIlxuICAgICAgICBbY2hlY2tlZF09XCJpc0NoZWNrZWQob3B0aW9uKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJmb3JtQ29udHJvbC5kaXNhYmxlZCB8fCBvcHRpb24uZGlzYWJsZWRcIlxuICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKG9wdGlvbi52YWx1ZSwgJGV2ZW50LmNoZWNrZWQpXCJcbiAgICAgID5cbiAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgICA8L21hdC1jaGVja2JveD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnW2lkXSc6ICdpZCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkTXVsdGlDaGVja2JveCBleHRlbmRzIEZpZWxkVHlwZTxGaWVsZFR5cGVDb25maWc8TXVsdGlDaGVja2JveFByb3BzPj4ge1xuICBAVmlld0NoaWxkcmVuKE1hdENoZWNrYm94KSBjaGVja2JveGVzITogUXVlcnlMaXN0PE1hdENoZWNrYm94PjtcblxuICBvdmVycmlkZSBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgaGlkZUZpZWxkVW5kZXJsaW5lOiB0cnVlLFxuICAgICAgZmxvYXRMYWJlbDogJ2Fsd2F5cycgYXMgY29uc3QsXG4gICAgICBjb2xvcjogJ2FjY2VudCcgYXMgY29uc3QsIC8vIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzE4NDY1XG4gICAgfSxcbiAgfTtcblxuICBvbkNoYW5nZSh2YWx1ZTogYW55LCBjaGVja2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5mb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wucGF0Y2hWYWx1ZShcbiAgICAgICAgY2hlY2tlZFxuICAgICAgICAgID8gWy4uLih0aGlzLmZvcm1Db250cm9sLnZhbHVlIHx8IFtdKSwgdmFsdWVdXG4gICAgICAgICAgOiBbLi4uKHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgfHwgW10pXS5maWx0ZXIoKG8pID0+IG8gIT09IHZhbHVlKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wucGF0Y2hWYWx1ZSh7IC4uLnRoaXMuZm9ybUNvbnRyb2wudmFsdWUsIFt2YWx1ZV06IGNoZWNrZWQgfSk7XG4gICAgfVxuICAgIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICB9XG5cbiAgLy8gVE9ETzogZmluZCBhIHNvbHV0aW9uIHRvIHByZXZlbnQgc2Nyb2xsIG9uIGZvY3VzXG4gIG92ZXJyaWRlIG9uQ29udGFpbmVyQ2xpY2soKSB7fVxuXG4gIGlzQ2hlY2tlZChvcHRpb246IGFueSkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZTtcblxuICAgIHJldHVybiB2YWx1ZSAmJiAodGhpcy5wcm9wcy50eXBlID09PSAnYXJyYXknID8gdmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpICE9PSAtMSA6IHZhbHVlW29wdGlvbi52YWx1ZV0pO1xuICB9XG59XG4iXX0=