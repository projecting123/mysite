"use client"
import { getWords } from "@/utils/functions/getWords";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { animate, AnimationOptions, DOMKeyframesDefinition, stagger } from "motion/react";
import { useEffect } from "react";
import { ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
export function HeroSection() {
  const { words } = getWords("Welcome to Concept Research");
  const options: AnimationOptions = {
    delay: 1,
    duration: 0.3,
    type: "tween"
  }

  const fadeIn: DOMKeyframesDefinition = {
    opacity: [0, 1],
    y: [20, 0],
  }

  useEffect(() => {
    animate("#headingWords", { ...fadeIn, skewX: [-45, 0], scaleY: [0, 1] }, { delay: stagger(0.25), duration: 0.3, type: "tween" });
    animate("#headingDesc", { ...fadeIn }, options);
    animate("#heroButtonFirst", { opacity: [0, 1], x: [-50, 0] }, options);
    animate("#heroButtonSecond", { opacity: [0, 1], x: [50, 0] }, options);
  }, [])
  return (
    <>
      <Flex justify={'center'} direction={'column'} align={'center'}>
        <Flex wrap={"wrap"} justify={'center'} mt={'4'} mb={'1'}>
          {
            words.map((word, index) => (
              <Heading
                id="headingWords"
                key={index}
                size={{ initial: '7', sm: '8', lg: '9' }}
                style={{ transformOrigin: "bottom" }}
              >
                {word}&nbsp;
              </Heading>
            ))
          }
        </Flex>

        <Text size={{ initial: '2', sm: '4' }} align={'center'} style={{ fontStyle: "italic" }} id="headingDesc">
          Made for students to provide the concept behind a topic or a section.
        </Text>
        <Flex mt={'2'} gap={'4'}>
          <Button variant={'outline'} onMouseOver={() => animate('#icon', { x: [0, 5, 0], y: [0, -5, 0]}, { duration: 0.3 })} size={'sm'} id="heroButtonFirst" style={{ cursor: 'pointer'}}>Explore now<ArrowUpRight id="icon"/></Button>
          <Button size={'sm'} id="heroButtonSecond" style={{ cursor: 'pointer'}}>Join with us</Button>
        </Flex>
      </Flex>
    </>
  )
}
