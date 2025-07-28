import nfc

def on_connect(tag):
    print(f"NFC Tag detected!")
    print(f"UID: {tag.identifier.hex().upper()}")
    return True

clf = nfc.ContactlessFrontend('usb')

try:
    print("Waiting for an NFC tag...")
    clf.connect(rdwr={'on-connect': on_connect})
finally:
    clf.close()
