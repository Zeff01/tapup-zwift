#!/usr/bin/env node

// Script to fix transaction data
// Run with: node scripts/fix-transaction-data.js

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function runFix(action) {
  console.log(`\nRunning: ${action}...`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/admin/fix-transaction-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add auth headers if needed
      },
      body: JSON.stringify({ action })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `Failed with status ${response.status}`);
    }
    
    console.log('Result:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error(`Error running ${action}:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('=== Transaction Data Fix Script ===\n');
  
  try {
    // Step 1: Analyze current state
    console.log('Step 1: Analyzing current data...');
    const analysis = await runFix('analyze');
    
    // Step 2: Fix statuses if needed
    if (analysis.analysis.byStatus['to-ship'] || 
        analysis.analysis.byStatus['shipping'] || 
        analysis.analysis.byStatus['delivered']) {
      console.log('\nStep 2: Fixing transaction statuses...');
      await runFix('fix-statuses');
    } else {
      console.log('\nStep 2: No status fixes needed');
    }
    
    // Step 3: Fix missing customer data if needed
    if (analysis.analysis.missingReceiver > 0 || analysis.analysis.emptyTransactions > 0) {
      console.log('\nStep 3: Fixing missing customer data...');
      await runFix('fix-missing-customers');
    } else {
      console.log('\nStep 3: No customer data fixes needed');
    }
    
    // Step 4: Re-analyze to confirm fixes
    console.log('\nStep 4: Re-analyzing after fixes...');
    await runFix('analyze');
    
    console.log('\n✅ All fixes completed successfully!');
  } catch (error) {
    console.error('\n❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}