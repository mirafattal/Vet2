import { Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, FormlyFieldProps } from '@ngx-formly/material/form-field';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import * as i0 from "@angular/core";
interface SliderProps extends FormlyFieldProps {
    displayWith?: (value: number) => string | number;
    invert?: boolean;
    tickInterval?: number;
    valueText?: string;
    vertical?: boolean;
    input?: (field: FormlyFieldConfig<SliderProps>, $event: MatSliderChange) => void;
    change?: (field: FormlyFieldConfig<SliderProps>, $event: MatSliderChange) => void;
    /** @deprecated Use `discrete` instead. */
    thumbLabel?: boolean;
    discrete?: boolean;
    showTickMarks?: boolean;
}
export interface FormlySliderFieldConfig extends FormlyFieldConfig<SliderProps> {
    type: 'slider' | Type<FormlyFieldSlider>;
}
export declare class FormlyFieldSlider extends FieldType<FieldTypeConfig<SliderProps>> {
    slider: MatSlider;
    defaultOptions: {
        props: {
            hideFieldUnderline: boolean;
            floatLabel: "always";
            thumbLabel: boolean;
            displayWith: (value: number) => number;
        };
    };
    onContainerClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldSlider, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldSlider, "formly-field-mat-slider", never, {}, {}, never, never>;
}
export {};
