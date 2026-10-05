// images
import roundedCardCorner from '@/assets/images/rounded-card-corner.svg'

// components
import Text from '@/components/utils/Text'
import Button from '@/components/utils/Button'
import { IoOpenOutline } from 'react-icons/io5'

// interface
interface ProjectProps {
  title: string
  description: string[]
  image: string
  imageMobile?: string
  link: string
  order?: 'left' | 'right'
}

// functions
const getDescList = (description: string[]) => {
  return description.map((desc, i) => (
    <Text key={i} type='lightgray-text'>
      {desc}
    </Text>
  ))
}

const Project: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  imageMobile,
  link,
  order = 'left'
}) => {
  const descList = getDescList(description)
  const openLink = () => {
    window.open(link, '_blank')
  }

  const isMobile = window.innerWidth < 768
  const getImage = () => {
    if (isMobile && imageMobile) {
      return imageMobile
    }
    return image
  }

  return (
    <div
      className={`${
        order === 'left' ? 'xl:flex-row' : 'xl:flex-row-reverse'
      } z-10 flex flex-wrap justify-between flex-col-reverse border border-black/20 gap-y-8 bg-lightCard rounded-[20px] w-11/12 lg:w-10/12 xl:w-8/12 relative p-5`}
    >
      <img src={getImage()} className='w-full xl:w-4/6 object-contain z-10' alt='project website screenshot' />
      <div className='flex flex-col justify-center items-center w-full xl:w-1/6 grow gap-y-4 px-12 text-center'>
        <Text type='card-title' className='font-black'>
          {title}
        </Text>
        {descList}
        <Button
          text='Visiter'
          type='accent'
          size='sm'
          icon={IoOpenOutline}
          onClick={openLink}
        />
      </div>
      <div
        className={`absolute ${
          order === 'left' ? 'right-0' : 'left-0 rotate-90'
        } bottom-0 z-0`}
      >
        <img src={roundedCardCorner} alt='card corner decoration' />
      </div>
    </div>
  )
}

export default Project
