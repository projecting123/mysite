import BreadCrumbComp, { BreadCrumbItem } from "@/components/custom/BreadCrumbComp";

export default async function page() {
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
      label: 'Something',
    }
  ]
  return (
    <>
      <BreadCrumbComp breadcrumbs={breadcrumbs} />
    </>
  )
}
