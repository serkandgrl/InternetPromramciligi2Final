//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace proje01.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Uye
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Uye()
        {
            this.Bolumler = new HashSet<Bolumler>();
            this.Dersler = new HashSet<Dersler>();
            this.Notlar = new HashSet<Notlar>();
            this.Ogrenciler = new HashSet<Ogrenciler>();
        }
    
        public int uyeId { get; set; }
        public string uyeKullaniciAdi { get; set; }
        public string uyeEmail { get; set; }
        public string uyeSifre { get; set; }
        public string uyeAdSoyad { get; set; }
        public string uyeAdmin { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Bolumler> Bolumler { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Dersler> Dersler { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Notlar> Notlar { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Ogrenciler> Ogrenciler { get; set; }
    }
}
