# External Variables: SSH_KEY, SONAR_KEY, DOCKER_USERNAME, DOCKER_PASSWORD
.SILENT:

DOCKER_RUN=docker run -ti --rm --name "engineering-projekt-client-testing" --env NODE_ENV \
		   --volume "$(shell pwd)/.npm:/home/node/.cache/yarn" --volume "$(shell pwd):/home/node/project" \
		   fabianhauser/engineering-projekt-client-testing

VERSION=$(shell ./ci/version.bash)
export NODE_ENV=dev

ifdef TRAVIS_BRANCH
 BRANCH=$(TRAVIS_BRANCH)
else
 BRANCH=`git rev-parse --abbrev-ref HEAD`
endif


install:
	@echo "===================================================================="
	@echo "Installing basic dependencies"
	@echo "===================================================================="
	$(DOCKER_RUN) yarn --quiet install

docs: install
	@echo "===================================================================="
	@echo "Building documentation"
	@echo "===================================================================="
	$(DOCKER_RUN) npm run docs

tests: install
	@echo "===================================================================="
	@echo "Executing tests"
	@echo "===================================================================="
	NODE_ENV=test $(DOCKER_RUN) npm test

upload-coverage:
	@echo "===================================================================="
	@echo "Upload Coverage results to Sonarqube"
	@echo "===================================================================="
	$(DOCKER_RUN) /opt/sonar-scanner/bin/sonar-scanner -X -Dsonar.login=$(SONAR_KEY) -Dsonar.branch=$(BRANCH)

build: install
	@echo "===================================================================="
	@echo "Building application and container"
	@echo "===================================================================="
	NODE_ENV=prod $(DOCKER_RUN) npm run build
	docker build -f ci/production/Dockerfile \
		-t "fabianhauser/engineering-projekt-client" ./

build-container-testing:
	@echo "===================================================================="
	@echo "Building testing docker container"
	@echo "===================================================================="
	docker build -f ci/testing/Dockerfile \
		-t "fabianhauser/engineering-projekt-client-testing" ./

deploy-live: DEPLOY_SYSTEM=live
deploy-live: deploy

deploy-develop: DEPLOY_SYSTEM=develop
deploy-develop: CONTAINER_SUFFIX=-develop
deploy-develop: deploy

deploy:
	[ "$(DEPLOY_SYSTEM)" != "" ] || (echo "This target may not be called directly." >&2; false)
	@echo "===================================================================="
	@echo "Deploy to the $(DEPLOY_SYSTEM) system"
	@echo "===================================================================="
	@echo Push docker image with new tags
	docker tag fabianhauser/engineering-projekt-client fabianhauser/engineering-projekt-client$(CONTAINER_SUFFIX):$(VERSION)
	docker tag fabianhauser/engineering-projekt-client fabianhauser/engineering-projekt-client$(CONTAINER_SUFFIX)
	docker login -u="$(DOCKER_USERNAME)" -p="$(DOCKER_PASSWORD)"
	docker push fabianhauser/engineering-projekt-client$(CONTAINER_SUFFIX)

	@echo "Trigger container pull on server"
	echo ${SSH_KEY} | base64 -d > id_ed25519 && chmod 700 id_ed25519
	@echo "Execute ssh trigger..."
	ssh -o "StrictHostKeyChecking no" -q -i id_ed25519 rollator-epj-client$(CONTAINER_SUFFIX)@adit.qo.is
	@echo "done."
	rm id_ed25519
