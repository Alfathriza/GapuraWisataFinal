// prisma/reset-and-seed.js
// Script untuk reset database, migrate, seed, dan migrate data

const { execSync } = require("child_process");
const path = require("path");

console.log("🔄 Starting database reset and setup...\n");

try {
  // Step 1: Reset database (drop all tables)
  console.log("📦 Step 1: Resetting database (dropping all tables)...");
  execSync("npx prisma migrate reset --force", {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
  });
  console.log("✅ Database reset completed\n");

  // Step 2: Run migrations
  console.log("📦 Step 2: Running migrations...");
  execSync("npx prisma migrate deploy", {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
  });
  console.log("✅ Migrations completed\n");

  // Step 3: Seed admin user
  console.log("📦 Step 3: Seeding admin user...");
  execSync("npm run seed", {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
  });
  console.log("✅ Admin user seeded\n");

  // Step 4: Migrate data with Supabase upload
  console.log("📦 Step 4: Migrating data and uploading images to Supabase...");
  execSync("npm run migrate-data", {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
  });
  console.log("✅ Data migration completed\n");

  console.log("🎉 All done! Database is ready.");
  console.log("\n📊 Summary:");
  console.log("   ✅ Database reset");
  console.log("   ✅ Migrations applied");
  console.log("   ✅ Admin user created");
  console.log("   ✅ All data migrated with images uploaded to Supabase");
} catch (error) {
  console.error("❌ Error during setup:", error.message);
  process.exit(1);
}

