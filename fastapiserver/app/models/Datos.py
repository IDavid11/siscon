from pydantic import BaseModel


class Centro(BaseModel):
    centro: str
    concello: str
