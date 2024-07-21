"use client";

import React from "react";
import styled from "styled-components";

const OuterWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 0px;
`;

const Title = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
  text-align: left; /* Center align the title */
`;

const ComponentWrapper = styled.div`
  margin-top: 0px;
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 1600px; /* Set a max width for the component */
`;

const HalfWidthWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: center;
`;

const HalfWidthField = styled.div`
  flex: 1;
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

const ButtonWrapper = styled.div`
  margin-top: 20px; /* Adjust the margin to your preference */
`;

interface EditPreferencesProps {
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
  activityLevel: number;
  setActivityLevel: React.Dispatch<React.SetStateAction<number>>;
  button: React.ReactNode;
}

const EditPreferencesComponent: React.FC<EditPreferencesProps> = ({
  budget,
  setBudget,
  activityLevel,
  setActivityLevel,
  button,
}) => (
  <OuterWrapper>
    <Title>Edit Your Preferences</Title>
    <ComponentWrapper>
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
      <ButtonWrapper>{button}</ButtonWrapper>
    </ComponentWrapper>{" "}
  </OuterWrapper>
);

export default EditPreferencesComponent;
