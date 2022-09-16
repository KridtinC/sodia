package middleware

import (
	"log"

	"github.com/gin-gonic/gin"
)

func LoggingMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		var statusCode = c.Writer.Status()
		if len(c.Errors) > 0 {
			for _, err := range c.Errors {
				log.Printf("error with status code %d err %v", statusCode, err.Error())
			}
			c.JSON(500, c.Errors)
		}
	}
}
