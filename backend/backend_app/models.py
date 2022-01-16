from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields.related import ForeignKey

# Create your models here.

class User(AbstractUser):
    pass
class Category(models.Model):
    name = models.TextField(max_length=32)

class Article(models.Model):
    title = models.CharField(max_length=128)
    article = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_articles')
    username= models.CharField(max_length=32)
    category =models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category_articles')
    catname = models.CharField(max_length=24)
    view = models.IntegerField(default=0)
    like = models.IntegerField(default=0)
    time = models.CharField(max_length=64)

class Comment(models.Model):
    comment = models.CharField(max_length=128)
    comment_a = models.ForeignKey(User, on_delete=models.CASCADE, related_name='a_comments')
    com_username = models.CharField(max_length=32)
    comment_p = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='article_comments')
    comment_l = models.IntegerField(default=0)

class Like(models.Model):
    l_users = ForeignKey(User, on_delete=models.CASCADE,related_name="users_l")
    l_post = ForeignKey(Article, on_delete=models.CASCADE,related_name="post_l")
    
class Trend(models.Model):
    trend_a = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='trends_a')


