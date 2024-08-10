FROM gcc:latest

WORKDIR /usr/src/app

COPY . .

RUN gcc -o program sandbox.c

CMD ["sh", "-c", "./program < stdin.txt"]
