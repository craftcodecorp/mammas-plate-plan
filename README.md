# Cardápio Fácil - Weekly Meal Planner

## Project info

A comprehensive weekly meal planning application designed to help users organize their meals, manage recipes, and optimize grocery shopping.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/00857f39-909f-4740-9ac4-a6da68cc485e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

### GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions. The workflow is defined in `.github/workflows/deploy.yml` and will build and deploy the application whenever changes are pushed to the `main` branch.

#### Environment Variables

Copy the `.env.example` file to create your own `.env` file with the necessary environment variables:

```sh
cp .env.example .env
```

Update the values in the `.env` file with your own API keys and configuration.

### Manual Deployment

To manually build and deploy the project:

```sh
# Build the project
npm run build

# Preview the build locally
npm run preview
```

## Monitoring & Analytics

### Custom Error Monitoring

The application uses a lightweight custom error logging solution that:

- Logs errors to the console during development
- Stores recent errors in localStorage (limited to 20 most recent)
- Optionally sends error logs to a custom endpoint

To configure the error logging endpoint:

```
# In your .env file
VITE_ERROR_LOG_ENDPOINT=/api/log-error
```

### Analytics & Testing

The application includes integrations for:

- Google Analytics for user behavior tracking
  - Configure with `VITE_GA_MEASUREMENT_ID` in your `.env` file
- Hotjar for heatmaps and session recordings
  - Configure with `VITE_HOTJAR_SITE_ID` in your `.env` file
- A/B testing with optional Amplitude integration
  - Configure with `VITE_AMPLITUDE_API_KEY` and `VITE_EXPERIMENT_API_KEY` in your `.env` file
  - See [A/B Testing Documentation](./docs/AB_TESTING.md) for detailed usage instructions
