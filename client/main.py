import nfc
import logging
import time
import os
import requests
from datetime import datetime

POST_URL = os.getenv("POST_URL")

if not POST_URL:
    raise ValueError("POST_URL required.")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

def on_connect(tag):
    device_uid = tag.identifier.hex().upper()
    read_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    logging.info(f"Card Detected: UID={ device_uid }")

    try:
        logging.info(f"POST {POST_URL}")
        response = requests.post(POST_URL, json={ "device_uid": device_uid, "read_at": read_at }, timeout=5)
        logging.info(f"POST {POST_URL} status={response.status_code}")
    except Exception as e:
        logging.error(f"HTTP POST Error: {e}")

    return True

def main():
    while True:
        try:
            with nfc.ContactlessFrontend('usb') as clf:
                logging.info("Waiting")
                while True:
                    clf.connect(rdwr={'on-connect': on_connect})
        except Exception as e:
            logging.error(f"NFC Error: {e}")
            time.sleep(5)

if __name__ == "__main__":
    main()
