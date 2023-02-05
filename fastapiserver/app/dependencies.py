from fastapi import HTTPException, Response
from fastapi.responses import JSONResponse


async def get_token_header(response: Response):
    token = response.headers["Authentication"]
    if not token:
        raise HTTPException(status_code=400, detail="X-Token header invalid")
    response.set_cookie(key="token", value=token)
    return JSONResponse(headers={"Authentication": token})


async def get_query_token(token: str):
    if token != "jessica":
        raise HTTPException(
            status_code=400, detail="No Jessica token provided")
