import BreadCrumbComp, { BreadCrumbItem } from "@/components/custom/BreadCrumbComp"

export default function ProfilePage() {
  const breadcrumbs: BreadCrumbItem[] = [
    {
      label: "Dashboard",
      url: "/dashboard"
    },
    {
      label: "Profile",
    }
  ]
  return (
    <>
      <BreadCrumbComp breadcrumbs={breadcrumbs} />
      <div>Profile</div>
      
    </>
  )
}