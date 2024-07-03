import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BookAppointment from './BookAppointment'

function DoctorDetails({doctor}) {
    const socilaMedia = [
        {
            id:1,
            icon:'/youtube.png',
            url:''
        },
        {
            id:2,
            icon:'/linkedin.png',
            url:''
        },
        {
            id:1,
            icon:'/facebook.png',
            url:''
        },
        {
            id:1,
            icon:'/twitter.png',
            url:''
        },
    ]

  return (
    <>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-5 border-[1px] p-5 rounded-lg'>
            {/* Image */}
            <div>
                <Image src={doctor.icon?.url} alt={doctor.name}
                width={200} height={200} className='object-cover w-full h-[370] rounded-lg' />
            </div>
            {/* info */}
            <div className='flex flex-col items-baseline col-span-2 gap-2 mt-5 md:px-10'>
                <h2 className='text-2xl font-bold'>{doctor.name}</h2>
                <h2 className='flex gap-2 text-gray-500 text-md'>
                    <GraduationCap/>
                    <span>{doctor.experience}</span>
                </h2>
                <h2 className='flex gap-2 text-lg text-gray-500'>
                    <MapPin/>
                    <span>{doctor.location}</span>
                </h2>
                <div className='flex gap-3'>
                    {socilaMedia.map((item,index) =>(
                        <Image key={index} src={item.icon} alt='Social Media Icon' width={20} height={20} />
                    ))}
                </div>
                <BookAppointment doctor={doctor}/>
            </div>
        </div>
        {/* About */}
        <div className='border-[1px] p-3 rounded-lg mt-5'>
            <h2 className='font-bold text-[20px]'>About Me</h2>
            <p className='mt-2 tracking-wide text-gray-500'>{doctor.about}</p>
        </div>
    </>
  )
}

export default DoctorDetails