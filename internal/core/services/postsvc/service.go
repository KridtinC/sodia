package postsvc

import (
	"context"

	"github.com/KridtinC/sodia/internal/core/domain"
	"github.com/KridtinC/sodia/internal/core/ports"
)

type service struct {
	postRepository ports.PostRepository
}

func New(postRepository ports.PostRepository) ports.PostService {
	return &service{postRepository}
}

func (s *service) GetPostsByUserID(ctx context.Context, userID string) ([]domain.Post, error) {
	posts, err := s.postRepository.GetByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	return posts, nil
}
