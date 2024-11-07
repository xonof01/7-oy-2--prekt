import React, { useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import MovieCard from './MovieCard'
import { Pagination } from '@mui/material'

function MoviePage({URL}) {
	const [data, setData] = useState([])
	const [totalPage, setTotalPage] = useState(1)
	const [page, setPage] = useState(1)

	useEffect(() => {
		useAxios().get(`${URL}?language=en-US&page=${page}`).then(res => {
			setData(res.data.results.map(item => {
				item.isLiked = false
				item.isSaved = false
				return item 
			}))
			setTotalPage(res.data.total_pages)
		})
	}, [page])

	// pagination start 
	function handlePaginationChange(e, count){
		setTimeout(() => window.scrollTo(0, 0), 500)
		setPage(count)
	}
	// pagination end

	return (
		<>
			<div className='flex justify-between flex-wrap gap-[30px] p-[25px]'>
				{data.map(item => <MovieCard key={item.id} item={item} />)}
			</div>
			<div className="flex justify-center !bg-[#ffffff3d] py-2">
				<Pagination onChange={handlePaginationChange} count={totalPage}/>
			</div>
		</>
	)
}

export default MoviePage