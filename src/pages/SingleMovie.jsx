import React, { useEffect, useState } from 'react'
import { useAxios } from "../hooks/useAxios";
import { API_KEY, IMG_URL } from '../hooks/useEnv';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import YouTube from 'react-youtube';

function SingleMovie() {
	const { id } = useParams()
	const [changeImg, setChangeImg] = useState(false)
	const [movieInfo, setMovieInfo] = useState([])
	const [actors, setActors] = useState([])
	const [videos, setVideos] = useState([])

	useEffect(() => {
		useAxios().get(`/${id}?api_key=${API_KEY}`).then(res => {
			setMovieInfo(res.data)
		})
	}, [])

	useEffect(() => {
		useAxios().get(`/${id}/credits?api_key=${API_KEY}`).then(res => {
			setActors(res.data.cast);
		})
	}, [])

	useEffect(() => {
		useAxios().get(`/${id}/videos?api_key=${API_KEY}`).then(res => {
			setVideos(res.data.results.splice(0, 5));
		})
	}, [])

	return (
		<div className='flex justify-between p-3'>
			<div className="w-[19%] rounded-[15px] space-y-5 p-3 border-[2px] border-white h-[83vh] overflow-y-auto">
				{actors.map(item => (   
					<div key={item.id} className="bg-[#000009] rounded-[15px] space-y-3 p-3">
						<img className='w-full object-cover h-[400x]' src={`${IMG_URL}/${item.profile_path}`} alt="actors img" />
						<h2 className="text-[20px] font-bold leading-[20px] text-white text-center">{item.name}</h2>
						<h2 className="text-[16px] font-bold leading-[20px] text-white text-center">{item.character}</h2>
					</div>
				))}
			</div>
			<div className="w-[54%] rounded-[15px] p-3 border-[2px] border-white h-[83vh] overflow-y-auto">
				<h2 className="text-[25px] font-bold leading-[20px] text-center text-white mb-5">{movieInfo?.title}</h2>
				<div onMouseLeave={() => setChangeImg(false)} onMouseEnter={() => setChangeImg(true)} className='h-[460px] relative overflow-hidden rounded-[15px]'>
					<img className={`h-full w-full object-cover absolute duration-500 rounded-[15px] ${changeImg ? "left-[-120%]" : "left-0"}`} src={`${IMG_URL}/${movieInfo.poster_path}`} alt="Movie img" height={460} />
					<img className={`h-full w-full object-cover absolute duration-500 rounded-[15px] ${changeImg ? "right-0" : "right-[-120%]"}`} src={`${IMG_URL}/${movieInfo.backdrop_path}`} alt="Movie img" height={460} />
				</div>
				<p className="text-[18px] text-white font-semibold mt-5 leading-[18px]">{movieInfo.overview}</p>
				<p className="text-[18px] text-white font-semibold mt-5 leading-[18px]">Budget: ${movieInfo.budget}</p>
				<div className="flex items-center space-x-5 mt-5">
					{movieInfo?.genres?.map(item => <Button size='large' key={item.id} variant='contained'>{item.name}</Button>)}
				</div>
			</div>
			<div className="w-[24%] space-y-5 rounded-[15px] p-3 border-[2px] border-white h-[83vh] overflow-y-auto">
				{videos.map(item => <YouTube className='w-full' videoId={item.key} key={item.id} />)}
			</div>
		</div>
	)
}

export default SingleMovie