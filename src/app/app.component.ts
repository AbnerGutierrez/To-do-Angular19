import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tarea } from './model/tarea.model';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tareaObj: Tarea = new Tarea();
  tareas: Tarea[] = [];
  formTarea: FormGroup = new FormGroup({});
  constructor() {
    this.createForm();
    const data = localStorage.getItem('Lista');
    if (data != null) {
      const dataP = JSON.parse(data);
      this.tareas = dataP;
    }
  }

  createForm() {
    this.formTarea = new FormGroup({
      id: new FormControl(this.tareaObj.id),
      tarea: new FormControl(this.tareaObj.tarea),
      estado: new FormControl(this.tareaObj.estado),
    });
  }

  reset() {
    this.tareaObj = new Tarea();
    this.createForm();
  }
  Save() {
    const data = localStorage.getItem('Lista');
    if (data != null) {
      const dataP = JSON.parse(data);
      this.formTarea.controls['id'].setValue(dataP.length + 1);
      this.tareas.unshift(this.formTarea.value);
    } else {
      this.tareas.unshift(this.formTarea.value);
    }
    localStorage.setItem('Lista', JSON.stringify(this.tareas));
    this.reset();
  }
  OnEdit(tarea: Tarea) {
    this.tareaObj = tarea;
    this.createForm();
  }
  Edit() {
    const toEdit = this.tareas.find(
      (m) => m.id == this.formTarea.controls['id'].value
    );
    if (toEdit != undefined) {
      toEdit.tarea = this.formTarea.controls['tarea'].value;
      toEdit.estado = this.formTarea.controls['estado'].value;
    }
    localStorage.setItem('Lista', JSON.stringify(this.tareas));
    this.reset();
  }
  Delete(id: number) {
    const ToDelete = this.tareas.findIndex((m) => m.id == id);
    this.tareas.splice(ToDelete, 1);
    localStorage.setItem('Lista', JSON.stringify(this.tareas));
  }
}
