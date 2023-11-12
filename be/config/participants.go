package config

import "losowanie/src/participant"

func GetParticipants() []*participant.Participant {
	return []*participant.Participant{
		{Name: "Wiesia"},
		{Name: "Leszek"},
		{Name: "Dawid"},
		{Name: "Ula"},
		{Name: "Sara"},
		{Name: "Maks"},
	}
}
