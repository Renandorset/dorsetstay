# DorsetBnb

DorsetBnb is a platform where users can browse and book accommodations listed by local hosts. The platform offers secure payment processing through Stripe and features an intelligent AI chatbot to assist users in finding the perfect place to stay.

## Features

- **Accommodation Booking System:** Users can view and book available stays posted by hosts.
- **Host Listings:** Hosts can register and manage their accommodation listings.
- **Stripe Payment Integration:** Secure payment processing for bookings via Stripe.
- **User Authentication:** Sign-up and login functionality for both guests and hosts.
- **AI Chatbot Assistance:** A smart, built-in chatbot helps users get personalized accommodation recommendations.

## Tech Stack

- **Backend:** Django (Python)
- **Frontend:** React, CSS
- **Payment Processing:** Stripe  
- **Database:** SQLite 
- **AI Chatbot:** Integrated via a custom recommendation system (Gemini API)

## Installation

### Backend (Django)

1. Ensure you have Python installed. Download it from [python.org](https://www.python.org/downloads/).
2. Clone the repository:
   ```bash
   git clone https://github.com/Renandorset/dorsetstay.git
   ```
3. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
4. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
5. Activate the virtual environment:
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
6. Install the required dependencies:
   ```bash
   pip install django 
   pip install djangorestframework 
   pip install django-cors-headers
   pip install stripe
   ```
7. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
   The backend should now be running at localhost.

### Frontend (React)

1. Ensure you have Node.js and npm installed on your system. You can download Node.js from [here](https://nodejs.org/).
2. Navigate to the frontend directory:
   ```bash
   cd FrontEnd
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the React development server:
   ```bash
   npm run dev
   ```
   The frontend should now be running at localhost.

## Usage

- Students can sign up, explore listings, get AI-based suggestions, and book accommodations.
- Hosts can register and post their properties.
- Payments are handled securely through Stripe.
- The integrated chatbot provides tailored suggestions based on preferences.

## Contact Us

For any questions or issues, feel free to reach out — we're happy to help!
