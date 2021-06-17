import { DersComponent } from './components/ders/ders.component';
import { UyeComponent } from './components/uye/uye.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminBolumlerComponent } from './components/admin/admin-bolumler/admin-bolumler.component';
import { AdminOgrencilerComponent } from './components/admin/admin-ogrenciler/admin-ogrenciler.component';
import { AdminDerslerComponent } from './components/admin/admin-dersler/admin-dersler.component';
import { AdminNotlarComponent } from './components/admin/admin-notlar/admin-notlar.component';
import { AuthGuard } from './services/AuthGudard';
import { BolumComponent } from './components/bolum/bolum.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { NotComponent } from './components/not/not.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin/uye',
    component: AdminUyeComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['admin'],
      gerigit: '/login'
    }
  },
  {
    path: "bolum",
    component: BolumComponent,
  },
  {
    path: "ogrenci",
    component: OgrenciComponent,
  },
  {
    path: "ders",
    component: DersComponent,
  },
  {
    path: "not",
    component: NotComponent,
  },
  {
    path: 'admin/bolumler',
    component: AdminBolumlerComponent
  },
  {
    path: 'admin/ogrenciler',
    component: AdminOgrencilerComponent
  },
  {
    path: 'admin/dersler',
    component: AdminDerslerComponent
  },
  {
    path: 'admin/notlar',
    component: AdminNotlarComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
