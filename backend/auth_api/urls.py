from django.urls import path
from . import views
# from django.views import PostList, PostDetail

app_name = 'auth_api'

urlpatterns = [
    # path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
    # path('', PostList.as_view(), name='listcreate'),
    path('', views.apiOverview, name='api-overview'),
    path('task-list/', views.taskList, name='task-list')
]
