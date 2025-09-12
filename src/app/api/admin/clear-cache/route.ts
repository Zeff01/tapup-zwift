import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // This endpoint is just for documentation
  // The actual cache clearing happens on the client side
  
  return NextResponse.json({
    message: "To clear React Query cache, run this in your browser console:",
    code: `
// Clear all React Query cache
const queryClient = window.__REACT_QUERY_DEVTOOLS__?.queryClient || 
  Object.values(window).find(v => v?.queryClient)?.queryClient;
  
if (queryClient) {
  queryClient.clear();
  console.log('✅ React Query cache cleared!');
  window.location.reload();
} else {
  console.error('❌ Could not find React Query client');
}
    `,
    alternativeMethod: "Hard refresh the page: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)"
  });
}