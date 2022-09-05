import React, { cloneElement, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useRouter } from 'next/router'
import { getStartUpByName } from '../../functions/GetFunctions'
import Stats from './Stats'
import Doc from './Doc'
import Profile from './Profile'
import { useQuery } from 'react-query'

const Dashboard = () => {
    const [page,setPage] = useState(1)
    const router = useRouter();
    const { startup } = router.query


    const {data,isError,isLoading} = useQuery("startup",()=>getStartUpByName(startup));

    if (isLoading) {
        return <div className='h-[100vh] w-full grid place-items-center'>
            <div className='grid h-[100vh] place-items-center'>
                <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
            </div>
        </div>
    }
    if(isError){
        return <div className='h-[100vh] w-full grid place-items-center'>Some Error Occured</div>
    }
    return (
        data.startup &&
        <div className='lg:h-[90%] overflow-y-auto'>
            <Navbar page = {page} setPage = {setPage} data={data} />
            {page===1?<Stats data = {data} />:page===2?<Doc data = {data}/>:<Profile data= {data?.uid} />}
            
        </div>
    )
}

export default Dashboard