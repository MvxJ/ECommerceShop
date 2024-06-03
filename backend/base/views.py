from rest_framework.response import Response
from rest_framework.decorators import api_view
from .products import products
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<str:id>/reviews/',
        '/api/products/top/',
        '/api/products/<str:id>/',
        '/api/products/delete/<str:id>/',
        '/api/products/<update>/<str:id>/',
    ]

    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, id):
    product = Product.objects.get(_id=id)
    serializer = ProductSerializer(product)

    return Response(serializer.data)