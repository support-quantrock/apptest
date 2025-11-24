# 🚀 Quick Start: Admin Dashboard

A complete guide to get your admin dashboard up and running in 10 minutes.

---

## 📋 Prerequisites

- Node.js installed
- Expo CLI installed (`npm install -g expo-cli`)
- Supabase account (free tier works)

---

## ⚡ 5-Minute Setup

### Step 1: Set Up Supabase Database

1. **Go to Supabase**: https://supabase.com/dashboard

2. **Create New Project**:
   - Click "New Project"
   - Name: "challenge-dashboard"
   - Database Password: (save this!)
   - Region: Choose closest to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Run Database Schema**:
   - In Supabase Dashboard, go to "SQL Editor"
   - Click "New Query"
   - Copy ALL contents from `supabase-schema.sql`
   - Paste and click "Run"
   - ✅ You should see "Success. No rows returned"

4. **Get API Keys**:
   - Go to Project Settings → API
   - Copy:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon/public key**: `eyJhbGc...`

### Step 2: Configure Your App

1. **Update .env file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit .env** and add your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Update config/supabase.config.ts**:
   ```typescript
   export const SUPABASE_CONFIG = {
     SUPABASE_URL: 'https://your-project.supabase.co',
     SUPABASE_ANON_KEY: 'your-anon-key-here',
   };
   ```

### Step 3: Install & Run

```bash
# Install dependencies (if not done)
npm install

# Start the app
npm run dev

# Or with Expo
EXPO_NO_TELEMETRY=1 npx expo start
```

### Step 4: Access Admin Dashboard

1. App will open - you'll see the **Admin Dashboard** as the home screen
2. Click **"+ New Program"** to create your first program
3. Fill in the form and save
4. Click on the program to manage days, lessons, and tests

---

## 🎯 What You Can Do Now

### ✅ Program Management
- ➕ Create new skill assessment programs
- ✏️ Edit program details
- 🗑️ Delete programs (with confirmation)
- 📊 View program statistics

### ✅ Day Management
- ➕ Add days to programs
- 📝 Set day titles and descriptions
- 🔒 Lock/unlock days
- 📋 View lessons and tests per day

### ✅ Lesson Management
- ➕ Create lessons for each day
- 📚 Add multiple pages to lessons
- 🎥 Add video URLs
- 🖼️ Add images to lesson pages
- ⏱️ Set duration and lesson type

### ✅ Test Management
- ➕ Create tests for each day
- ❓ Add multiple-choice questions
- ✅ Set correct answers
- 📊 Configure passing scores
- 🔁 Set max attempts

---

## 📝 Quick Example Workflow

### Creating Your First Program

1. **Click "New Program"** on dashboard
2. Fill in:
   ```
   Name: Financial Literacy 101
   Type: skill_assessment
   Description: Learn the basics of personal finance
   Duration: 30 days
   Difficulty: beginner
   ```
3. Click **Save**

### Adding a Day

1. **Open your program**
2. Click **"+ Add Day"**
3. Fill in:
   ```
   Day Number: 1
   Title: Introduction to Money Management
   Description: Learn what money is and how to manage it
   ```
4. Click **Save**

### Adding a Lesson

1. **Open the day**
2. Click **"+ Add Lesson"**
3. Fill in:
   ```
   Title: What is Money?
   Type: article
   Duration: 15 minutes
   Content: Money is a medium of exchange...
   ```
4. Click **Save**

### Adding a Test

1. **Open the day**
2. Click **"+ Add Test"**
3. Fill in:
   ```
   Title: Day 1 Quiz
   Type: quiz
   Duration: 20 minutes
   Passing Score: 70
   Max Attempts: 3
   ```
4. Click **Save**
5. Add questions to the test

---

## 🎨 Admin Dashboard Features

### Main Dashboard
- View all programs
- See program statistics (days, lessons, tests, users)
- Quick access to edit/delete
- Create new programs

### Program Details
- View program overview
- See all days in program
- Quick stats per day
- Manage days

### Day Details
- View day information
- List all lessons
- List all tests
- Quick add buttons
- Edit/delete items

---

## 🔍 Verifying Setup

### Check Database Connection

Run this in your app:

```typescript
import { testSupabaseConnection } from './config/supabase.config';

// Test connection
testSupabaseConnection();
// Should log: ✅ Supabase connection successful!
```

### Check Sample Data

After running the schema, you should have:
- ✅ 1 sample program: "Financial Literacy Fundamentals"
- ✅ 3 sample days
- ✅ All tables created
- ✅ All indexes created

View in Supabase:
```
Table Editor → programs → You should see 1 row
Table Editor → days → You should see 3 rows
```

---

## 🐛 Troubleshooting

### Error: "Cannot connect to Supabase"
**Solution**: Check your .env file has correct credentials

### Error: "Programs table does not exist"
**Solution**: Run the supabase-schema.sql in SQL Editor

### Error: "Invalid API key"
**Solution**: Make sure you're using the **anon/public** key, not the service_role key

### Error: "Cannot create program"
**Solution**: Check Supabase RLS (Row Level Security) is disabled for testing

---

## 🔐 Disabling RLS for Testing

In Supabase Dashboard:

1. Go to **Authentication** → **Policies**
2. For each table, click **"Disable RLS"** (for development only)
3. Or create policies to allow all operations

**Note**: For production, you should enable RLS and create proper policies!

---

## 📱 Switching to User View

To test the user-facing experience:

1. **Update App.tsx**:
   ```typescript
   initialRouteName="ProgramsList"  // Instead of "AdminDashboard"
   ```

2. **Restart the app**
3. You'll see the user view with your created programs

---

## 🎉 Next Steps

Now that your admin dashboard is working:

1. ✅ Create your first complete program with all days
2. ✅ Add lessons to each day
3. ✅ Add tests with questions
4. ✅ Test the user-facing screens
5. ✅ Deploy to production

---

## 📚 Additional Resources

- **Full Setup Guide**: See `ADMIN_DASHBOARD_SETUP.md`
- **Database Schema**: See `supabase-schema.sql`
- **API Documentation**: See `services/adminService.ts`
- **Types**: See `types/challenge.ts`

---

## 💡 Tips

- Use **Command/Ctrl + S** to save forms
- **Pull down** to refresh lists
- **Long press** for quick actions (coming soon)
- Use **search** to find programs quickly

---

## 🆘 Need Help?

1. Check the error in console
2. Verify Supabase connection
3. Check .env configuration
4. Review the schema setup
5. Test with the sample data first

---

## ✨ You're All Set!

Your admin dashboard is ready to manage challenge content. Start creating programs, days, lessons, and tests!

**Happy Building! 🚀**
