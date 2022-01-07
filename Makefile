
.PHONY: build deploy

# include dotenv
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

build:
	docker build --platform linux/amd64 -t scrabbler .

deploy:
	docker tag scrabbler ${REMOTE_TAG}
	docker push ${REMOTE_TAG}