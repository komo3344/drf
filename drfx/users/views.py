# users/views.py
from rest_framework import generics
from rest_framework import permissions
from . import models
from . import serializers
from .permissions import IsOwnerOrReadOnly


class UserListView(generics.ListCreateAPIView):
    permission_classes = ()
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer


class UserDetailView(generics.RetrieveAPIView):
    permission_classes = ()
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer


class PostListView(generics.ListCreateAPIView):
    permission_classes = ()
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer

    def perform_create(self, serializer):
        serializers.save(owner=self.request.user)


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]

    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer

