import { Tag } from "../data-classes/tag";
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from "@angular/forms";
import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";


export function noTagsValidator(noTags): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const error = 'Please insert at least one tag';
    return noTags.length < 1 ? {'noTags': {error}} : null;
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
    const change = changes['noTags'];
    if (change) {
      this.valFn = noTagsValidator(this.noTags);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl) {
    return this.valFn(control);
  }
}
