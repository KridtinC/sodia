package apihdl

import (
	"time"

	"github.com/KridtinC/sodia/internal/core/domain"
)

type httpResponse struct {
	Status       int         `json:"status"`
	Data         interface{} `json:"data,omitempty"`
	ErrorMessage string      `json:"error_message,omitempty"`
}

type createPostRequest struct {
	Content  string `json:"content,omitempty"`
	ImageURL string `json:"img_url,omitempty"`
}

type getPostsByUserIDResponse struct {
	Posts []post `json:"posts"`
}

type createPostResponse struct {
	Post post `json:"post"`
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
	p = make([]post, len(posts))
	for i, dp := range posts {
		p[i] = toPostDTO(dp)
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

func NewErrorResponse(status int, err error) httpResponse {
	return httpResponse{
		Status:       status,
		ErrorMessage: err.Error(),
	}
}
