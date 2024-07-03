"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'

function DoctorCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col items-center border-[1px] rounded-lg p-4 space-y-4">
      <div className="w-24 h-24 bg-gray-300 rounded-full"></div> 
      <div className="w-full space-y-2">
        <div className="w-3/4 h-4 bg-gray-300 rounded"></div> 
        <div className="w-5/6 h-4 bg-gray-300 rounded"></div> 
        <div className="w-2/3 h-4 bg-gray-300 rounded"></div> 
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div> 
      </div>
      <div className="flex justify-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
        <div className="w-8 h-8 bg-gray-300 rounded"></div> 
      </div>
    </div>
  );
}

function Search({ params }) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDoctorsByCategory()
  }, [params.cname])

  const fetchDoctorsByCategory = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await GlobalApi.GetDoctors()
      const categoryName = decodeURIComponent(params.cname).toLowerCase()
      const filteredDoctors = result.doctors.filter(
        doctor => doctor.category.name.toLowerCase() === categoryName
      )
      setDoctors(filteredDoctors)
    } catch (error) {
      setError("Failed to fetch doctors. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  if (error) return <div className="py-10 text-center text-red-500">Error: {error}</div>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">All Doctors in {decodeURIComponent(params.cname)}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          // Render skeleton loading cards
          [...Array(6)].map((_, index) => <DoctorCardSkeleton key={index} />)
        ) : doctors.length === 0 ? (
          <p className="text-center col-span-full">No doctors found for this category.</p>
        ) : (
          doctors.map(doctor => (
            <div key={doctor.id} className='border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out'>
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
        )}
      </div>
    </div>
  )
}

export default Search