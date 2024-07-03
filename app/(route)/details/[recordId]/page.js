"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import Image from 'next/image'
import DoctorDetails from '../_components/DoctorDetails'
import DoctorSuggestionList from '../_components/DoctorSuggestionList'

const DoctorDetailsSkeleton = () => (
  <div className="p-4 animate-pulse">
    <div className="w-3/4 h-10 mb-4 bg-gray-200 rounded"></div>
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="md:w-1/3">
        <div className="w-full h-[400px] bg-gray-200 rounded-lg"></div>
      </div>
      <div className="md:w-2/3">
        <div className="space-y-3">
          <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
          <div className="w-2/3 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-6 space-y-3">
          <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
)

function Details({ params }) {
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (params.recordId) {
      fetchDoctorDetails(params.recordId)
    }
  }, [params.recordId])

  const fetchDoctorDetails = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const result = await GlobalApi.GetDoctorById(id)
      if (result && result.doctor) {
        setDoctor(result.doctor)
      } else {
        throw new Error("Doctor data not found in the response")
      }
    } catch (error) {
      setError("Failed to fetch doctor details. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <DoctorDetailsSkeleton />
  if (error) return <div className="py-10 text-center text-red-500">Error: {error}</div>
  if (!doctor) return <div className="py-10 text-center">No doctor found</div>

  return (
    <div className='p-4 md:px-20'>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        {/* doctor details */}
        <div className='col-span-3'>
          <DoctorDetails doctor={doctor}/>
        </div>
        {/* doctor suggestions */}
        <div>
          <DoctorSuggestionList />
        </div>
      </div>
    </div>
  )
}

export default Details