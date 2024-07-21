from fastapi import FastAPI, HTTPException
from .main import get_flights, get_flight_pref, get_hotels, get_hotel_pref

app = FastAPI()

# In-memory storage for user preferences
user_preferences = {}

@app.post("/preferences")
async def load_preferences(preferences):
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
    return