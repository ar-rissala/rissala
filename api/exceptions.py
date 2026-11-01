from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    """Consistent structured JSON error format for React Native clients."""
    response = exception_handler(exc, context)
    if response is not None:
        detail = response.data.get("detail") if isinstance(response.data, dict) else None
        return Response(
            {
                "status": "error",
                "code": response.status_code,
                "message": str(detail) if detail else "Validation or request error.",
                "errors": response.data,
            },
            status=response.status_code,
        )
    return Response(
        {
            "status": "error",
            "code": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": "Internal server error.",
            "errors": {},
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )

