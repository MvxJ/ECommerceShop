from django.urls import path
from base.views import user_views

urlpatterns = [
    path('login/', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', user_views.registerUser, name='user-register'),
    path('profile/', user_views.getUserProfile, name='user-profile'),
    path('profile/update/', user_views.updateUserProfile, name='user-profile-update'),
    path('', user_views.getUsers, name='users-list'),
    path('delete/<str:id>/', user_views.deleteUser, name='user-delete'),
    path('<str:id>/', user_views.getUserById, name='user'),
    path('update/<str:id>/', user_views.updateUser, name='user-update'),
]