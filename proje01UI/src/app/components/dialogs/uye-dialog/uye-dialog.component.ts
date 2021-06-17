import { Uye } from './../../../models/Uye';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.scss']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  yenikayit: Uye;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Üye Ekle";
      this.yenikayit = new Uye();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Üye Düzenle",
        this.yenikayit = data.kayit;
    }
    this.frm = this.FormOluştur();

  }

  ngOnInit() {
  }
  FormOluştur() {
    return this.frmBuild.group({
      uyeKullaniciAdi: [this.yenikayit.uyeKullaniciAdi],
      uyeEmail: [this.yenikayit.uyeEmail],
      uyeSifre: [this.yenikayit.uyeSifre],
      uyeAdSoyad: [this.yenikayit.uyeAdSoyad],
      uyeAdmin: [this.yenikayit.uyeAdmin]
    });
  }

}
