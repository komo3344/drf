# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    name = models.CharField(blank=True, max_length=255)

    def __str__(self):
        return self.email


class Post(models.Model):
    owner = models.ForeignKey('CustomUser', related_name='post', on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank=True, null=True)
