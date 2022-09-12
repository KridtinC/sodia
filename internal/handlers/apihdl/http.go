package apihdl

import (
	"encoding/json"
	"io"

	"github.com/KridtinC/sodia/internal/core/domain"
	"github.com/KridtinC/sodia/internal/core/ports"
	"github.com/gin-gonic/gin"
)

type apiHandler struct {
	postService ports.PostService
}

func NewAPIHandler(postService ports.PostService) *apiHandler {
	return &apiHandler{postService}
}

func (a *apiHandler) GetPosts(ctx *gin.Context) {

	userID := ctx.Query("userId")
	if len(userID) == 0 {
		ctx.JSON(400, "missing user id")
		return
	}

	posts, err := a.postService.GetPostsByUserID(ctx.Request.Context(), userID)
	if err != nil {
		ctx.Error(err)
		return
	}
	ctx.JSON(200, getPostsByUserIDResponse{toPostsDTO(posts)})
}

func (a *apiHandler) CreatePosts(ctx *gin.Context) {

	bodyReader, err := io.ReadAll(ctx.Request.Body)
	if err != nil {
		ctx.Error(err)
		return
	}
	var reqBody createPostRequest
	if err := json.Unmarshal(bodyReader, &reqBody); err != nil {
		ctx.Error(err)
		return
	}

	post, err := a.postService.CreatePost(ctx.Request.Context(), domain.Post{
		UserID:   reqBody.UserID,
		Content:  reqBody.Content,
		ImageURL: reqBody.ImageURL,
	})
	if err != nil {
		ctx.Error(err)
		return
	}
	ctx.JSON(200, createPostResponse{Post: toPostDTO(post)})
}
