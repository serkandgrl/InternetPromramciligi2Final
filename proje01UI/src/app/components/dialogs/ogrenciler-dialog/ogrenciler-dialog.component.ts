import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ogrenciler } from 'src/app/models/Ogrenciler';

@Component({
  selector: 'app-ogrenciler-dialog',
  templateUrl: './ogrenciler-dialog.component.html',
  styleUrls: ['./ogrenciler-dialog.component.scss']
})
export class OgrencilerDialogComponent implements OnInit {
  dialogBaslik: string;
  yenikayit: Ogrenciler;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<OgrencilerDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Öğrenci Ekle";
      this.yenikayit = new Ogrenciler();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Öğrenci Düzenle",
        this.yenikayit = data.kayit;
    }
    this.frm = this.FormOluştur();

  }

  ngOnInit() {
  }
  FormOluştur() {
    return this.frmBuild.group({
      ogrNo: [this.yenikayit.ogrNo],
      ogrTC: [this.yenikayit.ogrTC],
      ogrAd: [this.yenikayit.ogrAd],
      ogrSoyad: [this.yenikayit.ogrSoyad],
      ogrCinsiyet: [this.yenikayit.ogrCinsiyet],
      ogrTelefon: [this.yenikayit.ogrTelefon],
      ogrMail: [this.yenikayit.ogrMail],
      ogrBolumKodu: [this.yenikayit.ogrBolumKodu],
      ogrUyeId: [this.yenikayit.ogrUyeId]
    });
  }

}
