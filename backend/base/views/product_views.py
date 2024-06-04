from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Product
from base.serializers import ProductSerializer

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