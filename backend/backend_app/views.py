from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, request
from django.urls import reverse
from .models import Comment, Article, Trend, User, Category, Like
from django.db import IntegrityError
from datetime import datetime
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import time
import math
from django.core.paginator import Paginator
from django.core import serializers
# Create your views here.


def index(request):
    cur_user = request.user
    id = request.COOKIES['sessionid']
    return render(request, "index.html",{
        'cur_user':cur_user
    })



def dlogin(request):
    if request.method=='GET':
        return render(request, "login.html")
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        # Attempt to sign user in
        
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            cur_user = request.user
            return render(request,'index.html',{
                'success':'login successful',
                'user':cur_user
            })

def get_u (request):
    cur_user = request.user
    
    id = request.COOKIES['sessionid']
    return render (request, 'get.html',{
        'cur_user':cur_user
    })

@csrf_exempt
def dout(request):
    logout(request)
    cur_user=request.user
    return render(request, 'index.html',{
        'cur_user':cur_user
    })
        
    
@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        # Attempt to sign user in
        
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            cur_user = request.user
            print(cur_user)
            return JsonResponse({
                'success':'login successful',
                'user':f'{cur_user}'
            })
        else:
            return JsonResponse({
                "message": "Invalid username and/or password."
            })
    else:
        return JsonResponse({
            'page':'login page'
        })

@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({
        'success':'logout successful'
    })

@csrf_exempt
def signup(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirmation = data.get('confirmation')

    # Ensure password matches confirmation
    
    if password != confirmation:
       return JsonResponse({
           'message':'Passwords dont match'
       })

    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return JsonResponse({
            "message": "Username already taken."
        })
    login(request, user)
    cur_user = request.user.username
    
    return JsonResponse({
        'success':'register compeleted',
        'user':cur_user
    })
    

@csrf_exempt
def article(request):
    
    if request.method == 'POST':
        data = json.loads(request.body)
        title= data.get('title')  
        article= data.get('story')
        category_name= data.get('cat')
        now = datetime.now()
        time = now.strftime("%d %B %Y , %H:%M:%S")
        if title==' ' or article=='' or category_name =='':
           return JsonResponse({
               'message':'All fields are required'
           })
        user = data.get('user')
        try:
            user =User.objects.get(username=user)  
        except:
            return JsonResponse({
            'message':'error'
        })
            
        article = Article(title=title, article= article,username=user,catname=category_name, category=Category.objects.get(name=category_name), author=user, time=time)
        article.save()
        
          
        return JsonResponse({
            'message':'success'
        })

def delete(request,id):
    article = Article.objects.get(id=id)
    article.delete()
    return HttpResponseRedirect(reverse("index"))
    


def def_a(request):
    cur_user = request.user
    articles = Article.objects.order_by('-time')
    articles_j = list(articles.values())
    
    data={
        'articles':articles_j,
    }

    return JsonResponse(data,safe=False)

@csrf_exempt
def get_articles(request,num):
    cur_user = request.user
    data = json.loads(request.body)
    order = data.get('order')
    if order == 'time':
        articles = Article.objects.order_by('-time')
        articles_j = list(articles.values())
    elif order == 'like':
        articles = Article.objects.order_by('-like')
        articles_j = list(articles.values())
    elif order == 'view':
        articles = Article.objects.order_by('-view')
        articles_j = list(articles.values())
    max_page= math.ceil(len(articles_j)/5)
    page_num = 5
    p = Paginator(articles_j,page_num)
    page = p.page(num)
    data={
        'articles':page.object_list,
        'maxPage':max_page,
        'user':f'{cur_user}'
    }

    return JsonResponse(data,safe=False)


@csrf_exempt
def getStory(request,id):
    story = Article.objects.filter(pk = id)
    story_j = list(story.values())
    
    data= {
        'story': story_j
    }
    return JsonResponse(data,safe=False)
    

def categories(request):
    categories = Category.objects.all()
    categories_j = list(categories.values())
    data={
        'categories':categories_j
    }
    return JsonResponse(data,safe=False)

def trends(request):
    storys = Article.objects.order_by('-view')[:6]
    storys_j = list(storys.values())
    data={
        'storys_j':storys_j
    }
    return JsonResponse(data,safe=False)

@csrf_exempt
def view(request):
    data = json.loads(request.body)
    id = data.get("story_id")
    try:
        story = Article.objects.get(pk = id)
        story.view +=1
        story.save()
    except:
        data = {
        '404':'404'
         }
        return JsonResponse(data,safe=False)

    data = {
        'ok':'ok'
    }
    return JsonResponse(data,safe=False)

@csrf_exempt
def like_post(request):

    data = json.loads(request.body)
    id = data.get("story_id")
    user = User.objects.get(username = data.get('user'))
    story = Article.objects.get(pk = id)
    
    check = Like.objects.filter(l_users =user, l_post = story)
    if len(check) !=0:
        story.like -=1
        check.delete()
    else:
        story.like +=1
        like = Like(l_users =user, l_post = story)
        like.save()

    story.save()
    data = {
        'ok':'ok'
    }
    return JsonResponse(data,safe=False)

@csrf_exempt
def comment(request):
    data = json.loads(request.body)
    id = data.get('id')  
    user = data.get('username')
    comment = data.get('comment')
    user1= User.objects.get(username=user)
    print(user1)
    story = Article.objects.get(pk=id)
    comment= Comment(comment=comment,comment_a=user1,com_username=user,comment_p =story)
    comment.save()
    data= {
        'ok':'ok'
    }
    return JsonResponse(data,safe=False)
    
@csrf_exempt
def get_comment(request):
    data = json.loads(request.body)
    id = data.get('id')
    comments = Comment.objects.filter(comment_p = id)
    comments_j = list(comments.values())
    data = {
        'comments':comments_j
    }
    return JsonResponse(data,safe=False)
   