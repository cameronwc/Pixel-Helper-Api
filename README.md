# Pixel Helper Api

![build and test](https://github.com/cameronwc/pixel-helper-api/actions/workflows/main.yml/badge.svg)
![codeql](https://github.com/cameronwc/pixel-helper-api/actions/workflows/codeql.yml/badge.svg)
![snyk](https://github.com/cameronwc/pixel-helper-api/actions/workflows/snyk.yml/badge.svg)
![deploy](https://github.com/cameronwc/pixel-helper-api/actions/workflows/deploy.yml/badge.svg)
[![Docker Hub](https://img.shields.io/docker/cloud/build/cameronwc/pixel-helper-api?label=Docker&style=flat)](https://hub.docker.com/r/cameronwc/pixel-helper-api/builds)

## Requirements
For this project Nodejs and npm have to be installed on your system.

## Get Started
Clone the repo

Install Dependencies
```
npm i
```

Export your api keys.

```
PEXEL_API_KEY="your pexel api key"
UNSPLASH_API_KEY="your unsplash api key"
PIXABAY_API_KEY="pixababy api key"
```

Run Server
```
node index.js
```

## Make (docker)

```bash
make build
```

## Docker Compose

```bash
docker-compose build && docker-compose up
```

Browse to [localhost:3000](localhost:3000)

## Testing
This API is tested with mocha and chai

To run these test
```
npm test
```
