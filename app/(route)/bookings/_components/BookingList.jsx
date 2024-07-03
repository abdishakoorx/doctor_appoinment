import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image'
import React from 'react'
import CancelBooking from './CancelBooking';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

function formatDate(dateString, updateAppointmentList) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; 
}

function BookingList({bookingList,expired,updateAppointmentList}) {

  const onDeleteAppointment = (item) => {
    GlobalApi.DeleteAppointment(item.id).then((resp) => {
      if(resp){
        toast.success('Appointment deleted successfully');
        updateAppointmentList();
      }
    })
  }
  return (
    <div>
      {bookingList && bookingList.map((item, index) => (
        <div key={item.id || index} className='flex items-center gap-4 p-3 m-3 border rounded-2xl'>
          {item.doctors && item.doctors[0] && item.doctors[0].icon && item.doctors[0].icon.url ? (
            <Image src={item.doctors[0].icon.url} alt={item.doctors[0].name || 'Doctor'} width={70} height={70}
            className='rounded-full h-[70px] w-[70px] object-cover' />
          ) : (
            <div>No image available</div>
          )}
          <div className='flex flex-col w-full gap-2'>
            <h2 className='font-bold text-[18px] flex justify-between'>{item.doctors && item.doctors[0] ? item.doctors[0].name : 'Unknown'}
            {!expired&&<CancelBooking onContinue={() => onDeleteAppointment(item)}/>}</h2>
            <h2 className='flex gap-2 text-gray-500'><MapPin className='w-6 h-6 text-primary'/>{item.doctors && item.doctors[0] ? item.doctors[0].location : 'Unknown'}</h2>
            <h2 className='flex gap-2'><Calendar className='w-6 h-6 text-primary' /> {moment(formatDate(item.date)).format('DD-MMM-YYYY')}</h2>
            <h2 className='flex gap-2'><Clock className='w-6 h-6 text-primary'/> {item.time}</h2>
          </div>
        </div>
      ))}
      {(!bookingList || bookingList.length === 0) && <h2>No bookings available.</h2>}
    </div>
  )
}

export default BookingList