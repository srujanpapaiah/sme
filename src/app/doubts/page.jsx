"use client";
import { useEffect, useState } from "react";
import {getToken} from "./getToken";
import {getData} from "./getdata"

const Doubt = () => {

const [token ,setToken] = useState(null)
const [mapCourse,setCourse] = useState(null)

// console.log(mapCourse[0].data);


const getDataa = async() => {
    let course =  await getData(token)
    setCourse(course)
// console.log(course);
}


        useEffect(() => {
            const token =  getToken()
            setToken(token)
            
        },[])

    return(
        <>
        <div className="self-center" >
            <nav className="bg-[#3D40C7] border-b-2 border-[black] h-[90px] pt-[20px] text-[white] text-center text-[30px] font-[900] "  >
                    <h1 className="ml-[100px] lg:ml-[0px] " >Dashboard</h1>

                </nav>
        </div>
        <div className=" w-[100vw] ">

        <button onClick={(e) => getDataa(e)} class="absolute mt-[-80px] ml-[5px] lg:ml-[20px] inline-flex items-center justify-center lg:px-10 px-[5px] py-[10px] lg:py-4 overflow-hidden font-mono font-medium tracking-tighter text-black font-[900] hover:text-[white] bg-[white] rounded-lg group">
                        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span class="relative">Fetch Cources </span>
                    </button>

        </div>

        {
                        !mapCourse ? <div className="relative animate-border rounded-md bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1 text-center w-[50vw] mx-[auto] mt-[2rem]   lg:w-[900px] text-[15px] font-[600] " ><span className="block rounded-md  px-5 py-3 font-bold text-white bg-[#101011] " >Click on "Fetch Cources Button"  to get task assignet to you </span></div>
                            : <>
                                <div id="kk">
                                    {
                                        mapCourse[0]?.data?.map((e) => (
                                            <div className="relative box-sh text-left w-[97vw] lg:w-[50vw] mx-[auto] bg-white mt-[2.5rem]  text-[15px] lg:font-[600]  p-[15px] rounded" >
                                                <h1 className="ml-[20px] mt-[5px] " id={e._id} >{e.title}</h1>
                                                {/* <button id={e._id} className=" bg-[#1C8D73] p-[5px] w-[150px] mt-[-32px] rounded  border-[2px] border-[black] hover:text-[white] hover:border-[white] float-right	" onClick={(e) => nav(e)} >Get</button> */}


                                                <button onClick={(event) => nav(event)} class="relative lg:mr-[20px] inline-flex h-[40px] items-center lg:px-12 py-3 mt-[-35px] overflow-hidden lg:text-lg font-medium lg:text-black-600 border-2 border-black rounded-full hover:text-white group hover:bg-gray-50 float-right">
                                                    <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                                    <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                    </span>
                                                    <span id={e._id} class="relative">Get Doubts</span>
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                    }



        </>
    )
}

export default Doubt