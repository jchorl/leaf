UID=$(shell id -u)
GID=$(shell id -g)
IP=$(shell ip addr show | grep -E "inet ([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v ' lo' | head -1 | grep -oE "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 255)

default:
	docker container run --rm -it \
		-v $(PWD):/usr/src/app \
		-w /usr/src/app \
		-u $(UID):$(GID) \
		-p 19000:19000 \
		-p 19001:19001 \
		node \
		sh -c 'yarn; REACT_NATIVE_PACKAGER_HOSTNAME="$(IP)" yarn start -- --reset-cache'

nodocker:
	npm install; npm start

node:
	docker container run --rm -it \
		-v $(PWD):/usr/src/app \
		-w /usr/src/app \
		-u $(UID):$(GID) \
		node \
		bash
