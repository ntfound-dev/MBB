export const siteData = {
  organization: {
    name: "Persatuan Operator, Driver, Helper",
    shortName: "PODH",
    location: "Muara Badak, Kalimantan Timur",
    tagline: "Solid • Kompeten • Lebih Kuat Bersama",
    description:
      "Organisasi pengembangan kompetensi tenaga kerja lapangan dan industri.",
  },

  values: [
    {
      title: "Informasi Jelas",
      description:
        "Jadwal, lokasi, biaya, kuota, instruktur, dan jalur sertifikasi ditampilkan setelah ditetapkan secara resmi.",
    },
    {
      title: "Kompetensi Relevan",
      description:
        "Program disusun untuk kebutuhan tenaga kerja lapangan dan lingkungan industri.",
    },
    {
      title: "Keselamatan Kerja",
      description:
        "Budaya kerja aman menjadi bagian penting dalam setiap program kompetensi.",
    },
  ],

  faq: [
    {
      question: "Apa itu PODH?",
      answer:
        "PODH adalah Persatuan Operator, Driver, Helper. Nama tersebut merupakan identitas organisasi yang bergerak dalam pengembangan kompetensi tenaga kerja lapangan dan industri.",
    },
    {
      question: "Apakah program PODH hanya untuk Operator, Driver, dan Helper?",
      answer:
        "Tidak. Nama PODH adalah identitas organisasi. Program kompetensi dapat lebih luas, termasuk Welder, K3, Operator Crane, Rigger, dan program lain yang relevan.",
    },
    {
      question: "Apakah PODH menerbitkan sertifikat?",
      answer:
        "PODH tidak mengklaim sebagai penerbit sertifikat. Jika suatu pelatihan mencakup sertifikasi, nama lembaga penerbit atau mitra yang berwenang akan dicantumkan pada detail batch.",
    },
    {
      question: "Bagaimana pendaftaran dilakukan?",
      answer:
        "Peserta memilih pelatihan, membaca detail batch, lalu mengisi formulir pendaftaran melalui situs. Saat backend produksi belum aktif, formulir hanya digunakan sebagai simulasi antarmuka dan tidak menyimpan dokumen.",
    },
    {
      question: "Bagaimana dengan permintaan pelatihan dari perusahaan?",
      answer:
        "Permintaan khusus perusahaan dipisahkan dari kegiatan organisasi PODH. Administrasi komersialnya ditangani melalui badan usaha terpisah yang ditunjuk.",
    },
  ],
} as const;
