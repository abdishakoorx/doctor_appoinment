import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <section>
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <Image
                alt=""
                src="/doctors.jpg"
                width={800}
                height={800}
                className="absolute inset-0 object-cover w-full h-full rounded-3xl"
            />
        </div>

        <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">Find & Book <span className='text-primary'> Appointment</span> with the best <span className='text-primary'> Doctors</span>.</h2>

            <p className="mt-4 text-gray-600">
            Discover a seamless way to find and book appointments with top-rated doctors. Our platform connects you with experienced healthcare professionals across various specialties, ensuring you receive the best care possible. Experience the convenience of online booking and take the first step towards better health today.
            </p>

            <Button className='mt-10 hover:bg-secondary'>Explore now</Button>
        </div>
        </div>
    </div>
    </section>

  )
}

export default Hero