/**
 * KES ENERGY SERVICES — SECURE ADMINISTRATOR BOOTSTRAP PROCEDURE
 * 
 * Usage:
 *   node scripts/bootstrap-admin.cjs <target-user-email>
 * 
 * Requirements:
 *   Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY
 *   in your server environment or provide serviceAccountKey.json.
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const targetEmail = process.argv[2];

if (!targetEmail) {
  console.error('\x1b[31mError: Target user email required.\x1b[0m');
  console.log('Usage: node scripts/bootstrap-admin.cjs admin@kesenergy.com');
  process.exit(1);
}

// Initialize Admin SDK with credentials or serviceAccount.json
let serviceAccount = null;
const keyPath = path.resolve(__dirname, '../serviceAccountKey.json');

if (fs.existsSync(keyPath)) {
  serviceAccount = require(keyPath);
} else if (process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
  serviceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || 'kes-energy-services',
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
}

if (!serviceAccount) {
  console.log('\x1b[33mNotice: serviceAccountKey.json not detected.\x1b[0m');
  console.log('Using default project kes-energy-services or local emulator configuration.');
  try {
    admin.initializeApp({
      projectId: 'kes-energy-services',
    });
  } catch (err) {
    console.error('Initialization error:', err.message);
  }
} else {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'kes-energy-services',
  });
}

async function bootstrapAdmin() {
  console.log(`\x1b[36mInitiating bootstrap for:\x1b[0m ${targetEmail}`);

  try {
    const auth = admin.auth();
    const db = admin.firestore();

    // 1. Locate user in Firebase Authentication
    const user = await auth.getUserByEmail(targetEmail);
    console.log(`Found User: ${user.uid} (${user.email})`);

    // 2. Set Authoritative Custom Claims (SUPER_ADMIN)
    await auth.setCustomUserClaims(user.uid, {
      role: 'SUPER_ADMIN',
      admin: true,
      bootstrappedAt: new Date().toISOString(),
    });
    console.log('\x1b[32m✔ Firebase Auth Custom Claims set: { role: "SUPER_ADMIN", admin: true }\x1b[0m');

    // 3. Update Firestore Document
    const userRef = db.collection('users').doc(user.uid);
    await userRef.set(
      {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || 'Super Administrator',
        role: 'SUPER_ADMIN',
        accountStatus: 'active',
        emailVerified: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    console.log('\x1b[32m✔ Firestore user profile updated to SUPER_ADMIN role\x1b[0m');

    // 4. Record Immutable Audit Event
    await db.collection('auditLogs').add({
      actorUid: 'SYSTEM_BOOTSTRAP',
      actorName: 'CLI Bootstrap Procedure',
      action: 'ADMIN_PROVISIONED',
      resourceType: 'user',
      resourceId: user.uid,
      details: `Authoritative SUPER_ADMIN role granted to ${targetEmail}`,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('\x1b[32m✔ Audit log record created in /auditLogs collection\x1b[0m');

    console.log('\n\x1b[32m✔ SUCCESS: Target user is now officially recognized as Super Administrator.\x1b[0m');
  } catch (error) {
    console.error('\x1b[31mBootstrap Failed:\x1b[0m', error.message);
    if (error.code === 'auth/user-not-found') {
      console.log('Tip: The user must register an account first through the KES platform before being elevated to Super Admin.');
    }
  }
}

bootstrapAdmin();

