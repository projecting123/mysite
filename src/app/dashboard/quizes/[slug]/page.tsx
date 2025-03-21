import BreadCrumbComp, { BreadCrumbItem } from "@/components/custom/BreadCrumbComp";
import { SearchParams } from "next/dist/server/request/search-params";
interface Params extends SearchParams {
  slug: string
}
export default async function page({ params }: { params: Params }) {
  const { slug } = params;
  const breadcrumbs: BreadCrumbItem[] = [
    {
      label: "Dashboard",
      url: "/dashboard"
    },
    {
      label: "Quizes",
      url: "/dashboard/quizes"
    },
    {
      label: slug,
    }
  ]
  return (
    <>
      <BreadCrumbComp breadcrumbs={breadcrumbs} />
    </>
  )
}
