import { OgrencilerDialogComponent } from './../../dialogs/ogrenciler-dialog/ogrenciler-dialog.component';
import { Ogrenciler } from './../../../models/Ogrenciler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-ogrenciler',
  templateUrl: './admin-ogrenciler.component.html',
  styleUrls: ['./admin-ogrenciler.component.scss']
})
export class AdminOgrencilerComponent implements OnInit {
  ogrenciler: Ogrenciler[];
  dataSource: any;
  displayedColumns = ['ogrNo', 'ogrTC', 'ogrAd', 'ogrSoyad', 'ogrCinsiyet', 'ogrTelefon', 'ogrMail', 'ogrBolumKodu', 'ogrUyeId', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<OgrencilerDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.OgrenciListe();
  }

  OgrenciListe() {
    this.apiServis.OgrenciListe().subscribe((d: Ogrenciler[]) => {
      this.ogrenciler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    var yenikayit: Ogrenciler = new Ogrenciler();
    this.dialogRef = this.matDialog.open(OgrencilerDialogComponent, {
      width: '400px',
      data: {
        kayit: yenikayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OgrenciEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgrenciListe();
          }
        });
      }
    });
  }

  Duzenle(kayit: Ogrenciler) {
    this.dialogRef = this.matDialog.open(OgrencilerDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.ogrNo = d.ogrNo;
        this.apiServis.OgrenciDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgrenciListe();
          }
        });
      }
    });
  }

  Sil(kayit: Ogrenciler) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.ogrNo + " Nolu Öğrenci Silinecektir Onaylıyor musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OgrenciSil(kayit.ogrNo).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgrenciListe();
          }
        });
      }
    });
  }

}
