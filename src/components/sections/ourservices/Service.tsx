// components
import { motion } from 'framer-motion'

// images
import layoutIcon from '@/assets/images/icon-layout.svg'
import codeIcon from '@/assets/images/icon-code.svg'
import cloudIcon from '@/assets/images/icon-cloud.svg'
import helpIcon from '@/assets/images/icon-help.svg'
import swissIcon from '@/assets/images/icon-swiss.png'
import Text from '@/components/utils/Text'

// type
type Icon = 'layout' | 'code' | 'cloud' | 'help'

// interfaces
interface ServiceProps {
  icon: Icon
  title: string
  description: string
  swissFlag?: boolean
}

// functions
const getIcon = (icon: Icon) => {
  switch (icon) {
    case 'layout':
      return layoutIcon
    case 'code':
      return codeIcon
    case 'cloud':
      return cloudIcon
    case 'help':
      return helpIcon
    default:
      return layoutIcon
  }
}

const Service: React.FC<ServiceProps> = ({
  icon,
  title,
  description,
  swissFlag = false
}) => {
  const iconImg = getIcon(icon)
  const animation = {
    offscreen: {
      opacity: 0,
      y: 20
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <motion.div
      initial='offscreen'
      whileInView='onscreen'
      variants={animation}
      viewport={{ once: true, amount: 0.8 }}
      className='flex flex-col border-[1px] border-black/20 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 rounded-lg gap-3 p-5'
    >
      <img
        src={iconImg}
        alt='layoutIcon'
        className='w-8 h-8 p-2 rounded-md bg-secondary'
      />
      <div className='flex flex-row gap-3 items-center'>
        <Text type='card-title'>{title}</Text>
        {swissFlag && (
          <img
            src={swissIcon}
            alt='swissFlag'
            className='w-5 h-5 bg-secondary rounded-[5px]'
          />
        )}
      </div>
      <Text type='lightblue-text' className='leading-5 md:leading-7'>
        {description}
      </Text>
    </motion.div>
  )
}

export default Service
