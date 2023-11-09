# Call backend services through RESTful APIs

At the moment we don't have a RESTful API backend service, so we will be using the [GitHub RESTful API](https://developer.github.com/v3/) to retrieve and manage GitHub content.

For example, to retreive the GitHub user data we use the following URL:

```url
https://api.github.com/search/users?q=<username>
```

The result is a JSON object:

```json
{
    "total_count": 1,
    "incomplete_results": false,
    "items": [
        {
            "login": "vives-devbit",
            "id": 47454925,
            "node_id": "MDEyOk9yZ2FuaXphdGlvbjQ3NDU0OTI1",
            "avatar_url": "https://avatars.githubusercontent.com/u/47454925?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/vives-devbit",
            "html_url": "https://github.com/vives-devbit",
            "followers_url": "https://api.github.com/users/vives-devbit/followers",
            "following_url": "https://api.github.com/users/vives-devbit/following{/other_user}",
            "gists_url": "https://api.github.com/users/vives-devbit/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/vives-devbit/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/vives-devbit/subscriptions",
            "organizations_url": "https://api.github.com/users/vives-devbit/orgs",
            "repos_url": "https://api.github.com/users/vives-devbit/repos",
            "events_url": "https://api.github.com/users/vives-devbit/events{/privacy}",
            "received_events_url": "https://api.github.com/users/vives-devbit/received_events",
            "type": "Organization",
            "site_admin": false,
            "score": 1
        }
    ]
}
```

### Getting data

Start a new Vue project (all default) and use the Boodstrap CDN for styling.

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
```

To get data using a RESTful API, we are going to use the *fetch()* method.

To begin, in `src/components` folder, create a new file GitHub.vue with the below code:

```vue
<script>
    export default{
        methods:{
            async fetchGitHubUsers(){
                const res = await fetch('https://api.github.com/search/users?q=devbit');
                const data = await res.json();
                console.log(data.items);
            }
        },
        async created(){
            this.fetchGitHubUsers();
        }
    }
</script>
```

In the method *fetchGitHubUsers* we print the list of items returned when our AJAX call is completed.

Every Vue component instance fires several lifecycle events we can hook on (add and run our own code at specific stages). The methods you will probably find yourself using most often are:
* **created**. This is the place to kick off any requests for fetching data from API's. Thus, we place our data retrieval code here.
* **mounted** is fired after the component has been rendered and inserted into the DOM. This is wher you can manipulate the DOM elements.
* **beforeUnmount**. This method is called just before the component is removed from the DOM. You can do any cleanup here.

Before we run our app, remember that we have to import and call our GitHub component in App.vue.

```vue
<script>
    import GitHub from './components/GitHub.vue';

    export default{
        components:{
            GitHub
        }
    }
</script>
    
<template>
    <GitHub />
</template>
```

### Storing our Results

Now that we have made a successful connection to our API, let's have a data variable to store our results instead of just logging them to the console. This let's us display the results to the user. 

```vue{3,4,5,6,7,12,16}
<script>
    export default{
        data(){
            return {
                users:[]
            }
        },
        methods:{
            async fetchGitHubUsers(){
                const res = await fetch('https://api.github.com/search/users?q=devbit');
                const data = await res.json();
                return data.items;
            }
        },
        async created(){
            this.users = await this.fetchGitHubUsers();
        }
    }
</script>
```

### Implementing a GitHub Results Display Page

We now implement a page to display our GitHub user data, by using the Table component in Bootstrap.

```vue
<script>
...
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Avatar</th>
                <th scope="col">Login</th>
                <th scope="col">URL</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="user.id" v-for="user in users">
                <th scope="row">{{user.id}}</th>
                <td><img :alt='user.login' :src='user.avatar_url' width="75" height="75"/></td>
                <td>{{user.login}}</td>
                <td><a :href="user.html_url">{{user.html_url}}</a></td>
            </tr>
        </tbody>
    </table>
</template>
```

![image](./images/afbeelding1.png)

### Adding an Input to GitHub Results Display Page

We currently hard-code our search term to '*devbit*' in our request to GitHub. Let's create a data variable *searchTerm* so that a user can type in her search terms and retrieve the relevant search results.

```vue{6,11}
<script>
    export default{
        data(){
            return {
                users:[],
                searchTerm: ''
            }
        },
        methods:{
            async fetchGitHubUsers(){
                const res = await fetch(`https://api.github.com/search/users?q=${this.searchTerm}`);
                const data = await res.json();
                return data.items;
            }
        },
        async created(){
            this.users = await this.fetchGitHubUsers();
        }
    }
</script>
...
```

:::tip 💡Note
Take note that we change from using quotes '' to using backticks `` to allow appending the search term in the above manner.
:::

Next, we create a seperate function *onSubmit()* that will be called when a user clicks 'Submit' on a search form. 

```vue{7,8,9,15,16,17,18,19,20}
<script>
    ...
        methods:{
            async fetchGitHubUsers(){
                ...
            },        
            async onSubmit(e){
                this.users = await this.fetchGitHubUsers();
            }
        }
    }
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <input v-model="searchTerm" type="text" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <table class="table">
    ...
</template>
```

### Showing a Loader Icon

While getting content from a server, it is often userful to show a loading spinner icon to the user. To do so, we create a data variable called *isLoading* and set it to *true*.

```vue{7,14,18}
<script>
    export default{
        data(){
            return {
                users:[],
                searchTerm: '',
                isLoading: false
            }
        },
        methods:{
            async fetchGitHubUsers(){
                const res = await fetch(`https://api.github.com/search/users?q=${this.searchTerm}`);
                const data = await res.json();
                this.isLoading = false;
                return data.items;
            },
            async onSubmit(e){
                this.isLoading = true;
                this.users = await this.fetchGitHubUsers();
            }
        },
        async created(){
            ...
        }
    }
</script>
...
```

Next in the markup, we render a spinner:

```vue{6}
...
<template>
    <form @submit.prevent="onSubmit">
        ...
    </form>
    <div v-if='isLoading' class="spinner-border" role="status"></div>
    <table class="table">
    ...
</template>
```

