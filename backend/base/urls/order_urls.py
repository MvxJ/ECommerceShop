from django.urls import path
from base.views import order_views

urlpatterns = [
    path('add/', order_views.addOrderItems, name='add-order'),
    path('myorders/', order_views.getUserOrders, name='my-orders'),
    path('<str:id>/', order_views.getOrderById, name='get-order-by-id'),
    path('<str:id>/pay/', order_views.updateOrderToPaid, name='update-order-paid-status'),
]