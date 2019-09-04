# users/serializers.py
from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('url', 'id', 'email', 'username', )


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = models.Post
        fields = ('url', 'owner', 'title', 'content', 'created_at',)
