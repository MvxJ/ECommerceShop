from django.urls import path
from base.views import order_views

urlpatterns = [
    path('add/', order_views.addOrderItems, name='add-order'),
    path('<str:id>/', order_views.getOrderById, name='get-order-by-id'),
]