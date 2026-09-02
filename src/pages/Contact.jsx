import { useSEO } from '../hooks/useSEO'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

const Contact = () => {
  useSEO({
    title: 'Contact',
    description: 'Get in touch with Akash Gangurde for UX/UI design projects, freelance collaborations, or just to say hello.',
    canonical: '/contact',
    ogImage: '/og/og-default.png',
  })
  return (
    <>
      <ContactForm />
      <Footer variant="inner" />
    </>
  )
}

export default Contact
