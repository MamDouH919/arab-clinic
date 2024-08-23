import * as z from "zod";
import i18n from 'i18next';

export const AddHighlightsSchema = z.object({
  number: z.coerce.number({
    message: i18n.language === "en" ? "Allowed numbers only" : "الرقم المسموح به فقط",
  }),
  nameEn: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  nameAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
});

export const AddAvailableJobsSchema = z.object({
  jobNameEn: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  jobNameAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  available: z.boolean(),
});

console.log(i18n.language);

const fileSchema = z.instanceof(File, { message: i18n.language === "en" ? "Required" : "الملف مطلوب" })
export const addJobSchema = z.object({
  //   name
  // governorate
  // phone
  // email
  // file
  // jobName
  name: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  governorate: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  phone: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  jobName: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  email: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).email({
    message: i18n.language === "en" ? "must be a valid email" : "يجب أن يكون بريد إلكتروني صحيح",
  }),
  file: fileSchema.refine(file => file.size > 0, i18n.language === "en" ? "Required" : "الملف مطلوب"),
})

