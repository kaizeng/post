#!/usr/bin/env bash
# bin/deploy-editor.sh: Deploy editor assets

set -e

SRC="/home3/kzenginf/git/editor"
DEST="/home3/kzenginf/public_html/book/editor"

mkdir -p "$DEST"

rsync -av --include='*/' --include='*.php' --include='*.js' --include='*.css' --exclude='*' "$SRC/" "$DEST/"
