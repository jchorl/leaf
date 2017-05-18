UID=$(shell id -u)
GID=$(shell id -g)

default:
	docker container run --rm -it \
		-v $(PWD):/usr/src/app \
		-w /usr/src/app \
		-u $(UID):$(GID) \
		node \
		npm start

node:
	docker container run --rm -it \
		-v $(PWD):/usr/src/app \
		-w /usr/src/app \
		-u $(UID):$(GID) \
		node \
		bash
