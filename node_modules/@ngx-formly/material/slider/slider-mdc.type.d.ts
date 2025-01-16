import { _MatSlider, _MatSliderThumb } from './slider-interface';
import { FormlyFieldSlider } from './slider.type';
import * as i0 from "@angular/core";
/**
 * @ignore
 */
export declare class FormlyFieldMDCSlider extends FormlyFieldSlider {
    sliderThumb: _MatSliderThumb;
    set mdcSlider(slider: _MatSlider);
    onContainerClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldMDCSlider, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldMDCSlider, "formly-field-mat-slider", never, {}, {}, never, never>;
}
