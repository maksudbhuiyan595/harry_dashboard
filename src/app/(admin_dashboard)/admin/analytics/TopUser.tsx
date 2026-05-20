"use client"
import { useAnalycisDataQuery } from '@/app/api/analycisApi'
import { imgUrl } from '@/utility/imgUrl'
import { TopBussinessType, TopUserType } from '@/utility/type/analycisType'
import Image from 'next/image'
import React from 'react'

const TopUser = () => {
    const { data } = useAnalycisDataQuery(undefined);


    const topUser: TopUserType[] = data?.data?.top_users || []


    const topBussiness: TopBussinessType[] = data?.data?.top_business_profiles || [];


    return (
        <div className=' flex flex-row p-8 overflow-y-auto  gap-x-5 ' >
            {/* left box  */}
            <div className=' w-[50%] bg-[#3A3E41] rounded-[8px] px-8 py-5  ' >

                <div className=' flex items-center gap-x-2.5 ' >
                    <span>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4C5 2.93913 5.42143 1.92172 6.17157 1.17157C6.92172 0.421427 7.93913 0 9 0C10.0609 0 11.0783 0.421427 11.8284 1.17157C12.5786 1.92172 13 2.93913 13 4C13 5.06087 12.5786 6.07828 11.8284 6.82843C11.0783 7.57857 10.0609 8 9 8C7.93913 8 6.92172 7.57857 6.17157 6.82843C5.42143 6.07828 5 5.06087 5 4ZM5 10C3.67392 10 2.40215 10.5268 1.46447 11.4645C0.526784 12.4021 0 13.6739 0 15C0 15.7956 0.316071 16.5587 0.87868 17.1213C1.44129 17.6839 2.20435 18 3 18H15C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15C18 13.6739 17.4732 12.4021 16.5355 11.4645C15.5979 10.5268 14.3261 10 13 10H5Z" fill="white" />
                        </svg>

                    </span>
                    <h1 className=' text-white font-semibold text-lg ' >Top Engaged Users</h1>
                </div>

                {/* user list */}
                <div className="mt-5 flex flex-col gap-y-3">
                    {topUser.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between bg-[#0F0E13] px-2 py-2 rounded-[4px] border border-[#989898]"
                        >
                            <div className="flex items-center gap-x-5">
                                <Image
                                    src={`${imgUrl}/${item?.avatar}`}
                                    width={100}
                                    height={100}
                                    alt="user"
                                    className="w-12 h-12 rounded-full"
                                />

                                <div>
                                    <h1 className="font-bold text-[16px] text-white">
                                        {item.name}
                                    </h1>
                                    <p className="font-medium text-white text-xs">
                                        {/* {item.art} · {item.post_count} followers */}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h1 className="font-bold text-[16px] text-white">
                                    {item.engagement}
                                </h1>
                                <p className="font-medium text-white text-xs">
                                    {item.post_count} posts
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* right side  */}
            <div className=' w-[50%] bg-[#3A3E41] rounded-[8px] px-8 py-5  ' >

                <div className=' flex items-center gap-x-2.5 ' >
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_527_2622)">
                                <path d="M9 12C-3 -4.5 27 -4.5 15 12H9ZM9 15H15V24L18 15L24 18V24H0V18L6 15L9 24" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_527_2622">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>


                    </span>
                    <h1 className=' text-white font-semibold text-lg ' >Most Followed Business Profiles</h1>
                </div>

                {/* user list  */}
                <div className="mt-5 flex flex-col gap-y-3">
                    {topBussiness.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between bg-[#0F0E13] px-2 py-2 rounded-[4px] border border-[#989898]"
                        >
                            <div className="flex items-center gap-x-5">
                                <Image
                                    src={`${imgUrl}/${item?.logo}`}
                                    width={100}
                                    height={100}
                                    alt="user"
                                    className="w-12 h-12 rounded-full"
                                />

                                <div>
                                    <h1 className="font-bold text-[16px] text-white">
                                        {item.name}
                                    </h1>
                                    <p className="font-medium text-white text-xs">
                                        {item.category ? item.category : "no category"}

                                        · {item.followers} followers
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h1 className="font-bold text-[16px] text-white">
                                    {/* {item.engagement} */}
                                </h1>
                                <p className="font-medium text-white text-xs">
                                    {item.job_posted} jobs posted
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default TopUser