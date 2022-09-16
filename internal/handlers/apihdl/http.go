package apihdl

import (
	"encoding/json"
	"errors"
	"io"

	"github.com/KridtinC/sodia/config"
	"github.com/KridtinC/sodia/internal/core/domain"
	"github.com/KridtinC/sodia/internal/core/ports"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

type apiHandler struct {
	postService ports.PostService
}

func NewAPIHandler(postService ports.PostService) *apiHandler {
	return &apiHandler{postService}
}

func (a *apiHandler) GetPosts(ctx *gin.Context) {
	posts, err := a.postService.GetPostsByUserID(ctx.Request.Context())
	if err != nil {
		ctx.Error(err)
		return
	}
	resp := httpResponse{
		Status: 0,
		Data:   getPostsByUserIDResponse{toPostsDTO(posts)},
	}
	ctx.JSON(200, resp)
}

func (a *apiHandler) CreatePosts(ctx *gin.Context) {

	bodyReader, err := io.ReadAll(ctx.Request.Body)
	if err != nil {
		ctx.AbortWithStatusJSON(500, NewErrorResponse(-9999, err))
		return
	}
	var reqBody createPostRequest
	if err := json.Unmarshal(bodyReader, &reqBody); err != nil {
		ctx.AbortWithStatusJSON(500, NewErrorResponse(-9999, err))
		return
	}

	post, err := a.postService.CreatePost(ctx.Request.Context(), domain.Post{
		Content:  reqBody.Content,
		ImageURL: reqBody.ImageURL,
	})
	if err != nil {
		ctx.AbortWithStatusJSON(500, NewErrorResponse(-9999, err))
		return
	}
	resp := httpResponse{
		Status: 0,
		Data:   createPostResponse{toPostDTO(post)},
	}
	ctx.JSON(200, resp)
}

func (a *apiHandler) DeletePost(ctx *gin.Context) {

	postID := ctx.Param("postId")
	if postID == "" {
		ctx.AbortWithStatusJSON(400, NewErrorResponse(-9999, errors.New("missing post id")))
		return
	}

	if err := a.postService.DeletePost(ctx.Request.Context(), postID); err != nil {
		ctx.AbortWithStatusJSON(500, NewErrorResponse(-9999, err))
		return
	}
	resp := httpResponse{Status: 0}
	ctx.JSON(200, resp)
}

func (a *apiHandler) Login(ctx *gin.Context) {
	// TODO: TEMP FUNC ONLY

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": ctx.Query("userId"),
	})

	tokenString, err := token.SignedString([]byte(config.Get().JWTSecret))
	if err != nil {
		ctx.AbortWithStatusJSON(500, NewErrorResponse(-9999, err))
		return
	}

	ctx.JSON(200, tokenString)
}
