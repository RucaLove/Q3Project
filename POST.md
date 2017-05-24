```py
from django.contrib import messages
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render

# our function passed to url
def add(request):
  # request type
    if request.method == 'POST':
      # RecipeForm = the name of model (AKA Users AKA yoga_users tables)
      # ASSIGNING Form = RecipeForm(request.post)
            form = RecipeForm(request.POST)
            if form.is_valid():
              # SAVES FORM VARIABLE TO DB
                form.save()
                    # SENDING BACK TO ORIGINAL STATE BEFORE FORM SITE
                    return HttpResponseRedirect(reverse('app_name:url'))
            else:
                messages.error(request, "Error")
      # SEND TO PLACE AND RUN FUNCTION RecipeForm()
    return render(request, 'myApp/add.html', {'form': RecipeForm()})
    ```
