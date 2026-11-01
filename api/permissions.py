from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """Only allow owners of a personal resource (library, note, bookmark) to access it."""

    def has_object_permission(self, request, view, obj):
        return getattr(obj, "user_id", None) == request.user.id

