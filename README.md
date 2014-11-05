# PinMe.js

I had to add Pinterest "Pin It" buttons to a clients site, and didn't like the stock Pinterest option or other options I found, so I made this.

I have NOT done extensive testing with this and can't ensure it'll work perfectly in every situation, but for the most part it works as I intend it to.

You are welcome to use it as-is, fork it and make it better, steal it and say you wrote it, whatever. If you want to help make it better, I welcome input/pull requests! 

## How to Use
Include jQuery and PinMe.js on your site and use 'pinMe()' to target sections where you want to add the Pin button.

```html
<script src="path/to/jquery.min.js"></script>
<script src="path/to/pinme.js"></script>
<script>
  $(document).ready(function(){
    // Target the area containing images you want to add the pin button to (body, .page-wrap, .post, #very-specific-element, etc)
    $(".post-container").pinMe();
  });
</script>
```

This will find all images within your selector and add a PinMe button to each, which can be styled with CSS.

## Options
You can customize some things. Check it out:

### Custom Button HTML
By default, PinMe wraps the image and adds `<div class="pin-me-button">Pin Me</div>` to the image. You can change this to be whatever you want, including a picture, svg, icon-font, or whatever you want.

```javascript

  $(".post-content").pinMe({ 
  	pinButton: '<span class="my-cool-icon"></span>''
	});
  
```

### Ignore Images
If you want to ignore certain images, add a class to those `<img>` tags and/or your custom elements, and add that class to the 'ignore' option.

By default, the plugin ignores images with a 'no-pin' class.

```javascript

  $(".photo-gallery").pinMe({ 
  	ignore: '.dont-pin-me, #nope'
	});
  
  // Add a bunch if you want, just seperate them with a comma.

```

### Default Description Text
When you pin something, Pinterest pulls in a 'description' of the image. By default, PinMe looks for the image `ALT` attribute. If that doesn't exist, it looks for the `TITLE` attribute. If you don't have either of those, you should. But if you really don't want `ALT` or `TITLE` attributes on images, you can set a default string that will be added as a description.

```javascript

  $(".photos-to-pin").pinMe({ 
  	defaultDescription: "Check out this cool picture I found!"
	});
  
```

### Custom Elements

PinMe looks for img elements. It can look for additional elements (maybe `<svg>`, `<picture>`, or something).

```javascript

  $(".photos-to-pin").pinMe({ 
  	customElement: 'svg, picture'
	});
  
```

### Other Options
Here are some more options.

- `showOnHover` - True/False. If false, pin button will be shown at all times. Default is true.
- `fadeDuration` - Set the duration of the fadein/fadeout effect. Default is 700.
- `popOut` - True/False. Pinterest sharing window pops out when true, opens in current window if false. Default is true.
