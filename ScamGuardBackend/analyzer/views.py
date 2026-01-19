from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import analyze_message

@api_view(['POST'])
def scam_analyzer(request):
    text = request.data.get("message", "")

    if not text:
        return Response({
            "error": "Message is required"
        }, status=400)

    result = analyze_message(text)

    tips = [
        "Never click unknown links",
        "Do not share OTP or bank details",
        "Verify sender identity",
        "Avoid urgent payment requests"
    ]

    return Response({
        "input_message": text,
        "risk_level": result["risk_level"],
        "score": result["score"],
        "reasons": result["reasons"],
        "awareness_tips": tips
    })
