import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatRadioGroup } from '@angular/material/radio';
import { ɵobserve as observe } from '@ngx-formly/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/radio";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
import * as i4 from "@angular/common";
import * as i5 from "@ngx-formly/core/select";
export class FormlyFieldRadio extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                hideFieldUnderline: true,
                floatLabel: 'always',
                tabindex: -1,
            },
        };
    }
    ngAfterViewInit() {
        this.focusObserver = observe(this.field, ['focus'], ({ currentValue }) => {
            if (this.props.tabindex === -1 && currentValue && this.radioGroup._radios.length > 0) {
                // https://github.com/ngx-formly/ngx-formly/issues/2498
                setTimeout(() => {
                    const radio = this.radioGroup.selected ? this.radioGroup.selected : this.radioGroup._radios.first;
                    radio.focus();
                });
            }
        });
    }
    // TODO: find a solution to prevent scroll on focus
    onContainerClick() { }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.focusObserver && this.focusObserver.unsubscribe();
    }
}
FormlyFieldRadio.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldRadio, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldRadio.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldRadio, selector: "formly-field-mat-radio", viewQueries: [{ propertyName: "radioGroup", first: true, predicate: MatRadioGroup, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: `
    <mat-radio-group
      [formControl]="formControl"
      [formlyAttributes]="field"
      [required]="required"
      [tabindex]="props.tabindex"
    >
      <mat-radio-button
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        [id]="id + '_' + i"
        [color]="props.color"
        [labelPosition]="props.labelPosition"
        [disabled]="option.disabled"
        [value]="option.value"
      >
        {{ option.label }}
      </mat-radio-button>
    </mat-radio-group>
  `, isInline: true, components: [{ type: i1.MatRadioButton, selector: "mat-radio-button", inputs: ["disableRipple", "tabIndex"], exportAs: ["matRadioButton"] }], directives: [{ type: i1.MatRadioGroup, selector: "mat-radio-group", exportAs: ["matRadioGroup"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i4.AsyncPipe, "formlySelectOptions": i5.FormlySelectOptionsPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldRadio, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-mat-radio',
                    template: `
    <mat-radio-group
      [formControl]="formControl"
      [formlyAttributes]="field"
      [required]="required"
      [tabindex]="props.tabindex"
    >
      <mat-radio-button
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        [id]="id + '_' + i"
        [color]="props.color"
        [labelPosition]="props.labelPosition"
        [disabled]="option.disabled"
        [value]="option.value"
      >
        {{ option.label }}
      </mat-radio-button>
    </mat-radio-group>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { radioGroup: [{
                type: ViewChild,
                args: [MatRadioGroup, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8udHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9tYXRlcmlhbC9yYWRpby9zcmMvcmFkaW8udHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBa0MsTUFBTSxlQUFlLENBQUM7QUFFOUcsT0FBTyxFQUFFLFNBQVMsRUFBb0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsSUFBSSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7OztBQWlDdkQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFNBQXNDO0lBdkI1RTs7UUF5QlcsbUJBQWMsR0FBRztZQUN4QixLQUFLLEVBQUU7Z0JBQ0wsa0JBQWtCLEVBQUUsSUFBSTtnQkFDeEIsVUFBVSxFQUFFLFFBQWlCO2dCQUM3QixRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ2I7U0FDRixDQUFDO0tBc0JIO0lBbkJDLGVBQWU7UUFDYixJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUU7WUFDdkUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEYsdURBQXVEO2dCQUN2RCxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUNsRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxtREFBbUQ7SUFDMUMsZ0JBQWdCLEtBQUksQ0FBQztJQUVyQixXQUFXO1FBQ2xCLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekQsQ0FBQzs7OEdBN0JVLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLDBHQUNoQixhQUFhLHFGQXRCZDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JUOzRGQUdVLGdCQUFnQjtrQkF2QjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhCQUU2QyxVQUFVO3NCQUFyRCxTQUFTO3VCQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlQ29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGb3JtbHlGaWVsZFByb3BzIH0gZnJvbSAnQG5neC1mb3JtbHkvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRSYWRpb0dyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nO1xuaW1wb3J0IHsgybVvYnNlcnZlIGFzIG9ic2VydmUgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuaW50ZXJmYWNlIFJhZGlvUHJvcHMgZXh0ZW5kcyBGb3JtbHlGaWVsZFByb3BzIHtcbiAgbGFiZWxQb3NpdGlvbj86ICdiZWZvcmUnIHwgJ2FmdGVyJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlSYWRpb0ZpZWxkQ29uZmlnIGV4dGVuZHMgRm9ybWx5RmllbGRDb25maWc8UmFkaW9Qcm9wcz4ge1xuICB0eXBlOiAncmFkaW8nIHwgVHlwZTxGb3JtbHlGaWVsZFJhZGlvPjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkLW1hdC1yYWRpbycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG1hdC1yYWRpby1ncm91cFxuICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCJcbiAgICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICBbdGFiaW5kZXhdPVwicHJvcHMudGFiaW5kZXhcIlxuICAgID5cbiAgICAgIDxtYXQtcmFkaW8tYnV0dG9uXG4gICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcHMub3B0aW9ucyB8IGZvcm1seVNlbGVjdE9wdGlvbnMgOiBmaWVsZCB8IGFzeW5jOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgW2lkXT1cImlkICsgJ18nICsgaVwiXG4gICAgICAgIFtjb2xvcl09XCJwcm9wcy5jb2xvclwiXG4gICAgICAgIFtsYWJlbFBvc2l0aW9uXT1cInByb3BzLmxhYmVsUG9zaXRpb25cIlxuICAgICAgICBbZGlzYWJsZWRdPVwib3B0aW9uLmRpc2FibGVkXCJcbiAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiXG4gICAgICA+XG4gICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgPC9tYXQtcmFkaW8tYnV0dG9uPlxuICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RmllbGRSYWRpbyBleHRlbmRzIEZpZWxkVHlwZTxGaWVsZFR5cGVDb25maWc8UmFkaW9Qcm9wcz4+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZChNYXRSYWRpb0dyb3VwLCB7IHN0YXRpYzogdHJ1ZSB9KSByYWRpb0dyb3VwITogTWF0UmFkaW9Hcm91cDtcbiAgb3ZlcnJpZGUgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgIGhpZGVGaWVsZFVuZGVybGluZTogdHJ1ZSxcbiAgICAgIGZsb2F0TGFiZWw6ICdhbHdheXMnIGFzIGNvbnN0LFxuICAgICAgdGFiaW5kZXg6IC0xLFxuICAgIH0sXG4gIH07XG5cbiAgcHJpdmF0ZSBmb2N1c09ic2VydmVyITogUmV0dXJuVHlwZTx0eXBlb2Ygb2JzZXJ2ZT47XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmZvY3VzT2JzZXJ2ZXIgPSBvYnNlcnZlKHRoaXMuZmllbGQsIFsnZm9jdXMnXSwgKHsgY3VycmVudFZhbHVlIH0pID0+IHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnRhYmluZGV4ID09PSAtMSAmJiBjdXJyZW50VmFsdWUgJiYgdGhpcy5yYWRpb0dyb3VwLl9yYWRpb3MubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmd4LWZvcm1seS9uZ3gtZm9ybWx5L2lzc3Vlcy8yNDk4XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJhZGlvID0gdGhpcy5yYWRpb0dyb3VwLnNlbGVjdGVkID8gdGhpcy5yYWRpb0dyb3VwLnNlbGVjdGVkIDogdGhpcy5yYWRpb0dyb3VwLl9yYWRpb3MuZmlyc3Q7XG4gICAgICAgICAgcmFkaW8uZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBUT0RPOiBmaW5kIGEgc29sdXRpb24gdG8gcHJldmVudCBzY3JvbGwgb24gZm9jdXNcbiAgb3ZlcnJpZGUgb25Db250YWluZXJDbGljaygpIHt9XG5cbiAgb3ZlcnJpZGUgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLmZvY3VzT2JzZXJ2ZXIgJiYgdGhpcy5mb2N1c09ic2VydmVyLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==