UID=$(shell id -u)
GID=$(shell id -g)

deploy:
	docker container run -it --rm \
		-v $(PWD):/leafrelay:ro \
		-w /leafrelay \
		leafrelay sh -c 'gcloud auth login; gcloud config set project leafrelay; gcloud beta functions deploy leafrelay --stage-bucket leafrelay-cloud-function --trigger-http'

node:
	docker container run -it --rm \
		-u $(UID):$(GID) \
		-v $(PWD):/leafrelay \
		-w /leafrelay \
		node bash
