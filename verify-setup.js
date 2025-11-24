#!/usr/bin/env node

/**
 * Setup Verification Script
 * Checks if all admin dashboard files are in place
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

console.log('\n' + colors.cyan + '🔍 Admin Dashboard Setup Verification' + colors.reset + '\n');

const requiredFiles = [
  {
    path: 'supabase-schema.sql',
    description: 'Database schema',
    category: 'Database',
  },
  {
    path: 'config/supabase.config.ts',
    description: 'Supabase configuration',
    category: 'Configuration',
  },
  {
    path: 'config/api.config.ts',
    description: 'API configuration',
    category: 'Configuration',
  },
  {
    path: '.env.example',
    description: 'Environment template',
    category: 'Configuration',
  },
  {
    path: 'services/adminService.ts',
    description: 'Admin CRUD service',
    category: 'Services',
  },
  {
    path: 'app/screens/admin/AdminDashboardScreen.tsx',
    description: 'Main admin dashboard',
    category: 'Admin Screens',
  },
  {
    path: 'app/screens/admin/ProgramDetailsScreen.tsx',
    description: 'Program details screen',
    category: 'Admin Screens',
  },
  {
    path: 'app/screens/admin/DayDetailsScreen.tsx',
    description: 'Day details screen',
    category: 'Admin Screens',
  },
  {
    path: 'types/challenge.ts',
    description: 'TypeScript types',
    category: 'Types',
  },
  {
    path: 'ADMIN_DASHBOARD_SETUP.md',
    description: 'Setup guide',
    category: 'Documentation',
  },
  {
    path: 'QUICKSTART_ADMIN.md',
    description: 'Quick start guide',
    category: 'Documentation',
  },
  {
    path: 'ADMIN_SUMMARY.md',
    description: 'Complete summary',
    category: 'Documentation',
  },
];

let allPresent = true;
let currentCategory = '';

requiredFiles.forEach((file) => {
  if (file.category !== currentCategory) {
    currentCategory = file.category;
    console.log(colors.blue + `\n📁 ${currentCategory}` + colors.reset);
  }

  const fullPath = path.join(__dirname, file.path);
  const exists = fs.existsSync(fullPath);

  if (exists) {
    console.log(colors.green + '  ✅' + colors.reset + ` ${file.description}`);
  } else {
    console.log(colors.red + '  ❌' + colors.reset + ` ${file.description} (${file.path})`);
    allPresent = false;
  }
});

console.log('\n' + colors.blue + '📦 Dependencies' + colors.reset);

// Check package.json dependencies
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  const deps = packageJson.dependencies || {};

  const requiredDeps = [
    { name: '@supabase/supabase-js', desc: 'Supabase client' },
    { name: 'axios', desc: 'HTTP client' },
    { name: '@react-navigation/native', desc: 'Navigation' },
  ];

  requiredDeps.forEach((dep) => {
    if (deps[dep.name]) {
      console.log(colors.green + '  ✅' + colors.reset + ` ${dep.desc} (${deps[dep.name]})`);
    } else {
      console.log(colors.red + '  ❌' + colors.reset + ` ${dep.desc} - Missing!`);
      allPresent = false;
    }
  });
} catch (error) {
  console.log(colors.red + '  ❌ Could not read package.json' + colors.reset);
  allPresent = false;
}

// Check .env file
console.log('\n' + colors.blue + '⚙️  Configuration' + colors.reset);

if (fs.existsSync(path.join(__dirname, '.env'))) {
  console.log(colors.green + '  ✅ .env file exists' + colors.reset);

  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');

  if (envContent.includes('your_supabase')) {
    console.log(colors.yellow + '  ⚠️  .env file needs Supabase credentials' + colors.reset);
  } else {
    console.log(colors.green + '  ✅ .env file configured' + colors.reset);
  }
} else {
  console.log(colors.yellow + '  ⚠️  .env file not found (copy from .env.example)' + colors.reset);
}

// Final summary
console.log('\n' + '═'.repeat(60) + '\n');

if (allPresent) {
  console.log(colors.green + '🎉 All files are present!' + colors.reset);
  console.log('\n' + colors.cyan + '📋 Next Steps:' + colors.reset);
  console.log('   1. Set up Supabase project');
  console.log('   2. Run supabase-schema.sql in Supabase SQL Editor');
  console.log('   3. Update .env with your Supabase credentials');
  console.log('   4. Update config/supabase.config.ts');
  console.log('   5. Run: npm run dev');
  console.log('\n   📖 Read: QUICKSTART_ADMIN.md for detailed instructions\n');
} else {
  console.log(colors.red + '❌ Some files are missing!' + colors.reset);
  console.log(colors.yellow + '\nPlease ensure all required files are created.' + colors.reset + '\n');
}

console.log('═'.repeat(60) + '\n');
