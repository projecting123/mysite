import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import React from "react"
interface BreadCrumbComponent {
    breadcrumbs: Array<BreadCrumbItem>
}

export interface BreadCrumbItem {
    label: string,
    url?: string
}
export default function BreadCrumbComp({ breadcrumbs }: BreadCrumbComponent) {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    {
                        breadcrumbs.map((breadcrumb, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    {breadcrumb.url ? (
                                        <BreadcrumbLink asChild>
                                            <Link href={breadcrumb.url}>{breadcrumb.label}</Link>
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                            </React.Fragment>
                        ))
                    }
                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}
