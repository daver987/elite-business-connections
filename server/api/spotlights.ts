import useUtilities from '~/utils/formatters'
import { Spotlight } from '~/types/spotlights'

export default defineEventHandler(async (event) => {
  const { formatDate } = useUtilities()

  const allSpotlights: Spotlight[] = [
    {
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
      title:
        'Introducing Kinahealth: Your Path to Optimal Wellness in Rockland',
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
    },
    {
      id: 2,
      datetime: '2022-09-20T10:00:00Z',
      date: formatDate('2022-09-20T10:00:00Z'),
      category: {
        title: 'Business Spotlight',
        uri: '/spotlight',
      },
      author: {
        fullName: 'Michael Thompson',
        uri: '/author/michael-thompson',
        companyRole: 'Owner, Thompson IT Solutions',
      },
      title:
        'Unlocking Business Potential: My Journey with Elite Business Connections',
      imageDescription: 'Michael Thompson - Owner of Thompson IT Solutions',
      imageUrl:
        'https://images.unsplash.com/photo-1627634777217-c864268db30c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      excerpt:
        'Join Michael Thompson, the owner of Thompson IT Solutions, as he shares his transformative journey and the impact Elite Business Connections had on his business.',
      content: {
        intro:
          'Running a business in the competitive world of IT solutions requires constant innovation and networking. Joining Elite Business Connections provided me with the tools and support to unlock the true potential of my business.',
        sectionOne: {
          heading: 'Expanding My Clientele',
          paragraphs: [
            'Elite Business Connections introduced me to a wider client base that I would have never reached on my own. The networking events and online community allowed me to connect with decision-makers from various industries who were in need of IT solutions.',
            'Through referrals and recommendations from fellow members, my clientele expanded significantly, and I was able to showcase the expertise and excellence of Thompson IT Solutions to a broader audience.',
          ],
        },
        sectionTwo: {
          heading: 'Continuous Learning and Growth',
          paragraphs: [
            'The educational resources and workshops offered by Elite Business Connections played a crucial role in my business growth. The expert-led webinars provided insights into the latest trends and technologies in the IT industry.',
            'Not only did I gain knowledge, but I also had the opportunity to share my expertise with fellow members. The collaborative learning environment empowered me to stay at the forefront of the ever-changing IT landscape.',
          ],
        },
        sectionThree: {
          heading: 'Forming Strategic Partnerships',
          paragraphs: [
            'One of the greatest benefits of Elite Business Connections is the opportunity to form strategic partnerships. Through collaborations with other members, I was able to offer comprehensive IT solutions that catered to a wider range of business needs.',
            'The trust and camaraderie within the community facilitated the formation of strong alliances, enabling my business to access new markets and unlock growth opportunities.',
          ],
        },
        sectionFour: {
          heading: 'Navigating Challenges Together',
          paragraphs: [
            'Running a business is not without its challenges. However, being part of Elite Business Connections has provided me with a support system to overcome those hurdles.',
            "Whether it's seeking advice, brainstorming solutions, or finding inspiration, the community has always been ready to lend a helping hand. The collective wisdom and experiences shared within the network have been invaluable in navigating the ups and downs of entrepreneurship.",
          ],
        },
        conclusion:
          "If you're an IT solutions provider seeking to unlock your business potential, Elite Business Connections is the perfect platform for you. Join today and experience the transformative power of networking.",
      },
    },
    {
      id: 3,
      datetime: '2022-09-25T14:00:00Z',
      date: formatDate('2022-09-25T14:00:00Z'),
      category: {
        title: 'Business Spotlight',
        uri: '/spotlight',
      },
      author: {
        fullName: 'Emily Collins',
        uri: '/author/emily-collins',
        companyRole: 'Founder, Collins Creative Design',
      },
      title:
        'From Passion to Profit: Elite Business Connections Made It Possible',
      imageDescription: 'Emily Collins - Founder of Collins Creative Design',
      imageUrl:
        'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      excerpt:
        'Discover how Emily Collins, the founder of Collins Creative Design, turned her passion for design into a profitable business with the help of Elite Business Connections.',
      content: {
        intro:
          "For years, I pursued my passion for design as a freelance graphic designer. However, it wasn't until I joined Elite Business Connections that I transformed my creative outlet into a thriving business.",
        sectionOne: {
          heading: 'Expanding my Network',
          paragraphs: [
            'Elite Business Connections provided me with a network of professionals who understood the value of design in their businesses. Through networking events and collaborative projects, I was able to connect with entrepreneurs and decision-makers who needed design solutions.',
            'Being surrounded by like-minded individuals who appreciated the power of design not only expanded my network but also opened up new opportunities for collaboration and growth.',
          ],
        },
        sectionTwo: {
          heading: 'Acquiring Business Skills',
          paragraphs: [
            'As a creative professional, I had a lot to learn about the business side of things. Elite Business Connections helped bridge that gap by offering educational resources tailored to the needs of entrepreneurs.',
            'From marketing strategies to financial management, the workshops and webinars equipped me with the necessary business skills to run a profitable design studio. The knowledge gained from these resources empowered me to make informed decisions and drive my business forward.',
          ],
        },
        sectionThree: {
          heading: 'Showcasing my Expertise',
          paragraphs: [
            'Elite Business Connections provided me with a platform to showcase my design expertise to a wider audience. I had the opportunity to speak at events and share my knowledge and insights with fellow members.',
            'Not only did this boost my credibility as a design professional, but it also attracted potential clients who were in need of creative solutions. The network became a valuable source of referrals, helping me secure more projects and grow my business.',
          ],
        },
        sectionFour: {
          heading: 'Gaining Confidence and Support',
          paragraphs: [
            'Starting and growing a business can be daunting, but Elite Business Connections provided me with the support and confidence to pursue my entrepreneurial journey.',
            'The encouragement, mentorship, and camaraderie within the community have been instrumental in overcoming challenges and staying motivated. Having a network of like-minded individuals who believe in my vision has truly been a game-changer.',
          ],
        },
        conclusion:
          "If you're a creative entrepreneur looking to turn your passion into profit, Elite Business Connections is the place to be. Join the community today and unlock the potential of your business.",
      },
    },
    {
      id: 4,
      datetime: '2022-10-01T12:00:00Z',
      date: formatDate('2022-10-01T12:00:00Z'),
      category: {
        title: 'Business Spotlight',
        uri: '/spotlight',
      },
      author: {
        fullName: 'Daniel Roberts',
        uri: '/author/daniel-roberts',
        companyRole: 'CEO, Roberts Real Estate Agency',
      },
      title:
        'Connecting the Dots: Elite Business Connections and Real Estate Industry Success',
      imageDescription: 'Daniel Roberts - CEO of Roberts Real Estate Agency',
      imageUrl:
        'https://images.unsplash.com/photo-1638009512305-ccdd23ec4c4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
      excerpt:
        'Join Daniel Roberts, the CEO of Roberts Real Estate Agency, as he reveals how Elite Business Connections played a major role in his success within the competitive real estate industry.',
      content: {
        intro:
          'The real estate industry is highly competitive, and having a strong network of connections is crucial. Elite Business Connections provided me with exactly that, helping me achieve remarkable success in the real estate market.',
        sectionOne: {
          heading: 'Expanding My Reach',
          paragraphs: [
            'Being a member of Elite Business Connections gave my real estate agency a wider reach. Through networking events and collaborative projects, I connected with professionals from various fields related to real estate.',
            'From mortgage brokers to home stagers, I was able to form strategic partnerships that expanded the services I could offer my clients. The network not only connected me to potential buyers and sellers but also provided valuable resources for a smoother real estate experience.',
          ],
        },
        sectionTwo: {
          heading: 'Staying on Top of Industry Trends',
          paragraphs: [
            'The real estate industry is constantly evolving, and staying ahead of the curve is essential. Elite Business Connections provided me with access to industry-specific educational resources and insights.',
            'From market updates to investment strategies, the workshops and webinars offered within the community kept me informed about the latest trends and developments. This knowledge proved invaluable in advising my clients and making informed business decisions.',
          ],
        },
        sectionThree: {
          heading: 'Referrals and Recommendations',
          paragraphs: [
            'Referrals are the lifeblood of the real estate industry, and Elite Business Connections became a reliable source of high-quality leads.',
            'The trust and relationships built within the network resulted in a steady stream of referrals from fellow members. These warm introductions not only boosted my credibility but also increased the chances of successful transactions. Elite Business Connections truly understands the power of a strong referral network.',
          ],
        },
        sectionFour: {
          heading: 'Collaborative Success',
          paragraphs: [
            'The collaborative nature of Elite Business Connections fostered a sense of community among members. This community spirit translated into collaboration and support that benefited everyone involved.',
            'From brainstorming sessions to joint marketing initiatives, working with other members brought immense value and expanded my business opportunities within the real estate industry. Elite Business Connections has truly elevated my success in ways I never thought possible.',
          ],
        },
        conclusion:
          "If you're in the real estate industry and looking to connect with professionals who can take your business to new heights, joining Elite Business Connections is a must. The network, resources, and collaborative opportunities offered are unparalleled.",
      },
    },
  ]
  return allSpotlights
})
