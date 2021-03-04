help: ## Help dialog.
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
	printf "\nUsage: " ; \
	printf "\033[36m" ; \
	printf "make <command>" ; \
	printf "\033[0m" ; \
	printf "\n\n" ; \
	printf "%-20s %s\n" "command" "help" ; \
	printf "%-20s %s\n" "------" "----" ; \
	for help_line in $${help_lines[@]}; do \
		IFS=$$':' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf '\033[36m'; \
		printf "%-20s %s" $$help_command ; \
		printf '\033[0m'; \
		printf "%s\n" $$help_info; \
	done

pull: ## Pull docker images.
	docker-compose pull
build: ## Build docker images based on docker-compose.yml file.
	docker-compose build
up: ## Start docker containers.
	docker-compose up
upd: ## Start docker containers in daemon mode.
	docker-compose up -d
upp: ## Rebuild and start docker containers.
	docker-compose up --build
main: ## Enter the 'main' docker container.
	docker-compose exec main bash
stop: ## Stop docker containers.
	docker-compose stop
down: ## Destroy docker containers and volumes.
	docker-compose down -v
clean: ## Destroy docker containers, local images and volumes.
	docker-compose down --rmi=local -v
ci: ## Run tests in CI mode.
	NODE_ENV=ci docker-compose up --abort-on-container-exit --exit-code-from ci
