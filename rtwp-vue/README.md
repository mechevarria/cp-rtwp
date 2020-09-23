<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [demo-nginx-vue](#demo-nginx-vue)
  - [Integration and Links](#integration-and-links)
  - [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
  - [Run as docker container](#run-as-docker-container)
  - [Deploy to SAP Cloud Platform](#deploy-to-sap-cloud-platform)
    - [Docker](#docker)
    - [Buildpack](#buildpack)
    - [Customize configuration](#customize-configuration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# demo-nginx-vue

Sample web application integrating bootstrap based coreui with [Vue](https://vuejs.org/). Initial scafold done with Vue CLI. The project can be deployed as a [docker](https://docs.docker.com/install/) container or pushed directly with a [buildpack](https://docs.cloudfoundry.org/buildpacks/nginx/index.html) to [SAP Cloud Platform](https://www.sap.com/products/cloud-platform.html)

![form](screenshots/form.png)

## Integration and Links

* [Vue cli](https://cli.vuejs.org/) used to generate this project
* [Style Guide](https://vuejs.org/v2/style-guide/) for Vue. Attempting to follow as best as possible
* [CoreUI Bootstrap](https://coreui.io) theme
* [Bootstrap-Vue](https://bootstrap-vue.org/) components
* [Vue Router](https://router.vuejs.org/) for view management
* [Vuex](https://vuex.vuejs.org/) for state management
* [vue-mobile-detection](https://github.com/ajerez/vue-mobile-detection) for checking mobile state
* [axios](https://github.com/axios/axios) as http client
* [jsonplaceholder](https://jsonplaceholder.typicode.com/) for sample table data

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

* The server will be running on [http://localhost:4200](http://localhost:4200)

### Compiles and minifies for production
```
npm run build
```

## Run as docker container

>You can create a public registry with security scanning for free at [Quay.io](https://quay.io)

* Build and push the image with this script. You will have to edit the quay.io registry endpoint for the push command to work
```bash
docker-build.sh
```

* Run the continer with this script
```bash
docker-run.sh
```

## Deploy to SAP Cloud Platform

>You can create an account for free at [SAP Cloud Platform](https://www.sap.com/products/cloud-platform.html)

* Make sure you have the [Cloud Foundry Command Line Interface (cf CLI)](https://docs.cloudfoundry.org/cf-cli/) installed

* Update the `cf-login.sh` script with the values found in the SAP Cloud Foundry Cockpit. Then run the script to login.

```bash
cf-login.sh
```

![image.png](screenshots/cf-cockpit.png)


### Buildpack

* Push your code directly without the need of a container registry with the following commands (make sure you have done a build ahead of time)


```bash
cf-push-buildpack.sh
```

* You will find a url to your deployed application in the SAP Cloud Foundry Cockpit.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
