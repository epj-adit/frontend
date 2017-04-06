import { Tag } from "../data-classes/tag";
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from "@angular/forms";
import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";

/*export function emptyTagsValidator(a: Tag[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const error = 'Please insert at least one tag';
    return a.length < 1 ? {'noTags': {error}} : null;
  };
}*/

@Directive({
  selector: '[noTags]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoTagsValidatorDirective, multi: true}]
})
export class NoTagsValidatorDirective implements Validator {
  @Input() noTags: Tag[];

  validate(control: AbstractControl) {
    const error = 'Please insert at least one tag';
    return this.noTags.length < 1 ? {'noTags': {error}} : null;
  }
}

/** A hero's name can't match the given regular expression */
/*export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = nameRe.test(name);
    return no ? {'noTags': {name}} : null;
  };
}
@Directive({
  selector: '[noTags]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoTagsValidatorDirective, multi: true}]
})
export class NoTagsValidatorDirective implements Validator, OnChanges {
  @Input() noTags: Tag[];
  private valFn = Validators.nullValidator;
  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['forbiddenName'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = forbiddenNameValidator(re);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }
  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}*/