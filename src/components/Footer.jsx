import React from "react";
import styled from "styled-components";

const year = new Date().getFullYear();
const Footer = () => {
    return (
        <FooterContainer>
            <footer>
                <p>Copyright © {year}</p>
            </footer>
        </FooterContainer>
    );
};

/*
STYLED COMPONENTS
*/

// .footer-container{}
const FooterContainer = styled.div`
    position: relative;
    top: 310px;

    footer {
        text-align: center;
    }

    footer p {
        color: #ccc;
    }
`;

export default Footer;