from django.shortcuts import render, redirect
from .models import Product, Info
from .forms import FeedbackForm
from django.contrib import messages

def index(request):
    products = Product.objects.all()
    info = Info.objects.first()
    form = FeedbackForm()

    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Ваш отзыв был успешно отправлен!')
            return redirect('index')
        else:
            return messages.error(request, 'Произошла ошибка при отправке отзыва!')

    context = {
        'products': products,
        'info': info,
        'form': form,
    }
    return render(request, 'index.html', context)
