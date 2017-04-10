import { Tag } from "../data-classes/tag";
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from "@angular/forms";
import { Directive, Input, OnChanges, SimpleChanges } from "@angular/core";

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
