import BreadCrumbComp, { BreadCrumbItem } from "@/components/custom/BreadCrumbComp";
export default function NotificationsPage() {
  const breadcrumbs: BreadCrumbItem[] = [
    {
      label: "Dashboard",
      url: "/dashboard"
    },
    {
      label: "Notifications",
    }
  ]
  return (
    <BreadCrumbComp breadcrumbs={breadcrumbs} />
  )
}

