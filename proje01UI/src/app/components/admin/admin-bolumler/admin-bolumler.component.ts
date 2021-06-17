import { BolumlerDialogComponent } from './../../dialogs/bolumler-dialog/bolumler-dialog.component';
import { Bolumler } from './../../../models/Bolumler';
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
  selector: 'app-admin-bolumler',
  templateUrl: './admin-bolumler.component.html',
  styleUrls: ['./admin-bolumler.component.scss']
})
export class AdminBolumlerComponent implements OnInit {
  bolumler: Bolumler[];
  dataSource: any;
  displayedColumns = ['bolumKodu', 'bolumAdi', 'bolumAdres', 'bolumTelefon', 'bolumUyeId', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<BolumlerDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.BolumListele();
  }

  BolumListele() {
    this.apiServis.BolumListe().subscribe((d: Bolumler[]) => {
      this.bolumler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    var yenikayit: Bolumler = new Bolumler();
    this.dialogRef = this.matDialog.open(BolumlerDialogComponent, {
      width: '400px',
      data: {
        kayit: yenikayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.BolumEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.BolumListele();
          }
        });
      }
    });
  }

  Duzenle(kayit: Bolumler) {
    this.dialogRef = this.matDialog.open(BolumlerDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.bolumKodu = d.bolumKodu;
        this.apiServis.BolumDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.BolumListele();
          }
        });
      }
    });
  }

  Sil(kayit: Bolumler) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.bolumKodu + " Nolu Bölüm Silinecektir Onaylıyor musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.BolumSil(kayit.bolumKodu).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.BolumListele();
          }
        });
      }
    });
  }

}