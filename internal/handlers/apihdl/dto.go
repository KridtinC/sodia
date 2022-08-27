package apihdl

import (
	"time"

	"github.com/KridtinC/sodia/internal/core/domain"
)

type getPostsByUserIDResponse struct {
	Posts []post `json:"posts,omitempty"`
}

type post struct {
	UserID      string    `json:"user_id,omitempty"`
	CreatedDate time.Time `json:"created_date,omitempty"`
	Content     string    `json:"content,omitempty"`
	ImageURL    string    `json:"img_url,omitempty"`
	NoOfLiked   int       `json:"no_of_liked,omitempty"`
}

func toPostsDTO(posts []domain.Post) (p []post) {
	for _, dp := range posts {
		p = append(p, post{
			UserID:      dp.UserID,
			CreatedDate: dp.CreatedDate,
			Content:     dp.Content,
			ImageURL:    dp.ImageURL,
			NoOfLiked:   dp.NoOfLiked,
		})
	}
	return
}
