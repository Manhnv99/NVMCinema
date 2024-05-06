FROM node:18-alpine
WORKDIR /fe
COPY public/ /fe/public
COPY src/ /fe/src
COPY package-lock.json /fe
COPY package.json /fe
RUN npm install
COPY index.html /fe
COPY .eslintrc.cjs /fe
COPY postcss.config.js /fe
COPY tailwind.config.js /fe
COPY vite.config.js /fe
CMD ["npm", "run","dev"]