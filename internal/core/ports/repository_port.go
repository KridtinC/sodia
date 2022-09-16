package ports

import (
	"context"

	"github.com/KridtinC/sodia/internal/core/domain"
)

type PostRepository interface {
	GetByUserID(ctx context.Context, userID string) ([]domain.Post, error)
	CreatePost(ctx context.Context, post domain.Post) (domain.Post, error)
	DeletePost(ctx context.Context, postID string) error
}
