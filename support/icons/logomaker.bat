if not exist "fav" mkdir fav

magick favicon.fw.png -thumbnail 32x32   -alpha on -background none -flatten fav/favicon.ico
magick favicon.fw.png -thumbnail 32x32   -alpha on -background none -flatten fav/favicon-32x32.png
magick favicon.fw.png -thumbnail 16x16   -alpha on -background none -flatten fav/favicon-16x16.png
magick favicon.fw.png -thumbnail 152x152 -alpha on -background none -flatten fav/apple-touch-icon-152x152.png
magick favicon.fw.png -thumbnail 144x144 -alpha on -background none -flatten fav/msapplication-icon-144x144.png
magick favicon.fw.png -thumbnail 192x192 -alpha on -background none -flatten fav/android-chrome-192x192.png
