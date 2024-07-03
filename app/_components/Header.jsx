"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  


function Header() {
    const Menu= [
        {
            id : 1,
            path : '/',
            name : 'Home'
        },
        {
            id : 2,
            path : '/',
            name : 'About'
        },
        {
            id : 3,
            path : '/',
            name : 'Contact'
        }
    ]
    const {user} = useKindeBrowserClient();
    
  return (
    <div className='flex items-center justify-between p-4 shadow-sm'>
        <div className='flex items-center gap-10'>
            <Image src="/logo.png" alt='logo' width={180} height={50}/>

            <ul className='hidden gap-10 md:flex'>
                {Menu.map((item) => (
                    <Link key={item.id} href={item.path}>
                        <li className='text-xl transition-all ease-in-out cursor-pointer hover:scale-110 hover:text-secondary'>{item.name}</li> 
                    </Link>
                ))}
            </ul>
        </div>
        {user?
            <Popover>
            <PopoverTrigger><Image src={user?.picture} alt='User-Picture' width={40} height={40} className='rounded-full' /></PopoverTrigger>
            <PopoverContent className='w-45'>
                <ul>
                    <Link href={'/bookings'} className='p-2 hover:bg-gray-100'>My Appointments</Link>
                    <li className='p-2 hover:bg-gray-100'><LogoutLink>Logout</LogoutLink></li>
                </ul>
            </PopoverContent>
            </Popover>
        :
            <LoginLink><Button>Get started</Button></LoginLink>
        }
        
        
    </div>
  )
}

export default Header