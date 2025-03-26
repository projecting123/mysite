'use client';
import { FeatureSection } from '@/components/custom/landing/FeatureSection'
import { HeroSection } from '@/components/custom/landing/Hero'
import { Flex } from '@radix-ui/themes'
import { ArrowBigDownDash } from 'lucide-react'
import { animate, motion } from 'motion/react'
import { useEffect, useRef } from 'react';

const cards = [
  {
    title: ''
  }
]
export default function LandingPage() {
  const MotionArrowBigDownDash = motion.create(ArrowBigDownDash);
  const ref = useRef(null);

  useEffect(() => {
    animate(ref.current,
      { opacity: [0, 1], y: [20, 0] },
      { delay: 0.3, duration: 1, type: "tween", repeat: Infinity, repeatType: 'reverse' });
  }, [])
  return (
    <>
      <HeroSection />
      <Flex justify={'center'} mt={'4'} align={'center'} height={'25vh'}>
        <MotionArrowBigDownDash ref={ref} />
      </Flex>

      <Flex justify={'center'} align={'center'} height={'50vh'}>
        {/* Some content will be placed here - later*/}
      </Flex>

      <FeatureSection />
    </>
  )
}
