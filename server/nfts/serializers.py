from rest_framework import serializers
from nfts import models

class NftsSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Nfts
    fields = '__all__'
