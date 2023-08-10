import Image from 'next/image';
import type { ITrending } from './interfaces';
import Link from 'next/link';

async function getData() {
    const url = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
        headers: {
            accept: 'application/json',
            Authorization: process.env.THEMOVIEDB_TOKEN as string,
        },
        next: {
            revalidate: 10,
        },
    });

    return url.json();
}

export default async function Home() {
    const data: ITrending = await getData();

    return (
        <div className="py-6 bg-white sm:py-8 lg:py-12">
            <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-2xl font-bold text-center text-gray-800 md:mb-6 lg:text-3xl">
                        Trending Movies
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                    {data.results.map((movie) => (
                        <div
                            key={movie.id}
                            className="flex flex-col overflow-hidden bg-white border rounded-lg"
                        >
                            <Link
                                className="relative block h-48 overflow-hidden bg-gray-100 group md:h-64"
                                href={`/movie/${movie.id}`}
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt="image movie banner"
                                    width={500}
                                    height={500}
                                    className="absolute inset-0 object-cover object-center w-full h-full transition duration-200 group-hover:scale-110"
                                />
                            </Link>
                            <div className="flex flex-col flex-1 p-4 sm:p-6">
                                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                    <Link
                                        href={`/movie/${movie.id}`}
                                        className="transition duration-100 hover:text-teal-500 active:text-teal-600"
                                    >
                                        {movie.title}
                                    </Link>
                                </h2>

                                <p className="text-gray-500 line-clamp-3">{movie.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
