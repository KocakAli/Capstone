# Generated by Django 3.2.8 on 2021-12-30 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='time',
            field=models.CharField(default=1, max_length=64),
            preserve_default=False,
        ),
    ]
