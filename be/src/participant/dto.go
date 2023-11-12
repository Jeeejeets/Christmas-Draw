package participant

type Participant struct {
	Name  string `json:"name"`
	Chose bool   `json:"chose"`
	Drawn bool   `json:"-"`
}
