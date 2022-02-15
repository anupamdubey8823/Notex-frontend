import React, { useState } from "react";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, MenuItem, Menu } from "@material-ui/core";
import firebase from "firebase";
import styled from "styled-components";

const Header = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [auth, setAuth] = useState(false);
	const open = Boolean(anchorEl);

	const handleLogin = async () => {
		// Connect to Google Authentication
		const { provider } =  await import('./firebase.js')
		firebase.auth().signInWithPopup(provider)
			.then((response) => {
				console.log(response)
				setAuth(true);
			})
			.catch(err => alert(err))
	}

	const handleClose = () => {
		setAnchorEl(null);
		setAuth(false);
	}

	const handleLogoutMenu = (event) => {
		setAnchorEl(event.currentTarget);
	}

	return (
		<HeaderContainer>
			
			<AppTitle>
				<h1><BeenhereIcon className="AppIcon" />Notex</h1>
			</AppTitle>

			<NavMenu>
				{auth ? <Button
					aria-label="account of current user"
					aria-controls="simple-menu"
					aria-haspopup="true"
					onClick={handleLogoutMenu}
					style={{ height: '50px', minWidth: '55px' }}
				>
					<MenuIcon style={{ fill: "white", fontSize: '1.8rem', borderRadius: '7px' }} />
				</Button> : <Button
					aria-label="Login button"
					aria-controls="login"
					onClick={handleLogin}
					style={{ height: '50px', minWidth: '55px' }}
				>
					<AccountCircle style={{ fill: "white", fontSize: '1.8rem', borderRadius: '7px' }} />
				</Button>}

				<Menu
					id="logout-menu"
					anchorEl={anchorEl}
					keepMounted
					open={open}
				>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
					<MenuItem style={{ color: 'red'}}>Delete Account</MenuItem>
				</Menu>
			</NavMenu>
		</HeaderContainer>
	);
};

/*
STYLED COMPONENTS
*/

const HeaderContainer = styled.div`
	background-color: #f5ba13;
	display: flex;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
	margin-bottom: 1.3rem;
`;

const AppTitle = styled.div`
	padding: 0 2rem;
	color: #fff;
	font-weight: 200;

	.AppIcon {
		margin-right: 1.5rem;
	}
`;

const NavMenu = styled.div`
	margin: auto 2rem auto auto;
`;

export default Header;