# Use of online style frameworks

> 🌐 Supporting learning material
>
> YouTube tutorial: [Bootstrap](https://www.linkedin.com/learning/bootstrap-4-essential-training)
>
> YouTube tutorial: [Font Awesome](https://www.youtube.com/watch?v=rXiO4bm2Zpc)

## Using Bootstrap

Bootstrap CSS is the leading CSS framework for developing responsive and mobile-first websites. This free and open-source toolkit comes with a responsive grid system, global CSS settings, extensive pre-built components including buttons, navigation bars and forms, and optional JavaScript plugins to speed up the development process.

### Downloading from Bootstrap

To do this, go to [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/download/) and download the Compiled version of Bootstrap. Unpack the Zip file in the root of your website and simply rename the folder 'Bootstrap'.

### Loading Bootstrap

To load Bootstrap you proceed in a similar way to your own CSS file.

```html
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
```

If you also want to use the Javascript part of Bootstrap add the following in the footer of your html.

```html
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
```

### A selection of the many Bootstrap components

![download](./images/image1.png)
![download](./images/image2.png)
![download](./images/image3.png)

### Using Bootstrap CSS style

Using one of these Bootstrap components is very easy. It's just a matter of referencing the correct Bootstrap CSS class in the HTML markup. For example, here's how we use Bootstrap's primary colored button on a web page...

```html
  <button type="button" class="btn btn-primary">Primary</button>
```
Why does the button have 2 classes `.btn` and `.btn-primary` ?

Bootstrap's components are built with a basic modifier class approach. This means that most of the styling is housed in a base class (e.g. .btn), while style variations are limited to modifier classes (e.g. .btn-primary).

So the principle of Bootstrap is quite simple, it's just a matter of figuring out exactly which class you need in the beginning.

## Using FontAwesome

Using icons in web design is a proven method to modernize a website and direct user flow. Adding icons to your site's content helps a user better process the information you're trying to convey and provides a visual focal point that directs a user to a specific section.

Graphic icons can be used in many ways to spice up your web design project. You can use them as visual accompaniments to text areas or as standalone links in situations where space is limited and blocks of text are not feasible within the design. It is this versatility of icons that makes them so useful and widespread.

Fortunately, it is not necessary to create your own icon set. Font Awesome provides a versatile framework that includes almost any icon image you can imagine, along with the necessary scalability and customization options. Font Awesome will almost certainly save you time and money in your application of specific icons.

### Loading FontAswesome

To load FontAwesome you proceed in the same way.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"/>
```

### Adding an icon 

Let's add the RSS icon as an example.

```html
<i class="fa fa-rss"></i>
```

Now if you want to change the size of the icon just add it.

```html
<i class="fa fa-rss fa-3x"></i>
```

It is now a matter of looking up the desired icon on [FontAwesome](https://fontawesome.com/icons) and applying the corresponding class.