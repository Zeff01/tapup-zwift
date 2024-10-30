import { firebaseAuth } from "@/src/lib/firebase/config/firebase";

export const dynamic = "force-static";

export async function GET() {
  firebaseAuth.onAuthStateChanged((user) => {
    console.log(user);
  });

  return Response.json({ message: "Hello, Next.js!" });
}
