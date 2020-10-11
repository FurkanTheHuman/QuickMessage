from django.contrib import admin

# Register your models here.
from .models import MessageModel, Chat, Contact 

admin.site.register(MessageModel)
admin.site.register(Contact)
admin.site.register(Chat)