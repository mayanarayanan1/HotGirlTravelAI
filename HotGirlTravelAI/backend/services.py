import fastapi
import requests
from serpapi import GoogleSearch


def get_flights(flightPref):
    # Get Google Flights API
    price_min = 500
    price_max = 3000
    params = {
    "engine": "google_flights",
    "departure_id": flightPref["departureLocation"],
    "arrival_id": flightPref["returnLocation"],
    "outbound_date": flightPref["departureDate"],
    "return_date": flightPref["returnDate"],
    "currency": "USD",
    "hl": "en",
    "api_key": api_key,
    "adults" : flightPref["numPeople"],
    "max_price" : flightPref["priceMax"]
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    return results

def get_hotels(hotel_pref):
    location = hotel_pref['location']
    amenities = []
    if hotel_pref['pets']:
        amenities.add('19')
    recommended = {}
    filters = {
        '3': 'lowestPrice', 
        '8': 'highestRating',
        '13': 'mostReviewed'
    }
    for key, filter_name in filters.items():
        hotel_params = {
            'engine': 'google_hotels',
            'q': f'{location}',
            'check_in_date': hotel_pref['arrivalDate'],
            'check_out_date': hotel_pref['leaveDate'],
            'adults': hotel_pref['numPeople'],
            'min_price': hotel_pref['priceMin'],
            'max_price': hotel_pref['priceMax'],
            'amenities': amenities,
            'api_key': api_key,
            'sort_by': key
        }
        search = GoogleSearch(hotel_params)
        results = search.get_dict()
        recommended[filter_name] = results['properties'][0]
    return recommended

def get_flight_pref(preferences):
    attributes = ['departureDate', 'departureLocation', 'returnDate', 'returnLocation', 'priceMax', 'numPeople']
    flight_pref = {}
    for attribute in attributes:
        if attribute in preferences:
            flight_pref[attribute] = preferences[attribute]
    return flight_pref
def get_hotel_pref(preferences):
    attributes = ['location', 'arrivalDate', 'leaveDate', 'numPeople', 'priceMin', 'priceMax', 'pets']
    hotel_pref = {}
    for attribute in attributes:
        if attribute in preferences:
            hotel_pref[attribute] = preferences[attribute]
    return hotel_pref
def get_itinerary_pref(preferences):
    attributes = ['busyLevel', 'isDisability', 'dietary', 'numPeople', 'numDays']
    itinerary_pref = {}
    for attribute in attributes:
        if attribute in preferences:
            itinerary_pref[attribute] = preferences[attribute]
    return itinerary_pref
def update_preferences(preferences):
    attributes = ['priceMax', 'busyLevel']
    itinerary_pref = {}
    for attribute in attributes:
        if attribute in preferences:
            itinerary_pref[attribute] = preferences[attribute]
    return itinerary_pref

# Test the functions directly
api_key = "61e88bc6c438b34f1dcc3391824a0466ca2bfcc4fe6c0e1821a7913d0a5704be"
if __name__ == "__main__":
    preferences = {
        "location": "New York",
        "arrivalDate": "2024-08-01",
        "leaveDate": "2024-08-05",
        "numPeople": 2,
        "priceMin": 100,
        "priceMax": 1000,
        'pets': False
    }

    hotel_pref = get_hotel_pref(preferences)
    hotel_data = get_hotels(hotel_pref)
    print("Hotel Data:", hotel_data)

    prefs = {'departureDate' : "2024-08-01", 'departureLocation' : "JFK", 'returnDate' : "2024-08-05", 
             'returnLocation' : "LAX", 'priceMax' : 1500, 'numPeople' : 3}
    flights = get_flights(prefs)
    print(flights)

