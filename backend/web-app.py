from fastapi import FastAPI, HTTPException
from .main import *

app = FastAPI()

# In-memory storage for user preferences
user_preferences = {}

@app.post("/preferences")
async def load_preferences(preferences):
    global user_preferences
    user_preferences["preferences"] = preferences
    return {"message": "Preferences loaded successfully"}


@app.get("/find-options")
async def find_options():
    global user_preferences
    preferences = user_preferences["preferences"]
    if not preferences:
        raise HTTPException(status_code=400, detail="Preferences not set")

    flight_pref = get_flight_pref(preferences, user_preferences)
    flights = get_flights(flight_pref)

    hotel_pref = get_hotel_pref(preferences, user_preferences)
    hotels = get_hotels(hotel_pref)
    
    return {
        "flights": flights,
        "hotels": hotels
    }

@app.post("/generate-itinerary")
async def generate_itinerary():
    return

@app.update("/update-preferences")
async def update_preferences(update):
    global user_preferences
    user_preferences = update_preferences(update)
    return {"message": "Preferences updated successfully"}