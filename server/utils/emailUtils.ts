import sgMail from '@sendgrid/mail'
import type { ContactForm } from '~/types/ContactForm'
import type { MailDataRequired } from '@sendgrid/helpers/classes/mail'

export async function sendContactFormEmail(
  contactForm: ContactForm,
  apiKey: string
): Promise<any> {
  try {
    const form = contactForm
    console.log('Parsed Contact Form in Send Email:', form)
    if (!apiKey) {
      throw new Error('SendGrid API key not provided')
    }
    sgMail.setApiKey(apiKey)

    const msg: MailDataRequired = {
      personalizations: [
        {
          to: [
            {
              email: form.email_address,
            },
          ],
          dynamicTemplateData: {
            first_name: form.first_name,
            last_name: form.last_name,
            email_address: form.email_address,
            phone_number: form.phone_number,
            heard_about: form.source,
            business_type: form.business_type,
          },
        },
      ],
      from: {
        email: 'contact@elitebusinessconnections.ca',
        name: 'Elite Business Connections',
      },
      replyTo: {
        email: 'info@elitebusinessconnections.ca',
        name: 'Elite Business Connections',
      },
      subject:
        "Welcome to Elite Business Connections - We've Received Your Inquiry!",
      templateId: 'd-55354bbb9b7749d8b3b7938892330028',
      trackingSettings: {
        clickTracking: {
          enable: true,
          enableText: false,
        },
        openTracking: {
          enable: true,
          substitutionTag: '%open-track%',
        },
      },
    }
    const response = await sgMail.send(msg)
    console.log(response)
    return response
  } catch (e) {
    console.error('Error Sending Email', e)
  }
}
