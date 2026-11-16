export const screeningQuestions = [
  // ==========================================
  // 1. GEJALA SAAT INI
  // ==========================================

  {
    id: "breathingDifficulty",
    category: "GEJALA SAAT INI",
    title: "Apakah Anda mengalami kesulitan bernapas saat ini?",
    description:
      "Termasuk napas terasa lebih pendek atau lebih sulit dibandingkan kondisi biasanya.",
    options: [
      { label: "Ya", value: "yes" },
      { label: "Tidak", value: "no" },
      { label: "Tidak yakin", value: "unsure" },
    ],
    followUp: {
      id: "symptomOnset",
      title: "Kapan keluhan ini mulai terasa?",
      description: "Informasi ini membantu Anda menjelaskan perubahan kondisi kepada tenaga medis.",
      options: ["Baru saja atau mendadak", "Dalam beberapa jam terakhir", "Sudah lebih lama", "Tidak yakin"],
    },
  },

  {
    id: "oneSidedChestPain",
    category: "GEJALA SAAT INI",
    title: "Apakah Anda merasakan nyeri pada salah satu sisi dada?",
    description:
      "Perhatikan apakah nyeri terasa lebih dominan pada sisi kanan atau kiri dada.",
    options: [
      { label: "Ya", value: "yes" },
      { label: "Tidak", value: "no" },
      { label: "Tidak yakin", value: "unsure" },
    ],
    followUp: {
      id: "symptomOnset",
      title: "Kapan keluhan ini mulai terasa?",
      description: "Informasi ini membantu Anda menjelaskan perubahan kondisi kepada tenaga medis.",
      options: ["Baru saja atau mendadak", "Dalam beberapa jam terakhir", "Sudah lebih lama", "Tidak yakin"],
    },
  },

  {
    id: "rapidBreathing",
    category: "GEJALA SAAT INI",
    title: "Apakah napas Anda terasa lebih cepat dari biasanya?",
    description:
      "Perhatikan perubahan frekuensi pernapasan dibandingkan kondisi normal Anda.",
    options: [
      { label: "Ya", value: "yes" },
      { label: "Tidak", value: "no" },
      { label: "Tidak yakin", value: "unsure" },
    ],
  },

  // ==========================================
  // 2. TANDA BAHAYA
  // ==========================================

  {
    id: "severeBreathing",
    category: "TANDA BAHAYA",
    title: "Apakah Anda mengalami sesak napas berat atau mendadak saat ini?",
    description:
      "Perhatikan kesulitan bernapas yang muncul tiba-tiba atau terasa sangat berat.",
    options: [
      { label: "Ya", value: "yes" },
      { label: "Tidak", value: "no" },
      { label: "Tidak yakin", value: "unsure" },
    ],
    safety: {
      priority: "emergency",
      triggerValues: ["yes", "unsure"],
      message:
        "Sesak napas berat atau mendadak merupakan tanda bahaya yang memerlukan pertolongan medis darurat. Jangan menunda pertolongan untuk melanjutkan skrining.",
    },
  },

  {
    id: "chestTraumaPain",
    category: "TANDA BAHAYA",
    title:
      "Apakah Anda mengalami nyeri dada setelah benturan atau cedera dada?",
    description:
      "Contohnya setelah kecelakaan, jatuh, benturan keras, atau luka pada area dada.",
    options: [
      { label: "Ya", value: "yes" },
      { label: "Tidak", value: "no" },
      { label: "Tidak yakin", value: "unsure" },
    ],
    safety: {
      priority: "urgent",
      triggerValues: ["yes", "unsure"],
      message:
        "Nyeri dada setelah cedera memerlukan penilaian medis segera. Jika disertai sesak napas, pingsan, atau kondisi memburuk, segera cari pertolongan darurat.",
    },
  },

  {
    id: "faintingConfusion",
    category: "TANDA BAHAYA",
    title:
      "Apakah Anda mengalami pingsan, hampir pingsan, atau kebingungan bersamaan dengan keluhan dada atau pernapasan?",
    description:
      "Perhatikan perubahan kesadaran atau kondisi tubuh yang muncul bersamaan dengan gangguan pada dada atau pernapasan.",
    options: [
      { label: "Ya", value: "yes" },
      { label: "Tidak", value: "no" },
      { label: "Tidak yakin", value: "unsure" },
    ],
    safety: {
      priority: "emergency",
      triggerValues: ["yes", "unsure"],
      message:
        "Pingsan atau kebingungan yang muncul bersamaan dengan keluhan dada atau pernapasan merupakan tanda bahaya. Segera cari pertolongan medis darurat.",
    },
  },

  // ==========================================
  // 3. FAKTOR RIWAYAT
  // ==========================================

  {
    id: "recentTrauma",
    category: "FAKTOR RIWAYAT",
    title:
      "Apakah Anda baru mengalami cedera, benturan, atau kecelakaan yang melibatkan dada?",
    description:
      "Misalnya kecelakaan kendaraan, jatuh, benturan keras, atau luka pada area dada.",
    options: [
      { label: "Ya", value: "yes" },
      { label: "Tidak", value: "no" },
      { label: "Tidak yakin", value: "unsure" },
    ],
  },

  {
    id: "chestProcedure",
    category: "FAKTOR RIWAYAT",
    title:
      "Apakah Anda baru menjalani tindakan medis yang melibatkan area dada?",
    description:
      "Misalnya prosedur medis atau tindakan yang melibatkan paru-paru dan rongga dada.",
    options: [
      { label: "Ya", value: "yes" },
      { label: "Tidak", value: "no" },
      { label: "Tidak yakin", value: "unsure" },
    ],
  },

  {
    id: "previousPneumothorax",
    category: "FAKTOR RIWAYAT",
    title: "Apakah Anda pernah didiagnosis mengalami pneumothorax sebelumnya?",
    description:
      "Pneumothorax merupakan kondisi ketika udara masuk ke rongga pleura sehingga dapat menyebabkan paru-paru mengempis.",
    options: [
      { label: "Ya", value: "yes" },
      { label: "Tidak", value: "no" },
      { label: "Tidak yakin", value: "unsure" },
    ],
  },

  {
    id: "lungDisease",
    category: "FAKTOR RIWAYAT",
    title:
      "Apakah Anda memiliki riwayat penyakit paru yang pernah didiagnosis oleh tenaga medis?",
    description:
      "Contohnya penyakit paru obstruktif kronis (PPOK), tuberkulosis paru, atau penyakit paru lainnya.",
    options: [
      { label: "Ya", value: "yes" },
      { label: "Tidak", value: "no" },
      { label: "Tidak yakin", value: "unsure" },
    ],
  },
];
