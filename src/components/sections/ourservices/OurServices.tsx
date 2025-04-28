// components
import SectionTitle from '@/components/utils/SectionTitle'
import Service from '@/components/sections/ourservices/Service'
import Button from '@/components/utils/Button'
import getObfuscatedEmail from '@/utils/emailObfuscator'

const OurServices: React.FC = () => {
  const mailTo = () => {
    const email = getObfuscatedEmail()
      .replace(/<[^>]*>/g, '')
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    window.open(`mailto:${email}`, '_blank')
  }

  return (
    <div id='our-services'>
      <SectionTitle
        subtitle='découvrez'
        title='Nos services'
        background='horizon'
      />
      <div className='flex flex-row flex-wrap gap-x-12 gap-y-6 w-full justify-center'>
        <Service
          icon='layout'
          title='Conception Web'
          description='Du design à la mise en ligne, nous gérons votre projet en intégralité. Nous mettons en place une interface utilisateur intuitive et adaptée à vos besoins.'
        />
        <Service
          icon='code'
          title='Développement Sur-Mesure'
          description="Nous créons des sites web personnalisés, en utilisant les dernières technologies. Chaque projet est unique et fait l'objet d'une attention particulière."
        />
        <Service
          icon='cloud'
          title='Hébergement Fiable'
          description="Nous collaborons avec Infomaniak, le leader Suisse dans le domaine de l'hébergement web. Vos données sont sécurisées et disponibles en permanence."
          swissFlag
        />
        <Service
          icon='help'
          title='Assistance & Support'
          description="Nous offrons un support complet pour tous vos besoins informatiques. De l'installation de matériel aux mises à jour système, nous sommes là pour vous aider."
        />
      </div>
      <Button
        className='mx-auto mt-10'
        type='filled'
        text='Nous contacter'
        onClick={mailTo}
      />
    </div>
  )
}
export default OurServices
