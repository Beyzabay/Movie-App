import React from 'react'
import Movies from './components/Movies';

const page = async({searchParams}) => {
  const res = await fetch(`https://api.themoviedb.org/3/${searchParams.genre ? "movie/" + searchParams.genre : "trending/all/day"}?api_key=bf0c5a689718187dcbff0b2917cc399e&language=en-US&page=1`, {next: {revalidate:1000}})
  const data = await res.json();
  console.log(data, "data")
  return (
  <>
    <title>Movie App</title>
    <div className='flex items-center justify-center flex-wrap gap-3'>
      {
      data?.results?.map((dt,i) => (
        <Movies key={i} dt={dt}/>
      ))
      
      }
    </div>
  </>
  )
}

export default page