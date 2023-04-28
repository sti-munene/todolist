import { SignInForm } from "../../../components/forms/signInForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export const metadata = {
  title: "Todo List | Sign In",
  description: "Todo List Sign In Page",
};

async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="providers-wrapper w-full flex items-center justify-center">
      <SignInForm />
    </div>
  );
}

export default SignInPage;
