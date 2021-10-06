# Stage 1
FROM node:14 as build-step

# This argument is used in the .npmrc. CircleCI will set this argument
# before running the docker build. When running on your local laptop,
# the argument must also be set
ARG BIT_DEV_AUTH_TOKEN

WORKDIR /app
COPY . /app

COPY src/.npmrc-ci /app/.npmrc

RUN yarn install
# --------------------------------------------------------------------------
# todo: Comment in the prisma/db lines below once more code has been added
# --------------------------------------------------------------------------
# RUN npx prisma -v
# RUN yarn update-db-schema

RUN yarn build

FROM node:14

# create appuser
ENV USER=appuser
ENV UID=10001

# see https://stackoverflow.com/a/55757473/12429735
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/app" \
    --shell "/sbin/bash" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"

# use an unprivileged user.
USER appuser:appuser

EXPOSE 8080

WORKDIR /app

COPY --from=build-step --chown=appuser:appuser /app/dist /app/dist
COPY --from=build-step --chown=appuser:appuser /app/node_modules /app/node_modules
COPY --from=build-step --chown=appuser:appuser /app/public /app/public
COPY --from=build-step --chown=appuser:appuser /app/.env /app/.env

CMD ["node", "dist/server.js"]

# See ./helm-orc/README.md for example on building and running docker image
