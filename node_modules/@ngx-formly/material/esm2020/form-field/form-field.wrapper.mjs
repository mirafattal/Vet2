import { Component, ViewChild, ViewEncapsulation, } from '@angular/core';
import { ɵdefineHiddenProp as defineHiddenProp, FieldWrapper, } from '@ngx-formly/core';
import { MatFormField } from '@angular/material/form-field';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/material/form-field";
import * as i3 from "@ngx-formly/core";
import * as i4 from "@angular/common";
export class FormlyWrapperFormField extends FieldWrapper {
    constructor(renderer, elementRef, focusMonitor) {
        super();
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
    }
    ngOnInit() {
        defineHiddenProp(this.field, '_formField', this.formField);
        this.focusMonitor.monitor(this.elementRef, true).subscribe((origin) => {
            if (!origin && this.field.focus) {
                this.field.focus = false;
            }
        });
    }
    ngAfterViewInit() {
        // temporary fix for https://github.com/angular/material2/issues/7891
        if (this.formField.appearance !== 'outline' && this.props.hideFieldUnderline === true) {
            const underlineElement = this.formField._elementRef.nativeElement.querySelector('.mat-form-field-underline');
            underlineElement && this.renderer.removeChild(underlineElement.parentNode, underlineElement);
        }
    }
    ngOnDestroy() {
        delete this.field._formField;
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
}
FormlyWrapperFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyWrapperFormField, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
FormlyWrapperFormField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyWrapperFormField, selector: "formly-wrapper-mat-form-field", viewQueries: [{ propertyName: "formField", first: true, predicate: MatFormField, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: `
    <!-- fix https://github.com/angular/material2/pull/7083 by setting width to 100% -->
    <mat-form-field
      [hideRequiredMarker]="true"
      [floatLabel]="props.floatLabel"
      [appearance]="props.appearance"
      [subscriptSizing]="props.subscriptSizing"
      [color]="props.color ?? 'primary'"
    >
      <ng-container #fieldComponent></ng-container>
      <mat-label *ngIf="props.label && props.hideLabel !== true">
        {{ props.label }}
        <span
          *ngIf="props.required && props.hideRequiredMarker !== true"
          aria-hidden="true"
          class="mat-form-field-required-marker mat-mdc-form-field-required-marker"
          >*</span
        >
      </mat-label>

      <ng-container matTextPrefix *ngIf="props.textPrefix">
        <ng-container [ngTemplateOutlet]="props.textPrefix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <ng-container matPrefix *ngIf="props.prefix">
        <ng-container [ngTemplateOutlet]="props.prefix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <ng-container matTextSuffix *ngIf="props.textSuffix">
        <ng-container [ngTemplateOutlet]="props.textSuffix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <ng-container matSuffix *ngIf="props.suffix">
        <ng-container [ngTemplateOutlet]="props.suffix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <mat-error>
        <formly-validation-message [field]="field"></formly-validation-message>
      </mat-error>

      <mat-hint *ngIf="props.description || props.hintStart as hint">
        <ng-container [ngTemplateOutlet]="stringOrTemplate" [ngTemplateOutletContext]="{ content: hint }">
        </ng-container>
      </mat-hint>

      <mat-hint *ngIf="props.hintEnd as hintEnd" align="end">
        <ng-container [ngTemplateOutlet]="stringOrTemplate" [ngTemplateOutletContext]="{ content: hintEnd }">
        </ng-container>
      </mat-hint>
    </mat-form-field>

    <ng-template #stringOrTemplate let-content="content">
      <ng-container *ngIf="!content.createEmbeddedView; else template">{{ content }}</ng-container>
      <ng-template #template>
        <ng-container [ngTemplateOutlet]="content" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-template>
    </ng-template>
  `, isInline: true, styles: ["formly-wrapper-mat-form-field .mat-mdc-form-field,formly-wrapper-mat-form-field .mat-form-field{width:100%}\n"], components: [{ type: i2.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3.ɵFormlyValidationMessage, selector: "formly-validation-message", inputs: ["field"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatLabel, selector: "mat-label" }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.MatPrefix, selector: "[matPrefix]" }, { type: i2.MatSuffix, selector: "[matSuffix]" }, { type: i2.MatError, selector: "mat-error", inputs: ["id"] }, { type: i2.MatHint, selector: "mat-hint", inputs: ["align", "id"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyWrapperFormField, decorators: [{
            type: Component,
            args: [{ selector: 'formly-wrapper-mat-form-field', template: `
    <!-- fix https://github.com/angular/material2/pull/7083 by setting width to 100% -->
    <mat-form-field
      [hideRequiredMarker]="true"
      [floatLabel]="props.floatLabel"
      [appearance]="props.appearance"
      [subscriptSizing]="props.subscriptSizing"
      [color]="props.color ?? 'primary'"
    >
      <ng-container #fieldComponent></ng-container>
      <mat-label *ngIf="props.label && props.hideLabel !== true">
        {{ props.label }}
        <span
          *ngIf="props.required && props.hideRequiredMarker !== true"
          aria-hidden="true"
          class="mat-form-field-required-marker mat-mdc-form-field-required-marker"
          >*</span
        >
      </mat-label>

      <ng-container matTextPrefix *ngIf="props.textPrefix">
        <ng-container [ngTemplateOutlet]="props.textPrefix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <ng-container matPrefix *ngIf="props.prefix">
        <ng-container [ngTemplateOutlet]="props.prefix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <ng-container matTextSuffix *ngIf="props.textSuffix">
        <ng-container [ngTemplateOutlet]="props.textSuffix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <ng-container matSuffix *ngIf="props.suffix">
        <ng-container [ngTemplateOutlet]="props.suffix" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-container>

      <mat-error>
        <formly-validation-message [field]="field"></formly-validation-message>
      </mat-error>

      <mat-hint *ngIf="props.description || props.hintStart as hint">
        <ng-container [ngTemplateOutlet]="stringOrTemplate" [ngTemplateOutletContext]="{ content: hint }">
        </ng-container>
      </mat-hint>

      <mat-hint *ngIf="props.hintEnd as hintEnd" align="end">
        <ng-container [ngTemplateOutlet]="stringOrTemplate" [ngTemplateOutletContext]="{ content: hintEnd }">
        </ng-container>
      </mat-hint>
    </mat-form-field>

    <ng-template #stringOrTemplate let-content="content">
      <ng-container *ngIf="!content.createEmbeddedView; else template">{{ content }}</ng-container>
      <ng-template #template>
        <ng-container [ngTemplateOutlet]="content" [ngTemplateOutletContext]="{ field: field }"></ng-container>
      </ng-template>
    </ng-template>
  `, encapsulation: ViewEncapsulation.None, styles: ["formly-wrapper-mat-form-field .mat-mdc-form-field,formly-wrapper-mat-form-field .mat-form-field{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.FocusMonitor }]; }, propDecorators: { formField: [{
                type: ViewChild,
                args: [MatFormField, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC53cmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL21hdGVyaWFsL2Zvcm0tZmllbGQvc3JjL2Zvcm0tZmllbGQud3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFNVCxpQkFBaUIsR0FFbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGlCQUFpQixJQUFJLGdCQUFnQixFQUdyQyxZQUFZLEdBQ2IsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7OztBQXdGNUQsTUFBTSxPQUFPLHNCQUNYLFNBQVEsWUFBa0M7SUFLMUMsWUFBb0IsUUFBbUIsRUFBVSxVQUFzQixFQUFVLFlBQTBCO1FBQ3pHLEtBQUssRUFBRSxDQUFDO1FBRFUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUUzRyxDQUFDO0lBRUQsUUFBUTtRQUNOLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3BFLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDYixxRUFBcUU7UUFDckUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7WUFDckYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDN0csZ0JBQWdCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7U0FDOUY7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7O29IQTlCVSxzQkFBc0I7d0dBQXRCLHNCQUFzQixnSEFJdEIsWUFBWSxxRkFqRWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlEVDs0RkFJVSxzQkFBc0I7a0JBL0RsQyxTQUFTOytCQUNFLCtCQUErQixZQUMvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeURULGlCQUVjLGlCQUFpQixDQUFDLElBQUk7b0pBTU0sU0FBUztzQkFBbkQsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBWaWV3Q2hpbGQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIEFmdGVyVmlld0luaXQsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICDJtWRlZmluZUhpZGRlblByb3AgYXMgZGVmaW5lSGlkZGVuUHJvcCxcbiAgRm9ybWx5RmllbGRDb25maWcsXG4gIEZvcm1seUZpZWxkUHJvcHMgYXMgQ29yZUZvcm1seUZpZWxkUHJvcHMsXG4gIEZpZWxkV3JhcHBlcixcbn0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlLCBNYXRGb3JtRmllbGRBcHBlYXJhbmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcblxuaW50ZXJmYWNlIE1hdEZvcm1seUZpZWxkQ29uZmlnIGV4dGVuZHMgRm9ybWx5RmllbGRDb25maWc8Rm9ybWx5RmllbGRQcm9wcz4ge1xuICBfZm9ybUZpZWxkPzogRm9ybWx5V3JhcHBlckZvcm1GaWVsZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlGaWVsZFByb3BzIGV4dGVuZHMgQ29yZUZvcm1seUZpZWxkUHJvcHMge1xuICBwcmVmaXg/OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBzdWZmaXg/OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICB0ZXh0UHJlZml4PzogVGVtcGxhdGVSZWY8YW55PjtcbiAgdGV4dFN1ZmZpeD86IFRlbXBsYXRlUmVmPGFueT47XG4gIGhpZGVMYWJlbD86IGJvb2xlYW47XG4gIGhpZGVSZXF1aXJlZE1hcmtlcj86IGJvb2xlYW47XG4gIGhpZGVGaWVsZFVuZGVybGluZT86IGJvb2xlYW47XG4gIGZsb2F0TGFiZWw/OiBGbG9hdExhYmVsVHlwZTtcbiAgYXBwZWFyYW5jZT86IE1hdEZvcm1GaWVsZEFwcGVhcmFuY2U7XG4gIHN1YnNjcmlwdFNpemluZz86ICdmaXhlZCcgfCAnZHluYW1pYyc7XG4gIGNvbG9yPzogVGhlbWVQYWxldHRlO1xuICBoaW50U3RhcnQ/OiBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nO1xuICBoaW50RW5kPzogVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LXdyYXBwZXItbWF0LWZvcm0tZmllbGQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDwhLS0gZml4IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzcwODMgYnkgc2V0dGluZyB3aWR0aCB0byAxMDAlIC0tPlxuICAgIDxtYXQtZm9ybS1maWVsZFxuICAgICAgW2hpZGVSZXF1aXJlZE1hcmtlcl09XCJ0cnVlXCJcbiAgICAgIFtmbG9hdExhYmVsXT1cInByb3BzLmZsb2F0TGFiZWxcIlxuICAgICAgW2FwcGVhcmFuY2VdPVwicHJvcHMuYXBwZWFyYW5jZVwiXG4gICAgICBbc3Vic2NyaXB0U2l6aW5nXT1cInByb3BzLnN1YnNjcmlwdFNpemluZ1wiXG4gICAgICBbY29sb3JdPVwicHJvcHMuY29sb3IgPz8gJ3ByaW1hcnknXCJcbiAgICA+XG4gICAgICA8bmctY29udGFpbmVyICNmaWVsZENvbXBvbmVudD48L25nLWNvbnRhaW5lcj5cbiAgICAgIDxtYXQtbGFiZWwgKm5nSWY9XCJwcm9wcy5sYWJlbCAmJiBwcm9wcy5oaWRlTGFiZWwgIT09IHRydWVcIj5cbiAgICAgICAge3sgcHJvcHMubGFiZWwgfX1cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICAqbmdJZj1cInByb3BzLnJlcXVpcmVkICYmIHByb3BzLmhpZGVSZXF1aXJlZE1hcmtlciAhPT0gdHJ1ZVwiXG4gICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICBjbGFzcz1cIm1hdC1mb3JtLWZpZWxkLXJlcXVpcmVkLW1hcmtlciBtYXQtbWRjLWZvcm0tZmllbGQtcmVxdWlyZWQtbWFya2VyXCJcbiAgICAgICAgICA+Kjwvc3BhblxuICAgICAgICA+XG4gICAgICA8L21hdC1sYWJlbD5cblxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRUZXh0UHJlZml4ICpuZ0lmPVwicHJvcHMudGV4dFByZWZpeFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInByb3BzLnRleHRQcmVmaXhcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBmaWVsZDogZmllbGQgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0UHJlZml4ICpuZ0lmPVwicHJvcHMucHJlZml4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwicHJvcHMucHJlZml4XCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZmllbGQ6IGZpZWxkIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctY29udGFpbmVyIG1hdFRleHRTdWZmaXggKm5nSWY9XCJwcm9wcy50ZXh0U3VmZml4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwicHJvcHMudGV4dFN1ZmZpeFwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGZpZWxkOiBmaWVsZCB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRTdWZmaXggKm5nSWY9XCJwcm9wcy5zdWZmaXhcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJwcm9wcy5zdWZmaXhcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBmaWVsZDogZmllbGQgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxtYXQtZXJyb3I+XG4gICAgICAgIDxmb3JtbHktdmFsaWRhdGlvbi1tZXNzYWdlIFtmaWVsZF09XCJmaWVsZFwiPjwvZm9ybWx5LXZhbGlkYXRpb24tbWVzc2FnZT5cbiAgICAgIDwvbWF0LWVycm9yPlxuXG4gICAgICA8bWF0LWhpbnQgKm5nSWY9XCJwcm9wcy5kZXNjcmlwdGlvbiB8fCBwcm9wcy5oaW50U3RhcnQgYXMgaGludFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInN0cmluZ09yVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBjb250ZW50OiBoaW50IH1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L21hdC1oaW50PlxuXG4gICAgICA8bWF0LWhpbnQgKm5nSWY9XCJwcm9wcy5oaW50RW5kIGFzIGhpbnRFbmRcIiBhbGlnbj1cImVuZFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInN0cmluZ09yVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBjb250ZW50OiBoaW50RW5kIH1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L21hdC1oaW50PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICA8bmctdGVtcGxhdGUgI3N0cmluZ09yVGVtcGxhdGUgbGV0LWNvbnRlbnQ9XCJjb250ZW50XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNvbnRlbnQuY3JlYXRlRW1iZWRkZWRWaWV3OyBlbHNlIHRlbXBsYXRlXCI+e3sgY29udGVudCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLXRlbXBsYXRlICN0ZW1wbGF0ZT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZmllbGQ6IGZpZWxkIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vZm9ybS1maWVsZC53cmFwcGVyLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5V3JhcHBlckZvcm1GaWVsZFxuICBleHRlbmRzIEZpZWxkV3JhcHBlcjxNYXRGb3JtbHlGaWVsZENvbmZpZz5cbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdFxue1xuICBAVmlld0NoaWxkKE1hdEZvcm1GaWVsZCwgeyBzdGF0aWM6IHRydWUgfSkgZm9ybUZpZWxkITogTWF0Rm9ybUZpZWxkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGRlZmluZUhpZGRlblByb3AodGhpcy5maWVsZCwgJ19mb3JtRmllbGQnLCB0aGlzLmZvcm1GaWVsZCk7XG4gICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYsIHRydWUpLnN1YnNjcmliZSgob3JpZ2luKSA9PiB7XG4gICAgICBpZiAoIW9yaWdpbiAmJiB0aGlzLmZpZWxkLmZvY3VzKSB7XG4gICAgICAgIHRoaXMuZmllbGQuZm9jdXMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyB0ZW1wb3JhcnkgZml4IGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvaXNzdWVzLzc4OTFcbiAgICBpZiAodGhpcy5mb3JtRmllbGQuYXBwZWFyYW5jZSAhPT0gJ291dGxpbmUnICYmIHRoaXMucHJvcHMuaGlkZUZpZWxkVW5kZXJsaW5lID09PSB0cnVlKSB7XG4gICAgICBjb25zdCB1bmRlcmxpbmVFbGVtZW50ID0gdGhpcy5mb3JtRmllbGQuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lJyk7XG4gICAgICB1bmRlcmxpbmVFbGVtZW50ICYmIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodW5kZXJsaW5lRWxlbWVudC5wYXJlbnROb2RlLCB1bmRlcmxpbmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBkZWxldGUgdGhpcy5maWVsZC5fZm9ybUZpZWxkO1xuICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZik7XG4gIH1cbn1cbiJdfQ==