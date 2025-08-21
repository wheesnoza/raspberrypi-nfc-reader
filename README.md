# NFC 勤怠リーダー（Raspberry Pi）

このプロジェクトは、Raspberry Pi 上で USB 接続された NFC リーダー（RC-S380）を用いて、
NFC タグの UID を読み取る常駐型勤怠管理アプリケーションです。

Python（nfcpy）で実装され、Docker コンテナとしてパッケージされており、
GitHub Actions → Docker Hub → Raspberry Pi 上での systemd 起動によって CI/CD 可能な構成となっています。

