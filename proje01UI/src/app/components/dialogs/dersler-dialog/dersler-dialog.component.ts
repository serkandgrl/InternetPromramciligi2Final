import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dersler } from 'src/app/models/Dersler';

@Component({
  selector: 'app-dersler-dialog',
  templateUrl: './dersler-dialog.component.html',
  styleUrls: ['./dersler-dialog.component.scss']
})
export class DerslerDialogComponent implements OnInit {
  dialogBaslik: string;
  yenikayit: Dersler;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DerslerDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Ders Ekle";
      this.yenikayit = new Dersler();
    }
  
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Ders Düzenle",
        this.yenikayit = data.kayit;
    }
    this.frm = this.FormOluştur();

  }

  ngOnInit() {
  }
  FormOluştur() {
    return this.frmBuild.group({
      dersKodu: [this.yenikayit.dersKodu],
      dersAdi: [this.yenikayit.dersAdi],
      dersKredi: [this.yenikayit.dersKredi],
      dersOgretimElemanı: [this.yenikayit.dersOgretimElemanı],
      dersUyeId: [this.yenikayit.dersUyeId]
    });
  }

}
