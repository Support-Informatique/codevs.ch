// react
import { useState, useEffect } from 'react'

// images
import bluredBackground from '@/assets/images/hero-background.png'
import darkLogo from '@/assets/images/logo-support-informatique-dark.svg'
import whiteBottomRounded from '@/assets/images/white-bottom-rounded.svg'

// components
import Button from '@/components/utils/Button'

// utils
import { navigateToSection } from '@/utils/accessibility'

const Hero: React.FC = () => {
  const correctSequence = [3, 3, 1, 2]
  const [sequence, setSequence] = useState<number[]>([])
  const scrollToWhyUs = () => {
    navigateToSection('why-us')
  }
  const openLink = (link: string) => {
    const decodedLink = atob(link)
    window.open(decodedLink, '_blank')
  }

  const handleClick = (color: number) => {
    setSequence(prev => [...prev, color])
  }

  useEffect(() => {
    if (sequence.length !== 4) return
    const isCorrect = sequence.every(
      (value, index) => value === correctSequence[index]
    )
    if (!isCorrect) return
    openLink('aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ==')
  }, [sequence])

  return (
    <>
      <img
        src={bluredBackground}
        alt='blured background image'
        className='hidden md:block w-full h-full object-cover object-center -translate-y-3'
      />
      <div className='bg-mountains md:drop-shadow-hero-mac bg-bottom md:bg-cover md:rounded-[20px] grid md:absolute w-full md:w-9/12 h-[90vh] md:h-3/4 top-0 md:left-1/2 transform md:-translate-x-1/2 md:translate-y-20 z-10'>
        <div className='hidden md:flex drop-shadow-mac-topbar absolute w-full rounded-t-[20px] h-12 bg-[#AFE3E8] items-center gap-x-3'>
          <div
            className='ml-3 drop-shadow-mac-topbar-button w-5 h-5 rounded-full cursor-pointer bg-red-400 hover:bg-red-500 transition-colors'
            onClick={() => {
              handleClick(1)
            }}
          />
          <div
            className='drop-shadow-mac-topbar-button w-5 h-5 rounded-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition-colors'
            onClick={() => {
              handleClick(2)
            }}
          />
          <div
            className='drop-shadow-mac-topbar-button w-5 h-5 rounded-full cursor-pointer bg-green-500 hover:bg-green-600 transition-colors'
            onClick={() => {
              handleClick(3)
            }}
          />
        </div>
        <div className='flex flex-col justify-around items-center h-full gap-y-40 overflow-hidden pb-15 pt-5 md:pb-0'>
          <img
            src={darkLogo}
            alt='codevs blue logo'
            className='h-1/5 sm:h-1/4'
          />
          <Button text='Explorer' onClick={scrollToWhyUs} />
        </div>
        <img
          src={whiteBottomRounded}
          alt='white bottom rounded'
          className='block md:hidden absolute -bottom-4 w-full -z-10'
        />
      </div>
    </>
  )
}
export default Hero
