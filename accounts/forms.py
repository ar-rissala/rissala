import re

from django import forms
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

INPUT_CSS = "w-full px-4 py-2.5 rounded-xl border border-[#d5e6e0] bg-white text-[#102a24] text-sm focus:ring-2 focus:ring-[#006b54] focus:border-[#006b54]"


class UserLoginForm(forms.Form):
    username = forms.CharField(
        label="Email ou Pseudo",
        widget=forms.TextInput(
            attrs={
                "placeholder": "nom@exemple.com ou pseudo",
                "autocomplete": "username",
                "class": INPUT_CSS,
            }
        ),
    )
    password = forms.CharField(
        label="Mot de passe",
        widget=forms.PasswordInput(
            attrs={
                "placeholder": "••••••••",
                "autocomplete": "current-password",
                "class": INPUT_CSS,
            }
        ),
    )

    def __init__(self, request=None, *args, **kwargs):
        self.request = request
        self.user_cache = None
        super().__init__(*args, **kwargs)

    def clean(self):
        cleaned = super().clean()
        username = (cleaned.get("username") or "").strip()
        password = cleaned.get("password")
        if username and password:
            self.user_cache = authenticate(self.request, username=username, password=password)
            if self.user_cache is None:
                raise forms.ValidationError("Identifiants incorrects ou compte inexistant.")
            if not self.user_cache.is_active:
                raise forms.ValidationError("Ce compte est désactivé.")
        return cleaned

    def get_user(self):
        return self.user_cache


class UserRegistrationForm(forms.ModelForm):
    password1 = forms.CharField(
        label="Mot de passe",
        widget=forms.PasswordInput(attrs={"placeholder": "••••••••", "class": INPUT_CSS}),
    )
    password2 = forms.CharField(
        label="Confirmation du mot de passe",
        widget=forms.PasswordInput(attrs={"placeholder": "••••••••", "class": INPUT_CSS}),
    )

    class Meta:
        model = User
        fields = ("email", "pseudo", "first_name", "last_name", "preferred_language")
        widgets = {
            "email": forms.EmailInput(attrs={"placeholder": "nom@exemple.com", "class": INPUT_CSS}),
            "pseudo": forms.TextInput(attrs={"placeholder": "MonPseudo", "class": INPUT_CSS}),
            "first_name": forms.TextInput(attrs={"class": INPUT_CSS}),
            "last_name": forms.TextInput(attrs={"class": INPUT_CSS}),
            "preferred_language": forms.Select(attrs={"class": INPUT_CSS}),
        }

    def clean_pseudo(self):
        pseudo = self.cleaned_data["pseudo"].strip()
        if not re.match(r"^[A-Za-z0-9._-]+$", pseudo):
            raise forms.ValidationError("Lettres, chiffres, points, tirets et underscores uniquement.")
        if User.objects.filter(pseudo__iexact=pseudo).exists():
            raise forms.ValidationError("Ce pseudonyme est déjà utilisé.")
        return pseudo

    def clean_email(self):
        email = self.cleaned_data["email"].strip().lower()
        if User.objects.filter(email__iexact=email).exists():
            raise forms.ValidationError("Un compte existe déjà avec cette adresse email.")
        return email

    def clean(self):
        cleaned = super().clean()
        p1 = cleaned.get("password1")
        p2 = cleaned.get("password2")
        if p1 and p2 and p1 != p2:
            self.add_error("password2", "Les mots de passe ne correspondent pas.")
        if p1:
            try:
                validate_password(p1)
            except forms.ValidationError as exc:
                self.add_error("password1", exc)
        return cleaned

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ("pseudo", "first_name", "last_name", "preferred_language", "bio", "newsletter_opt_in")
        widgets = {
            "pseudo": forms.TextInput(attrs={"class": INPUT_CSS}),
            "first_name": forms.TextInput(attrs={"class": INPUT_CSS}),
            "last_name": forms.TextInput(attrs={"class": INPUT_CSS}),
            "preferred_language": forms.Select(attrs={"class": INPUT_CSS}),
            "bio": forms.Textarea(attrs={"rows": 3, "class": INPUT_CSS}),
        }


class PasswordResetRequestForm(forms.Form):
    email = forms.EmailField(
        label="Adresse email",
        widget=forms.EmailInput(attrs={"placeholder": "nom@exemple.com", "class": INPUT_CSS}),
    )


class PasswordResetConfirmCustomForm(forms.Form):
    new_password1 = forms.CharField(
        label="Nouveau mot de passe",
        widget=forms.PasswordInput(attrs={"class": INPUT_CSS}),
    )
    new_password2 = forms.CharField(
        label="Confirmer le mot de passe",
        widget=forms.PasswordInput(attrs={"class": INPUT_CSS}),
    )

    def clean(self):
        cleaned = super().clean()
        p1 = cleaned.get("new_password1")
        p2 = cleaned.get("new_password2")
        if p1 and p2 and p1 != p2:
            self.add_error("new_password2", "Les mots de passe ne correspondent pas.")
        if p1:
            validate_password(p1)
        return cleaned
