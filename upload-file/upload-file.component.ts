import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fileUpload = require('fuctbase64');

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  INPUT_FILE = 'file';
  form: FormGroup;
  base64: string = null;
  filename: string = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UploadFileComponent>,
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({});
    const name = this.INPUT_FILE;
    this.form.addControl(name, this.fb.control(null, []));
  }

  close() {
    this.dialogRef.close(null);
  }

  onFileChange(event) {
    fileUpload(event).then((result) => {
      this.base64 = result.base64;
      this.filename = result.name;
    });
  }

  onSubmit() {
    this.dialogRef.close(this.getReturnData());
  }

  getReturnData() {
    return {
      base64: this.base64,
      filename: this.filename,
    };
  }
}
