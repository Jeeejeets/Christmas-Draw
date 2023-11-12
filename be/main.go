package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"losowanie/config"
	"losowanie/src/participant"
	"math/rand"
	"net/http"
	"time"
)

type DrawRequest struct {
	Name string `json:"name"`
}

type DrawResponse struct {
	Name string `json:"name"`
}

func main() {
	participants := config.GetParticipants()

	r := gin.Default()
	r.GET("/participants", func(context *gin.Context) {
		context.JSON(http.StatusOK, participants)
	})
	r.OPTIONS("/draw", func(context *gin.Context) {
		context.Status(200)
	})
	r.POST("/draw", func(context *gin.Context) {
		var req DrawRequest
		err := context.Bind(&req)
		if err != nil {
			return
		}

		if !exists(req.Name, participants) {
			context.Status(http.StatusNotFound)
			return
		}

		if alreadyChose(req.Name, participants) {
			context.Status(http.StatusForbidden)
			return
		}

		drawn, err := drawRandom(participants, req.Name)
		if err != nil {
			context.Status(http.StatusBadRequest)
			return
		}

		markChose(req.Name, participants)
		context.JSON(http.StatusOK, DrawResponse{Name: drawn.Name})
	})
	err := r.Run(":8080")
	if err != nil {
		log.Fatalln("failed to run server:", err)
	}
}

func markChose(name string, participants []*participant.Participant) {
	for _, p := range participants {
		if p.Name == name {
			p.Chose = true
		}
	}
}

func exists(name string, participants []*participant.Participant) bool {
	for _, p := range participants {
		if p.Name == name {
			return true
		}
	}
	return false
}

func alreadyChose(name string, participants []*participant.Participant) bool {
	for _, p := range participants {
		if p.Name != name {
			continue
		}
		return p.Chose
	}
	return false
}

func drawRandom(participants []*participant.Participant, name string) (*participant.Participant, error) {
	available := make([]int, 0, len(participants))
	for i, p := range participants {
		if !p.Drawn && p.Name != name {
			available = append(available, i)
		}
	}
	if len(available) == 0 {
		return nil, fmt.Errorf("0 participants left")
	}

	s := rand.NewSource(time.Now().UnixNano())
	r := rand.New(s)
	rParticipantIndex := available[r.Intn(len(available))]

	participants[rParticipantIndex].Drawn = true
	return participants[rParticipantIndex], nil
}
