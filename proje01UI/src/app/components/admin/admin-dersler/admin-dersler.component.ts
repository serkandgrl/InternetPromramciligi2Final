import { DerslerDialogComponent } from './../../dialogs/dersler-dialog/dersler-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Dersler } from 'src/app/models/Dersler';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-dersler',
  templateUrl: './admin-dersler.component.html',
  styleUrls: ['./admin-dersler.component.scss']
})
export class AdminDerslerComponent implements OnInit {
  dersler: Dersler[];
  dataSource: any;
  displayedColumns = ['dersKodu', 'dersAdi', 'dersKredi', 'dersUyeId', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<DerslerDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.DersListele();
  }

  DersListele() {
    this.apiServis.DersListe().subscribe((d: Dersler[]) => {
      this.dersler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    var yenikayit: Dersler = new Dersler();
    this.dialogRef = this.matDialog.open(DerslerDialogComponent, {
      width: '400px',
      data: {
        kayit: yenikayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.DersEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
          }
        });
      }
    });
  }

  Duzenle(kayit: Dersler) {
    this.dialogRef = this.matDialog.open(DerslerDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.dersKodu = d.dersKodu;
        this.apiServis.DersDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
          }
        });
      }
    });
  }

  Sil(kayit: Dersler) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.dersKodu + " Nolu Bölüm Silinecektir Onaylıyor musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.DersSil(kayit.dersKodu).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
          }
        });
      }
    });
  }

}
