from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
            user = request.user
            return Response({
                'name': user.name,
                'email': user.email,
                'username': user.username
            })



def create(self, request, *args, **kwargs):
    response = super().create(request, *args, **kwargs)
    user_email = request.data['email']
    print(f"Sending welcome email to {user_email}")  # Simulate email
    send_mail("Welcome!", "Thank you for registering.", "admin@example.com", [user_email])
    return response