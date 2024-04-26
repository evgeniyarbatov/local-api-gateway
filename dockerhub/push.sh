#!/bin/bash

# ./push.sh . evgenyarbatov/test latest

set -e

source_path="$1"
repository_url="$2"
tag="${3:-latest}"

image_name="$(echo "$repository_url" | cut -d/ -f2)"

(cd "$source_path" && docker build -t "$image_name" .)

docker tag "$image_name" "$repository_url":"$tag"
docker push "$repository_url":"$tag"