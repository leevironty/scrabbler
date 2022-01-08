
.PHONY: build deploy build_local instance


# image = 'gcr.io/cloud-marketplace/google/nginx1:latest'
# instance_name = 'nginx-demo'

# include dotenv
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

build:
	npm --prefix frontend run build
	docker build --platform linux/amd64 -t scrabbler .

build_local:
	npm --prefix frontend run build
	docker build -t scrabbler-local .

run_local: build_local
	docker run -p 80:80 scrabbler-local

deploy:
	docker tag scrabbler ${REMOTE_TAG}
	docker push ${REMOTE_TAG}

instance:
	gcloud compute instances create-with-container ${INSTANCE_NAME} --zone ${ZONE} --container-image ${IMAGE} ${INSTANCE_DETAILS}

update: build deploy
	gcloud compute instances update-container ${INSTANCE_NAME} --zone ${ZONE} --container-image ${IMAGE}