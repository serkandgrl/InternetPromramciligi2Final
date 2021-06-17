import { Bolumler } from './../../../models/Bolumler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bolumler-dialog',
  templateUrl: './bolumler-dialog.component.html',
  styleUrls: ['./bolumler-dialog.component.scss']
})
export class BolumlerDialogComponent implements OnInit {
  dialogBaslik: string;
  yenikayit: Bolumler;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BolumlerDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Bölüm Ekle";
      this.yenikayit = new Bolumler();
    }
  
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Bölüm Düzenle",
        this.yenikayit = data.kayit;
    }
    this.frm = this.FormOluştur();

  }

  ngOnInit() {
  }
  FormOluştur() {
    return this.frmBuild.group({
      bolumKodu: [this.yenikayit.bolumKodu],
      bolumAdi: [this.yenikayit.bolumAdi],
      bolumAdres: [this.yenikayit.bolumAdres],
      bolumTelefon: [this.yenikayit.bolumTelefon],
      bolumUyeId: [this.yenikayit.bolumUyeId]
    });
  }

}
