from django.db import models

# Create your models here.

class Item(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)



class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100, null=True)
    username = models.CharField(max_length=100, null=True)
    serviceProvider=models.BooleanField(default=False)

    def __str__(self):
        return self.name


class ServiceListing(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=200)
    contact = models.CharField(max_length=15)
    timing = models.CharField(max_length=100)
    charges = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.BooleanField(default=False ,null=True)
    booking = models.BooleanField(default=False ,null=True)
    customer=models.CharField(max_length=100,null=True)
    confirmation=models.BooleanField(default=False ,null=True)
    url=models.CharField(max_length=1000,null=True)
    def __str__(self):
        return self.name
    
class Payment(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="usd")
    stripe_payment_id = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user_email = models.EmailField()