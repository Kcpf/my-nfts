from django.db import models

class Nfts(models.Model):
  user_address = models.TextField(blank=False, null=False)
  asset_contract_address = models.TextField(blank=False, null=False)
  token_id = models.TextField(blank=False, null=False)
  created_at = models.DateTimeField(auto_now_add=True)
