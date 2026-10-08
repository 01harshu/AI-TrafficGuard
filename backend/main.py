from fastapi import FastAPI

app = FastAPI(title="AI TrafficGuard API")


@app.get("/")
def root():
    return {"message": "AI TrafficGuard API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}