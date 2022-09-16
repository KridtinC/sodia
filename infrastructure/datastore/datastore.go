package datastore

import (
	"context"
	"time"

	"github.com/KridtinC/sodia/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func New() *mongo.Database {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	dbc, err := mongo.Connect(ctx, options.Client().ApplyURI(config.Get().DatabaseURL))
	if err != nil {
		panic(err)
	}

	err = dbc.Ping(ctx, readpref.Primary())
	if err != nil {
		panic("cannot ping to db: " + err.Error())
	}
	return dbc.Database("sodia")
}
