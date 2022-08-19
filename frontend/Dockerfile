FROM node:lts AS development

ENV CI=false
ENV PORT=3000
ENV SKIP_PREFLIGHT_CHECK=true
ENV ESLINT_NO_DEV_ERRORS=true

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci
RUN node -v
COPY . /code

CMD [ "npm", "start" ]

FROM development AS builder

RUN npm run build

FROM nginx:1.13-alpine

COPY --from=builder /code/build /usr/share/nginx/html
