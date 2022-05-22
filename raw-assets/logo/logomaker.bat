if not exist "fav" mkdir fav

REM as of 2021, this seems to be mentioned as the one
convert logoDD.fw.png -thumbnail 32x32   -alpha on -background none -flatten fav/favicon.ico

convert logoDD.fw.png -thumbnail 16x16   -alpha on -background none -flatten fav/favicon-16.ico
convert logoDD.fw.png -thumbnail 48x48   -alpha on -background none -flatten fav/favicon-48.ico

convert logoDD.fw.png -thumbnail 128x128 -alpha on -background none -flatten fav/favicon-chrome-web-store-128.ico
convert logoDD.fw.png -thumbnail 152x152 -alpha on -background none -flatten fav/favicon-ipad-touch-icon-152.ico
convert logoDD.fw.png -thumbnail 167x167 -alpha on -background none -flatten fav/favicon-ipad-retina-167.ico
convert logoDD.fw.png -thumbnail 180x180 -alpha on -background none -flatten fav/favicon-iphone-retina-180.ico
convert logoDD.fw.png -thumbnail 192x192 -alpha on -background none -flatten fav/favicon-google-manifest-192.ico
convert logoDD.fw.png -thumbnail 196x196 -alpha on -background none -flatten fav/favicon-android-home-196.ico

convert logoDD.fw.png -thumbnail 200x200 -alpha on -background none -flatten fav/logo200.gif
convert logoDD.fw.png -thumbnail 200x200 -alpha on -background none -flatten fav/logo200.png
