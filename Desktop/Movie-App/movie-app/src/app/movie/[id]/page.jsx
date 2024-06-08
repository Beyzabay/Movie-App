import React from "react";
import Image from "next/image";

const getMovie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=bf0c5a689718187dcbff0b2917cc399e`
  );
  return await res.json();
};

const page = async ({ params }) => {
  const id = params.id;
  const movieDetail = await getMovie(id);

  console.log(movieDetail, "movieDetail");
  return (
    <div className="relative p-7 min-h-screen">
      <Image
        style={{ objectFit: "cover" }}
        fill
        src={`https://image.tmdb.org/t/p/original/${
          movieDetail?.backdrop_path || movieDetail?.poster_path
        }`}
      />
      <div className="absolute">
        <div className="text-4xl font-bold my-3">{movieDetail?.title}</div>
        <div className="my-3">{movieDetail?.release_date}-{movieDetail?.vote_average}</div>
        <div className="my-2 border w-32 bg-white text-black hover:bg-black hover:text-white p-2 rounded-md text-center text-lg cursor-pointer">Trail</div>
      </div>
    </div>
  );
};

export default page;
