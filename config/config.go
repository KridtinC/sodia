package config

import (
	"fmt"
	"path/filepath"
	"runtime"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type config struct {
	DatabaseURL string `envconfig:"DATABASE_URL"`

	JWTSecret string `envconfig:"JWT_SECRET"`
}

var c config

func New() {
	var _, b, _, _ = runtime.Caller(0)
	dir := filepath.Dir(b)
	err := godotenv.Load(fmt.Sprintf("%s/../.env", dir))
	if err != nil {
		panic(err)
	}
	envconfig.MustProcess("", &c)
}

func Get() *config {
	return &c
}
