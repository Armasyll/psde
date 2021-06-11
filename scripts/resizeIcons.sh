#!/bin/bash
mogrify -resize 128x128 -background none *.png
mogrify -extent 128x128 -gravity center -background none *.png
mogrify -resize 128x128 -background none *.png