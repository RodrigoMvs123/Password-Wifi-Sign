# Password - Cloud WiFi Signs

A modern e-commerce platform allowing customers to design and purchase custom cloud-shaped WiFi sign plates. The application features a conversational UI and integrates with Google's Gemini 2.5 Flash AI to generate creative, business-themed WiFi passwords.

Project Preview
(https://password-wifi-sign.vercel.app/)

## 🚀 Features

- **Product Customization**:
  - Real-time visual preview of the cloud plate.
  - Manual password entry.
  - **AI-Powered Generation**: Uses Google Gemini 2.5 Flash to generate witty, business-specific passwords (e.g., for cafes, gyms, homes).
- **Shopping Cart**:
  - Persistent cart state using LocalStorage.
  - Add, remove, and update quantities.
- **Checkout Flow**:
  - User-friendly multi-step checkout.
  - Form validation.
  - Email integration for order confirmation (via EmailJS).
- **Responsive Design**: Fully responsive layout built with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (Gemini 2.5 Flash)
- **Routing**: React Router DOM
- **Services**: EmailJS (for transactional emails)

## 📦 Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory of your project. You can use `.env.example` as a reference.

```bash
cp .env.example .env
```

Open the `.env` file and add your API keys:

```env
# Google Gemini API Key (Required for AI features)
# Get one here: https://aistudio.google.com/app/apikey
API_KEY=your_google_gemini_api_key

# EmailJS Configuration (Optional - for order emails)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

> **Note:** The project contains a fallback API key for demonstration purposes, but it is recommended to use your own for production or heavy testing.

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🏗️ Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate static files in the `dist` directory.

## 📂 Project Structure

```
src/
├── components/      # UI Components (Sidebar, Customizer, Cart, etc.)
├── services/        # API integrations (Gemini AI, EmailJS)
├── store/           # State management (Cart Context)
├── types/           # TypeScript definitions
├── styles/          # Global styles
├── App.tsx          # Main application component
└── main.tsx         # Entry point
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
