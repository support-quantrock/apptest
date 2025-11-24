# 🎯 How to Access the Admin Dashboard

## Current Status

✅ Admin Dashboard is **SET UP** and ready to use!
✅ App starts with Admin Dashboard as the **home screen**
⚠️ Supabase configuration needed to see data

---

## 📱 How to Access

### The Admin Dashboard loads automatically when you start the app!

```bash
npm run dev
```

Then access it via:

### **Option 1: Web Browser** (Easiest)
1. Wait for Metro bundler to start
2. Press `w` for web
3. Your browser opens automatically at: `http://localhost:8081`
4. **Admin Dashboard appears!**

### **Option 2: Expo Go App** (Mobile)
1. Install Expo Go on your phone
2. Scan the QR code shown in terminal
3. **Admin Dashboard appears!**

### **Option 3: iOS Simulator**
1. Press `i` for iOS simulator
2. **Admin Dashboard appears!**

### **Option 4: Android Emulator**
1. Press `a` for Android emulator
2. **Admin Dashboard appears!**

---

## 🖥️ What You'll See

### Before Supabase Setup:
You'll see a **Setup Required** screen with:
- ⚙️ Setup instructions
- 🔄 Retry Connection button
- Link to Test API Connection
- Step-by-step Supabase setup guide

### After Supabase Setup:
You'll see the **Admin Dashboard** with:
- List of all programs
- + New Program button
- Edit/Delete buttons per program
- Statistics (days, lessons, tests, users)

---

## 🚀 Quick Setup to See Data

If you see the "Setup Required" screen, follow these quick steps:

### 1. Create Supabase Project (2 minutes)
```
1. Go to: https://supabase.com/dashboard
2. Click "New Project"
3. Fill in: Name, Password, Region
4. Click "Create"
5. Wait 2-3 minutes
```

### 2. Run Database Schema (1 minute)
```
1. In Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Copy ALL contents from: supabase-schema.sql
4. Paste and click "Run"
5. See "Success. No rows returned"
```

### 3. Get API Keys (30 seconds)
```
1. Project Settings → API
2. Copy:
   - Project URL (https://xxxxx.supabase.co)
   - anon/public key (eyJhbGc...)
```

### 4. Update Configuration (1 minute)

Edit `.env` file:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Edit `config/supabase.config.ts`:
```typescript
export const SUPABASE_CONFIG = {
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key-here',
};
```

### 5. Restart App (30 seconds)
```bash
# Stop the app (Ctrl+C)
npm run dev
# Press 'w' for web
```

**✅ Admin Dashboard now shows with sample data!**

---

## 🔗 There is NO URL Route

**Important**: This is a React Native app, not a traditional web app.

❌ No URLs like: `/admin` or `/dashboard`
✅ Navigation works through: **Screen Names**

The admin dashboard is the **initial/home screen**, so it loads automatically.

### Screen Routes:
```
AdminDashboard      ← Home screen (loads first)
  ├─> ProgramDetails
  │    └─> DayDetails
  ├─> TestConnection
  └─> ProgramsList
```

---

## 🎨 What the Admin Dashboard Does

### Main Features:
- **View Programs**: See all challenge programs
- **Create Programs**: Add new programs (form to be added)
- **Edit Programs**: Modify program details (form to be added)
- **Delete Programs**: Remove programs with confirmation
- **View Statistics**: Days, lessons, tests, user counts
- **Navigate**: Click programs → days → lessons/tests

### Current Screens Available:
1. ✅ **Admin Dashboard** - Main program list
2. ✅ **Program Details** - Manage days within program
3. ✅ **Day Details** - Manage lessons and tests
4. ✅ **Test Connection** - Verify API connection

---

## 🐛 Troubleshooting

### Issue: "Setup Required" screen appears
**Solution**: Follow the 5-minute setup above

### Issue: App not starting
**Solution**:
```bash
# Clear cache and restart
rm -rf node_modules/.cache
npm run dev
```

### Issue: "Failed to load programs"
**Solution**: Check Supabase credentials in `.env`

### Issue: Blank screen
**Solution**: Check console for errors
```bash
# In terminal, look for error messages
# In browser, open DevTools (F12) → Console
```

---

## 📊 Sample Data

After running the schema, you'll have:
- ✅ 1 sample program: "Financial Literacy Fundamentals"
- ✅ 3 sample days
- ✅ All tables created with relationships

This lets you test the dashboard immediately!

---

## 💡 Pro Tips

1. **Use Web First**: Easiest for testing - just press `w`
2. **Check Console**: Errors show in terminal and browser console
3. **Disable RLS**: For development, disable Row Level Security in Supabase
4. **Sample Data**: Use provided sample to test before creating your own
5. **Refresh Data**: Pull down on screens to refresh

---

## 🎯 Summary

**To access the Admin Dashboard:**

1. Run: `npm run dev`
2. Press: `w` (for web)
3. Browser opens automatically
4. Admin Dashboard appears!

If you see "Setup Required":
- Follow the 5-minute Supabase setup
- Restart the app
- Dashboard loads with sample data!

**You're ready to manage your challenge content! 🚀**

---

## 📖 Need More Help?

- **Quick Setup**: See `QUICKSTART_ADMIN.md`
- **Complete Guide**: See `ADMIN_DASHBOARD_SETUP.md`
- **Full Summary**: See `ADMIN_SUMMARY.md`
- **Verify Setup**: Run `node verify-setup.js`

---

**The admin dashboard is at your fingertips! Just start the app and it's there! 🎉**
