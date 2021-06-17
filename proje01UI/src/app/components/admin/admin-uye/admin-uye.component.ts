import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../../services/myAlert.service';
import { Sonuc } from './../../../models/Sonuc';
import { UyeDialogComponent } from './../../dialogs/uye-dialog/uye-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Uye } from './../../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.scss']
})
export class AdminUyeComponent implements OnInit {
  uyeler: Uye[];
  dataSource: any;
  displayedColumns = ['uyeId', 'uyeKullaniciAdi', 'uyeEmail', 'uyeSifre', 'uyeAdSoyad', 'uyeAdmin', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<UyeDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.UyeListele();
  }

  UyeListele() {
    this.apiServis.UyeListe().subscribe((d: Uye[]) => {
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    var yenikayit: Uye = new Uye();
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '400px',
      data: {
        kayit: yenikayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });
  }

  Duzenle(kayit: Uye) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.uyeKullaniciAdi = d.uyeKullaniciAdi;
        this.apiServis.UyeDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });
  }

  Sil(kayit: Uye) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.uyeKullaniciAdi + " Adlı Üye Silinecektir Onaylıyor musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeSil(kayit.uyeId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });
  }

}
