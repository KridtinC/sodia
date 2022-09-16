run-web:
	cd web && npm run dev

run-api:
	go run cmd/api/main.go

run-db:
	docker-compose up mongo mongo-express -d