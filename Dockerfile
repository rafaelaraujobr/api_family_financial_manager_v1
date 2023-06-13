FROM node:18-alpine as development

WORKDIR /user/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN npx prisma generate
RUN yarn build
EXPOSE 3000
# CMD ["node", "dist/main"]