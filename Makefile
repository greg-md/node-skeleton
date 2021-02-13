up:
	docker-compose up
upp:
	docker-compose up --build
api:
	docker-compose exec api bash
stop:
	docker-compose stop
down:
	docker-compose down -v
rmi:
	docker-compose down --rmi=local -v
pull:
	docker-compose pull
build:
	docker-compose build
ci:
	docker-compose up --build --abort-on-container-exit --exit-code-from api
