import { ViewChild, Type, Directive, ViewChildren } from '@angular/core';
import { FieldType as CoreFieldType, ɵobserve as observe } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import * as i0 from "@angular/core";
export class FieldType extends CoreFieldType {
    constructor() {
        super(...arguments);
        this.errorStateMatcher = { isErrorState: () => this.field && this.showError };
        this.stateChanges = new Subject();
        this._errorState = false;
        this._focused = false;
    }
    set matPrefix(prefix) {
        if (prefix) {
            this.props.prefix = prefix;
        }
    }
    set matTextPrefix(textPrefix) {
        if (textPrefix) {
            this.props.textPrefix = textPrefix;
        }
    }
    set matSuffix(suffix) {
        if (suffix) {
            this.props.suffix = suffix;
        }
    }
    set matTextSuffix(textSuffix) {
        if (textSuffix) {
            this.props.textSuffix = textSuffix;
        }
    }
    set _controls(controls) {
        this.attachControl(controls.length === 1 ? controls.first : this);
    }
    ngOnDestroy() {
        delete this.formField?._control;
        this.stateChanges.complete();
    }
    setDescribedByIds(_ids) { }
    onContainerClick(_event) {
        this.field.focus = true;
        this.stateChanges.next();
    }
    get errorState() {
        const showError = this.options.showError(this);
        if (showError !== this._errorState) {
            this._errorState = showError;
            this.stateChanges.next();
        }
        return showError;
    }
    get controlType() {
        if (this.props.type) {
            return this.props.type;
        }
        const type = this.field.type;
        return type instanceof Type ? type.prototype.constructor.name : type;
    }
    get focused() {
        const focused = !!this.field.focus && !this.disabled;
        if (focused !== this._focused) {
            this._focused = focused;
            this.stateChanges.next();
        }
        return focused;
    }
    get disabled() {
        return !!this.props.disabled;
    }
    get required() {
        return !!this.props.required;
    }
    get placeholder() {
        return this.props.placeholder || '';
    }
    get shouldPlaceholderFloat() {
        return this.shouldLabelFloat;
    }
    get value() {
        return this.formControl?.value;
    }
    set value(value) {
        this.formControl?.patchValue(value);
    }
    get ngControl() {
        return this.formControl;
    }
    get empty() {
        return this.value == null || this.value === '';
    }
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }
    get formField() {
        return this.field?.['_formField'];
    }
    attachControl(control) {
        if (this.formField && control !== this.formField._control) {
            this.formField._control = control;
            // temporary fix for https://github.com/angular/material2/issues/6728
            const ngControl = control?.ngControl;
            if (ngControl?.valueAccessor?.hasOwnProperty('_formField')) {
                ngControl.valueAccessor['_formField'] = this.formField;
            }
            if (ngControl?.valueAccessor?.hasOwnProperty('_parentFormField')) {
                ngControl.valueAccessor['_parentFormField'] = this.formField;
            }
            ['prefix', 'suffix', 'textPrefix', 'textSuffix'].forEach((type) => observe(this.field, ['props', type], ({ currentValue }) => currentValue &&
                Promise.resolve().then(() => {
                    this.options.detectChanges(this.field);
                })));
            // https://github.com/angular/components/issues/16209
            const setDescribedByIds = control.setDescribedByIds.bind(control);
            control.setDescribedByIds = (ids) => {
                setTimeout(() => setDescribedByIds(ids));
            };
        }
    }
}
FieldType.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldType, deps: null, target: i0.ɵɵFactoryTarget.Directive });
FieldType.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FieldType, viewQueries: [{ propertyName: "matPrefix", first: true, predicate: ["matPrefix"], descendants: true }, { propertyName: "matTextPrefix", first: true, predicate: ["matTextPrefix"], descendants: true }, { propertyName: "matSuffix", first: true, predicate: ["matSuffix"], descendants: true }, { propertyName: "matTextSuffix", first: true, predicate: ["matTextSuffix"], descendants: true }, { propertyName: "_controls", predicate: MatFormFieldControl, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldType, decorators: [{
            type: Directive
        }], propDecorators: { matPrefix: [{
                type: ViewChild,
                args: ['matPrefix']
            }], matTextPrefix: [{
                type: ViewChild,
                args: ['matTextPrefix']
            }], matSuffix: [{
                type: ViewChild,
                args: ['matSuffix']
            }], matTextSuffix: [{
                type: ViewChild,
                args: ['matTextSuffix']
            }], _controls: [{
                type: ViewChildren,
                args: [MatFormFieldControl]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9tYXRlcmlhbC9mb3JtLWZpZWxkL3NyYy9maWVsZC50eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBMEIsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxTQUFTLElBQUksYUFBYSxFQUFxQixRQUFRLElBQUksT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQWdCLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBS2pGLE1BQU0sT0FBZ0IsU0FDcEIsU0FBUSxhQUFnQjtJQUYxQjs7UUE4QkUsc0JBQWlCLEdBQXNCLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVGLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNuQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixhQUFRLEdBQUcsS0FBSyxDQUFDO0tBc0dsQjtJQWxJQyxJQUE0QixTQUFTLENBQUMsTUFBd0I7UUFDNUQsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBQ0QsSUFBZ0MsYUFBYSxDQUFDLFVBQTRCO1FBQ3hFLElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUNELElBQTRCLFNBQVMsQ0FBQyxNQUF3QjtRQUM1RCxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxLQUFL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O2dCQUNaLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxDQUNMLENBQ0YsQ0FBQztZQUVGLHFEQUFxRDtZQUNyRCxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEUsT0FBTyxDQUFDLGlCQUFpQixHQUFHLENBQUMsR0FBYSxFQUFFLEVBQUU7Z0JBQzVDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7dUdBckltQixTQUFTOzJGQUFULFNBQVMsNGFBeUJmLG1CQUFtQjs0RkF6QmIsU0FBUztrQkFEOUIsU0FBUzs4QkFLb0IsU0FBUztzQkFBcEMsU0FBUzt1QkFBQyxXQUFXO2dCQUtVLGFBQWE7c0JBQTVDLFNBQVM7dUJBQUMsZUFBZTtnQkFLRSxTQUFTO3NCQUFwQyxTQUFTO3VCQUFDLFdBQVc7Z0JBS1UsYUFBYTtzQkFBNUMsU0FBUzt1QkFBQyxlQUFlO2dCQU1hLFNBQVM7c0JBQS9DLFlBQVk7dUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBUeXBlLCBEaXJlY3RpdmUsIFZpZXdDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgYXMgQ29yZUZpZWxkVHlwZSwgRm9ybWx5RmllbGRDb25maWcsIMm1b2JzZXJ2ZSBhcyBvYnNlcnZlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGQsIE1hdEZvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IEVycm9yU3RhdGVNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZFByb3BzIH0gZnJvbSAnLi9mb3JtLWZpZWxkLndyYXBwZXInO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaWVsZFR5cGU8RiBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnPEZvcm1seUZpZWxkUHJvcHM+PlxuICBleHRlbmRzIENvcmVGaWVsZFR5cGU8Rj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE1hdEZvcm1GaWVsZENvbnRyb2w8YW55Plxue1xuICBAVmlld0NoaWxkKCdtYXRQcmVmaXgnKSBzZXQgbWF0UHJlZml4KHByZWZpeDogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgIGlmIChwcmVmaXgpIHtcbiAgICAgIHRoaXMucHJvcHMucHJlZml4ID0gcHJlZml4O1xuICAgIH1cbiAgfVxuICBAVmlld0NoaWxkKCdtYXRUZXh0UHJlZml4Jykgc2V0IG1hdFRleHRQcmVmaXgodGV4dFByZWZpeDogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgIGlmICh0ZXh0UHJlZml4KSB7XG4gICAgICB0aGlzLnByb3BzLnRleHRQcmVmaXggPSB0ZXh0UHJlZml4O1xuICAgIH1cbiAgfVxuICBAVmlld0NoaWxkKCdtYXRTdWZmaXgnKSBzZXQgbWF0U3VmZml4KHN1ZmZpeDogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgIGlmIChzdWZmaXgpIHtcbiAgICAgIHRoaXMucHJvcHMuc3VmZml4ID0gc3VmZml4O1xuICAgIH1cbiAgfVxuICBAVmlld0NoaWxkKCdtYXRUZXh0U3VmZml4Jykgc2V0IG1hdFRleHRTdWZmaXgodGV4dFN1ZmZpeDogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgIGlmICh0ZXh0U3VmZml4KSB7XG4gICAgICB0aGlzLnByb3BzLnRleHRTdWZmaXggPSB0ZXh0U3VmZml4O1xuICAgIH1cbiAgfVxuXG4gIEBWaWV3Q2hpbGRyZW4oTWF0Rm9ybUZpZWxkQ29udHJvbCkgc2V0IF9jb250cm9scyhjb250cm9sczogUXVlcnlMaXN0PE1hdEZvcm1GaWVsZENvbnRyb2w8YW55Pj4pIHtcbiAgICB0aGlzLmF0dGFjaENvbnRyb2woY29udHJvbHMubGVuZ3RoID09PSAxID8gY29udHJvbHMuZmlyc3QgOiB0aGlzKTtcbiAgfVxuXG4gIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlciA9IHsgaXNFcnJvclN0YXRlOiAoKSA9PiB0aGlzLmZpZWxkICYmIHRoaXMuc2hvd0Vycm9yIH07XG4gIHN0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIF9lcnJvclN0YXRlID0gZmFsc2U7XG4gIF9mb2N1c2VkID0gZmFsc2U7XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgZGVsZXRlICh0aGlzLmZvcm1GaWVsZCBhcyBhbnkpPy5fY29udHJvbDtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc2V0RGVzY3JpYmVkQnlJZHMoX2lkczogc3RyaW5nW10pOiB2b2lkIHt9XG4gIG9uQ29udGFpbmVyQ2xpY2soX2V2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5maWVsZC5mb2N1cyA9IHRydWU7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgZ2V0IGVycm9yU3RhdGUoKSB7XG4gICAgY29uc3Qgc2hvd0Vycm9yID0gdGhpcy5vcHRpb25zIS5zaG93RXJyb3IhKHRoaXMpO1xuICAgIGlmIChzaG93RXJyb3IgIT09IHRoaXMuX2Vycm9yU3RhdGUpIHtcbiAgICAgIHRoaXMuX2Vycm9yU3RhdGUgPSBzaG93RXJyb3I7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNob3dFcnJvcjtcbiAgfVxuXG4gIGdldCBjb250cm9sVHlwZSgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy50eXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy50eXBlO1xuICAgIH1cblxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLmZpZWxkLnR5cGUhO1xuICAgIHJldHVybiB0eXBlIGluc3RhbmNlb2YgVHlwZSA/IHR5cGUucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWUgOiB0eXBlO1xuICB9XG4gIGdldCBmb2N1c2VkKCkge1xuICAgIGNvbnN0IGZvY3VzZWQgPSAhIXRoaXMuZmllbGQuZm9jdXMgJiYgIXRoaXMuZGlzYWJsZWQ7XG4gICAgaWYgKGZvY3VzZWQgIT09IHRoaXMuX2ZvY3VzZWQpIHtcbiAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmb2N1c2VkO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4gZm9jdXNlZDtcbiAgfVxuICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcy5kaXNhYmxlZDtcbiAgfVxuICBnZXQgcmVxdWlyZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcy5yZXF1aXJlZDtcbiAgfVxuICBnZXQgcGxhY2Vob2xkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgJyc7XG4gIH1cbiAgZ2V0IHNob3VsZFBsYWNlaG9sZGVyRmxvYXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hvdWxkTGFiZWxGbG9hdDtcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUNvbnRyb2w/LnZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuZm9ybUNvbnRyb2w/LnBhdGNoVmFsdWUodmFsdWUpO1xuICB9XG4gIGdldCBuZ0NvbnRyb2woKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUNvbnRyb2wgYXMgYW55O1xuICB9XG4gIGdldCBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PSBudWxsIHx8IHRoaXMudmFsdWUgPT09ICcnO1xuICB9XG4gIGdldCBzaG91bGRMYWJlbEZsb2F0KCkge1xuICAgIHJldHVybiB0aGlzLmZvY3VzZWQgfHwgIXRoaXMuZW1wdHk7XG4gIH1cbiAgZ2V0IGZvcm1GaWVsZCgpOiBNYXRGb3JtRmllbGQge1xuICAgIHJldHVybiAodGhpcy5maWVsZCBhcyBhbnkpPy5bJ19mb3JtRmllbGQnXTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoQ29udHJvbChjb250cm9sOiBNYXRGb3JtRmllbGRDb250cm9sPGFueT4pIHtcbiAgICBpZiAodGhpcy5mb3JtRmllbGQgJiYgY29udHJvbCAhPT0gdGhpcy5mb3JtRmllbGQuX2NvbnRyb2wpIHtcbiAgICAgIHRoaXMuZm9ybUZpZWxkLl9jb250cm9sID0gY29udHJvbDtcblxuICAgICAgLy8gdGVtcG9yYXJ5IGZpeCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2lzc3Vlcy82NzI4XG4gICAgICBjb25zdCBuZ0NvbnRyb2wgPSBjb250cm9sPy5uZ0NvbnRyb2wgYXMgYW55O1xuICAgICAgaWYgKG5nQ29udHJvbD8udmFsdWVBY2Nlc3Nvcj8uaGFzT3duUHJvcGVydHkoJ19mb3JtRmllbGQnKSkge1xuICAgICAgICBuZ0NvbnRyb2wudmFsdWVBY2Nlc3NvclsnX2Zvcm1GaWVsZCddID0gdGhpcy5mb3JtRmllbGQ7XG4gICAgICB9XG4gICAgICBpZiAobmdDb250cm9sPy52YWx1ZUFjY2Vzc29yPy5oYXNPd25Qcm9wZXJ0eSgnX3BhcmVudEZvcm1GaWVsZCcpKSB7XG4gICAgICAgIG5nQ29udHJvbC52YWx1ZUFjY2Vzc29yWydfcGFyZW50Rm9ybUZpZWxkJ10gPSB0aGlzLmZvcm1GaWVsZDtcbiAgICAgIH1cblxuICAgICAgWydwcmVmaXgnLCAnc3VmZml4JywgJ3RleHRQcmVmaXgnLCAndGV4dFN1ZmZpeCddLmZvckVhY2goKHR5cGUpID0+XG4gICAgICAgIG9ic2VydmU8VGVtcGxhdGVSZWY8YW55Pj4oXG4gICAgICAgICAgdGhpcy5maWVsZCxcbiAgICAgICAgICBbJ3Byb3BzJywgdHlwZV0sXG4gICAgICAgICAgKHsgY3VycmVudFZhbHVlIH0pID0+XG4gICAgICAgICAgICBjdXJyZW50VmFsdWUgJiZcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZGV0ZWN0Q2hhbmdlcyEodGhpcy5maWVsZCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzE2MjA5XG4gICAgICBjb25zdCBzZXREZXNjcmliZWRCeUlkcyA9IGNvbnRyb2wuc2V0RGVzY3JpYmVkQnlJZHMuYmluZChjb250cm9sKTtcbiAgICAgIGNvbnRyb2wuc2V0RGVzY3JpYmVkQnlJZHMgPSAoaWRzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldERlc2NyaWJlZEJ5SWRzKGlkcykpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==