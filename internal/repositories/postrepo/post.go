package postrepo

import (
	"context"
	"time"

	"github.com/KridtinC/sodia/internal/core/domain"
	"github.com/KridtinC/sodia/internal/core/ports"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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

	var (
		filters = bson.D{{Key: "user_id", Value: bson.D{{Key: "$eq", Value: userID}}}}
		opts    = options.Find().SetSort(bson.D{{Key: "created_date", Value: -1}})
	)
	cursor, err := p.dbCol.Find(ctx, filters, opts)
	if err != nil {
		return nil, err
	}

	err = cursor.All(ctx, &results)
	if err != nil {
		return nil, err
	}

	return results, nil
}

func (p *repository) CreatePost(ctx context.Context, post domain.Post) (domain.Post, error) {

	post.ID = primitive.NewObjectID()
	post.CreatedDate = time.Now()
	_, err := p.dbCol.InsertOne(ctx, &post)
	if err != nil {
		return domain.Post{}, err
	}
	return post, nil
}

func (p *repository) DeletePost(ctx context.Context, postID string) error {
	var postIDObj, err = primitive.ObjectIDFromHex(postID)
	if err != nil {
		return err
	}
	if _, err := p.dbCol.DeleteOne(ctx, bson.M{"_id": postIDObj}); err != nil {
		return err
	}
	return nil
}
