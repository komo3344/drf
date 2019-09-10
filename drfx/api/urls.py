# api/urls.py
from django.urls import include, path
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('users/', include('users.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('token-auth/', obtain_jwt_token),
]
