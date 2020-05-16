import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MouseComponent } from './mouse/mouse.component';
import {MatToolbarModule, MatTabsModule, MatCardModule, MatButtonModule, MatIconModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeysComponent } from './keys/keys.component';
import { Mouse2Component } from './mouse2/mouse2.component';
import { Mouse3Component } from './mouse3/mouse3.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScoresComponent } from './scores/scores.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';


const appRoutes: Routes = [
  {path: 'mouse', component: MouseComponent},
  {path: 'keys', component: KeysComponent},
  {path: 'mouse2', component: Mouse2Component},
  {path: 'scores', component: ScoresComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MouseComponent,
    KeysComponent,
    Mouse2Component,
    Mouse3Component,
    ScoresComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),

    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    DragDropModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
