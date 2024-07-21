"use client";

import React, { useState } from "react";
import styled from "styled-components";
import IntineraryComponent from "@/components/ItineraryComponent";

const SearchBarWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 1600px; /* Set a max width for the component */
  position: relative; /* To position the Show More button */
`;

const MainFieldsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: nowrap;
  gap: 10px;
`;

const AdditionalFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* Allow components to grow */
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 1rem;
  width: 100%; /* Ensure input takes the full width of the parent */
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 1rem;
  color: black;
  width: 100%; /* Ensure select takes the full width of the parent */
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px; /* Set a fixed width for the search button */
  height: 50px;

  &:hover {
    background-color: #555;
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const HalfWidthWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const HalfWidthField = styled.div`
  flex: 1;
`;

const ExpandButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  bottom: -20px; /* Position below the component */
  right: 20px; /* Align to the right */
  transform: translateY(100%); /* Move it below the component */

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchBarComponent: React.FC = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [guests, setGuests] = useState(1);
  const [budget, setBudget] = useState(5000);
  const [activityLevel, setActivityLevel] = useState(3);
  const [allergy, setAllergy] = useState(false);
  const [disability, setDisability] = useState(false);
  const [pets, setPets] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayIntinerary, setDisplayItinerary] = useState(false);

  const handleSearch = () => {
    // Implement the search functionality here
    console.log("Search:", { from, to, start, end, guests });
    setDisplayItinerary(true);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <SearchBarWrapper>
        <MainFieldsWrapper>
          <SearchField>
            <Label htmlFor="from">From</Label>
            <Input
              type="text"
              id="from"
              placeholder="Leave where?"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </SearchField>
          <SearchField>
            <Label htmlFor="to">To</Label>
            <Input
              type="to"
              id="location"
              placeholder="Go where?"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </SearchField>
          <SearchField>
            <Label htmlFor="start">Start</Label>
            <Input
              type="date"
              id="start"
              placeholder="Choose start date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </SearchField>
          <SearchField>
            <Label htmlFor="end">End</Label>
            <Input
              type="date"
              id="end"
              placeholder="Choose date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </SearchField>
          <SearchField>
            <Label htmlFor="guests">Guests</Label>
            <Select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </Select>
          </SearchField>
          <div>
            .<Button onClick={handleSearch}>Search</Button>
          </div>
        </MainFieldsWrapper>
        {isExpanded && (
          <AdditionalFieldsWrapper>
            {/* Add additional fields here */}
            <HalfWidthWrapper>
              <HalfWidthField>
                <Label htmlFor="budget">Budget</Label>
                <Input
                  type="number"
                  id="budget"
                  placeholder="Enter your maximum budget"
                  onChange={(e) => setBudget(Number(e.target.value))}
                />
              </HalfWidthField>
              <HalfWidthField>
                <Label htmlFor="activityLevel">Activity Level</Label>
                <Select
                  id="activityLevel"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(Number(e.target.value))}
                >
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Select>
              </HalfWidthField>
            </HalfWidthWrapper>
            {/* <SearchField>
            <Label htmlFor="preferences">Preferences</Label>
            <Input
              type="text"
              id="preferences"
              placeholder="Any preferences?"
              onChange={(e) => console.log("Preferences:", e.target.value)}
            />
          </SearchField> */}
            <CheckboxWrapper>
              <div>
                <Label htmlFor="pets">Traveling with pets?</Label>
                <Input
                  type="checkbox"
                  id="pets"
                  onChange={(e) => setPets(e.target.checked)}
                />
              </div>
              <div>
                <Label htmlFor="disability">Any disabilities?</Label>
                <Input
                  type="checkbox"
                  id="disability"
                  onChange={(e) => setDisability(e.target.checked)}
                />
              </div>
              <div>
                <Label htmlFor="allergy">Any allergies?</Label>
                <Input
                  type="checkbox"
                  id="allergy"
                  onChange={(e) => setAllergy(e.target.checked)}
                />
              </div>
            </CheckboxWrapper>
          </AdditionalFieldsWrapper>
        )}
        <ExpandButton onClick={toggleExpand}>
          {isExpanded ? "Show Less" : "Show More"}
        </ExpandButton>
      </SearchBarWrapper>
      {displayIntinerary && <IntineraryComponent />}
    </div>
  );
};

export default SearchBarComponent;
