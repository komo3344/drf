# users/urls.py
from django.urls import include, path
from .views import UserPostList
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.UserListView.as_view(), name='users'),
    path('<int:pk>/', views.UserDetailView.as_view(), name='customuser-detail'),
    path('posts/', views.PostListView.as_view(), name='posts'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('users/', UserPostList.as_view())
]


urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
]

