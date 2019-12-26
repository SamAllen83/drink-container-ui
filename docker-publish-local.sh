#!/usr/bin/env bash
mvn clean install -Dspring.cloud.contract.verifier.skip=true -DskipTests
docker build -t localhost:32000/drink-container-gateway .
docker push localhost:32000/drink-container-gateway