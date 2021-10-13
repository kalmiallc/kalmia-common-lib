# This is dockerfile for the API projects
# ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
# ▌ STEP 1: BUILD
# ▌ Used for building APP.
# ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
FROM node:16-alpine as build

# ╒═════════════════════════
# │ Enviroment & args
# ╘═════════════════════════

RUN apk add --no-cache git openssh
# Prepare files to get version
COPY package.json ./
COPY .git ./

ENV PACKAGE_VERSION '0.0.0'
ENV PACKAGE_NAME 'unknown'
ENV BUILD_VERSION 'unknown'
RUN export PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
RUN export PACKAGE_NAME=$(node -p -e "require('./package.json').name")
RUN export BUILD_VERSION=$(git rev-parse HEAD)

ENV RELEASE="$PACKAGE_VERSION-$BUILD_NUMBER-$BUILD_VERSION"

RUN rm -rf package.json .git

# Prepare readonly ssh access to repo. 
RUN mkdir ~/.ssh 
ARG AUTH_REPO_ACCESS_KEY
RUN echo "${AUTH_REPO_ACCESS_KEY}" > ~/.ssh/id_ed25519
RUN chmod 600 ~/.ssh/id_ed25519
RUN ssh-keyscan bitbucket.org >> ~/.ssh/known_hosts
RUN ssh -T git@bitbucket.org && if [ $? -eq 0 ]; then echo 'TEST OK'; else echo 'NO ACCESS TO REPO'; exit 1; fi;

# ╒═════════════════════════
# │ INSTALL NODE MODULES
# ╘═════════════════════════
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
COPY package.json ./
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN npm install --no-save && if [ $? -eq 0 ]; then echo 'INSTALL OK'; else echo 'INSTALL FAILED'; exit 1; fi;

# ╒═════════════════════════
# │ BUILD APP
# ╘═════════════════════════

# Add the source files, build and verify the project
ADD . .
RUN export BUILD_COMMIT=$(git rev-parse HEAD)
RUN echo 'Making build on commit' $BUILD_COMMIT 
RUN npm run build
RUN test -f ./dist/src/main.js


# This phase is skipped as it should be run from the docker compose file.
# CMD ["npm", "run test"]


# ╒═════════════════════════
# │ Build preparation - preparation for the prod step
# ╘═════════════════════════
FROM node:16-alpine as prod-prepare

# Node modules
COPY --from=build package.json tsconfig.build.json tsconfig.json ./
COPY --from=build /node_modules ./node_modules
COPY --from=build /src ./src

RUN npm run build:prod

RUN test -f ./dist/main.js



# ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
# ▌ STEP 2: PROD
# ▌ Setup prod run environment, separated from the build
# ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

FROM node:16-alpine as prod

RUN mkdir -p /api-app
WORKDIR /api-app

# Node modules
COPY --from=prod-prepare package.json tsconfig.build.json tsconfig.json ./
COPY --from=prod-prepare /node_modules ./node_modules


# App files
COPY --from=prod-prepare /dist ./dist

ENV HOST 0.0.0.0

# Expose port 80 by default
EXPOSE 80
EXPOSE 4445

# Run the container under "node" user by default
USER node

CMD ["npm", "run", "start:prod"]

