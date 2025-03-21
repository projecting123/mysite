import BreadCrumbComp, { BreadCrumbItem } from "@/components/custom/BreadCrumbComp"

export default function CoursesPage() {
    const breadcrumbs: BreadCrumbItem[] = [
        {
            label: "Dashboard",
            url: "/dashboard"
        },
        {
            label: "Courses",
        }
    ]
    return (
        <>
            <BreadCrumbComp breadcrumbs={breadcrumbs} />
        </>
    )
}
