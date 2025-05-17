import { NgModule } from "@angular/core";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



const matModArr = [
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
]

@NgModule({
    declarations: [],
    imports: [
        ...matModArr
    ],
    exports: [
        ...matModArr
    ],
    providers: []
})
export class MaterialModule{

}