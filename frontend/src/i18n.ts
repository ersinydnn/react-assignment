import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      companies: "Companies",
      products: "Products",
      logout: "Logout",
      welcome: "Welcome, {{username}}!",
      dashboard: "Dashboard",
      numberOfCompanies: "Number of Companies in the System",
      latestAddedCompanies: "Lastly Added Companies",
      productCategoryChart: "Product Category Chart",

      companyName: "Company Name",
      companyLegalNumber: "Company Legal Number",
      country: "Country",
      website: "Web Site",
      action: "Action",
      edit: "Edit",
      delete: "Delete",
      searchByCompanyName: "Search by company name...",
      addNewCompany: "Add New Company",
      editCompany: "Edit Company",
      enterCompanyName: "Please enter the company name...",
      enterCompanyLegalNumber: "Please enter the company legal number",
      enterCountry: "Please enter the country",

      productName: "Product Name",
      category: "Category",
      amount: "Amount",
      unit: "Unit",
      company: "Company",
      searchByProductName: "Search by product name...",
      addNewProduct: "Add New Product",
      editProduct: "Edit Product",
      enterProductName: "Please enter the product name...",
      enterCategory: "Please enter the category...",
      enterAmount: "Please enter the amount...",
      enterUnit: "Please enter the unit...",
      enterCompany: "Please enter the company...",
    },
  },
  tr: {
    translation: {
      home: "Ana Sayfa",
      companies: "Şirketler",
      products: "Ürünler",
      logout: "Çıkış",
      welcome: "Hoşgeldin, {{username}}!",
      dashboard: "Gösterge Paneli",
      numberOfCompanies: "Sistemdeki Şirket Sayısı",
      latestAddedCompanies: "En Son Eklenen Şirketler",
      productCategoryChart: "Ürün Kategorisi Grafiği",

      companyName: "Şirket Adı",
      companyLegalNumber: "Şirket Hukuk Numarası",
      country: "Ülke",
      website: "Web Sitesi",
      action: "İşlem",
      edit: "Düzenle",
      delete: "Sil",
      searchByCompanyName: "Şirket adına göre ara...",
      addNewCompany: "Yeni Şirket Ekle",
      editCompany: "Şirketi Düzenle",
      enterCompanyName: "Lütfen şirket adı girin...",
      enterCompanyLegalNumber: "Lütfen şirket hukuk numarasını girin",
      enterCountry: "Lütfen ülke girin",

      productName: "Ürün Adı",
      category: "Kategori",
      amount: "Miktar",
      unit: "Birim",
      company: "Şirket",
      searchByProductName: "Ürün adına göre ara...",
      addNewProduct: "Yeni Ürün Ekle",
      editProduct: "Ürünü Düzenle",
      enterProductName: "Lütfen ürün adını girin...",
      enterCategory: "Lütfen kategoriyi girin...",
      enterAmount: "Lütfen miktarı girin...",
      enterUnit: "Lütfen birimi girin...",
      enterCompany: "Lütfen şirketi girin...",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
