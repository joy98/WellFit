from rest_framework import serializers
from auth_api.models import Task
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

# Create your views here.
from .models import Task


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/task-list/',
        'gg': 'nub',
        'num': 12
    }
    return Response(api_urls)


@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()
    print("taska", tasks)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)
