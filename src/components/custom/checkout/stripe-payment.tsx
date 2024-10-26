import { Button } from '@/components/ui/button'
import { PaymentElement } from '@stripe/react-stripe-js'
import React from 'react'

function StripePayment() {
  return (
    <form>
      <PaymentElement />
      <Button className='mt-4'>Submit</Button>
    </form>
  )
}

export default StripePayment