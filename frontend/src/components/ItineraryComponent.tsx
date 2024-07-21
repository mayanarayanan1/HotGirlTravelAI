"use client";

import React from "react";
import styled from "styled-components";

// Sample output string
const output =
  "Arrive in Athens and check into your hotel\n- Visit the Acropolis and explore the ancient ruins, including the Parthenon\n- Walk around the historic Plaka neighborhood and enjoy traditional Greek cuisine at a local taverna\n\nDay 2:\n- Take a day trip to Delphi to visit the ancient archaeological site and the Temple of Apollo\n- Explore the archaeological museum in Delphi\n- Return to Athens in the evening and have dinner at a rooftop restaurant overlooking the city\n\nDay 3:\n- Catch a ferry to the island of Santorini\n- Visit the picturesque village of Oia and watch the sunset over the Aegean Sea\n- Explore the volcanic beaches and take a boat tour of the caldera\n\nDay 4:\n- Visit the ancient ruins of Akrotiri, an archaeological site that offers insight into the Minoan civilization\n- Relax on the black sand beaches of Perissa or Kamari\n- Explore the capital of Fira and wander through the narrow streets lined with white-washed buildings\n\nDay 5:\n- Take a morning ferry back to Athens\n- Visit the National Archaeological Museum to see artifacts from ancient Greece\n- Spend your final evening exploring the lively Monastiraki neighborhood and shopping at the flea market\n\nOptional activities throughout the trip:\n- Try traditional Greek dishes like moussaka, souvlaki, and baklava\n- Sample local wines from the region\n- Visit other historical sites in Athens, such as the Temple of Olympian Zeus or the Ancient Agora\n- Take a boat tour to the nearby islands of Mykonos or Naxos\n\nEnjoy your trip to Greece!";

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

const IntineraryComponent: React.FC = () => {
  // Split the output into an array of lines
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

export default IntineraryComponent;
