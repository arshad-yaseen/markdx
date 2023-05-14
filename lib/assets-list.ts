export const assets = {
  snippets: [
    {
      name: "Vercel deploy button",
      description: "Deploy your app to Vercel with a single click.",
      code: `[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/[user-name]/[repo-name])`,
      default_image_url: "https://vercel.com/button",
      default_url:
        "https://vercel.com/new/clone?repository-url=https://github.com/arshad-yaseen/markdx&project-name=markdx",
      keywords: [
        "vercel",
        "deploy",
        "button",
        "deploy button",
        "vercel deploy button",
        "vercel button",
        "vercel deploy",
      ],
      placeholders: [
        {
          name: "User name",
          description: "GitHub username",
          defaultValue: "",
          replacer: "user-name",
        },
        {
          name: "Github repository name",
          description: "The github repository name to deploy",
          replacer: "repo-name",
          optional: false,
        },
      ],
    },
    {
      name: "Heroku deploy button",
      description: "Deploy your app to Heroku with a single click.",
      code: `[![Deploy with heroku](https://www.herokucdn.com/deploy/button.svg)](https://www.heroku.com/deploy/?template=[template-url])]`,
      default_image_url: "https://www.herokucdn.com/deploy/button.svg",
      default_url:
        "https://www.heroku.com/deploy/?template=https//github.com/arshad-yaseen/markdx",
      keywords: [
        "heroku",
        "deploy",
        "button",
        "deploy button",
        "heroku deploy button",
        "heroku button",
        "heroku deploy",
      ],
      placeholders: [
        {
          name: "Template url",
          description: "The GitHub repo to deploy.",
          defaultValue: "https://github.com/",
          replacer: "template-url",
        },
      ],
    },
    {
      name: "Netlify deploy button",
      description: "Deploy your app to Netlify with a single click.",
      code: `[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=[repo-url])]`,
      default_image_url: "https://www.netlify.com/img/deploy/button.svg",
      default_url:
        "https://app.netlify.com/start/deploy?repository=https://arshad-yaseen/markdx",
      keywords: [
        "netlify",
        "deploy",
        "button",
        "deploy button",
        "netlify deploy button",
        "netlify button",
        "netlify deploy",
      ],
      placeholders: [
        {
          name: "Repository url",
          description: "The GitHub repo to deploy.",
          defaultValue: "https://github.com/",
          replacer: "repo-url",
        },
      ],
    },
    {
      name: "Cloudflare workers deploy button",
      description: "Deploy your app to Cloudflare workers with a single click.",
      code: `[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/[user-name]/[repo-name])`,
      default_image_url: "https://deploy.workers.cloudflare.com/button",
      default_url:
        "https://deploy.workers.cloudflare.com/?url=https://github.com/arshad-yaseen/markdx",
      keywords: [
        "cloudflare",
        "deploy",
        "button",
        "deploy button",
        "cloudflare deploy button",
        "cloudflare button",
        "cloudflare deploy",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
        },
      ],
    },
    {
      name: "CodeSandbox edit button",
      description: "Deploy your app to CodeSandbox with a single click.",
      code: `[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/[sandbox-id])`,
      default_image_url:
        "https://codesandbox.io/static/img/play-codesandbox.svg",
      default_url: "https://codesandbox.io/s/markdx-4jx9j",
      keywords: [
        "codesandbox",
        "deploy",
        "button",
        "deploy button",
        "codesandbox edit button",
        "codesandbox button",
        "codesandbox edit",
      ],
      placeholders: [
        {
          name: "Sandbox id",
          description: "The sandbox id.",
          replacer: "sandbox-id",
          defaultValue: "",
        },
      ],
    },
    {
      name: "Made with repl.it button",
      description: "Run your app on repl.it with a single click.",
      code: `[![Made with Repl.it](https://repl.it/badge/github/[user-name]/[repo-name])]([repl-url])`,
      default_image_url: "https://repl.it/badge/github/arshad-yaseen/markdx",
      default_url: "https://repl.it/github/arshad-yaseen/markdx",
      keywords: [
        "repl.it",
        "run",
        "button",
        "run button",
        "repl.it run button",
        "repl.it button",
        "repl.it run",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
        },
      ],
    },
    {
      name: "Run on replit button",
      description: "Run your app on replit with a single click.",
      code: `[![Run on Replit](https://binbashbanana.github.io/deploy-buttons/buttons/official/replit.svg)](https://replit.com/github/[user-name]/[repo-name])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/replit.svg",
      default_url: "https://replit.com/github/arshad-yaseen/markdx",
      keywords: [
        "replit",
        "run",
        "button",
        "run button",
        "replit run button",
        "replit button",
        "replit run",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
        },
      ],
    },
    {
      name: "Remix on Glitch button",
      description: "Remix your app on Glitch with a single click.",
      code: `[![Remix on Glitch](https://binbashbanana.github.io/deploy-buttons/buttons/official/glitch.svg)](https://glitch.com/edit/#!/import/github/[user-name]/[repo-name])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/glitch.svg",
      default_url:
        "https://glitch.com/edit/#!/import/github/arshad-yaseen/markdx",
      keywords: [
        "glitch",
        "remix",
        "button",
        "remix button",
        "glitch remix button",
        "glitch button",
        "glitch remix",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
        },
      ],
    },
    {
      name: "Deploy to Azure button",
      description: "Deploy your app to Azure with a single click.",
      code: `[![Deploy to Azure](https://binbashbanana.github.io/deploy-buttons/buttons/official/azure.svg)](https://portal.azure.com/#create/Microsoft.Template/uri/[template-uri])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/azure.svg",
      default_url:
        "https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Farshad-yaseen%2Fmarkdx%2Fmaster%2Fazuredeploy.json",
      keywords: [
        "azure",
        "deploy",
        "button",
        "deploy button",
        "azure deploy button",
        "azure button",
        "azure deploy",
      ],
      placeholders: [
        {
          name: "Template uri",
          description: "The template uri.",
          replacer: "template-uri",
          defaultValue: "",
        },
      ],
    },
    {
      name: "Deploy to IBM Cloud button",
      description: "Deploy your app to IBM Cloud with a single click.",
      code: `[![Deploy to IBM Cloud](https://binbashbanana.github.io/deploy-buttons/buttons/official/ibmcloud.svg)](https://cloud.ibm.com/devops/setup/deploy?repository=https://github.com/[user-name]/[repo-name])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/ibmcloud.svg",
      default_url:
        "https://cloud.ibm.com/devops/setup/deploy?repository=https://github.com/arshad-yaseen/markdx",
      keywords: [
        "ibm",
        "ibm cloud",
        "deploy",
        "button",
        "deploy button",
        "ibm cloud deploy button",
        "ibm cloud button",
        "ibm cloud deploy",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
        },
      ],
    },
    {
      name: "Deploy to Amplify Console button",
      description: "Deploy your app to Amplify Console with a single click.",
      code: `[![Deploy to Amplify Console](https://binbashbanana.github.io/deploy-buttons/buttons/official/amplifyconsole.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/[user-name]/[repo-name])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/amplifyconsole.svg",
      default_url:
        "https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/arshad-yaseen/markdx",
      keywords: [
        "amplify",
        "amplify console",
        "deploy",
        "button",
        "deploy button",
        "amplify console deploy button",
        "amplify console button",
        "amplify console deploy",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
        },
      ],
    },
    {
      name: "Run on Google Cloud button",
      description: "Run your app on Google Cloud with a single click.",
      code: `[![Run on Google Cloud](https://binbashbanana.github.io/deploy-buttons/buttons/official/googlecloud.svg)](https://deploy.cloud.run/?git_repo=https://github.com/[user-name]/[repo-name])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/googlecloud.svg",
      default_url:
        "https://deploy.cloud.run/?git_repo=https://github.com/arshad-yaseen/markdx",
      keywords: [
        "google",
        "google cloud",
        "deploy",
        "button",
        "deploy button",
        "google cloud deploy button",
        "google cloud button",
        "google cloud deploy",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
        },
      ],
    },
    {
      name: "Deploy to Oracle Cloud button",
      description: "Deploy your app to Oracle Cloud with a single click.",
      code: `[![Deploy to Oracle Cloud](https://binbashbanana.github.io/deploy-buttons/buttons/official/oraclecloud.svg)](https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=[zip-url])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/oraclecloud.svg",
      default_url:
        "https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/BinBashBanana/deploy-buttons/archive/refs/heads/main.zip",
      keywords: [
        "oracle",
        "oracle cloud",
        "deploy",
        "button",
        "deploy button",
        "oracle cloud deploy button",
        "oracle cloud button",
        "oracle cloud deploy",
      ],
      placeholders: [
        {
          name: "URL to zip file",
          description: "The URL of the zip file containing your code.",
          replacer: "zip-url",
          defaultValue: "",
        },
      ],
    },
    {
      name: "Deploy on railway button",
      description: "Deploy your app to Railway with a single click.",
      code: `[![Deploy on Railway](https://binbashbanana.github.io/deploy-buttons/buttons/official/railway.svg)](https://railway.app/new/template?template=https://github.com/[user-name]/[repo-name])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/railway.svg",
      default_url:
        "https://railway.app/new/template?template=https://github.com/arshad-yaseen/markdx",
      keywords: [
        "railway",
        "deploy",
        "button",
        "deploy button",
        "railway deploy button",
        "railway button",
        "railway deploy",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
        },
      ],
    },
    {
      name: "Deploy to koyeb button",
      description: "Deploy your app to Koyeb with a single click.",
      code: `[![Deploy to Koyeb](https://binbashbanana.github.io/deploy-buttons/buttons/official/koyeb.svg)](https://app.koyeb.com/deploy?type=git&repository=github.com/[user-name]/[repo-name]&branch=[branch]&name=[name])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/koyeb.svg",
      default_url:
        "https://app.koyeb.com/deploy?type=git&repository=github.com/arshad-yaseen/markdx&branch=main&name=markdx",
      keywords: [
        "koyeb",
        "deploy",
        "button",
        "deploy button",
        "koyeb deploy button",
        "koyeb button",
        "koyeb deploy",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
        },
        {
          name: "Branch",
          description: "The branch to deploy.",
          replacer: "branch",
          defaultValue: "main",
          optional: true,
        },
        {
          name: "Name",
          description: "The name of the app.",
          replacer: "name",
          optional: true,
        },
      ],
    },
    {
      name: "Deploy to Render button",
      description: "Deploy your app to Render with a single click.",
      code: `[![Deploy to Render](https://binbashbanana.github.io/deploy-buttons/buttons/official/render.svg)](https://render.com/deploy?repo=https://github.com/[user-name]/[repo-name])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/render.svg",
      default_url:
        "https://render.com/deploy?repo=https://github.com/arshad-yaseen/markdx",
      keywords: [
        "render",
        "deploy",
        "button",
        "deploy button",
        "render deploy button",
        "render button",
        "render deploy",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
          optional: false,
        },
      ],
    },
    {
      name: "Deploy to cyclic button",
      description: "Deploy your app to Cyclic with a single click.",
      code: `[![Deploy to Cyclic](https://binbashbanana.github.io/deploy-buttons/buttons/official/cyclic.svg)](https://app.cyclic.sh/api/app/deploy/[user-name]/[repo-name])`,
      default_image_url:
        "https://binbashbanana.github.io/deploy-buttons/buttons/official/cyclic.svg",
      default_url: "https://app.cyclic.sh/api/app/deploy/arshad-yaseen/markdx",
      keywords: [
        "cyclic",
        "deploy",
        "button",
        "deploy button",
        "cyclic deploy button",
        "cyclic button",
        "cyclic deploy",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
          optional: false,
        },
      ],
    },
  ],
  static: [
    {
      code: `![Made with love](https://forthebadge.com/images/badges/built-with-love.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/built-with-love.svg",
      name: "Made with love",
    },
    {
      code: `![Made with python](https://forthebadge.com/images/badges/made-with-python.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-python.svg",
      name: "Made with python",
    },
    {
      code: `![Made with javascript](https://forthebadge.com/images/badges/made-with-javascript.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-javascript.svg",
      name: "Made with javascript",
    },
    {
      code: `![Made with ruby](https://forthebadge.com/images/badges/made-with-ruby.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-ruby.svg",
      name: "Made with ruby",
    },
    {
      code: `![Made with go](https://forthebadge.com/images/badges/made-with-go.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-go.svg",
      name: "Made with go",
    },
    {
      code: `![Made with java](https://forthebadge.com/images/badges/made-with-java.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-java.svg",
      name: "Made with java",
    },
    {
      code: `![Made with c++](https://forthebadge.com/images/badges/made-with-c-plus-plus.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-c-plus-plus.svg",
      name: "Made with c++",
    },
    {
      code: `![Made with c#](https://forthebadge.com/images/badges/made-with-c-sharp.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-c-sharp.svg",
      name: "Made with c#",
    },
    {
      code: `![Made with typescript](https://forthebadge.com/images/badges/made-with-typescript.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-typescript.svg",
      name: "Made with typescript",
    },
    {
      code: `![Made with swift](https://forthebadge.com/images/badges/made-with-swift.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-swift.svg",
      name: "Made with swift",
    },
    {
      code: `![Made with rust](https://forthebadge.com/images/badges/made-with-rust.svg)`,
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-rust.svg",
      name: "Made with rust",
    },
    {
      code: "![Works on my machine](https://forthebadge.com/images/badges/works-on-my-machine.svg)",
      default_image_url:
        "https://forthebadge.com/images/badges/works-on-my-machine.svg",
      name: "Works on my machine",
    },
    {
      code: "Built by developers![Built by developers](https://forthebadge.com/images/badges/built-by-developers.svg)",
      default_image_url:
        "https://forthebadge.com/images/badges/built-by-developers.svg",
      name: "Built by developers",
    },
    {
      code: "![Built with science](https://forthebadge.com/images/badges/built-with-science.svg)",
      default_image_url:
        "https://forthebadge.com/images/badges/built-with-science.svg",
      name: "Built with science",
    },
    {
      code: "![Made with javascript](https://forthebadge.com/images/badges/made-with-javascript.svg)",
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-javascript.svg",
      name: "Made with javascript",
    },
    {
      code: "![Made with reason](https://forthebadge.com/images/badges/made-with-reason.svg)",
      default_image_url:
        "https://forthebadge.com/images/badges/made-with-reason.svg",
      name: "Made with reason",
    },
    {
      code: "![Made with sphinx](https://img.shields.io/badge/Made%20with-Sphinx-1f425f.svg)",
      default_image_url:
        "https://img.shields.io/badge/Made%20with-Sphinx-1f425f.svg",
      name: "Made with sphinx",
    },
    {
      code: "![Made with jupiter](https://img.shields.io/badge/Made%20with-Jupyter-orange?style=for-the-badge&logo=Jupyter)",
      default_image_url:
        "https://img.shields.io/badge/Made%20with-Jupyter-orange?style=for-the-badge&logo=Jupyter",
      name: "Made with jupiter",
    },
    {
      code: "![Made with markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)",
      default_image_url:
        "https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg",
      name: "Made with markdown",
    },
    {
      code: "![Made with latex](https://img.shields.io/badge/Made%20with-LaTeX-1f425f.svg)",
      default_image_url:
        "https://img.shields.io/badge/Made%20with-LaTeX-1f425f.svg",
      name: "Made with latex",
    },
    {
      code: "![Made with mathjax](https://img.shields.io/badge/Made%20with-MathJax-1f425f.svg)",
      default_image_url:
        "https://img.shields.io/badge/Made%20with-MathJax-1f425f.svg",
      name: "Made with mathjax",
    },
    {
      code: "![Made with bash](https://img.shields.io/badge/Made%20with-Bash-1f425f.svg)",
      default_image_url:
        "https://img.shields.io/badge/Made%20with-Bash-1f425f.svg",
      name: "Made with bash",
    },
    {
      code: "![Made for VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)",
      default_image_url:
        "https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg",
      name: "Made for VSCode",
    },
  ],
  shields: [
    {
      name: "Static badge",
      description: "Static badge",
      code: `![Static badge](https://img.shields.io/static/v1?label=[label]&message=[message]&color=[color]&style=[style]&logo=[named-logo]&logoColor=[logo-color])`,
      default_image_url:
        "https://img.shields.io/static/v1?label=Static&message=Hello&color=blue&style=for-the-badge&logo=vercel&logoColor=white",
      keywords: [
        "static",
        "badge",
        "static badge",
        "static badge",
        "static badge",
        "static badge",
      ],
      placeholders: [
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "label",
          defaultValue: "Static",
        },
        {
          name: "Message",
          description: "The message of the badge.",
          replacer: "message",
          defaultValue: "Hello",
        },
        {
          name: "Color",
          description: "The color of the badge.",
          replacer: "color",
          defaultValue: "blue",
        },

        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
          defaultValue: "vercel",
        },
        {
          name: "Logo color",

          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "GitHub stars",
      description: "GitHub stars badge",
      code: `![GitHub Repo stars](https://img.shields.io/github/stars/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/stars/arshad-yaseen/markdx?color=blue&label=stars&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "stars",
        "badge",
        "github stars",
        "github badge",
        "github stars badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "stars",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "GitHub forks",
      description: "GitHub forks badge",
      code: `![GitHub Repo forks](https://img.shields.io/github/forks/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/forks/arshad-yaseen/markdx?color=blue&label=forks&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "forks",
        "badge",
        "github forks",
        "github badge",
        "github forks badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "forks",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "GitHub watchers",
      description: "GitHub watchers badge",
      code: `![GitHub Repo watchers](https://img.shields.io/github/watchers/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])
        `,
      default_image_url:
        "https://img.shields.io/github/watchers/arshad-yaseen/markdx?color=blue&label=watchers&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "watchers",
        "badge",
        "github watchers",
        "github badge",
        "github watchers badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "watchers",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "GitHub issues open",
      description: "GitHub issues open badge",
      code: `![GitHub issues](https://img.shields.io/github/issues/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/issues/arshad-yaseen/markdx?color=blue&label=issues&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "issues",
        "badge",
        "github issues",
        "github badge",
        "github issues badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "issues",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "GitHub pull requests",
      description: "GitHub pull requests badge",
      code: `![GitHub pull requests](https://img.shields.io/github/issues-pr/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/issues-pr/arshad-yaseen/markdx?color=blue&label=pull%20requests&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "pull requests",
        "badge",
        "github pull requests",
        "github badge",
        "github pull requests badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "pull requests",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "Github contributors",
      description: "Github contributors badge",
      code: `![GitHub contributors](https://img.shields.io/github/contributors/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/contributors/arshad-yaseen/markdx?color=blue&label=contributors&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "contributors",
        "badge",
        "github contributors",
        "github badge",
        "github contributors badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "contributors",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "GitHub last commit",
      description: "GitHub last commit badge",
      code: `![GitHub last commit](https://img.shields.io/github/last-commit/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/last-commit/arshad-yaseen/markdx?color=blue&label=last%20commit&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "last commit",
        "badge",
        "github last commit",
        "github badge",
        "github last commit badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "last commit",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "GitHub commit activity",
      description: "GitHub commit activity badge",
      code: `![GitHub commit activity](https://img.shields.io/github/commit-activity/m/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/commit-activity/m/arshad-yaseen/markdx?color=blue&label=commit%20activity&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "commit activity",
        "badge",
        "github commit activity",
        "github badge",
        "github commit activity badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "commit activity",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",

          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "Licence badge",
      description: "Licence badge",
      code: `![Licence badge](https://img.shields.io/github/license/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/license/arshad-yaseen/form-validation-react?color=blue&label=licence&logo=github&logoColor=white&style=flat",
      default_url: "https://img.shields.io/github/license/arshad-yaseen/markdx",
      keywords: [
        "licence",
        "badge",
        "licence badge",
        "licence badge",
        "licence badge",
        "licence badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
          defaultValue: "",
        },
        {
          name: "Repository name",
          description: "The GitHub repo to deploy.",
          replacer: "repo-name",
          defaultValue: "",
          optional: false,
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "licence",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "GitHub release badge",
      description: "GitHub release badge",
      code: `![GitHub release badge](https://img.shields.io/github/v/release/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/v/release/arshad-yaseen/form-validation-react?color=blue&label=release&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "release",
        "badge",
        "github release",
        "github badge",
        "github release badge",
      ],
      placeholders: [
        {
          name: "User name",

          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "release",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",

          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "Github commits since",
      description: "Github commits since badge",
      code: `![Github commits since](https://img.shields.io/github/commits-since/[user-name]/[repo-name]/[version]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/commits-since/vercel/next.js/1.0.0?color=blue&label=commits%20since&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "commits since",
        "badge",
        "github commits since",
        "github badge",
        "github commits since badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Version",
          description: "The version of the badge.",
          replacer: "version",
          defaultValue: "1.0.0",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "commits since v1.0.0",
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "Github downloads",
      description: "Github downloads badge",
      code: `![Github downloads](https://img.shields.io/github/downloads/[user-name]/[repo-name]/total?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/downloads/atom/atom/total?color=blue&label=downloads&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "downloads",
        "badge",
        "github downloads",
        "github badge",
        "github downloads badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "downloads",

          optional: true,
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "Github followers",
      description: "Github followers badge",
      code: `![Github followers](https://img.shields.io/github/followers/[user-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/followers/arshad-yaseen?color=blue&label=followers&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "followers",
        "badge",
        "github followers",
        "github badge",
        "github followers badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "followers",

          optional: true,
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "Github issues closed",
      description: "Github issues closed badge",
      code: `![Github issues closed](https://img.shields.io/github/issues-closed/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/issues-closed/badges/shields?color=blue&label=issues&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "issues closed",
        "badge",
        "github issues closed",
        "github badge",
        "github issues closed badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "issues closed",

          optional: true,
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "Github pull requests closed",
      description: "Github pull requests closed badge",
      code: `![Github pull requests closed](https://img.shields.io/github/issues-pr-closed/[user-name]/[repo-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url:
        "https://img.shields.io/github/issues-pr-closed/badges/shields?color=blue&label=pull%20requests&logo=github&logoColor=white&style=flat",
      keywords: [
        "github",
        "pull requests closed",
        "badge",
        "github pull requests closed",
        "github badge",
        "github pull requests closed badge",
      ],
      placeholders: [
        {
          name: "User name",
          description: "The GitHub user name.",
          replacer: "user-name",
        },
        {
          name: "Repository name",
          description: "The GitHub repository name.",
          replacer: "repo-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "pull requests closed",

          optional: true,
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "Npm version",
      description: "Npm version badge",
      code: `![Npm Version](https://img.shields.io/npm/v/[package-name]?color=[override-color]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style])`,
      default_image_url: "https://img.shields.io/npm/v/form-validation-react",
      keywords: ["npm", "npm version", "version", "Npm version badge"],
      placeholders: [
        {
          name: "Package name",
          description: "The name of the package",
          replacer: "package-name",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",

          optional: true,
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
    {
      name: "Website status",
      description: "Website status badge",
      code: `![Website status](https://img.shields.io/website?color=[override-color]&down_color=[down-color]&down_message=[down-message]&label=[override-label]&logo=[named-logo]&logoColor=[logo-color]&style=[style]&up_color=[up-color]&up_message=[up-message]&url=[url])`,
      default_image_url:
        "https://img.shields.io/website?&down_color=red&down_message=down&label=website now&logoColor=white&style=flat&up_color=green&up_message=up&url=https%3A%2F%2Fshields.io",
      keywords: [
        "website",
        "status",
        "badge",
        "website status",
        "badge",
        "website status badge",
      ],
      placeholders: [
        {
          name: "URL",
          description: "The URL of the website.",
          replacer: "url",
        },
        {
          name: "Label",
          description: "The label of the badge.",
          replacer: "override-label",
          defaultValue: "website",

          optional: true,
        },
        {
          name: "Up message",
          description: "The message when the website is up.",
          replacer: "up-message",
          defaultValue: "up",

          optional: true,
        },
        {
          name: "Down message",
          description: "The message when the website is down.",
          replacer: "down-message",
          defaultValue: "down",

          optional: true,
        },
        {
          name: "Up color",
          description: "The color when the website is up.",
          replacer: "up-color",
          defaultValue: "green",

          optional: true,
        },
        {
          name: "Down color",
          description: "The color when the website is down.",
          replacer: "down-color",
          defaultValue: "red",

          optional: true,
        },
        {
          name: "Style",
          description: "The style of the badge.",
          replacer: "style",
          optional: true,
        },
        {
          name: "Override color",
          description: "The color of the badge.",
          replacer: "override-color",
          optional: true,
        },
        {
          name: "Named logo",
          description: "Example 'vercel'",
          replacer: "named-logo",
          optional: true,
        },
        {
          name: "Logo color",
          description: "The color of the logo.",
          replacer: "logo-color",
          optional: true,
        },
      ],
    },
  ],
}
