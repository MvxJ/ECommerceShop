from rest_framework.response import Response
from rest_framework.decorators import api_view
from .products import products

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
    return Response(products)

@api_view(['GET'])
def getProduct(request, id):
    product = None
    for i in products:
        if i['_id'] == id:
            product = i
            break

    return Response(product)