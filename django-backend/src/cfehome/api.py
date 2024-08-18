from ninja import NinjaAPI, Schema

from ninja_extra import NinjaExtraAPI
from ninja_jwt.authentication import JWTAuth
from ninja_jwt.controller import NinjaJWTDefaultController

api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)


class UserSchema(Schema):
    username: str
    is_authenticated: bool
    email: str = None


@api.get("/hello")
def hello(request):
    print(request)
    return "hello world"


@api.get("/me", response=UserSchema, auth=JWTAuth())
def me(request):
    return request.user
