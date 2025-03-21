"use client"
import { getWords } from "@/utils/functions/getWords";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { animate, motion, stagger, Variants } from "motion/react";
import { useEffect } from "react";
import { ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
export default function Homepage() {
  const MotionFlex = motion.create(Flex);
  const MotionHeading = motion.create(Heading);
  const MotionText = motion.create(Text);
  const MotionButton = motion.create(Button);
  const textVariants: Variants = {
    initial: { opacity: 0, y: 20, scale: 1.5 },
    fadeIn: { opacity: 0.7, y: 0, scale: 1 }
  }

  const heroButtonsVariants: Variants = {
    initial: (x: number) => ({ opacity: 0, scale: 2 , x }),
    fadeIn: { opacity: 1, scale: 1, x: 0 }
  }

  const heroButtons = [`Explore now`, `Join with us`];
  const { words } = getWords("Welcome to Concept Research");

  useEffect(() => {
    animate("#headingWords", { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.25), duration: 0.3, type: "tween" })
  }, [])
  return (
    <>
      <MotionFlex justify={'center'} direction={'column'} align={'center'}>
        <Flex wrap={"wrap"} justify={'center'} mt={'4'} mb={'1'}>
          {
            words.map((word, index) => (
              <MotionHeading
                variants={textVariants}
                id="headingWords"
                key={index}
                size={{ initial: '7', sm: '8', lg: '9'}}
              >
                {word}&nbsp;
              </MotionHeading>
            ))
          }
        </Flex>

        <MotionText size={{ initial: '2', sm: '4' }} align={'center'} style={{ fontStyle: "italic" }} variants={textVariants} initial="initial" animate="fadeIn" transition={{ delay: 1, duration: 0.5 }}>
          Made for students to provide the concept behind a topic or a section.
        </MotionText>
        {}
        <Flex mt={'4'} gap={'4'}>
          {heroButtons.map((button, index) => (
            <MotionButton key={index} custom={index === 0 ? -50 : 50} variants={heroButtonsVariants} initial="initial" animate="fadeIn" transition={{ delay: 2 }} style={{ cursor: 'pointer' }} size={'sm'}>
              {button}{index == 0 && <ArrowUpRight/>}
            </MotionButton>
          ))}
        </Flex>
      </MotionFlex>
    </>
  )
}
