from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet,ServiceListingViewSet,update_availability,CreatePaymentIntentView,PaymentListView

router = DefaultRouter()
router.register(r'usersProfiles', UserProfileViewSet)  # This automatically creates CRUD routes
router.register(r'propertylistings', ServiceListingViewSet)
urlpatterns = [
    path('update-availability/<int:listing_id>/', update_availability, name='update-availability'),
    path('', include(router.urls)),  # Include the router-generated URLs
    path("",PaymentListView.as_view(),name="payment-list"),
    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),
]
