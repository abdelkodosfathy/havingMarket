const featuresByType = {
  housing: [
    { value: "0101", enLabel: "Compound", arLabel: "كمبوند" },
    { value: "0102", enLabel: "Swimming Pool", arLabel: "حمام سباحة" },
    { value: "0103", enLabel: "Storage Unit", arLabel: "وحدة تخزين" },
    { value: "0104", enLabel: "Main Street", arLabel: "شارع رئيسي" },
    {
      value: "0105",
      enLabel: "Corner Main Street",
      arLabel: "ناصية شارع رئيسي",
    },
    { value: "0106", enLabel: "Garden View", arLabel: "اطلالة حديقة" },
    {
      value: "0107",
      enLabel: "Wide Court View",
      arLabel: "اطلالة ساحة واسعة",
    },
    { value: "0108", enLabel: "Service Area", arLabel: "منطقة خدمات" },
    { value: "0109", enLabel: "Classic Façade", arLabel: "واجهة كلاسيكية" },
    { value: "0110", enLabel: "Marble Entrance", arLabel: "مداخل رخام" },
    { value: "0111", enLabel: "Garage", arLabel: "جراج" },
    { value: "0112", enLabel: "Internet", arLabel: "انترنت" },
    { value: "0113", enLabel: "Security", arLabel: "امن وحراسة" },
    {
      value: "0114",
      enLabel: "Surveillance Cameras",
      arLabel: "كاميرات مراقبة",
    },
    { value: "0115", enLabel: "Balcony", arLabel: "بلكونة" },
    { value: "0116", enLabel: "Elevator", arLabel: "اسانسيبر" },
    {
      value: "0117",
      enLabel: "Air Conditioning and Heating",
      arLabel: "تكييف وتدفئة",
    },
    { value: "0118", enLabel: "Gym", arLabel: "جيم" },
    { value: "0119", enLabel: "Kitchen Appliances", arLabel: "اجهزة المطبخ" },
    { value: "0120", enLabel: "Central Dish", arLabel: "دش مركزي" },
    { value: "0121", enLabel: "Green Spaces", arLabel: "مساحات خضراء" },
    { value: "0122", enLabel: "Water Features", arLabel: "مسطحات مائية" },
    {
      value: "0123",
      enLabel: "Modern Lighting Systems",
      arLabel: "انظمة اضاءة حديثة",
    },
    { value: "0124", enLabel: "Smart Home", arLabel: "منزل ذكي" },
    {
      value: "0125",
      enLabel: "Shopping and Entertainment Area",
      arLabel: "منطقة تسوق وترفيه",
    },
    { value: "0126", enLabel: "Mini Compound", arLabel: "ميني كمباوند" },
    { value: "0194", enLabel: "Private Pool", arLabel: "مسبح خاص" },
    { value: "0195", enLabel: "Private Garden", arLabel: "حديقة خاصة" },
    { value: "0196", enLabel: "Kids Area", arLabel: "كيدز ايريا" },
  ],
  industrial: [
    { value: "0201", enLabel: "Main Street", arLabel: "شارع رئيسي" },
    {
      value: "0202",
      enLabel: "Corner Main Street",
      arLabel: "ناصية شارع رئيسي",
    },
    { value: "0203", enLabel: "Garden View", arLabel: "اطلالة حديقة" },
    { value: "0204", enLabel: "Courtyard View", arLabel: "اطلالة ساحة فناء" },
    { value: "0205", enLabel: "Industrial Area", arLabel: "منطقة صناعات" },
    { value: "0206", enLabel: "Water Meter", arLabel: "عداد مياه" },
    { value: "0207", enLabel: "Electricity Meter", arLabel: "عداد كهرباء" },
    { value: "0208", enLabel: "Internet", arLabel: "انترنت" },
    { value: "0209", enLabel: "Service Area", arLabel: "منطقة خدمات" },
  ],
  commercial: [
    { value: "0301", enLabel: "Glass Façade", arLabel: "واجهة زجاجية" },
    { value: "0302", enLabel: "Central Dish", arLabel: "دش مركزي" },
    { value: "0303", enLabel: "Commercial Mall", arLabel: "مول تجاري" },
    { value: "0304", enLabel: "Administrative Mall", arLabel: "مول اداري" },
    { value: "0305", enLabel: "Internet", arLabel: "انترنت" },
    { value: "0306", enLabel: "Marble Entrance", arLabel: "مداخل رخام" },
    { value: "0307", enLabel: "Balcony", arLabel: "بلكونة" },
    {
      value: "0308",
      enLabel: "Modern Lighting Systems",
      arLabel: "انظمة اضاءة حديثة",
    },
    {
      value: "0309",
      enLabel: "Surveillance Cameras",
      arLabel: "كاميرات مراقبة",
    },
    { value: "0310", enLabel: "Elevator", arLabel: "اسانسير" },
    { value: "0311", enLabel: "Security", arLabel: "امن وحراسة" },
    { value: "0312", enLabel: "Garage", arLabel: "جراج" },
    {
      value: "0313",
      enLabel: "Medical Building Only",
      arLabel: "مبني طبي فقط",
    },
    { value: "0314", enLabel: "Industrial Area", arLabel: "منطقة صناعات" },
    { value: "0315", enLabel: "Kitchen Appliances", arLabel: "اجهزة المطبخ" },
    {
      value: "0316",
      enLabel: "Green Space View",
      arLabel: "اطلالة علي مساحات خضراء",
    },
    { value: "0317", enLabel: "Corner Street", arLabel: "ناصية شارع" },
  ],
  coastal: [
    { value: "0401", enLabel: "Hotel", arLabel: "فندق" },
    {
      value: "0402",
      enLabel: "Direct Sea View",
      arLabel: "اطلالة مباشرة علي البحر",
    },
    { value: "0403", enLabel: "First Row Sea", arLabel: "صف اول علي البحر" },
    { value: "0404", enLabel: "Pool View", arLabel: "اطلالة حمام سباحة" },
    {
      value: "0405",
      enLabel: "Green Space View",
      arLabel: "اطلالة مساحة خضراء",
    },
    {
      value: "0406",
      enLabel: "Wide Area View",
      arLabel: "اطلالة مساحة واسعة",
    },
    { value: "0407", enLabel: "Security", arLabel: "امن وحراسة" },
    { value: "0408", enLabel: "Elevator", arLabel: "اسانسير" },
    { value: "0409", enLabel: "Main Street", arLabel: "شارع رئيسي" },
    {
      value: "0410",
      enLabel: "Corner Main Street",
      arLabel: "ناصية شارع رئيسي",
    },
    {
      value: "0411",
      enLabel: "Surveillance Camera",
      arLabel: "كاميرا مراقبة",
    },
    { value: "0412", enLabel: "Garage", arLabel: "جراج" },
    { value: "0413", enLabel: "Balcony", arLabel: "بلكونة" },
    {
      value: "0414",
      enLabel: "Air Conditioning and Heating",
      arLabel: "تكييف وتدفئة",
    },
    { value: "0415", enLabel: "Gym", arLabel: "جيم" },
    {
      value: "0416",
      enLabel: "Kitchen Appliances",
      arLabel: "اجهزة المطبخ",
    },
    {
      value: "0417",
      enLabel: "Service and Entertainment Area",
      arLabel: "منطقة خدمات وترفيه",
    },
    { value: "0418", enLabel: "Swimming Pool", arLabel: "حمام سباحة" },
    { value: "0419", enLabel: "Central Dish", arLabel: "دش مركزي" },
    { value: "0420", enLabel: "Classic Façade", arLabel: "واجهة كلاسيكية" },
    { value: "0421", enLabel: "Modern Façade", arLabel: "واجهة مودرن" },
    { value: "0422", enLabel: "Marble Entrance", arLabel: "مدخل رخام" },
    { value: "0423", enLabel: "Green Spaces", arLabel: "مساحات خضراء" },
    { value: "0424", enLabel: "Water Features", arLabel: "مسطحات مائية" },
    {
      value: "0425",
      enLabel: "Modern Lighting Systems",
      arLabel: "انظمة اضاءة حديثة",
    },
    { value: "0426", enLabel: "Internet", arLabel: "انترنت" },
    {
      value: "0427",
      enLabel: "Smart Home Technology",
      arLabel: "تكنولوجيا المنزل الذكي",
    },
    { value: "0428", enLabel: "Private Gym", arLabel: "جيم خاص" },
    { value: "0429", enLabel: "Private Pool", arLabel: "مسبح خاص" },
    { value: "0430", enLabel: "Private Garden", arLabel: "حديقة خاصة" },
    {
      value: "0431",
      enLabel: "Children's Pool",
      arLabel: "مسبح للاطفال",
    },
    { value: "0432", enLabel: "Kids Area", arLabel: "كيدز ايريا" },
  ],
  land: [
    { value: "0501", enLabel: "Compound", arLabel: "كمبوند" },
    { value: "0502", enLabel: "Main Street", arLabel: "شارع رئيسي" },
    {
      value: "0082",
      enLabel: "Corner Main Street",
      arLabel: "ناصية شارع رءيسي",
    },
    { value: "0503", enLabel: "Garden View", arLabel: "اطلالة حديقة" },
    { value: "0504", enLabel: "Courtyard View", arLabel: "اطلالة ساحة فناء" },
    { value: "0505", enLabel: "Industrial Area", arLabel: "منطقة صناعات" },
    { value: "0506", enLabel: "Water Meter", arLabel: "عداد مياه" },
    { value: "0507", enLabel: "Electricity Meter", arLabel: "عداد كهرباء" },
    { value: "0508", enLabel: "Internet", arLabel: "انترنت" },
    { value: "0509", enLabel: "Service Area", arLabel: "منطقة خدمات" },
  ],
};

export default featuresByType;
