# Routes in Vue

**Routing** is one of the most essential and primary parts of building dynamic web applications. It is the proces of getting a user to their desired location. Users who enter website.com/about into their URL bar wil be redirected to the About page.

In web development, routing is the matching mechanism by which we decide how to connect HTTP requests to the code that handles them. We use routing whenever there is need for URL navigation in our application.

Thus, routing creates a navigation system and helps users quickly move around our application and the web. With **Single-Page Applications**, routing allows you to smootly navigate within and application without the need for page refreshing.

## Create a project with routing

When you create a new project with `npm init vue@latest`, just select 'yes' for *Add Vue Router for Single Page Application development*.

You will notice there is a 'router' and 'view' folder added to your project. The router folder will contain information about the routing and the view folder diferent views (pages) that can be shown.

In our `main.js` router is imported and used by our application.

```js
import router from './router'
...
app.use(router)
```

## Building the components for our project

Just like before we can create components, let's again remove the default existing components HelloWorld.vue, TheWelcome.vue, WelcomeItem.vue as well as the icons folder.

We will be using bootstrap for styling, so in our index.html we need to add:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
```

First we will build a `Welcome.vue` component with the following content:

```vue
//Logic section
<script>
    export default{
        data(){
            return{
                blogs:[
                    {
                        id: 1,
                        name: 'THE A.I. THAT EVERYONE’S TALKING ABOUT',
                        description: 'The AI engine that everyone is talking about ‘ChatGPT ‘ created it for me when I asked it to write me a short, funny blog about AI. Be honest, you didn’t notice did you? In just 37 seconds, an AI engine wrote a blog that I could feel proud of. Is that worrying? Sort of. Will I write future blogs like this? Absolutely not. It feels like cheating. Maybe my children or my children’s children will feel differently, but for me, something that looks like it’s written by a person, should be written by one. This is not where I’d like to see AI used.',
                        image: 'blog1.jpg'                        
                    },
                    {
                        id: 2,
                        name: 'SAELIG INTRODUCES SIGLENT SHA800A PORTABLE SPECTRUM RANGE TO 7.5GHZ',
                        description: 'Saelig Company, Inc. has introduced the SIGLENT SHA800A series, handheld portable spectrum analyzers which form a powerful, versatile choice for benchtop and field RF measurement applications. SHA800A analyzers combine the capabilities of a Spectrum Analyzer, a Vector Network Analyzer, and a Cable/Antenna Tester all in one intuitive handheld package.    With a frequency range up to 7.5 GHz, these analyzers deliver reliable automatic measurements and multiple modes of operation. The spectrum analyzer includes a built-in amplifier and independent signal source, fast scanning speed, high sensitivity.',
                        image: 'blog2.jpg'
                    },
                    {
                        id: 3,
                        name: 'Serve Robotics Expanding Sidewalk Deliveries',
                        description: 'Serve Robotics, Uber’s spinout company creating autonomous sidewalk delivery robots, is expanding its services following a successful first year of operations in Los Angeles. Under the expansion, Serve will bring 2,000 additional robots to streets across the U.S. in a collaboration with Uber Eats.',
                        image: 'blog3.jpg'
                    }
                ]
            }
        }
    }
</script>

// Template section
<template>
    <h3>Relevant blogs for students Electronics-ICT</h3>
   <div class="container pt-5" >
         <div class="row rounded-4 shadow p-4 mb-3" v-for='blog in blogs' :key='blog.id'>            
            <h6 class="text-info mb-4">{{blog.name}}</h6>
            <div class="row">
                <div class="col-md-8">
                    <p>{{blog.description}}</p>                    
                </div>
                <div class="col-md-4">                    
                    <img class="img-thumbnail" width="250" v-bind:src="'./src/assets/images/' + blog.image"/>
                </div>
            </div>
        </div>    
    </div>
</template>
```

Then place these [images](/files/blogimages.zip) in the folder `assets/images`.

## Creating views

Consider views as the dynamicly loaded content that will be displayed.

Again we wil remove the default existing views HelloView.vue and AboutView.vue.

Then we start on our `Home.vue` view with the following content:

```vue
<script setup>
import Welcome from '../components/Welcome.vue'
</script>

<template>
  <main>
    <Welcome />
  </main>
</template>
```

So this view actualy uses the previous created component to display it's content.

Now we add a `About.vue` view with the following content:

```vue
<template>
  <div class="container">
    <h3>About Electronics-ICT</h3>
    <p>Electronics-ICT is a professional bachelor education in the fields Hardware, Software, AI and Networks.</p>
    <h6>Location:</h6>
    <p>Xavarianenstraat 10, 8000 Brugge</p>
  </div>
</template>
```

Notice this is a static page without the use of components.

## Setup the routes

Now we will setup the routes for our web application, therefore change the content of `index.js` in the folder `router` to:

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',      
      component: () => import('../views/About.vue')
    }
  ]
})

export default router
```

Let's take a closer look at this...

First we import *createRouter* and *createWebHistory* from the *vue-router*, next we use that *createRouter* to define the **routes** and **history**.

For each rout we have a object defining the **path**, the **name** and the **component** (view).

Finaly, let's adjust our `app.vue` as follows:

```vue
<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 class="text-info">Welcome to Webscripting</h1>
      <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <img alt="Vue logo" class="logo" src="@/assets/images/vives.png" height="36" />
        <RouterLink to="/" class="nav-link p-2">Home</RouterLink>
        <RouterLink to="/about" class="nav-link p-2">About</RouterLink>
      </nav>
    </div>
  </header>
  <br/> 
  <RouterView />
</template>
```

## 404 page

If, for what ever reason, the user ends up to a path that doesn't exist. We should show a 404-page.

To do so we need to and the following as last route in our `routes/index.js` file:

```js
{
  path: '/:pathMatch(.*)*',
  component: () => import('../views/NotFound.vue'),      
}
```

Now you just have to add a `NotFound.vue` file in your 'views' folder.

```vue
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <img alt="404 - Page not found" src="@/assets/images/404.png" height="90" />
            </div>
            <div class="col-md-8">
                <h1>PAGE NOT FOUND</h1>
                <p>Sorry the page you are looking for was not found!</p>
            </div>
        </div>
    </div>
</template>
```