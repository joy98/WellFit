from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/api/', include('auth_api.urls', namespace='auth_api')),
]
