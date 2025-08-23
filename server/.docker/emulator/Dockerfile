FROM node:20-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends openjdk-17-jre-headless curl ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g firebase-tools@12.9.1

WORKDIR /workspace

CMD ["firebase", "emulators:start", "--config", "/workspace/firebase.json", "--import=/workspace/.firestore-data", "--export-on-exit"]
