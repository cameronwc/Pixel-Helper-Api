FROM node:14-alpine AS test
WORKDIR package
COPY . .
RUN npm run lint 
CMD npm run test

FROM node:14-buster-slim
USER node
WORKDIR package
COPY --from=test /package .
CMD npm run start