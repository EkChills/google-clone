"use client"

import React,{useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsFillMicFill} from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'



export default function HomeSearch() {
  const [input, setInput] = useState('')
  const [randomSearchLoading, setRandomSearchLoading] = useState(false)
  const router = useRouter()
  function handleSubmit(e) {
    e.preventDefault()
    if(!input.trim()) return
    router.push(`/search/web?searchTerm=${input}`)
  }

  async function randomSearch() {
    setRandomSearchLoading(true)
    const resp = await fetch('https://random-word-api.herokuapp.com/word').then(resp => resp.json())
    .then((data) => data[0])
    if(!resp) return
    router.push(`/search/web?searchTerm=${resp}`)
    setRandomSearchLoading(false)
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='flex w-full mt-5 mx-auto max-w-[90%] border border-gray-200 px-5 py-3 rounded-full hover:shadow-md transition-shadow focus-within:shadow-md sm:max-w-xl lg:max-w-2xl'>
        <AiOutlineSearch className='text-xl text-gray-500 mr-3' />
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className='flex-1 focus:outline-none' />
        <BsFillMicFill className='text-lg' />
      </form>

      <div className='flex flex-col space-y-2 sm:space-y-0 sm:space-x-4
      justify-center sm:flex-row mt-8'>
        <button onClick={handleSubmit} className='btn'>Google Search</button>
        <button onClick={randomSearch} disabled={randomSearchLoading} type='button' className='btn flex items-center justify-center disabled:opacity-80'>{ randomSearchLoading ? <Image src="/spinner.svg" width={24} height={24} className='h-6 text-center' alt="spinner" /> : 'I Am Feeling Lucky'}</button>
      </div>
    </>
  )
}
