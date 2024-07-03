import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'

function DoctorList() {
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList =  () => {
    GlobalApi.GetDoctors().then(resp=>{
      setDoctorList(resp.doctors)
    })
  };
  return (
    <div className='px-8 mt-20 mb-40'>
      <div className=''>
        <h1 className='mb-5 text-4xl font-bold tracking-wider'>Popular <span className='text-primary'>Doctors</span></h1>
        <div className='grid grid-cols-2 mt-4 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {doctorList.length>0?doctorList.map((doctor,index)=>index<8&&(
            <div key={index} className='border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out'>
              <Image 
                src={doctor.icon?.url}
                alt={doctor.name}
                width={500}
                height={200}
                className='h-[200px] w-full object-cover rounded-lg'
              />
              <div className='flex flex-col items-baseline gap-1 mt-3'>
                <h2 className='text-[12px] bg-blue-100 p-1 px-2 rounded-full text-primary'>{doctor.category?.name}</h2>
                <h2 className='font-bold'>{doctor.name}</h2>
                <h2 className='text-sm text-primary'>{doctor.experience}</h2>
                <h2 className='text-sm text-gray-500'>{doctor.location}</h2>
                <Link href={'/details/'+doctor?.id} className='w-full'>
                  <h2 className='p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full text-center mt-3 cursor-pointer hover:bg-secondary hover:border-tertiary hover:text-white'>Book Now</h2>
                </Link>
              </div>
            </div>
          )) 
          :
          [1,2,3,4,5,6,7,8].map((item,index)=>(
            
          <div key={index} className='w-full h-[220px] bg-slate-300 rounded-lg animate-pulse'>

          </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorList