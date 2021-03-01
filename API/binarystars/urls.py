from django.conf.urls import url 
from binarystars import views 
 
urlpatterns = [ 
    url(r'^api/binarystars$', views.binarystars_list),
    url(r'^api/binarystars/(?P<pk>[0-9]+)$', views.binarystars_detail)
]