"use client";

import React from "react";
import styled from "styled-components";

interface ItineraryComponentProps {
  output: string;
}

// Styled components for styling the itinerary
const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 600px;
  line-height: 1.6;
`;

const DayHeading = styled.h2`
  color: #2c3e50;
  margin-top: 20px;
`;

const Activity = styled.p`
  margin: 5px 0;
  padding-left: 20px;
  text-indent: -10px;
`;

const OptionalActivities = styled.div`
  margin-top: 20px;
`;

const OptionalHeading = styled.h3`
  color: #2c3e50;
  margin-top: 10px;
`;

const ItineraryComponent: React.FC<ItineraryComponentProps> = ({ output }) => {
  const lines = output.split("\n");

  return (
    <Container>
      {lines.map((line, index) => {
        if (line.startsWith("Day")) {
          return <DayHeading key={index}>{line}</DayHeading>;
        } else if (line.startsWith("-")) {
          return <Activity key={index}>{line}</Activity>;
        } else if (line.startsWith("Optional activities")) {
          return (
            <OptionalActivities key={index}>
              <OptionalHeading>Optional Activities:</OptionalHeading>
            </OptionalActivities>
          );
        } else {
          return <Activity key={index}>{line}</Activity>;
        }
      })}
    </Container>
  );
};

export default ItineraryComponent;
