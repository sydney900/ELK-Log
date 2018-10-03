import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatListModule, 
  MatToolbarModule, MatSidenavModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatListModule,
    MatSnackBarModule, MatToolbarModule, MatSidenavModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatListModule,
    MatSnackBarModule, MatToolbarModule, MatSidenavModule],
})
export class MaterialModule { }
