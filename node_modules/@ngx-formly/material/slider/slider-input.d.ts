/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { _MatThumb, MatSliderDragEvent, _MatSlider, _MatSliderThumb } from './slider-interface';
import * as i0 from "@angular/core";
/**
 * Provider that allows the slider thumb to register as a ControlValueAccessor.
 * @docs-private
 */
export declare const MAT_SLIDER_THUMB_VALUE_ACCESSOR: any;
/**
 * Directive that adds slider-specific behaviors to an input element inside `<mat-slider>`.
 * Up to two may be placed inside of a `<mat-slider>`.
 *
 * If one is used, the selector `matSliderThumb` must be used, and the outcome will be a normal
 * slider. If two are used, the selectors `matSliderStartThumb` and `matSliderEndThumb` must be
 * used, and the outcome will be a range slider with two slider thumbs.
 * @ignore
 */
export declare class MatSliderThumb implements _MatSliderThumb, OnDestroy, ControlValueAccessor {
    readonly _ngZone: NgZone;
    readonly _elementRef: ElementRef<HTMLInputElement>;
    readonly _cdr: ChangeDetectorRef;
    protected _slider: _MatSlider;
    get value(): number;
    set value(v: NumberInput);
    /** Event emitted when the `value` is changed. */
    readonly valueChange: EventEmitter<number>;
    /** Event emitted when the slider thumb starts being dragged. */
    readonly dragStart: EventEmitter<MatSliderDragEvent>;
    /** Event emitted when the slider thumb stops being dragged. */
    readonly dragEnd: EventEmitter<MatSliderDragEvent>;
    /**
     * The current translateX in px of the slider visual thumb.
     * @docs-private
     */
    get translateX(): number;
    set translateX(v: number);
    private _translateX;
    /**
     * Indicates whether this thumb is the start or end thumb.
     * @docs-private
     */
    thumbPosition: _MatThumb;
    /** @docs-private */
    get min(): number;
    set min(v: NumberInput);
    /** @docs-private */
    get max(): number;
    set max(v: NumberInput);
    get step(): number;
    set step(v: NumberInput);
    /** @docs-private */
    get disabled(): boolean;
    set disabled(v: BooleanInput);
    /** The percentage of the slider that coincides with the value. */
    get percentage(): number;
    /** @docs-private */
    get fillPercentage(): number;
    /** The host native HTML input element. */
    _hostElement: HTMLInputElement;
    /** The aria-valuetext string representation of the input's value. */
    _valuetext: string;
    /** The radius of a native html slider's knob. */
    _knobRadius: number;
    /** Whether user's cursor is currently in a mouse down state on the input. */
    _isActive: boolean;
    /** Whether the input is currently focused (either by tab or after clicking). */
    _isFocused: boolean;
    /** Used to relay updates to _isFocused to the slider visual thumbs. */
    private _setIsFocused;
    /**
     * Whether the initial value has been set.
     * This exists because the initial value cannot be immediately set because the min and max
     * must first be relayed from the parent MatSlider component, which can only happen later
     * in the component lifecycle.
     */
    private _hasSetInitialValue;
    /** The stored initial value. */
    _initialValue: string | undefined;
    /** Defined when a user is using a form control to manage slider value & validation. */
    private _formControl;
    /** Emits when the component is destroyed. */
    protected readonly _destroyed: Subject<void>;
    /**
     * Indicates whether UI updates should be skipped.
     *
     * This flag is used to avoid flickering
     * when correcting values on pointer up/down.
     */
    _skipUIUpdate: boolean;
    /** Callback called when the slider input value changes. */
    private _onChangeFn;
    /** Callback called when the slider input has been touched. */
    private _onTouchedFn;
    constructor(_ngZone: NgZone, _elementRef: ElementRef<HTMLInputElement>, _cdr: ChangeDetectorRef, _slider: _MatSlider);
    ngOnDestroy(): void;
    /** @docs-private */
    initProps(): void;
    /** @docs-private */
    initUI(): void;
    _initValue(): void;
    _getDefaultValue(): number;
    _onBlur(): void;
    _onFocus(): void;
    _onChange(): void;
    _onInput(): void;
    _onNgControlValueChange(): void;
    _onPointerDown(event: PointerEvent): void;
    /**
     * Corrects the value of the slider on pointer up/down.
     *
     * Called on pointer down and up because the value is set based
     * on the inactive width instead of the active width.
     */
    private _handleValueCorrection;
    /** Corrects the value of the slider based on the pointer event's position. */
    _fixValue(event: PointerEvent): void;
    _onPointerMove(event: PointerEvent): void;
    _onPointerUp(): void;
    _clamp(v: number): number;
    _calcTranslateXByValue(): number;
    _calcTranslateXByPointerEvent(event: PointerEvent): number;
    /**
     * Used to set the slider width to the correct
     * dimensions while the user is dragging.
     */
    _updateWidthActive(): void;
    /**
     * Sets the slider input to disproportionate dimensions to allow for touch
     * events to be captured on touch devices.
     */
    _updateWidthInactive(): void;
    _updateThumbUIByValue(options?: {
        withAnimation: boolean;
    }): void;
    _updateThumbUIByPointerEvent(event: PointerEvent, options?: {
        withAnimation: boolean;
    }): void;
    _updateThumbUI(options?: {
        withAnimation: boolean;
    }): void;
    /**
     * Sets the input's value.
     * @param value The new value of the input
     * @docs-private
     */
    writeValue(value: any): void;
    /**
     * Registers a callback to be invoked when the input's value changes from user input.
     * @param fn The callback to register
     * @docs-private
     */
    registerOnChange(fn: any): void;
    /**
     * Registers a callback to be invoked when the input is blurred by the user.
     * @param fn The callback to register
     * @docs-private
     */
    registerOnTouched(fn: any): void;
    /**
     * Sets the disabled state of the slider.
     * @param isDisabled The new disabled state
     * @docs-private
     */
    setDisabledState(isDisabled: boolean): void;
    focus(): void;
    blur(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSliderThumb, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatSliderThumb, "input[matSliderThumb]", ["matSliderThumb"], { "value": "value"; }, { "valueChange": "valueChange"; "dragStart": "dragStart"; "dragEnd": "dragEnd"; }, never>;
}
