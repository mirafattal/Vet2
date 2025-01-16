import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { VERSION } from '@angular/cdk';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { FormlyFieldSlider as LegacyFormlyFieldSlider } from './slider.type';
import { FormlyFieldMDCSlider } from './slider-mdc.type';
import { MatSliderThumb } from './slider-input';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
const FormlyFieldSlider = Number(VERSION.major) >= 15 ? FormlyFieldMDCSlider : LegacyFormlyFieldSlider;
export class FormlyMatSliderModule {
}
FormlyMatSliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyMatSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyMatSliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyMatSliderModule, declarations: [LegacyFormlyFieldSlider, FormlyFieldMDCSlider, MatSliderThumb], imports: [CommonModule,
        MatCommonModule,
        MatRippleModule,
        ReactiveFormsModule,
        MatSliderModule,
        FormlyMatFormFieldModule, i1.FormlyModule] });
FormlyMatSliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyMatSliderModule, imports: [[
            CommonModule,
            MatCommonModule,
            MatRippleModule,
            ReactiveFormsModule,
            MatSliderModule,
            FormlyMatFormFieldModule,
            FormlyModule.forChild({
                types: [
                    {
                        name: 'slider',
                        component: FormlyFieldSlider,
                        wrappers: ['form-field'],
                    },
                ],
            }),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyMatSliderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [LegacyFormlyFieldSlider, FormlyFieldMDCSlider, MatSliderThumb],
                    imports: [
                        CommonModule,
                        MatCommonModule,
                        MatRippleModule,
                        ReactiveFormsModule,
                        MatSliderModule,
                        FormlyMatFormFieldModule,
                        FormlyModule.forChild({
                            types: [
                                {
                                    name: 'slider',
                                    component: FormlyFieldSlider,
                                    wrappers: ['form-field'],
                                },
                            ],
                        }),
                    ],
                    schemas: [NO_ERRORS_SCHEMA],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9tYXRlcmlhbC9zbGlkZXIvc3JjL3NsaWRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixJQUFJLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBQ2hELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQztBQXVCdkcsTUFBTSxPQUFPLHFCQUFxQjs7bUhBQXJCLHFCQUFxQjtvSEFBckIscUJBQXFCLGlCQXBCakIsdUJBQXVCLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxhQUUxRSxZQUFZO1FBQ1osZUFBZTtRQUNmLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsZUFBZTtRQUNmLHdCQUF3QjtvSEFhZixxQkFBcUIsWUFuQnZCO1lBQ1AsWUFBWTtZQUNaLGVBQWU7WUFDZixlQUFlO1lBQ2YsbUJBQW1CO1lBQ25CLGVBQWU7WUFDZix3QkFBd0I7WUFDeEIsWUFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDcEIsS0FBSyxFQUFFO29CQUNMO3dCQUNFLElBQUksRUFBRSxRQUFRO3dCQUNkLFNBQVMsRUFBRSxpQkFBaUI7d0JBQzVCLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQztxQkFDekI7aUJBQ0Y7YUFDRixDQUFDO1NBQ0g7NEZBR1UscUJBQXFCO2tCQXJCakMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLENBQUM7b0JBQzdFLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2Ysd0JBQXdCO3dCQUN4QixZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNwQixLQUFLLEVBQUU7Z0NBQ0w7b0NBQ0UsSUFBSSxFQUFFLFFBQVE7b0NBQ2QsU0FBUyxFQUFFLGlCQUFpQjtvQ0FDNUIsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDO2lDQUN6Qjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybWx5TW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0U2xpZGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7IEZvcm1seU1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJ0Bhbmd1bGFyL2Nkayc7XG5cbmltcG9ydCB7IE1hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZFNsaWRlciBhcyBMZWdhY3lGb3JtbHlGaWVsZFNsaWRlciB9IGZyb20gJy4vc2xpZGVyLnR5cGUnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRNRENTbGlkZXIgfSBmcm9tICcuL3NsaWRlci1tZGMudHlwZSc7XG5pbXBvcnQgeyBNYXRTbGlkZXJUaHVtYiB9IGZyb20gJy4vc2xpZGVyLWlucHV0JztcbmNvbnN0IEZvcm1seUZpZWxkU2xpZGVyID0gTnVtYmVyKFZFUlNJT04ubWFqb3IpID49IDE1ID8gRm9ybWx5RmllbGRNRENTbGlkZXIgOiBMZWdhY3lGb3JtbHlGaWVsZFNsaWRlcjtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTGVnYWN5Rm9ybWx5RmllbGRTbGlkZXIsIEZvcm1seUZpZWxkTURDU2xpZGVyLCBNYXRTbGlkZXJUaHVtYl0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBGb3JtbHlNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgRm9ybWx5TW9kdWxlLmZvckNoaWxkKHtcbiAgICAgIHR5cGVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnc2xpZGVyJyxcbiAgICAgICAgICBjb21wb25lbnQ6IEZvcm1seUZpZWxkU2xpZGVyLFxuICAgICAgICAgIHdyYXBwZXJzOiBbJ2Zvcm0tZmllbGQnXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5TWF0U2xpZGVyTW9kdWxlIHt9XG4iXX0=