"use client";
import { motion } from "motion/react";
export default function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeIn" }}
            >
                {children}
            </motion.div>
        </>
    )
}