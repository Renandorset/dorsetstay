from rest_framework import serializers
from .models import UserProfile,ServiceListing,Payment

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'  # Serialize all fields

class ServiceListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceListing
        fields = '__all__'
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'amount', 'currency', 'stripe_payment_id', 'created_at','user_email']