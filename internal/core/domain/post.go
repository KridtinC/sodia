package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	UserID      string             `bson:"user_id,omitempty"`
	CreatedDate time.Time          `bson:"created_date,omitempty"`
	Content     string             `bson:"content,omitempty"`
	ImageURL    string             `bson:"img_url,omitempty"`
	NoOfLiked   int                `bson:"no_of_liked,omitempty"`
}
