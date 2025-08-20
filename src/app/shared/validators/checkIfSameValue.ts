import { AbstractControl } from '@angular/forms';

export function checkIfSameValue(prevValue: any) {
  return (control: AbstractControl) => {
    const currentValue = control.value;

    if (currentValue !== prevValue) {
      return null;
    } else {
      return { isSameValue: true };
    }
  };
}
