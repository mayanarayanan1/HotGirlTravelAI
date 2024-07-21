from serpapi import GoogleSearch

def get_nearby_airports(city_name):
    params = {
        "engine": "google",
        "q": f"airports near {city_name}",
        "type": "airport",
        "api_key": api_key,
    }
    
    search = GoogleSearch(params)
    results = search.get_dict().get("local_results", [])
    
    airports = []
    for result in results:
        airport_name = result["title"]
        airport_code = result.get("place_id", result.get("cid"))
        airports.append((airport_name, airport_code))
    
    return airports

def get_flights(flightPref):
    departure_airports = get_nearby_airports(flightPref["departureLocation"])
    arrival_airports = get_nearby_airports(flightPref["returnLocation"])

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
api_key = "209df4a13be41538b7c69cf7cb9575446df6847e43a47e38ab9c1d2d7692fb13"

if __name__ == "__main__":
    # preferences = {
    #     "location": "New York",
    #     "arrivalDate": "2024-08-01",
    #     "leaveDate": "2024-08-05",
    #     "numPeople": 2,
    #     "priceMin": 100,
    #     "priceMax": 1000,
    #     'pets': False
    # }

    # hotel_pref = get_hotel_pref(preferences)
    # hotel_data = get_hotels(hotel_pref)
    # print("Hotel Data:", hotel_data)

    prefs = {'departureDate' : "2024-07-21", 'departureLocation' : "Seattle", 'returnDate' : "2024-07-27", 
             'returnLocation' : "New York", 'priceMax' : 5000, 'numPeople' : 1}
    flights = get_flights(prefs)
    print(flights)

