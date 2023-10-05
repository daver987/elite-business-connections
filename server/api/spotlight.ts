import useUtilities from '~/utils/formatters'
import { Spotlight } from '~/types/spotlights'

export default defineEventHandler(async (event) => {
  const { formatDate } = useUtilities()

  const spotlight: Spotlight = {
    id: 1,
    datetime: '2023-10-01T08:00:00Z',
    date: formatDate('2023-10-01T08:00:00Z'),
    category: {
      title: 'Business Spotlight',
      uri: '/spotlight',
    },
    author: {
      fullName: 'Kinahealth',
      uri: '/author/kina-health',
      companyRole: 'Kinahealth',
    },
    title: 'Introducing Kinahealth: Your Path to Optimal Wellness in Rockland',
    imageDescription: 'Editorial, Spirituality, Health & Wellness',
    imageUrl:
      'https://images.unsplash.com/photo-1482100199117-a4a38a64e7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80',
    excerpt:
      'Unlock the full potential of your health and wellness with Kinahealth in Rockland. From personalized wellness plans to a variety of holistic services, discover how our expert team and integrative approach can guide you on the path to optimal well-being.',
    content: {
      introImage:
        'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
      heading: 'Unlock Your Full Potential with Kinahealth',
      intro:
        'Are you searching for a holistic and individualized approach to your health and wellness journey? Look no further than Kinahealth, your trusted destination for expert care and personalized wellness solutions in Rockland. With a team of highly skilled practitioners and a commitment to providing comprehensive care, Kinahealth is your key to unlocking your full potential and achieving optimal well-being.',
      sectionOne: {
        heading: 'Personalized Wellness Plans: Our Approach',
        paragraphs: [
          "At Kinahealth, we understand that each individual is unique, with their specific needs and goals. That's why our dedicated team of professionals takes a personalized approach to your health, working closely with you to develop a customized wellness plan tailored to your specific needs. Whether you're seeking relief from chronic pain, recovering from an injury, or simply striving for overall wellness, our team is here to support and guide you every step of the way.",
        ],
      },
      sectionTwo: {
        heading: 'Extensive Range of Services',
        paragraphs: [
          'Our extensive range of services encompasses various modalities, including physiotherapy, massage therapy, acupuncture, and more. Led by our experienced practitioners, these services are designed to address your specific concerns and promote healing and balance within your body. With a focus on evidence-based practice and the latest advancements in holistic healthcare, Kinahealth ensures that you receive the highest quality of care possible.',
        ],
      },
      sectionThree: {
        sectionImage:
          'https://images.unsplash.com/photo-1614278016630-017112643d7f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
        heading: 'Our Integrative Approach to Wellness',
        paragraphs: [
          "But it's not just about individual services at Kinahealth; our integrative approach sets us apart. We believe that true wellness extends beyond physical health and encompasses the interconnected aspects of the mind, body, and spirit. With this holistic view, we aim to provide a well-rounded experience that supports your overall well-being and helps you achieve a state of optimal health.",
        ],
      },
      sectionFour: {
        heading: 'Convenience and Comfort: Our Environment',
        paragraphs: [
          'In addition to our exceptional services, Kinahealth takes pride in providing a warm and welcoming environment. From the moment you step through our doors, you will be greeted by our friendly staff, ready to assist you on your wellness journey. Our administrative team is also pleased to relieve you of the additional task of submitting electronic or paper claims to your insurance provider by submitting directly to your insurance for you—leaving you with more time to do the things you love.',
        ],
      },
      conclusionHeading: 'Start Your Journey Today',
      conclusion:
        "So, whether you're seeking relief from pain, recovering from an injury, \n" +
        'or looking to enhance your overall well-being, trust Kinahealth to guide\n' +
        ' you on your journey. Ready to take the first step towards a healthier, \n' +
        'happier you? Visit our website kinahealthrockland.com\n' +
        ' to learn more about our services and book your appointment today. \n' +
        'Embrace the opportunity to unlock your full potential with Kinahealth, \n' +
        'your trusted partner on the path to optimal wellness in Rockland.',
    },
  }
  return spotlight
})
