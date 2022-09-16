package middleware

import (
	"errors"
	"fmt"
	"strings"

	"github.com/KridtinC/sodia/config"
	"github.com/KridtinC/sodia/pkg/session"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

type httpResponse struct {
	Status       int         `json:"status"`
	Data         interface{} `json:"data,omitempty"`
	ErrorMessage string      `json:"error_message,omitempty"`
}

func SessionMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if strings.Contains(ctx.Request.URL.Path, "login") {
			ctx.Next()
			return
		}
		var token, err = ctx.Cookie("JWT_TOKEN")
		if err != nil {
			ctx.AbortWithStatusJSON(401, httpResponse{Status: -1, ErrorMessage: "authentication failed"})
			return
		}

		userID, err := validateToken(token)
		if err != nil {
			ctx.AbortWithStatusJSON(401, httpResponse{Status: -1, ErrorMessage: "authentication failed"})
			return
		}

		ssCtx := session.WithSession(
			ctx.Request.Context(),
			session.New(userID),
		)
		ctx.Request = ctx.Request.WithContext(ssCtx)

		ctx.Next()
	}
}

func validateToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(config.Get().JWTSecret), nil
	})
	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userID, ok := claims[session.UserKey].(string); ok {
			return userID, nil

		}
		return "", errors.New("missing user id in token")
	}

	return "", errors.New("authentication failed")
}
