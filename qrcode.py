from PIL import Image
from pyzbar.pyzbar import decode
from urllib.parse import urlparse, parse_qs

# Open the image file
img = Image.open('seu2b15q.png')

# Decode the QR code
decoded_data = decode(img)

# Print the decoded data
for obj in decoded_data:
    print(obj.data.decode("utf-8"))

import pyotp

parsed_url = urlparse(decoded_data[0].data.decode("utf-8"))

# Extract the query part and parse it
query_params = parse_qs(parsed_url.query)

# Get the secret from the query parameters
secret = query_params.get('secret', [None])[0]

print("Secret:", secret)

# Create TOTP object
totp = pyotp.TOTP(secret)

# Generate the current 6-digit code
current_code = totp.now()

print("Your 6-digit code is:", current_code)
