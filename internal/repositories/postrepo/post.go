package postrepo

import (
	"context"
	"time"

	"github.com/KridtinC/sodia/internal/core/domain"
	"github.com/KridtinC/sodia/internal/core/ports"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type repository struct {
	dbCol *mongo.Collection
}

func New(dbClient *mongo.Database) ports.PostRepository {
	return &repository{
		dbCol: dbClient.Collection("posts"),
	}
}

func (p *repository) GetByUserID(ctx context.Context, userID string) ([]domain.Post, error) {
	var results []domain.Post
	cursor, err := p.dbCol.Find(ctx, bson.D{{Key: "user_id", Value: bson.D{{Key: "$eq", Value: userID}}}})
	if err != nil {
		return nil, err
	}

	err = cursor.All(ctx, &results)
	if err != nil {
		return nil, err
	}

	return results, nil
}

func (p *repository) CreatePost(ctx context.Context, post domain.Post) error {

	post.ID = primitive.NewObjectID()
	post.CreatedDate = time.Now()
	_, err := p.dbCol.InsertOne(ctx, &post)
	if err != nil {
		return err
	}
	return nil
}
