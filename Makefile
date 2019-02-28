test:
	docker run --rm -e TRACE=$(TRACE) -v `pwd`:/tmp/app gliderlabs/herokuish /bin/herokuish test

buildpack-test:
	docker run --rm -e TRACE=$(TRACE) -v `pwd`:/tmp/app gliderlabs/herokuish /bin/herokuish buildpack test
