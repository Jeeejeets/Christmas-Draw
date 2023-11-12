FROM golang:1.21 as build

ADD . /app
WORKDIR /app
RUN go build -o api main.go

FROM ubuntu

COPY --from=build /app/api /api
ENTRYPOINT ["/api"]