import React, { cloneElement, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { getStartUps } from '../../functions/GetFunctions'
import { getUser } from '../../functions/loginFunctions'
import Topbar from './Topbar'
import Router from 'next/router'
import { useQuery } from 'react-query'

const Profile = (props) => {
    const [user, setUser] = useState({})
    // const [data,setData] = useState({})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if(token){
            findUser();
            return;
        }
        Router.push('/login/login')
        
    }, [])


    const {data,isError,isLoading} = useQuery('startups',getStartUps)

    const findUser = async () => {
        const token = localStorage.getItem("authToken")
        const res = await getUser(token)
        setUser(res);
        localStorage.setItem("user",JSON.stringify(res));
        // const res2 = await getStartUps()
        // setData(res2);
        // console.log(res2);
        setLoading(false);
    }
    if (loading) {
        return <div className='h-[90vh] w-full grid place-items-center'>
            <div className='grid h-[100vh] place-items-center'>
                <span>
                    <span className="animate-ping absolute inline-flex p-10 rounded-full bg-sky-400 opacity-75">
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
                    </span>
                </span>
            </div>
        </div>
    }
    if(isLoading){
        return <div className='h-[100vh] w-full grid place-items-center'>Loading..</div>
    }
    return (
        <>
            <div className='flex h-[100vh] '>
                <Sidebar user={user} />
                <div className='flex-[1] flex flex-col'>
                    <Topbar user ={user} data = {data}  />
                    {cloneElement(props.children, { user: user ,data})}
                </div>
            </div>
        </>
    )
}

export default Profile