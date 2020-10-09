from django.contrib import admin

# Register your models here.
from .models import MessageModel

admin.site.register(MessageModel)