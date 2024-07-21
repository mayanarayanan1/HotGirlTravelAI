"use client";

import React, { useState } from "react";
import styled from "styled-components";
import ItineraryComponent from "@/components/ItineraryComponent";
import HotelComponent from "@/components/HotelComponent"
import FlightComponent from "./FlightComponent";
import axios from "axios";

interface Hotel {
  type: string;
  name: string;
  description: string;
  link: string;
  gps_coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface FlightDetails {
  airline: string;
  airline_logo: string;
  airplane: string;
  arrival_airport: {
    name: string;
    id: string;
    time: string;
  };
  departure_airport: {
    name: string;
    id: string;
    time: string;
  };
  duration: number;
  extensions: string[];
  flight_number: string;
  legroom: string;
  travel_class: string;
}

interface Flight {
  airline_logo: string;
  carbon_emissions: {
    this_flight: number;
    typical_for_this_route: number;
    difference_percent: number;
  };
  departure_token: string;
  extensions: string[];
  flights: FlightDetails[];
  price: number;
  total_duration: number;
  type: string;
}

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

const Message = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
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
  const [flights, setFlights] = useState<string[]>([]);
  const [hotels, setHotels] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState("");
  const [displayItinerary, setDisplayItinerary] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const endpoint = 'http://127.0.0.1:8000';

  const handleSearch = async () => {
    console.log("Search:", { from, to, start, end, guests });
    setIsLoading(true);
    // Check that all unhidden fields are non-empty
    if (from === "" || to === "" || start === "" || end === "") {
      setMessageVisible(true);
      setTimeout(() => {
        setMessageVisible(false);
      }, 3000);
      setIsLoading(false);
      return;
    }

    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const preferences = {
        departureLocation: from,
        returnLocation: to,
        departureDate: start,
        returnDate: end,
        numDays: diffDays,
        numPeople: guests,
        priceMax: budget,
        busyLevel: activityLevel,
        hasAllergy: allergy,
        isDisability: disability,
        pets: pets
      };

      const response = await axios.get(`${endpoint}/get-itinerary`, {
        params: {
          preferences: JSON.stringify(preferences)
        }
      });

      if (response.status === 200) {
        const { flight_hotels, itinerary } = response.data;
        const { flights, hotels } = flight_hotels;

        const flightStrings: string[] = [];
        for (const flight of flights) {
          const flightData = flight as Flight;
          flightStrings.push(`Airline Logo: ${flightData.airline_logo}`);
          flightStrings.push(`Price: $${flightData.price}`);
          flightStrings.push(`Total Duration: ${flightData.total_duration} minutes`);
          flightStrings.push(`Extensions: ${flightData.extensions?.join(', ') || 'None'}`);
          flightStrings.push(`Carbon Emissions: This flight - ${flightData.carbon_emissions.this_flight}g, Typical for this route - ${flightData.carbon_emissions.typical_for_this_route}g, Difference - ${flightData.carbon_emissions.difference_percent}%`);
          flightData.flights.forEach((detail, idx) => {
            flightStrings.push(`Flight Number: ${detail.flight_number}`);
            flightStrings.push(`Airline: ${detail.airline}`);
            flightStrings.push(`Airplane: ${detail.airplane}`);
            flightStrings.push(`Departure Airport: ${detail.departure_airport.name} (${detail.departure_airport.id}) at ${detail.departure_airport.time}`);
            flightStrings.push(`Arrival Airport: ${detail.arrival_airport.name} (${detail.arrival_airport.id}) at ${detail.arrival_airport.time}`);
            flightStrings.push(`Duration: ${detail.duration} minutes`);
            flightStrings.push(`Legroom: ${detail.legroom}`);
            flightStrings.push(`Travel Class: ${detail.travel_class}`);
            flightStrings.push(`Extensions: ${detail.extensions.join(', ')}`);
          });
          flightStrings.push('');
        }
        setFlights(flightStrings);

        const hotelStrings = [];
        for (const [key, hotel] of Object.entries(hotels)) {
          const hotelData = hotel as Hotel;
          hotelStrings.push(`Category: ${key}`);
          hotelStrings.push(`Name: ${hotelData.name}`);
          hotelStrings.push(`Description: ${hotelData.description}`);
          hotelStrings.push(`Link: ${hotelData.link}`);
          hotelStrings.push('');
        }
        setHotels(hotelStrings);
        setItinerary(itinerary.itinerary.toString());
        setDisplayItinerary(true);
      }
    } catch (e) {
      console.log(`Unable to search due to ${e}`);
    } finally {
      setIsLoading(false);
    }
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
              type="text"
              id="to"
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
              placeholder="Choose end date"
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
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Search'
              )}
            </Button>
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
                  value={budget}
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
      {displayItinerary && itinerary && (
        <FlightComponent flights={flights} />
      )}
      {displayItinerary && itinerary && (
        <HotelComponent hotels={hotels} />
      )}
      {displayItinerary && itinerary && (
        <ItineraryComponent output={itinerary} />
      )}
      {messageVisible && <Message>Please fill in all required fields.</Message>}
    </div>
  );
};

export default SearchBarComponent;
