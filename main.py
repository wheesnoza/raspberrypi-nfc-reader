import nfc

def main():
    try:
        clf = nfc.ContactlessFrontend('usb')
        print("NFCリーダーが見つかりました")
        clf.connect(rdwr={'on-connect': lambda tag: print("Tag!")})
    except Exception as e:
        print(f"NFCリーダーが見つかりません（スキップ）: {e}")
        while True:
            pass

if __name__ == "__main__":
    main()
