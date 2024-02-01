## Acebook MERN Template

In this project, you are task with working on an existing application. A
significant part of the challenge will be to familiarise yourself with the
codebase you've inherited, as you work to **improve and extend** it.

### Important after adding a new module / Check after commits

Rerun 
```shell
npm install
``` 
after commits

### Structure

This repo contains two applications:

- A frontend React App
- A backend api server

These two applications will communicate through HTTP requests, and need to be
run separately.

### Documentation

[More documentation of the codebase and its architecture can be found here.](./DOCUMENTATION.md)
It's recommended you all read the suggested docs _after making sure the whole
setup below worked for everyone_. Then work together on a diagram describing how
the application works.

### Card wall

REPLACE THIS TEXT WITH A LINK TO YOUR CARD WALL

### Quickstart

### Install Node.js

If you haven't already, make sure you have node and NVM installed.

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), (`20.5.0` at
   time of writing).
   ```
   nvm install 20
   ```

### Set up your project

1. Have one team member fork this repository
2. Rename the fork to `acebook-<team name>`
3. Every team member clone the fork to their local machine
4. Install dependencies for both the `frontend` and `api` applications:
   ```
   cd frontend
   npm install
   cd ../api
   npm install
   ```
5. Install an ESLint plugin for your editor, for example
   [ESLint for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
6. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   ```
   _Note:_ If you see a message that says
   `If you need to have mongodb-community@6.0 first in your PATH, run:`, follow
   the instruction. Restart your terminal after this.
7. Start MongoDB

   ```
   brew services start mongodb-community@6.0
   ```

### Setting up environment variables.

We need to create two `.env` files, one in the frontend and one in the api.

#### Frontend

Create a file `frontend/.env` with the following contents:

```
VITE_BACKEND_URL="http://localhost:3000"
```

#### Backend

Create a file `api/.env` with the following contents:

```
MONGODB_URL="mongodb://0.0.0.0/acebook"
NODE_ENV="development"
JWT_SECRET="secret"
```

For an explanation of these environment variables, see the documentation.

### How to run the server and use the app

1. Start the server application (in the `api` directory) in dev mode:

```
; cd api
; npm run dev
```

2. Start the front end application (in the `frontend` directory)

In a new terminal session...

```
; cd frontend
; npm run dev
```

You should now be able to open your browser and go to
`http://localhost:3000/signup` to create a new user.

Then, after signing up, you should be able to log in by going to
`http://localhost:3000/login`.

After logging in, you won't see much but you can create posts using PostMan and
they should then show up in the browser if you refresh the page.

# Guide for using Git/GitHub

## 1.  Add all your files, commit and push to your branch.

When in the branch you're working in, and you're happy with all your changes, use the following:
```shell
git add .
git commit -m "Your commit message"
git push
```

## 2. Checkout to main and pull any changes from main

Switch to the main branch and pull any changes from there:
```
git checkout main

git pull origin main
```

For example:
```shell
➜  makers-007-engineering-project-1 git:(story-2-list-spaces) git checkout main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
➜  makers-007-engineering-project-1 git:(main) git pull
remote: Enumerating objects: 66, done.
remote: Counting objects: 100% (62/62), done.
remote: Compressing objects: 100% (28/28), done.
remote: Total 42 (delta 23), reused 33 (delta 14), pack-reused 0
Unpacking objects: 100% (42/42), 9.66 KiB | 309.00 KiB/s, done.
From https://github.com/JonnySB/makers-007-engineering-project-1
   e548da6..086f6bf  branch_user_story1 -> origin/branch_user_story1
   f245360..eb5efea  story_7            -> origin/story_7
Already up to date.
```

## 3. Checkout to your branch and merge it with the main branch

Switch to your branch and merge it with the main branch.
```shell
git checkout your-branch-name

git fetch
git merge origin/main
```

For example:
```shell
➜  makers-007-engineering-project-1 git:(main) git checkout story-2-list-spaces
Switched to branch 'story-2-list-spaces'
Your branch is up to date with 'origin/story-2-list-spaces'.
➜  makers-007-engineering-project-1 git:(story-2-list-spaces) git fetch
➜  makers-007-engineering-project-1 git:(story-2-list-spaces) git merge origin/main
Merge made by the 'ort' strategy.
 lib/booking.py        | 15 +++++++++++++--
 lib/users.py          | 12 ++++++++++++
 tests/test_booking.py | 19 +++++++++++++++++++
 3 files changed, 44 insertions(+), 2 deletions(-)
 create mode 100644 lib/users.py
 create mode 100644 tests/test_booking.py
```

## 4. Retest all your code with the new changes from main

Once you've merged your branch with the main, open your virtual environment and retest all your code with **pytest** and also **checking the html pages are working appropriately**.

For example:
```shell
➜  makers-007-engineering-project-1 git:(story-2-list-spaces) pipenv shell
Launching subshell in virtual environment...
 . /Users/mattwshepherd/.local/share/virtualenvs/makers-007-engineering-project-1-Tkx7Kyu9/bin/activate
➜  makers-007-engineering-project-1 git:(story-2-list-spaces)  . /Users/mattwshepherd/.local/share/virtualenvs/makers-007
-engineering-project-1-Tkx7Kyu9/bin/activate
(makers-007-engineering-project-1) ➜  makers-007-engineering-project-1 git:(story-2-list-spaces) pytest
================================================== test session starts ==================================================
platform darwin -- Python 3.11.2, pytest-7.4.3, pluggy-1.3.0
rootdir: /Users/mattwshepherd/Documents/MakersCode/06_engineering_project_1/makers-007-engineering-project-1
plugins: xprocess-0.23.0, playwright-0.4.3, base-url-2.0.0
collected 8 items

tests/test_app.py .                                                                                               [ 12%]
tests/test_booking.py ..                                                                                          [ 37%]
tests/test_database_connection.py .                                                                               [ 50%]
tests/test_space.py ...                                                                                           [ 87%]
tests/test_space_repository.py .                                                                                  [100%]

=================================================== 8 passed in 1.90s ==================================================
➜  makers-007-engineering-project-1 git:(story-2-list-spaces)  . /Users/mattwshepherd/.local/share/virtualenvs/makers-007
-engineering-project-1-Tkx7Kyu9/bin/activate
(makers-007-engineering-project-1) ➜  makers-007-engineering-project-1 git:(story-2-list-spaces) python app.py
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5001
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 114-236-802
127.0.0.1 - - [10/Jan/2024 10:54:48] "GET /spaces?vscodeBrowserReqId=1704884088786 HTTP/1.1" 200 -
^C%
```

If you're happy and there are no changes, exit your virtual environment.

For example:
```shell
(makers-007-engineering-project-1) ➜  makers-007-engineering-project-1 git:(story-2-list-spaces) exit
```

If there were changes, **repeat step 1** and do another pull to check there aren't any changes from main.

## 5. Push your final changes

Push your final changes when you're happy.

```shell
git push origin your-branch-name
```

Or if you're in your branch, just use
```shell
git push
```

## 6. Open up a pull request

If you've successfully completed **steps 1-5**, and would like your branch to be merged onto the main branch, open up a **pull request** and ask for your team to review it.

>[!CAUTION] 
>Make sure you do not just merge the changes FROM YOUR BRANCH to MAIN yourself! Ensure everyone has reviewed and approved your code first

If there are any issues with your code, make the appropriate changes and **repeat steps 1-5.**

>[!NOTE]
>If you have opened a pull request, any commits after that will be shown in that pull request so ensure your pull request is reviewed before you continue working on that branch.

If everything is approved and you merge your branch to the main branch, drop a message in the Slack channel to notify everyone to pull these changes.

## 7. How to revert to old commits when app breaks (locally)

Step 1.
To see all previous commits:
```shell
git logs
```
or
To see all previous commits from the current user:
```shell
git reflog
```

Step 2.
Reset the branch to last working version using the commit hash of the commit you want to revert to ( the one before the issues )
```shell
git reset --hard <commit_hash>
```