from django.contrib import admin
from .models import Profile, Interest, FunFact
from django.utils.html import format_html

# Register your models here.
admin.site.register(Interest)
admin.site.register(FunFact)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "age", "location", "profile_pic_tag")
    def profile_pic_tag(self, obj):
        if obj.profile_picture:
            return format_html('<img src="{}" width="50" />', obj.profile_picture.url)
        return "-"
    profile_pic_tag.short_description = "Profile Picture"

    search_fields = ("user__username", "bio", "location")
    filter_horizontal = ("interests", "fun_facts")