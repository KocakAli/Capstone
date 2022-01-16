from django.urls import path

from . import views

urlpatterns = [
    path('', views.trends, name='trends'),
    path('getu',views.get_u,name='getu'),
    path("dlogin", views.dlogin, name="dlogin"),
    path('dout',views.dout,name='dout'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("signup", views.signup, name="signup"),
    path("article", views.article, name='article'),
    path("delete/<int:id>", views.delete, name='delete'),
    path("get/<int:num>", views.get_articles, name='get'),
    path('def',views.def_a,name='def'),
    path('like',views.like_post,name='like_post'),
    path('view',views.view,name='view'),
    path('comment', views.comment, name='comment'),
    path('get_comment', views.get_comment, name='get_comment'),
    path('categories',views.categories, name='categories'),
    path('getStory/<int:id>',views.getStory, name='getStory')
]