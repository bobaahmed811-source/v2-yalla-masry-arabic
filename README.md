# Yalla Masry Academy - Rebuilt

This project has been rebuilt from scratch to ensure stability and a clean foundation for future development.

## How to Deploy (The ONLY Way)

The `404 Not Found` error you are seeing is a **deployment issue, not a code issue.** To fix this, you must correctly push your code to a **new, empty** GitHub repository and then deploy that repository to Vercel. There are no other shortcuts.

### Why Must We Use GitHub + Vercel?

Think of Vercel as a "master builder" and GitHub as the "official blueprint". Vercel does not just host files; it **builds** the application from the blueprint. Uploading files directly or using the wrong platform (like GitHub Pages for a dynamic app) is like giving the builder a pile of bricks and wood without instructions. Deploying from GitHub to Vercel gives the builder the exact blueprint it needs to construct the palace correctly. This is the professional standard for all modern web applications like this one.

### Step 1: Create a NEW, EMPTY GitHub Repository

1.  Go to [https://github.com/new](https://github.com/new).
2.  Give your project a name (e.g., `yalla-masry-kingdom`).
3.  **CRITICAL:** DO NOT initialize it with a README, .gitignore, or license. It must be **completely empty**.
4.  Copy the repository URL it gives you (e.g., `https://github.com/YourUsername/your-repository-name.git`).

### Step 2: Push Your Local Code to the New Repository

Open your Terminal (or Command Prompt) **inside your project folder** and run these commands one by one.

```sh
# Initializes a new Git repository. The -b main sets the default branch to 'main'.
git init -b main

# Adds all your project files to be tracked by Git.
git add .

# Creates a saved snapshot of your code.
git commit -m "Initial commit of the complete project"

# IMPORTANT: If you get an error "remote origin already exists", run this command first:
# git remote remove origin

# Links your local project to the empty GitHub repository.
# PASTE THE URL YOU COPIED FROM GITHUB HERE.
git remote add origin https://github.com/YourUsername/your-repository-name.git

# Pushes your code to GitHub.
git push -u origin main
```

### Step 3: Deploy to Vercel

1.  Log in to [Vercel](https://vercel.com).
2.  **Delete the old, broken project.** This is essential to start fresh.
3.  Click "Add New..." -> "Project".
4.  Find and "Import" your **new** GitHub repository (the one you just created).
5.  **CRITICAL STEP: Fix the Project Name**
    *   You will be on the "Configure Project" screen.
    *   You may see an error about the name being used. This is a Vercel bug.
    *   Find the **"Project Name"** field and change it to something simple and new, like `yalla-masry-academy`.
    *   **See this image for the exact location of the field you need to change:**
    *   ![Vercel Project Name Field](https://storage.googleapis.com/stedi-assets/yalla-masry/vercel-project-name-fix.png)
6.  Click "Deploy". Vercel will now build the project correctly from the blueprint.

This process, followed exactly, will solve the `404` error.

## Deployment Philosophy (For the Developer)

This project is under active, iterative development. The initial deployment is the most critical step. Once the project is successfully deployed for the time and linked to the domain, future updates will be pushed to the GitHub repository. Vercel will automatically detect these pushes and deploy the new changes, allowing the application to grow and evolve seamlessly. Your primary task is to establish this initial, stable deployment pipeline.
