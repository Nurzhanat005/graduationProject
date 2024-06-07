from django.db import models

class Product(models.Model):
    image = models.ImageField(upload_to='product_image', max_length=200)
    title = models.CharField(max_length=300)
    price = models.CharField(max_length=300)

    def __str__(self):
        return self.title


class Info(models.Model):
    tell = models.CharField(max_length=100)
    address = models.CharField(max_length=200)


class Feedback(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    message = models.TextField()

    def __str__(self):
        return self.name
