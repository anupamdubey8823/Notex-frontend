import React from "react";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from "@material-ui/core";
import styled from "styled-components";

const Header = () => {
	return (
		<HeaderContainer>
			
			<AppTitle>
				<h1><BeenhereIcon className="AppIcon" />Notex</h1>
			</AppTitle>

			<NavMenu>
				<Button
					aria-label="Login button"
					aria-controls="login"
					style={{ height: '50px', minWidth: '55px' }}
				>
					<AccountCircle style={{ fill: "white", fontSize: '1.8rem', borderRadius: '7px' }} />
				</Button>
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