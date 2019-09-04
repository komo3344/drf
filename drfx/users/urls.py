# users/urls.py
from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.UserListView.as_view(), name='users'),
    path('<int:pk>/', views.UserDetailView.as_view(), name='customuser-detail'),
    path('posts/', views.PostListView.as_view(), name='posts'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
]

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]

