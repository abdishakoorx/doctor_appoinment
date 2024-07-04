import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
  


function BookAppointment({doctor}) {
    const [date, setDate] = useState(new Date())
    const [timeSlot, setTimeSlot] = useState()
    const [selectedTimeSlot, setSelectedTimeSlot] = useState()
    const {user} = useKindeBrowserClient()
    const [note, setNote] = useState('')
    const pastDay = (day) =>{
        return day<=new Date();
    }
    useEffect(() => {
        getTime()
    },[])

    const getTime = () => {
        const timeList= [];
        for (let i=10; i<=12; i++){
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for (let i=1; i<=6; i++){
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i +  ':30 PM'
            })
        }
        setTimeSlot(timeList)
    }

    const bookAppointment = async () => {
        const appointmentData = {
          Username: user.given_name + ' ' + user.family_name,
          Doctors: doctor.id,
          Email: user.email,
          Date: date, 
          Time: selectedTimeSlot,
          Note: note,
        }
      
        try {
          const resp = await GlobalApi.CreateAppointment(appointmentData);
          if(resp){
            toast("Appointment has been created.");
          }
        } catch (error) {
          toast.error("Failed to create appointment. Please try again.");
        }
      }
  return (
    <div>
    <Dialog>
        <DialogTrigger><Button className='mt-3 rounded-full hover:bg-secondary'>Book Appointment</Button></DialogTrigger>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Appointment info</DialogTitle>
                <DialogDescription>
                <div>
                    <div className='grid gap-4 mt-5 sm:grid-cols-1 md:grid-cols-2'>
                    {/* calendar */}
                    <div className='flex flex-col items-baseline gap-3'>
                        <h2 className='flex items-center gap-2 text-sm'>
                        <CalendarDays className='w-4 h-4 text-secondary'/>
                        Select Date
                        </h2>
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={pastDay}
                        className="border rounded-md w-full max-w-[300px]"
                        />
                    </div>
                    {/* time */}
                    <div>
                        <h2 className='flex items-center gap-2 text-sm'>
                        <Clock className='w-4 h-4 text-secondary'/>
                        Select Time Slot
                        </h2>
                        <div className='grid grid-cols-3 gap-2 p-2 mt-3 border rounded-lg sm:grid-cols-4 md:grid-cols-3'>
                        {timeSlot?.map((item, index) => (
                            <h2 onClick={() => setSelectedTimeSlot(item.time)}
                            key={index} className={`p-1 text-center text-sm border cursor-pointer rounded-xl hover:text-white hover:bg-primary ${item.time==selectedTimeSlot&&'bg-primary text-white'}`}>
                            {item.time}
                            </h2>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
                </DialogDescription>
                <div>
                <textarea placeholder='Note...' className='w-full h-20 mt-2 border-2 rounded-md border-primary' 
                    value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                </div>
            </DialogHeader>
            <DialogFooter className="gap-2 mt-4 sm:justify-end">
                <DialogClose asChild>
                <Button type="button" variant="destructive">Close</Button>
                </DialogClose>
                <Button type="button" disabled={!(date && selectedTimeSlot)} onClick={()=>bookAppointment()}>Submit</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>    

    </div>
  )
}

export default BookAppointment