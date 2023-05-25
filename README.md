
# battery-support-vue3

The application to showcases a list of schools , categorized by the devices they are using, which needs battery replacement . The individual schools can also be checked for all the devices they have . more Information about a school can be found by clicking its banner.

Following env used for development

1. node v18.15.0
2. npm v9.5.0
3. Python 3.8.9
4. macos Montery 12.5.1
5. Vscode

used: vue3 (vite), pinia, axios, typescript, vitest/vue-test-utils


## Run following commands :
  cd battery-support-vue3
  npm install
  npm run format
  npm run dev

## bugs/issues faced:

  Cors error from the hosting server of json data file.


  ### Approach:

    Pinia:
        Prepared raw json structure of the schools object to create state variables.
        Based on this setup created working base pinia store .
        created states and functions that works like actions and getters in the store file.
        Created API for all schools, specific show details and search for the store.

    src:
        Folder structured having components for SchoolList and TabletList .

        SchoolList:
            Api returns a list of schools data which is passed to store. list of the filtered devices are sorted based on their battery health status.this list is iterated and passed to the view . used scss and flex. each school row can be clicked passing an id to TabletList.

        Models:
            Contains interfaces and types used for the json data and other pre-processed data used througout the application. 

        TabletsList:
            used pinia store to get list of devices for a certain school. which in turn reactively updates this page with the new set of tablets whose battery needs replacement.

        Service/School:
            performs functions for data processing, with many corner cases, return a list of tablets whose battery needs replacements . uses a helper to calculate the battery status for each device. 

        Header:
            contains logo and a link to get back to home from the details page

### The good

1. Code is completely type safe.
2. no veutify or bootstrap only scss and flex
3. Responsive
4. using pinia reactive store
5. separate components based approach
6. Architecture allows other features to be added in future
7. very sofisticated structure for data processing in service/helper/store ,are easily testable and reusable.

### Improvements (todo)

1. Data processing functions in service can be broken down to more simple functions . 
2. Global error handling
3. Separate component for each school in dashboard, footer
4. More test cases
5. Some responsive behaviors could improve
6. Some glitches in algorithm to calculate battery life, more corner cases need to be considered.


### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests 

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.
