import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IMG_URL } from '../hooks/useEnv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';


export default function MovieCard({ item }) {
	const navigate = useNavigate()
	const { likedList, setLikedList } = React.useContext(Context)
	const { savedList, setSavedList } = React.useContext(Context)

	function handleLikedBtnClick() {
		const likeData = likedList.findIndex(value => value.id == item.id)
		if (likeData == -1) {
			setLikedList([...likedList, item])
		} else {
			likedList.splice(likeData, 1)
			setLikedList([...likedList])
		}
	}

	function handleSavedBtnClick() {
		const saveData = savedList.findIndex(value => value.id == item.id)
		if (saveData == -1) {
			setSavedList([...savedList, item])
		} else {
			savedList.splice(saveData, 1)
			setSavedList([...savedList])
		}
	}

	return (
		<Card className='!bg-[#ffffff3d] cursor-pointer text-white border-[1.5px] border-white !rounded-[15px]' sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={<Avatar aria-label="recipe"><CardMedia className='!w-[50px] !h-[50px]' component="img" width={50} height={50} image={`${IMG_URL}/${item.backdrop_path}`} alt={item.title} /></Avatar>}
				title={<h4 className='!text-white line-clamp-1'>{item.title}</h4>}
				subheader={<span className='!text-white'>{item.release_date}</span>}
			/>
			<CardMedia onClick={() => navigate(`/movie/${item.id}`)} className='!h-[350px]' component="img" image={`${IMG_URL}/${item.poster_path}`} alt="img" />
			<CardContent><Typography className='!line-clamp-3 !text-white' variant="body2" sx={{ color: 'text.secondary' }}>{item.overview}</Typography></CardContent>
			<CardActions disableSpacing>
				<IconButton id="like" onClick={handleLikedBtnClick} aria-label="liked"><FavoriteIcon id="like" className='text-white' /></IconButton>
				<IconButton onClick={handleSavedBtnClick} aria-label="saved"><BookmarkIcon className='text-white' /></IconButton>
			</CardActions>
		</Card>
	);
}