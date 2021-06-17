import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notlar } from 'src/app/models/Notlar';

@Component({
  selector: 'app-notlar-dialog',
  templateUrl: './notlar-dialog.component.html',
  styleUrls: ['./notlar-dialog.component.scss']
})
export class NotlarDialogComponent implements OnInit {
  dialogBaslik: string;
  yenikayit: Notlar;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NotlarDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Not Ekle";
      this.yenikayit = new Notlar();
    }
  
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Not Düzenle",
        this.yenikayit = data.kayit;
    }
    this.frm = this.FormOluştur();

  }

  ngOnInit() {
  }
  FormOluştur() {
    return this.frmBuild.group({
      notOgrenciNo: [this.yenikayit.notOgrenciNo],
      notDersKodu: [this.yenikayit.notDersKodu],
      notVize: [this.yenikayit.notVize],
      notFinal: [this.yenikayit.notFinal],
      notOrtalama: [this.yenikayit.notOrtalama],
      notUyeId: [this.yenikayit.notUyeId]
    });
  }

}
