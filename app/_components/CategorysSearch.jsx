'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {Search} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'


function CategorysSearch() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList =  () => {
    GlobalApi.GetCategory().then(resp=>{
      setCategoryList(resp.categories)
    })
  };

  return (
    <div className='px-5 mb-10'>
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-4xl font-bold tracking-wider'>Search <span className='text-primary'>Doctors</span></h2>
        <h2 className='text-xl text-gray-600'>Select your Doctor and Book your Appointment with Simple Steps.</h2>
        <div className="flex items-center w-full max-w-sm mt-3 space-x-2">
          <Input type="text" placeholder="Search..." className='border-2 border-black'/>
          <Button className='hover:bg-secondary' type="submit"><Search className='w-4 h-4 mr-2'/> Search</Button>
        </div>
      </div>
      
      <div className='grid grid-cols-3 mt-4 md:grid-cols-4 lg:grid-cols-6'>
        {categoryList.length>0?categoryList.map((category,index)=>index<6&&(
          <Link href={'/search/'+category.name} key={index} className='flex flex-col items-center gap-3 p-3 m-4 text-white transition-all ease-in-out cursor-pointer rounded-xl bg-blue-50 hover:bg-tertiary hover:scale-110'>
            <Image 
              src={category.icon?.url}
              alt={category.name}
              width={40}
              height={40}
            />
            <label className='text-lg text-blue-600'>{category.name}</label>
          </Link>
        ))
        :
        [1,2,3,4,5,6].map((item,index)=>(  
          <div key={index} className='w-[130px] h-[130px] bg-slate-300 rounded-lg animate-pulse'>

          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorysSearch