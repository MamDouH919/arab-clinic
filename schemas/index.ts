import * as z from "zod";
import i18n from 'i18next';
import i18nConfig from "@/i18nConfig";

const fileSchema = z.instanceof(File, { message: i18n.language === "en" ? "Required" : "الملف مطلوب" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)

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

export const addJobSchema = z.object({
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
  file: fileSchema.refine(file => file.size > 0 && file.size < 150 * 1024, i18n.language === "en" ? "File must be smaller than 200KB" : "يجب أن يكون الملف أصغر من 200 كيلوبايت")
})

// const fileSchema = z.instanceof(File, { message: i18n.language === "en" ? "Required" : "الملف مطلوب" })
export const AddNewsSchema = z.object({
  description: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  descriptionAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  title: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  titleAr: z.string({
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }).min(1, {
    message: i18n.language === "en" ? "field is required" : "الحقل مطلوب",
  }),
  image: imageSchema.refine(file => file.size < 250 * 1024 && file.size > 0, i18n.language === "en" ? "File must be smaller than 250KB" : "يجب أن يكون الملف أصغر من 250 كيلوبايت")
})

export const UpdateNewsSchema = AddNewsSchema.extend({
  image: imageSchema.optional(),
})
