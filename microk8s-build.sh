#!/usr/bin/env bash
docker build -t drink-container-ui .
docker push localhost:32000/drink-container-ui