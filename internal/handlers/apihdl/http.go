package apihdl

import (
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

	if userID := ctx.Query("userId"); len(userID) != 0 {
		posts, err := a.postService.GetPostsByUserID(ctx.Request.Context(), userID)
		if err != nil {
			ctx.JSON(500, err.Error())
		}
		ctx.JSON(200, getPostsByUserIDResponse{toPostsDTO(posts)})
		return
	}

	ctx.JSON(400, "missing user id")
}
