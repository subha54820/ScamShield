
# Register your models here.
from django.contrib import admin
from .models import ScamCheck

@admin.register(ScamCheck)
class ScamCheckAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'risk_level',
        'score',
        'created_at'
    )

    list_filter = (
        'risk_level',
        'created_at'
    )

    search_fields = (
        'message',
    )

    ordering = (
        '-created_at',
    )
