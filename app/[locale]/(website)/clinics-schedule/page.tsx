// import "./styles.css";
import { getBranchesDropDown } from "@/actions/dropDown";
import initTranslations from "@/app/i18n";
import BreadCrumb from "@/component/ui/BreadCrumb";
import NoData from "@/component/ui/NoData";
import Content from "./_Content";
import { Stack } from "@mui/material";

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const availableBranches = await getBranchesDropDown()

  const data = availableBranches.map((branch) => ({
    id: branch.id,
    name: branch.name,
    nameAr: branch.nameAr,
  }))
  const { t } = await initTranslations(locale, ['website'])

  return (
    <>
      <BreadCrumb pageLink={"schedules"} bgImage="/staticImages/clinics-schedule-bg.webp" />
      <Stack p={10}>
        {data.length === 0 ? <NoData label={t("noData")} /> : <Content availableBranches={data} />}
      </Stack>
    </>
  );
}

export default Page