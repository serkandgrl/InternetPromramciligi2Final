import { DersComponent } from './components/ders/ders.component';
import { UyeComponent } from './components/uye/uye.component';
import { AuthInterceptor } from './services/AuthInterceptor';
import { NotlarDialogComponent } from './components/dialogs/notlar-dialog/notlar-dialog.component';
import { DerslerDialogComponent } from './components/dialogs/dersler-dialog/dersler-dialog.component';
import { OgrencilerDialogComponent } from './components/dialogs/ogrenciler-dialog/ogrenciler-dialog.component';
import { BolumlerDialogComponent } from './components/dialogs/bolumler-dialog/bolumler-dialog.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminOgrencilerComponent } from './components/admin/admin-ogrenciler/admin-ogrenciler.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AdminBolumlerComponent } from './components/admin/admin-bolumler/admin-bolumler.component';
import { AdminDerslerComponent } from './components/admin/admin-dersler/admin-dersler.component';
import { AdminNotlarComponent } from './components/admin/admin-notlar/admin-notlar.component';
import { AuthGuard } from './services/AuthGudard';
import { BolumComponent } from './components/bolum/bolum.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { NotComponent } from './components/not/not.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    UyeComponent,
    BolumComponent,
    OgrenciComponent,
    DersComponent,
    NotComponent,
    
    
    


    //Admin
    
    AdminBolumlerComponent,
    AdminOgrencilerComponent,
    AdminUyeComponent,
    AdminDerslerComponent,
    AdminNotlarComponent,


    //Dialoglar
    AdminComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    BolumlerDialogComponent,
    OgrencilerDialogComponent,
    DerslerDialogComponent,
    NotlarDialogComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    BolumlerDialogComponent,
    OgrencilerDialogComponent,
    DerslerDialogComponent,
    NotlarDialogComponent,
    

  ],
  providers: [MyAlertService, ApiService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
