from typing import List
from pydantic import BaseModel


class LAN(BaseModel):
    lans: List[str]


class IP(BaseModel):
    ip: str
