// components
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import getObfuscatedEmail from '@/utils/emailObfuscator'

// images
import logo from '@/assets/images/logo-support-informatique-light.svg'

const Footer: React.FC = () => {
  return (
    <div className='bg-footer-mobile md:bg-footer bg-cover bg-center md:bg-top'>
      <div className='flex flex-row flex-wrap justify-center gap-8'>
        <div className='w-full md:w-2/5 lg:w-1/4 px-8 md:px-0 flex flex-col justify-center items-start pt-16 pb-2 md:pb-16 gap-y-2 text-white'>
          <img
            src={logo}
            alt='support informatique white logo'
            className='mx-auto md:mx-0 w-52 md:w-40 my-12 pointer-events-none'
          />
          <h3 className='font-bold text-lg md:text-2xl uppercase'>
            Contactez-nous
          </h3>
          <p className='text-sm md:text-base'>
            N&apos;hésitez pas à prendre contact avec nous via notre adresse
            mail, nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
        <div className='w-full md:w-2/5 lg:w-1/4 px-8 md:px-0  flex flex-col justify-end md:items-end pt-2 md:pt-16 py-16 text-white'>
          <div className='flex flex-row gap-x-2 mb-4'>
            <a
              className='hover:scale-110 transform transition-all'
              href='https://www.linkedin.com/company/codevs-ch/'
            >
              <BsLinkedin className='text-xl md:text-2xl' />
            </a>
            <a
              className='hover:scale-110 transform transition-all'
              href='https://github.com/Support-Informatique'
            >
              <BsGithub className='text-xl md:text-2xl' />
            </a>
          </div>
          <p className='font-normal'>1700 Fribourg, Suisse</p>
          <div
            className='text-secondary'
            dangerouslySetInnerHTML={{ __html: getObfuscatedEmail() }}
          />
        </div>
      </div>
      <div className='bg-background w-full p-2'>
        <p className='text-darkText font-bold md:font-extrabold text-center text-sm md:text-base'>
          © {new Date().getFullYear()} CODEVS Sàrl. Tous droits réservés.
        </p>
      </div>
    </div>
  )
}
export default Footer
