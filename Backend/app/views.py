from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, filters, status
from rest_framework.exceptions import AuthenticationFailed, NotFound
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

import stripe

from .models import UserProfile, ServiceListing, Payment
from .serializers import UserProfileSerializer, ServiceListingSerializer, PaymentSerializer

# Configure Stripe API key
stripe.api_key = "sk_test_51R9TwU4Yh1Ydusmi2f3jwTMU0m8Zw0ZmabwDoviLDZYYaa32nye0ZQNl8TelQZSHISN7rsJRWyIa7fzB3YTWfYgh00GvZ2hvmt"

# Constants
SUPPORTED_CURRENCIES = ['usd', 'eur', 'huf']


@api_view(['GET'])
def get_users(request):
    """Get all user profiles"""
    users = UserProfile.objects.all()
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def update_availability(request, listing_id):
    """Update service listing availability to False"""
    try:
        listing = ServiceListing.objects.get(id=listing_id)
    except ServiceListing.DoesNotExist:
        raise NotFound("Listing not found.")

    listing.availability = False
    listing.save()

    return Response({
        "message": "Availability updated to False.",
        "listing_id": listing.id
    })


class UserProfileViewSet(viewsets.ModelViewSet):
    """ViewSet for user profiles with authentication"""
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def list(self, request, *args, **kwargs):
        """Override list method to handle authentication"""
        email = request.query_params.get('email')
        password = request.query_params.get('password')

        if not email or not password:
            raise AuthenticationFailed("Both email and password are required.")

        user = UserProfile.objects.filter(email=email, password=password).first()
        if not user:
            raise AuthenticationFailed("Invalid email or password.")

        serializer = self.get_serializer(user)
        return Response(serializer.data)


class ServiceListingViewSet(viewsets.ModelViewSet):
    """ViewSet for service listings with search functionality"""
    queryset = ServiceListing.objects.all()
    serializer_class = ServiceListingSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class PaymentListView(ListAPIView):
    """View for listing all payments"""
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class CreatePaymentIntentView(APIView):
    """View for creating Stripe payment intents"""
    
    def post(self, request):
        """Create a new payment intent and store payment record"""
        # Extract data from request
        amount = request.data.get('amount')
        currency = request.data.get('currency', '').lower()
        email = request.data.get('user_email')
        
        # Validate request data
        if not self._validate_payment_data(amount, currency, email):
            return Response({'error': 'Invalid payment data'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            # Create payment intent in Stripe
            payment_intent = self._create_stripe_payment_intent(int(amount), currency)
            
            # Save payment record to database
            payment_record = self._save_payment_record(amount, currency, payment_intent['id'], email)
            
            return Response({
                'clientSecret': payment_intent['client_secret'],
                'payment': payment_record
            }, status=status.HTTP_201_CREATED)
            
        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def _validate_payment_data(self, amount, currency, email):
        """Validate payment data"""
        if not email:
            return False
            
        if not amount or int(amount) <= 0:
            return False
            
        if not currency or currency not in SUPPORTED_CURRENCIES:
            return False
            
        return True
    
    def _create_stripe_payment_intent(self, amount, currency):
        """Create a payment intent in Stripe"""
        return stripe.PaymentIntent.create(
            amount=amount,  # Amount in cents
            currency=currency
        )
    
    def _save_payment_record(self, amount, currency, payment_id, email):
        """Save payment record to database"""
        payment_data = {
            'amount': amount,
            'currency': currency,
            'stripe_payment_id': payment_id,
            'user_email': email
        }
        
        serializer = PaymentSerializer(data=payment_data)
        if serializer.is_valid():
            serializer.save()
            return serializer.data
        
        raise ValueError(serializer.errors)