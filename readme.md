# COMPFEST 17 AI POWERED COOKING RECIPE APP
Transform your leftover ingredients into delicious, step-by-step recipes with the power of AI. Simply show ChefAI a picture of your ingredients or provide a list, and get a custom recipe in seconds.

## Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [API Usage](#api-usage)
  - [Upload Image to Get Ingredients](#1-upload-image-to-get-ingredients)
  - [Generate a Recipe from Ingredients](#2-generate-a-recipe-from-ingredients)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Note For Devs](#note-for-devs)
- [License](#license)

## About The Project

Ever stared into your fridge, full of random ingredients, with no idea what to make? ChefAI solves that problem. This application uses advanced AI models to identify ingredients from an image and generate creative, easy-to-follow recipes tailored to what you already have.

Our goal is to reduce food waste and make cooking more accessible and fun for everyone, regardless of their culinary experience.

## Features

-   **Ingredient Recognition from Images**: Upload a photo of your ingredients, and our AI vision model will identify them for you.
-   **AI-Powered Recipe Generation**: Provide a list of ingredients to generate a complete recipe, including instructions, cooking time, and serving suggestions.
-   **Customizable Cuisine**: Specify a type of cuisine (e.g., Italian, Mexican) to tailor the generated recipe to your tastes.
-   **RESTful API**: A simple and powerful API for easy integration into other applications.


## API Usage

You can test the endpoints using the interactive docs at `http://127.0.0.1:8000/docs` or via `curl`.

### 1. Upload Image to Get Ingredients

Upload an image file to identify ingredients.

-   **Endpoint**: `POST /upload-image/`
-   **Example `curl` command:**
    ```sh
    curl -X POST -F "file=@/path/to/your/image.jpg" http://your-server-ip/upload-image/
    ```

### 2. Generate a Recipe from Ingredients

Send a list of ingredients to generate a recipe.

-   **Endpoint**: `POST /recipe/`
-   **Request Body**:
    ```json
    {
      "ingredients": "chicken, rice, broccoli",
      "cuisine": "Italian"
    }
    ```
-   **Example `curl` command:**
    ```sh
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{"ingredients": "chicken, rice, broccoli", "cuisine": "Italian"}' \
      http://your-server-ip/recipe/
    ```

## Deployment

This application is designed for production deployment on a Linux VPS using the following stack:
-   **Nginx** as a reverse proxy.
-   **Gunicorn** as the application server to manage multiple Uvicorn workers.
-   **Systemd** to manage the Gunicorn service and ensure it runs continuously.

The repository includes `setup_fastapi.sh` and `setup_nginx.sh` scripts to automate the deployment process on a new Ubuntu/Debian server.

## Note for Devs

If the original files have been lost and you need to start over by cloning the repository, please note that the repo includes an encrypted **env.gpg** file. This file can be decrypted using **GPG** with the passphrase that was shared in the group chat.
to decrypt:
```sh
gpg --decrypt .env.gpg > .env
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
