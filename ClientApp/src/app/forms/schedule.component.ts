import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'schedule-form',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements AfterViewInit, OnInit {

  public form: FormGroup;
  public multipleCondition: boolean = true;
  public multipleCondition2: boolean = false;


  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      multiselect: [
        { disabled: false, value: ['1', '2'] }
      ],
    });
  }

  public ngAfterViewInit() {
    // this.form.get('multiselect').setValue(['1', '2']);
  }

  public select_2_and_3() {
    this.form.get('multiselect').setValue(['2', '3']);
  }

}
