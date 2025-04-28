// components
import SectionTitle from '@/components/utils/SectionTitle'
import Button from '@/components/utils/Button'
import Text from '@/components/utils/Text'
import getObfuscatedEmail from '@/utils/emailObfuscator'

// utils
import { navigateToSection } from '@/utils/accessibility'

const WhyUs: React.FC = () => {
  const scrollToOurServices = () => {
    navigateToSection('our-services')
  }

  const mailTo = () => {
    const email = getObfuscatedEmail()
      .replace(/<[^>]*>/g, '')
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    window.open(`mailto:${email}`, '_blank')
  }

  return (
    <div id='why-us'>
      <SectionTitle
        subtitle='pourquoi nous'
        title='Une expertise à un prix adapté'
        background='peak'
      />
      <Text className='text-center w-full mx-auto px-6 mb-10 md:w-10/12 lg:w-9/12 xl:w-7/12'>
        Nous sommes une équipe de jeunes passionnés, possédant une formation
        solide et une expérience précieuse en développement web. Parallèlement à
        notre activité, nous sommes engagés dans des études supérieures pour
        continuellement affiner nos compétences et élargir notre horizon
        technologique. Nous offrons des services de haute qualité à des tarifs
        abordables, convaincus que l&apos;excellence ne devrait pas être un
        luxe, mais accessible à tous. Que vous soyez une start-up, une PME ou
        une grande entreprise, nous sommes prêts à concrétiser vos visions
        numériques avec passion et expertise.
      </Text>
      <div className='flex flex-row flex-wrap gap-x-16 gap-y-4 justify-center'>
        <Button
          text='Nos services'
          type='filled'
          onClick={scrollToOurServices}
        />
        <Button text='Nous contacter' type='outlined' onClick={mailTo} />
      </div>
    </div>
  )
}
export default WhyUs
