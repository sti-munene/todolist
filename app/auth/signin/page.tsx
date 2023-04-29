import { SignInForm } from "../../../components/forms/signInForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export const metadata = {
  title: "Todo List | Sign In",
  description: "Todo List Sign In Page",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="providers-wrapper w-full flex items-center justify-center">
      <SignInForm />
    </main>
  );
}

export default SignInPage;
