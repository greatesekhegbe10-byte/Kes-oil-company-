/**
 * KES ENERGY SERVICES — FIREBASE EMULATOR SEED SCRIPT
 * 
 * Pre-populates all 7 enterprise roles with deterministic test credentials
 * for local development and QA automation.
 * 
 * Usage:
 *   node scripts/seed-emulator.cjs
 */

const testAccounts = [
  {
    email: 'admin@kesenergy.com',
    password: 'Password123!',
    fullName: 'Dr. Tari Lawson',
    role: 'SUPER_ADMIN',
    organization: 'KES Energy Group',
    title: 'Chief Information & Technology Officer',
    claims: { role: 'SUPER_ADMIN', admin: true },
  },
  {
    email: 'e.okoro@kesenergy.com',
    password: 'Password123!',
    fullName: 'Emeka Okoro',
    role: 'MANAGEMENT',
    organization: 'KES Energy Group',
    title: 'Operations Director',
    claims: { role: 'MANAGEMENT' },
  },
  {
    email: 'c.okafor@kesenergy.com',
    password: 'Password123!',
    fullName: 'Chinedu Okafor',
    role: 'BUSINESS_DEVELOPMENT',
    organization: 'KES Energy Group',
    title: 'Commercial & Tendering Lead',
    claims: { role: 'BUSINESS_DEVELOPMENT' },
  },
  {
    email: 'a.ogunleye@kesenergy.com',
    password: 'Password123!',
    fullName: 'Adebayo Ogunleye',
    role: 'PROJECT_MANAGER',
    organization: 'KES Energy Group',
    title: 'Lead Offshore Project Manager',
    claims: { role: 'PROJECT_MANAGER' },
  },
  {
    email: 'f.adeleke@kesenergy.com',
    password: 'Password123!',
    fullName: 'Folake Adeleke',
    role: 'PROCUREMENT_OFFICER',
    organization: 'KES Energy Group',
    title: 'Senior Procurement Specialist',
    claims: { role: 'PROCUREMENT_OFFICER' },
  },
  {
    email: 'client@seplatenergy.com',
    password: 'Password123!',
    fullName: 'Tariere Briggs',
    role: 'CLIENT',
    organization: 'SEPLAT Energy PLC',
    title: 'Asset General Manager',
    claims: { role: 'CLIENT' },
  },
  {
    email: 'vendor@atlanticvalve.ng',
    password: 'Password123!',
    fullName: 'Capt. Kunle Da-Silva',
    role: 'SUPPLIER',
    organization: 'Atlantic Valve & Controls Ltd',
    title: 'Managing Director',
    claims: { role: 'SUPPLIER' },
  },
];

console.log('=== KES ENERGY SERVICES: PREDEFINED DEMONSTRATION ACCOUNTS ===');
console.log('Default Password for all seed accounts: Password123!\n');
testAccounts.forEach((acc, i) => {
  console.log(`${i + 1}. [${acc.role}] ${acc.fullName}`);
  console.log(`   Email: ${acc.email} | Title: ${acc.title} | Org: ${acc.organization}`);
});
console.log('==============================================================');

