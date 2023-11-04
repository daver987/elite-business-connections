import sgMail from '@sendgrid/mail'

export async function sendContactFormEmail(
  contactForm: ContactForm,
  apiKey: string
): Promise<void> {
  try {
    const form = contactForm
    console.log('Parsed Contact Form in Send Email:', form)
    if (!apiKey) {
      throw new Error('SendGrid API key not provided')
    }
    sgMail.setApiKey(apiKey)

    const msg = {
      personalizations: [
        {
          to: [
            {
              email: form.email
            }
          ],
          dynamic_template_data: {
            first_name: form.firstName,
            last_name: form.lastName,
            email_address: form.email,
            phone_number: form.phone,
            heard_about: form.heardAbout,
            business_type: form.businessType
          }
        }
      ],
      from: {
        email: 'contact@elitebusinessconnections.ca',
        name: 'Elite Business Connections'
      },
      reply_to: {
        email: 'info@elitebusinessconnections.ca',
        name: 'Elite Business Connections'
      },
      subject: 'Welcome to Elite Business Connections - We\'ve Received Your Inquiry!',
      template_id: 'd-55354bbb9b7749d8b3b7938892330028',
      trackingSettings: {
        clickTracking: {
          enable: true,
          enableText: false
        },
        openTracking: {
          enable: true,
          substitutionTag: '%open-track%'
        }
      }
    }
    const response = await sgMail.send(msg)
    console.log(response)
  } catch (e) {
    console.error('Error Sending Email', e)
  }
}
