package ports

import (
	"context"

	"github.com/KridtinC/sodia/internal/core/domain"
)

type PostService interface {
	GetPostsByUserID(ctx context.Context) ([]domain.Post, error)
	CreatePost(ctx context.Context, post domain.Post) (domain.Post, error)
	DeletePost(ctx context.Context, postID string) error
}
