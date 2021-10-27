from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from nfts.models import Nfts
from nfts.serializers import NftsSerializer


@api_view(['GET', 'POST'])
def nft_list(request):
  if request.method == 'GET':
    nfts = Nfts.objects.all()
    serializer = NftsSerializer(nfts, many=True)

    return Response(serializer.data)

  elif request.method == 'POST':
    serializer = NftsSerializer(data=request.data)
    
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def nft_list_user(request, user_address):
  nfts = Nfts.objects.filter(user_address=user_address)
  serializer = NftsSerializer(nfts, many=True)

  return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def nft_detail(request, id):
    try:
        nft = Nfts.objects.get(id=id)
    except Nfts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NftsSerializer(nft)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = NftsSerializer(nft, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        nft.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)