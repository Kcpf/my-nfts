# Generated by Django 3.2.7 on 2021-10-26 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nfts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nfts',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]