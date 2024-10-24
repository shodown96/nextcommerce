import AuthTitle from '@/components/custom/auth-title'
import { Markdown } from '@/components/custom/markdown'


const markdownText = `
Welcome to NextCommerce platform, a site built to deliver an exceptional shopping experience. I am proud to have developed this platform using cutting-edge technologies, designed to be fast, scalable, and user-friendly.

Our platform leverages **Next.js**, a React framework that enables server-side rendering and static site generation, ensuring optimal performance and SEO. The site is fully responsive, offering a seamless experience across all devices.

### Key Features

- **Cart Functionality**: Our shopping cart is built with a focus on simplicity and efficiency. It allows users to easily add, remove, and update products, providing a smooth checkout experience.
  
- **Stripe Integration**: For secure and reliable payments, I've integrated **Stripe** to handle transactions. Customers can pay with a variety of payment methods, and their data is protected with industry-leading security.

- **User Authentication with Clerk**: I've integrated **Clerk** to manage user authentication, making sign-ups, logins, and secure access seamless. Users can choose from multiple authentication methods like email or social logins.

- **Tailwind CSS**: The user interface is designed with **Tailwind CSS**, a utility-first CSS framework. This ensures our site is not only visually appealing but also highly customizable.

- **ShadCN Components**: For reusable, accessible, and beautifully designed UI components, I've used **shadcn/ui**, allowing us to deliver a consistent user experience across all pages.

Whether you’re here to browse or make a purchase, our platform is built to provide you with a reliable and enjoyable experience. Thank you for choosing us!

`

export default async function AboutPage() {
  return (
    <div className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-6 sm:px-6 lg:px-8'>
      <AuthTitle title='About the project' />
      {/* <div className="prose lg:prose-lg xl:prose-xl" dangerouslySetInnerHTML={{ __html: contentHtml }}></div> */}
      <div className="prose lg:prose-lg xl:prose-xl pb-10">
        <Markdown source={markdownText} />
      </div>
    </div>
  )
}
