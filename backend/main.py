import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import openai
from openai import OpenAI
from services import *
from config import OPENAI_API_KEY
from pydantic import BaseModel

# Set up OpenAI API key
client = OpenAI(api_key=OPENAI_API_KEY)
app = FastAPI()

# Allow CORS for frontend communication
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for user preferences
user_preferences = {}

@app.get("/get-itinerary")
async def get_travel_itinerary(preferences: str):
    preferences_dict = json.loads(preferences)
    await load_preferences(preferences_dict)
    flight_hotels = await find_options()
    itinerary = await generate_itinerary()
    return {"flight_hotels": flight_hotels, "itinerary": itinerary}

@app.post("/preferences")
async def load_preferences(preferences: dict):
    global user_preferences
    user_preferences = preferences
    return {"message": "Preferences loaded successfully"}

@app.get("/find-options")
async def find_options():
    preferences = user_preferences
    if not preferences:
        raise HTTPException(status_code=400, detail="Preferences not set")

    flight_pref = get_flight_pref(preferences)
    flights = get_flights(flight_pref)

    hotel_pref = get_hotel_pref(preferences)
    hotels = get_hotels(hotel_pref)

    return {
        "flights": flights,
        "hotels": hotels
    }

@app.post("/generate-itinerary")
async def generate_itinerary():
    preferences = user_preferences
    if not preferences:
        raise HTTPException(status_code=400, detail="Preferences not set")
    
    destination = preferences["returnLocation"]
    days = preferences["numDays"]
    numPeople = preferences["numPeople"]
    busyLevel = preferences["busyLevel"]
    dietary = (preferences["dietary"])
    cuisine = preferences["cuisine"]

    # Example: Prepare prompt for GPT-4
    prompt = f"Create a {days}-day travel itinerary for {destination}. I am traveling with {numPeople}. On a scale of 1-5, I want the level of busyness to be {busyLevel}. When including the itinerary for food places, I prefer the following cuisines: {cuisine}. Please take into account these dietary needs {dietary}."
    if preferences["isDisability"]:
        prompt += "When creating this itinerary, please take into account that I have a disability."
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Please display your output in the following format:\n"
                                              "Day 1: Description\n"
                                              "- Morning: activity\n"
                                              "- Afternoon: activity\n"
                                              "- Dinner: activity\n"
                                              "Repeat this for each day of the trip."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500
        )
        itinerary = response.choices[0].message.content.strip()
    except openai.OpenAIError as e:
         raise HTTPException(status_code=500, detail=f"Error generating itinerary: {str(e)}")

    return {"itinerary": itinerary}

@app.post("/update-preferences")
async def update_user_preferences(price: int, busy: int):
    global user_preferences
    user_preferences = update_preferences(price, busy)
    itinerary = await generate_itinerary()
    return itinerary