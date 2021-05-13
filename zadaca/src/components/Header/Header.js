import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import LogoImage from '../../assets/images/logo.png';
import {
    HeaderWrapper,
    Inner,
    Logo,
    LogoContainer,
    Nav,
    NavItem,
    Hamburger,
    HamburgerLine,
    HamburgerNav,
    HamburgerLink,
    HamburgerLinkDummy,
    NavItemDummy
} from './HeaderStyle';

const Header = (props) => {

    const { pathname } = useLocation();
    const history = useHistory();

    const [showHamburgerNav, setHamburgerNav] = useState(false);

    const toggleNavigation = (e) => {
        setHamburgerNav(!showHamburgerNav);
    }

    const logout = () => {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('authToken');
        props.setIsLoggedIn(false);
        props.setIsAdmin(false);

        if (pathname === '/admin') {
            history.push(`/`);
        }
    }

    return (
        <HeaderWrapper>
            <Inner>
                <LogoContainer to="/">
                    <Logo src={LogoImage} alt="FOI logo" />
                </LogoContainer>
                <Hamburger onClick={toggleNavigation}>
                    <HamburgerLine />
                    <HamburgerLine />
                    <HamburgerLine />
                </Hamburger>
                {!showHamburgerNav ? <Nav>
                    <NavItem exact to="/">Home</NavItem>
                    <NavItem exact to="/events">Events</NavItem>
                    {!props.isLoggedIn && <NavItem exact to="/register">Register</NavItem>}
                    {!props.isLoggedIn && <NavItem exact to="/login">Login</NavItem>}
                    {props.isLoggedIn && props.isAdmin && <NavItem exact to="/admin">Admin</NavItem>}
                    {props.isLoggedIn && <NavItemDummy onClick={logout}>Logout</NavItemDummy>}

                </Nav>
                    : <HamburgerNav>
                        <HamburgerLink onClick={toggleNavigation} exact to="/">Home</HamburgerLink>
                        <HamburgerLink onClick={toggleNavigation} exact to="/events">Events</HamburgerLink>
                        {!props.isLoggedIn && <HamburgerLink onClick={toggleNavigation} exact to="/register">Register</HamburgerLink>}
                        {!props.isLoggedIn && <HamburgerLink onClick={toggleNavigation} exact to="/login">Login</HamburgerLink>}
                        {props.isLoggedIn && props.isAdmin && <HamburgerLink onClick={toggleNavigation} exact to="/admin">Admin</HamburgerLink>}
                        {props.isLoggedIn && <HamburgerLinkDummy onClick={() => { logout(); toggleNavigation(); }}>Logout</HamburgerLinkDummy>}
                    </HamburgerNav>}
            </Inner>
        </HeaderWrapper>
    );
}

export default Header;

