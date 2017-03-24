.SILENT:

DOCKER_RUN=docker run -ti --rm --name "engineering-projekt-client-testing" --env NODE_ENV \
		   --volume "$(shell pwd):/home/node/project" fabianhauser/engineering-projekt-client-testing

BRANCH=`git rev-parse --abbrev-ref HEAD`
VERSION=$(shell ./ci/version.bash)
export NODE_ENV=dev


install:
	@echo "===================================================================="
	@echo "Installing basic dependencies"
	@echo "===================================================================="
	$(DOCKER_RUN) npm install

docs: install
	@echo "===================================================================="
	@echo "Building documentation"
	@echo "===================================================================="
	$(DOCKER_RUN) npm run docs

tests: install
	@echo "===================================================================="
	@echo "Executeing tests"
	@echo "===================================================================="
	# maybe need workaroud, see: https://github.com/karma-runner/karma-chrome-launcher/issues/34
	#pkill chrome # kill chrome everytime
	NODE_ENV=test $(DOCKER_RUN) npm run alltests

tests-sonarqube: install
	@echo "===================================================================="
	@echo "TODO: Tests for Sonarqube"
	@echo "===================================================================="

	@echo "TODO: Run all tests for sonarqube"
	# TODO: Work with resulting coverage file

build: install
	@echo "Build the Application"
	NODE_ENV=prod $(DOCKER_RUN) npm run build
	docker build -f ci/production/Dockerfile \
		-t "fabianhauser/engineering-projekt-client" ./

build-container-testing:
	@echo "===================================================================="
	@echo "Build testing docker container"
	@echo "===================================================================="
	docker build -f ci/testing/Dockerfile \
		-t "fabianhauser/engineering-projekt-client-testing" ./

deploy-live:
	@echo "===================================================================="
	@echo "TODO: Deploy to the live system"
	@echo "===================================================================="
	docker tag fabianhauser/engineering-projekt-client fabianhauser/engineering-projekt-client:$(VERSION)
	docker tag fabianhauser/engineering-projekt-client fabianhauser/engineering-projekt-client
	docker login -u="$(DOCKER_USERNAME)" -p="$(DOCKER_PASSWORD)"
	docker push fabianhauser/engineering-projekt-client
	# Domain: adit.qo.is

deploy-develop:
	@echo "===================================================================="
	@echo "TODO: Deploy to the develop system"
	@echo "===================================================================="
	# Domain develop.adit.qo.is
