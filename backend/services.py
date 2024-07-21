from serpapi import GoogleSearch
import requests

def get_coordinates(city_name):
    url = f"https://api.opencagedata.com/geocode/v1/json?q={city_name}&key=f2a20d42f16f47459e76a57d1c2e46b2"
    response = requests.get(url)
    data = response.json()
    
    if data and data['results']:
        coordinates = data['results'][0]['geometry']
        return coordinates['lat'], coordinates['lng']
    else:
        return None, None

def get_nearby_airports(latitude, longitude, distance):
    url = f"https://aviation-edge.com/v2/public/nearby?key=256de7-036846&lat={latitude}&lng={longitude}&distance={distance}"
    response = requests.get(url)
    data = response.json()

    airports = []
    if isinstance(data, list):
        for airport in data:
            if isinstance(airport, dict):
                airport_name = airport.get('nameAirport')
                airport_code = airport.get('codeIataAirport')
                if airport_name and airport_code and "International" in airport_name:
                    airports.append((airport_name, airport_code))
            else:
                print(f"Unexpected item type: {type(airport)}, value: {airport}")
    else:
        print(f"Unexpected data type: {type(data)}, value: {data}")

    return airports

def get_flights(flightPref):
    lat, lng = get_coordinates(flightPref["departureLocation"])
    departure_airports = get_nearby_airports(lat, lng, 30)
    
    lat, lng = get_coordinates(flightPref["returnLocation"])
    arrival_airports = get_nearby_airports(lat, lng, 30)

    all_flights = []

    for departure_airport in departure_airports:
        for arrival_airport in arrival_airports:
            params = {
                "engine": "google_flights",
                "departure_id": departure_airport[1],
                "arrival_id": arrival_airport[1],
                "outbound_date": flightPref["departureDate"],
                "return_date": flightPref["returnDate"],
                "currency": "USD",
                "hl": "en",
                "api_key": api_key,
                "adults": flightPref["numPeople"],
                "max_price": flightPref["priceMax"]
            }

            search = GoogleSearch(params)
            results = search.get_dict()

            try:
                flights = results["best_flights"]
            except KeyError:
                try:
                    flights = results["other_flights"]
                except KeyError:
                    flights = []

            all_flights.extend(flights)

    return all_flights

    
def get_hotels(hotel_pref):
    location = hotel_pref['returnLocation']
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
            'check_in_date': hotel_pref['departureDate'],
            'check_out_date': hotel_pref['returnDate'],
            'adults': hotel_pref['numPeople'],
            'min_price': hotel_pref.get('priceMin', 1),
            'max_price': hotel_pref.get('priceMax', float('inf')),
            'amenities': amenities,
            'api_key': api_key,
            'sort_by': key
        }
        search = GoogleSearch(hotel_params)
        results = search.get_dict()
        try:
            recommended[filter_name] = results['properties'][0]
        except KeyError:
            recommended[filter_name] = []
    return recommended

def get_flight_pref(preferences):
    attributes = ['departureDate', 'departureLocation', 'returnDate', 'returnLocation', 'priceMax', 'numPeople']
    flight_pref = dict()
    for attribute in attributes:
        if attribute in preferences:
            flight_pref[attribute] = preferences[attribute]
    return flight_pref

def get_hotel_pref(preferences):
    attributes = ['returnLocation', 'departureDate', 'returnDate', 'numPeople', 'priceMin', 'priceMax', 'pets']
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

def update_preferences(price, busy):
    itinerary_pref = {}
    itinerary_pref['priceMax'] = price
    itinerary_pref['busyLevel'] = busy
    return itinerary_pref

# Test the functions directly
api_key = "2da3e48e52a5a249c804e194869fb42113e54443efe808f15c42e1a90fdf323b"

# if __name__ == "__main__":
#     preferences = {
#         "location": "New York",
#         "arrivalDate": "2024-08-01",
#         "leaveDate": "2024-08-05",
#         "numPeople": 2,
#         "priceMin": 100,
#         "priceMax": 1000,
#         'pets': False
#     }

#     hotel_pref = get_hotel_pref(preferences)
#     hotel_data = get_hotels(hotel_pref)
#     print("Hotel Data:", hotel_data)

#     prefs = {'departureDate' : "2024-07-21", 'departureLocation' : "JFK", 'returnDate' : "2024-07-27", 
#              'returnLocation' : "LAX", 'priceMax' : 5000, 'numPeople' : 1}
#     flights = get_flights(prefs)
#     print(flights)

