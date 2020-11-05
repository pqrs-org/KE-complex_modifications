#!/bin/sh

if git clone --depth 1 git@github.com:pqrs-org/gh-pages-ke-complex-modifications.pqrs.org.git; then
  destdir=gh-pages-ke-complex-modifications.pqrs.org
  revision=$(git rev-parse HEAD)
  echo $revision >$destdir/source-revision
  rsync -Lav --delete --exclude CNAME --exclude .nojekyll public/ $destdir/docs
  (cd $destdir &&
    git config user.name "GitHub Actions (pqrs-org/KE-complex_modifications)" &&
    git config user.email "tekezo@pqrs.org" &&
    git add -A &&
    git commit -m "pqrs-org/KE-complex_modifications@$revision" &&
    git push)
else
  echo "Skip updating pqrs-org/gh-pages-ke-complex-modifications.pqrs.org since git clone is failed."
fi
