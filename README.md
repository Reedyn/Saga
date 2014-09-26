Saga [![Gittip](http://img.shields.io/gittip/reedyn.svg)](https://www.gittip.com/reedyn/) [![Built with Grunt](http://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Project Status](http://stillmaintained.com/Reedyn/Saga.png)](http://stillmaintained.com/Reedyn/Saga)
====

## Useful information


### Image sizes
There are currently 4 different sizes an image can be displayed at:

 1. Small *(add the fragment `#small`)*
 2. Normal *(No need to add anything)*
 2. Large *(add the fragment `#large`)*
 3. Full *(you add the fragment `#full`)*

#### Example

```html
![Small image](//url/to/image.jpeg#small)

![Normal image](//url/to/image.jpeg)

![Large image](//url/to/image.jpeg#large)

![Full image](//url/to/image.jpeg#full)
```
 
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
