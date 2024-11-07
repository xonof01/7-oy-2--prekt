import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Autocomplete, Badge, TextField } from '@mui/material';
import { PATH } from '../hooks/usePath';
import { Context } from '../context/Context';
import SearchIcon from '@mui/icons-material/Search';

const navItems = [
	{
		id: 1,
		title: "Now Playing",
		to: PATH.nowPlaying
	}, {
		id: 2,
		title: "Popular",
		to: PATH.popular
	}, {
		id: 3,
		title: "Top Rated",
		to: PATH.topRated
	}, {
		id: 4,
		title: "Upcoming",
		to: PATH.upcoming
	},
];

function Navbar() {
	const { likedList } = React.useContext(Context)
	const { savedList } = React.useContext(Context)
	return (
		<Box sx={{ display: 'flex', position: "relative" }}>
			<AppBar className='!bg-[#131212ea]'>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>Movies</Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map((item) => (<Button key={item.id} sx={{ color: '#fff' }}><NavLink to={item.to}>{item.title}</NavLink></Button>))}
					</Box>
					<SearchIcon onClick={() => setShowInput(!showInput)} className='scale-[1.5] ml-5 cursor-pointer' />
					<Box sx={{ display: "flex", gap: "25px", marginLeft: "30px" }}>
						<Button variant='outlined' sx={{ borderRadius: "50%", borderColor: "white" }}>
							<Badge showZero badgeContent={likedList.length} color="error">
								<FavoriteIcon sx={{ color: "white" }} />
							</Badge>
						</Button>
						<Button variant='outlined' sx={{ borderRadius: "50%", borderColor: "white" }}>
							<Badge showZero badgeContent={savedList.length} color="secondary">
								<BookmarkIcon sx={{ color: "white" }} />
							</Badge>
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	)
}



export default Navbar;