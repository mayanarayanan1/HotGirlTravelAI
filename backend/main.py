import fastapi
import requests
from serpapi import GoogleSearch

flightPrefs = dict()
hotelPrefs = dict()
itineraryPrefs = dict()

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
    global flightPrefs
    attributes = ['departureDate', 'departureLocation', 'returnDate', 'returnLocation', 'priceMax', 'numPeople']
    flight_pref = {}
    for attribute in attributes:
        if attribute in preferences:
            flight_pref[attribute] = preferences[attribute]
    flightPrefs = flight_pref
    return flight_pref
def get_hotel_pref(preferences):
    global hotelPrefs
    attributes = ['location', 'arrivalDate', 'leaveDate', 'numPeople', 'priceMin', 'priceMax', 'pets']
    hotel_pref = {}
    for attribute in attributes:
        if attribute in preferences:
            hotel_pref[attribute] = preferences[attribute]
    hotelPrefs = hotel_pref
    return hotel_pref
def get_itinerary_pref(preferences):
    global itineraryPrefs
    attributes = ['busyLevel', 'isDisability', 'dietary', 'numPeople', 'numDays']
    itinerary_pref = {}
    for attribute in attributes:
        if attribute in preferences:
            itinerary_pref[attribute] = preferences[attribute]
    itineraryPrefs = itinerary_pref
    return itinerary_pref

def update_preferences(price, busyLevel):
    if price > 0:
        flightPrefs['max_price'] = price
        hotelPrefs['max_price'] = price
    if busyLevel > 0:
        itineraryPrefs['busyLevel'] = busyLevel

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

if __name__ == "__main__":
    prefs = {'departureDate' : "2024-08-01", 'departureLocation' : "JFK", 'returnDate' : "2024-08-05", 
             'returnLocation' : "LAX", 'priceMax' : 1500, 'numPeople' : 3}
    flight_prefs = get_flight_pref(prefs)
    flights = get_flights(flight_prefs)
    print(flights)
    print(flightPrefs)

