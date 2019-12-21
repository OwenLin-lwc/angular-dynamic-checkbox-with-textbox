
import { Component, VERSION } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Questions } from './questions';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';
  submission: string;

  questionForm: FormGroup;
  questions = Questions;

  constructor(fb: FormBuilder) {
    this.name = `Angular! v${VERSION.full}`;

    this.questionForm = fb.group({
      questions: fb.array(this.questions.map(this.createQuestionControl(fb)), max3Selected)
    });

  }

  createQuestionControl(fb: FormBuilder) {
    return (question, index) => {
      const checkbox = question.selected;
      const answerbox = question.selected ? ['', [Validators.required, Validators.minLength(4)]] : '';
      return fb.group({ question: checkbox, answer: answerbox, questionNumber: index + 1 });
    };
  }

  changeValidator(selected, index) {
    const answerbox = this.questionForm.get('questions.' + index).get('answer');

    const validators = selected ? [Validators.required, Validators.minLength(4)] : null;
    answerbox.setValidators(validators);
    answerbox.updateValueAndValidity();
  }

  submit(form) {
    this.submission = form.value;
  }
}

export function max3Selected(formArray): ValidatorFn {

  const totalSelected = formArray.controls.reduce((selectedControls, control) => {
    if (control.get('question').value) {
      selectedControls++;
    }
    return selectedControls;
  }, 0);

  return (control: AbstractControl): ValidationErrors | null => {
    return totalSelected > 3 ? { moreThanThreeSelected: true } : null;
  };
}