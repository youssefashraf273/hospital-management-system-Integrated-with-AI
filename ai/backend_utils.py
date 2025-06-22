import requests

def call_laravel_api(endpoint, method="GET", data=None, params=None, headers=None):
    url = f"http://127.0.0.1:8000/api/{endpoint}"
    try:
        if method == "GET":
            response = requests.get(url, params=params, headers=headers)
        elif method == "POST":
            response = requests.post(url, json=data, headers=headers)
        else:
            return {"error": f"Unsupported method: {method}"}

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Error {response.status_code}: {response.text}"}
    except Exception as e:
        return {"error": str(e)}

