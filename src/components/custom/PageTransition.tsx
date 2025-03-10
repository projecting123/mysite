"use client";
import { motion } from "motion/react";
export default function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeIn"}}
            >
                {children}
            </motion.div>
        </>
    )
}