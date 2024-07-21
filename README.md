# HotGirlTravelAI
Developers:
- Catherine Zhang
- Natasha Narayanan
- Lily Pham
- Jacqueline Cai


To run frontend:
 - cd frontend/src
 - npm install
 - npm run 

To run backend:
- cd backend
- uvicorn main:app --reload

- open new terminal window
- curl -X 'POST' \
  'http://127.0.0.1:8000/generate-itinerary' \
  -H 'accept: application/json'
