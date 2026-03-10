from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from .models import Profile

# Create your views here.
def profile_detail(request, username):
    user = get_object_or_404(User, username=username)
    profile = get_object_or_404(Profile, user=user)

    context={
        "user":user,
        "profile":profile,
        "interests":profile.interests.all(),
        "fun_facts":profile.fun_facts.all()
    }

    return render(request, "profiles/profile_detail.html", context)