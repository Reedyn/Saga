Saga [![Gittip](http://img.shields.io/gittip/reedyn.svg)](https://www.gittip.com/reedyn/) [![Built with Grunt](http://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Project Status](http://stillmaintained.com/Reedyn/Saga.png)](http://stillmaintained.com/Reedyn/Saga)
====

## Useful information

This theme uses a small javascript for showing the custom cover image for a post. To select an image for cover you simply give it the id `featured`. Meaning you need to use HTML for embedding the image.

###*Example below*
```html
<img id="featured" src="/content/images/2014/Sep/Gustav-Lindqvist_2014-09-20_0001-65-1.jpg">
```

Different displaying of images works the same way.

### There are currently 3 different sizes an image can be displayed at:
 1. Small (you add the class `small`)
 2. Large (you don't need to add anything)
 3. Full (you add the class `full`)
 
### There's also a fourth way to display images, and that's using a gallery (or collage)
THat is done in the following manner:
```html
<p class="gallery">
    ![Vandring på Skåneleden](/content/images/2014/Sep/Gustav-Lindqvist_2014-09-20_0440.jpg)
    ![Skylt mot Romelestigen](/content/images/2014/Sep/Gustav-Lindqvist_2014-09-20_0744.jpg)
    ![Intressant träd](/content/images/2014/Sep/Gustav-Lindqvist_2014-09-20_0438.jpg)
    ![Korvgrillning](/content/images/2014/Sep/Gustav-Lindqvist_2014-09-20_0001-73.jpg)
    ![Mys vid utsikten](/content/images/2014/Sep/Gustav-Lindqvist_2014-09-20_0001-49-1.jpg)
</p>
```
