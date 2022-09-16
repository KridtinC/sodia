package postsvc

import (
	"context"

	"github.com/KridtinC/sodia/internal/core/domain"
	"github.com/KridtinC/sodia/internal/core/ports"
	"github.com/KridtinC/sodia/pkg/session"
)

type service struct {
	postRepository ports.PostRepository
}

func New(postRepository ports.PostRepository) ports.PostService {
	return &service{postRepository}
}

func (s *service) GetPostsByUserID(ctx context.Context) ([]domain.Post, error) {
	var (
		ss = session.MustGet(ctx)
	)
	posts, err := s.postRepository.GetByUserID(ctx, ss.UserID)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func (s *service) CreatePost(ctx context.Context, post domain.Post) (domain.Post, error) {
	var (
		ss = session.MustGet(ctx)
	)
	post.UserID = ss.UserID
	return s.postRepository.CreatePost(ctx, post)
}

func (s *service) DeletePost(ctx context.Context, postID string) error {
	return s.postRepository.DeletePost(ctx, postID)
}
