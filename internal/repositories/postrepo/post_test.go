package postrepo

import (
	"context"
	"testing"

	"github.com/KridtinC/sodia/internal/core/domain"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func TestPostRepo(t *testing.T) {
	t.Run("get by user id", func(t *testing.T) {

		ctx := context.Background()
		dbc, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://root:password@localhost:27017/"))
		if err != nil {
			t.Fatal(err)
		}

		err = dbc.Ping(ctx, readpref.Primary())
		if err != nil {
			t.Fatal(err)
		}
		db := dbc.Database("sodia")

		repo := New(db)

		repo.CreatePost(ctx, domain.Post{UserID: "test", Content: "testfromgo"})

		resp, err := repo.GetByUserID(ctx, "test")
		assert.Equal(t, len(resp), 2)
	})
}
