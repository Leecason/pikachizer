#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m '🎉'

git push -f git@github.com:Leecason/Pikachizer.git master:gh-pages

cd -
