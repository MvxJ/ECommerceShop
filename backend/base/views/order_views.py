from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from base.models import Order, ShippingAddress, Product, OrderItem
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.serializers import OrderSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postCode'],
            country=data['shippingAddress']['country'],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=i['quantity'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update stock

            product.countInStock -= item.quantity
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, id):
    user = request.user
    order = Order.objects.get(_id=id)

    try:
        if (order.user == user or user.is_staff):
            serializer = OrderSerializer(order, many=False)

            return Response(serializer.data)

        return Response({'detail': 'Access not allowed'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exists'}, status=status.HTTP_404_NOT_FOUND)