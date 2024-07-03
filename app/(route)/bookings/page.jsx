"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/BookingList'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
}

function BookingsSkeleton() {
    return (
        <div className="animate-pulse flex flex-col border-[1px] rounded-lg p-20 space-y-4 m-10 ">
            {/* Heading placeholders */}
            <div className="flex flex-col">
                <div className="w-1/2 h-6 bg-gray-300 rounded"></div> {/* Heading placeholder */}
                <div className="w-2/3 h-6 bg-gray-300 rounded"></div> {/* Sub-heading placeholder */}
            </div>
            {/* Image, Info, and Cancel button */}
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-300 rounded-full"></div> {/* Image */}
                    {/* Image info placeholders */}
                    <div className="flex flex-col space-y-2">
                        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                        <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
                        <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
                    </div>
                    {/* Time, Date, Location, Name placeholders */}
                    <div className="flex flex-col ml-4 space-y-1">
                        <div className="w-20 h-4 bg-gray-300 rounded"></div> {/* Time placeholder */}
                        <div className="w-32 h-4 bg-gray-300 rounded"></div> {/* Date placeholder */}
                        <div className="h-4 bg-gray-300 rounded w-28"></div> {/* Location placeholder */}
                        <div className="w-24 h-4 bg-gray-300 rounded"></div> {/* Name placeholder */}
                    </div>
                </div>
                <div className="w-10 h-10 bg-gray-300 rounded-md"></div> {/* Cancel button placeholder */}
            </div>
        </div>
    );
}
  
  


function Bookings() {
    const {user} = useKindeBrowserClient();
    const [bookingList, setBookingList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getAppointment();
        }
    }, [user]);
   
    const getAppointment = async () => {
        setIsLoading(true);
        try {
            const appointments = await GlobalApi.GetAppointments(user?.email);
            setBookingList(appointments || []);
        } catch (error) {
            setBookingList([]);
        } finally {
            setIsLoading(false);
        }
    }

    const filterBooking = (type) => {
        if (!Array.isArray(bookingList)) {
            return [];
        }
        const now = new Date();
        const todayFormatted = formatDate(now);
        const result = bookingList.filter(item => {
            const itemDateFormatted = formatDate(item.date);
            
            const isUpcoming = itemDateFormatted >= todayFormatted;
            
            return type === 'upcoming' ? isUpcoming : !isUpcoming;
        });
        return result;
    };

    if (isLoading) {
        return <BookingsSkeleton />;
    }

    return (
        <div className='px-4 mt-16 mb-10 sm:px-10'>
            <h2 className='text-2xl font-bold'>My Appointments</h2>
            <Tabs defaultValue="upcoming" className="w-full mt-5">
                <TabsList className="justify-start w-full">
                    <TabsTrigger value="upcoming" >Upcoming</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <BookingList bookingList={filterBooking('upcoming')} expired={false} 
                        updateAppointmentList = {() => getAppointment()}
                    />
                </TabsContent>
                <TabsContent value="expired">
                    <BookingList bookingList={filterBooking('expired')} expired={true}
                        updateAppointmentList = {() => getAppointment()}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Bookings