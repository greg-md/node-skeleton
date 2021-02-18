pull:
	docker-compose pull
build:
	docker-compose build
up:
	docker-compose up
upp:
	docker-compose up --build
api:
	docker-compose exec api bash
micro:
	docker-compose exec micro bash
stop:
	docker-compose stop
down:
	docker-compose down -v
rmi:
	docker-compose down --rmi=local -v
ci:
	NODE_ENV=ci docker-compose up --abort-on-container-exit --exit-code-from ci
