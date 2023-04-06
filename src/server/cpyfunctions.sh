#!/bin/bash

cp -TRv ./services ./functions/src/services
cp -TRv ./routes ./functions/src/routes
cp -TRv ./models ./functions/src/models
cp -TRv ./api-json ./functions/src/api-json
cp -TRv ./static ./functions/src/static
cp -TRv ./controllers ./functions/src/controllers
cp -TRv ./helpers ./functions/src/helpers
cp -TRv ./classes ./functions/src/classes
cp -TRv ./generate ./functions/src/generate
echo "completed copying"
