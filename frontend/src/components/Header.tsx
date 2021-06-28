/* eslint-disable prettier/prettier */
import React, { ChangeEvent } from 'react';
import {UserIcons} from './UserIcons';
import { Link } from 'react-router-dom';

export const Header = () => {
	const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) =>{
		
	};
	return(
		<div className="header">
			<Link to="/" className="header__logo" >Q & A</Link>
			<input className="header__search" type="text" placeholder="Search ..." onChange={handleSearchInputChange}/>
			<Link className="header__signin" to="/signin">
				<UserIcons/>
				<span>Sign In</span>
			</Link>
		</div>
	);
};