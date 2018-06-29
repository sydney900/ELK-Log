import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatListModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatListModule, MatSnackBarModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatListModule, MatSnackBarModule],
})
export class MaterialModule { }
