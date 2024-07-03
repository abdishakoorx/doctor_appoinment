"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"  
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);
    const params = usePathname();
    const categoryLink = params.split('/') [2];
    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList =  () => {
        GlobalApi.GetCategory().then(resp=>{
        setCategoryList(resp.categories)
        })
    }

    return (
        <div className='h-screen mt-5 '>
            <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Categories">
                {categoryList&&categoryList.map((category,index)=>(
                    <CommandItem key={index}>
                        <Link href={'/search/'+category.name} className={`flex w-full items-center gap-2 
                        p-2 text-[15px] text-blue-600 cursor-pointer rounded-lg 
                        ${categoryLink==category.name&&'bg-blue-200'}`}>
                            <Image 
                            src={category.icon?.url}
                            alt={category.name}
                            width={25}
                            height={25}/>
                            <label>{category.name}</label>
                        </Link>
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
            </Command>

        </div>
    )
    }

export default CategoryList