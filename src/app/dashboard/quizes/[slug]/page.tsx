import BreadCrumbComp, { BreadCrumbItem } from "@/components/custom/BreadCrumbComp";
interface Params {
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
