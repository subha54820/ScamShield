from django.db import models

# Create your models here.
from django.db import models
class ScamCheck(models.Model):
    message = models.TextField()
    risk_level = models.CharField(max_length=20)
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.risk_level} - {self.created_at.date()}"
