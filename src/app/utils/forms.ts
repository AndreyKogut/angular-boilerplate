import { AbstractControl } from '@angular/forms';

const markControl = (control: AbstractControl): void => {
  control.markAsTouched();
  control.markAsDirty();
};

const isControlErrorVisible = (control: AbstractControl): boolean =>
  !!control && !control.valid && control.touched && control.dirty;

const trimInputValue = (value = '') => value.trim().replace(/\s+/g, ' ');

export { markControl, isControlErrorVisible, trimInputValue };
