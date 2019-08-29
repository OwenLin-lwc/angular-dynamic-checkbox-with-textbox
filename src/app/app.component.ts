
import { Component, NgModule, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBySelected', pure: false })
export class OrderBySelectedPipe implements PipeTransform {
  transform(array) {
    array.sort((a, b) => {
      if (a.get('question').value === b.get('question').value) {
        return 0;
      } else if (a.get('question').value) {
        return -1;
      } else {
        return 1;
      }
    });
    return array;
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  // name: string;
  submission: string;

  questions = [
    {
      question_id: "1",
      selected: true,
      EN: "Question 1 - EN",
      FR: "Question 1 -FR",
    },
    {
      question_id: "2",
      selected: false,
      EN: "Question 2 - EN",
      FR: "Question 2 -FR"
    },
    {
      question_id: "3",
      selected: false,
      EN: "Question 3 - EN",
      FR: "Question 3 -FR"
    },
    {
      question_id: "4",
      selected: false,
      EN: "Question 4 - EN",
      FR: "Question 4 -FR"
    },
    {
      question_id: "5",
      selected: false,
      EN: "Question 5 - EN",
      FR: "Question 5 -FR"
    },
    {
      question_id: "6",
      selected: false,
      EN: "Question 6 - EN",
      FR: "Question 6 -FR"
    }
  ]

  questionForm: FormGroup

  constructor(fb: FormBuilder) {
    this.name = `Angular! v${VERSION.full}`

    this.questionForm = fb.group({
      questions: fb.array(this.questions.map(this.createQuestionControl(fb)), max3Selected)
    });

    console.log(this.questionForm)

  }

  createQuestionControl(fb: FormBuilder) {
    return (question, index) => {
      const checkbox = question.selected
      const answerbox = question.selected ? ['', [Validators.required, Validators.minLength(4)]] : ''
      return fb.group({ question: checkbox, answer: answerbox, questionNumber: index + 1 });
    }
  }

  changeValidator(selected, index) {
    const answerbox = this.questionForm.get('questions.' + index).get('answer')

    console.log(selected, index)

    const validators = selected ? [Validators.required, Validators.minLength(4)] : null
    answerbox.setValidators(validators);
    answerbox.updateValueAndValidity();
  }

  submit(form) {
    console.log(form.value);
    this.submission = form.value;
  }
}
export function max3Selected(formArray): ValidatorFn {

  let totalSelected = formArray.controls.reduce((selectedControls, control) => {
    if (control.get('question').value) {
      selectedControls++
    }
    return selectedControls;
  }, 0)

  return totalSelected > 3 ? { moreThanThreeSelected: true } : null;
}