// components
import SectionTitle from '@/components/utils/SectionTitle'
import TeamMember from '@/components/sections/ourteam/TeamMember'

const OurTeam: React.FC = () => {
  return (
    <div>
      <SectionTitle subtitle='qui sommes nous' title='Notre équipe' />
      <div className='flex flex-row flex-wrap justify-evenly lg:justify-center align-middle gap-4'>
        <TeamMember
          name='Lionel Ding'
          title='Fondateur & Développeur'
          techs={['typescript', 'vuejs']}
          avatar={1}
          linkedin='https://www.linkedin.com/in/lionel-ding'
        />
        <TeamMember
          name='Elwan Mayencourt'
          title='Fondateur & Développeur'
          techs={['reactjs', 'python']}
          avatar={2}
          linkedin='https://www.linkedin.com/in/elwan-mayencourt/'
        />
        <TeamMember
          name='Alexis Stella'
          title='Développeur'
          techs={['vuejs', 'reactjs']}
          avatar={3}
          linkedin='https://www.linkedin.com/in/alexis-stella-660804201/'
        />
      </div>
    </div>
  )
}
export default OurTeam
