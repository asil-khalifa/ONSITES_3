FROM gcc:latest

WORKDIR /usr/src/app

COPY . .

RUN g++ -o program sandbox.cpp

CMD ["sh", "-c", "./program < stdin.txt"]
