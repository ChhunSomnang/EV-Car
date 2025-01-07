import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation"; // Use next/navigation for app router

export default function SellingButton() {
  const { user } = useUser(); // Auth0 user object
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      router.push("/sell"); // Navigate to the sell page if the user is logged in
    } else {
      router.push("/api/auth/login"); // Redirect to Auth0 login page if not logged in
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white text-primary py-2 px-4 rounded shadow text-black"
    >
      Start Selling
    </button>
  );
}
