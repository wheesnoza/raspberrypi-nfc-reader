import nfc
print("起動中...")
with nfc.ContactlessFrontend('usb') as clf:
    clf.connect(rdwr={'on-connect': lambda tag: print("Tag:", tag)})
