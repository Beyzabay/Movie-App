import Movies from '@/app/components/Movies';
import React from 'react';

const page = async({params}) => {
    const keyword = params.keyword;

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=bf0c5a689718187dcbff0b2917cc399e&query=${keyword}&language=en-US&include_adult=false`);
    const data = await res.json();
    console.log(data?.results, "data");

    return (
        <div>
            {
                (!data?.results || data.results.length === 0) ? (
                    <div>Aranılan sonuç bulunamadı</div>
                ) : (
                    <div className='flex items-center flex-wrap gap-3'>
                        {
                            data.results.map((dt, i) => (
                                <Movies key={i} dt={dt}/>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}

export default page;
