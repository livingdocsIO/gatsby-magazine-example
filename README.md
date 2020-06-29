## About the Livingdocs-gatsby-magazine

This magazine-starter is supposed to help you start out with Livingdocs as a headless CMS.<br/> We assume you haven't set up any custom configuration and use our magazine-component library.

This works setup will work well for small setups (100 - 5000 Articles/posts) or proof of concepts where you want to see results quickly.
For a full fledged enterprise use case you can contact us.

## See it in action:

[Gatsby-magazine example](https://magazine-example.livingdocs.io/)

## Quick start

1.  **Clone this repo**

    Start by cloning this repository and installing the dependencies. <br/>
    This has been tested with Node 8.12.0, later

    ```
    git clone
    cd gatsby-magazine-example
    npm install
    ```

2.  **Use your own API Key**

    in the root of your folder in `Gatsby-config.js`, you'll have to swap out _process.env.accessToken_ for your Livingdocs API-Token.
    You can find your token [here](https://edit.livingdocs.io/access/124/public-api).


    ```js
    plugins: [
      {
        resolve: 'gatsby-source-Livingdocs',
        options: {
          // The accessToken is accessed at buildtime.
          // In this example we used "netlify" and set our Token there.
          accessToken: process.env.accessToken
        }
      }
    ]
    ```

    _In a nutshell, the Livingdocs plugin will get the data and from the JSON that is returned, the graphQL schema will be created at build time. You can read more about the plugin here_

3.  **Start editing the project locally!**

    Navigate into your new site’s directory and start the project.

    ```
    gatsby develop
    ```

    Gatsby will run two things now:

    Your site at `http://localhost:8000`

    And a GraphQL server at: `http://localhost:8000/___graphql`

    _Note: GraphiQL, is a tool you can use to experiment querying your data with. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Perfect. You got your starter project running!
    It still has the Livingdocs branding and SEO-setup.

## Where to go from here

1.  **Interesting starting points**

         ├── src
           ├── components
             ├── footer | contains Livingdocs links
             ├── header | contains Livingdocs branding
             ├── layout | contains all SEO data (some specific to Livingdocs)
             ├── resources
               ├── living-times014.css
           ├── pages
             ├── 404.js   |  404 starter-page
             ├── index.js | Homepage / initial route
           ├── templates
             ├── article.js     | Creates the article pages in gatsby-node.js
             ├── authorPage.js  | Creates the author pages in gatsby-node.js
             ├── pages.js       | Creates the pages in gatsby-node.js
         ├── gatsby-config.js
         ├── gatsby-node.js     | Pages are created programmatically here

2.  **Plugin overview**

    We've added plugins that should be included in our opinion. We will shortly go over which plugins were used.

    _All plugins can be found in gatsby-config.js_

    **gatsby-source-Livingdocs**
    Used to request the data from Livingdocs, afterwards used in _gatsby-node.js_ to programmatically create the pages

    ***

    **gatsby-plugin-react-helmet**
    Creates the <head> with metadata, css, social media headers, etc.

    **gatsby-plugin-sitemap**
    Creates the sitemap, which can be accessed here:
    `http://localhost:8000/sitemap.xml`

    **gatsby-plugin-robots-txt**
    Creates the robot.txt file, which can be seen here:
    `http://localhost:8000/robots.txt`

    **gatsby-plugin-manifest**
    Creates the PWA-Manifest

    <br/>

3.  **This magazine in combination with Livingdocs**

    Whether you're an author, or a developer trying to understand what's going on so here are some key features:

    **A meaningful title in Livingdocs**
    This will be crucial for SEO reasons. Under the hood

        ├── src
          ├── components
            ├── layout.js
          ├── templates
            ├── article.js

    The layout & article components will set up all the necessary data for google, facebook, twitter within the <head> component.

    So having meaningful `titles, descriptions, keywords` are very important, for the user to find the content.

    The good part? We've done lots of research regarding SEO for you. Thus, you can focus on using Livingdocs and a good part of the technical implementation has been already done for you, if you use our starter kits.

# Deployment

1.  **Deploy locally**

    Deploying locally is really easy.

    ```
    gatsby build
    gatsby serve
    ```

    You should be able to find your locally-deployed website here: http://localhost:9000/

<br/>

2.  **Deploy to online services. Example: Netlify**


    _Deployment isn't limited to Netlify. This works as well with services such as zeit.co/now or your favorite service. We currently are working on Webhooks, so you can redeploy after writing a new article. <br/> Also incremental builds are possible for Enterprise customers. Please get in touch, if that's a crucial feature._



    #### Quick deployment:
    Drop your **public** folder onto Netlify. _Tada, your website is live._


    #### Standard deployment
     Connect your Github/Gitlab repository and automatically re-deploy on new commits. <br/>We are working on Webhooks and incremental build-processes for the public, stay tuned.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.
