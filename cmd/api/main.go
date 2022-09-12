package main

import (
	"context"
	"os"

	"github.com/KridtinC/sodia/config"
	"github.com/KridtinC/sodia/internal/core/services/postsvc"
	"github.com/KridtinC/sodia/internal/handlers/apihdl"
	"github.com/KridtinC/sodia/internal/repositories/postrepo"
	"github.com/KridtinC/sodia/middleware"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func main() {

	if os.Getenv("ENV") == "prod" {
		gin.SetMode(gin.ReleaseMode)
	}

	ctx := context.Background()

	config.New()
	dbc, err := mongo.Connect(ctx, options.Client().ApplyURI(config.Get().DatabaseURL))
	if err != nil {
		panic(err)
	}

	err = dbc.Ping(ctx, readpref.Primary())
	if err != nil {
		panic("cannot ping to db: " + err.Error())
	}
	db := dbc.Database("sodia")

	var (
		postRepository = postrepo.New(db)
		postService    = postsvc.New(postRepository)
		apihttphdl     = apihdl.NewAPIHandler(postService)
		router         = gin.Default()
	)

	router.Use(middleware.CORSMiddleware())
	router.Use(middleware.LoggingMiddleware())
	router.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(200, "ok")
	})
	router.GET("/posts", apihttphdl.GetPosts)
	router.POST("/posts", apihttphdl.CreatePosts)
	router.Run()
}
