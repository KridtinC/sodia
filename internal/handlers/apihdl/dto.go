package apihdl

import (
	"time"

	"github.com/KridtinC/sodia/internal/core/domain"
)

type createPostRequest struct {
	UserID   string `json:"user_id,omitempty"`
	Content  string `json:"content,omitempty"`
	ImageURL string `json:"img_url,omitempty"`
}

type getPostsByUserIDResponse struct {
	Posts []post `json:"posts,omitempty"`
}

type createPostResponse struct {
	Post post `json:"post,omitempty"`
}

type post struct {
	ID          string `json:"id,omitempty"`
	UserID      string `json:"user_id,omitempty"`
	CreatedDate string `json:"created_date,omitempty"`
	Content     string `json:"content,omitempty"`
	ImageURL    string `json:"img_url,omitempty"`
	NoOfLiked   int    `json:"no_of_liked,omitempty"`
}

func toPostsDTO(posts []domain.Post) (p []post) {
	for _, dp := range posts {
		p = append(p, toPostDTO(dp))
	}
	return
}

func toPostDTO(dp domain.Post) post {
	return post{
		ID:          dp.ID.Hex(),
		UserID:      dp.UserID,
		CreatedDate: dp.CreatedDate.Format(time.Stamp),
		Content:     dp.Content,
		ImageURL:    dp.ImageURL,
		NoOfLiked:   dp.NoOfLiked,
	}
}
