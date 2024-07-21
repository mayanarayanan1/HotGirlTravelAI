"use client";

import Head from "next/head";
import React from "react";
import styled from "styled-components";

interface FlightComponentProps {
  flights: string[];
}

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 800px;
  line-height: 1.6;
`;

const Heading = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FlightItem = styled.div`
  margin-bottom: 20px;
`;

const AirlineLogo = styled.img`
  max-width: 70px;
  max-height: 70px;
  margin-top: 10px;
`;

const FlightComponent: React.FC<FlightComponentProps> = ({ flights }) => {
  return (
    <Container>
      <Heading>Flights</Heading>
      {flights.map((flight, index) => (
        <FlightItem key={index}>
          {flight.startsWith('Airline Logo: ') ? (
            <AirlineLogo src={flight.replace('Airline Logo: ', '')} alt="Airline Logo" />
          ) : (
            <p>{flight}</p>
          )}
        </FlightItem>
      ))}
    </Container>
  );
};

export default FlightComponent;
