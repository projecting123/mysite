import BreadCrumbComp, { BreadCrumbItem } from "@/components/custom/BreadCrumbComp";
import {  } from "motion/react"
export default function QuizPage() {
    const breadcrumbs: BreadCrumbItem[] = [
        {
            label: "Dashboard",
            url: "/dashboard"
        },
        {
            label: "Quizes",
        }
    ]
    return (
        <>
            <BreadCrumbComp breadcrumbs={breadcrumbs} />
        </>
    )
}
