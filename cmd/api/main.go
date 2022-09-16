package main

import (
	"os"

	"github.com/KridtinC/sodia/config"
	"github.com/KridtinC/sodia/infrastructure/datastore"
	"github.com/KridtinC/sodia/infrastructure/router"
	"github.com/KridtinC/sodia/internal/core/services/postsvc"
	"github.com/KridtinC/sodia/internal/handlers/apihdl"
	"github.com/KridtinC/sodia/internal/repositories/postrepo"
	"github.com/gin-gonic/gin"
)

func main() {

	if os.Getenv("ENV") == "prod" {
		gin.SetMode(gin.ReleaseMode)
	}

	config.New()

	var (
		db             = datastore.New()
		postRepository = postrepo.New(db)
		postService    = postsvc.New(postRepository)
		apihttphdl     = apihdl.NewAPIHandler(postService)
		router         = router.New()
	)

	router.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(200, "ok")
	})
	router.GET("/posts", apihttphdl.GetPosts)
	router.POST("/posts", apihttphdl.CreatePosts)
	router.DELETE("/posts/:postId", apihttphdl.DeletePost)
	router.POST("/login", apihttphdl.Login)

	router.Run()
}
