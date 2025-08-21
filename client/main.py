# main.py
import nfc
import logging
import time

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

def on_connect(tag):
    logging.info(f"Card Detected: UID={tag.identifier.hex().upper()}")
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
