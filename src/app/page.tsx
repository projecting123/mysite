import { FeatureSection } from '@/components/custom/landing/FeatureSection'
import { HeroSection } from '@/components/custom/landing/Hero'
import { Flex } from '@radix-ui/themes'
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <Flex gap={'4'} justify={'center'} mt={'4'}>
        {
          new Array(2).fill('').map((_, index) => (
            <div key={index} style={{ height: '100dvh', width: '50vw', border: '1px solid red' }}></div>
          ))
        }
      </Flex>
      <FeatureSection />
    </>
  )
}
