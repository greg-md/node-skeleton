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
pull:
	docker-compose pull
build:
	docker-compose build
cid:
	docker-compose -f docker-compose.yml -f docker-compose-ci.yml down -v
cib:
	docker-compose -f docker-compose.yml -f docker-compose-ci.yml build
ci:
	docker-compose -f docker-compose.yml -f docker-compose-ci.yml up --abort-on-container-exit --exit-code-from ci
