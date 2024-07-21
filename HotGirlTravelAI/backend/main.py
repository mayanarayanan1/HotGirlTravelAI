from fastapi import FastAPI, HTTPException
import openai
from openai import OpenAI
from services import *
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)
app = FastAPI()

# In-memory storage for user preferences
user_preferences = {}

# Set up OpenAI API key

@app.post("/preferences")
async def load_preferences(preferences):
    global user_preferences
    user_preferences["preferences"] = preferences
    return {"message": "Preferences loaded successfully"}


@app.get("/find-options")
async def find_options():
    preferences = user_preferences.get("preferences")
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

    preferences = user_preferences.get("preferences")
     # Hardcoded preferences
    preferences = {
        "location": "Greece",
        "numDays": 5,
        "numPeople": 2,
        "busyLevel": 3,
        "dietary": "vegetarian",
        "isDisability": True
    }
    if not preferences:
        raise HTTPException(status_code=400, detail="Preferences not set")
    
   
    destination = preferences["location"]
    days = preferences["numDays"]
    numPeople = preferences["numPeople"]
    busyLevel = preferences["busyLevel"]
    dietary = preferences["dietary"]

    # Example: Prepare prompt for GPT-4
    prompt = f"Create a {days}-day travel itinerary for {destination}. I am traveling with {numPeople}. On a scale of 1-5, I want the level of busyness to be {busyLevel}. When including the itinerary for food places, please take into account these dietary needs {dietary}."
    if preferences["isDisability"]:
        prompt += "When creating this itinerary, please take into account that I have a disability."
    try:
        response = client.chat.completions.create(model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500)
        itinerary = response.choices[0].message.content.strip()
    except openai.OpenAIError as e:
         raise HTTPException(status_code=500, detail=f"Error generating itinerary: {str(e)}")

    return {"itinerary": itinerary}

@app.post("/update-preferences")
async def update_preferences(update):
    global user_preferences
    user_preferences = update_preferences(update)
    return {"message": "Preferences updated successfully"}