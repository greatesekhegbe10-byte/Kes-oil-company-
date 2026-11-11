# KES Energy Services — Enterprise Firebase Setup & Deployment Guide

**Application:** KES Energy Services Enterprise Operations Platform  
**Architecture:** Next.js / React 19 + TypeScript + Tailwind CSS + Firebase v9+ Modular SDK  
**Target Project:** `kes-energy-services`

---

## 1. Firebase Project Overview

The KES platform utilizes Google Firebase for production-grade authentication, Cloud Firestore for ACID operations, Firebase Storage for encrypted engineering drawings, and Firebase App Check for DDoS protection.

### Verified Client Configuration
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCu9BlIW5lbtqgBDQAYOm0aFcx2aW699i8",
  authDomain: "kes-energy-services.firebaseapp.com",
  projectId: "kes-energy-services",
  storageBucket: "kes-energy-services.firebasestorage.app",
  messagingSenderId: "429868670257",
  appId: "1:429868670257:web:3452a1d5e657a2209d2410",
  measurementId: "G-V2WTC7GL63"
};
```

---

## 2. Environment Configuration

Copy `.env.example` to `.env` or `.env.local`:

```bash
# In project root
cp .env.example .env
```

### Environment Variables
| Variable | Description |
| :--- | :--- |
| `VITE_FIREBASE_API_KEY` | Public Firebase Web API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Domain for authentication redirects |
| `VITE_FIREBASE_PROJECT_ID` | `kes-energy-services` |
| `VITE_FIREBASE_STORAGE_BUCKET`| `kes-energy-services.firebasestorage.app` |
| `VITE_FIREBASE_APP_ID` | Web application client ID |
| `VITE_USE_FIREBASE_EMULATOR` | Set to `true` to route traffic to local emulators |
| `FIREBASE_ADMIN_PRIVATE_KEY` | (Server only) Admin SDK private key |

---

## 3. Firebase Console Activation Steps

### A. Authentication Setup
1. Open the [Firebase Console](https://console.firebase.google.com/project/kes-energy-services/authentication).
2. Click **Get Started**.
3. Under **Sign-in method**, enable **Email/Password**.
4. In **Settings > Authorized domains**, ensure your deployment domain (e.g. `localhost`, your Vercel URL, and `kes-energy-services.firebaseapp.com`) are listed.

### B. Cloud Firestore Activation
1. Navigate to **Firestore Database** in the console.
2. Click **Create database**.
3. Choose **Production mode** (security rules will be deployed via CLI).
4. Select location: `eur3 (europe-west)` or your designated regional data center.

### C. Firebase Storage Activation
1. Navigate to **Storage**.
2. Click **Get Started** in **Production mode**.
3. Confirm bucket location matching your Firestore database.

---

## 4. Deploying Rules and Indexes via Firebase CLI

Install the Firebase CLI if not already installed:
```bash
npm install -g firebase-tools
```

Authenticate with your Google account:
```bash
firebase login
```

Associate your workspace:
```bash
firebase use kes-energy-services
```

Deploy Firestore Security Rules, Storage Rules, and Composite Indexes:
```bash
# Deploy all rules and indexes simultaneously
firebase deploy --only firestore:rules,storage:rules,firestore:indexes
```

To deploy rules individually:
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules

# Deploy Indexes
firebase deploy --only firestore:indexes
```

---

## 5. Authoritative Administrator Bootstrap Procedure

In accordance with enterprise security standards, **administrative roles are never granted automatically via frontend registration**.

1. Register an account with your desired admin email (e.g. `admin@kesenergy.com`) using the application's Sign In / Register dialog.
2. Obtain your Service Account key from **Firebase Console > Project Settings > Service accounts > Generate new private key**. Save it as `serviceAccountKey.json` in the root folder (do not commit to git).
3. Execute the administrative bootstrap script:
```bash
node scripts/bootstrap-admin.cjs admin@kesenergy.com
```

The script will:
- Attach authoritative custom claims `{ role: 'SUPER_ADMIN', admin: true }`.
- Update the Firestore profile in `/users/{uid}`.
- Record an immutable security event in `/auditLogs`.

---

## 6. Predefined Test Accounts (Demonstration Environment)

All 7 enterprise roles can be simulated via the top **Enterprise Demo Controller** or logged in with the credentials below:

| Persona | Role | Email | Password |
| :--- | :--- | :--- | :--- |
| **Dr. Tari Lawson** | `SUPER_ADMIN` | `admin@kesenergy.com` | `Password123!` |
| **Emeka Okoro** | `MANAGEMENT` | `e.okoro@kesenergy.com` | `Password123!` |
| **Chinedu Okafor** | `BUSINESS_DEVELOPMENT` | `c.okafor@kesenergy.com` | `Password123!` |
| **Adebayo Ogunleye** | `PROJECT_MANAGER` | `a.ogunleye@kesenergy.com` | `Password123!` |
| **Folake Adeleke** | `PROCUREMENT_OFFICER` | `f.adeleke@kesenergy.com` | `Password123!` |
| **Tariere Briggs** | `CLIENT` (SEPLAT Energy) | `client@seplatenergy.com` | `Password123!` |
| **Capt. Kunle Da-Silva** | `SUPPLIER` (Atlantic Valve) | `vendor@atlanticvalve.ng` | `Password123!` |

---

## 7. Running the Firebase Emulator Suite

For offline development and automated security rules testing:

```bash
# Start Auth, Firestore, and Storage emulators with the Emulator UI on port 4000
firebase emulators:start
```

Set `VITE_USE_FIREBASE_EMULATOR=true` in your `.env` file to route browser client requests to `localhost:9099` (Auth), `localhost:8080` (Firestore), and `localhost:9199` (Storage).

---

## 8. Security Rules Architecture

### Firestore (`firestore.rules`)
- **Default Deny**: `allow read, write: if false;`
- **Ownership Verification**: Users can only access and update permitted profile fields; never their own `role`.
- **Client Isolation**: Corporate clients can read only their own enquiries (`resource.data.clientId == request.auth.uid`).
- **Supplier Isolation**: Vendors can view only their own company registration and direct purchase orders.
- **Immutability**: Audit logs in `/auditLogs` cannot be altered or removed by any user once recorded.

### Storage (`storage.rules`)
- Authenticated private downloads only.
- Strict size ceilings: Profile pictures (5MB), Standard documents (25MB), Engineering DWG CAD files (100MB).
- Strict MIME-type checking preventing executable uploads.

---

## 9. Production Checklist

- [x] Firebase SDK v9+ modular imports implemented.
- [x] Public credentials isolated in `.env` with Vite compatibility.
- [x] Email/password authentication with session persistence.
- [x] Role-Based Access Control enforced on frontend and backed by `firestore.rules`.
- [x] Audit logging on all critical authentication and status events.
- [x] Zero exposure of Firebase Admin secrets in client bundles.

