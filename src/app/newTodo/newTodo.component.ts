import { NewTodo } from './../projects';
import { plainToClass } from 'class-transformer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project, Todo } from '../projects';
import { HttpService } from '../config/service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-newTodo',
  templateUrl: './newTodo.component.html',
  styleUrls: ['./newTodo.component.scss'],
  providers: [HttpService],
})
export class NewTodoComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  newTodoForm!: FormGroup;
  title: string = '';
  newTodo!: NewTodo;
  newProjectSubscription!: Subscription;
  @Input() projects!: any;
  @Output() outCancel = new EventEmitter();
  @Output() outNewTodo = new EventEmitter<NewTodo>();

  ngOnInit() {
    this.projects = plainToClass(Project, this.projects);
    this.initForm();
    this.subscribeToNewProject();
  }
  ngOnDestroy() {
    this.newProjectSubscription.unsubscribe();
  }

  private subscribeToNewProject() {
    this.newProjectSubscription = this.newTodoForm.controls[
      'selectCategory'
    ].valueChanges.subscribe((value: string) =>
      this.toggleNewProjectValidators(value)
    );
  }

  onNewTodo(newTodo: NewTodo) {
    this.outNewTodo.emit(newTodo);
  }

  initForm() {
    this.newTodoForm = this.fb.group({
      newTodo: ['', [Validators.required, Validators.maxLength(70)]],
      newProject: [''],
      selectCategory: ['', [Validators.required]],
    });
  }

  toggleNewProjectValidators(selectCategory: string) {
    const newProject = this.newTodoForm.controls['newProject'];
    if (selectCategory == 'newCategory') {
      newProject.setValidators([Validators.required, Validators.maxLength(40)]);
    } else {
      newProject.clearValidators();
    }
    newProject.updateValueAndValidity();
  }

  onSubmit() {
    const controls = this.newTodoForm.controls;
    if (this.newTodoForm.invalid) {
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAsTouched();
      });
      return;
    }
    if (this.newTodoForm.value.selectCategory == 'newCategory') {
      this.title = this.newTodoForm.value.newProject;
    } else {
      this.title = this.newTodoForm.value.selectCategory;
    }
    this.newTodo = {
      title: this.title.trim(),
      text: this.newTodoForm.value.newTodo.trim(),
    };
    this.onNewTodo(this.newTodo);
    this.onCancel();
  }
  onCancel() {
    this.outCancel.emit();
  }
}
