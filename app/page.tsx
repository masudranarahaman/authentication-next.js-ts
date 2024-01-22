"use client";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const [user,setUser] = useState<{name?:string,email?:string}>({});
const router = useRouter()
  const fetchData = async()=>{
    try {
          const response = await axios.get("/api/profile");
          const data = await response.data?.user;
          setUser(data);
    } catch (error:any) {
      toast.error(error.response.data.error);
    }
  }
    
   const logoutUser = async()=>{
    try {
          const {data} = await axios.get("/api/logout");
          // const data = await response.data?.user;

          toast.success(data.msg); 
          setUser({});
          router.push("/login");
    } catch (error:any) {
      toast.error(error.response.data.error);
    }
  }
    

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className='min-h-screen flex justify-center items-center  text-4xl  '>
                <div className="card border p-5 shadow-lg">
                   <div className="mb-3">
                     <h1>Name: {user && user.name} </h1>
                   </div>
                <div className="mb-3">
                        <h1>email: {user && user.email} </h1>
                </div>
                <div className="mb-3">
                    <button onClick={logoutUser} className="px-6 py-3 bg-indigo-500 rounded-lg text-lg text-white">Logout</button>

                </div>
                </div>
    </div>
  )
}

export default Page