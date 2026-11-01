from django import forms


class NewsletterSubscribeForm(forms.Form):
    email = forms.EmailField(max_length=254, required=True)
    first_name = forms.CharField(max_length=100, required=False)
    language = forms.CharField(max_length=5, required=False, initial="fr")
    consent = forms.BooleanField(required=False, initial=True)
