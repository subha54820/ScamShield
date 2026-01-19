from django.urls import path
from .views import scam_analyzer

urlpatterns = [
    path("analyze/", scam_analyzer),
]
