import { NotlarDialogComponent } from './../../dialogs/notlar-dialog/notlar-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Notlar } from 'src/app/models/Notlar';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-notlar',
  templateUrl: './admin-notlar.component.html',
  styleUrls: ['./admin-notlar.component.scss']
})
export class AdminNotlarComponent implements OnInit {
  notlar: Notlar[];
  dataSource: any;
  displayedColumns = ['notOgrenciNo', 'notDersKodu', 'notVize', 'notFinal', 'notOrtalama', 'notUyeId', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<NotlarDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.NotListele();
  }

  NotListele() {
    this.apiServis.NotListe().subscribe((d: Notlar[]) => {
      this.notlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    var yenikayit: Notlar = new Notlar();
    this.dialogRef = this.matDialog.open(NotlarDialogComponent, {
      width: '400px',
      data: {
        kayit: yenikayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.NotEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.NotListele();
          }
        });
      }
    });
  }

  Duzenle(kayit: Notlar) {
    this.dialogRef = this.matDialog.open(NotlarDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.notVize = d.notVize;
        this.apiServis.NotDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.NotListele();
          }
        });
      }
    });
  }

  Sil(kayit: Notlar) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.notOgrenciNo + " Nolu Öğrenciye Ait Not Silinecektir Onaylıyor musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.NotSil(kayit.notOgrenciNo).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.NotListele();
          }
        });
      }
    });
  }

}
