"use client";

import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Tagline = styled.span`
  margin-left: 20px;
  font-size: 1rem;
  color: #ff69b4;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const HeaderComponent: React.FC = () => (
  <HeaderWrapper>
    <Logo>HotGirlTravel.ai</Logo>
    <Tagline>AI-Powered Travel Agent</Tagline>
    <Nav>
      <NavLink href="#">Home</NavLink>
      <NavLink href="#">About Us</NavLink>
      <NavLink href="#">My Trips</NavLink>
    </Nav>
  </HeaderWrapper >
);

export default HeaderComponent;
