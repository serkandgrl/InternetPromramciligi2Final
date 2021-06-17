using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace proje01.ViewModel
{
    public class DerslerModel
    {
        public string dersKodu { get; set; }
        public string dersAdi { get; set; }
        public string dersKredi { get; set; }
        public string dersOgretimElemanı { get; set; }
        public int dersUyeId { get; set; }
    }
}