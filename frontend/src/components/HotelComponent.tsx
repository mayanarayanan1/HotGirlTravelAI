"use client";

import React from "react";
import styled from "styled-components";

interface HotelComponentProps {
  hotels: string[];
}

// Styled components for styling the hotel list
const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 600px;
  line-height: 1.6;
`;

const HotelItem = styled.div`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Category = styled.div`
  color: #2c3e50;
  font-weight: bold;
  margin-top: 10px;
`;

const Name = styled.div`
  color: #2c3e50;
  font-weight: bold;
  margin-top: 5px;
`;

const Description = styled.div`
  color: #2c3e50;
  margin-top: 5px;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const HotelComponent: React.FC<HotelComponentProps> = ({ hotels }) => {
  return (
    <Container>
      {hotels.map((hotel, index) => (
        <HotelItem key={index}>
          {hotel.startsWith('Category:') ? (
            <Category>{hotel}</Category>
          ) : hotel.startsWith('Name:') ? (
            <Name>{hotel}</Name>
          ) : hotel.startsWith('Description:') ? (
            <Description>{hotel}</Description>
          ) : hotel.startsWith('Link:') ? (
            <Link href={hotel.replace('Link: ', '')} target="_blank" rel="noopener noreferrer">
              Visit Website
            </Link>
          ) : (
            <Description>{hotel}</Description>
          )}
        </HotelItem>
      ))}
    </Container>
  );
};

export default HotelComponent;