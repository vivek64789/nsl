from rest_framework import permissions

class CustomPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow safe methods (GET and retrieve) for all users, including anonymous users
        if request.method in permissions.SAFE_METHODS:
            return True

        # Restrict unsafe methods (create, delete, update) to superusers
        return request.user and request.user.is_superuser