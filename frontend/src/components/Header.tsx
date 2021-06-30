/* eslint-disable prettier/prettier */
import React, { ChangeEvent, FormEvent } from 'react';
import {UserIcons} from './UserIcons';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { FC } from 'react';
import { useState } from 'react';

export const Header:FC<RouteComponentProps> = ({history, location}) => {
	const searchParams = new URLSearchParams(location.search);
	const criteria = searchParams.get('criteria') || '';
	const[search, setSearch] = useState(criteria);
	const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
		setSearch(e.currentTarget.value);
	};
	const handleSearchSubmit=(e:FormEvent<HTMLFormElement>)=>{
		e.preventDefault();
		history.push(`/search?criteria=${search}`);
	};
	return(
		<div className="header">
			<Link to="/" className="header__logo" >Q & A</Link>
			<form onSubmit={handleSearchSubmit}>
				<input className="header__search" type="text" placeholder="Search ..." value={search} onChange={handleSearchInputChange}/>
			</form>
			<Link className="header__signin" to="/signin">
				<UserIcons/>
				<span>Sign In</span>
			</Link>
		</div>
	);
};

export const HeaderWithRouter = withRouter(Header);