"""API views for accounts — registration, login, logout, me, password reset."""

from django.contrib.auth import login, logout
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    LoginSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
    RegisterSerializer,
    UserSerializer,
)


# ── CSRF cookie ───────────────────────────────────────────────────────────────

class CsrfTokenView(APIView):
    """
    GET /api/accounts/csrf/
    Returns the CSRF token in a cookie.
    The frontend must call this endpoint before any POST/PUT/DELETE request.
    """
    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        return Response({"csrfToken": get_token(request)})


# ── Registration ──────────────────────────────────────────────────────────────

class RegisterView(APIView):
    """
    POST /api/accounts/register/
    Create a new account and immediately log the user in.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.save()
            # Log the user in (creates session)
            login(request, user, backend="accounts.backends.EmailBackend")
            return Response(
                {
                    "message": "Compte créé avec succès.",
                    "user": UserSerializer(user).data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ── Login ─────────────────────────────────────────────────────────────────────

class LoginView(APIView):
    """
    POST /api/accounts/login/
    Authenticate and create a Django session.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)
            return Response(
                {
                    "message": "Connexion réussie.",
                    "user": UserSerializer(user).data,
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ── Logout ────────────────────────────────────────────────────────────────────

class LogoutView(APIView):
    """
    POST /api/accounts/logout/
    Destroy the Django session.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Déconnexion réussie."}, status=status.HTTP_200_OK)


# ── Current user ──────────────────────────────────────────────────────────────

class MeView(APIView):
    """
    GET /api/accounts/me/
    Return the current authenticated user.
    Returns 401 if not authenticated.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


# ── Password reset — request ──────────────────────────────────────────────────

class PasswordResetRequestView(APIView):
    """
    POST /api/accounts/password-reset/
    Send a password reset email if the email exists.
    Always returns 200 to avoid revealing whether an email is registered.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            use_https = request.is_secure()
            serializer.save(request=request, use_https=use_https)
        # Always return 200 regardless of whether the email exists
        return Response(
            {
                "message": (
                    "Si un compte associé à cette adresse existe, "
                    "un lien de réinitialisation vient d'être envoyé."
                )
            },
            status=status.HTTP_200_OK,
        )


# ── Password reset — confirm ──────────────────────────────────────────────────

class PasswordResetConfirmView(APIView):
    """
    POST /api/accounts/password-reset/confirm/
    Validate the token and set the new password.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Votre mot de passe a été réinitialisé avec succès."},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
