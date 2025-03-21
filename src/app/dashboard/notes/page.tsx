import BreadCrumbComp, { BreadCrumbItem } from "@/components/custom/BreadCrumbComp";

export default function page() {
  const breadcrumbs: BreadCrumbItem[] = [
    {
      label: "Dashboard",
      url: "/dashboard"
    },
    {
      label: "Notes"
    }
  ]
  return (
    <>
      <BreadCrumbComp breadcrumbs={breadcrumbs} />
    </>
  )
}
