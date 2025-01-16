import { Component, ChangeDetectionStrategy, ViewChild, } from '@angular/core';
import { ɵobserve as observe } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material/form-field';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
import * as i2 from "@angular/material/datepicker";
import * as i3 from "@angular/material/input";
import * as i4 from "@angular/forms";
export class FormlyFieldDatepicker extends FieldType {
    constructor(config, cdRef) {
        super();
        this.config = config;
        this.cdRef = cdRef;
        this.defaultOptions = {
            props: {
                datepickerOptions: {
                    startView: 'month',
                    datepickerTogglePosition: 'suffix',
                    disabled: false,
                    opened: false,
                    dateInput: () => { },
                    dateChange: () => { },
                    monthSelected: () => { },
                    yearSelected: () => { },
                },
            },
        };
    }
    detectChanges() {
        this.options.detectChanges?.(this.field);
    }
    ngAfterViewInit() {
        this.props[this.props.datepickerOptions.datepickerTogglePosition] = this.datepickerToggle;
        observe(this.field, ['props', 'datepickerOptions', 'opened'], () => {
            this.cdRef.detectChanges();
        });
        // temporary fix for https://github.com/angular/components/issues/16761
        if (this.config.getValidatorMessage('matDatepickerParse')) {
            this.fieldErrorsObserver = observe(this.field, ['formControl', 'errors'], ({ currentValue }) => {
                if (currentValue && currentValue.required && currentValue.matDatepickerParse) {
                    const errors = Object.keys(currentValue)
                        .sort((prop) => (prop === 'matDatepickerParse' ? -1 : 0))
                        .reduce((errors, prop) => ({ ...errors, [prop]: currentValue[prop] }), {});
                    this.fieldErrorsObserver?.setValue(errors);
                }
            });
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.fieldErrorsObserver?.unsubscribe();
    }
}
FormlyFieldDatepicker.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldDatepicker, deps: [{ token: i1.FormlyConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
FormlyFieldDatepicker.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldDatepicker, selector: "formly-field-mat-datepicker", viewQueries: [{ propertyName: "datepickerToggle", first: true, predicate: ["datepickerToggle"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: `
    <input
      matInput
      [id]="id"
      [name]="field.name"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [matDatepicker]="picker"
      [matDatepickerFilter]="props.datepickerOptions.filter"
      [max]="props.datepickerOptions.max"
      [min]="props.datepickerOptions.min"
      [formlyAttributes]="field"
      [placeholder]="props.placeholder"
      [tabindex]="props.tabindex"
      [readonly]="props.readonly"
      [required]="required"
      (dateInput)="props.datepickerOptions.dateInput(field, $event)"
      (dateChange)="props.datepickerOptions.dateChange(field, $event)"
    />
    <ng-template #datepickerToggle>
      <mat-datepicker-toggle
        (click)="detectChanges()"
        [disabled]="props.disabled"
        [for]="picker"
      ></mat-datepicker-toggle>
    </ng-template>
    <mat-datepicker
      #picker
      [color]="props.color"
      [dateClass]="props.datepickerOptions.dateClass"
      [disabled]="props.datepickerOptions.disabled"
      [opened]="props.datepickerOptions.opened"
      [panelClass]="props.datepickerOptions.panelClass"
      [startAt]="props.datepickerOptions.startAt"
      [startView]="props.datepickerOptions.startView"
      [touchUi]="props.datepickerOptions.touchUi"
      [calendarHeaderComponent]="props.datepickerOptions.calendarHeaderComponent"
      (monthSelected)="props.datepickerOptions.monthSelected(field, $event, picker)"
      (yearSelected)="props.datepickerOptions.yearSelected(field, $event, picker)"
      (opened)="props.datepickerOptions.opened = true"
      (closed)="props.datepickerOptions.opened = false"
    >
    </mat-datepicker>
  `, isInline: true, components: [{ type: i2.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { type: i2.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }], directives: [{ type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i1.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldDatepicker, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-mat-datepicker',
                    template: `
    <input
      matInput
      [id]="id"
      [name]="field.name"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [matDatepicker]="picker"
      [matDatepickerFilter]="props.datepickerOptions.filter"
      [max]="props.datepickerOptions.max"
      [min]="props.datepickerOptions.min"
      [formlyAttributes]="field"
      [placeholder]="props.placeholder"
      [tabindex]="props.tabindex"
      [readonly]="props.readonly"
      [required]="required"
      (dateInput)="props.datepickerOptions.dateInput(field, $event)"
      (dateChange)="props.datepickerOptions.dateChange(field, $event)"
    />
    <ng-template #datepickerToggle>
      <mat-datepicker-toggle
        (click)="detectChanges()"
        [disabled]="props.disabled"
        [for]="picker"
      ></mat-datepicker-toggle>
    </ng-template>
    <mat-datepicker
      #picker
      [color]="props.color"
      [dateClass]="props.datepickerOptions.dateClass"
      [disabled]="props.datepickerOptions.disabled"
      [opened]="props.datepickerOptions.opened"
      [panelClass]="props.datepickerOptions.panelClass"
      [startAt]="props.datepickerOptions.startAt"
      [startView]="props.datepickerOptions.startView"
      [touchUi]="props.datepickerOptions.touchUi"
      [calendarHeaderComponent]="props.datepickerOptions.calendarHeaderComponent"
      (monthSelected)="props.datepickerOptions.monthSelected(field, $event, picker)"
      (yearSelected)="props.datepickerOptions.yearSelected(field, $event, picker)"
      (opened)="props.datepickerOptions.opened = true"
      (closed)="props.datepickerOptions.opened = false"
    >
    </mat-datepicker>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.FormlyConfig }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { datepickerToggle: [{
                type: ViewChild,
                args: ['datepickerToggle', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci50eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL21hdGVyaWFsL2RhdGVwaWNrZXIvc3JjL2RhdGVwaWNrZXIudHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixTQUFTLEdBTVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFvRCxRQUFRLElBQUksT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDekcsT0FBTyxFQUFFLFNBQVMsRUFBb0IsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7O0FBK0U5RSxNQUFNLE9BQU8scUJBQ1gsU0FBUSxTQUEyQztJQXFCbkQsWUFBb0IsTUFBb0IsRUFBVSxLQUF3QjtRQUN4RSxLQUFLLEVBQUUsQ0FBQztRQURVLFdBQU0sR0FBTixNQUFNLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQWhCakUsbUJBQWMsR0FBRztZQUN4QixLQUFLLEVBQUU7Z0JBQ0wsaUJBQWlCLEVBQUU7b0JBQ2pCLFNBQVMsRUFBRSxPQUFnQjtvQkFDM0Isd0JBQXdCLEVBQUUsUUFBaUI7b0JBQzNDLFFBQVEsRUFBRSxLQUFLO29CQUNmLE1BQU0sRUFBRSxLQUFLO29CQUNiLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO29CQUNuQixVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQztvQkFDcEIsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO2lCQUN2QjthQUNGO1NBQ0YsQ0FBQztJQUtGLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsd0JBQXdCLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDMUYsT0FBTyxDQUFVLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFO1lBQzFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCx1RUFBdUU7UUFDdkUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDekQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFO2dCQUNsRyxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxrQkFBa0IsRUFBRTtvQkFDNUUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7eUJBQ3JDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDeEQsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFFN0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDNUM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVRLFdBQVc7UUFDbEIsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDOzttSEFyRFUscUJBQXFCO3VHQUFyQixxQkFBcUIsOE5BOUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDVDs0RkFHVSxxQkFBcUI7a0JBaERqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7bUlBS2tELGdCQUFnQjtzQkFBaEUsU0FBUzt1QkFBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBUeXBlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZUNvbmZpZywgRm9ybWx5Q29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZywgybVvYnNlcnZlIGFzIG9ic2VydmUgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRm9ybWx5RmllbGRQcm9wcyB9IGZyb20gJ0BuZ3gtZm9ybWx5L21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgTWF0Q2FsZW5kYXJDZWxsQ2xhc3NGdW5jdGlvbiwgTWF0RGF0ZXBpY2tlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xuXG5pbnRlcmZhY2UgRGF0ZXBpY2tlclByb3BzIGV4dGVuZHMgRm9ybWx5RmllbGRQcm9wcyB7XG4gIGRhdGVwaWNrZXJPcHRpb25zPzogUGFydGlhbDx7XG4gICAgdG91Y2hVaTogYm9vbGVhbjtcbiAgICBvcGVuZWQ6IGJvb2xlYW47XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgc3RhcnRWaWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXInO1xuICAgIGRhdGVwaWNrZXJUb2dnbGVQb3NpdGlvbjogJ3N1ZmZpeCcgfCAncHJlZml4JztcbiAgICBjYWxlbmRhckhlYWRlckNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxhbnk+O1xuICAgIGZpbHRlcjogKGRhdGU6IGFueSB8IG51bGwpID0+IGJvb2xlYW47XG4gICAgbWluOiBhbnk7XG4gICAgbWF4OiBhbnk7XG4gICAgZGF0ZUlucHV0OiAoZmllbGQ6IEZpZWxkVHlwZUNvbmZpZzxEYXRlcGlja2VyUHJvcHM+LCBldmVudDogYW55KSA9PiB2b2lkO1xuICAgIGRhdGVDaGFuZ2U6IChmaWVsZDogRmllbGRUeXBlQ29uZmlnPERhdGVwaWNrZXJQcm9wcz4sIGV2ZW50OiBhbnkpID0+IHZvaWQ7XG5cbiAgICBtb250aFNlbGVjdGVkOiAoZmllbGQ6IEZpZWxkVHlwZUNvbmZpZzxEYXRlcGlja2VyUHJvcHM+LCBldmVudDogYW55LCBwaWNrZXI6IE1hdERhdGVwaWNrZXI8YW55PikgPT4gdm9pZDtcbiAgICB5ZWFyU2VsZWN0ZWQ6IChmaWVsZDogRmllbGRUeXBlQ29uZmlnPERhdGVwaWNrZXJQcm9wcz4sIGV2ZW50OiBhbnksIHBpY2tlcjogTWF0RGF0ZXBpY2tlcjxhbnk+KSA9PiB2b2lkO1xuXG4gICAgZGF0ZUNsYXNzOiBNYXRDYWxlbmRhckNlbGxDbGFzc0Z1bmN0aW9uPGFueT47XG4gICAgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW107XG4gICAgc3RhcnRBdDogYW55IHwgbnVsbDtcbiAgfT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5RGF0ZXBpY2tlckZpZWxkQ29uZmlnIGV4dGVuZHMgRm9ybWx5RmllbGRDb25maWc8RGF0ZXBpY2tlclByb3BzPiB7XG4gIHR5cGU6ICdkYXRlcGlja2VyJyB8IFR5cGU8Rm9ybWx5RmllbGREYXRlcGlja2VyPjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkLW1hdC1kYXRlcGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXRcbiAgICAgIG1hdElucHV0XG4gICAgICBbaWRdPVwiaWRcIlxuICAgICAgW25hbWVdPVwiZmllbGQubmFtZVwiXG4gICAgICBbZXJyb3JTdGF0ZU1hdGNoZXJdPVwiZXJyb3JTdGF0ZU1hdGNoZXJcIlxuICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiXG4gICAgICBbbWF0RGF0ZXBpY2tlckZpbHRlcl09XCJwcm9wcy5kYXRlcGlja2VyT3B0aW9ucy5maWx0ZXJcIlxuICAgICAgW21heF09XCJwcm9wcy5kYXRlcGlja2VyT3B0aW9ucy5tYXhcIlxuICAgICAgW21pbl09XCJwcm9wcy5kYXRlcGlja2VyT3B0aW9ucy5taW5cIlxuICAgICAgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cInByb3BzLnBsYWNlaG9sZGVyXCJcbiAgICAgIFt0YWJpbmRleF09XCJwcm9wcy50YWJpbmRleFwiXG4gICAgICBbcmVhZG9ubHldPVwicHJvcHMucmVhZG9ubHlcIlxuICAgICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgIChkYXRlSW5wdXQpPVwicHJvcHMuZGF0ZXBpY2tlck9wdGlvbnMuZGF0ZUlucHV0KGZpZWxkLCAkZXZlbnQpXCJcbiAgICAgIChkYXRlQ2hhbmdlKT1cInByb3BzLmRhdGVwaWNrZXJPcHRpb25zLmRhdGVDaGFuZ2UoZmllbGQsICRldmVudClcIlxuICAgIC8+XG4gICAgPG5nLXRlbXBsYXRlICNkYXRlcGlja2VyVG9nZ2xlPlxuICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZVxuICAgICAgICAoY2xpY2spPVwiZGV0ZWN0Q2hhbmdlcygpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cInByb3BzLmRpc2FibGVkXCJcbiAgICAgICAgW2Zvcl09XCJwaWNrZXJcIlxuICAgICAgPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG1hdC1kYXRlcGlja2VyXG4gICAgICAjcGlja2VyXG4gICAgICBbY29sb3JdPVwicHJvcHMuY29sb3JcIlxuICAgICAgW2RhdGVDbGFzc109XCJwcm9wcy5kYXRlcGlja2VyT3B0aW9ucy5kYXRlQ2xhc3NcIlxuICAgICAgW2Rpc2FibGVkXT1cInByb3BzLmRhdGVwaWNrZXJPcHRpb25zLmRpc2FibGVkXCJcbiAgICAgIFtvcGVuZWRdPVwicHJvcHMuZGF0ZXBpY2tlck9wdGlvbnMub3BlbmVkXCJcbiAgICAgIFtwYW5lbENsYXNzXT1cInByb3BzLmRhdGVwaWNrZXJPcHRpb25zLnBhbmVsQ2xhc3NcIlxuICAgICAgW3N0YXJ0QXRdPVwicHJvcHMuZGF0ZXBpY2tlck9wdGlvbnMuc3RhcnRBdFwiXG4gICAgICBbc3RhcnRWaWV3XT1cInByb3BzLmRhdGVwaWNrZXJPcHRpb25zLnN0YXJ0Vmlld1wiXG4gICAgICBbdG91Y2hVaV09XCJwcm9wcy5kYXRlcGlja2VyT3B0aW9ucy50b3VjaFVpXCJcbiAgICAgIFtjYWxlbmRhckhlYWRlckNvbXBvbmVudF09XCJwcm9wcy5kYXRlcGlja2VyT3B0aW9ucy5jYWxlbmRhckhlYWRlckNvbXBvbmVudFwiXG4gICAgICAobW9udGhTZWxlY3RlZCk9XCJwcm9wcy5kYXRlcGlja2VyT3B0aW9ucy5tb250aFNlbGVjdGVkKGZpZWxkLCAkZXZlbnQsIHBpY2tlcilcIlxuICAgICAgKHllYXJTZWxlY3RlZCk9XCJwcm9wcy5kYXRlcGlja2VyT3B0aW9ucy55ZWFyU2VsZWN0ZWQoZmllbGQsICRldmVudCwgcGlja2VyKVwiXG4gICAgICAob3BlbmVkKT1cInByb3BzLmRhdGVwaWNrZXJPcHRpb25zLm9wZW5lZCA9IHRydWVcIlxuICAgICAgKGNsb3NlZCk9XCJwcm9wcy5kYXRlcGlja2VyT3B0aW9ucy5vcGVuZWQgPSBmYWxzZVwiXG4gICAgPlxuICAgIDwvbWF0LWRhdGVwaWNrZXI+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZERhdGVwaWNrZXJcbiAgZXh0ZW5kcyBGaWVsZFR5cGU8RmllbGRUeXBlQ29uZmlnPERhdGVwaWNrZXJQcm9wcz4+XG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95XG57XG4gIEBWaWV3Q2hpbGQoJ2RhdGVwaWNrZXJUb2dnbGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBkYXRlcGlja2VyVG9nZ2xlITogVGVtcGxhdGVSZWY8YW55PjtcblxuICBvdmVycmlkZSBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgZGF0ZXBpY2tlck9wdGlvbnM6IHtcbiAgICAgICAgc3RhcnRWaWV3OiAnbW9udGgnIGFzIGNvbnN0LFxuICAgICAgICBkYXRlcGlja2VyVG9nZ2xlUG9zaXRpb246ICdzdWZmaXgnIGFzIGNvbnN0LFxuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIG9wZW5lZDogZmFsc2UsXG4gICAgICAgIGRhdGVJbnB1dDogKCkgPT4ge30sXG4gICAgICAgIGRhdGVDaGFuZ2U6ICgpID0+IHt9LFxuICAgICAgICBtb250aFNlbGVjdGVkOiAoKSA9PiB7fSxcbiAgICAgICAgeWVhclNlbGVjdGVkOiAoKSA9PiB7fSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbiAgcHJpdmF0ZSBmaWVsZEVycm9yc09ic2VydmVyITogUmV0dXJuVHlwZTx0eXBlb2Ygb2JzZXJ2ZT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IEZvcm1seUNvbmZpZywgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZGV0ZWN0Q2hhbmdlcygpIHtcbiAgICB0aGlzLm9wdGlvbnMuZGV0ZWN0Q2hhbmdlcz8uKHRoaXMuZmllbGQpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucHJvcHNbdGhpcy5wcm9wcy5kYXRlcGlja2VyT3B0aW9ucy5kYXRlcGlja2VyVG9nZ2xlUG9zaXRpb25dID0gdGhpcy5kYXRlcGlja2VyVG9nZ2xlO1xuICAgIG9ic2VydmU8Ym9vbGVhbj4odGhpcy5maWVsZCwgWydwcm9wcycsICdkYXRlcGlja2VyT3B0aW9ucycsICdvcGVuZWQnXSwgKCkgPT4ge1xuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICAvLyB0ZW1wb3JhcnkgZml4IGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xNjc2MVxuICAgIGlmICh0aGlzLmNvbmZpZy5nZXRWYWxpZGF0b3JNZXNzYWdlKCdtYXREYXRlcGlja2VyUGFyc2UnKSkge1xuICAgICAgdGhpcy5maWVsZEVycm9yc09ic2VydmVyID0gb2JzZXJ2ZTxhbnk+KHRoaXMuZmllbGQsIFsnZm9ybUNvbnRyb2wnLCAnZXJyb3JzJ10sICh7IGN1cnJlbnRWYWx1ZSB9KSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgJiYgY3VycmVudFZhbHVlLnJlcXVpcmVkICYmIGN1cnJlbnRWYWx1ZS5tYXREYXRlcGlja2VyUGFyc2UpIHtcbiAgICAgICAgICBjb25zdCBlcnJvcnMgPSBPYmplY3Qua2V5cyhjdXJyZW50VmFsdWUpXG4gICAgICAgICAgICAuc29ydCgocHJvcCkgPT4gKHByb3AgPT09ICdtYXREYXRlcGlja2VyUGFyc2UnID8gLTEgOiAwKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKGVycm9ycywgcHJvcCkgPT4gKHsgLi4uZXJyb3JzLCBbcHJvcF06IGN1cnJlbnRWYWx1ZVtwcm9wXSB9KSwge30pO1xuXG4gICAgICAgICAgdGhpcy5maWVsZEVycm9yc09ic2VydmVyPy5zZXRWYWx1ZShlcnJvcnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuZmllbGRFcnJvcnNPYnNlcnZlcj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19