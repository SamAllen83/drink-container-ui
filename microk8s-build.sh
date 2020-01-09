#!/usr/bin/env bash
docker build -t localhost:32000/drink-container-ui .
docker push localhost:32000/drink-container-ui