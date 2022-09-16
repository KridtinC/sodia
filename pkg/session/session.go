package session

import "context"

const UserKey = "userId"

type contextKey string

var sessionContext contextKey = "session"

type Session struct {
	UserID string
}

func New(userID string) *Session {
	return &Session{
		UserID: userID,
	}
}

func WithSession(ctx context.Context, session *Session) context.Context {
	return context.WithValue(ctx, sessionContext, session)
}

func MustGet(ctx context.Context) *Session {
	if ss, ok := ctx.Value(sessionContext).(*Session); ok {
		return ss
	}
	panic("required session")
}
