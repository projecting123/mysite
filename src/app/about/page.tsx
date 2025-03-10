"use client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { BadgeCheckIcon } from "lucide-react";
import { motion } from "motion/react";
export default function AboutPage() {
  const MotionHeading = motion.create(Heading);
  const MotionText = motion.create(Text);
  const MotionBadge = motion.create(Badge);
  return (
    <>
      <Flex gap={'2'} align={"center"}>
        <Flex direction={"column"} gap={"2"}>
          <MotionHeading initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>About Us</MotionHeading>
          <Separator style={{ margin: '0.4rem 0'}}/>
          <MotionBadge initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><BadgeCheckIcon/> Concept Research</MotionBadge>

          <Flex align={"center"} gap={"2"}>
          <MotionText>
            It is a platform that provides a detailed concept for a topic.
            We provide daily quizes and assignments on different topics daily. 
            Besides these, we provide pdf-notes for each topic.
          </MotionText>
          </Flex>
          <Separator />
        </Flex>
      </Flex>
    </>
  )
}
